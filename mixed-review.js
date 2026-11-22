import {openReviewLevel, reviewJournalKey, reviewLevels} from './mixed-review-data.js';
import {publicJournalKey} from './course-access.js';

const el = id => document.getElementById('mixed-' + id);
const input = el('input'), audio = el('audio'), picker = el('queue');
const levels = new Map(), failures = new Set(), loading = new Set();
const drafts = new Map();
let rows = [], item, journal, started = false, picked = false, listOrder = '';
let generation = 0, playback = 0, source = '', heard = false;
let answers = [], saving = false, retrySave = false, revealed = false;
let sessionId, attempt = 1;

function message(text = '', error = false) {
  el('feedback').textContent = text;
  el('feedback').dataset.error = String(error);
}

function showSpelling(show) {
  revealed = show;
  el('word').hidden = !show;
  el('hint').textContent = show ? '收起拼写' : '看拼写';
  el('hint').setAttribute('aria-expanded', String(show));
}

function showMeaning(show) {
  el('meaning').hidden = !show;
  el('meaning-hint').textContent = show ? '收起中文释义' : '看中文释义';
  el('meaning-hint').setAttribute('aria-expanded', String(show));
}

function drawCard() {
  el('level').textContent = item.level.label;
  el('reason').textContent = item.kind === 'spaced' ? '间隔巩固 · ' + item.dueDate + ' 到期' :
    item.errorCount >= 2 ? '高频错词 · 听错 ' + item.errorCount + ' 次' : '听写错词 · 待练满 30 遍';
  el('prompt').textContent = item.kind === 'spaced' ? '听音回忆，拼对一次完成巩固' : '听一遍，跟读后拼写';
  el('meaning').textContent = item.meaning;
  el('word').textContent = item.word;
  el('count').textContent = item.kind === 'spaced' ? '已练满 30 遍 · 今日复测' : item.practiced + ' / 30 遍';
  el('progress').value = item.practiced;
  el('progress').hidden = item.kind === 'spaced';
  el('start').hidden = started;
  el('form').hidden = !started;
}

function play() {
  showMeaning(false);
  const token = ++playback;
  heard = false;
  if (audio.currentTime) audio.currentTime = 0;
  audio.onended = () => {
    if (token !== playback) return;
    heard = true;
    void collect();
  };
  const playbackFailed = () => {
    if (token !== playback) return;
    message('点「再听一次」播放单词，刚才的输入会保留。',true);
  };
  audio.onerror = playbackFailed;
  audio.play().catch(playbackFailed);
}

async function prepareSource() {
  const token = generation;
  showMeaning(false);
  el('replay').disabled = true;
  message('正在载入当前词的录音，可以先输入。');
  try {
    source = '';
    const url = await item.level.playSource(item.id);
    if (token !== generation) return;
    if (!url) throw Error();
    source = url;
    audio.src = source;
    el('replay').disabled = false;
    message();
    play();
  } catch {
    if (token !== generation) return;
    el('replay').disabled = false;
    message('当前词的录音未能读取。点「再听一次」重试，或从待练队列换词。',true);
  }
}

function select(next) {
  if (item && input.value) drafts.set(item.key,input.value);
  generation++;
  playback++;
  audio.pause();
  audio.onended = null;
  audio.onerror = null;
  heard = false;
  source = '';
  answers = [];
  sessionId = null;
  attempt = 1;
  retrySave = false;
  saving = false;
  picker.disabled = false;
  el('retry-save').hidden = true;
  item = next;
  input.value = next ? drafts.get(next.key) || '' : '';
  if (next) drafts.delete(next.key);
  message();
  el('card').hidden = !item;
  if (!item) return;
  picker.value = item.key;
  const dictation = new URL(el('dictation').href);
  dictation.searchParams.set('level',item.level.id);
  el('dictation').href = dictation.href;
  showSpelling(false);
  showMeaning(false);
  drawCard();
  if (started) {
    input.focus({preventScroll:true});
    void prepareSource();
  }
}

function compare(a,b) {
  if (a.kind !== b.kind) return a.kind === 'spaced' ? -1 : 1;
  if (a.kind === 'spaced' && a.dueDate !== b.dueDate) return a.dueDate.localeCompare(b.dueDate);
  return b.errorCount - a.errorCount || b.practiced - a.practiced || a.order - b.order || a.id - b.id;
}

function refreshQueue() {
  rows = [];
  for (const [order, {id}] of reviewLevels.entries()) {
    const level = levels.get(id);
    if (level) for (const word of level.items()) rows.push({...word,level,order,key:id+':'+word.id});
  }
  rows.sort(compare);
  const orderKey = rows.map(row=>row.key + '/' + row.kind).join(',');
  if (listOrder !== orderKey) {
    listOrder = orderKey;
    picker.replaceChildren(...rows.map(row=>new Option(row.level.label + ' · ' +
      (row.kind === 'spaced' ? '到期第 '+row.id+' 词' : row.word),row.key)));
  }
  el('list').hidden = !rows.length;
  el('total').textContent = '待练队列（'+rows.length+' 个词）';
  el('retry').hidden = !failures.size;
  const unavailable = reviewLevels.filter(level=>failures.has(level.id)).map(level=>level.label);
  let status = loading.size ? '已读取 '+levels.size+' / 6 个星级。' + (rows.length ? '可以先开始练习。' : '') :
    unavailable.length ? unavailable.join('、')+'的记录暂未读到。'+(rows.length?'已读到的错词可先练。':'可重新读取。') :
    rows.length ? '已汇总六个星级的听写记录。' : '六个星级目前都没有待练错词或到期词。';
  const localOnly = [...levels.values()].filter(level=>level.status() !== '已同步到云端');
  if (localOnly.length) {
    status += ' '+localOnly.map(level=>level.label).join('、')+'当前按本机进度显示。';
  }
  if (status !== el('status').textContent) el('status').textContent = status;
  // A background update must not switch the answer's destination while it is being saved.
  if (saving || answers.length) return;
  const keep = (started || picked) && rows.find(row=>row.key===item?.key);
  const next = keep || rows[0];
  if (next?.key !== item?.key || next?.kind !== item?.kind) select(next);
  else if (next) { item = next; picker.value = item.key; drawCard(); }
}

async function collect() {
  if (!item || !heard || !answers.length || saving || retrySave) return;
  const token = generation, row = item, answer = answers[0];
  sessionId ??= crypto.randomUUID();
  saving = true;
  picker.disabled = true;
  try {
    const result = await row.level.record(row.id,answer,{
      spaced:row.kind==='spaced',sessionId,attempt,
    });
    if (generation !== token) return;
    answers.shift();
    saving = false;
    heard = false;
    picker.disabled = false;
    const finished = result.outcome==='correct' && (row.kind==='spaced' || result.practiced>=30);
    if (finished) {
      answers = [];
      input.value = '';
      picker.disabled = false;
      picked = false;
      refreshQueue();
      if (item) message(row.word + (row.kind==='spaced' ? ' 已完成本次巩固。' : ' 已练满 30 遍。'));
      return;
    }
    if (result.outcome==='correct') {
      item.practiced = result.practiced;
      sessionId = null;
      attempt = 1;
      if (revealed) showSpelling(false);
      message();
    } else {
      attempt++;
      showSpelling(true);
      message('这遍没有计数。对照拼写，再听一次重试。',true);
    }
    drawCard();
    play();
  } catch (error) {
    if (generation !== token) return;
    saving = false;
    retrySave = true;
    picker.disabled = false;
    el('retry-save').hidden = false;
    message(error.message || '这次输入还没有保存，请重试。',true);
  }
}

function submit(event) {
  event.preventDefault();
  if (!item || !started || retrySave || !input.value.trim()) return;
  // Each answer is attached to this word. At most the remaining repetitions
  // can queue; the previous word's keystrokes never receive credit on a new word.
  const limit = item.kind==='spaced' ? 1 : Math.max(1,30-item.practiced);
  if (answers.length >= limit) return;
  answers.push(input.value);
  input.value = '';
  input.focus({preventScroll:true});
  if (answers.length>1) message('已输入 '+answers.length+' 遍，随发音依次记录。');
  void collect();
}

el('start').onclick = () => {
  if (!item) return;
  started = true;
  drawCard();
  input.focus({preventScroll:true});
  // Activate this media element on the tap itself, before the real clip arrives.
  audio.src = 'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACAgICAgICAgICAgICAgICA';
  void audio.play().catch(()=>{});
  void prepareSource();
};
el('replay').onclick = () => {
  if (!item || saving || retrySave) return;
  input.focus({preventScroll:true});
  if (source) play(); else void prepareSource();
};
el('form').addEventListener('submit',submit);
input.addEventListener('keydown',e=>{
  if (e.key==='Enter' && (e.isComposing || e.repeat)) e.preventDefault();
});
el('hint').onclick = () => { showSpelling(!revealed); if (started) input.focus({preventScroll:true}); };
el('meaning-hint').onclick = () => {
  showMeaning(el('meaning').hidden);
  if (started) input.focus({preventScroll:true});
};
el('retry-save').onclick = () => {
  retrySave = false;
  el('retry-save').hidden = true;
  void collect();
};
picker.onchange = () => {
  const next = rows.find(row=>row.key===picker.value);
  if (!next || next.key===item?.key) return;
  if (answers.length && !confirm('本词还有尚未计入的输入，放弃这些输入并换词？')) {
    picker.value=item.key; return;
  }
  picked = true;
  el('list').open = false;
  select(next);
};

async function load(ids) {
  for (const id of ids) { loading.add(id); failures.delete(id); }
  refreshQueue();
  await Promise.all(ids.map(async id=>{
    try { levels.set(id,await openReviewLevel(id,journal,refreshQueue)); }
    catch { failures.add(id); }
    finally { loading.delete(id); refreshQueue(); }
  }));
}
el('retry').onclick = () => void load([...failures]);
try {
  journal = reviewJournalKey();
  if (!journal) throw Error('无法识别这份听写记录，请重新打开学习首页。');
  if (journal !== publicJournalKey) {
    const fragment = '#' + new URLSearchParams({journal});
    document.querySelectorAll('[data-home]').forEach(link=>link.href='./'+fragment);
    el('dictation').hash = fragment;
  }
  void load(reviewLevels.map(level=>level.id));
} catch (error) {
  el('status').textContent = error.message || '无法打开听写记录。请返回学习首页重试。';
}
