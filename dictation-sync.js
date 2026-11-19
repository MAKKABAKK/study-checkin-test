// Only the derived access token reaches the server. Record contents and event IDs
// use separate derived keys, including on Sites served from a shared origin.
const utf8 = new TextEncoder();
const salt = utf8.encode('shike-dictation-v1');
const levels = new Set(['six','five','four','three','two','one','plan']);

function base64url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
}

function decode(value) {
  return Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')), c => c.charCodeAt(0));
}

export async function createDictationSync({url, publishableKey, journalKey, level}) {
  if (!levels.has(level) || !/^[A-Za-z0-9_-]{43}$/.test(journalKey || '')) throw new Error('请打开你的个人听写链接。');
  const endpoint = new URL(url);
  const local = ['127.0.0.1','localhost','[::1]'].includes(endpoint.hostname);
  const worker = endpoint.origin === 'https://shike-dictation-journal.comelyshell2.chatgpt.site';
  if (!(worker || endpoint.protocol === 'https:' && /^[a-z0-9-]+\.supabase\.co$/.test(endpoint.hostname) && !endpoint.port ||
        local && (!globalThis.location || ['127.0.0.1','localhost','[::1]'].includes(location.hostname)) && ['http:','https:'].includes(endpoint.protocol)) ||
      endpoint.password || endpoint.username || endpoint.hash || endpoint.search || endpoint.pathname !== '/' ||
      (!worker && !/^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey))) throw new Error('听写同步服务未配置。');

  const source = await crypto.subtle.importKey('raw',decode(journalKey),'HKDF',false,['deriveBits']);
  const bits = label => crypto.subtle.deriveBits({name:'HKDF',salt,hash:'SHA-256',info:utf8.encode(label)},source,256);
  const access = base64url(await bits('server-access'));
  const key = await crypto.subtle.importKey('raw',await bits('event-encryption'),'AES-GCM',false,['encrypt','decrypt']);
  const signing = await crypto.subtle.importKey('raw',await bits('event-id'),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const eventKey = id => crypto.subtle.sign('HMAC',signing,utf8.encode(level+'\n'+id)).then(base64url);
  const cipher = (iv,id) => ({name:'AES-GCM',iv,additionalData:utf8.encode(level+'\n'+id)});

  async function rpc(name, params) {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 20000);
    try {
      const response = await fetch(new URL('rest/v1/rpc/shike_dictation_'+name,endpoint), {
        method:'POST', cache:'no-store', credentials:'omit', redirect:'error', signal:abort.signal,
        headers:{'Content-Type':'application/json',...(worker ? {} : {apikey:publishableKey})},
        body:JSON.stringify({p_access:access,p_level:level,...params}),
      });
      if (!response.ok) {
        const code = response.status === 409 ? 'conflict' :
          [401,403].includes(response.status) ? 'unauthorized' : 'unavailable';
        const message = {conflict:'另一台设备已保存练习，请刷新记录后重试。',unauthorized:'个人听写链接无法访问这份进度。',unavailable:'暂时无法连接听写同步服务。'}[code];
        throw Object.assign(new Error(message),{code});
      }
      return await response.json();
    } finally { clearTimeout(timer); }
  }

  return {
    async read(after = 0) {
      const result = await rpc('read',{p_after:after});
      if (!Number.isSafeInteger(result.head) || !Number.isSafeInteger(result.cursor) || result.head < result.cursor ||
          !Array.isArray(result.events) || result.events.length > 256 || result.cursor !== after+result.events.length ||
          (!result.events.length && result.head !== after)) throw new Error('云端听写记录页码异常，请重新读取。');
      const events = await Promise.all(result.events.map(async (row,i) => {
        if (row.cursor !== after+i+1 || !/^[A-Za-z0-9_-]{43}$/.test(row.id) ||
            typeof row.data !== 'string' || row.data.length > 22000) throw new Error('云端听写记录序号异常。');
        const encrypted = decode(row.data);
        const plain = await crypto.subtle.decrypt(cipher(encrypted.subarray(0,12),row.id),key,encrypted.subarray(12));
        const event = JSON.parse(new TextDecoder().decode(plain));
        if (row.id !== await eventKey(event.eventId)) throw new Error('云端听写记录校验失败。');
        return {cursor:row.cursor,event};
      }));
      return {head:result.head,cursor:result.cursor,events};
    },
    async append(event, expectedCursor) {
      if (!event || typeof event.eventId !== 'string' || !/^[A-Za-z0-9:._-]{1,128}$/.test(event.eventId) ||
          !Number.isSafeInteger(expectedCursor) || expectedCursor < 0) throw new Error('无法保存这条听写记录。');
      const plain = utf8.encode(JSON.stringify(event));
      if (plain.length > 16000) throw new Error('单条听写记录过大。');
      const id = await eventKey(event.eventId), iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(cipher(iv,id),key,plain);
      const packed = new Uint8Array(iv.byteLength+encrypted.byteLength);
      packed.set(iv); packed.set(new Uint8Array(encrypted),iv.byteLength);
      const result = await rpc('append',{p_expected:expectedCursor,p_id:id,p_data:base64url(packed)});
      if (!Number.isSafeInteger(result.cursor) || result.cursor < 1 || typeof result.inserted !== 'boolean' ||
          (result.inserted && result.cursor !== expectedCursor+1)) throw new Error('听写保存回执无效，请重新读取。');
      return result;
    },
  };
}
