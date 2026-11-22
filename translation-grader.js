import {teacherNotes} from './translation-teacher.js';
import {prepareMaterialReads} from './material-cache.js';

// These are notes on the exact Word drafts. They are independent of the teacher's tracked changes.
const draftIssues = {
  22: [
    ['effectial mean','an effective means','“一种有效手段”可写成 an effective means。effective 是形容词，means 作“手段”时单复数同形。'],
    ['reduce crime rate','reduce the crime rate','这里说的是犯罪率，常用 the crime rate。']
  ],
  23: [['investment for space technology','investment in space technology','表示投向哪个领域，用 investment in。按扩展句，政府支持的是这项投资。']],
  24: [['are difficult balance of income and expenditure','struggle to break even','主语是公共服务；“难以做某事”需要接动作。收支平衡可用 break even。']],
  25: [['environment still bad','environment is still bad','bad 是形容词，这里需要系动词 is 来构成完整谓语。']],
  26: [
    ['feel stressful','feel under pressure','stressful 用来形容令人有压力的事。这里表达大学生感到有压力。'],
    ['lose work rate rise','the unemployment rate is rising','“失业率”用 unemployment rate；原因从句需要完整谓语。']
  ],
  27: [
    ['The policy that university free education make','Free university education gives','用“免费大学教育”作主语，再接表示“给予”的谓语，避免留下不完整的 that 从句。'],
    ['the poor student has same chance with rich student','students from low-income families an equal chance to attend university','give 后可接“人 + 机会”。an equal chance 表示同等的机会。']
  ],
  28: [['environment of social and economic','the social and economic context','social 和 economic 都是形容词；并列放在所修饰的名词前。']],
  29: [
    ['Gene engineer','Genetic engineering','这里说的是技术领域；engineer 指人。'],
    ['make people cultivating new crops','enable people to develop new crop varieties','enable someone to do 表示“使某人能做”，new crop varieties 表达“新品种”。']
  ],
  30: [['cause threaten for','poses a threat to','threaten 是动词；用名词 threat 时可以说 pose a threat to。主语是 Dense planting，谓语用 poses。']]
};
export const workbookReview = Object.fromEntries(Object.entries(draftIssues).map(([id,entries])=>[id,{
  verdict:'revise', feedback:'再译一次时，重点检查下面的表达。',
  issues:entries.map(([original,suggestion,reason])=>({original,suggestion,reason}))
}]));

// Frequent alternative formulations avoid a model download for routine practice.
const alternatives = {
  1:["Exercising regularly can boost your confidence.","Regular physical activity can improve people's self-confidence."],
  2:["Depending on calculators can affect people's mental arithmetic skills."],
  3:["Many girls are reluctant to look for jobs in male-dominated fields."],
  4:["Environmental issues have become a focus of public concern."],
  5:["Parents and teachers should try to cut down on children's screen time spent watching TV."],
  6:["Art is not a core subject in school."],
  7:["Migration from the countryside to cities can help tackle rural unemployment."],
  8:["An economic downturn can drive up unemployment.","The economic slowdown has caused unemployment to rise."],
  9:["Many firms are unlikely to hire new employees because the economic outlook is uncertain."],
  10:["Some people see high-rises as urban eyesores."],
  11:["Economic growth depends on young workers."],
  12:["People with a lot of work have no time to relax and recharge."],
  13:["It is customary in China to give expensive gifts."],
  14:["Many students in China have to study independently in the evening."],
  15:["Air transportation emits a lot of greenhouse gases."],
  16:["Over the next few decades, protecting plant diversity will be difficult."],
  17:["Urban development threatens heritage sites."],
  18:["Children may have behavioural problems.","Children may have behavior problems."],
  19:["Population growth generates a lot of rubbish."],
  20:["We must not ignore face-to-face communication."],
  21:["It becomes harder to keep in touch with friends and family as we get older."],
  22:["Strict punishments are an effective way to reduce crime.","Severe penalties can effectively reduce crime rates.","Harsh punishments are an effective means of reducing the crime rate.","Tough penalties are effective at reducing crime."],
  23:["The government should support investment in space technology.","Public investment in space technology should be supported.","Governments ought to back investment in space technology."],
  24:["Some public services find it hard to break even.","It is difficult for some public services to break even.","Some public services struggle to cover their costs.","Some public services have difficulty balancing their budgets."],
  25:["Our environment is still bad.","The environment is still in bad shape.","Our environment remains in poor condition.","The environment is still in a poor state."],
  26:["A rising unemployment rate puts pressure on university students to study hard.","College students feel pressured to study hard because unemployment is rising."],
  27:["Free higher education gives students from disadvantaged backgrounds an equal opportunity to go to university.","Tuition-free universities give students from poorer families an equal chance of going to college."],
  28:["We need to take the social and economic environment into account.","We must consider the social and economic circumstances.","We need to consider the social and economic environment."],
  29:["Genetic engineering allows people to grow new crop varieties.","People can develop new varieties of crops through genetic engineering.","Genetic engineering makes it possible to develop new crop varieties."],
  30:["Dense planting threatens biodiversity.","High-density planting is a threat to biodiversity.","Planting crops too densely poses a threat to biodiversity."],
  31:["Without higher education, young people can only get low-skilled jobs.","Young people without a university education can only find low-skilled work."],
  32:["PE lessons can boost confidence and improve physical fitness."],
  33:["We preserve historical artefacts because of their historical importance."],
  34:["School activities should help children feel a sense of accomplishment and improve their well-being."],
  35:["Some workers are encouraged to break with tradition."],
  36:["Equal educational opportunities can help pupils who perform poorly at school."],
  37:["Racial discrimination is still a serious issue."],
  38:["Experiencing different cultures can encourage innovation."],
  39:["Some people are against GM foods."],
  40:["People are spending more time commuting.","The journey to and from work is taking longer."],
  41:["Tourist attractions do their best to meet visitors' needs and preferences."],
  42:["People can use computer skills in their studies and at work."],
  43:["Community rehabilitation gives offenders a chance to learn job skills."],
  44:["Governments should pay more attention to social welfare, particularly health care."],
  45:["In a fiercely competitive society, people in work care about their career prospects."],
  46:["Exercising regularly helps people stay mentally healthy."],
  47:["Ideas of beauty differ across cultures."],
  48:["Environmental movements can extend beyond national boundaries."],
  49:["Rules can restrict creativity."],
  50:["Human activities are to blame for most of the damage to the environment."],
  51:["People who lead unhealthy lives are at risk of getting sick."],
  52:["Constructing apartment buildings can reduce overcrowding in cities."],
  53:["Poor people can raise their social standing by working hard."],
  54:["Learning times tables by rote is not the best way to get better at arithmetic."],
  55:["Meeting basic human needs is the main priority for poor countries."],
  56:["Many children see violent material every day."],
  57:["Globalisation means people have to work with others from different backgrounds."],
  58:["The family environment is considered the biggest influence on how a child grows up."],
  59:["Large cities have some poor neighbourhoods."],
  60:["More students may be encouraged to pursue postgraduate education by scholarships."],
  61:["We need to take action to address some tough problems."],
  62:["Cuts in funding make higher education difficult to access for many young people."],
  63:["Grouping pupils by ability has no obvious connection with their academic results."],
  64:["Community ties will strengthen as more young people take part in volunteering."],
  65:["We still do not know how GM food affects human health."],
  66:["Some people see immigration as a threat to social unity."],
  67:["Teaching quality is widely seen as crucial to how well students do at school."],
  68:["Driving under the influence of alcohol should be a criminal offence."],
  69:["Shopping online is now an everyday activity for many people."],
  70:["In the countryside, people can get away from the pressures and noise of modern life."],
  71:["In a consumer society, the basic necessities of life no longer satisfy people."],
  72:["How computers affect literacy depends on a person's age."],
  73:["The media exaggerate the suffering of victims to attract viewers."],
  74:["People lead unhealthy lives because they tend to depend on technology."],
  75:["Poverty is one cause of rising crime in the community."],
  76:["Air travel has grown rapidly over the past few decades because costs have fallen."],
  77:["Poaching drives some species to extinction and causes a loss of biodiversity."],
  78:["Experiments on animals sometimes fail to identify the harmful side effects of drugs."],
  79:["Inventing electric vehicles is one of the ways we have tried to protect the environment."],
  80:["The environmental cost of human activity can sometimes be hard to measure."],
  81:["Population ageing is prompting countries to ease restrictions on the age of retirement."],
  82:["Teachers should be allowed to remove disruptive students from the classroom."],
  83:["A lot of people feel that they have to follow the latest fashions."],
  84:["Many places now make a point of protecting historic buildings."],
  85:["A person's education may determine what job opportunities they have."],
  86:["Fossil fuel use harms the environment."]
};

const normalize = text=>text.trim().toLowerCase().replace(/[’‘]/g,"'").replace(/[‐‑]/g,'-').replace(/\s+/g,' ').replace(/\.$/,'').trim();
const result = (verdict,feedback,issues=[])=>({verdict,feedback,issues});

// NLI can miss a subject/object swap when both sentences use the same vocabulary.
const reversedRelations = {
  8: [/^(?:a |the )?(?:rise in (?:the )?unemployment(?: rate)?|rising unemployment|unemployment) (?:has |can )?(?:led|leads?|contributes?) to (?:an? |the )?(?:economic (?:slowdown|downturn)|slower economic growth)$/, '原题中经济下滑是原因，失业率上升是结果。'],
  29: [/^(?:developing |growing |cultivating )?(?:new (?:varieties of )?crops?|new crop varieties)\b.*\b(?:enabl\w*|allow\w*|makes? possible|leads? to)\b[^.!?]*\bgenetic engineering\b/, '原题中基因工程是一种手段，使人能够培育新品种。检查哪一项使另一项成为可能。'],
  30: [/^biodiversity (?:poses a threat to|threatens|endangers) (?:dense|high-density|intensive) planting$/, '原题中密植带来威胁，受到威胁的是生物多样性。']
};

export async function gradeTranslation(sentence, answer) {
  const text = normalize(answer);
  if (!/[a-z]/i.test(text)) return result('unknown','请先用英文写出译文，再点批改。');
  const variants = alternatives[sentence.id] || [];
  if ([sentence.reference,...variants].some(form=>normalize(form)===text)) {
    return result('correct','这句话传达了原意，语法和搭配也合适。');
  }
  if (workbookReview[sentence.id] && sentence.drafts.some(draft=>normalize(draft)===text)) return workbookReview[sentence.id];
  const note = teacherNotes[sentence.id];
  if (note?.needsRetry && normalize(note.original)===text) {
    return result('revise','这次写法与 Word 里曾被老师修改的原稿相同。', [{
      original:note.original,suggestion:note.corrected,reason:note.comments.map(c=>c.text).join('；') || '对照老师的修订，再试着独立写一遍。'
    }]);
  }
  const reversal = reversedRelations[sentence.id];
  if (reversal?.[0].test(text)) return result('revise','句子中的关系方向写反了。',[{
    original:answer,suggestion:sentence.reference,reason:reversal[1]
  }]);
  // Keep all checking in this browser. Opening a page or typing does not load a model.
  await prepareMaterialReads();
  let grammar;
  try {
    const {checkGrammar} = await import('./translation-grammar.js');
    grammar = await checkGrammar(answer,sentence);
    if (grammar.issues.length) return result('revise','这句话有可以具体修改的地方。',grammar.issues);
  } catch { /* Still check meaning if the grammar engine could not load. */ }
  try {
    const {compareTranslation} = await import('./translation-inference.js');
    const meaning = await compareTranslation(sentence.reference,answer,variants);
    if (meaning==='equivalent' && grammar?.checked) {
      return result('correct','你的表达传达了原句的意思，语法检查也通过了。');
    }
    if (meaning==='contradiction') return result('revise','译文表达的意思与题意有冲突。',[{
      original:answer,suggestion:sentence.reference,reason:'对照谁做了什么，以及肯定、否定或变化方向，再用自己的话重写。'
    }]);
    if (meaning==='equivalent') return result('unknown','意思相符，语法检查暂未完成。可以稍后重试或展开对照。');
  } catch { return result('unknown','这次未能加载语义检查。你的译文已留在练习里，可以稍后重试或展开对照。'); }
  return result('unknown','这句话可能有其他合适的译法，自动批改暂时拿不准。请展开对照，再决定是否需要重译。');
}
