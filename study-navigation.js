import {journalScope,publicJournalKey} from './course-access.js';

// A course book uses ?book= for its title; listening pages use it for a notebook scope.
const page = new URL(location.href);
const scope = page.searchParams.get('notebook') || page.searchParams.get('book');
let journal = new URLSearchParams(page.hash.slice(1)).get('journal');
if (!journal && scope) {
  try { journal = sessionStorage.getItem('shike.book.' + scope); } catch { /* Storage is optional. */ }
}
if (/^[A-Za-z0-9_-]{43}$/.test(journal) && journal !== publicJournalKey) {
  const fragment = new URLSearchParams({journal}).toString();
  for (const link of document.querySelectorAll('[data-home], [data-study-page], [data-study-tools]')) {
    const target = new URL(link.href);
    if (link.hasAttribute('data-study-tools')) target.searchParams.set('section','study-tools');
    target.hash = fragment;
    link.href = target.href;
  }
  // Readers use the fragment to jump between chapters. Keep their notebook through a reload.
  if (document.querySelector('.markdown-book, .recital, #books')) {
    const readerScope = await journalScope(journal);
    try {
      sessionStorage.setItem('shike.book.'+readerScope,journal);
      const current = new URL(location.href);
      current.searchParams.set('notebook',readerScope);
      history.replaceState(history.state,'',current);
    } catch { /* The current page still has its return link when storage is unavailable. */ }
  }
}
