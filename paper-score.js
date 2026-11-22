const el = id => document.getElementById('paper-score'+(id ? '-'+id : ''));
const panel = el(''), form = el('form'), dates = el('date'), custom = el('custom');
const fields = el('fields'), wrong = el('wrong'), status = el('status'), reload = el('reload');
const todayHK = () => new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Hong_Kong'}).format(new Date());
const empty = {first:null,second:null,wrong:null,cause:''};
const drafts = new Map();
let version = 0, practice, history = [], selectedDate = '', baseline, pending;

function key(date = selectedDate) {
  return [practice.volume,practice.test,practice.part,date].join('/');
}
function formValue() {
  const number = id => el(id).value === '' ? null : Number(el(id).value);
  const marked = [...wrong.querySelectorAll('[aria-pressed="true"]')].map(button=>Number(button.value));
  return {first:number('first'),second:number('second'),wrong:marked.length ? marked : null,cause:el('cause').value.trim()};
}
function changes(value,base) {
  return Object.fromEntries(Object.entries(value).filter(([field,v])=>
    field==='wrong' ? (v ?? []).join(',') !== (base.wrong ?? []).join(',') : v!==base[field]));
}
function edit() {
  if (!baseline || !selectedDate) return;
  const value=formValue(), changed=Object.keys(changes(value,baseline)).length>0;
  if (changed) drafts.set(key(),{baseline,value});
  else drafts.delete(key());
  el('save').disabled=!changed;
  status.textContent=changed ? '填写后点「保存成绩」同步到每日打卡。' : '';
}
function showDate(date) {
  selectedDate=date;
  const saved=history.find(row=>row.date===date);
  const draft=drafts.get(key());
  baseline=draft?.baseline || saved || empty;
  const value=draft?.value || baseline;
  for (const name of ['first','second','cause']) el(name).value=value[name] ?? '';
  for (const button of wrong.children) {
    button.setAttribute('aria-pressed',String(Boolean(value.wrong?.includes(Number(button.value)))));
  }
  el('extra').open=Boolean(value.wrong?.length || value.cause);
  el('save').disabled=!draft;
  if (draft) status.textContent='这次填写尚未保存。';
  else if (saved) status.textContent=saved.second==null ? '已载入这次练习。补记第二遍后点「保存成绩」。' : '已载入这次练习的成绩。';
  else status.textContent='只填已知的成绩即可，复听结束后可以补记。';
}
function dateOptions(chosen) {
  const today=todayHK();
  const available=[...new Set([today,chosen,...history.map(row=>row.date)])].sort().reverse();
  dates.replaceChildren(...available.map(date=>{
    const row=history.find(entry=>entry.date===date);
    const labels=[date];
    if (date===today) labels.push('今天');
    if (row?.first!=null) labels.push('首听 '+row.first+'/10');
    if (row?.second!=null) labels.push('第二遍 '+row.second+'/10');
    if (row && row.first==null && row.second==null) labels.push('已记录');
    return new Option(labels.join(' · '),date);
  }),new Option('选择其他练习日期…','other'));
  dates.value=chosen;
  el('custom-label').hidden=true;
  custom.required=false;
  custom.max=today;
  showDate(chosen);
}
dates.addEventListener('change',()=>{
  const other=dates.value==='other';
  el('custom-label').hidden=!other;
  custom.required=other;
  if (other) {
    custom.value='';
    showDate('');
    status.textContent='请选择要补记的练习日期。';
    custom.focus();
  } else showDate(dates.value);
});
custom.addEventListener('change',()=>showDate(custom.value));
for (const name of ['first','second','cause']) el(name).addEventListener('input',edit);
wrong.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if (!button) return;
  button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));
  edit();
});

async function openScores(preferred) {
  const current=++version;
  const url=new URL(location.href);
  practice={volume:Number(url.searchParams.get('volume')),test:Number(url.searchParams.get('test')),part:Number(url.searchParams.get('part')) || 1};
  selectedDate='';baseline=null;
  form.hidden=true;reload.hidden=true;status.textContent='正在读取这段的成绩…';
  try {
    const {readPaperHistory}=await import('./paper-score-data.js');
    if (pending) await pending.catch(()=>{});
    if (current!==version || !panel.open) return;
    const rows=await readPaperHistory(practice);
    if (current!==version || !panel.open) return;
    history=rows;
    const today=todayHK();
    const lastDraftDate=[...drafts.keys()].filter(id=>id.startsWith(key(''))).map(id=>id.split('/').at(-1)).sort().at(-1);
    const chosen=preferred || lastDraftDate || (rows.some(row=>row.date===today) ? today : rows[0]?.date) || today;
    wrong.replaceChildren(...Array.from({length:10},(_,i)=>{
      const number=(practice.part-1)*10+i+1, button=document.createElement('button');
      button.type='button';button.value=String(number);button.textContent=String(number);
      button.setAttribute('aria-label','首听错题 '+number);
      return button;
    }));
    dateOptions(chosen);
    fields.disabled=false;form.hidden=false;
  } catch (error) {
    if (current!==version || !panel.open) return;
    status.textContent='未能读取这段成绩。'+error.message;reload.hidden=false;
  }
}
panel.addEventListener('toggle',()=>{
  if (panel.open) void openScores();
  else version++;
});
panel.addEventListener('partchange',()=>{
  version++;
  form.hidden=true;status.textContent='';reload.hidden=true;
});
reload.onclick=()=>{
  // A conflict requires the learner to see the other device's edit before changing it.
  if (selectedDate) drafts.delete(key());
  void openScores(selectedDate);
};
form.onsubmit=async event=>{
  event.preventDefault();
  if (!selectedDate || !baseline || fields.disabled) return;
  const patch=changes(formValue(),baseline);
  if (!Object.keys(patch).length) return;
  const current=version, id=key(), savedPractice={...practice,date:selectedDate};
  const base=baseline;
  fields.disabled=true;status.textContent='正在保存成绩…';
  try {
    pending=import('./paper-score-data.js').then(({savePaperScore})=>savePaperScore(savedPractice,base,patch));
    const saved=await pending;
    drafts.delete(id);
    if (current!==version || !panel.open) return;
    history=[{date:selectedDate,...saved},...history.filter(row=>row.date!==selectedDate)].sort((a,b)=>b.date.localeCompare(a.date));
    dateOptions(selectedDate);
    status.textContent='已保存到 '+selectedDate+' 的每日打卡。';
  } catch (error) {
    if (current!==version || !panel.open) return;
    status.textContent=error.message;
    if (error.code==='score_conflict') {
      status.textContent+=' 点「重新读取」查看云端新值，再填写需要修改的项目。';reload.hidden=false;
    }
  } finally {
    pending=null;
    if (current===version && panel.open) fields.disabled=!reload.hidden;
  }
};
