import {getCourseKey,publicJournalKey} from './course-access.js';
import {prepareMaterialReads} from './material-cache.js';

const levels = {six:'六星', five:'五星', four:'四星', three:'三星', two:'二星', one:'一星'};
const url = new URL(location.href);
const bundleVersion = new URL(import.meta.url).search;
const requestedLevel = url.searchParams.get('level');
const level = Object.hasOwn(levels, requestedLevel) ? requestedLevel : 'six';
const hash = url.hash.slice(1);
const keys = new URLSearchParams(hash);
const status = document.getElementById('load-status');
const retry = document.getElementById('retry-dictation');
const view = url.searchParams.get('view') || (!hash.includes('=') ? hash : '');
const viewPattern = /^(dictation|original|supplement|full-all|review|meanings|meaning-book|consolidation|legacy|reports(?:\/[\w-]+)?)$/;
document.getElementById('level-title').textContent = levels[level] + '听写';
retry.onclick = () => location.reload();

function read(store, name) {
  try { return store.getItem(name) || ''; } catch { return ''; }
}

function save(store, name, value) {
  try { store.setItem(name,value); } catch { /* The open page still has the key. */ }
}

save(localStorage, 'shike.hub.level.v1', level);

// Older bookmarks can name a different notebook. Keep its verified identity
// across hash-based views and level changes without changing the public entry.
const book = url.searchParams.get('book');
const journalKey = keys.get('journal') ?? (book ? read(sessionStorage,'shike.book.'+book) : publicJournalKey);
const cloudURL = document.querySelector('meta[name=shike-cloud-url]').content;
const publishableKey = document.querySelector('meta[name=shike-cloud-key]').content;

async function loadPractice() {
  retry.hidden = true;
  status.textContent = '正在读取词库和原录音…';
  const controller = new AbortController();
  let audioURL;
  try {
    if (!/^[A-Za-z0-9_-]{43}$/.test(journalKey)) throw Error('无法识别这份听写记录，请重新打开原书签。');
    const [key] = await Promise.all([getCourseKey(),prepareMaterialReads()]);
    const progress = new Map();
    let lastUpdate = 0;
    async function loadFile(name) {
      const response = await fetch('./dictation-data/' + level + '/' + name + '.bin' + (name === 'player' ? bundleVersion : ''), {signal:controller.signal});
      if (!response.ok) throw new Error('未能下载' + levels[level] + '的练习材料，请检查网络后重试。');
      const length = Number(response.headers.get('content-length')) || 0;
      progress.set(name, {received:0, length});
      let bytes;
      if (!response.body) {
        bytes = new Uint8Array(await response.arrayBuffer());
      } else {
        const reader = response.body.getReader(), chunks = [];
        const row = progress.get(name);
        while (true) {
          const {value,done} = await reader.read();
          if (done) break;
          chunks.push(value);
          row.received += value.length;
          if (performance.now() - lastUpdate > 250) {
            lastUpdate = performance.now();
            const all = [...progress.values()];
            const loaded = all.reduce((sum,file) => sum + file.received, 0);
            const total = all.reduce((sum,file) => sum + file.length, 0);
            status.textContent = '正在读取词库和原录音 · ' + (loaded/1048576).toFixed(1) +
              (all.length === 2 && all.every(file => file.length) ? ' / ' + (total/1048576).toFixed(1) : '') + ' MB';
          }
        }
        bytes = new Uint8Array(row.received);
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      }
      return crypto.subtle.decrypt({name:'AES-GCM', iv:bytes.subarray(0,12)}, key, bytes.subarray(12));
    }
    const [player, original, engine] = await Promise.all([
      loadFile('player'), loadFile('original'), import('./dictation-adapter.js'),
    ]);
    const content = JSON.parse(new TextDecoder().decode(player));
    const doc = new DOMParser().parseFromString(content.html, 'text/html');
    const data = doc.querySelector('#data');
    if (!data) throw new Error('此级练习内容不完整，请重新加载。');
    status.textContent = '正在打开' + levels[level] + '练习记录…';
    const words = JSON.parse(data.textContent);
    const adapter = await engine.installDictationEngine({
      level, words, times:content.times, acceptedSpellings:content.acceptedSpellings,
      journalKey, url:cloudURL, publishableKey,
    });
    await adapter.ready();
    if (level === 'six') {
      const marks = adapter.legacyMarks();
      data.textContent = JSON.stringify(words.map(word => Object.hasOwn(marks,word.id)
        ? {...word,status:marks[word.id]} : word));
    }
    window.shikeDictation = adapter;
    audioURL = URL.createObjectURL(new Blob([original], {type:'audio/mpeg'}));
    window.shikeOriginalAudio = audioURL;
    const route = new URL(location.href);
    route.searchParams.set('level',level);
    route.searchParams.delete('view');
    if (journalKey !== publicJournalKey) {
      save(sessionStorage,'shike.book.'+adapter.scope,journalKey);
      route.searchParams.set('book',adapter.scope);
      for (const link of doc.querySelectorAll('.level-nav a[data-level], a[data-mixed-review]')) {
        const target = new URL(link.getAttribute('href'),location.href);
        target.searchParams.set('book',adapter.scope);
        link.href = target.href;
      }
    } else route.searchParams.delete('book');
    if (viewPattern.test(view) || keys.has('journal') || keys.has('handout')) {
      route.hash = viewPattern.test(view) ? view : 'dictation';
    }
    history.replaceState(null,'',route);
    // DOMParser keeps trainer scripts inert. Mount the authenticated markup first,
    // then execute its original classic scripts in order against the live document.
    const scripts = [...doc.querySelectorAll('script:not([type="application/json"])')];
    const source = scripts.map(node => node.textContent);
    for (const script of scripts) script.remove();
    document.title = levels[level] + '听写与错词复习 · 拾课';
    document.head.append(...doc.head.querySelectorAll('style'));
    const root = document.importNode(doc.body,true);
    document.body.replaceWith(root);
    document.getElementById('landing-style').remove();
    for (const code of source) {
      const script = document.createElement('script');
      script.textContent = code;
      document.body.append(script);
      script.remove();
    }
    if (level === 'six' && Object.keys(adapter.legacyMarks()).length) {
      const {attachLegacyAnswers} = await import('./dictation-seed.js'+bundleVersion);
      attachLegacyAnswers(document.getElementById('legacyPanel'),journalKey,words,adapter.legacyMarks());
    }
    window.addEventListener('pagehide', event => {
      if (!event.persisted) URL.revokeObjectURL(audioURL);
    });
  } catch (error) {
    controller.abort();
    if (audioURL) URL.revokeObjectURL(audioURL);
    status.textContent = error.name === 'OperationError' ? '练习材料未能读取，请重新加载。'
      : error instanceof TypeError ? '练习未能加载，请检查网络后重试。' : (error.message || '暂时无法打开练习。');
    retry.hidden = false;
  }
}

void loadPractice();
