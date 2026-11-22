export function testNumbers(volume) {
  if (![12,13,14,15,16,17].includes(volume)) return [];
  return volume === 12 ? [5,6,7,8] : [1,2,3,4];
}

export function paperAudioHref(task) {
  if (task.resource !== 'paper') return null;
  // A speaking review can mention replaying a recording. Only link book listening tasks.
  if (!/听力|听读/.test(task.title)) return null;
  const match = /剑\s*(\d+)\s*(?:第\s*\d+\s*套\s*[（(]?)?\s*Test\s*(\d+)/i.exec(task.title);
  if (!match || !testNumbers(Number(match[1])).includes(Number(match[2]))) return null;
  const section = /(?:Section|Part)\s*([1-4])\b(?:\s*[–—至-]\s*([1-4]))?/i.exec(task.title);
  const target = './paper-audio.html?volume='+Number(match[1])+'&test='+Number(match[2]);
  if (!section || (section[1]==='1' && section[2]==='4')) return target;
  return target+'&part='+section[1]+'&end='+(section[2] || section[1]);
}
