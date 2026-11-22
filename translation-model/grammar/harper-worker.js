import {LocalLinter,createBinaryModuleFromUrl} from './harper.js';

let ready;
async function openLinter() {
  const response = await fetch(new URL('./harper-slim.wasm.gz', import.meta.url));
  if (!response.ok) throw Error('语法检查器下载失败');
  // Some static servers label .gz as HTTP-encoded and fetch decodes it for us.
  const bytes = await response.blob();
  const magic = new Uint8Array(await bytes.slice(0,2).arrayBuffer());
  const raw = magic[0] === 0x1f && magic[1] === 0x8b
    ? await new Response(bytes.stream().pipeThrough(new DecompressionStream('gzip'))).blob()
    : bytes;
  const url = URL.createObjectURL(new Blob([raw],{type:'application/wasm'}));
  try {
    const linter = new LocalLinter({binary:createBinaryModuleFromUrl(url, 'slim')});
    await linter.setLintConfig({SpellCheck:false});
    return linter;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Rule names are pinned with the bundled dictionary. Optional usage or style
// suggestions (e.g. "damage"/"damages") must not put a valid sentence in retry.
const preciseRules = {
  AnA:'不定冠词 a/an 要按下一个词开头的读音选择。',
  DependOf:'表示“依赖”时用 depend on。',
  ModalOf:'情态动词后表达对过去的判断，用 have 加过去分词。',
  MissingTo:'这里要用 to 加动词原形。',
  ToTo:'这里连续写了两个 to，保留一个即可。',
};
self.onmessage = async ({data:{id,answer}}) => {
  try {
    ready ||= openLinter().catch(error => {ready = null; throw error;});
    const engine = await ready;
    const groups = await engine.organizedLints(answer,{language:'plaintext'});
    const issues = [];
    for (const [rule,lints] of Object.entries(groups)) {
      for (const lint of lints) {
        const kind = lint.lint_kind();
        const reason = preciseRules[rule] ?? (kind === 'Agreement' ? '检查主语与谓语的单复数或人称是否一致。' :
          kind === 'WordOrder' ? '这里的英文语序需要调整。' : kind === 'Grammar' ? lint.message() : '');
        const original = lint.get_problem_text();
        if (!reason || !original || !lint.suggestion_count()) continue;
        const suggestion = lint.suggestions()[0];
        const replacement = suggestion.get_replacement_text();
        const fix = suggestion.kind() === 2 ? original + replacement : replacement;
        if (fix !== original) issues.push({original,suggestion:fix || '删去此处',reason});
      }
    }
    self.postMessage({id,checked:true,issues});
  } catch {
    self.postMessage({id,checked:false,issues:[]});
  }
};
