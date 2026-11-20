import {getCourseKey,publicJournalKey} from './course-access.js';
import {installDictationEngine} from './dictation-adapter.js';
import {journalEndpoint} from './dictation-sync.js';
import {prepareMaterialReads} from './material-cache.js';

export const reviewLevels = [
  {id:'six',label:'六星'},{id:'five',label:'五星'},{id:'four',label:'四星'},
  {id:'three',label:'三星'},{id:'two',label:'二星'},{id:'one',label:'一星'},
];

export function reviewJournalKey(url = new URL(location.href)) {
  const book = url.searchParams.get('book');
  const fragment = new URLSearchParams(url.hash.slice(1));
  const key = fragment.get('journal') ?? (book ? sessionStorage.getItem('shike.book.' + book) : publicJournalKey);
  if (!/^[A-Za-z0-9_-]{43}$/.test(key)) throw Error('无法识别这份听写记录，请重新打开原学习链接。');
  return key;
}

async function wordClips(folder) {
  const [response,key] = await Promise.all([fetch(folder+'player.bin'),getCourseKey()]);
  if (!response.ok) throw Error('单词录音暂时无法读取，请再试一次。');
  const bytes = new Uint8Array(await response.arrayBuffer());
  const plain = await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.subarray(0,12)},key,bytes.subarray(12));
  const {html} = JSON.parse(new TextDecoder().decode(plain));
  const start = '<script id="data" type="application/json">';
  const left = html.indexOf(start), right = html.indexOf('</script>',left);
  if (left < 0 || right < 0) throw Error('这一级的单词录音不完整。');
  return new Map(JSON.parse(html.slice(left+start.length,right)).map(row=>[row.id,row.mp3]));
}

export async function openReviewLevel(id,journalKey,onChange) {
  const level = reviewLevels.find(item=>item.id===id);
  if (!level) throw Error('无法识别星级。');
  const folder = './dictation-data/'+id+'/';
  await prepareMaterialReads();
  const response = await fetch(folder+'review.json');
  if (!response.ok) throw Error(level.label+'词表暂时无法读取。');
  const {words,recorded,acceptedSpellings} = await response.json();
  const engine = await installDictationEngine({level:id,words,times:recorded.map(id=>({id})),
    acceptedSpellings,journalKey,url:journalEndpoint});
  await engine.ready();
  let scores, clips;
  await refresh();

  function items() {
    const day = new Date(Date.now()+8*3600000).toISOString().slice(0,10);
    const marks = engine.legacyMarks();
    const result = [];
    for (const row of words) {
      const score = scores[row.id] || {};
      const practiced = score.practiced || 0;
      const due = practiced===30 && score.dueDate && score.dueDate<=day;
      if (!due && (practiced>=30 || (score.result!=='wrong' && (marks[row.id] ?? row.status)!=='wrong'))) continue;
      result.push({id:row.id,word:row.word,meaning:row.meaning,practiced,errorCount:score.errorCount || 0,
        dueDate:score.dueDate,kind:due ? 'spaced' : 'practice'});
    }
    return result;
  }

  async function refresh() {
    if (engine.reviewWords) scores = await engine.reviewWords();
    else {
      // A returning browser can still be controlled by the previous materials worker.
      const response = await engine.request('api/state');
      if (!response.ok) throw Error('无法读取已有的练习记录。');
      scores = (await response.json()).words;
    }
  }
  if (onChange) {
    window.addEventListener('shike-dictation-refresh',async ({detail})=>{
      if (detail && detail.stream !== engine.scope+'/'+id) return;
      await refresh();
      onChange();
    });
    document.addEventListener('visibilitychange',async ()=>{
      if (document.hidden) return;
      await engine.ready();
      await refresh();
      onChange();
    });
  }

  async function playSource(wordId) {
    clips ??= wordClips(folder).catch(error=>{ clips=undefined; throw error; });
    const mp3 = (await clips).get(wordId);
    if (!mp3) throw Error('未找到这个词的单词录音。');
    return 'data:audio/mpeg;base64,'+mp3;
  }

  async function record(wordId,answer,{sessionId,attempt=1,spaced=false}) {
    const base = {sessionId,wordId,mode:'review'};
    async function save(event) {
      const response = await engine.request('api/event',{...base,...event});
      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      return data.delta;
    }
    // The same listen and answer identifiers can be retried after a failed write.
    await save({type:'listen',rep:1,eventId:sessionId+':heard'});
    const delta = await save({type:'answer',answer,attempt,eventId:sessionId+':answer:'+attempt,...(spaced && {spaced:true})});
    scores = {...scores,[wordId]:delta.words[wordId]};
    const correct = delta.sessions[sessionId].confirmed;
    const outcome = correct ? 'correct' : ['?','？'].includes(answer.trim()) ? 'unknown' : 'wrong';
    return {outcome,practiced:delta.words[wordId].practiced};
  }
  return {...level,items,refresh,playSource,record,status:engine.status};
}
