const workerURL = new URL('./material-worker.js',import.meta.url);
let registering;

export async function registerMaterials() {
  if (!navigator.serviceWorker || !globalThis.caches) throw new Error('此浏览器暂不支持保存整套资料。');
  if (navigator.serviceWorker.controller?.scriptURL === workerURL.href) return Promise.resolve(navigator.serviceWorker.controller);
  if (!registering) {
    registering = (async () => {
      const service = navigator.serviceWorker;
      const registration = await service.register(workerURL,{scope:new URL('./',workerURL).href,updateViaCache:'none'});
      // First load can start before the service worker controls this tab.
      if (service.controller?.scriptURL === workerURL.href) return service.controller;
      // A forced reload may intentionally bypass control for this navigation.
      // An already active worker can nevertheless store the pack for the next visit.
      if (registration.active?.state === 'activated') return registration.active;
      return new Promise((resolve,reject)=>{
        const timer = setTimeout(()=>finish(new Error('资料缓存尚未就绪，请稍后重试。')),30000);
        function finish(error) {
          clearTimeout(timer);
          service.removeEventListener('controllerchange',check);
          if (error) reject(error); else resolve(service.controller);
        }
        function check() {
          if (service.controller?.scriptURL === workerURL.href) finish();
        }
        service.addEventListener('controllerchange',check);
        const installing = registration.installing;
        if (installing) installing.addEventListener('statechange',()=>{
          if (installing.state === 'redundant' && !service.controller) finish(new Error('资料缓存未能启动，请重新打开网页。'));
        });
        check();
      });
    })().catch(error=>{registering=undefined;throw error;});
  }
  return registering;
}

async function request(type,onProgress) {
  const worker = await registerMaterials();
  const channel = new MessageChannel();
  return new Promise((resolve,reject)=>{
    let timer;
    const close = () => {clearTimeout(timer);channel.port1.close();};
    function resetTimer() {
      clearTimeout(timer);
      timer = setTimeout(()=>{
        close();
        reject(new Error('下载暂时没有响应，回到页面后可以继续。'));
      },type==='material-status' ? 30000 : 240000);
    }
    channel.port1.onmessage = ({data})=>{
      if (data.type === 'progress') {resetTimer();onProgress?.(data.progress);return;}
      close();
      if (data.type === 'done') resolve(data.progress);
      else reject(new Error(data.message || '资料缓存暂时无法读取。'));
    };
    resetTimer();
    try { worker.postMessage({type},[channel.port2]); }
    catch (error) { close();registering=undefined;reject(error); }
  });
}

export const materialStatus = () => request('material-status');
export const preloadMaterials = onProgress => request('material-preload',onProgress);

export async function prepareMaterialReads() {
  let timer;
  try {
    if (navigator.serviceWorker?.controller?.scriptURL === workerURL.href) return;
    await Promise.race([registerMaterials(),new Promise(resolve=>{timer=setTimeout(resolve,650);})]);
  } catch {
    // Read normally online when this browser denies storage or workers.
  } finally { clearTimeout(timer); }
}
