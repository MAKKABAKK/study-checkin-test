import * as ort from './ort.wasm.min.mjs';
import {Tokenizer} from './tokenizers.min.mjs';

const asset = name => new URL(name, import.meta.url).href;
ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths = asset('./');
let loading, queue = Promise.resolve();

async function readConfig(name) {
  const response = await fetch(asset(name));
  if (!response.ok) throw Error('Tokenizer unavailable');
  return response.json();
}

async function loadModel() {
  const [session,vocab,config] = await Promise.all([
    ort.InferenceSession.create(asset('minilm-nli-int8.onnx'), {executionProviders:['wasm']}),
    readConfig('tokenizer.json'),
    readConfig('tokenizer_config.json')
  ]);
  return {session,tokenizer:new Tokenizer(vocab, config)};
}

async function classify({session,tokenizer}, first, second) {
  const encoded = tokenizer.encode(first,{text_pair:second});
  // Homework prompts are single sentences. A truncated text could reverse meaning.
  if (encoded.ids.length > 180) return [];
  const dims = [1,encoded.ids.length];
  const tensor = values => new ort.Tensor('int64', BigInt64Array.from(values,BigInt),dims);
  const inputs = {input_ids:tensor(encoded.ids), attention_mask:tensor(encoded.attention_mask)};
  const result = await session.run(inputs);
  const logits = result.logits.data;
  const peak = Math.max(...logits);
  const exp = Array.from(logits, x => Math.exp(x-peak));
  const total = exp.reduce((a,b) => a+b,0);
  return exp.map(x => x/total);
}

async function compare({reference,answer,alternatives}) {
  loading ||= loadModel().catch(error => { loading = undefined; throw error; });
  const model = await loading;
  const candidates = [...new Set([reference,...alternatives])].slice(0,4);
  let contradictions = 0;
  for (const candidate of candidates) {
    const a = await classify(model,candidate,answer);
    const b = await classify(model,answer,candidate);
    if (a[1] >= 0.90 && b[1] >= 0.90) return 'equivalent';
    if (a[0] >= 0.90 && b[0] >= 0.90) contradictions++;
  }
  return contradictions === candidates.length ? 'contradiction' : 'uncertain';
}

self.onmessage = ({data}) => {
  queue = queue.then(async () => {
    try { self.postMessage({id:data.id,verdict:await compare(data)}); }
    catch { self.postMessage({id:data.id,error:true}); }
  });
};
