import { publicPlan } from './public-plan.js';

const base = new URL('./', import.meta.url);
const storageKey = 'shike.focus.timer.v1:' + base.pathname;
const noticeKey = storageKey + ':notifications';
const titlePrefix = '时间到了 · ';
let panel, state, interval, expanded = false, busy = false, error = '';
let mounted = false;

function boardURL(date) {
  const url = new URL(base);
  url.searchParams.set('date', date);
  url.hash = 'checkin';
  return url;
}

function taskURL(task, date) {
  if (task.href) {
    const url = new URL(task.href, base);
    if (url.origin === base.origin && url.pathname.startsWith(base.pathname)) return url;
  }
  return boardURL(date);
}

function externalMaterial(task) {
  if (!task.materialUrl) return null;
  try {
    const url = new URL(task.materialUrl);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

function visit(url) {
  if (url.href === location.href) return;
  const isBoard = url.pathname === base.pathname && url.hash === '#checkin';
  if (isBoard && document.getElementById('date')?.value === url.searchParams.get('date')) {
    history.replaceState(history.state, '', url);
    document.getElementById('day-title')?.scrollIntoView({block:'start'});
  } else location.assign(url.href);
}

function validQueue(value) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    Array.isArray(value.tasks) && !!value.tasks[value.index] && Number.isInteger(value.index) &&
    value.tasks.every(task => task && typeof task.id === 'string' && task.id && !task.id.includes('/') &&
      typeof task.title === 'string' && Number.isFinite(task.minutes) && task.minutes >= 0 &&
      (!task.href || typeof task.href === 'string'));
}

function read() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (validQueue(saved) && typeof saved.run === 'string' &&
      (Number.isFinite(saved.deadline) || (saved.deadline === null && Number.isFinite(saved.remaining)))) return saved;
  } catch { /* Other pages remain usable when storage is unavailable. */ }
  return null;
}

function remaining(s) {
  return Math.max(0, s.deadline === null ? s.remaining : s.deadline - Date.now());
}

function setText(node, text) {
  if (node.textContent !== text) node.textContent = text;
}

function noticeStatus() {
  if (!window.isSecureContext || typeof window.Notification?.requestPermission !== 'function') return 'unavailable';
  if (Notification.permission === 'denied') return 'denied';
  try {
    if (Notification.permission === 'granted' && localStorage.getItem(noticeKey) === 'on') return 'on';
  } catch { /* Page reminders still work. */ }
  return 'off';
}

async function toggleNotice() {
  try {
    if (noticeStatus() === 'on') localStorage.removeItem(noticeKey);
    else {
      const permission = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission;
      if (permission === 'granted') localStorage.setItem(noticeKey,'on');
      else if (permission === 'default') error = '到点会在拾课页面提醒。';
    }
  } catch { error = '系统提醒暂不可用，到点会在拾课页面提醒。'; }
  draw();
}

async function notifyDue(s) {
  if (noticeStatus() !== 'on') return;
  const claim = storageKey + ':notified';
  async function send() {
    if (read()?.run !== s.run || localStorage.getItem(claim) === s.run) return;
    localStorage.setItem(claim,s.run);
    const options = {body:s.tasks[s.index].title, tag:'shike-focus-'+s.run, data:{kind:'shike-focus',date:s.date}};
    const title = '学习时间到了，回来收尾';
    const reg = await navigator.serviceWorker?.getRegistration(base.href).catch(()=>null);
    if (reg?.active && reg.showNotification) await reg.showNotification(title,options);
    else {
      const notice = new Notification(title,options);
      notice.onclick = () => { window.focus(); notice.close(); };
    }
  }
  try {
    if (navigator.locks) await navigator.locks.request(claim,send);
    else await send();
  } catch { /* The on-page reminder remains available if system delivery fails. */ }
}

function updateTabTitle(expired) {
  if (expired && !document.title.startsWith(titlePrefix)) document.title = titlePrefix + document.title;
  if (!expired && document.title.startsWith(titlePrefix)) document.title = document.title.slice(titlePrefix.length);
}

function draw() {
  if (!panel) return;
  if (!state) {
    panel.hidden = true;
    updateTabTitle(false);
    clearInterval(interval);
    interval = undefined;
    return;
  }
  if (!panel.isConnected) document.body.append(panel);
  panel.hidden = false;
  const task = state.tasks[state.index], next = state.tasks[state.index + 1];
  const left = Math.ceil(remaining(state) / 1000);
  const phase = left === 0 ? 'expired' : state.deadline === null ? 'paused' : 'running';
  if (phase === 'expired' && panel.dataset.state !== phase) {
    expanded = true;
    if (!document.hidden) navigator.vibrate?.([120,80,120]);
    void notifyDue(state);
  }
  updateTabTitle(phase === 'expired');
  panel.dataset.state = phase;
  const node = id => panel.querySelector('#focus-' + id);
  const label = {expired:'时间到了', paused:'计时已暂停', running:'正在计时'}[phase];
  setText(node('phase'),label);
  setText(node('clock'),String(Math.floor(left/60)).padStart(2,'0') + ':' + String(left%60).padStart(2,'0'));
  setText(node('title'), task.title);
  node('toggle').setAttribute('aria-expanded',String(expanded));
  node('body').hidden = !expanded;
  setText(node('pause'), phase === 'paused' ? '继续' : '暂停');
  node('pause').hidden = phase === 'expired';
  setText(node('complete'), next ? '完成并进入下一项' : '完成并返回打卡');
  node('skip').hidden = !next;
  node('next').hidden = !next;
  if (next) setText(node('next'),'下一项' + (next.start ? ' · '+next.start : '') + '　' + next.title);
  const material = externalMaterial(task);
  node('material').hidden = !material;
  if (material) node('material').href = material;
  setText(node('message'),error || (phase === 'expired' ? '本项时间到了，可以收尾了。' : ''));
  for (const button of node('body').querySelectorAll('button')) button.disabled = busy;
  const notice = noticeStatus();
  node('notify').hidden = notice === 'unavailable';
  node('notify').disabled = busy || notice === 'denied';
  setText(node('notify'), notice === 'denied' ? '系统提醒已被浏览器关闭' : notice === 'on' ? '关闭系统提醒' : '开启系统提醒');
  if (phase === 'running' && !interval) interval = setInterval(draw,500);
  if (phase !== 'running') { clearInterval(interval); interval = undefined; }
}

function refresh() {
  const saved = read();
  if (saved?.run !== state?.run) {
    expanded = !!(saved && externalMaterial(saved.tasks[saved.index]));
    error = '';
    if (panel) delete panel.dataset.state;
  }
  state = saved;
  draw();
}

function stillCurrent() {
  const run = state?.run;
  refresh();
  return !!state && state.run === run;
}

function write(next) {
  try {
    if (next) localStorage.setItem(storageKey, JSON.stringify(next));
    else localStorage.removeItem(storageKey);
  } catch {
    const msg = '当前浏览器无法保存计时，请检查网站存储权限。';
    if (state) { error = msg; expanded = true; draw(); }
    else window.alert(msg);
    return false;
  }
  refresh();
  return true;
}

function begin({date,tasks,index}, openMaterial = false) {
  const current = tasks[index];
  const next = {run:crypto.randomUUID(), date,tasks,index, deadline:Date.now()+current.minutes*60000};
  if (!write(next)) return;
  const material = externalMaterial(current);
  if (openMaterial && material) window.open(material,'_blank','noopener,noreferrer');
  visit(taskURL(current,date));
}

export function startFocus({date,tasks,index}) {
  if (!validQueue({date,tasks,index})) return;
  mountFocusTimer();
  refresh();
  const current = tasks[index];
  if (state?.date === date && state.tasks[state.index].id === current.id) {
    expanded = true; draw();
    const material = externalMaterial(current);
    if (material) window.open(material,'_blank','noopener,noreferrer');
    visit(taskURL(current,date)); return;
  }
  if (state && !window.confirm('当前正在计时「'+state.tasks[state.index].title+'」。结束这项计时，开始新任务？')) return;
  begin({date,tasks,index},true);
}

function pauseOrResume() {
  if (!stillCurrent() || !remaining(state)) return;
  const left = remaining(state);
  error = '';
  write({...state, remaining:left, deadline:state.deadline === null ? Date.now()+left : null});
}

async function advance(markComplete) {
  if (busy || !stillCurrent()) return;
  const current = state;
  busy = true;
  error = '';
  draw();
  try {
    let next = current.index + 1;
    if (markComplete) {
      const key = current.date+'/'+current.tasks[current.index].id;
      const snapshot = await publicPlan.setCheckin(key,true);
      if (!snapshot?.checked?.[key]) throw Error('云端尚未确认打卡，请重试。');
      window.dispatchEvent(new CustomEvent('shike-focus-checkin',{detail:snapshot}));
      const day = snapshot.plan.find(d=>d.date===current.date);
      while (next < current.tasks.length && (!day?.tasks.some(t=>t.id===current.tasks[next].id) ||
        snapshot.checked[current.date+'/'+current.tasks[next].id])) next++;
    }
    if (read()?.run !== current.run) { refresh(); return; }
    if (next < current.tasks.length) {
      const openMaterial = externalMaterial(current.tasks[next]) !== externalMaterial(current.tasks[current.index]);
      begin({...current,index:next},openMaterial);
    }
    else if (write(null)) visit(boardURL(current.date));
  } catch (e) {
    if (read()?.run === current.run) {
      error = e.message || '打卡未确认，请联网后重试。';
      expanded = true;
    }
  } finally {
    busy = false;
    draw();
  }
}

function act(event) {
  switch (event.target.closest('button')?.id) {
    case 'focus-toggle': expanded = !expanded; draw(); break;
    case 'focus-pause': pauseOrResume(); break;
    case 'focus-notify': void toggleNotice(); break;
    case 'focus-complete': void advance(true); break;
    case 'focus-skip': void advance(false); break;
    case 'focus-stop':
      if (stillCurrent()) { const date = state.date; if (write(null)) visit(boardURL(date)); }
      break;
  }
}

export function mountFocusTimer() {
  if (mounted || !document.body) return;
  mounted = true;
  panel = document.createElement('section');
  panel.id = 'focus-timer';
  panel.setAttribute('aria-label','学习任务计时');
  panel.hidden = true;
  panel.innerHTML = `<button type="button" id="focus-toggle" aria-controls="focus-body" aria-expanded="false">
    <span class="focus-heading"><span id="focus-phase"></span><span id="focus-title"></span></span>
    <span id="focus-clock" role="timer" aria-label="任务剩余时间"></span><span class="focus-arrow" aria-hidden="true">⌃</span>
    </button><div id="focus-body" hidden><p id="focus-message" role="status"></p>
    <a id="focus-material" target="_blank" rel="noopener noreferrer" hidden>打开资料 ↗</a><p id="focus-next"></p>
    <div class="focus-actions"><button type="button" id="focus-complete">完成并进入下一项</button>
    <button type="button" id="focus-pause">暂停</button><button type="button" id="focus-skip">下一项，不打卡</button>
    <button type="button" id="focus-stop">结束计时</button>
    <button type="button" id="focus-notify">开启系统提醒</button></div></div>`;
  panel.addEventListener('click', act);
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet';
  sheet.href = new URL('./focus-timer.css',base).href;
  document.head.append(sheet);
  // The dictation player swaps its entire body after loading a star level.
  new MutationObserver(()=>{ if (state && !panel.isConnected && document.body) document.body.append(panel); })
    .observe(document.documentElement,{childList:true});
  const title = document.querySelector('title');
  if (title) new MutationObserver(()=>updateTabTitle(!!state && !remaining(state))).observe(title,{childList:true,characterData:true,subtree:true});
  window.addEventListener('storage',e=>{ if (e.key === storageKey || e.key === noticeKey || e.key === null) refresh(); });
  window.addEventListener('pageshow',refresh);
  document.addEventListener('visibilitychange',()=>{ if (!document.hidden) refresh(); });
  refresh();
}

mountFocusTimer();
