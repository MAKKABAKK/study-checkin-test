// Create the model worker on the first submitted answer. It receives English
// strings in memory; the network serves static assets only.
let worker;
let sequence = 0;
const timeoutMs = 150_000;
const pending = new Map();

function stop(reason) {
  worker?.terminate();
  worker = undefined;
  for (const request of pending.values()) {
    clearTimeout(request.timer);
    request.reject(reason);
  }
  pending.clear();
}

export function compareTranslation(reference, answer, alternatives = []) {
  if (!worker) {
    const next = new Worker(new URL('./translation-model/inference-worker.js', import.meta.url), {type:'module'});
    worker = next;
    next.onmessage = ({data}) => {
      const request = pending.get(data.id);
      if (!request) return;
      pending.delete(data.id);
      clearTimeout(request.timer);
      if (data.verdict) request.resolve(data.verdict);
      else request.reject(new Error('语义检查暂时不可用。'));
    };
    next.onerror = next.onmessageerror = () => {
      if (worker === next) stop(new Error('此设备暂时无法运行语义检查。'));
    };
  }
  const id = ++sequence;
  return new Promise((resolve,reject) => {
    const timer = setTimeout(() => stop(new Error('语义检查超时，请稍后重试。')),timeoutMs);
    pending.set(id, {resolve,reject,timer});
    try { worker.postMessage({id,reference,answer,alternatives}); }
    catch { stop(new Error('此设备暂时无法运行语义检查。')); }
  });
}
