// Match only specific erroneous constructions. Broader choices of vocabulary,
// register, or a different but grammatical sentence are left to semantic review.
const common = [
  [/\bcan(?:not|'t|’t) able to\b/i, 'cannot', 'can 本身已经表示能力，后面直接接动词原形。'],
  [/\b(?:depends|depend|depending) of\b/i, x => x.replace(/of$/i,'on'), '表示“依赖”时用 depend on。'],
  [/^((?:(?:some|many|the|strict|stricter|harsh|harsher|severe|tough|tougher) )?(?:university students|students|young people|people|public services|punishments|penalties|policies|farmers|governments)) (is|has|feels|struggles|gives|faces|leads|reduces|finds|causes|helps|supports|makes|poses|threatens)\b/i,
    (_,subject,verb) => subject+' '+({is:'are',has:'have'}[verb.toLowerCase()] || verb.slice(0,-1)), '这里的主语是复数，检查谓语的单复数。'],
  [/^((?:the )?unemployment rate|our environment|genetic engineering|dense planting|regular exercise|(?:strict|harsh|severe) punishment) (are|have|feel|struggle|give|face|lead|reduce|find|cause|help|support|make|pose|threaten|improve|boost)\b/i,
    (_,subject,verb) => subject+' '+({are:'is',have:'has'}[verb.toLowerCase()] || verb+'s'), '这里的主语是单数，谓语也要用单数形式。'],
  [/\b(allow|allows|enable|enables) (people|farmers|students|them|us) (develop|cultivate|grow|find|attend|study|access|obtain)\b/i,
    (_,verb,object,action) => verb+' '+object+' to '+action, 'allow/enable someone to do something 需要保留不定式标记 to。'],
];
const practice = {
  22:[
    [/\b(?:an? )?effect(?:ial|ive) mean(?= to reduce)\b/i,'an effective means','表示“一种有效手段”可用 an effective means。means 的单数形式也以 s 结尾。'],
    [/\beffectial\b/i,'effective','“有效的”拼作 effective。'],
  ],
  23:[
    [/\binvestment for space technology\b(?=[.!?]?$)/i,'investment in space technology','表示“对太空科技的投资”时，投资领域通常用 investment in 引出。'],
  ],
  24:[
    [/\bare difficult (?:to )?balance of income and expenditure\b/i,'find it difficult to balance income and expenditure','主语是公共服务，表达“难以做某事”可用 find it difficult to do，也可以说 struggle to break even。'],
    [/\bdifficult break even\b/i,'difficult to break even','difficult 后接动词时，这里需要 to。'],
  ],
  25:[
    [/^our environment (still|very) (bad|poor)\b/i,(_,adverb,adj) => 'our environment is '+adverb+' '+adj,'形容词说明环境的状态，完整句子需要系动词 is。'],
  ],
  26:[
    [/\bfeel(?:s)? stressful to study\b/i, x=>x.replace(/stressful/i,'under pressure'),'表示人感到压力可用 feel under pressure。stressful 常形容带来压力的事。'],
    [/\b(?:because )?lose work rate rise\b/i,x=>/^because/i.test(x)?'because the unemployment rate is rising':'the unemployment rate is rising','“失业率”可用 unemployment rate。作为原因从句，还需要完整谓语。'],
  ],
  27:[
    [/\buniversity free education\b/i,'free university education','表达“免费大学教育”时，将 free 放在 university education 前。'],
    [/\bmake the poor student has\b/i,'gives the student from a low-income family','原句想表达“给予机会”；单数主语可用 gives。若用 make someone do，后面接动词原形。'],
    [/\bhas same chance with rich student\b/i,'has the same chance as a wealthy student','比较相同的机会可用 the same chance as；单数可数名词 student 需要限定词。'],
  ],
  28:[
    [/\benvironment of social and economic\b/i,'the social and economic environment','social 和 economic 是修饰 environment 的形容词，可以放在名词前面。'],
  ],
  29:[
    [/\bgene engineer(?= can make people)\b/i,'genetic engineering','这里的主语是“基因工程”这门技术，engineer 指工程师。'],
    [/\bmake people cultivating\b/i,'make people cultivate','make someone do something 后接动词原形。表达“使……能够”还可以用 enable someone to do。'],
  ],
  30:[
    [/\b(?:cause|causes) threaten for biodiversity\b/i,'poses a threat to biodiversity','以 dense planting 为主语时，可用 poses a threat to，或者直接用及物动词 threatens。'],
    [/\b(?:pose|poses) (?:a )?threat for biodiversity\b/i,x=>x.replace(/(?:a )?threat for/i,'a threat to'),'“对……构成威胁”的搭配是 pose a threat to。'],
  ],
};
let worker;
let sequence = 0;
const requests = new Map();
function stopWorker() {
  worker?.terminate();
  worker = null;
  for (const finish of requests.values()) finish({checked:false,issues:[]});
  requests.clear();
}
function scan(answer) {
  if (typeof Worker === 'undefined') return Promise.resolve({checked:false,issues:[]});
  if (!worker) {
    worker = new Worker(new URL('./translation-model/grammar/harper-worker.js',import.meta.url),{type:'module'});
    worker.onerror = stopWorker;
    worker.onmessage = ({data}) => {
      requests.get(data.id)?.(data);
      requests.delete(data.id);
    };
  }
  const id = ++sequence;
  return new Promise(resolve => {
    const timeout = setTimeout(stopWorker,90000);
    requests.set(id,data => {clearTimeout(timeout); resolve(data);});
    worker.postMessage({id,answer});
  });
}

export async function checkGrammar(answer,sentence) {
  const issues = [];
  for (const [pattern,fix,reason] of [...(practice[sentence?.id] || []),...common]) {
    const match = answer.match(pattern);
    if (!match || issues.some(issue=>issue.original.includes(match[0]))) continue;
    let suggestion = typeof fix === 'string' ? fix : fix(...match);
    if (/^[A-Z]/.test(match[0])) suggestion = suggestion.charAt(0).toUpperCase()+suggestion.slice(1);
    issues.push({original:match[0],suggestion,reason});
  }
  let result;
  try {result=await scan(answer);} catch {result={checked:false,issues:[]};}
  for (const issue of result.issues) {
    if (!issues.some(existing=>existing.original.includes(issue.original))) issues.push(issue);
  }
  return {checked:result.checked,issues};
}
