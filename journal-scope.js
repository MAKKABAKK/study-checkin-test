export async function journalScope(key) {
  if (!key) return 'guest';
  const digest = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));
  return 'p-' + [...new Uint8Array(digest).slice(0,16)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
