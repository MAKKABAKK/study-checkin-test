import {publicJournalKey,journalScope} from './course-access.js';
import {createDictationSync,journalEndpoint} from './dictation-sync.js';

const publicPrefix = 'shike.translation.v1.';
const empty = {draft:'',previous:'',status:''};
const fields = Object.keys(empty);
const validId = id => Number.isSafeInteger(id) && id >= 1 && id <= 100;
const validValue = (field,value) => field === 'status' ? ['','retry','learned'].includes(value) :
  (field === 'draft' || field === 'previous') && typeof value === 'string' && value.length <= 1200;
const validStamp = stamp => typeof stamp === 'string' && /^[0-9a-z]{11}-[0-9a-f-]{36}$/.test(stamp);

export function createTranslationProgress(onChange) {
  const win = window;
  const page = new URL(win.location.href);
  const book = page.searchParams.get('notebook') || page.searchParams.get('book');
  let journal = new URLSearchParams(page.hash.slice(1)).get('journal');
  if (journal === null && book) {
    try { journal = win.sessionStorage.getItem('shike.book.'+book); } catch { /* Unavailable bookmark. */ }
  }
  if (journal === null && !book) journal = publicJournalKey;
  const validJournal = /^[A-Za-z0-9_-]{43}$/.test(journal || '');
  const rows = new Map();
  let prefix = journal === publicJournalKey ? publicPrefix : '';
  let store, cursor = 0, logicalTime = 0, durable = true;
  let service, active = false, connected = false, attempted = false, denied = false, timer;
  function hydrate() {
    const earlyEdits = [...rows]; // A named notebook's key digest is asynchronous.
    rows.clear();
    try {
      store = win.localStorage;
      const saved = Number(store.getItem(prefix+'cursor'));
      if (Number.isSafeInteger(saved) && saved >= 0) cursor = saved;
      for (let i=0;i<store.length;i++) {
        const key = store.key(i);
        if (key?.startsWith(prefix)) loadField(key,store.getItem(key));
      }
    } catch { durable = false; cursor = 0; }
    for (const [id,row] of earlyEdits) {
      for (const [field,record] of Object.entries(row)) merge(id,field,record);
    }
  }
  if (prefix) hydrate();

  function loadField(key,raw) {
    const [id,field] = key.slice(prefix.length).split('.');
    if (!validId(Number(id)) || !fields.includes(field) || !raw) return;
    try { return merge(Number(id),field,JSON.parse(raw),false); }
    catch { return false; }
  }

  // A separate timestamp per field lets a draft and a review decision made on
  // different devices survive independently. Matching cloud receipts clear dirtiness.
  function merge(id,field,record,persist = true) {
    if (!record || !validStamp(record.stamp) || !validValue(field,record.value)) return false;
    const key = prefix+id+'.'+field;
    if (persist && prefix && durable) {
      // Another tab may have typed before its storage event reaches this tab.
      try { loadField(key,store.getItem(key)); }
      catch { durable = false; }
    }
    const row = rows.get(id) || {};
    const old = row[field];
    if (old && (record.stamp < old.stamp || (record.stamp === old.stamp && (!old.pending || record.pending)))) return false;
    const next = {value:record.value,stamp:record.stamp,pending:!!record.pending};
    logicalTime = Math.max(logicalTime,parseInt(next.stamp.slice(0,11),36));
    row[field] = next;
    rows.set(id,row);
    if (persist && prefix) {
      try { store.setItem(key,JSON.stringify(next)); }
      catch { durable = false; }
    }
    return true;
  }

  function checkpoint(next) {
    cursor = next;
    if (!durable) return;
    try { store.setItem(prefix+'cursor',String(Math.max(cursor,Number(store.getItem(prefix+'cursor')) || 0))); }
    catch { durable = false; }
  }

  function dirtyRow() {
    return [...rows].find(([,row]) => fields.some(f => row[f]?.pending));
  }

  function schedule(delay) {
    win.clearTimeout(timer);
    timer = win.setTimeout(synchronize,delay);
  }

  async function synchronize() {
    if (active || !prefix || !validJournal) return;
    active = true;
    let changed = false;
    try {
      service ||= await createDictationSync({url:journalEndpoint,journalKey:journal,level:'translation'});
      // Re-read after a competing append. Local edits made during a request keep
      // their newer stamp and are picked up on this pass or the next.
      for (let attempt=0;attempt<5;attempt++) {
        let page;
        do {
          page = await service.read(cursor);
          for (const {event} of page.events) {
            if (!validId(event.id)) continue;
            for (const field of fields) {
              const record = event.changes?.[field];
              if (record) changed = merge(event.id,field,{...record,pending:false}) || changed;
            }
          }
          checkpoint(page.cursor);
        } while (page.head > cursor);
        const dirty = dirtyRow();
        connected = true; denied = false;
        if (!dirty) break;
        const [id,row] = dirty;
        const changes = Object.fromEntries(fields.filter(f=>row[f]?.pending).map(f=>[f,{value:row[f].value,stamp:row[f].stamp}]));
        try {
          const receipt = await service.append({eventId:crypto.randomUUID(),id,changes},cursor);
          for (const [field,record] of Object.entries(changes)) changed = merge(id,field,record) || changed;
          checkpoint(receipt.cursor);
        } catch (error) {
          if (error.code !== 'conflict') throw error;
        }
      }
    } catch (error) { connected = false; denied = error.code === 'unauthorized'; }
    finally {
      const first = !attempted;
      attempted = true;
      active = false;
      if (dirtyRow() && !denied) schedule(connected ? 600 : 15000);
      else if (!denied && !win.document.hidden) schedule(60000);
      if (changed || first || service) onChange();
    }
  }

  win.addEventListener('storage',event => {
    if (prefix && event.key?.startsWith(prefix) && loadField(event.key,event.newValue)) {
      onChange();
      if (dirtyRow()) schedule(800);
    }
  });
  win.addEventListener('online',() => schedule(0));
  win.addEventListener('focus',() => schedule(0));
  win.document.addEventListener('visibilitychange',() => schedule(0));
  const ready = Promise.resolve().then(async () => {
    if (!prefix) {
      try {
        const scope = await journalScope(validJournal ? journal : 'unavailable:'+JSON.stringify([book,journal]));
        prefix = 'shike.translation.book.'+scope+'.';
        hydrate();
      } catch { durable = false; }
      onChange();
    }
    if (validJournal) await synchronize();
  });

  return {
    ready,
    get(id) {
      const row = rows.get(Number(id));
      return Object.fromEntries(fields.map(f=>[f,row?.[f]?.value ?? empty[f]]));
    },
    set(id,patch) {
      id = Number(id);
      if (!validId(id)) return;
      // Compare against the latest local fields even if the other tab's storage
      // event has not yet arrived, before deciding whether this edit changes them.
      if (prefix && durable) {
        for (const field of Object.keys(patch).filter(f=>fields.includes(f))) {
          const key = prefix+id+'.'+field;
          try { loadField(key,store.getItem(key)); } catch { durable = false; }
        }
      }
      const changes = Object.entries(patch).filter(([f,v])=>validValue(f,v) && v !== (rows.get(id)?.[f]?.value ?? empty[f]));
      if (!changes.length) return;
      logicalTime = Math.max(Date.now(),logicalTime+1);
      const stamp = logicalTime.toString(36).padStart(11,'0')+'-'+crypto.randomUUID();
      for (const [field,value] of changes) merge(id,field,{value,stamp,pending:true});
      onChange();
      schedule(800);
    },
    status() {
      if (dirtyRow()) {
        if (!durable) return '当前页面有待保存修改，请先保留一份译文';
        if (!validJournal || denied) return '此学习链接无法同步，译文已保存在此设备';
        if (!prefix) return '正在保存译文';
        return attempted && !connected ? '已保存在此设备，联网后自动同步' : '已保存在此设备，等待同步';
      }
      if (connected) return '翻译进度已同步';
      if (!validJournal || denied) return '此学习链接无法同步';
      return attempted ? '云端暂时未连接' : '正在读取翻译进度';
    },
  };
}
