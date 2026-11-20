import {getCourseKey} from './course-access.js';

const clipsByLevel = new Map();

async function wordClips(level) {
  const [response,key] = await Promise.all([fetch('./dictation-data/'+level+'/player.bin'),getCourseKey()]);
  if (!response.ok) throw Error('单词录音暂时无法读取，请再试一次。');
  const bytes = new Uint8Array(await response.arrayBuffer());
  const plain = await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.subarray(0,12)},key,bytes.subarray(12));
  const {html} = JSON.parse(new TextDecoder().decode(plain));
  const start = '<script id="data" type="application/json">';
  const left = html.indexOf(start), right = html.indexOf('</script>',left);
  if (left < 0 || right < 0) throw Error('这一级的单词录音不完整。');
  return new Map(JSON.parse(html.slice(left+start.length,right)).map(row=>[row.id,row.mp3]));
}

export async function getWordAudio(level,wordId) {
  if (!clipsByLevel.has(level)) {
    const pending = wordClips(level).catch(error=>{ clipsByLevel.delete(level); throw error; });
    clipsByLevel.set(level,pending);
  }
  const mp3 = (await clipsByLevel.get(level)).get(wordId);
  if (!mp3) throw Error('未找到这个词的单词录音。');
  return 'data:audio/mpeg;base64,'+mp3;
}
