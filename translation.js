import {sentences} from './translation-content.js';
import {createTranslationProgress} from './translation-progress.js';
import {teacherNotes} from './translation-teacher.js';
import {gradeTranslation,workbookReview} from './translation-grader.js';

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
scopes.set('teacher', {label:'老师批改', ids:ids.filter(id => teacherNotes[id])});
scopes.set('written', {label:'已写旧稿 · 第 1–30 题', ids:between(1, 30)});
scopes.set('all', {label:'全部 ' + ids.length + ' 题', ids});

const range = el('range');
const select = el('select');
const input = el('input');
for (const [key, value] of scopes) range.add(new Option(value.label, key));
const retryOption = new Option('需要重译', 'retry');
range.add(retryOption);
if (fullRange) range.value = 'all';
if (['teacher','written','retry'].includes(params.get('view'))) range.value = params.get('view');

let activeId;
let currentIds = [];
let optionSignature = '';
let previousScope = range.value === 'retry' ? 'hw3' : range.value;
const pending = new Map();
let displayedGrade;
let settledRetryId;
const progress = createTranslationProgress(() => queueMicrotask(refresh));

function statusLabel(status) {
  if (status === 'learned') return '已掌握';
  if (status === 'retry') return '需要重译';
  return '';
}

function reviewStatus(id) {
  return progress.get(id).status || (teacherNotes[id]?.needsRetry || workbookReview[id]?.verdict === 'revise' ? 'retry' : '');
}

function refresh() {
  const retryIds = ids.filter(id => reviewStatus(id) === 'retry');
  retryOption.text = '需要重译（' + retryIds.length + '）';
  const retryMode = range.value === 'retry';
  // Let the learner read feedback even when this answer clears the last item.
  const reviewingResult = retryMode && activeId !== undefined && settledRetryId === activeId && !retryIds.includes(activeId);
  currentIds = retryMode ? (reviewingResult ? [...retryIds, activeId] : retryIds) : scopes.get(range.value).ids;
  const draftStatus = progress.status();
  if (el('save').textContent !== draftStatus) el('save').textContent = draftStatus;
  const states = currentIds.map(reviewStatus);
  const signature = currentIds.map((id, i) => id + states[i]).join(',');
  if (signature !== optionSignature) {
    select.replaceChildren(...currentIds.map((id, i) => {
      const mark = statusLabel(states[i]);
      return new Option('第 ' + id + ' 题' + (mark ? ' · ' + mark : ''), id);
    }));
    optionSignature = signature;
  }
  el('count').textContent = retryMode ? '待重译 ' + retryIds.length + ' 句' :
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
    showSentence(currentIds.find(id => reviewStatus(id) !== 'learned') ?? currentIds[0]);
    return;
  }
  select.value = activeId;
  const record = progress.get(activeId);
  const status = reviewStatus(activeId);
  el('mark').textContent = statusLabel(status);
  el('mark').dataset.value = status;
  const visibleDraft = displayedGrade && record.previous === displayedGrade.answer && !record.draft
    ? displayedGrade.answer : record.draft;
  if (displayedGrade && visibleDraft.trim() !== displayedGrade.answer) hideGrade();
  if (document.activeElement !== input && input.value !== visibleDraft) input.value = visibleDraft;
  const grading = pending.has(activeId);
  el('submit').disabled = grading || !input.value.trim() || !!(displayedGrade && displayedGrade.verdict !== 'unknown');
  el('grading').textContent = grading ? '正在批改这句译文…' : '';
  el('learned').disabled = !input.value.trim();
  const position = currentIds.indexOf(activeId);
  el('prev').disabled = position === 0;
  el('next').disabled = !reviewingResult && position === currentIds.length - 1;
  el('next').textContent = reviewingResult ? (retryIds.length ? '继续重译' : '完成本轮') : '下一题';
}

function showSentence(id, focus = false) {
  const sentence = byId.get(id);
  activeId = id;
  settledRetryId = undefined;
  hideGrade();
  el('number').textContent = '第 ' + id + ' 题';
  el('written').textContent = id <= 30 ? '作业已写' : '';
  el('prompt').textContent = sentence.prompt;
  for (const [key, text] of [['extended', sentence.extended], ['hint', sentence.hint]]) {
    const details = el(key);
    details.open = false;
    details.hidden = !text;
    details.querySelector('p').textContent = text || '';
  }
  input.value = progress.get(id).draft;
  const teacher = teacherNotes[id];
  const archive = el('archive');
  archive.hidden = !teacher && !sentence.drafts.length;
  archive.open = ['teacher','written'].includes(range.value);
  archive.querySelector('summary').textContent = teacher ? '回看老师批改' : '回看 Word 旧稿';
  const sources = el('sources');
  sources.replaceChildren();
  if (teacher) {
    comparison('Word 原稿', [teacher.original], 'en', sources);
    comparison('老师在 Word 中的修订', [teacher.corrected], 'en', sources);
    highlightRevisions(...sources.querySelectorAll('p'));
    for (const comment of teacher.comments || []) {
      comparison('老师的批注' + (comment.quote ? ' · ' + comment.quote : ''), [comment.text], '', sources);
    }
  } else {
    comparison('Word 中的译文', sentence.drafts, 'en', sources);
    if (workbookReview[id]) {
      const section = document.createElement('section');
      section.className = 'tr-past-grade';
      displayFeedback(workbookReview[id], section, '拾课对原稿的复核');
      sources.append(section);
    }
  }
  el('compare').hidden = true;
  el('examples').replaceChildren();
  el('reveal').setAttribute('aria-expanded', 'false');
  el('reveal').textContent = '展开对照';
  refresh();
  if (focus) el('prompt').focus();
}

function setScope(value) {
  hideGrade();
  settledRetryId = undefined;
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
    if (step === 1 && settledRetryId === activeId && reviewStatus(activeId) !== 'retry') {
      settledRetryId = undefined;
      hideGrade();
      refresh();
      return;
    }
    showSentence(currentIds[currentIds.indexOf(activeId) + step], true);
  });
}
input.addEventListener('input', () => {
  pending.delete(activeId);
  hideGrade();
  progress.set(activeId, {draft:input.value});
  el('learned').disabled = !input.value.trim();
  refresh();
});

function comparison(label, lines, language, target = el('examples')) {
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
  target.append(section);
}

function highlightRevisions(original, corrected) {
  const before = original.textContent.match(/\s*\S+/g) || [];
  const after = corrected.textContent.match(/\s*\S+/g) || [];
  const common = Array.from({length:before.length + 1}, () => new Uint16Array(after.length + 1));
  const same = (i,j) => before[i].trim() === after[j].trim();
  for (let i = before.length - 1; i >= 0; i--) {
    for (let j = after.length - 1; j >= 0; j--) {
      common[i][j] = same(i,j) ? 1 + common[i+1][j+1] : Math.max(common[i+1][j],common[i][j+1]);
    }
  }
  original.replaceChildren();
  corrected.replaceChildren();
  let i = 0, j = 0;
  while (i < before.length || j < after.length) {
    if (i < before.length && j < after.length && same(i,j)) {
      original.append(before[i++]);
      corrected.append(after[j++]);
    } else {
      const removed = j === after.length || (i < before.length && common[i+1][j] >= common[i][j+1]);
      const mark = document.createElement(removed ? 'del' : 'ins');
      mark.textContent = removed ? before[i++] : after[j++];
      (removed ? original : corrected).append(mark);
    }
  }
}

function hideGrade() {
  displayedGrade = null;
  el('feedback').hidden = true;
}

const gradeTitles = {correct:'通过', revise:'需要重译', unknown:'待核对'};

function displayFeedback(grade, container, label = '网页批改') {
  const heading = container === el('feedback') ? el('feedback-title') : document.createElement('h4');
  const summary = container === el('feedback') ? el('feedback-text') : document.createElement('p');
  const issues = container === el('feedback') ? el('issues') : document.createElement('ul');
  heading.textContent = label + ' · ' + gradeTitles[grade.verdict];
  summary.textContent = grade.feedback;
  issues.replaceChildren();
  for (const issue of grade.issues) {
    const item = document.createElement('li');
    const change = document.createElement('strong');
    change.textContent = [issue.original, issue.suggestion].filter(Boolean).join(' → ');
    change.lang = 'en';
    const reason = document.createElement('p');
    reason.textContent = issue.reason;
    item.append(change, reason);
    issues.append(item);
  }
  if (container !== el('feedback')) container.append(heading, summary, issues);
  container.dataset.verdict = grade.verdict;
}

function savedGrade(record) {
  try {
    const result = JSON.parse(record.grade);
    if (Object.hasOwn(gradeTitles, result?.verdict) && Array.isArray(result.issues) &&
      (result.answer === record.previous || result.answer === record.draft.trim())) return result;
  } catch { /* Earlier attempts may have no recorded feedback. */ }
}

function serializeGrade(grade) {
  const saved = {...grade, feedback:grade.feedback.slice(0, 380), issues:grade.issues.slice(0, 4)};
  let json = JSON.stringify(saved);
  // An unusually long explanation must not prevent the status and answer from being saved.
  while (json.length > 3000 && saved.issues.length) {
    saved.issues.pop();
    json = JSON.stringify(saved);
  }
  return json.length <= 3000 ? json : '';
}

async function submitGrade() {
  const id = activeId;
  const answer = input.value.trim();
  if (!id || !answer || pending.has(id) || (displayedGrade && displayedGrade.verdict !== 'unknown')) return;
  const request = {};
  pending.set(id, request);
  progress.set(id, {draft:input.value});
  hideGrade();
  el('notice').textContent = '';
  refresh();
  let result;
  try {
    result = await gradeTranslation(byId.get(id), answer);
  } catch {
    result = {verdict:'unknown',feedback:'这次未能完成批改。可以查看参考译法，或稍后重新批改。',issues:[]};
  }
  if (pending.get(id) !== request) return;
  pending.delete(id);
  if (progress.get(id).draft.trim() !== answer || (id === activeId && input.value.trim() !== answer)) {
    refresh();
    return;
  }
  const grade = {answer, verdict:result.verdict, feedback:result.feedback, issues:result.issues};
  const patch = {grade:serializeGrade(grade)};
  if (grade.verdict !== 'unknown') {
    Object.assign(patch, {previous:answer, draft:'', status:grade.verdict === 'correct' ? 'learned' : 'retry'});
  }
  progress.set(id, patch);
  if (activeId === id) {
    displayedGrade = grade;
    if (range.value === 'retry' && grade.verdict === 'correct') settledRetryId = id;
    displayFeedback(grade, el('feedback'));
    el('feedback').hidden = false;
    el('notice').textContent = grade.verdict === 'revise' ? '第 ' + id + ' 题已加入「需要重译」。' :
      grade.verdict === 'correct' ? '第 ' + id + ' 题已标记为「已掌握」。' : '';
  }
  refresh();
}
el('submit').addEventListener('click', submitGrade);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && event.keyCode !== 229) {
    event.preventDefault();
    submitGrade();
  }
});

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
  const grade = savedGrade(record);
  if (grade && !displayedGrade) {
    if (grade.answer !== record.previous) comparison('这次批改的译文', [grade.answer], 'en');
    const section = document.createElement('section');
    section.className = 'tr-past-grade';
    displayFeedback(grade, section);
    el('examples').append(section);
  }
  if (sentence.reference) comparison('拾课参考译法', [sentence.reference], 'en');
  if (!teacherNotes[activeId] && !el('archive').open) comparison('Word 中的译文', sentence.drafts || [], 'en');
});

function assess(status) {
  const id = activeId;
  const position = currentIds.indexOf(id);
  const next = currentIds[position + 1] ?? (range.value === 'retry' ? currentIds[0] : undefined);
  const answer = input.value.trim();
  if (status === 'learned' && !answer) return;
  pending.delete(id);
  hideGrade();
  settledRetryId = undefined;
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
