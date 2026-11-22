import {bookTestNumber,testNumbers} from './paper-audio-links.js';

const el = id => document.getElementById('paper-'+id);
const volume = el('volume'), test = el('test'), audio = el('player');
const buttons = [...el('parts').getElementsByTagName('button')];
const url = new URL(location.href);
const publisherBooks = {18:1360,19:2417,20:2695,21:3126};
const requestedVolume = Number(url.searchParams.get('volume'));
volume.value = String(testNumbers(requestedVolume).length ? requestedVolume : 12);
const initialPart = Number(url.searchParams.get('part')) || 1;
const requestedEnd = Number(url.searchParams.get('end'));
let end = requestedEnd>=initialPart && requestedEnd<=4 ? requestedEnd : 4;
let part, clipEnd, selection = 0;

function fillTests(preferred) {
  const ids = testNumbers(Number(volume.value));
  test.replaceChildren(...ids.map(id=>new Option('Test '+id+' · 第 '+id+' 套',id)));
  test.value = String(bookTestNumber(Number(volume.value),preferred) ?? ids[0]);
}
function choose(partNumber, play = false) {
  const ticket = ++selection;
  part = partNumber;
  const base = 'https://eol.nju.edu.cn/ielts/';
  const nextUrl = new URL(location.href);
  nextUrl.searchParams.set('volume',volume.value);
  nextUrl.searchParams.set('test',test.value);
  if (end<4) nextUrl.searchParams.set('end',end);
  else nextUrl.searchParams.delete('end');
  if (part===1 && end===4) nextUrl.searchParams.delete('part');
  else nextUrl.searchParams.set('part',part);
  history.replaceState(history.state,'',nextUrl);
  const paper = '剑'+volume.value+' Test '+test.value;
  const publisherId = publisherBooks[volume.value];
  el('inline').hidden=Boolean(publisherId);
  if (publisherId) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    clipEnd=0;
    el('title').textContent=paper;
    el('status').textContent='请在新东方授权题库选择 Test '+test.value+'。播放时可能需要登录。';
    el('source').href='https://liuxue.koolearn.com/ielts/listen-0-'+publisherId+'-0/';
    el('source').textContent='打开剑'+volume.value+'授权听力题库';
    return;
  }
  const label = paper+' · Part '+part;
  el('title').textContent = label;
  audio.setAttribute('aria-label',label+'播放控件');
  for (const button of buttons) button.setAttribute('aria-pressed',String(Number(button.value)===part));
  el('source').href = base+'papers/b'+volume.value+'t'+test.value+'.html';
  el('source').textContent = '音频来源：南京大学大学外语部 · 打开本套原页';
  el('status').textContent = '第 '+((part-1)*10+1)+'–'+(part*10)+' 题';
  audio.pause();
  // This source track includes the next test after its closing announcement.
  clipEnd = volume.value==='14' && test.value==='2' && part===4 ? 515 : 0;
  if (clipEnd) el('status').textContent += ' · 本节在 8:35 结束';
  audio.src = base+'m/'+volume.value+'/'+test.value+'/s'+part+'.mp3'+(clipEnd?'#t=0,'+clipEnd:'');
  audio.defaultPlaybackRate = audio.playbackRate = Number(el('rate').value);
  if (play) audio.play().catch(()=>{
    if (ticket===selection && !audio.error) el('status').textContent = '点播放器的播放键继续。';
  });
}

volume.onchange = ()=>{end=4;fillTests();choose(1)};
test.onchange = ()=>{end=4;choose(1)};
for (const button of buttons) button.onclick = ()=>{
  if (Number(button.value)>end) end=4;
  choose(Number(button.value),true);
};
el('continuous').onchange = ()=>{
  if (el('continuous').checked) {
    end=4;
    const current=new URL(location.href);current.searchParams.delete('end');history.replaceState(history.state,'',current);
  }
};
el('rate').onchange = ()=>{audio.defaultPlaybackRate=audio.playbackRate=Number(el('rate').value)};
audio.onseeking = ()=>{
  if (clipEnd && audio.currentTime>clipEnd) audio.currentTime=clipEnd;
};
audio.ontimeupdate = ()=>{
  if (clipEnd && audio.currentTime>=clipEnd-0.05) {
    audio.pause();
    el('status').textContent='本套已播完。';
  }
};
audio.onplay = ()=>{
  if (clipEnd && audio.currentTime>=clipEnd-0.05) audio.currentTime=0;
};
audio.onended = ()=>{
  if (part < end && el('continuous').checked) choose(part+1,true);
  else el('status').textContent = part===4 ? '本套已播完。' : '本节已播完。';
};
audio.onerror = ()=>{
  if (audio.error) el('status').textContent = '音频未能载入。点当前 Part 重试，或打开下方来源页。';
};
fillTests(Number(url.searchParams.get('test')));
if (end===initialPart) el('continuous').checked=false;
choose([1,2,3,4].includes(initialPart)?initialPart:1);
