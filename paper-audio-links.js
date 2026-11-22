export function testNumbers(volume) {
  if (!Number.isInteger(volume) || volume < 12 || volume > 21) return [];
  return [1,2,3,4];
}

export function bookTestNumber(volume, number) {
  // Older Cambridge 12 links used Test 5–8 for the same four catalogue entries.
  const ordinal = volume===12 && number>=5 && number<=8 ? number-4 : number;
  return testNumbers(volume).includes(ordinal) ? ordinal : null;
}

export function paperAudioHref(task) {
  if (task.resource !== 'paper') return null;
  // A speaking review can mention replaying a recording. Only link book listening tasks.
  if (!/听力|听读/.test(task.title)) return null;
  const match = /剑\s*(\d+)\s*(?:第\s*\d+\s*套\s*[（(]?)?\s*Test\s*(\d+)/i.exec(task.title);
  if (!match) return null;
  const volume = Number(match[1]), test = bookTestNumber(volume,Number(match[2]));
  if (!test) return null;
  const section = /(?:Section|Part)\s*([1-4])\b(?:\s*[–—至-]\s*([1-4]))?/i.exec(task.title);
  const target = './paper-audio.html?volume='+volume+'&test='+test;
  if (!section || (section[1]==='1' && section[2]==='4')) return target;
  return target+'&part='+section[1]+'&end='+(section[2] || section[1]);
}
