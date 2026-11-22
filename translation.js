import {sentences} from './translation-content.js';
import {createTranslationProgress} from './translation-progress.js';

const el = id => document.getElementById('tr-' + id);
const byId = new Map(sentences.map(sentence => [sentence.id, sentence]));
const ids = [...byId.keys()];
const params = new URL(location.href).searchParams;
const from = Number(params.get('from'));
const to = Number(params.get('to'));
const between = (start, end) => ids.filter(id => id >= start && id <= end);
const scopes = new Map();
const fullRange = from === ids[0] && to === ids.at(-1);
if (byId.has(from) && byId.has(to) && from <= to && !fullRange && (from !== 22 || to !== 31)) {
  scopes.set('task', {label:'本次作业 · 第 ' + from + '–' + to + ' 题', ids:between(from, to)});
}
scopes.set('hw3', {label:'作业三 · 第 22–31 题', ids:between(22, 31)});
scopes.set('all', {label:'全部 ' + ids.length + ' 题', ids});

const range = el('range');
const select = el('select');
const input = el('input');
for (const [key, value] of scopes) range.add(new Option(value.label, key));
const retryOption = new Option('需要重译', 'retry');
range.add(retryOption);
if (fullRange) range.value = 'all';

let activeId;
let currentIds = [];
let optionSignature = '';
let previousScope = range.value;
const progress = createTranslationProgress(() => queueMicrotask(refresh));

function statusLabel(status) {
  if (status === 'learned') return '已掌握';
  if (status === 'retry') return '需要重译';
  return '';
}

function refresh() {
  const retryIds = ids.filter(id => progress.get(id).status === 'retry');
  retryOption.text = '需要重译（' + retryIds.length + '）';
  currentIds = range.value === 'retry' ? retryIds : scopes.get(range.value).ids;
  const draftStatus = progress.status();
  if (el('save').textContent !== draftStatus) el('save').textContent = draftStatus;
  const states = currentIds.map(id => progress.get(id).status);
  const signature = currentIds.map((id, i) => id + states[i]).join(',');
  if (signature !== optionSignature) {
    select.replaceChildren(...currentIds.map((id, i) => {
      const mark = statusLabel(states[i]);
      return new Option('第 ' + id + ' 题' + (mark ? ' · ' + mark : ''), id);
    }));
    optionSignature = signature;
  }
  const retryMode = range.value === 'retry';
  el('count').textContent = retryMode ? '待重译 ' + currentIds.length + ' 句' :
    '已掌握 ' + states.filter(status => status === 'learned').length + ' / ' + currentIds.length + ' 句';
  const empty = currentIds.length === 0;
  el('empty').hidden = !empty;
  el('card').hidden = empty;
  el('report').hidden = empty;
  if (el('report').open) updateReport();
  select.disabled = empty;
  if (empty) {
    activeId = undefined;
    return;
  }
  if (!currentIds.includes(activeId)) {
    showSentence(currentIds.find(id => progress.get(id).status !== 'learned') ?? currentIds[0]);
    return;
  }
  select.value = activeId;
  const record = progress.get(activeId);
  el('mark').textContent = statusLabel(record.status);
  el('mark').dataset.value = record.status;
  if (document.activeElement !== input && input.value !== record.draft) input.value = record.draft;
  el('learned').disabled = !input.value.trim();
  const position = currentIds.indexOf(activeId);
  el('prev').disabled = position === 0;
  el('next').disabled = position === currentIds.length - 1;
}

function showSentence(id, focus = false) {
  const sentence = byId.get(id);
  activeId = id;
  el('number').textContent = '第 ' + id + ' 题';
  el('prompt').textContent = sentence.prompt;
  for (const [key, text] of [['extended', sentence.extended], ['hint', sentence.hint]]) {
    const details = el(key);
    details.open = false;
    details.hidden = !text;
    details.querySelector('p').textContent = text || '';
  }
  input.value = progress.get(id).draft;
  el('compare').hidden = true;
  el('examples').replaceChildren();
  el('reveal').setAttribute('aria-expanded', 'false');
  el('reveal').textContent = '展开对照';
  refresh();
  if (focus) el('prompt').focus();
}

function setScope(value) {
  range.value = value;
  if (value !== 'retry') previousScope = value;
  el('notice').textContent = '';
  el('report').open = false;
  const priorId = activeId;
  refresh();
  if (activeId !== undefined && activeId === priorId) showSentence(activeId);
}

range.addEventListener('change', () => setScope(range.value));
el('resume').addEventListener('click', () => setScope(previousScope));
select.addEventListener('change', () => {
  el('notice').textContent = '';
  showSentence(Number(select.value));
});
for (const [button, step] of [['prev', -1], ['next', 1]]) {
  el(button).addEventListener('click', () => {
    el('notice').textContent = '';
    showSentence(currentIds[currentIds.indexOf(activeId) + step], true);
  });
}
input.addEventListener('input', () => {
  progress.set(activeId, {draft:input.value});
  el('learned').disabled = !input.value.trim();
});

function comparison(label, lines, language) {
  if (!lines.length) return;
  const section = document.createElement('section');
  const heading = document.createElement('h4');
  heading.textContent = label;
  section.append(heading);
  for (const line of lines) {
    const p = document.createElement('p');
    p.lang = language;
    p.textContent = line;
    section.append(p);
  }
  el('examples').append(section);
}

el('reveal').addEventListener('click', () => {
  const open = el('compare').hidden;
  el('compare').hidden = !open;
  el('reveal').setAttribute('aria-expanded', String(open));
  el('reveal').textContent = open ? '收起对照' : '展开对照';
  if (!open) return;
  const sentence = byId.get(activeId);
  const record = progress.get(activeId);
  el('examples').replaceChildren();
  if (record.previous) comparison('你上一次的译文', [record.previous], 'en');
  if (sentence.reference) comparison('拾课参考译法', [sentence.reference], 'en');
  comparison('Word 中的译文', sentence.drafts || [], 'en');
});

function assess(status) {
  const id = activeId;
  const position = currentIds.indexOf(id);
  const next = currentIds[position + 1] ?? (range.value === 'retry' ? currentIds[0] : undefined);
  const answer = input.value.trim();
  if (status === 'learned' && !answer) return;
  const update = {status, draft:''};
  if (answer) update.previous = answer;
  progress.set(id, update);
  refresh();
  if (next !== undefined && currentIds.includes(next)) showSentence(next, true);
  else if (activeId !== undefined) showSentence(activeId, true);
  el('notice').textContent = '第 ' + id + ' 题已标记为「' + statusLabel(status) + '」。' +
    (next === undefined ? '已到本组最后一题。' : '');
}
el('retry').addEventListener('click', () => assess('retry'));
el('learned').addEventListener('click', () => assess('learned'));

function updateReport() {
  const rows = currentIds.map(id => {
    const {draft, previous} = progress.get(id);
    const answer = draft.trim() ? '网页草稿　' + draft.trim() :
      previous ? '最近一次网页译文　' + previous : '待填写';
    return '第 ' + id + ' 题　' + byId.get(id).prompt + '\n' + answer;
  });
  const text = rows.join('\n\n');
  if (el('report-text').value !== text) {
    el('report-text').value = text;
    el('copy-status').textContent = '';
  }
}
el('report').querySelector('summary').addEventListener('click', updateReport);
el('copy').addEventListener('click', async () => {
  updateReport();
  const text = el('report-text');
  try {
    await navigator.clipboard.writeText(text.value);
    el('copy-status').textContent = '已复制，可以粘贴到 Word。';
  } catch {
    text.focus();
    text.select();
    el('copy-status').textContent = '译稿已全选，请使用设备的复制功能。';
  }
});

refresh();
progress.ready.then(refresh);
