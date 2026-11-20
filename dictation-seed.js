const levels = new Set(['six','five','four','three','two','one']);
const utf8 = new TextEncoder();

export async function loadSeed(level,journalKey) {
  if (!levels.has(level) && level !== 'legacy-six') return null;
  return readSeed(level,journalKey);
}

async function readSeed(level,journalKey) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(journalKey || '')) return null;
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

export function attachLegacyAnswers(panel,journalKey,words,marks) {
  const history = document.createElement('details');
  history.id = 'legacy-history';
  history.className = 'meaning-book';
  history.innerHTML = '<summary>第三次纸笔听写 · 原始作答</summary><p role="status"></p><div class="report-scroll"></div>';
  panel.querySelector('.intro').after(history);
  const status = history.querySelector('[role="status"]');
  let loading = false;
  history.ontoggle = async () => {
    if (!history.open || loading) return;
    loading = true;
    status.textContent = '正在读取第三次听写记录…';
    try {
      const {readPaperHistory} = await import('./dictation-adapter.js');
      const answers = await readPaperHistory(journalKey);
      if (!Array.isArray(answers) || answers.length !== words.length) throw Error('记录不完整');
      const table = document.createElement('table');
      table.className = 'report-table';
      table.innerHTML = '<thead><tr><th>序号</th><th>标准拼写</th><th>我的原答案</th><th>初听结果</th></tr></thead>';
      const body = table.createTBody();
      let scored = 0, correct = 0;
      for (const [i,answer] of answers.entries()) {
        const {id,word} = words[i];
        const result = answer === null ? '原音缺读' : marks[id] === 'correct' ? '正确' : answer === '?' ? '未听出' : '拼错';
        if (answer !== null) scored++;
        if (result === '正确') correct++;
        const row = body.insertRow();
        for (const value of [id,word,answer ?? '—',result]) row.insertCell().textContent = value;
      }
      history.querySelector('.report-scroll').append(table);
      status.textContent = '原录音 ' + scored + ' 词中答对 ' + correct + ' 词，正确率 ' + (correct * 100 / scored).toFixed(1) + '%。';
      history.ontoggle = null;
    } catch {
      status.textContent = '原始作答未能加载。请检查网络，收起后重新展开。';
    } finally {
      loading = false;
    }
  };
}

export async function hasPersonalSeed(journalKey) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(journalKey || '')) return false;
  const response = await fetch(new URL('./dictation-seeds/manifest.json',import.meta.url),{credentials:'omit'});
  if (!response.ok) throw Error('暂时无法验证个人链接，请稍后重试。');
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256',utf8.encode(journalKey)));
  const fingerprint = btoa(String.fromCharCode(...hash)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  return (await response.json()).journalKeyFingerprint === fingerprint;
}
