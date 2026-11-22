import {publicJournalKey} from './course-access.js';
import {getWordAudio} from './word-audio.js';
import {installDictationEngine} from './dictation-adapter.js';
import {journalEndpoint} from './dictation-sync.js';
import {prepareMaterialReads} from './material-cache.js';

export const reviewLevels = [
  {id:'six',label:'六星'},{id:'five',label:'五星'},{id:'four',label:'四星'},
  {id:'three',label:'三星'},{id:'two',label:'二星'},{id:'one',label:'一星'},
];

export function mixedReviewKind(score,status,day) {
  if (score.practiced >= 30 || score.familiar) {
    return score.dueDate && score.dueDate <= day ? 'spaced' : null;
  }
  return score.result === 'wrong' || status === 'wrong' ? 'practice' : null;
}

export function reviewJournalKey(url = new URL(location.href)) {
  const book = url.searchParams.get('book');
  const fragment = new URLSearchParams(url.hash.slice(1));
  const key = fragment.get('journal') ?? (book ? sessionStorage.getItem('shike.book.' + book) : publicJournalKey);
  if (!/^[A-Za-z0-9_-]{43}$/.test(key)) throw Error('无法识别这份听写记录，请重新打开原学习链接。');
  return key;
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
  let scores;
  await refresh();

  function items() {
    const day = new Date(Date.now()+8*3600000).toISOString().slice(0,10);
    const marks = engine.legacyMarks();
    const result = [];
    for (const row of words) {
      const score = scores[row.id] || {};
      const kind = mixedReviewKind(score,marks[row.id] ?? row.status,day);
      if (!kind) continue;
      result.push({id:row.id,word:row.word,meaning:row.meaning,practiced:score.practiced || 0,errorCount:score.errorCount || 0,
        dueDate:score.dueDate,familiar:score.familiar === true,kind});
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

  async function save(event) {
    const response = await engine.request('api/event',event);
    const data = await response.json();
    if (!response.ok) throw Object.assign(Error(data.error),{status:response.status});
    return data.delta;
  }

  async function markFamiliar(wordId,stableId,expectedErrorCount=scores[wordId]?.errorCount || 0) {
    const delta = await save({type:'familiar',action:'mark',wordId,eventId:stableId,sessionId:stableId,expectedErrorCount});
    const score = delta.words[wordId];
    scores = {...scores,[wordId]:score};
    return score;
  }

  async function record(wordId,answer,{sessionId,attempt=1,spaced=false}) {
    const base = {sessionId,wordId,mode:'review'};
    // The same listen and answer identifiers can be retried after a failed write.
    await save({...base,type:'listen',rep:1,eventId:sessionId+':heard'});
    const delta = await save({...base,type:'answer',answer,attempt,eventId:sessionId+':answer:'+attempt,...(spaced && {spaced:true})});
    const score = delta.words[wordId];
    scores = {...scores,[wordId]:score};
    const correct = delta.sessions[sessionId].confirmed;
    const outcome = correct ? 'correct' : ['?','？'].includes(answer.trim()) ? 'unknown' : 'wrong';
    return {outcome,practiced:score.practiced,familiar:score.familiar === true};
  }
  return {...level,items,refresh,playSource:wordId=>getWordAudio(id,wordId),record,markFamiliar,status:engine.status};
}
