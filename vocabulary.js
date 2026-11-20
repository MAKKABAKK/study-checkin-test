import {prepareMaterialReads} from './material-cache.js';
import {getWordAudio} from './word-audio.js';

const el = id => document.getElementById('vocab-' + id);
const levelLinks = [...el('levels').querySelectorAll('a')];
const groupSelect = el('group'), body = el('rows'), audio = el('audio');
const pageSize = 20, books = new Map();
const ready = prepareMaterialReads();
let level, words = [], group = '1', mode = 'both', reading = 0, playback = 0;
let playing, lastClip;
const silentClip = 'data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACAgICAgICAgICAgICAgICA';

function route(levelId, part) {
  const url = new URL(location.href);
  url.searchParams.set('level',levelId);
  url.searchParams.set('group',part);
  return url;
}

function stopAudio() {
  playback++;
  audio.pause();
  audio.onended = audio.onerror = null;
  if (playing) {
    playing.textContent = '播放';
    delete playing.dataset.active;
    playing = null;
  }
}

async function pronounce(button) {
  stopAudio();
  const token = playback, id = Number(button.closest('tr').dataset.id);
  playing = button;
  button.dataset.active = 'true';
  const failed = () => {
    if (token !== playback) return;
    button.textContent = '重试';
    button.title = '发音未能播放，点击重试';
    el('status').textContent = '发音未能播放，请点这一行的「重试」。';
  };
  el('status').textContent = '';
  try {
    if (lastClip?.level !== level || lastClip.id !== id) {
      button.textContent = '载入';
      // Unlock the same media element on the tap before fetching the real recording.
      audio.src = silentClip;
      void audio.play().catch(()=>{});
      const src = await getWordAudio(level,id);
      if (token !== playback) return;
      if (!src) throw Error();
      lastClip = {level,id,src};
    }
    audio.src = lastClip.src;
    button.title = '再听一次';
    button.textContent = '播放中';
    audio.onended = () => { if (token === playback) stopAudio(); };
    audio.onerror = failed;
    await audio.play();
  } catch { failed(); }
}

function cell(row, name, value, hidden) {
  const td = row.insertCell();
  td.className = 'vocab-' + name;
  if (name === 'word') td.lang = 'en';
  if (!hidden) {
    td.textContent = value;
    return;
  }
  const toggle = document.createElement('button');
  const label = name === 'word' ? '英文' : '释义';
  toggle.type = 'button';
  toggle.className = 'vocab-reveal';
  toggle.textContent = '看' + label;
  toggle.lang = 'zh-CN';
  toggle.setAttribute('aria-expanded','false');
  toggle.onclick = () => {
    const reveal = toggle.getAttribute('aria-expanded') === 'false';
    toggle.setAttribute('aria-expanded',String(reveal));
    toggle.lang = reveal && name === 'word' ? 'en' : 'zh-CN';
    toggle.textContent = reveal ? value : '看' + label;
    toggle.title = reveal ? '点击收起' + label : '';
  };
  td.append(toggle);
}

function displayWords() {
  stopAudio();
  const all = group === 'all', start = all ? 0 : (Number(group)-1)*pageSize;
  const shown = all ? words : words.slice(start,start+pageSize);
  const fragment = document.createDocumentFragment();
  for (const item of shown) {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    row.insertCell().textContent = item.id;
    cell(row,'word',item.word,mode==='hide-word');
    cell(row,'meaning',item.meaning,mode==='hide-meaning');
    const play = document.createElement('button');
    play.type = 'button';
    play.className = 'vocab-play';
    play.textContent = '播放';
    play.setAttribute('aria-label','播放第 '+item.id+' 词发音');
    play.onclick = () => void pronounce(play);
    row.insertCell().append(play);
    fragment.append(row);
  }
  body.replaceChildren(fragment);
  const total = Math.ceil(words.length/pageSize);
  el('page').textContent = all ? '' : '第 '+group+' / '+total+' 组';
  el('prev').disabled = all || group==='1';
  el('next').disabled = all || Number(group)>=total;
  el('pager').hidden = all;
  el('table').hidden = false;
}

async function readBook(id) {
  await ready;
  const res = await fetch('./dictation-data/'+id+'/review.json');
  if (!res.ok) throw Error();
  const data = await res.json();
  if (!Array.isArray(data.words) || !data.words.length) throw Error();
  return data.words;
}

async function openRoute() {
  const url = new URL(location.href);
  const link = levelLinks.find(a=>a.dataset.level===url.searchParams.get('level')) || levelLinks[0];
  const requested = url.searchParams.get('group');
  const changed = level !== link.dataset.level || !words.length;
  const token = ++reading;
  level = link.dataset.level;
  for (const a of levelLinks) {
    a.href = route(a.dataset.level,'1');
    if (a===link) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  }
  const journal = new URLSearchParams(url.hash.slice(1)).get('journal');
  const fragment = journal ? '#'+new URLSearchParams({journal}) : '';
  document.querySelectorAll('[data-home]').forEach(a=>a.href='./'+fragment);
  el('dictation').href = './dictation.html?level='+level+'&view=original'+fragment;

  if (changed) {
    stopAudio();
    words = [];
    body.replaceChildren();
    groupSelect.replaceChildren();
    groupSelect.disabled = true;
    el('table').hidden = el('pager').hidden = el('retry').hidden = true;
    el('heading').textContent = link.textContent+'词表';
    el('status').textContent = '正在打开'+link.textContent+'词表…';
    const id = level;
    if (!books.has(id)) books.set(id,readBook(id).catch(error=>{books.delete(id);throw error;}));
    try {
      const loaded = await books.get(id);
      if (token!==reading) return;
      words = loaded;
    } catch {
      if (token!==reading) return;
      el('status').textContent = '词表暂时无法读取。';
      el('retry').hidden = false;
      return;
    }
    el('heading').textContent = link.textContent+'词表 · '+words.length+' 词';
    for (let start=0;start<words.length;start+=pageSize) {
      const n = start/pageSize+1, end = Math.min(start+pageSize,words.length);
      groupSelect.add(new Option('第 '+n+' 组（'+(start+1)+'–'+end+'）',String(n)));
    }
    groupSelect.add(new Option('整级浏览（'+words.length+' 词）','all'));
    groupSelect.disabled = false;
  }
  const total = Math.ceil(words.length/pageSize);
  group = requested==='all' ? 'all' : String(Math.min(total,/^[1-9]\d*$/.test(requested) ? Number(requested) : 1));
  const here = route(level,group);
  if (here.href!==url.href) history.replaceState(null,'',here);
  link.href = here;
  groupSelect.value = group;
  el('status').textContent = '';
  displayWords();
}

function navigate(url) {
  if (String(url) !== location.href) history.pushState(null,'',url);
  return openRoute();
}
el('levels').addEventListener('click',event=>{
  const link = event.target.closest('a');
  if (!link || event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  void navigate(link.href);
});
groupSelect.onchange = () => void navigate(route(level,groupSelect.value));
async function turnPage(step) {
  await navigate(route(level,Number(group)+step));
  groupSelect.focus({preventScroll:true});
  el('heading').scrollIntoView({block:'start'});
}
el('prev').onclick = () => void turnPage(-1);
el('next').onclick = () => void turnPage(1);
el('retry').onclick = () => void openRoute();
el('modes').addEventListener('click',event=>{
  const button = event.target.closest('button');
  if (!button || mode===button.dataset.mode) return;
  mode = button.dataset.mode;
  for (const option of el('modes').querySelectorAll('button')) option.setAttribute('aria-pressed',String(option===button));
  if (words.length) {el('status').textContent = ''; displayWords();}
});
window.addEventListener('popstate',openRoute);
window.addEventListener('pagehide',stopAudio);
void openRoute();
