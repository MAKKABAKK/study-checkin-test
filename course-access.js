// The published course material is available to every visitor.
const value = 'UwNcxmp5I4Wwx8Ahjy9exIiCysnopq_xn41nwmkObqQ';
let imported;
export function getCourseKey() {
  if (!imported) {
    const bytes = Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
    imported = crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['decrypt']);
  }
  return imported;
}
