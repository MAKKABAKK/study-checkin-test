import {getCourseKey} from './course-access.js';
import {prepareMaterialReads} from './material-cache.js';

const $ = selector => document.querySelector(selector);
const lastBookStorage = 'shike.reader.lastBook';
const pageStorage = id => 'shike.reader.position.' + id;
const oldNotesId = 'class-notes-10';
const currentNotesId = 'class-notes-17';
// Each row is one old lesson. Topics moved within lessons in the 17-lesson edition.
// Old page 39 has no direct equivalent; use the adjacent reading material on page 29.
const notesPageMap = [
  1, 2, 3, 3,
  5, 8, 5, 9, 10, 6, 11, 11, 12, 7, 10,
  14, 19, 14, 14, 15, 17, 16, 16, 18,
  21, 23, 25, 21, 22, 24, 24, 26,
  27, 31, 32, 28, 27, 28, 29, 29, 30,
  34, 34, 35, 35, 37, 36, 38, 38, 39,
  41, 45, 46, 41, 42, 44, 43, 46,
  47, 47, 48, 48, 52, 52, 52, 54, 50, 50,
  55, 55, 55, 55, 56, 58, 59, 56,
  61, 61, 61, 62, 63, 63, 64, 66
];
const pageCache = new Map();
const texts = new Map();
let books = [], book, page, view = 'image';
let activeRequest, displayedURL;

function readStored(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function saveStored(key, value) {
  try { localStorage.setItem(key, value); }
  catch { $('#storage-note').textContent = '当前浏览器无法保存页码。请记下本页页码，方便下次继续。'; }
}

async function decryptedFile(file, signal) {
  const key = await getCourseKey();
  const response = await fetch('./handouts-data/' + encodeURIComponent(book.id) + '/' + file, {signal});
  if (!response.ok) throw new Error('file ' + response.status);
  const data = new Uint8Array(await response.arrayBuffer());
  return crypto.subtle.decrypt({name: 'AES-GCM', iv: data.subarray(0,12)}, key, data.subarray(12));
}

function storedPage(item) {
  const number = Number(readStored(pageStorage(item.id)));
  if (Number.isInteger(number) && number >= 1 && number <= item.pages) return number;
  if (item.id === currentNotesId) return notesPageMap[Number(readStored(pageStorage(oldNotesId))) - 1] || 1;
  return 1;
}

function updateShelf() {
  for (const button of $('#books').children) {
    const item = books.find(entry => entry.id === button.dataset.id);
    button.setAttribute('aria-pressed', String(item === book));
    const saved = storedPage(item);
    button.querySelector('small').textContent = '共 ' + item.pages + ' 页' + (saved > 1 ? ' · 上次读到第 ' + saved + ' 页' : '');
  }
}

function chooseBook(item, firstPage) {
  book = item;
  if (!book.text) view = 'image';
  $('#book-title').textContent = book.title;
  $('#page-number').max = book.pages;
  $('#page-total').textContent = '/ ' + book.pages + ' 页';
  $('[data-view=text]').hidden = !book.text;
  const contents = $('#chapters');
  contents.replaceChildren();
  for (const chapter of book.chapters) {
    const row = document.createElement('li');
    const button = document.createElement('button');
    const title = document.createElement('span');
    const number = document.createElement('small');
    button.type = 'button';
    button.dataset.page = chapter.page;
    title.textContent = chapter.title;
    number.textContent = '第 ' + chapter.page + ' 页';
    button.append(title, number);
    button.onclick = () => {
      if (mobile.matches) $('#contents').open = false;
      gotoPage(chapter.page, true);
      if (mobile.matches) $('#book-title').focus({preventScroll:true});
    };
    row.append(button);
    contents.append(row);
  }
  $('#chapter-count').textContent = book.chapters.length + ' 节';
  updateShelf();
  gotoPage(firstPage || storedPage(book));
}

function gotoPage(number, moveToReader = false) {
  page = Math.min(book.pages, Math.max(1, number));
  $('#page-number').value = page;
  $('#bottom-page').textContent = '第 ' + page + ' / ' + book.pages + ' 页';
  document.querySelectorAll('[data-turn]').forEach(button => {
    button.disabled = button.dataset.turn === '1' ? page === book.pages : page === 1;
  });
  let currentChapter;
  for (const row of $('#chapters').children) {
    const button = row.firstElementChild;
    button.removeAttribute('aria-current');
    if (Number(button.dataset.page) <= page) currentChapter = button;
  }
  if (currentChapter) currentChapter.setAttribute('aria-current', 'location');
  if (moveToReader && $('.reader').getBoundingClientRect().top < 0) $('.reader').scrollIntoView({block:'start'});
  renderPage();
}

function clearImage() {
  $('#sheet').hidden = true;
  $('#page-image').removeAttribute('src');
  if (displayedURL) URL.revokeObjectURL(displayedURL);
  displayedURL = null;
}

async function renderPage() {
  activeRequest?.abort();
  const request = new AbortController();
  activeRequest = request;
  const isCurrent = () => activeRequest === request;
  const label = '第 ' + page + ' / ' + book.pages + ' 页';
  clearImage();
  $('#page-text').hidden = true;
  $('#page-text').textContent = '';
  $('#retry-page').hidden = true;
  $('.end-turn').hidden = true;
  $('#zoom').disabled = true;
  document.querySelectorAll('[data-view]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.view === view));
  });
  $('#page-status').textContent = '正在读取' + label + '…';
  let pendingURL;
  try {
    if (view === 'text') {
      if (!texts.has(book.id)) {
        const bytes = await decryptedFile('text.bin', request.signal);
        if (!isCurrent()) return;
        const pages = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(pages) || pages.length !== book.pages) throw new Error('incomplete text');
        texts.set(book.id, pages);
      }
      $('#page-text').textContent = texts.get(book.id)[page-1]?.trim() || '本页没有可提取的文字，请切到「原页」查看。';
      $('#page-text').hidden = false;
    } else {
      const id = book.id + '/' + page;
      let blob = pageCache.get(id);
      if (!blob) {
        const bytes = await decryptedFile(page + '.bin', request.signal);
        if (!isCurrent()) return;
        blob = new Blob([bytes], {type:'image/webp'});
      }
      pendingURL = URL.createObjectURL(blob);
      const image = new Image();
      image.id = 'page-image';
      image.alt = book.title + '，' + label;
      image.src = pendingURL;
      await image.decode();
      if (!isCurrent()) return;
      if (pageCache.size >= 4 && !pageCache.has(id)) pageCache.delete(pageCache.keys().next().value);
      pageCache.set(id, blob);
      displayedURL = pendingURL;
      pendingURL = null;
      $('#sheet').replaceChildren(image);
      $('#sheet').hidden = false;
      $('#sheet').scrollLeft = 0;
      $('#zoom').disabled = false;
    }
    $('.end-turn').hidden = false;
    $('#page-status').textContent = label;
    saveStored(pageStorage(book.id), String(page));
    saveStored(lastBookStorage, book.id);
    const opened = new URL(location.href);
    if (opened.searchParams.has('page') || opened.searchParams.get('book') === oldNotesId && book.id === currentNotesId) {
      if (opened.searchParams.get('book') === oldNotesId) opened.searchParams.set('book', book.id);
      opened.searchParams.delete('page');
      history.replaceState(null, '', opened);
    }
    updateShelf();
  } catch (error) {
    if (!isCurrent() || request.signal.aborted) return;
    $('#page-status').textContent = '暂时无法读取' + label + '。请检查网络后重试。';
    $('#retry-page').hidden = false;
  } finally {
    if (pendingURL) URL.revokeObjectURL(pendingURL);
  }
}

async function loadLibrary() {
  $('#library-status').textContent = '正在打开讲义目录…';
  $('#load-again').hidden = true;
  try {
    await prepareMaterialReads();
    const response = await fetch('./handouts-data/manifest.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('manifest');
    const manifest = await response.json();
    books = manifest.books || manifest;
    if (!Array.isArray(books) || !books.length || !books.every(item =>
      /^[\w-]+$/.test(item.id) && item.title && Number.isInteger(item.pages) && item.pages > 0 &&
      Array.isArray(item.chapters) && item.chapters.every(chapter => chapter.title && Number.isInteger(chapter.page) && chapter.page >= 1 && chapter.page <= item.pages))) throw new Error('invalid index');
    $('#books').replaceChildren();
    for (const item of books) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.id = item.id;
      const title = document.createElement('strong');
      title.textContent = item.title;
      button.append(title, document.createElement('small'));
      button.onclick = () => {
        if (book === item) return;
        const link = new URL(location.href);
        if (link.searchParams.has('book') || link.searchParams.has('page')) {
          link.searchParams.set('book',item.id);
          link.searchParams.delete('page');
          history.replaceState(null,'',link);
        }
        chooseBook(item);
      };
      $('#books').append(button);
    }
    $('#library-status').hidden = true;
    $('#library').hidden = false;
    const params = new URLSearchParams(location.search);
    const findBook = id => books.find(item => item.id === id) || (id === oldNotesId && books.find(item => item.id === currentNotesId));
    const requested = params.get('book');
    const chosen = findBook(requested) || findBook(readStored(lastBookStorage)) || books[0];
    let number = Number(params.get('page'));
    if (requested === oldNotesId && chosen.id === currentNotesId) number = notesPageMap[number - 1];
    chooseBook(chosen, Number.isInteger(number) && number > 0 && number <= chosen.pages ? number : null);
  } catch {
    $('#library-status').hidden = false;
    $('#library-status').textContent = '暂时无法读取讲义目录，请检查网络后重试。';
    $('#load-again').hidden = false;
  }
}

const mobile = matchMedia('(max-width:760px)');
$('#contents').open = !mobile.matches;
$('#book-title').tabIndex = -1;
$('#load-again').onclick = loadLibrary;
$('#retry-page').onclick = renderPage;
$('#restart').onclick = () => gotoPage(1, true);
$('#jump').onsubmit = event => {
  event.preventDefault();
  if (event.currentTarget.reportValidity()) gotoPage($('#page-number').valueAsNumber, true);
};
document.querySelectorAll('[data-turn]').forEach(button => {
  button.onclick = () => gotoPage(page + Number(button.dataset.turn), true);
});
document.querySelectorAll('[data-view]').forEach(button => {
  button.onclick = () => {
    if (view === button.dataset.view) return;
    view = button.dataset.view;
    renderPage();
  };
});
$('#zoom').onclick = () => {
  const enlarged = $('#sheet').classList.toggle('enlarged');
  $('#zoom').setAttribute('aria-pressed', String(enlarged));
  $('#zoom').textContent = enlarged ? '适合宽度' : '放大原页';
};
document.addEventListener('keydown', event => {
  if (!book || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      event.target.closest('input,select,textarea,[contenteditable=true]') ||
      (view === 'image' && $('#sheet').classList.contains('enlarged'))) return;
  const step = {ArrowLeft:-1,ArrowRight:1}[event.key];
  if (step && page + step <= book.pages && page + step >= 1) {
    event.preventDefault();
    gotoPage(page + step, true);
  }
});
loadLibrary();
