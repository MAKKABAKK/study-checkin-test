const levels = new Set(['six','five','four','three','two','one']);
const utf8 = new TextEncoder();

export async function loadSeed(level,journalKey) {
  if (!levels.has(level) || !/^[A-Za-z0-9_-]{43}$/.test(journalKey || '')) return null;
  const raw = Uint8Array.from(atob(journalKey.replaceAll('-','+').replaceAll('_','/')), c=>c.charCodeAt(0));
  if (btoa(String.fromCharCode(...raw)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'') !== journalKey) return null;
  const base = await crypto.subtle.importKey('raw',raw,'HKDF',false,['deriveKey']);
  const key = await crypto.subtle.deriveKey({name:'HKDF',hash:'SHA-256',salt:utf8.encode('shike-dictation-v1'),
    info:utf8.encode('seed-encryption')},base,{name:'AES-GCM',length:256},false,['decrypt']);
  const response = await fetch(new URL('./dictation-seeds/'+level+'.bin',import.meta.url),{credentials:'omit'});
  if (!response.ok) throw Error('暂时无法下载听写记录，请刷新重试。');
  const data = new Uint8Array(await response.arrayBuffer());
  let plain;
  try {
    plain = await crypto.subtle.decrypt({name:'AES-GCM',iv:data.slice(0,12),
      additionalData:utf8.encode('shike-dictation-seed-v1/'+level)},key,data.subarray(12));
  } catch (error) {
    if (error.name === 'OperationError') return null;
    throw error;
  }
  const decoded = new Blob([plain]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(decoded).json();
}

export async function hasPersonalSeed(journalKey) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(journalKey || '')) return false;
  const response = await fetch(new URL('./dictation-seeds/manifest.json',import.meta.url),{credentials:'omit'});
  if (!response.ok) throw Error('暂时无法验证个人链接，请稍后重试。');
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256',utf8.encode(journalKey)));
  const fingerprint = btoa(String.fromCharCode(...hash)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  return (await response.json()).journalKeyFingerprint === fingerprint;
}
