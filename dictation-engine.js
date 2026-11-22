// Online counterpart of the trainer's Journal. The state remains compatible with
// the original Mac backup, including the event history needed for corrected answers.
const scoreDefaults = {result:null, practiced:0, dictation:null, errorCount:0, spacedStage:0, dueDate:null, familiar:false};
const intervals = [1, 2, 4, 7, 15, 30];
const wrongOutcomes = new Set(['wrong', 'unknown', 'missed']);
const scoreTypes = new Set(['practice','result','answer','familiar']);
const own = (object, key) => Object.hasOwn(object, key) ? object[key] : undefined;
const groupOf = id => 'g' + Math.ceil(id / 20);

function requireEvent(condition, message, status = 409) {
  if (!condition) throw Object.assign(new Error(message), {status});
}

export function createVocabulary(rows, acceptedSpellings = {}, recordedIds) {
  const recorded = new Set(recordedIds ?? rows.filter(row => row.status !== 'pending').map(row => row.id));
  const groups = new Map([['all',new Set()],['full-all',new Set()],['supplement',new Set()]]);
  for (const row of rows) {
    const group = groupOf(row.id);
    if (!groups.has(group)) {
      groups.set(group, new Set());
      groups.set('full-' + group, new Set());
    }
    groups.get('full-all').add(row.id);
    groups.get('full-' + group).add(row.id);
    if (recorded.has(row.id)) {
      groups.get('all').add(row.id);
      groups.get(group).add(row.id);
    } else groups.get('supplement').add(row.id);
  }
  return {rows, groups, recorded, acceptedSpellings};
}

function grade(answer, row, spellings) {
  const value = answer.trim().toLowerCase().normalize('NFC');
  if (!value) return 'missed';
  if (value === '?' || value === '？') return 'unknown';
  return [row.word, row.spoken, own(spellings,row.word)].includes(value) ? 'correct' : 'wrong';
}

function checkEvent(input, vocab) {
  const check = (valid, text) => requireEvent(valid, text, 400);
  const idPattern = /^[A-Za-z0-9:._-]{1,128}$/;
  const roundPattern = /^[A-Za-z0-9._-]{1,128}$/;
  const validId = (v, regex) => typeof v === 'string' && regex.test(v);
  const inRange = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;
  check(input && typeof input === 'object', '需要练习事件');
  const {eventId, sessionId, wordId, type} = input;
  check(validId(eventId,idPattern) && validId(sessionId,idPattern), '无效的练习标识');
  check(inRange(wordId,1,vocab.rows.length), '无效的词序');
  const field = own({heard:'rep', practice:'count', result:'result', listen:'rep', answer:'answer', round:'action', meaning:'meaning', familiar:'action'},type);
  check(field, '无效的事件类型');
  const value = input[field];
  const e = {eventId,sessionId,wordId,type,[field]:value};
  switch (type) {
    case 'familiar':
      check(value==='mark' && inRange(input.expectedErrorCount,0,Number.MAX_SAFE_INTEGER), '无效的熟悉标记');
      e.expectedErrorCount = input.expectedErrorCount;
      break;
    case 'round': check(['start','partial'].includes(value), '无效的轮次操作'); break;
    case 'meaning': check(['known','unfamiliar'].includes(value), '无效的词义标记'); break;
    case 'result': check(['wrong','correct'].includes(value), '无效的听写结果'); break;
    case 'answer':
      check(typeof value === 'string' && [...value].length <= 128 &&
        (value.trim() || (value === '' && input.mode === 'dictation')), '无效的答案'); break;
    default: check(inRange(value, type === 'practice' ? 0 : 1, type === 'listen' ? 10000 : 30), '无效的遍数');
  }
  if (type === 'round' || Object.hasOwn(input,'roundId')) {
    check(validId(input.roundId,roundPattern) && vocab.groups.get(input.group)?.size, '无效的听写轮次或范围');
    check(type === 'round' || (type === 'answer' && input.mode === 'dictation' && vocab.groups.get(input.group).has(wordId)), '词不属于本轮');
    e.roundId = input.roundId;
    e.group = input.group;
  }
  if (type === 'listen' || type === 'answer') {
    check(['dictation','review'].includes(input.mode), '无效的练习方式');
    e.mode = input.mode;
  }
  if (type === 'answer') {
    check(inRange(input.attempt,1,10000), '无效的提交序号');
    e.attempt = input.attempt;
  }
  if (Object.hasOwn(input,'previousAnswer')) {
    check(type === 'answer' && e.mode === 'dictation' && e.roundId && typeof input.previousAnswer === 'string' && [...input.previousAnswer].length <= 128, '无效的改答');
    e.previousAnswer = input.previousAnswer;
  }
  const flags = ['extraReviewOf','frequent','spaced'].filter(f => Object.hasOwn(input,f));
  check(flags.length <= 1, '不能同时选择多种复习方式');
  for (const f of flags) {
    check(type === 'answer' && e.mode === 'review' && (f === 'extraReviewOf' ? validId(input[f],roundPattern) : input[f] === true), '无效的复习范围');
    e[f] = input[f];
  }
  if (Object.hasOwn(input,'occurredAt')) {
    check(typeof input.occurredAt === 'string' && input.occurredAt.length <= 40 && /(?:Z|[+-]\d{2}:?\d{2})$/.test(input.occurredAt) && Number.isFinite(Date.parse(input.occurredAt)), '无效的练习时间');
    e.occurredAt = input.occurredAt;
  }
  return e;
}

function roundFor(e, vocab) {
  if (e.type !== 'answer' || e.mode !== 'dictation') return undefined;
  return e.roundId ?? (vocab.recorded.has(e.wordId) ? 'legacy-' + groupOf(e.wordId) : undefined);
}

function newRound(id,group,at) {
  return {id,group,at,legacy:id.startsWith('legacy-'),status:'active',answers:{}};
}

function recordRound(rounds, e, vocab) {
  const id = roundFor(e,vocab);
  if (!id) return rounds;
  const group = e.group || groupOf(e.wordId);
  const row = own(rounds,id) || newRound(id,group,e.occurredAt || e.at);
  requireEvent(row.group === group, '轮次范围发生变化');
  const answers = {...row.answers,[e.wordId]:{answer:e.answer,outcome:e.outcome}};
  const status = Object.keys(answers).length === vocab.groups.get(group).size ? 'complete' : row.status;
  return {...rounds,[id]:{...row,answers,status}};
}

// Use the same Hong Kong study day on every device, including while travelling.
function studyDay(e, offset = 0) {
  return new Date(Date.parse(e.occurredAt || e.at) + (8 + 24 * offset) * 3600000).toISOString().slice(0,10);
}

function schedule(w,e,stage) {
  w.spacedStage = stage;
  w.dueDate = stage < intervals.length ? studyDay(e,intervals[stage]) : null;
}

function score(w,e,renew,vocab) {
  const before = w.practiced;
  let wrong = false;
  if (e.type === 'familiar' && before<30 && !w.familiar) {
    w.familiar = true;
    schedule(w,e,0);
  }
  if (e.type === 'practice') w.practiced = Math.min(30,before+e.count);
  if (e.type === 'result') {
    if (w.result !== 'wrong') w.result = e.result;
    wrong = e.result === 'wrong';
  }
  if (e.type === 'answer' && e.mode === 'dictation') {
    w.dictation = {answer:e.answer,outcome:e.outcome};
    wrong = e.outcome !== 'correct';
    if (wrong) w.result = 'wrong';
    else if (!vocab.recorded.has(e.wordId) && w.result !== 'wrong') w.result = 'correct';
  }
  if (e.type === 'answer' && e.mode === 'review') {
    if (e.spaced) {
      if ((before===30 || w.familiar) && w.dueDate && w.dueDate<=studyDay(e)) {
        if (e.outcome==='correct') schedule(w,e,(w.spacedStage || 0)+1);
        else if (w.familiar) Object.assign(w,{familiar:false,spacedStage:0,dueDate:null});
      }
    } else if (e.outcome==='correct' && !e.extraReviewOf) w.practiced = Math.min(30,before+1);
  }
  if (renew && wrong) Object.assign(w,{practiced:0,result:'wrong',errorCount:(w.errorCount || 0)+1,spacedStage:0,dueDate:null,familiar:false});
  else if (renew && before < 30 && w.practiced === 30) {
    w.familiar = false;
    schedule(w,e,0);
  }
}

function isReviewMistake(w, wordId, vocab, legacyMarks) {
  return w.result === 'wrong' || (legacyMarks?.[wordId] ?? vocab.rows[wordId-1].status) === 'wrong';
}

function rescore(w, events, wordId, vocab, legacyMarks) {
  const first = w.scoreSince;
  const baseline = events[first].priorScore;
  const history = events.map((event,index) => ({event,index})).filter(({event}) => event.wordId === wordId && scoreTypes.has(event.type));
  const replacements = new Map(history.filter(({event}) => Object.hasOwn(event,'previousAnswer')).map(({event}) => [event.roundId,event]));
  const old = history.filter(({index}) => index < first);
  const needsOld = old.some(({event}) => replacements.has(roundFor(event,vocab)));
  let next = {...scoreDefaults,...baseline};
  if (needsOld) {
    const prior = {practiced:0,result:null};
    for (const {event} of old) score(prior,event,false,vocab);
    next = {...scoreDefaults,practiced:Math.max(0,baseline.practiced-prior.practiced),result:prior.result == null ? baseline.result : null};
    if (!Object.hasOwn(prior,'dictation') && Object.hasOwn(baseline,'dictation')) next.dictation = baseline.dictation;
  }
  const applied = new Set();
  for (const {event,index} of history) {
    if (index < first && !needsOld) continue;
    // Correcting the only wrong answer can remove the reason this word was in review.
    if (event.type==='familiar' && !isReviewMistake(next,wordId,vocab,legacyMarks)) continue;
    const id = roundFor(event,vocab);
    if (applied.has(id)) continue;
    const replacement = replacements.get(id);
    if (replacement) applied.add(id);
    score(next,replacement || event,!!replacement || index >= first,vocab);
  }
  Object.assign(w,next);
}

export function prepareState(source, vocab) {
  if (!source) return {version:1,scoreRules:9,revision:0,words:{},sessions:{},rounds:{},events:[],aliases:{}};
  if (!source.words || !source.sessions || !Array.isArray(source.events) || !Number.isInteger(source.revision)) throw Error('听写记录格式无效');
  const db = {...source,aliases:source.aliases || {}};
  if (!db.rounds) {
    db.rounds = {};
    for (const event of db.events) db.rounds = recordRound(db.rounds,event,vocab);
  }
  if ((db.scoreRules || 0) < 9) {
    const affected = new Set();
    db.events.forEach((e,i) => {
      if (e.mode === 'review' && e.type === 'answer' && e.outcome !== 'correct' && i >= (db.words[e.wordId]?.scoreSince ?? db.events.length)) affected.add(e.wordId);
    });
    if (affected.size) db.words = {...db.words};
    for (const id of affected) {
      db.words[id] = {...db.words[id]};
      rescore(db.words[id],db.events,id,vocab,db.legacyMarks);
    }
    if (affected.size) db.revision++;
    db.scoreRules = 9;
  }
  return db;
}

export function compactState(state) {
  const {revision,words,sessions,rounds} = state;
  return {revision,words,sessions,rounds};
}

function delta(state,e,vocab) {
  const get = (map,k) => Object.hasOwn(map,k) ? {[k]:map[k]} : {};
  return {revision:state.revision,words:get(state.words,e.wordId),sessions:get(state.sessions,e.sessionId),rounds:get(state.rounds,e.roundId || roundFor(e,vocab))};
}

export function applyEvent(state,input,vocab,at = new Date().toISOString()) {
  const e = checkEvent(input,vocab);
  const {type,sessionId,wordId} = e;
  const originalId = own(state.aliases,e.eventId) || e.eventId;
  const identity = Object.keys(e).filter(k => k !== 'eventId' && k !== 'occurredAt');
  let duplicate;
  for (let i=state.events.length-1;i>=0;i--) {
    const old = state.events[i];
    if (old.eventId === originalId) {
      requireEvent(identity.every(k => old[k] === e[k]), '事件标识已使用');
      return {state,duplicate:true,delta:delta(state,e,vocab)};
    }
    if (old.sessionId === sessionId && identity.every(k => old[k] === e[k])) duplicate = old;
  }
  if (duplicate) {
    const next = {...state,aliases:{...state.aliases,[e.eventId]:duplicate.eventId}};
    return {state:next,duplicate:true,delta:delta(next,e,vocab)};
  }
  const next = {...state,revision:state.revision+1};
  const stored = {...e,word:vocab.rows[wordId-1].word,at};
  const w = {...(own(state.words,wordId) || {heard:0,practiced:0,result:null})};
  if (scoreTypes.has(type) && !Object.hasOwn(w,'scoreSince')) {
    w.scoreSince = state.events.length;
    stored.priorScore = Object.fromEntries(Object.entries(scoreDefaults).map(([k,v]) => [k,w[k] ?? v]));
  }
  if (type === 'meaning') {
    const mark = Date.parse(e.occurredAt || at);
    if (mark >= (w.meaningAt || 0)) Object.assign(w,{meaning:e.meaning,meaningAt:mark});
    next.words = {...state.words,[wordId]:w};
  } else if (type === 'familiar') {
    requireEvent(w.practiced<30 && isReviewMistake(w,wordId,vocab,state.legacyMarks),'此词没有待练的拼写任务');
    requireEvent((w.errorCount || 0)===e.expectedErrorCount,'此词的听写记录已更新，请重新选择');
    score(w,stored,true,vocab);
    next.words = {...state.words,[wordId]:w};
  } else if (type === 'round') {
    const r = own(state.rounds,e.roundId);
    if (!r && e.action === 'start') {
      next.rounds = {...state.rounds,[e.roundId]:newRound(e.roundId,e.group,e.occurredAt || at)};
    } else {
      requireEvent(r && r.group === e.group,'找不到这轮听写');
      if (e.action === 'partial' && r.status === 'active') next.rounds = {...state.rounds,[r.id]:{...r,status:'partial'}};
    }
  } else {
    const prior = own(state.sessions, sessionId) || {wordId,reps:[],confirmed:false,count:0,result:null,...(e.mode && {mode:e.mode,attempts:0})};
    const s = {...prior};
    requireEvent(s.wordId === wordId && s.mode === e.mode,'练习会话发生变化');
    if (type === 'heard' || type === 'listen') {
      requireEvent(type !== 'listen' || (!s.confirmed && e.rep === s.reps.length+1),'录音遍数不符');
      s.reps = [...s.reps,e.rep].sort((a,b)=>a-b);
      w.heard++;
    } else if (type === 'practice') {
      requireEvent(!s.confirmed && s.reps.length && e.count <= s.reps.length && w.practiced + e.count <= 30,'本轮练习遍数不符');
      Object.assign(s,{confirmed:true,count:e.count});
    } else if (type === 'answer') {
      requireEvent(s.reps.length && !s.confirmed && e.attempt === s.attempts + 1,'请先听录音后再提交');
      if (e.extraReviewOf) {
        const source = own(state.rounds,e.extraReviewOf)?.answers[wordId];
        requireEvent(w.practiced === 30 && wrongOutcomes.has(source?.outcome),'此词不在所选轮次的已完成错词中');
      }
      if (e.spaced) requireEvent((w.practiced===30 || w.familiar) && w.dueDate && w.dueDate <= studyDay(stored),'这个词的巩固任务尚未到期');
      if (e.frequent) requireEvent(w.errorCount >= 2,'此词未进入高频错词本');
      stored.outcome = grade(e.answer,vocab.rows[wordId-1],vocab.acceptedSpellings);
      s.attempts = e.attempt;
      if (e.mode === 'dictation') {
        if (e.roundId) {
          const r = own(state.rounds,e.roundId);
          requireEvent(r?.status === 'active','这轮听写已结束');
          requireEvent(r.answers[wordId]?.answer === e.previousAnswer,'这道题已经改答');
        }
        next.rounds = recordRound(state.rounds,stored,vocab);
        s.confirmed = true;
      } else if (stored.outcome === 'correct') {
        requireEvent(w.practiced < 30 || e.extraReviewOf || e.spaced || e.frequent,'这个词已完成本轮练习');
        Object.assign(s,{confirmed:true,count:Number(!e.spaced && w.practiced < 30)});
      }
    } else {
      requireEvent(s.result == null,'本轮已经判定');
      s.result = e.result;
    }
    if (Object.hasOwn(e,'previousAnswer')) rescore(w,[...state.events,stored],wordId,vocab,state.legacyMarks);
    else score(w,stored,true,vocab);
    next.words = {...state.words,[wordId]:w};
    next.sessions = {...state.sessions,[sessionId]:s};
  }
  next.events = [...state.events,stored];
  return {state:next,duplicate:false,delta:delta(next,e,vocab)};
}
