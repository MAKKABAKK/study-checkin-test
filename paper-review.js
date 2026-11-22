const el = id => document.getElementById('paper-'+id);
const panel = el('review'), questions = el('questions'), transcript = el('transcript');
const mainAudio = el('player'), snippet = new Audio();
snippet.preload = 'none';

let files, key, item, ranges, locationEntry, firstQuestion, selected, endTime, stopTimer;
let playback = 0, requestId = 0, captions, captionsUrl, captionRequest, activeButton;
const fallback = el('replay');
const clock = s => Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');

function loadFiles() {
  return files ??= Promise.all(['data','cues','locations'].map(async name=>{
    const res = await fetch('./paper-review-'+name+'.json');
    if (!res.ok) throw Error(name);
    return res.json();
  })).catch(err=>{ files = null; throw err; });
}

function stopSnippet() {
  playback++;
  clearTimeout(stopTimer);
  endTime = null;
  snippet.pause();
  if (activeButton) activeButton.textContent = activeButton===fallback ? '重听定位片段' : '重听这句';
  activeButton = null;
}

// Native timeupdate can be several hundred milliseconds apart. Check the media
// clock again near the boundary, including after a seek, stall or speed change.
function checkBoundary() {
  clearTimeout(stopTimer);
  if (endTime == null || snippet.paused) return;
  const left = endTime-snippet.currentTime;
  if (left <= 0.025) { stopSnippet(); return; }
  stopTimer = setTimeout(checkBoundary,Math.max(30,Math.min(450,left*1000/snippet.playbackRate)));
}
for (const name of ['playing','seeked','ratechange','timeupdate']) snippet.addEventListener(name,checkBoundary);
snippet.addEventListener('ended',stopSnippet);
function playbackFailed() {
  const otherTrack = activeButton !== fallback && Boolean(ranges?.[selected]);
  stopSnippet();
  if (otherTrack) fallback.hidden = false;
  el('clip-status').textContent = otherTrack
    ? '这句的音频暂时未载入，可以点「重听定位片段」用另一份原音重听。'
    : '音频暂时未载入，请再试一次，或打开下方来源页。';
}
snippet.addEventListener('error',()=>{
  if (endTime == null) return;
  playbackFailed();
});
mainAudio.addEventListener('play',()=>{
  stopSnippet();
  if (transcript.open) closeTranscript();
});
el('rate').addEventListener('change',()=>{snippet.playbackRate = Number(el('rate').value)});

function closeTranscript() {
  transcript.open = false;
  el('transcript-frame').replaceChildren();
}
function resetQuestion() {
  stopSnippet();closeTranscript();
  requestId++;
  selected = null;
  el('lines').replaceChildren();
  el('pick-label').hidden = true;
  el('lines-status').textContent = '';
  el('solution').hidden = true;
  el('answer').textContent = '';
  el('clip-status').textContent = '';
  el('guide').removeAttribute('href');
}
export function setReviewPart(volume,test,part) {
  key = volume+'/'+test+'/'+part;
  firstQuestion = (part-1)*10+1;
  panel.open = false;
  resetQuestion();
  captionRequest?.abort(); captions = null; captionsUrl = null;
  item = null; ranges = null; locationEntry = null;
  questions.replaceChildren();
  el('review-status').textContent = '';
  panel.hidden = volume>17;
}

async function listQuestions() {
  resetQuestion();
  questions.replaceChildren();
  const requested = key;
  el('review-status').textContent = '正在读取本段题号…';
  try {
    const [keys,cues,locs] = await loadFiles();
    if (!panel.open || requested!==key) return;
    item = keys[key];ranges = cues[key];locationEntry = locs[key];
    if (!item?.answers || item.answers.length!==10) throw Error('missing part');
    const buttons = item.answers.map((_,i)=>{
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = String(firstQuestion+i);
      button.setAttribute('aria-label','第 '+(firstQuestion+i)+' 题');
      button.setAttribute('aria-pressed','false');
      button.onclick = ()=>showQuestion(i);
      return button;
    });
    questions.replaceChildren(...buttons);
    el('review-status').textContent = '选一道要核对的题。';
  } catch {
    if (requested===key && panel.open) el('review-status').textContent = '本段核对资料暂时未能读取，请收起后再试。';
  }
}
panel.addEventListener('toggle',()=>{
  if (panel.open) { mainAudio.pause(); listQuestions(); }
  else resetQuestion();
});

function showQuestion(i) {
  resetQuestion();
  selected = i;
  const number = firstQuestion+i;
  for (const [j,button] of Array.from(questions.children).entries()) button.setAttribute('aria-pressed',String(j===i));
  el('question-title').textContent = '第 '+number+' 题';
  const pair = item.pairs?.find(group=>group.includes(number));
  el('answer').textContent = pair ? pair.map(n=>item.answers[n-firstQuestion]).join('、') : item.answers[i];
  el('pair').hidden = !pair;
  el('pair').textContent = pair ? '第 '+pair.join('、')+' 题为一组，两项顺序均可。' : '';
  const cue = ranges?.[i];
  fallback.hidden = !cue;
  el('clip-status').textContent = '';
  const loc = locationEntry?.questions?.[i];
  el('guide').href = item.guide;
  el('transcript-position').textContent = loc ? '在来源页的「原文」中查找约 '+clock(loc.time)+' 处的句子。' : '在来源页选择「原文」，可点句收听。';
  el('lines-heading').textContent = pair ? '本组录音原文 · 新东方' : '录音原文 · 新东方';
  void showLines(loc,pair,requestId);
  el('solution').hidden = false;
}

transcript.addEventListener('toggle',()=>{
  const host = el('transcript-frame');
  host.replaceChildren();
  if (!transcript.open || !panel.open || selected==null) return;
  mainAudio.pause();stopSnippet();
  const frame = document.createElement('iframe');
  frame.title = '新东方 · 第 '+(firstQuestion+selected)+' 题所在段的原文';
  frame.referrerPolicy = 'no-referrer';
  frame.src = el('guide').href;
  host.append(frame);
});
async function playClip(button,src,start,end) {
  if (activeButton===button && endTime!=null) {stopSnippet();return;}
  mainAudio.pause();stopSnippet();closeTranscript();
  const token = ++playback;
  try {
    if (snippet.src!==src || snippet.error) snippet.src=src;
    snippet.defaultPlaybackRate=snippet.playbackRate=Number(el('rate').value);
    snippet.currentTime=start;
    endTime=end;
    el('clip-status').textContent=clock(start)+'–'+clock(end);
    activeButton=button;button.textContent='停止重听';
    await snippet.play();
    if (token===playback) checkBoundary();
  } catch {
    if (token!==playback) return;
    playbackFailed();
  }
}
fallback.onclick=()=>{
  const cue=ranges?.[selected];
  if (cue) void playClip(fallback,mainAudio.src,...cue);
};

// Read the public captions from the publisher only after a learner reveals an
// answer. Keep the current Part in memory. Never store the source transcript.
function getCaptions(url) {
  if (captions && captionsUrl===url) return captions;
  captionRequest?.abort();
  const controller = new AbortController();
  captionRequest=controller;captionsUrl=url;
  const timeout=setTimeout(()=>controller.abort(),12000);
  captions=fetch(url,{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal})
    .then(async res=>{
      if (!res.ok) throw Error('source unavailable');
      const rows=await res.json();
      if (!Array.isArray(rows)) throw Error('unexpected captions');
      return rows;
    }).catch(error=>{
      if (captionRequest===controller) captions=null;
      throw error;
    }).finally(()=>clearTimeout(timeout));
  return captions;
}

function renderLines(indices,rows) {
  const elements=[];
  for (const index of [...new Set(indices)]) {
    const line=rows[index];
    if (!line || typeof line.entext!=='string') continue;
    // Some captions mark the answer with formatting. Copy only visible text.
    const tmp=document.createElement('template');
    tmp.innerHTML=line.entext;
    const text=tmp.content.textContent.trim();
    if (!text) continue;
    const row=document.createElement('div'), quote=document.createElement('p');
    row.className='paper-line';
    quote.lang='en';quote.textContent=text;row.append(quote);
    const start=Number(line.start)/1000,end=Number(line.end)/1000;
    if (locationEntry.audio && Number.isFinite(start) && Number.isFinite(end) && end>start && start>=0) {
      const button=document.createElement('button');button.type='button';button.textContent='重听这句';
      button.onclick=()=>void playClip(button,locationEntry.audio,start,end);
      row.append(button);
    }
    elements.push(row);
  }
  el('lines').replaceChildren(...elements);
  return elements.length;
}

async function showLines(loc,pair,ticket) {
  const status=el('lines-status');
  if (!locationEntry?.url) {status.textContent='请打开下方来源页查看本段原文。';return;}
  status.textContent='正在从新东方读取原句…';
  try {
    const rows=await getCaptions(locationEntry.url);
    if (ticket!==requestId) return;
    const indices=pair ? pair.flatMap(n=>locationEntry.questions[n-firstQuestion]?.indices || []).sort((a,b)=>a-b) : (loc?.indices || []);
    if (renderLines(indices,rows)) {
      status.textContent='';
      if (el('lines').querySelector('button')) fallback.hidden=true;
      return;
    }
    status.textContent='来源未标出这道题的对应句。可以按句挑选和重听。';
    const pick=el('pick'),placeholder=new Option('选择一句','');
    pick.replaceChildren(placeholder,...rows.map((line,j)=>new Option('第 '+(j+1)+' 句 · '+clock(Number(line.start)/1000),String(j))));
    el('pick-label').hidden=false;
    pick.onchange=()=>{stopSnippet();renderLines(pick.value==='' ? [] : [Number(pick.value)],rows);};
  } catch {
    if (ticket!==requestId) return;
    status.textContent='暂时未能读取原句。可以重新点本题，或打开下方来源页。';
  }
}
