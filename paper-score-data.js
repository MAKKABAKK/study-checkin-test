import {publicPlan} from './public-plan.js';

const empty = () => ({first:null,second:null,wrong:null,cause:''});
const labels = {first:'首遍成绩',second:'第二遍成绩',wrong:'首遍已确认错题',cause:'自报错因'};
const newTitle = /^真题听力成绩 · 剑(\d+) Test (\d+) Part (\d+)$/;
const oldTitle = /^剑(\d+) Test (\d+) · Part (\d+) 首次成绩$/;
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);

function error(code,message,extra) {
  return Object.assign(new Error(message),{code},extra);
}
function validatePart({volume,test,part}) {
  if (!Number.isInteger(volume) || volume<12 || volume>21 ||
      ![1,2,3,4].includes(test) || ![1,2,3,4].includes(part)) {
    throw error('invalid_score','请选择有效的册号、套号和 Part。');
  }
}
function validDate(date) {
  return typeof date==='string' && /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    Number.isFinite(Date.parse(date+'T00:00:00Z')) && new Date(date+'T00:00:00Z').toISOString().slice(0,10)===date;
}
function dayFor(plan,practice) {
  validatePart(practice);
  if (!validDate(practice.date)) throw error('invalid_score','请选择有效的练习日期。');
  const day = plan.find(row=>row.date===practice.date);
  if (!day) throw error('missing_day','这一天没有学习计划，请选择实际练习所在的计划日。');
  return day;
}
export function paperScoreTitle({volume,test,part}) {
  return '真题听力成绩 · 剑'+volume+' Test '+test+' Part '+part;
}

function normalize(field,value,part) {
  if (field==='cause') {
    if (value===null) return '';
    if (typeof value==='string' && value.trim().length<=500) return value.trim();
  } else if (value===null) {
    return null;
  } else if (field==='wrong') {
    const first = (part-1)*10+1;
    if (Array.isArray(value) && value.every(n=>Number.isInteger(n) && n>=first && n<first+10)) {
      return [...new Set(value)].sort((a,b)=>a-b);
    }
    throw error('invalid_score','错题号须在本 Part 的 '+first+'–'+(first+9)+' 题内。');
  } else if (Number.isInteger(value) && value>=0 && value<=10) {
    return value;
  }
  throw error('invalid_score',field==='cause' ? '请将错因控制在 500 字以内。' : '每遍成绩请填 0–10 的整数，未知可留空。');
}
function parseLine(field,text,part) {
  if (text==='未记录') return field==='cause' ? '' : null;
  if (field==='cause') return text;
  if (field==='wrong') {
    if (text==='无') return [];
    const nums=text.split('、').map(Number);
    try { return normalize('wrong',nums,part); } catch { return null; }
  }
  const n = /^(10|[0-9])\/10$/.exec(text);
  return n ? Number(n[1]) : null;
}
function renderLine(field,value) {
  let text = '未记录';
  if (field==='cause') text = value || text;
  else if (field==='wrong' && value!==null) text = value.length ? value.join('、') : '无';
  else if (value!==null) text = value+'/10';
  return labels[field]+'：'+text;
}

export function scoreFromDay(day,practice) {
  const result=empty();
  const cards=day?.details || [];
  const legacy=cards.find(c=>c.title==='剑'+practice.volume+' Test '+practice.test+' · Part '+practice.part+' 首次成绩');
  for (const line of legacy?.lines || []) {
    const match=/第一遍答对\s*(10|[0-9])\s*题/.exec(line);
    if (match) { result.first=Number(match[1]); break; }
  }
  const card=cards.find(c=>c.title===paperScoreTitle(practice));
  for (const line of card?.lines || []) {
    for (const [field,label] of Object.entries(labels)) {
      if (line.startsWith(label+'：')) result[field]=parseLine(field,line.slice(label.length+1),practice.part);
    }
  }
  return result;
}

export function paperScoreHistory(plan) {
  const rows=[];
  for (const day of plan) {
    const seen=new Set();
    for (const card of day.details || []) {
      const match=newTitle.exec(card.title) || oldTitle.exec(card.title);
      if (!match) continue;
      const [volume,test,part]=match.slice(1).map(Number);
      const practice={date:day.date,volume,test,part};
      const id=paperScoreTitle(practice);
      if (seen.has(id)) continue;
      seen.add(id);
      const score=scoreFromDay(day,practice);
      if (!same(score,empty())) rows.push({...practice,...score});
    }
  }
  return rows.sort((a,b)=>b.date.localeCompare(a.date) || a.volume-b.volume || a.test-b.test || a.part-b.part);
}

export async function readPaperHistory(practice,store=publicPlan) {
  validatePart(practice);
  const {plan}=await store.getSnapshot();
  return paperScoreHistory(plan).filter(r=>r.volume===practice.volume && r.test===practice.test && r.part===practice.part);
}
export async function readPaperScore(practice,store=publicPlan) {
  const {plan}=await store.getSnapshot();
  return scoreFromDay(dayFor(plan,practice),practice);
}

export async function savePaperScore(practice,baseline,patch,store=publicPlan) {
  validatePart(practice);
  const entries=Object.entries(patch).map(([field,value])=>{
    if (!Object.hasOwn(labels,field)) throw error('invalid_score','无法识别这个成绩字段。');
    return [field,normalize(field,value,practice.part)];
  });
  for (let attempt=0;attempt<4;attempt++) {
    const {plan,checked,revision}=await store.getSnapshot();
    const day=dayFor(plan,practice);
    const current=scoreFromDay(day,practice);
    const updates=entries.filter(([field,value])=>!same(current[field],value));
    if (!updates.length) return current;
    if (updates.some(([field])=>!same(current[field],baseline[field]))) {
      throw error('score_conflict','另一台设备已修改同一项成绩，请重新核对后保存。',{current});
    }
    const next={...current,...Object.fromEntries(updates)};
    if (next.first!==null && next.wrong!==null &&
        (next.wrong.length>10-next.first || (!next.wrong.length && next.first!==10))) {
      throw error('invalid_score','首遍成绩与错题号不一致。只记得成绩时，可把错题号留空。');
    }
    const title=paperScoreTitle(practice);
    const details=[...(day.details || [])];
    const index=details.findIndex(card=>card.title===title);
    const existing=details[index] ?? {title,lines:[]};
    const lines=[...existing.lines];
    for (const [field,value] of updates) {
      const i=lines.findIndex(line=>line.startsWith(labels[field]+'：'));
      if (i===-1) lines.push(renderLine(field,value));
      else lines[i]=renderLine(field,value);
    }
    const card={...existing,lines};
    if (index<0) details.push(card);
    else details[index]=card;
    try {
      await store.importBackup(plan.map(d=>d===day ? {...day,details} : d),checked,revision);
      return next;
    } catch (e) {
      // The public plan API also changes revision when a checkbox is toggled.
      if (e.code!=='conflict' && !e.message?.includes('云端进度已更新')) throw e;
      if (attempt===3) throw error('plan_busy','计划正在其他设备上更新，请稍后再保存。');
    }
  }
}
