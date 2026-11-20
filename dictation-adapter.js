import {applyEvent, compactState, createVocabulary, prepareState} from './dictation-engine.js';
import {publicJournalKey} from './course-access.js';

// Confirmed cloud events and pending device events stay separate. A UI submission
// is acknowledged only after its local IndexedDB transaction commits.
let database;
function openDatabase() {
  if (!database) database = new Promise((resolve,reject) => {
    const request = indexedDB.open('shike-online-dictation',2);
    request.onupgradeneeded = () => {
      for (const name of ['checkpoints','events','heads','pending','conflicts']) {
        if (!request.result.objectStoreNames.contains(name)) request.result.createObjectStore(name);
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {db.close(); database = undefined;};
      resolve(db);
    };
    request.onerror = () => reject(request.error);
  }).catch(error => { database = undefined; throw error; });
  return database;
}

function transactionResult(tx) {
  return new Promise((resolve,reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error || new Error('保存未完成'));
  });
}

async function getRecord(store,key,{keyOnly=false}={}) {
  const db = await openDatabase();
  return new Promise((resolve,reject) => {
    const records = db.transaction(store).objectStore(store);
    const request = keyOnly ? records.getKey(key) : records.get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function storedEvents(stream,after) {
  const db = await openDatabase();
  return new Promise((resolve,reject) => {
    const request = db.transaction('events').objectStore('events').getAll(
      IDBKeyRange.bound([stream,after+1],[stream,Number.MAX_SAFE_INTEGER]),256
    );
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// A stale checkpoint is harmless: the append-only event store is never truncated.
async function checkpoint(stream,state,cursor) {
  const db = await openDatabase();
  const tx = db.transaction('checkpoints','readwrite');
  const done = transactionResult(tx);
  const store = tx.objectStore('checkpoints');
  if (cursor === 0) {
    const request = store.getKey(stream);
    request.onsuccess = () => { if (request.result === undefined) store.put({state,cursor},stream); };
  } else {
    store.put({state,cursor},stream);
  }
  await done;
}

async function saveEvents(stream, entries, expectedGuestHead) {
  const db = await openDatabase();
  const tx = db.transaction(['events','heads'],'readwrite');
  const done = transactionResult(tx);
  const heads = tx.objectStore('heads');
  const request = heads.get(stream);
  let applied = false;
  request.onsuccess = () => {
    const head = request.result || 0;
    if (expectedGuestHead !== undefined && head !== expectedGuestHead) return;
    for (const entry of entries) tx.objectStore('events').put(entry,[stream,entry.cursor]);
    heads.put(Math.max(head, entries[entries.length-1].cursor),stream);
    applied = true;
  };
  await done;
  return applied;
}

const rangeFor = stream => IDBKeyRange.bound([stream,0],[stream,Number.MAX_SAFE_INTEGER]);

async function queueRecords(stream,store='pending',firstOnly=false) {
  const db = await openDatabase();
  return new Promise((resolve,reject) => {
    const rows = db.transaction(store).objectStore(store);
    const request = store==='conflicts' ? rows.count(rangeFor(stream)) :
      rows.getAll(rangeFor(stream),firstOnly ? 1 : undefined);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Called under the per-stream Web Lock. Assigning order and advancing the queue
// generation are one transaction, including the removal of an acknowledged row.
async function editQueue(stream,generation,{add,remove,conflict}) {
  const db = await openDatabase();
  const tx = db.transaction(['pending','heads','conflicts'],'readwrite');
  const done = transactionResult(tx);
  const pending = tx.objectStore('pending');
  if (add) pending.add({event:add,order:generation},[stream,generation]);
  if (remove) {
    pending.delete([stream,remove.order]);
    if (conflict) tx.objectStore('conflicts').put({...remove,reason:conflict},[stream,remove.order]);
  }
  tx.objectStore('heads').put(generation,[stream,'queue-version']);
  await done;
}

function reply(data,status=200) {
  // practiceJournal consumes the response in memory; avoid serializing every
  // completed session just to immediately parse the exact same object.
  return {ok:status>=200 && status<300,status,json:async () => data};
}

async function journalScope(key) {
  if (!key) return 'guest';
  const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return 'p-' + [...new Uint8Array(digest).slice(0,16)].map(n=>n.toString(16).padStart(2,'0')).join('');
}

// The training page may open this level during the download. Insert the base
// and confirmed events together only if no practice session initialized it.
async function storeUnopenedJournal(stream,source,entries) {
  const db = await openDatabase();
  const tx = db.transaction(['checkpoints','events','heads'],'readwrite');
  const done = transactionResult(tx);
  const bases = tx.objectStore('checkpoints');
  const read = bases.getKey(stream);
  read.onsuccess = () => {
    if (read.result !== undefined) return;
    bases.add({state:source,cursor:0},stream);
    const events = tx.objectStore('events');
    for (const row of entries) events.add(row,[stream,row.cursor]);
    tx.objectStore('heads').add(entries.length,stream);
  };
  await done;
}

// Keep the immutable paper answers in the same per-notebook database. The
// compound key cannot collide with a level's normal string checkpoint key.
export async function readPaperHistory(journalKey) {
  const id = ['legacy-six',await journalScope(journalKey)];
  const cached = await getRecord('checkpoints',id);
  if (cached) return cached.state;
  const {loadSeed} = await import('./dictation-seed.js');
  const answers = await loadSeed('legacy-six',journalKey);
  if (!Array.isArray(answers) || answers.length !== 200 ||
      answers.some(word=>word !== null && typeof word !== 'string')) throw Error('纸笔记录不完整');
  await checkpoint(id,answers,0);
  return answers;
}

export async function preloadLinkedJournal(onProgress,key = new URLSearchParams(location.hash.slice(1)).get('journal') ?? publicJournalKey) {
  if (key !== publicJournalKey && (!/^[A-Za-z0-9_-]{43}$/.test(key) ||
      localStorage.getItem('shike.dictation.journal.v1') !== key)) return {done:0,total:0};
  const scope = await journalScope(key);
  const levels = ['six','five','four','three','two','one'];
  return navigator.locks.request('shike-dictation-preload/'+scope,async () => {
    const missing = [];
    for (const level of levels) {
      if (!await getRecord('checkpoints',scope+'/'+level,{keyOnly:true})) missing.push(level);
    }
    const progress = {done:levels.length-missing.length,total:levels.length};
    onProgress?.({...progress});
    const paper = ['legacy-six',scope];
    const needsPaper = !await getRecord('checkpoints',paper,{keyOnly:true});
    if (!missing.length && !needsPaper) return progress;
    const {loadSeed,hasPersonalSeed} = await import('./dictation-seed.js');
    const {createDictationSync,journalEndpoint} = await import('./dictation-sync.js');
    const seeded = missing.length > 0 && await hasPersonalSeed(key);
    for (const level of missing) {
      const source = seeded ? await loadSeed(level,key) : null;
      if (seeded && !source) throw Error('听写历史未能读取，请稍后重试。');
      const service = await createDictationSync({url:journalEndpoint,journalKey:key,level});
      const entries = [];
      let page;
      do {
        page = await service.read(entries.length);
        entries.push(...page.events);
      } while (page.cursor < page.head);
      await storeUnopenedJournal(scope+'/'+level,source,entries);
      progress.done++;
      onProgress?.({...progress});
    }
    if (needsPaper) {
      const six = await getRecord('checkpoints',scope+'/six');
      if (Object.keys(six?.state?.legacyMarks || {}).length) await readPaperHistory(key);
      else await checkpoint(paper,null,0);
    }
    return progress;
  });
}

export async function installDictationEngine(options) {
  const {level,words,times,acceptedSpellings,journalKey,url,publishableKey} = options;
  const vocab = createVocabulary(words,acceptedSpellings,times?.map(t=>t.id));
  const scope = await journalScope(journalKey);
  const stream = scope + '/' + level;
  let state, cursor=0, checkpointAt=0, cloud;
  let view, viewBase, queueVersion=-1, waiting=0, conflicts=0;
  let flight, timer, lastFailure=0, connection='checking';
  const local = job => navigator.locks.request('shike-dictation-local/'+stream,job);
  let message = journalKey ? '正在读取云端听写记录…' : '正在打开这个浏览器的练习记录…';

  async function initialize() {
    if (state) return;
    const saved = await getRecord('checkpoints',stream);
    if (saved) {
      state = prepareState(saved.state,vocab);
      cursor = checkpointAt = saved.cursor;
    } else {
      const seedLoader = journalKey && (options.loadSeed || (await import('./dictation-seed.js')).loadSeed);
      const source = journalKey ? await seedLoader(level,journalKey) : null;
      if (journalKey && !source) {
        const isPersonalSeed = options.hasPersonalSeed || (await import('./dictation-seed.js')).hasPersonalSeed;
        if (await isPersonalSeed(journalKey)) throw Error('听写历史未能读取，请重新打开学习首页。');
        // A separately provisioned notebook has no historical seed. Its server
        // grant must succeed before an empty notebook can be stored locally.
        await (await openCloud()).read(0);
      }
      const base = prepareState(source,vocab);
      await checkpoint(stream,base,0);
      state = base;
    }
  }

  async function openCloud() {
    if (!cloud) {
      const factory = options.createSync || (await import('./dictation-sync.js')).createDictationSync;
      cloud = await factory({url,publishableKey,journalKey,level});
    }
    return cloud;
  }

  function reduce(entries) {
    let next=state, position=cursor;
    for (const entry of entries) {
      if (!Number.isSafeInteger(entry.cursor) || entry.cursor !== position+1) throw Error('同步记录缺少中间事件');
      next = applyEvent(next,entry.event,vocab,entry.event.occurredAt).state;
      position = entry.cursor;
    }
    return next;
  }

  async function adopt(next,position) {
    state = next;
    cursor = position;
    if (cursor-checkpointAt >= 256) {
      // The append-only rows are already durable, even if a checkpoint fails.
      try { await checkpoint(stream,state,cursor); checkpointAt=cursor; } catch {}
    }
  }

  async function readCache() {
    for (;;) {
      const entries = await storedEvents(stream,cursor);
      if (!entries.length) return;
      await adopt(reduce(entries),entries[entries.length-1].cursor);
      if (entries.length < 256) return;
    }
  }

  async function refreshLocal() {
    await initialize();
    await readCache();
    if (!journalKey) return state;
    const generation = await getRecord('heads',[stream,'queue-version']) || 0;
    if (viewBase === state && generation === queueVersion) return view;
    view = state;
    const rows = await queueRecords(stream);
    for (const {event} of rows) {
      try { view = applyEvent(view,event,vocab,event.occurredAt).state; }
      catch (error) {
        if (error.status !== 409 && error.status !== 400) throw error;
        // The cloud worker retains conflicting edits for inspection.
      }
    }
    waiting = rows.length;
    conflicts = await queueRecords(stream,'conflicts');
    queueVersion = generation;
    viewBase = state;
    return view;
  }

  function status() {
    if (!state) return message;
    if (!journalKey) return '已保存在此浏览器（换设备请用个人同步链接）';
    if (conflicts) return '有 '+conflicts+' 条跨设备改答冲突已留存，请核对相应轮次。'+(waiting ? '另有 '+waiting+' 条待同步。' : '');
    if (waiting) return '已保存在此浏览器，'+waiting+' 条待同步';
    if (connection === 'online') return '已同步到云端';
    if (connection === 'offline') return '已保存在此浏览器，云端暂未连接';
    return '已保存在此浏览器，正在连接云端…';
  }

  async function pull(service) {
    for (;;) {
      const from = await local(async () => {await readCache(); return cursor;});
      const page = await service.read(from);
      if (!Array.isArray(page.events) || !Number.isSafeInteger(page.head) || page.head < from ||
          page.cursor !== from + page.events.length || page.cursor > page.head) throw Error('云端记录版本不符');
      if (page.events.length) {
        await local(async () => {
          await readCache();
          const entries = page.events.filter(e=>e.cursor>cursor);
          if (entries.length) {
            const next = reduce(entries);
            await saveEvents(stream,entries);
            await adopt(next,page.cursor);
          }
        });
      } else if (from !== page.head) throw Error('云端记录不完整');
      if (page.cursor === page.head) return;
    }
  }

  async function forget(row,conflict) {
    const version = await getRecord('heads',[stream,'queue-version']) || 0;
    await editQueue(stream,version+1,{remove:row,conflict});
  }

  async function reconcile() {
    const service = await openCloud();
    await pull(service);
    for (;;) {
      const task = await local(async () => {
        await readCache();
        const [row] = await queueRecords(stream,'pending',true);
        if (!row) return null;
        let result;
        try { result = applyEvent(state,row.event,vocab,row.event.occurredAt); }
        catch (error) {
          if (error.status !== 400 && error.status !== 409) throw error;
          await forget(row,error.message);
          return {done:true};
        }
        // A prior write can have committed on the server before the browser
        // received its receipt. Seeing that event in the confirmed cache suffices.
        if (result.state === state) {await forget(row); return {done:true};}
        return {row,expected:cursor,next:result.state};
      });
      if (!task) return;
      if (task.done) continue;
      const {row,expected,next} = task;
      let ack;
      try { ack = await service.append(row.event,expected); }
      catch (error) {
        if (error.code !== 'conflict') throw error;
        await pull(service);
        continue;
      }
      if (!ack.inserted || ack.cursor !== expected+1) {await pull(service); continue;}
      await local(async () => {
        await saveEvents(stream,[{cursor:ack.cursor,event:row.event}]);
        await adopt(next,ack.cursor);
        await forget(row);
      });
    }
  }

  function schedule(force=false) {
    if (!journalKey || flight || timer) return;
    const delay = force ? 0 : Math.max(0,10000-(Date.now()-lastFailure));
    timer = setTimeout(() => {
      timer = undefined;
      const before=status(), beforeCursor=cursor;
      flight = navigator.locks.request('shike-dictation-cloud/'+stream,{ifAvailable:true},async lock => {
        if (!lock) return;
        try {
          await reconcile();
          connection='online';
          lastFailure=0;
        } catch {
          connection='offline';
          lastFailure=Date.now();
        }
        await local(refreshLocal);
      }).catch(() => {connection='offline'; lastFailure=Date.now();}).finally(() => {
        flight=undefined;
        if (before !== status() || beforeCursor !== cursor) {
          window.dispatchEvent(new CustomEvent('shike-dictation-refresh',{detail:{stream}}));
        }
        if (waiting && connection==='offline') schedule();
      });
    },delay);
  }

  async function ready() {
    await local(refreshLocal);
    schedule();
  }

  async function handle(path,event) {
    try {
      const current=await refreshLocal();
      if (!event && /^api\/state(?:\?|$)/.test(path)) {
        schedule();
        // The original journal merges deltas into its compact maps.
        return reply({...compactState(current),words:{...current.words},sessions:{...current.sessions},rounds:{...current.rounds}});
      }
      if (event && /^api\/event(?:\?|$)/.test(path)) {
        const timed = Object.hasOwn(event,'occurredAt') ? event : {...event,occurredAt:new Date().toISOString()};
        const result = applyEvent(current,timed,vocab,timed.occurredAt);
        if (result.state !== current) {
          if (journalKey) {
            await editQueue(stream,queueVersion+1,{add:timed});
            queueVersion++;
            waiting++;
            view = result.state;
          } else {
            await saveEvents(stream,[{cursor:cursor+1,event:timed}]);
            await adopt(result.state,cursor+1);
          }
        }
        schedule();
        return reply({ok:true,duplicate:result.duplicate,delta:result.delta});
      }
      return reply({error:'无效的练习请求'},404);
    } catch (error) {
      if (error.status===400 || error.status===409) return reply({error:error.message},error.status);
      message = !state && journalKey ? '无法读取听写记录，请稍后重试' : '无法写入此浏览器，请检查可用空间';
      return reply({error:message},503);
    }
  }

  if (journalKey) window.addEventListener('online',() => {
    clearTimeout(timer);
    timer=undefined;
    schedule(true);
  });
  return {scope,ready,legacyMarks:()=>state?.legacyMarks || {},status,
    reviewWords:()=>local(async ()=>(await refreshLocal()).words),
    request:(path,event) => local(()=>handle(path,event))};
}
