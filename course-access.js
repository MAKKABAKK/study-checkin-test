// The published course material is available to every visitor.
const value = 'UwNcxmp5I4Wwx8Ahjy9exIiCysnopq_xn41nwmkObqQ';
// The ordinary homepage shares the existing study notebook with every visitor.
export const publicJournalKey = 'ARk2a8Fn7pvuQmRJPLl6A4G9Yd4T05k7AdpzGo_BC8s';
let imported;
export function getCourseKey() {
  if (!imported) {
    const bytes = Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
    imported = crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['decrypt']);
  }
  return imported;
}

export async function journalScope(key) {
  if (!key) return 'guest';
  const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return 'p-' + [...new Uint8Array(digest).slice(0,16)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
