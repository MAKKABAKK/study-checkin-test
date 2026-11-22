/* Harper.js 3.2.0, Apache-2.0. Adapted for local, worker-based loading. See LICENSE-Harper.txt. */
var Ln=Object.defineProperty,Cn=(e,n)=>{let t={};for(var r in e)Ln(t,r,{get:e[r],enumerable:!0});return n||Ln(t,Symbol.toStringTag,{value:"Module"}),t},ie=Cn({Dialect:()=>An,Language:()=>N,Lint:()=>O,Linter:()=>pn,OrganizedGroup:()=>tn,Span:()=>rn,Suggestion:()=>q,SuggestionKind:()=>Vn,default:()=>Jn,get_default_lint_config:()=>ae,get_default_lint_config_as_json:()=>se,initSync:()=>pe,setup:()=>_e,to_title_case:()=>oe}),An=Object.freeze({American:0,0:"American",British:1,1:"British",Australian:2,2:"Australian",Canadian:3,3:"Canadian",Indian:4,4:"Indian"}),N=Object.freeze({Plain:0,0:"Plain",Markdown:1,1:"Markdown",Typst:2,2:"Typst"}),O=class K{static __wrap(n){let t=Object.create(K.prototype);return t.__wbg_ptr=n,xn.register(t,t.__wbg_ptr,t),t}static __unwrap(n){return n instanceof K?n.__destroy_into_raw():0}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,xn.unregister(this),n}free(){let n=this.__destroy_into_raw();i.__wbg_lint_free(n,0)}static from_json(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=i.lint_from_json(t,u);if(r[2])throw $(r[1]);return K.__wrap(r[0])}get_problem_text(){let n,t;try{let r=i.lint_get_problem_text(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}lint_kind(){let n,t;try{let r=i.lint_lint_kind(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}lint_kind_pretty(){let n,t;try{let r=i.lint_lint_kind_pretty(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}message(){let n,t;try{let r=i.lint_message(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}message_html(){let n,t;try{let r=i.lint_message_html(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}span(){let n=i.lint_span(this.__wbg_ptr);return rn.__wrap(n)}suggestion_count(){return i.lint_suggestion_count(this.__wbg_ptr)>>>0}suggestions(){let n=i.lint_suggestions(this.__wbg_ptr);var t=B(n[0],n[1]);return i.__wbindgen_free(n[0],n[1]*4,4),t}to_json(){let n,t;try{let r=i.lint_to_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(O.prototype[Symbol.dispose]=O.prototype.free);var pn=class wn{static __wrap(n){let t=Object.create(wn.prototype);return t.__wbg_ptr=n,Wn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,Wn.unregister(this),n}free(){let n=this.__destroy_into_raw();i.__wbg_linter_free(n,0)}apply_suggestion(n,t,r){let s,o;try{let g=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),y=u;ln(t,O),ln(r,q);let h=i.linter_apply_suggestion(this.__wbg_ptr,g,y,t.__wbg_ptr,r.__wbg_ptr);var _=h[0],l=h[1];if(h[3])throw _=0,l=0,$(h[2]);return s=_,o=l,c(_,l)}finally{i.__wbindgen_free(s,o,1)}}clear_ignored_lints(){i.linter_clear_ignored_lints(this.__wbg_ptr)}clear_words(){i.linter_clear_words(this.__wbg_ptr)}context_hash(n,t){let r=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),s=u;ln(t,O);let o=i.linter_context_hash(this.__wbg_ptr,r,s,t.__wbg_ptr);return BigInt.asUintN(64,o)}export_ignored_lints(){let n,t;try{let r=i.linter_export_ignored_lints(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}export_words(){let n=i.linter_export_words(this.__wbg_ptr);var t=B(n[0],n[1]);return i.__wbindgen_free(n[0],n[1]*4,4),t}generate_stats_file(){let n,t;try{let r=i.linter_generate_stats_file(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get_dialect(){return i.linter_get_dialect(this.__wbg_ptr)}get_lint_config_as_json(){let n,t;try{let r=i.linter_get_lint_config_as_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get_lint_config_as_object(){return i.linter_get_lint_config_as_object(this.__wbg_ptr)}get_lint_descriptions_as_json(){let n,t;try{let r=i.linter_get_lint_descriptions_as_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get_lint_descriptions_as_object(){return i.linter_get_lint_descriptions_as_object(this.__wbg_ptr)}get_lint_descriptions_html_as_json(){let n,t;try{let r=i.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get_lint_descriptions_html_as_object(){return i.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr)}get_structured_lint_config_as_json(){let n,t;try{let r=i.linter_get_structured_lint_config_as_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get_structured_lint_config_as_object(){return i.linter_get_structured_lint_config_as_object(this.__wbg_ptr)}ignore_hashes(n){let t=ge(n,i.__wbindgen_malloc),r=u;i.linter_ignore_hashes(this.__wbg_ptr,t,r)}ignore_lints(n,t){let r=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),s=u,o=yn(t,i.__wbindgen_malloc),_=u;i.linter_ignore_lints(this.__wbg_ptr,r,s,o,_)}import_ignored_lints(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=u,s=i.linter_import_ignored_lints(this.__wbg_ptr,t,r);if(s[1])throw $(s[0])}import_stats_file(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=u,s=i.linter_import_stats_file(this.__wbg_ptr,t,r);if(s[1])throw $(s[0])}import_weirpack(n){let t=ce(n,i.__wbindgen_malloc),r=u,s=i.linter_import_weirpack(this.__wbg_ptr,t,r);if(s[2])throw $(s[1]);return $(s[0])}import_words(n){let t=yn(n,i.__wbindgen_malloc),r=u;i.linter_import_words(this.__wbg_ptr,t,r)}is_likely_english(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=u;return i.linter_is_likely_english(this.__wbg_ptr,t,r)!==0}isolate_english(n){let t,r;try{let s=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),o=u,_=i.linter_isolate_english(this.__wbg_ptr,s,o);return t=_[0],r=_[1],c(_[0],_[1])}finally{i.__wbindgen_free(t,r,1)}}lint(n,t,r,s,o,_){let l=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),g=u;var y=A(s)?0:w(s,i.__wbindgen_malloc,i.__wbindgen_realloc),h=u;let b=i.linter_lint(this.__wbg_ptr,l,g,t,r,y,h,o,_);var W=B(b[0],b[1]);return i.__wbindgen_free(b[0],b[1]*4,4),W}static new(n){let t=i.linter_new(n);return wn.__wrap(t)}organized_lints(n,t,r,s,o,_){let l=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),g=u;var y=A(s)?0:w(s,i.__wbindgen_malloc,i.__wbindgen_realloc),h=u;let b=i.linter_organized_lints(this.__wbg_ptr,l,g,t,r,y,h,o,_);var W=B(b[0],b[1]);return i.__wbindgen_free(b[0],b[1]*4,4),W}set_lint_config_from_json(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=u,s=i.linter_set_lint_config_from_json(this.__wbg_ptr,t,r);if(s[1])throw $(s[0])}set_lint_config_from_object(n){let t=i.linter_set_lint_config_from_object(this.__wbg_ptr,n);if(t[1])throw $(t[0])}summarize_stats(n,t){return i.linter_summarize_stats(this.__wbg_ptr,!A(n),A(n)?BigInt(0):n,!A(t),A(t)?BigInt(0):t)}};Symbol.dispose&&(pn.prototype[Symbol.dispose]=pn.prototype.free);var tn=class Un{static __wrap(n){let t=Object.create(Un.prototype);return t.__wbg_ptr=n,Tn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,Tn.unregister(this),n}free(){let n=this.__destroy_into_raw();i.__wbg_organizedgroup_free(n,0)}get group(){let n,t;try{let r=i.__wbg_get_organizedgroup_group(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}get lints(){let n=i.__wbg_get_organizedgroup_lints(this.__wbg_ptr);var t=B(n[0],n[1]);return i.__wbindgen_free(n[0],n[1]*4,4),t}set group(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=u;i.__wbg_set_organizedgroup_group(this.__wbg_ptr,t,r)}set lints(n){let t=yn(n,i.__wbindgen_malloc),r=u;i.__wbg_set_organizedgroup_lints(this.__wbg_ptr,t,r)}};Symbol.dispose&&(tn.prototype[Symbol.dispose]=tn.prototype.free);var rn=class Q{static __wrap(n){let t=Object.create(Q.prototype);return t.__wbg_ptr=n,En.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,En.unregister(this),n}free(){let n=this.__destroy_into_raw();i.__wbg_span_free(n,0)}get end(){return i.__wbg_get_span_end(this.__wbg_ptr)>>>0}get start(){return i.__wbg_get_span_start(this.__wbg_ptr)>>>0}set end(n){i.__wbg_set_span_end(this.__wbg_ptr,n)}set start(n){i.__wbg_set_span_start(this.__wbg_ptr,n)}static from_json(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=i.span_from_json(t,u);if(r[2])throw $(r[1]);return Q.__wrap(r[0])}is_empty(){return i.span_is_empty(this.__wbg_ptr)!==0}len(){return i.span_len(this.__wbg_ptr)>>>0}static new(n,t){let r=i.span_new(n,t);return Q.__wrap(r)}to_json(){let n,t;try{let r=i.span_to_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(rn.prototype[Symbol.dispose]=rn.prototype.free);var q=class mn{static __wrap(n){let t=Object.create(mn.prototype);return t.__wbg_ptr=n,On.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,On.unregister(this),n}free(){let n=this.__destroy_into_raw();i.__wbg_suggestion_free(n,0)}static from_json(n){let t=w(n,i.__wbindgen_malloc,i.__wbindgen_realloc),r=i.suggestion_from_json(t,u);if(r[2])throw $(r[1]);return mn.__wrap(r[0])}get_replacement_text(){let n,t;try{let r=i.suggestion_get_replacement_text(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}kind(){return i.suggestion_kind(this.__wbg_ptr)}to_json(){let n,t;try{let r=i.suggestion_to_json(this.__wbg_ptr);return n=r[0],t=r[1],c(r[0],r[1])}finally{i.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(q.prototype[Symbol.dispose]=q.prototype.free);var Vn=Object.freeze({Replace:0,0:"Replace",Remove:1,1:"Remove",InsertAfter:2,2:"InsertAfter"});function ae(){return i.get_default_lint_config()}function se(){let e,n;try{let t=i.get_default_lint_config_as_json();return e=t[0],n=t[1],c(t[0],t[1])}finally{i.__wbindgen_free(e,n,1)}}function _e(){i.setup()}function oe(e){let n,t;try{let r=w(e,i.__wbindgen_malloc,i.__wbindgen_realloc),s=i.to_title_case(r,u);return n=s[0],t=s[1],c(s[0],s[1])}finally{i.__wbindgen_free(n,t,1)}}function In(){return{__proto__:null,"./harper_wasm_slim_bg.js":{__proto__:null,__wbg_Error_30c8987f7c2ed4e2:function(e,n){return Error(c(e,n))},__wbg_String_8564e559799eccda:function(e,n){let t=w(String(n),i.__wbindgen_malloc,i.__wbindgen_realloc),r=u;v().setInt32(e+4,r,!0),v().setInt32(e+0,t,!0)},__wbg___wbindgen_boolean_get_5b446f51afd21013:function(e){let n=e,t=typeof n=="boolean"?n:void 0;return A(t)?16777215:t?1:0},__wbg___wbindgen_debug_string_4687d8d8c2017d52:function(e,n){let t=w(bn(n),i.__wbindgen_malloc,i.__wbindgen_realloc),r=u;v().setInt32(e+4,r,!0),v().setInt32(e+0,t,!0)},__wbg___wbindgen_is_function_1f9d30630b8b1d3d:function(e){return typeof e=="function"},__wbg___wbindgen_is_object_3c45d4f2dde4e749:function(e){let n=e;return typeof n=="object"&&n!==null},__wbg___wbindgen_is_string_90b56bc79aad6f6c:function(e){return typeof e=="string"},__wbg___wbindgen_jsval_loose_eq_677f21e468d6b461:function(e,n){return e==n},__wbg___wbindgen_number_get_2e0e7dee9f701a71:function(e,n){let t=n,r=typeof t=="number"?t:void 0;v().setFloat64(e+8,A(r)?0:r,!0),v().setInt32(e+0,!A(r),!0)},__wbg___wbindgen_string_get_0380ccaa2f57f0d9:function(e,n){let t=n,r=typeof t=="string"?t:void 0;var s=A(r)?0:w(r,i.__wbindgen_malloc,i.__wbindgen_realloc),o=u;v().setInt32(e+4,o,!0),v().setInt32(e+0,s,!0)},__wbg___wbindgen_throw_41e9ee4f547fc59a:function(e,n){throw new Error(c(e,n))},__wbg_call_6137034ef55c9d0f:function(){return F(function(e,n){return e.call(n)},arguments)},__wbg_done_b41a1d26cdb37fb6:function(e){return e.done},__wbg_entries_fb6397112b1de25f:function(e){return Object.entries(e)},__wbg_error_757e9472f8410341:function(e,n){let t,r;try{t=e,r=n,console.error(c(e,n))}finally{i.__wbindgen_free(t,r,1)}},__wbg_getRandomValues_973dabfb0ad1769f:function(){return F(function(e,n){globalThis.crypto.getRandomValues(gn(e,n))},arguments)},__wbg_getRandomValues_a608c4436c19407a:function(){return F(function(e,n){globalThis.crypto.getRandomValues(gn(e,n))},arguments)},__wbg_getTime_f5a55efff2585d5d:function(e){return e.getTime()},__wbg_get_658f6698067d9515:function(){return F(function(e,n){return Reflect.get(e,n)},arguments)},__wbg_get_6c896e0571ddae51:function(e,n){return e[n>>>0]},__wbg_get_unchecked_288889d017702237:function(e,n){return e[n>>>0]},__wbg_instanceof_ArrayBuffer_a99f175873e5d9b8:function(e){let n;try{n=e instanceof ArrayBuffer}catch{n=!1}return n},__wbg_instanceof_Uint8Array_828cef2aaacafc31:function(e){let n;try{n=e instanceof Uint8Array}catch{n=!1}return n},__wbg_iterator_e3c31c892080e444:function(){return Symbol.iterator},__wbg_length_7f3c00c40364105e:function(e){return e.length},__wbg_length_d4bdea10311bd9cf:function(e){return e.length},__wbg_lint_new:function(e){return O.__wrap(e)},__wbg_lint_unwrap:function(e){return O.__unwrap(e)},__wbg_log_1f8cbb01c83d06c2:function(e,n,t,r,s,o,_,l){let g,y;try{g=e,y=n,console.log(c(e,n),c(t,r),c(s,o),c(_,l))}finally{i.__wbindgen_free(g,y,1)}},__wbg_log_a54ca6b45e09078a:function(e,n){let t,r;try{t=e,r=n,console.log(c(e,n))}finally{i.__wbindgen_free(t,r,1)}},__wbg_mark_6b7f03786f5e4d61:function(e,n){performance.mark(c(e,n))},__wbg_measure_0e21b33a1c6e3a29:function(){return F(function(e,n,t,r){let s,o,_,l;try{s=e,o=n,_=t,l=r,performance.measure(c(e,n),c(t,r))}finally{i.__wbindgen_free(s,o,1),i.__wbindgen_free(_,l,1)}},arguments)},__wbg_new_0_72d020f0c63443d4:function(){return new Date},__wbg_new_1dbf7428bba60a42:function(e){return new Uint8Array(e)},__wbg_new_227d7c05414eb861:function(){return new Error},__wbg_new_28744009d011f847:function(){return new Map},__wbg_new_617a8cdb8bb1130e:function(){return new Object},__wbg_new_ee2291f50781bf1d:function(){return new Array},__wbg_next_33784799010f1bbe:function(e){return e.next},__wbg_next_f4aac29c42af995c:function(){return F(function(e){return e.next()},arguments)},__wbg_organizedgroup_new:function(e){return tn.__wrap(e)},__wbg_prototypesetcall_bc27214492979395:function(e,n,t){Uint8Array.prototype.set.call(gn(e,n),t)},__wbg_set_6ae97e73113c4f0b:function(e,n,t){return e.set(n,t)},__wbg_set_6be42768c690e380:function(e,n,t){e[n]=t},__wbg_set_bea140a88be9b277:function(e,n,t){e[n>>>0]=t},__wbg_stack_3b0d974bbf31e44f:function(e,n){let t=n.stack,r=w(t,i.__wbindgen_malloc,i.__wbindgen_realloc),s=u;v().setInt32(e+4,s,!0),v().setInt32(e+0,r,!0)},__wbg_suggestion_new:function(e){return q.__wrap(e)},__wbg_value_f3c585ee8f5ba40c:function(e){return e.value},__wbindgen_generic_0000000000000001:function(e){return e},__wbindgen_generic_0000000000000002:function(e,n){return c(e,n)},__wbindgen_init_externref_table:function(){let e=i.__wbindgen_externrefs,n=e.grow(4);e.set(0,void 0),e.set(n+0,void 0),e.set(n+1,null),e.set(n+2,!0),e.set(n+3,!1)}}}}var xn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>i.__wbg_lint_free(e,1)),Wn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>i.__wbg_linter_free(e,1)),Tn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>i.__wbg_organizedgroup_free(e,1)),En=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>i.__wbg_span_free(e,1)),On=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>i.__wbg_suggestion_free(e,1));function Bn(e){let n=i.__externref_table_alloc();return i.__wbindgen_externrefs.set(n,e),n}function ln(e,n){if(!(e instanceof n))throw new Error(`expected instance of ${n.name}`)}function bn(e){let n=typeof e;if(n=="number"||n=="boolean"||e==null)return`${e}`;if(n=="string")return`"${e}"`;if(n=="symbol"){let s=e.description;return s==null?"Symbol":`Symbol(${s})`}if(n=="function"){let s=e.name;return typeof s=="string"&&s.length>0?`Function(${s})`:"Function"}if(Array.isArray(e)){let s=e.length,o="[";s>0&&(o+=bn(e[0]));for(let _=1;_<s;_++)o+=", "+bn(e[_]);return o+="]",o}let t=/\[object ([^\]]+)\]/.exec(toString.call(e)),r;if(t&&t.length>1)r=t[1];else return toString.call(e);if(r=="Object")try{return"Object("+JSON.stringify(e)+")"}catch{return"Object"}return e instanceof Error?`${e.name}: ${e.message}
${e.stack}`:r}function B(e,n){e=e>>>0;let t=v(),r=[];for(let s=e;s<e+4*n;s+=4)r.push(i.__wbindgen_externrefs.get(t.getUint32(s,!0)));return i.__externref_drop_slice(e,n),r}function gn(e,n){return e=e>>>0,k().subarray(e/1,e/1+n)}var C=null;function le(){return(C===null||C.byteLength===0)&&(C=new BigUint64Array(i.memory.buffer)),C}var T=null;function v(){return(T===null||T.buffer.detached===!0||T.buffer.detached===void 0&&T.buffer!==i.memory.buffer)&&(T=new DataView(i.memory.buffer)),T}function c(e,n){return ue(e>>>0,n)}var U=null;function k(){return(U===null||U.byteLength===0)&&(U=new Uint8Array(i.memory.buffer)),U}function F(e,n){try{return e.apply(this,n)}catch(t){let r=Bn(t);i.__wbindgen_exn_store(r)}}function A(e){return e==null}function ge(e,n){let t=n(e.length*8,8)>>>0;return le().set(e,t/8),u=e.length,t}function ce(e,n){let t=n(e.length*1,1)>>>0;return k().set(e,t/1),u=e.length,t}function yn(e,n){let t=n(e.length*4,4)>>>0;for(let r=0;r<e.length;r++){let s=Bn(e[r]);v().setUint32(t+4*r,s,!0)}return u=e.length,t}function w(e,n,t){if(t===void 0){let l=P.encode(e),g=n(l.length,1)>>>0;return k().subarray(g,g+l.length).set(l),u=l.length,g}let r=e.length,s=n(r,1)>>>0,o=k(),_=0;for(;_<r;_++){let l=e.charCodeAt(_);if(l>127)break;o[s+_]=l}if(_!==r){_!==0&&(e=e.slice(_)),s=t(s,r,r=_+e.length*3,1)>>>0;let l=k().subarray(s+_,s+r),g=P.encodeInto(e,l);_+=g.written,s=t(s,r,_,1)>>>0}return u=_,s}function $(e){let n=i.__wbindgen_externrefs.get(e);return i.__externref_table_dealloc(e),n}var Y=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});Y.decode();var fe=2146435072,cn=0;function ue(e,n){return cn+=n,cn>=fe&&(Y=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),Y.decode(),cn=n),Y.decode(k().subarray(e,e+n))}var P=new TextEncoder;"encodeInto"in P||(P.encodeInto=function(e,n){let t=P.encode(e);return n.set(t),{read:e.length,written:t.length}});var u=0,i;function Pn(e,n){return i=e.exports,C=null,T=null,U=null,i.__wbindgen_start(),i}async function de(e,n){if(typeof Response=="function"&&e instanceof Response){if(!e.ok)throw new Error(`failed to fetch Wasm: ${e.status} ${e.statusText} fetching '${e.url}'`);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(s){if(t(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",s);else throw s}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,n)}else{let r=await WebAssembly.instantiate(e,n);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}function t(r){switch(r){case"basic":case"cors":case"default":return!0}return!1}}function pe(e){if(i!==void 0)return i;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module:e}=e:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));let n=In();return e instanceof WebAssembly.Module||(e=new WebAssembly.Module(e)),Pn(new WebAssembly.Instance(e,n),e)}async function Jn(e){if(i!==void 0)return i;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),e===void 0&&(e=new URL);let n=In();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));let{instance:t,module:r}=await de(await e,n);return Pn(t,r)}var we=Cn({Dialect:()=>me,Language:()=>be,Lint:()=>M,Linter:()=>hn,OrganizedGroup:()=>an,Span:()=>sn,Suggestion:()=>H,SuggestionKind:()=>ye,default:()=>Oe,get_default_lint_config:()=>he,get_default_lint_config_as_json:()=>ve,initSync:()=>Ee,setup:()=>Se,to_title_case:()=>$e}),me=Object.freeze({American:0,0:"American",British:1,1:"British",Australian:2,2:"Australian",Canadian:3,3:"Canadian",Indian:4,4:"Indian"}),be=Object.freeze({Plain:0,0:"Plain",Markdown:1,1:"Markdown",Typst:2,2:"Typst"}),M=class X{static __wrap(n){let t=Object.create(X.prototype);return t.__wbg_ptr=n,Mn.register(t,t.__wbg_ptr,t),t}static __unwrap(n){return n instanceof X?n.__destroy_into_raw():0}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,Mn.unregister(this),n}free(){let n=this.__destroy_into_raw();a.__wbg_lint_free(n,0)}static from_json(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=a.lint_from_json(t,d);if(r[2])throw j(r[1]);return X.__wrap(r[0])}get_problem_text(){let n,t;try{let r=a.lint_get_problem_text(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}lint_kind(){let n,t;try{let r=a.lint_lint_kind(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}lint_kind_pretty(){let n,t;try{let r=a.lint_lint_kind_pretty(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}message(){let n,t;try{let r=a.lint_message(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}message_html(){let n,t;try{let r=a.lint_message_html(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}span(){let n=a.lint_span(this.__wbg_ptr);return sn.__wrap(n)}suggestion_count(){return a.lint_suggestion_count(this.__wbg_ptr)>>>0}suggestions(){let n=a.lint_suggestions(this.__wbg_ptr);var t=J(n[0],n[1]);return a.__wbindgen_free(n[0],n[1]*4,4),t}to_json(){let n,t;try{let r=a.lint_to_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(M.prototype[Symbol.dispose]=M.prototype.free);var hn=class vn{static __wrap(n){let t=Object.create(vn.prototype);return t.__wbg_ptr=n,Fn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,Fn.unregister(this),n}free(){let n=this.__destroy_into_raw();a.__wbg_linter_free(n,0)}apply_suggestion(n,t,r){let s,o;try{let g=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),y=d;fn(t,M),fn(r,H);let h=a.linter_apply_suggestion(this.__wbg_ptr,g,y,t.__wbg_ptr,r.__wbg_ptr);var _=h[0],l=h[1];if(h[3])throw _=0,l=0,j(h[2]);return s=_,o=l,f(_,l)}finally{a.__wbindgen_free(s,o,1)}}clear_ignored_lints(){a.linter_clear_ignored_lints(this.__wbg_ptr)}clear_words(){a.linter_clear_words(this.__wbg_ptr)}context_hash(n,t){let r=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),s=d;fn(t,M);let o=a.linter_context_hash(this.__wbg_ptr,r,s,t.__wbg_ptr);return BigInt.asUintN(64,o)}export_ignored_lints(){let n,t;try{let r=a.linter_export_ignored_lints(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}export_words(){let n=a.linter_export_words(this.__wbg_ptr);var t=J(n[0],n[1]);return a.__wbindgen_free(n[0],n[1]*4,4),t}generate_stats_file(){let n,t;try{let r=a.linter_generate_stats_file(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get_dialect(){return a.linter_get_dialect(this.__wbg_ptr)}get_lint_config_as_json(){let n,t;try{let r=a.linter_get_lint_config_as_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get_lint_config_as_object(){return a.linter_get_lint_config_as_object(this.__wbg_ptr)}get_lint_descriptions_as_json(){let n,t;try{let r=a.linter_get_lint_descriptions_as_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get_lint_descriptions_as_object(){return a.linter_get_lint_descriptions_as_object(this.__wbg_ptr)}get_lint_descriptions_html_as_json(){let n,t;try{let r=a.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get_lint_descriptions_html_as_object(){return a.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr)}get_structured_lint_config_as_json(){let n,t;try{let r=a.linter_get_structured_lint_config_as_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get_structured_lint_config_as_object(){return a.linter_get_structured_lint_config_as_object(this.__wbg_ptr)}ignore_hashes(n){let t=Ae(n,a.__wbindgen_malloc),r=d;a.linter_ignore_hashes(this.__wbg_ptr,t,r)}ignore_lints(n,t){let r=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),s=d,o=jn(t,a.__wbindgen_malloc),_=d;a.linter_ignore_lints(this.__wbg_ptr,r,s,o,_)}import_ignored_lints(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=d,s=a.linter_import_ignored_lints(this.__wbg_ptr,t,r);if(s[1])throw j(s[0])}import_stats_file(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=d,s=a.linter_import_stats_file(this.__wbg_ptr,t,r);if(s[1])throw j(s[0])}import_weirpack(n){let t=Le(n,a.__wbindgen_malloc),r=d,s=a.linter_import_weirpack(this.__wbg_ptr,t,r);if(s[2])throw j(s[1]);return j(s[0])}import_words(n){let t=jn(n,a.__wbindgen_malloc),r=d;a.linter_import_words(this.__wbg_ptr,t,r)}is_likely_english(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=d;return a.linter_is_likely_english(this.__wbg_ptr,t,r)!==0}isolate_english(n){let t,r;try{let s=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),o=d,_=a.linter_isolate_english(this.__wbg_ptr,s,o);return t=_[0],r=_[1],f(_[0],_[1])}finally{a.__wbindgen_free(t,r,1)}}lint(n,t,r,s,o,_){let l=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),g=d;var y=L(s)?0:m(s,a.__wbindgen_malloc,a.__wbindgen_realloc),h=d;let b=a.linter_lint(this.__wbg_ptr,l,g,t,r,y,h,o,_);var W=J(b[0],b[1]);return a.__wbindgen_free(b[0],b[1]*4,4),W}static new(n){let t=a.linter_new(n);return vn.__wrap(t)}organized_lints(n,t,r,s,o,_){let l=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),g=d;var y=L(s)?0:m(s,a.__wbindgen_malloc,a.__wbindgen_realloc),h=d;let b=a.linter_organized_lints(this.__wbg_ptr,l,g,t,r,y,h,o,_);var W=J(b[0],b[1]);return a.__wbindgen_free(b[0],b[1]*4,4),W}set_lint_config_from_json(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=d,s=a.linter_set_lint_config_from_json(this.__wbg_ptr,t,r);if(s[1])throw j(s[0])}set_lint_config_from_object(n){let t=a.linter_set_lint_config_from_object(this.__wbg_ptr,n);if(t[1])throw j(t[0])}summarize_stats(n,t){return a.linter_summarize_stats(this.__wbg_ptr,!L(n),L(n)?BigInt(0):n,!L(t),L(t)?BigInt(0):t)}};Symbol.dispose&&(hn.prototype[Symbol.dispose]=hn.prototype.free);var an=class Gn{static __wrap(n){let t=Object.create(Gn.prototype);return t.__wbg_ptr=n,zn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,zn.unregister(this),n}free(){let n=this.__destroy_into_raw();a.__wbg_organizedgroup_free(n,0)}get group(){let n,t;try{let r=a.__wbg_get_organizedgroup_group(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}get lints(){let n=a.__wbg_get_organizedgroup_lints(this.__wbg_ptr);var t=J(n[0],n[1]);return a.__wbindgen_free(n[0],n[1]*4,4),t}set group(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=d;a.__wbg_set_organizedgroup_group(this.__wbg_ptr,t,r)}set lints(n){let t=jn(n,a.__wbindgen_malloc),r=d;a.__wbg_set_organizedgroup_lints(this.__wbg_ptr,t,r)}};Symbol.dispose&&(an.prototype[Symbol.dispose]=an.prototype.free);var sn=class Z{static __wrap(n){let t=Object.create(Z.prototype);return t.__wbg_ptr=n,kn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,kn.unregister(this),n}free(){let n=this.__destroy_into_raw();a.__wbg_span_free(n,0)}get end(){return a.__wbg_get_span_end(this.__wbg_ptr)>>>0}get start(){return a.__wbg_get_span_start(this.__wbg_ptr)>>>0}set end(n){a.__wbg_set_span_end(this.__wbg_ptr,n)}set start(n){a.__wbg_set_span_start(this.__wbg_ptr,n)}static from_json(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=a.span_from_json(t,d);if(r[2])throw j(r[1]);return Z.__wrap(r[0])}is_empty(){return a.span_is_empty(this.__wbg_ptr)!==0}len(){return a.span_len(this.__wbg_ptr)>>>0}static new(n,t){let r=a.span_new(n,t);return Z.__wrap(r)}to_json(){let n,t;try{let r=a.span_to_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(sn.prototype[Symbol.dispose]=sn.prototype.free);var H=class Sn{static __wrap(n){let t=Object.create(Sn.prototype);return t.__wbg_ptr=n,Rn.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){let n=this.__wbg_ptr;return this.__wbg_ptr=0,Rn.unregister(this),n}free(){let n=this.__destroy_into_raw();a.__wbg_suggestion_free(n,0)}static from_json(n){let t=m(n,a.__wbindgen_malloc,a.__wbindgen_realloc),r=a.suggestion_from_json(t,d);if(r[2])throw j(r[1]);return Sn.__wrap(r[0])}get_replacement_text(){let n,t;try{let r=a.suggestion_get_replacement_text(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}kind(){return a.suggestion_kind(this.__wbg_ptr)}to_json(){let n,t;try{let r=a.suggestion_to_json(this.__wbg_ptr);return n=r[0],t=r[1],f(r[0],r[1])}finally{a.__wbindgen_free(n,t,1)}}};Symbol.dispose&&(H.prototype[Symbol.dispose]=H.prototype.free);var ye=Object.freeze({Replace:0,0:"Replace",Remove:1,1:"Remove",InsertAfter:2,2:"InsertAfter"});function he(){return a.get_default_lint_config()}function ve(){let e,n;try{let t=a.get_default_lint_config_as_json();return e=t[0],n=t[1],f(t[0],t[1])}finally{a.__wbindgen_free(e,n,1)}}function Se(){a.setup()}function $e(e){let n,t;try{let r=m(e,a.__wbindgen_malloc,a.__wbindgen_realloc),s=a.to_title_case(r,d);return n=s[0],t=s[1],f(s[0],s[1])}finally{a.__wbindgen_free(n,t,1)}}function qn(){return{__proto__:null,"./harper_wasm_bg.js":{__proto__:null,__wbg_Error_30c8987f7c2ed4e2:function(e,n){return Error(f(e,n))},__wbg_String_8564e559799eccda:function(e,n){let t=m(String(n),a.__wbindgen_malloc,a.__wbindgen_realloc),r=d;S().setInt32(e+4,r,!0),S().setInt32(e+0,t,!0)},__wbg___wbindgen_boolean_get_5b446f51afd21013:function(e){let n=e,t=typeof n=="boolean"?n:void 0;return L(t)?16777215:t?1:0},__wbg___wbindgen_debug_string_4687d8d8c2017d52:function(e,n){let t=m($n(n),a.__wbindgen_malloc,a.__wbindgen_realloc),r=d;S().setInt32(e+4,r,!0),S().setInt32(e+0,t,!0)},__wbg___wbindgen_is_function_1f9d30630b8b1d3d:function(e){return typeof e=="function"},__wbg___wbindgen_is_object_3c45d4f2dde4e749:function(e){let n=e;return typeof n=="object"&&n!==null},__wbg___wbindgen_is_string_90b56bc79aad6f6c:function(e){return typeof e=="string"},__wbg___wbindgen_jsval_loose_eq_677f21e468d6b461:function(e,n){return e==n},__wbg___wbindgen_number_get_2e0e7dee9f701a71:function(e,n){let t=n,r=typeof t=="number"?t:void 0;S().setFloat64(e+8,L(r)?0:r,!0),S().setInt32(e+0,!L(r),!0)},__wbg___wbindgen_string_get_0380ccaa2f57f0d9:function(e,n){let t=n,r=typeof t=="string"?t:void 0;var s=L(r)?0:m(r,a.__wbindgen_malloc,a.__wbindgen_realloc),o=d;S().setInt32(e+4,o,!0),S().setInt32(e+0,s,!0)},__wbg___wbindgen_throw_41e9ee4f547fc59a:function(e,n){throw new Error(f(e,n))},__wbg_call_6137034ef55c9d0f:function(){return z(function(e,n){return e.call(n)},arguments)},__wbg_done_b41a1d26cdb37fb6:function(e){return e.done},__wbg_entries_fb6397112b1de25f:function(e){return Object.entries(e)},__wbg_error_757e9472f8410341:function(e,n){let t,r;try{t=e,r=n,console.error(f(e,n))}finally{a.__wbindgen_free(t,r,1)}},__wbg_getRandomValues_973dabfb0ad1769f:function(){return z(function(e,n){globalThis.crypto.getRandomValues(un(e,n))},arguments)},__wbg_getRandomValues_a608c4436c19407a:function(){return z(function(e,n){globalThis.crypto.getRandomValues(un(e,n))},arguments)},__wbg_getTime_f5a55efff2585d5d:function(e){return e.getTime()},__wbg_get_658f6698067d9515:function(){return z(function(e,n){return Reflect.get(e,n)},arguments)},__wbg_get_6c896e0571ddae51:function(e,n){return e[n>>>0]},__wbg_get_unchecked_288889d017702237:function(e,n){return e[n>>>0]},__wbg_instanceof_ArrayBuffer_a99f175873e5d9b8:function(e){let n;try{n=e instanceof ArrayBuffer}catch{n=!1}return n},__wbg_instanceof_Uint8Array_828cef2aaacafc31:function(e){let n;try{n=e instanceof Uint8Array}catch{n=!1}return n},__wbg_iterator_e3c31c892080e444:function(){return Symbol.iterator},__wbg_length_7f3c00c40364105e:function(e){return e.length},__wbg_length_d4bdea10311bd9cf:function(e){return e.length},__wbg_lint_new:function(e){return M.__wrap(e)},__wbg_lint_unwrap:function(e){return M.__unwrap(e)},__wbg_log_1f8cbb01c83d06c2:function(e,n,t,r,s,o,_,l){let g,y;try{g=e,y=n,console.log(f(e,n),f(t,r),f(s,o),f(_,l))}finally{a.__wbindgen_free(g,y,1)}},__wbg_log_a54ca6b45e09078a:function(e,n){let t,r;try{t=e,r=n,console.log(f(e,n))}finally{a.__wbindgen_free(t,r,1)}},__wbg_mark_6b7f03786f5e4d61:function(e,n){performance.mark(f(e,n))},__wbg_measure_0e21b33a1c6e3a29:function(){return z(function(e,n,t,r){let s,o,_,l;try{s=e,o=n,_=t,l=r,performance.measure(f(e,n),f(t,r))}finally{a.__wbindgen_free(s,o,1),a.__wbindgen_free(_,l,1)}},arguments)},__wbg_new_0_72d020f0c63443d4:function(){return new Date},__wbg_new_1dbf7428bba60a42:function(e){return new Uint8Array(e)},__wbg_new_227d7c05414eb861:function(){return new Error},__wbg_new_28744009d011f847:function(){return new Map},__wbg_new_617a8cdb8bb1130e:function(){return new Object},__wbg_new_ee2291f50781bf1d:function(){return new Array},__wbg_next_33784799010f1bbe:function(e){return e.next},__wbg_next_f4aac29c42af995c:function(){return z(function(e){return e.next()},arguments)},__wbg_organizedgroup_new:function(e){return an.__wrap(e)},__wbg_prototypesetcall_bc27214492979395:function(e,n,t){Uint8Array.prototype.set.call(un(e,n),t)},__wbg_set_6ae97e73113c4f0b:function(e,n,t){return e.set(n,t)},__wbg_set_6be42768c690e380:function(e,n,t){e[n]=t},__wbg_set_bea140a88be9b277:function(e,n,t){e[n>>>0]=t},__wbg_stack_3b0d974bbf31e44f:function(e,n){let t=n.stack,r=m(t,a.__wbindgen_malloc,a.__wbindgen_realloc),s=d;S().setInt32(e+4,s,!0),S().setInt32(e+0,r,!0)},__wbg_suggestion_new:function(e){return H.__wrap(e)},__wbg_value_f3c585ee8f5ba40c:function(e){return e.value},__wbindgen_generic_0000000000000001:function(e){return e},__wbindgen_generic_0000000000000002:function(e,n){return f(e,n)},__wbindgen_init_externref_table:function(){let e=a.__wbindgen_externrefs,n=e.grow(4);e.set(0,void 0),e.set(n+0,void 0),e.set(n+1,null),e.set(n+2,!0),e.set(n+3,!1)}}}}var Mn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>a.__wbg_lint_free(e,1)),Fn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>a.__wbg_linter_free(e,1)),zn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>a.__wbg_organizedgroup_free(e,1)),kn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>a.__wbg_span_free(e,1)),Rn=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>a.__wbg_suggestion_free(e,1));function Hn(e){let n=a.__externref_table_alloc();return a.__wbindgen_externrefs.set(n,e),n}function fn(e,n){if(!(e instanceof n))throw new Error(`expected instance of ${n.name}`)}function $n(e){let n=typeof e;if(n=="number"||n=="boolean"||e==null)return`${e}`;if(n=="string")return`"${e}"`;if(n=="symbol"){let s=e.description;return s==null?"Symbol":`Symbol(${s})`}if(n=="function"){let s=e.name;return typeof s=="string"&&s.length>0?`Function(${s})`:"Function"}if(Array.isArray(e)){let s=e.length,o="[";s>0&&(o+=$n(e[0]));for(let _=1;_<s;_++)o+=", "+$n(e[_]);return o+="]",o}let t=/\[object ([^\]]+)\]/.exec(toString.call(e)),r;if(t&&t.length>1)r=t[1];else return toString.call(e);if(r=="Object")try{return"Object("+JSON.stringify(e)+")"}catch{return"Object"}return e instanceof Error?`${e.name}: ${e.message}
${e.stack}`:r}function J(e,n){e=e>>>0;let t=S(),r=[];for(let s=e;s<e+4*n;s+=4)r.push(a.__wbindgen_externrefs.get(t.getUint32(s,!0)));return a.__externref_drop_slice(e,n),r}function un(e,n){return e=e>>>0,R().subarray(e/1,e/1+n)}var V=null;function je(){return(V===null||V.byteLength===0)&&(V=new BigUint64Array(a.memory.buffer)),V}var E=null;function S(){return(E===null||E.buffer.detached===!0||E.buffer.detached===void 0&&E.buffer!==a.memory.buffer)&&(E=new DataView(a.memory.buffer)),E}function f(e,n){return We(e>>>0,n)}var I=null;function R(){return(I===null||I.byteLength===0)&&(I=new Uint8Array(a.memory.buffer)),I}function z(e,n){try{return e.apply(this,n)}catch(t){let r=Hn(t);a.__wbindgen_exn_store(r)}}function L(e){return e==null}function Ae(e,n){let t=n(e.length*8,8)>>>0;return je().set(e,t/8),d=e.length,t}function Le(e,n){let t=n(e.length*1,1)>>>0;return R().set(e,t/1),d=e.length,t}function jn(e,n){let t=n(e.length*4,4)>>>0;for(let r=0;r<e.length;r++){let s=Hn(e[r]);S().setUint32(t+4*r,s,!0)}return d=e.length,t}function m(e,n,t){if(t===void 0){let l=G.encode(e),g=n(l.length,1)>>>0;return R().subarray(g,g+l.length).set(l),d=l.length,g}let r=e.length,s=n(r,1)>>>0,o=R(),_=0;for(;_<r;_++){let l=e.charCodeAt(_);if(l>127)break;o[s+_]=l}if(_!==r){_!==0&&(e=e.slice(_)),s=t(s,r,r=_+e.length*3,1)>>>0;let l=R().subarray(s+_,s+r),g=G.encodeInto(e,l);_+=g.written,s=t(s,r,_,1)>>>0}return d=_,s}function j(e){let n=a.__wbindgen_externrefs.get(e);return a.__externref_table_dealloc(e),n}var nn=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});nn.decode();var xe=2146435072,dn=0;function We(e,n){return dn+=n,dn>=xe&&(nn=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),nn.decode(),dn=n),nn.decode(R().subarray(e,e+n))}var G=new TextEncoder;"encodeInto"in G||(G.encodeInto=function(e,n){let t=G.encode(e);return n.set(t),{read:e.length,written:t.length}});var d=0,a;function Kn(e,n){return a=e.exports,V=null,E=null,I=null,a.__wbindgen_start(),a}async function Te(e,n){if(typeof Response=="function"&&e instanceof Response){if(!e.ok)throw new Error(`failed to fetch Wasm: ${e.status} ${e.statusText} fetching '${e.url}'`);if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(s){if(t(e.type)&&e.headers.get("Content-Type")!=="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",s);else throw s}let r=await e.arrayBuffer();return await WebAssembly.instantiate(r,n)}else{let r=await WebAssembly.instantiate(e,n);return r instanceof WebAssembly.Instance?{instance:r,module:e}:r}function t(r){switch(r){case"basic":case"cors":case"default":return!0}return!1}}function Ee(e){if(a!==void 0)return a;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module:e}=e:console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));let n=qn();return e instanceof WebAssembly.Module||(e=new WebAssembly.Module(e)),Kn(new WebAssembly.Instance(e,n),e)}async function Oe(e){if(a!==void 0)return a;e!==void 0&&(Object.getPrototypeOf(e)===Object.prototype?{module_or_path:e}=e:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),e===void 0&&(e=new URL);let n=qn();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));let{instance:t,module:r}=await Te(await e,n);return Kn(t,r)}var _n=class en extends Promise{#e;#n;constructor(n){super(t=>{t()}),this.#e=n}static from(n){return new en(t=>{t(n())})}static resolve(n){return new en(t=>{t(n)})}static reject(n){return new en((t,r)=>{r(n)})}then(n,t){return this.#n??=new Promise(this.#e),this.#n.then(n,t)}catch(n){return this.#n??=new Promise(this.#e),this.#n.catch(n)}finally(n){return this.#n??=new Promise(this.#e),this.#n.finally(n)}},Me=(e,n,t,r)=>{if(t==="length"||t==="prototype"||t==="arguments"||t==="caller")return;let s=Object.getOwnPropertyDescriptor(e,t),o=Object.getOwnPropertyDescriptor(n,t);!Fe(s,o)&&r||Object.defineProperty(e,t,o)},Fe=function(e,n){return e===void 0||e.configurable||e.writable===n.writable&&e.enumerable===n.enumerable&&e.configurable===n.configurable&&(e.writable||e.value===n.value)},ze=(e,n)=>{let t=Object.getPrototypeOf(n);t!==Object.getPrototypeOf(e)&&Object.setPrototypeOf(e,t)},ke=(e,n)=>`/* Wrapped ${e}*/
${n}`,Re=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),Ne=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name"),De=(e,n,t)=>{let r=t===""?"":`with ${t.trim()}() `,s=ke.bind(null,r,n.toString());Object.defineProperty(s,"name",Ne),Object.defineProperty(e,"toString",{...Re,value:s})};function Ce(e,n,{ignoreNonConfigurable:t=!1}={}){let{name:r}=e;for(let s of Reflect.ownKeys(n))Me(e,n,s,t);return ze(e,n),De(e,n,r),e}var Ue=new WeakMap;function Nn(e,{cacheKey:n=([r])=>r,cache:t=new Map}={}){let r=new Map,s=function(...o){let _=n(o);if(r.has(_))return r.get(_);let l=(async()=>{try{if(t&&await t.has(_))return await t.get(_);let g=await e.apply(this,o);try{return g}finally{t&&await t.set(_,g)}}finally{r.delete(_)}})();return r.set(_,l),l};return Ce(s,e,{ignoreNonConfigurable:!0}),Ue.set(s,t),s}function Ve(e){return e.includes("harper_wasm_slim")?"slim":"full"}function Ie(e){return e==="slim"?ie:we}function Be(e,n){return n==="slim"?e:e.includes("harper_wasm_bg.wasm")?e.replace("harper_wasm_bg.wasm","harper_wasm_slim_bg.wasm"):null}async function Dn(e,n){let t=Ie(n),r=Be(e,n);if(r!=null)try{await Jn({module_or_path:r})}catch(s){if(n==="slim")throw s}return await t.default({module_or_path:e}),t}var Pe={full:Nn(e=>Dn(e,"full")),slim:Nn(e=>Dn(e,"slim"))};function Qn(e,n){return Pe[n](e)}function Yn(e,n){return Xn.create(e,n)}var Xn=class{url="";glueFlavor="full";inner=null;static create(e,n){let t=new Je;return t.url=e,t.glueFlavor=n??Ve(typeof e=="string"?e:e.href),t.inner=_n.from(()=>Qn(typeof t.url=="string"?t.url:t.url.href,t.glueFlavor)),t}async getDefaultLintConfigAsJSON(){return(await this.inner).get_default_lint_config_as_json()}async getDefaultLintConfig(){return(await this.inner).get_default_lint_config()}async toTitleCase(e){return(await this.inner).to_title_case(e)}async setup(){(await this.inner).setup()}},Je=class extends Xn{async createLinter(e){return(await this.getBinaryModule()).Linter.new(e??An.American)}async getBinaryModule(){return await _n.from(()=>Qn(typeof this.url=="string"?this.url:this.url.href,this.glueFlavor))}};function Ge(e){switch(e){case"plaintext":return N.Plain;case"typst":return N.Typst;case"markdown":case void 0:return N.Markdown;default:return console.warn(`Unknown Harper language '${String(e)}'; using markdown.`),N.Markdown}}function Zn(e,n){return[e,Ge(n?.language),n?.forceAllHeadings??!1,n?.regex_mask,n?.dedup??!0,n?.isolateEnglish??!1]}var qe=class{binary;inner;disposed=!1;constructor(e){this.binary=e.binary,this.binary.setup(),this.inner=this.createInner(e.dialect)}createInner(e){return _n.from(async()=>(await this.binary.setup(),this.binary.createLinter(e)))}async setup(){await this.lint("",{language:"plaintext"});let e=await this.exportIgnoredLints();await this.importIgnoredLints(e)}async lint(e,n){return(await this.inner).lint(...Zn(e,n))}async organizedLints(e,n){let t=(await this.inner).organized_lints(...Zn(e,n)),r={};for(let s of t)r[s.group]=s.lints,s.free();return r}async applySuggestion(e,n,t){return(await this.inner).apply_suggestion(e,n,t)}async isLikelyEnglish(e){return(await this.inner).is_likely_english(e)}async isolateEnglish(e){return(await this.inner).isolate_english(e)}async getLintConfig(){return(await this.inner).get_lint_config_as_object()}async getDefaultLintConfigAsJSON(){return await this.binary.getDefaultLintConfigAsJSON()}async getDefaultLintConfig(){return await this.binary.getDefaultLintConfig()}async getStructuredLintConfig(){return(await this.inner).get_structured_lint_config_as_object()}async getStructuredLintConfigJSON(){return(await this.inner).get_structured_lint_config_as_json()}async setLintConfig(e){(await this.inner).set_lint_config_from_object(e)}async getLintConfigAsJSON(){return(await this.inner).get_lint_config_as_json()}async setLintConfigWithJSON(e){(await this.inner).set_lint_config_from_json(e)}async toTitleCase(e){return await this.binary.toTitleCase(e)}async getLintDescriptions(){return(await this.inner).get_lint_descriptions_as_object()}async getLintDescriptionsAsJSON(){return(await this.inner).get_lint_descriptions_as_json()}async getLintDescriptionsHTML(){return(await this.inner).get_lint_descriptions_html_as_object()}async getLintDescriptionsHTMLAsJSON(){return(await this.inner).get_lint_descriptions_html_as_json()}async ignoreLint(e,n){return await this.ignoreLints(e,[n])}async ignoreLints(e,n){(await this.inner).ignore_lints(e,n)}async ignoreLintHash(e){(await this.inner).ignore_hashes(new BigUint64Array([e]))}async exportIgnoredLints(){return(await this.inner).export_ignored_lints()}async importIgnoredLints(e){(await this.inner).import_ignored_lints(e)}async contextHash(e,n){return(await this.inner).context_hash(e,n)}async clearIgnoredLints(){(await this.inner).clear_ignored_lints()}async clearWords(){return(await this.inner).clear_words()}async importWords(e){return(await this.inner).import_words(e)}async exportWords(){return(await this.inner).export_words()}async getDialect(){return(await this.inner).get_dialect()}async setDialect(e){let n=await this.inner;return n.get_dialect()!==e&&(n.free(),this.inner=this.createInner(e)),Promise.resolve()}async summarizeStats(e,n){return(await this.inner).summarize_stats(e,n)}async generateStatsFile(){return(await this.inner).generate_stats_file()}async importStatsFile(e){return(await this.inner).import_stats_file(e)}async loadWeirpackFromBlob(e){let n=new Uint8Array(await e.arrayBuffer());return this.loadWeirpackFromBytes(n)}async loadWeirpackFromBytes(e){let n=await this.inner,t=e instanceof Uint8Array?e:Uint8Array.from(e);return n.import_weirpack(t)}async dispose(){this.disposed||(this.disposed=!0,(await this.inner).free())}};var He=`// \\0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// ../../harper-wasm/pkg/harper_wasm_slim.js
var harper_wasm_slim_exports = /* @__PURE__ */ __exportAll({
	Dialect: () => Dialect$1,
	Language: () => Language$1,
	Lint: () => Lint$1,
	Linter: () => Linter$1,
	OrganizedGroup: () => OrganizedGroup$1,
	Span: () => Span$1,
	Suggestion: () => Suggestion$1,
	SuggestionKind: () => SuggestionKind$1,
	default: () => __wbg_init$1,
	get_default_lint_config: () => get_default_lint_config$1,
	get_default_lint_config_as_json: () => get_default_lint_config_as_json$1,
	initSync: () => initSync$1,
	setup: () => setup$1,
	to_title_case: () => to_title_case$1
});
/**
* Specifies an English Dialect, often used for linting.
* @enum {0 | 1 | 2 | 3 | 4}
*/
const Dialect$1 = Object.freeze({
	American: 0,
	"0": "American",
	British: 1,
	"1": "British",
	Australian: 2,
	"2": "Australian",
	Canadian: 3,
	"3": "Canadian",
	Indian: 4,
	"4": "Indian"
});
/**
* @enum {0 | 1 | 2}
*/
const Language$1 = Object.freeze({
	Plain: 0,
	"0": "Plain",
	Markdown: 1,
	"1": "Markdown",
	Typst: 2,
	"2": "Typst"
});
/**
* An error found in provided text.
*
* May include zero or more suggestions that may fix the problematic text.
*/
var Lint$1 = class Lint$1 {
	static __wrap(ptr) {
		const obj = Object.create(Lint$1.prototype);
		obj.__wbg_ptr = ptr;
		LintFinalization$1.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	static __unwrap(jsValue) {
		if (!(jsValue instanceof Lint$1)) return 0;
		return jsValue.__destroy_into_raw();
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		LintFinalization$1.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm$1.__wbg_lint_free(ptr, 0);
	}
	/**
	* @param {string} json
	* @returns {Lint}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.lint_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
		return Lint$1.__wrap(ret[0]);
	}
	/**
	* Get the content of the source material pointed to by [\`Self::span\`]
	* @returns {string}
	*/
	get_problem_text() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_get_problem_text(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a string representing the general category of the lint.
	* @returns {string}
	*/
	lint_kind() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_lint_kind(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a string representing the general category of the lint.
	* @returns {string}
	*/
	lint_kind_pretty() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_lint_kind_pretty(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a description of the error.
	* @returns {string}
	*/
	message() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_message(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a description of the error as HTML.
	* @returns {string}
	*/
	message_html() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_message_html(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get the location of the problematic text.
	* @returns {Span}
	*/
	span() {
		const ret = wasm$1.lint_span(this.__wbg_ptr);
		return Span$1.__wrap(ret);
	}
	/**
	* Equivalent to calling \`.length\` on the result of \`suggestions()\`.
	* @returns {number}
	*/
	suggestion_count() {
		return wasm$1.lint_suggestion_count(this.__wbg_ptr) >>> 0;
	}
	/**
	* Get an array of any suggestions that may resolve the issue.
	* @returns {Suggestion[]}
	*/
	suggestions() {
		const ret = wasm$1.lint_suggestions(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
		wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.lint_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Lint$1.prototype[Symbol.dispose] = Lint$1.prototype.free;
var Linter$1 = class Linter$1 {
	static __wrap(ptr) {
		const obj = Object.create(Linter$1.prototype);
		obj.__wbg_ptr = ptr;
		LinterFinalization$1.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		LinterFinalization$1.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm$1.__wbg_linter_free(ptr, 0);
	}
	/**
	* Apply a suggestion from a given lint.
	* This action will be logged to the Linter's statistics.
	* @param {string} source_text
	* @param {Lint} lint
	* @param {Suggestion} suggestion
	* @returns {string}
	*/
	apply_suggestion(source_text, lint, suggestion) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			_assertClass$1(lint, Lint$1);
			_assertClass$1(suggestion, Suggestion$1);
			const ret = wasm$1.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0$1(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0$1(ptr2, len2);
		} finally {
			wasm$1.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	clear_ignored_lints() {
		wasm$1.linter_clear_ignored_lints(this.__wbg_ptr);
	}
	/**
	* Clear the user dictionary.
	*/
	clear_words() {
		wasm$1.linter_clear_words(this.__wbg_ptr);
	}
	/**
	* Compute the context hash of a given lint.
	* @param {string} source_text
	* @param {Lint} lint
	* @returns {bigint}
	*/
	context_hash(source_text, lint) {
		const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		_assertClass$1(lint, Lint$1);
		const ret = wasm$1.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);
		return BigInt.asUintN(64, ret);
	}
	/**
	* Export the linter's ignored lints as a privacy-respecting JSON list of hashes.
	* @returns {string}
	*/
	export_ignored_lints() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_export_ignored_lints(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Export words from the dictionary.
	* Note: this will only return words previously added by [\`Self::import_words\`].
	* @returns {string[]}
	*/
	export_words() {
		const ret = wasm$1.linter_export_words(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
		wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @returns {string}
	*/
	generate_stats_file() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_generate_stats_file(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get the dialect this struct was constructed for.
	* @returns {Dialect}
	*/
	get_dialect() {
		return wasm$1.linter_get_dialect(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	get_lint_config_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_get_lint_config_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {any}
	*/
	get_lint_config_as_object() {
		return wasm$1.linter_get_lint_config_as_object(this.__wbg_ptr);
	}
	/**
	* Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.
	* @returns {string}
	*/
	get_lint_descriptions_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_get_lint_descriptions_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a Record containing the descriptions of all the linting rules, formatted as Markdown.
	* @returns {any}
	*/
	get_lint_descriptions_as_object() {
		return wasm$1.linter_get_lint_descriptions_as_object(this.__wbg_ptr);
	}
	/**
	* Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.
	* @returns {string}
	*/
	get_lint_descriptions_html_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a Record containing the descriptions of all the linting rules, formatted as HTML.
	* @returns {any}
	*/
	get_lint_descriptions_html_as_object() {
		return wasm$1.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	get_structured_lint_config_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.linter_get_structured_lint_config_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {any}
	*/
	get_structured_lint_config_as_object() {
		return wasm$1.linter_get_structured_lint_config_as_object(this.__wbg_ptr);
	}
	/**
	* Add a specific context hash to the ignored lints list.
	* @param {BigUint64Array} hashes
	*/
	ignore_hashes(hashes) {
		const ptr0 = passArray64ToWasm0$1(hashes, wasm$1.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN$1;
		wasm$1.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* @param {string} source_text
	* @param {Lint[]} lints
	*/
	ignore_lints(source_text, lints) {
		const ptr0 = passStringToWasm0$1(source_text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ptr1 = passArrayJsValueToWasm0$1(lints, wasm$1.__wbindgen_malloc);
		const len1 = WASM_VECTOR_LEN$1;
		wasm$1.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);
	}
	/**
	* Import into the linter's ignored lints from a privacy-respecting JSON list of hashes.
	* @param {string} json
	*/
	import_ignored_lints(json) {
		const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
	}
	/**
	* @param {string} file
	*/
	import_stats_file(file) {
		const ptr0 = passStringToWasm0$1(file, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
	}
	/**
	* Load a Weirpack from raw bytes, merging its rules into the current linter.
	* Returns test failures if any are found, and does not import in that case.
	* @param {Uint8Array} bytes
	* @returns {any}
	*/
	import_weirpack(bytes) {
		const ptr0 = passArray8ToWasm0$1(bytes, wasm$1.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
		return takeFromExternrefTable0$1(ret[0]);
	}
	/**
	* Import words into the dictionary.
	* @param {string[]} additional_words
	*/
	import_words(additional_words) {
		const ptr0 = passArrayJsValueToWasm0$1(additional_words, wasm$1.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN$1;
		wasm$1.linter_import_words(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* Helper method to quickly check if a plain string is likely intended to be English
	* @param {string} text
	* @returns {boolean}
	*/
	is_likely_english(text) {
		const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		return wasm$1.linter_is_likely_english(this.__wbg_ptr, ptr0, len0) !== 0;
	}
	/**
	* Helper method to remove non-English text from a plain English document.
	* @param {string} text
	* @returns {string}
	*/
	isolate_english(text) {
		let deferred2_0;
		let deferred2_1;
		try {
			const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ret = wasm$1.linter_isolate_english(this.__wbg_ptr, ptr0, len0);
			deferred2_0 = ret[0];
			deferred2_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
		}
	}
	/**
	* Perform the configured linting on the provided text.
	*
	* If the provided regex mask cannot be parsed, this method will return an empty array.
	* @param {string} text
	* @param {Language} language
	* @param {boolean} all_headings
	* @param {string | null | undefined} regex_mask
	* @param {boolean} dedup
	* @param {boolean} isolate_english
	* @returns {Lint[]}
	*/
	lint(text, language, all_headings, regex_mask, dedup, isolate_english) {
		const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		var len1 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
		var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
		wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v3;
	}
	/**
	* Construct a new \`Linter\`.
	* Note that this can mean constructing the curated dictionary, which is the most expensive operation
	* in Harper.
	* @param {Dialect} dialect
	* @returns {Linter}
	*/
	static new(dialect) {
		const ret = wasm$1.linter_new(dialect);
		return Linter$1.__wrap(ret);
	}
	/**
	* @param {string} text
	* @param {Language} language
	* @param {boolean} all_headings
	* @param {string | null | undefined} regex_mask
	* @param {boolean} dedup
	* @param {boolean} isolate_english
	* @returns {OrganizedGroup[]}
	*/
	organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {
		const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		var ptr1 = isLikeNone$1(regex_mask) ? 0 : passStringToWasm0$1(regex_mask, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		var len1 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
		var v3 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
		wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v3;
	}
	/**
	* @param {string} json
	*/
	set_lint_config_from_json(json) {
		const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
	}
	/**
	* @param {any} object
	*/
	set_lint_config_from_object(object) {
		const ret = wasm$1.linter_set_lint_config_from_object(this.__wbg_ptr, object);
		if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
	}
	/**
	* @param {bigint | null} [start_time]
	* @param {bigint | null} [end_time]
	* @returns {any}
	*/
	summarize_stats(start_time, end_time) {
		return wasm$1.linter_summarize_stats(this.__wbg_ptr, !isLikeNone$1(start_time), isLikeNone$1(start_time) ? BigInt(0) : start_time, !isLikeNone$1(end_time), isLikeNone$1(end_time) ? BigInt(0) : end_time);
	}
};
if (Symbol.dispose) Linter$1.prototype[Symbol.dispose] = Linter$1.prototype.free;
/**
* Used exclusively for [\`Linter::organized_lints\`]
*/
var OrganizedGroup$1 = class OrganizedGroup$1 {
	static __wrap(ptr) {
		const obj = Object.create(OrganizedGroup$1.prototype);
		obj.__wbg_ptr = ptr;
		OrganizedGroupFinalization$1.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		OrganizedGroupFinalization$1.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm$1.__wbg_organizedgroup_free(ptr, 0);
	}
	/**
	* @returns {string}
	*/
	get group() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.__wbg_get_organizedgroup_group(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {Lint[]}
	*/
	get lints() {
		const ret = wasm$1.__wbg_get_organizedgroup_lints(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0$1(ret[0], ret[1]);
		wasm$1.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @param {string} arg0
	*/
	set group(arg0) {
		const ptr0 = passStringToWasm0$1(arg0, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		wasm$1.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* @param {Lint[]} arg0
	*/
	set lints(arg0) {
		const ptr0 = passArrayJsValueToWasm0$1(arg0, wasm$1.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN$1;
		wasm$1.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);
	}
};
if (Symbol.dispose) OrganizedGroup$1.prototype[Symbol.dispose] = OrganizedGroup$1.prototype.free;
/**
* A struct that represents two character indices in a string: a start and an end.
*/
var Span$1 = class Span$1 {
	static __wrap(ptr) {
		const obj = Object.create(Span$1.prototype);
		obj.__wbg_ptr = ptr;
		SpanFinalization$1.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		SpanFinalization$1.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm$1.__wbg_span_free(ptr, 0);
	}
	/**
	* @returns {number}
	*/
	get end() {
		return wasm$1.__wbg_get_span_end(this.__wbg_ptr) >>> 0;
	}
	/**
	* @returns {number}
	*/
	get start() {
		return wasm$1.__wbg_get_span_start(this.__wbg_ptr) >>> 0;
	}
	/**
	* @param {number} arg0
	*/
	set end(arg0) {
		wasm$1.__wbg_set_span_end(this.__wbg_ptr, arg0);
	}
	/**
	* @param {number} arg0
	*/
	set start(arg0) {
		wasm$1.__wbg_set_span_start(this.__wbg_ptr, arg0);
	}
	/**
	* @param {string} json
	* @returns {Span}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.span_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
		return Span$1.__wrap(ret[0]);
	}
	/**
	* @returns {boolean}
	*/
	is_empty() {
		return wasm$1.span_is_empty(this.__wbg_ptr) !== 0;
	}
	/**
	* @returns {number}
	*/
	len() {
		return wasm$1.span_len(this.__wbg_ptr) >>> 0;
	}
	/**
	* @param {number} start
	* @param {number} end
	* @returns {Span}
	*/
	static new(start, end) {
		const ret = wasm$1.span_new(start, end);
		return Span$1.__wrap(ret);
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.span_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Span$1.prototype[Symbol.dispose] = Span$1.prototype.free;
/**
* A suggestion to fix a Lint.
*/
var Suggestion$1 = class Suggestion$1 {
	static __wrap(ptr) {
		const obj = Object.create(Suggestion$1.prototype);
		obj.__wbg_ptr = ptr;
		SuggestionFinalization$1.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		SuggestionFinalization$1.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm$1.__wbg_suggestion_free(ptr, 0);
	}
	/**
	* @param {string} json
	* @returns {Suggestion}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0$1(json, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.suggestion_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
		return Suggestion$1.__wrap(ret[0]);
	}
	/**
	* Get the text that is going to replace the problematic section.
	* If [\`Self::kind\`] is \`SuggestionKind::Remove\`, this will return an empty
	* string.
	* @returns {string}
	*/
	get_replacement_text() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.suggestion_get_replacement_text(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {SuggestionKind}
	*/
	kind() {
		return wasm$1.suggestion_kind(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm$1.suggestion_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0$1(ret[0], ret[1]);
		} finally {
			wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Suggestion$1.prototype[Symbol.dispose] = Suggestion$1.prototype.free;
/**
* Tags the variant of suggestion.
* @enum {0 | 1 | 2}
*/
const SuggestionKind$1 = Object.freeze({
	/**
	* Replace the problematic text.
	*/
	Replace: 0,
	"0": "Replace",
	/**
	* Remove the problematic text.
	*/
	Remove: 1,
	"1": "Remove",
	/**
	* Insert additional text after the error.
	*/
	InsertAfter: 2,
	"2": "InsertAfter"
});
/**
* @returns {any}
*/
function get_default_lint_config$1() {
	return wasm$1.get_default_lint_config();
}
/**
* @returns {string}
*/
function get_default_lint_config_as_json$1() {
	let deferred1_0;
	let deferred1_1;
	try {
		const ret = wasm$1.get_default_lint_config_as_json();
		deferred1_0 = ret[0];
		deferred1_1 = ret[1];
		return getStringFromWasm0$1(ret[0], ret[1]);
	} finally {
		wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
	}
}
/**
* Set up the WebAssembly module's logging.
*/
function setup$1() {
	wasm$1.setup();
}
/**
* @param {string} text
* @returns {string}
*/
function to_title_case$1(text) {
	let deferred2_0;
	let deferred2_1;
	try {
		const ptr0 = passStringToWasm0$1(text, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN$1;
		const ret = wasm$1.to_title_case(ptr0, len0);
		deferred2_0 = ret[0];
		deferred2_1 = ret[1];
		return getStringFromWasm0$1(ret[0], ret[1]);
	} finally {
		wasm$1.__wbindgen_free(deferred2_0, deferred2_1, 1);
	}
}
function __wbg_get_imports$1() {
	return {
		__proto__: null,
		"./harper_wasm_slim_bg.js": {
			__proto__: null,
			__wbg_Error_30c8987f7c2ed4e2: function(arg0, arg1) {
				return Error(getStringFromWasm0$1(arg0, arg1));
			},
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$1(String(arg1), wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_boolean_get_5b446f51afd21013: function(arg0) {
				const v = arg0;
				const ret = typeof v === "boolean" ? v : void 0;
				return isLikeNone$1(ret) ? 16777215 : ret ? 1 : 0;
			},
			__wbg___wbindgen_debug_string_4687d8d8c2017d52: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$1(debugString$1(arg1), wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_is_function_1f9d30630b8b1d3d: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_object_3c45d4f2dde4e749: function(arg0) {
				const val = arg0;
				return typeof val === "object" && val !== null;
			},
			__wbg___wbindgen_is_string_90b56bc79aad6f6c: function(arg0) {
				return typeof arg0 === "string";
			},
			__wbg___wbindgen_jsval_loose_eq_677f21e468d6b461: function(arg0, arg1) {
				return arg0 == arg1;
			},
			__wbg___wbindgen_number_get_2e0e7dee9f701a71: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "number" ? obj : void 0;
				getDataViewMemory0$1().setFloat64(arg0 + 8, isLikeNone$1(ret) ? 0 : ret, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, !isLikeNone$1(ret), true);
			},
			__wbg___wbindgen_string_get_0380ccaa2f57f0d9: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "string" ? obj : void 0;
				var ptr1 = isLikeNone$1(ret) ? 0 : passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				var len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
				throw new Error(getStringFromWasm0$1(arg0, arg1));
			},
			__wbg_call_6137034ef55c9d0f: function() {
				return handleError$1(function(arg0, arg1) {
					return arg0.call(arg1);
				}, arguments);
			},
			__wbg_done_b41a1d26cdb37fb6: function(arg0) {
				return arg0.done;
			},
			__wbg_entries_fb6397112b1de25f: function(arg0) {
				return Object.entries(arg0);
			},
			__wbg_error_757e9472f8410341: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0$1(arg0, arg1));
				} finally {
					wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_getRandomValues_973dabfb0ad1769f: function() {
				return handleError$1(function(arg0, arg1) {
					globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
				}, arguments);
			},
			__wbg_getRandomValues_a608c4436c19407a: function() {
				return handleError$1(function(arg0, arg1) {
					globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
				}, arguments);
			},
			__wbg_getTime_f5a55efff2585d5d: function(arg0) {
				return arg0.getTime();
			},
			__wbg_get_658f6698067d9515: function() {
				return handleError$1(function(arg0, arg1) {
					return Reflect.get(arg0, arg1);
				}, arguments);
			},
			__wbg_get_6c896e0571ddae51: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_unchecked_288889d017702237: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_instanceof_ArrayBuffer_a99f175873e5d9b8: function(arg0) {
				let result;
				try {
					result = arg0 instanceof ArrayBuffer;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Uint8Array_828cef2aaacafc31: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Uint8Array;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_iterator_e3c31c892080e444: function() {
				return Symbol.iterator;
			},
			__wbg_length_7f3c00c40364105e: function(arg0) {
				return arg0.length;
			},
			__wbg_length_d4bdea10311bd9cf: function(arg0) {
				return arg0.length;
			},
			__wbg_lint_new: function(arg0) {
				return Lint$1.__wrap(arg0);
			},
			__wbg_lint_unwrap: function(arg0) {
				return Lint$1.__unwrap(arg0);
			},
			__wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.log(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3), getStringFromWasm0$1(arg4, arg5), getStringFromWasm0$1(arg6, arg7));
				} finally {
					wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_log_a54ca6b45e09078a: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.log(getStringFromWasm0$1(arg0, arg1));
				} finally {
					wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {
				performance.mark(getStringFromWasm0$1(arg0, arg1));
			},
			__wbg_measure_0e21b33a1c6e3a29: function() {
				return handleError$1(function(arg0, arg1, arg2, arg3) {
					let deferred0_0;
					let deferred0_1;
					let deferred1_0;
					let deferred1_1;
					try {
						deferred0_0 = arg0;
						deferred0_1 = arg1;
						deferred1_0 = arg2;
						deferred1_1 = arg3;
						performance.measure(getStringFromWasm0$1(arg0, arg1), getStringFromWasm0$1(arg2, arg3));
					} finally {
						wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
						wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
					}
				}, arguments);
			},
			__wbg_new_0_72d020f0c63443d4: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_1dbf7428bba60a42: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_28744009d011f847: function() {
				return /* @__PURE__ */ new Map();
			},
			__wbg_new_617a8cdb8bb1130e: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_ee2291f50781bf1d: function() {
				return new Array();
			},
			__wbg_next_33784799010f1bbe: function(arg0) {
				return arg0.next;
			},
			__wbg_next_f4aac29c42af995c: function() {
				return handleError$1(function(arg0) {
					return arg0.next();
				}, arguments);
			},
			__wbg_organizedgroup_new: function(arg0) {
				return OrganizedGroup$1.__wrap(arg0);
			},
			__wbg_prototypesetcall_bc27214492979395: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0$1(arg0, arg1), arg2);
			},
			__wbg_set_6ae97e73113c4f0b: function(arg0, arg1, arg2) {
				return arg0.set(arg1, arg2);
			},
			__wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
				arg0[arg1] = arg2;
			},
			__wbg_set_bea140a88be9b277: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_suggestion_new: function(arg0) {
				return Suggestion$1.__wrap(arg0);
			},
			__wbg_value_f3c585ee8f5ba40c: function(arg0) {
				return arg0.value;
			},
			__wbindgen_generic_0000000000000001: function(arg0) {
				return arg0;
			},
			__wbindgen_generic_0000000000000002: function(arg0, arg1) {
				return getStringFromWasm0$1(arg0, arg1);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm$1.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			}
		}
	};
}
const LintFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_lint_free(ptr, 1));
const LinterFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_linter_free(ptr, 1));
const OrganizedGroupFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_organizedgroup_free(ptr, 1));
const SpanFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_span_free(ptr, 1));
const SuggestionFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm$1.__wbg_suggestion_free(ptr, 1));
function addToExternrefTable0$1(obj) {
	const idx = wasm$1.__externref_table_alloc();
	wasm$1.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function _assertClass$1(instance, klass) {
	if (!(instance instanceof klass)) throw new Error(\`expected instance of \${klass.name}\`);
}
function debugString$1(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString$1(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString$1(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayJsValueFromWasm0$1(ptr, len) {
	ptr = ptr >>> 0;
	const mem = getDataViewMemory0$1();
	const result = [];
	for (let i = ptr; i < ptr + 4 * len; i += 4) result.push(wasm$1.__wbindgen_externrefs.get(mem.getUint32(i, true)));
	wasm$1.__externref_drop_slice(ptr, len);
	return result;
}
function getArrayU8FromWasm0$1(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0$1().subarray(ptr / 1, ptr / 1 + len);
}
let cachedBigUint64ArrayMemory0$1 = null;
function getBigUint64ArrayMemory0$1() {
	if (cachedBigUint64ArrayMemory0$1 === null || cachedBigUint64ArrayMemory0$1.byteLength === 0) cachedBigUint64ArrayMemory0$1 = new BigUint64Array(wasm$1.memory.buffer);
	return cachedBigUint64ArrayMemory0$1;
}
let cachedDataViewMemory0$1 = null;
function getDataViewMemory0$1() {
	if (cachedDataViewMemory0$1 === null || cachedDataViewMemory0$1.buffer.detached === true || cachedDataViewMemory0$1.buffer.detached === void 0 && cachedDataViewMemory0$1.buffer !== wasm$1.memory.buffer) cachedDataViewMemory0$1 = new DataView(wasm$1.memory.buffer);
	return cachedDataViewMemory0$1;
}
function getStringFromWasm0$1(ptr, len) {
	return decodeText$1(ptr >>> 0, len);
}
let cachedUint8ArrayMemory0$1 = null;
function getUint8ArrayMemory0$1() {
	if (cachedUint8ArrayMemory0$1 === null || cachedUint8ArrayMemory0$1.byteLength === 0) cachedUint8ArrayMemory0$1 = new Uint8Array(wasm$1.memory.buffer);
	return cachedUint8ArrayMemory0$1;
}
function handleError$1(f, args) {
	try {
		return f.apply(this, args);
	} catch (e) {
		const idx = addToExternrefTable0$1(e);
		wasm$1.__wbindgen_exn_store(idx);
	}
}
function isLikeNone$1(x) {
	return x === void 0 || x === null;
}
function passArray64ToWasm0$1(arg, malloc) {
	const ptr = malloc(arg.length * 8, 8) >>> 0;
	getBigUint64ArrayMemory0$1().set(arg, ptr / 8);
	WASM_VECTOR_LEN$1 = arg.length;
	return ptr;
}
function passArray8ToWasm0$1(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0$1().set(arg, ptr / 1);
	WASM_VECTOR_LEN$1 = arg.length;
	return ptr;
}
function passArrayJsValueToWasm0$1(array, malloc) {
	const ptr = malloc(array.length * 4, 4) >>> 0;
	for (let i = 0; i < array.length; i++) {
		const add = addToExternrefTable0$1(array[i]);
		getDataViewMemory0$1().setUint32(ptr + 4 * i, add, true);
	}
	WASM_VECTOR_LEN$1 = array.length;
	return ptr;
}
function passStringToWasm0$1(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder$1.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0$1().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN$1 = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0$1();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0$1().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder$1.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN$1 = offset;
	return ptr;
}
function takeFromExternrefTable0$1(idx) {
	const value = wasm$1.__wbindgen_externrefs.get(idx);
	wasm$1.__externref_table_dealloc(idx);
	return value;
}
let cachedTextDecoder$1 = new TextDecoder("utf-8", {
	ignoreBOM: true,
	fatal: true
});
cachedTextDecoder$1.decode();
const MAX_SAFARI_DECODE_BYTES$1 = 2146435072;
let numBytesDecoded$1 = 0;
function decodeText$1(ptr, len) {
	numBytesDecoded$1 += len;
	if (numBytesDecoded$1 >= MAX_SAFARI_DECODE_BYTES$1) {
		cachedTextDecoder$1 = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder$1.decode();
		numBytesDecoded$1 = len;
	}
	return cachedTextDecoder$1.decode(getUint8ArrayMemory0$1().subarray(ptr, ptr + len));
}
const cachedTextEncoder$1 = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder$1)) cachedTextEncoder$1.encodeInto = function(arg, view) {
	const buf = cachedTextEncoder$1.encode(arg);
	view.set(buf);
	return {
		read: arg.length,
		written: buf.length
	};
};
let WASM_VECTOR_LEN$1 = 0;
let wasm$1;
function __wbg_finalize_init$1(instance, module) {
	wasm$1 = instance.exports;
	cachedBigUint64ArrayMemory0$1 = null;
	cachedDataViewMemory0$1 = null;
	cachedUint8ArrayMemory0$1 = null;
	wasm$1.__wbindgen_start();
	return wasm$1;
}
async function __wbg_load$1(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (!module.ok) throw new Error(\`failed to fetch Wasm: \${module.status} \${module.statusText} fetching '\${module.url}'\`);
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
function initSync$1(module) {
	if (wasm$1 !== void 0) return wasm$1;
	if (module !== void 0) {
		if (Object.getPrototypeOf(module) === Object.prototype) ({module} = module);
		else console.warn("using deprecated parameters for \`initSync()\`; pass a single object instead");
	}
	const imports = __wbg_get_imports$1();
	if (!(module instanceof WebAssembly.Module)) module = new WebAssembly.Module(module);
	return __wbg_finalize_init$1(new WebAssembly.Instance(module, imports), module);
}
async function __wbg_init$1(module_or_path) {
	if (wasm$1 !== void 0) return wasm$1;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) module_or_path = new URL();
	const imports = __wbg_get_imports$1();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load$1(await module_or_path, imports);
	return __wbg_finalize_init$1(instance, module);
}
// ../../harper-wasm/pkg/harper_wasm.js
var harper_wasm_exports = /* @__PURE__ */ __exportAll({
	Dialect: () => Dialect,
	Language: () => Language,
	Lint: () => Lint,
	Linter: () => Linter,
	OrganizedGroup: () => OrganizedGroup,
	Span: () => Span,
	Suggestion: () => Suggestion,
	SuggestionKind: () => SuggestionKind,
	default: () => __wbg_init,
	get_default_lint_config: () => get_default_lint_config,
	get_default_lint_config_as_json: () => get_default_lint_config_as_json,
	initSync: () => initSync,
	setup: () => setup,
	to_title_case: () => to_title_case
});
/**
* Specifies an English Dialect, often used for linting.
* @enum {0 | 1 | 2 | 3 | 4}
*/
const Dialect = Object.freeze({
	American: 0,
	"0": "American",
	British: 1,
	"1": "British",
	Australian: 2,
	"2": "Australian",
	Canadian: 3,
	"3": "Canadian",
	Indian: 4,
	"4": "Indian"
});
/**
* @enum {0 | 1 | 2}
*/
const Language = Object.freeze({
	Plain: 0,
	"0": "Plain",
	Markdown: 1,
	"1": "Markdown",
	Typst: 2,
	"2": "Typst"
});
/**
* An error found in provided text.
*
* May include zero or more suggestions that may fix the problematic text.
*/
var Lint = class Lint {
	static __wrap(ptr) {
		const obj = Object.create(Lint.prototype);
		obj.__wbg_ptr = ptr;
		LintFinalization.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	static __unwrap(jsValue) {
		if (!(jsValue instanceof Lint)) return 0;
		return jsValue.__destroy_into_raw();
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		LintFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_lint_free(ptr, 0);
	}
	/**
	* @param {string} json
	* @returns {Lint}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.lint_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return Lint.__wrap(ret[0]);
	}
	/**
	* Get the content of the source material pointed to by [\`Self::span\`]
	* @returns {string}
	*/
	get_problem_text() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_get_problem_text(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a string representing the general category of the lint.
	* @returns {string}
	*/
	lint_kind() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_lint_kind(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a string representing the general category of the lint.
	* @returns {string}
	*/
	lint_kind_pretty() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_lint_kind_pretty(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a description of the error.
	* @returns {string}
	*/
	message() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_message(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a description of the error as HTML.
	* @returns {string}
	*/
	message_html() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_message_html(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get the location of the problematic text.
	* @returns {Span}
	*/
	span() {
		const ret = wasm.lint_span(this.__wbg_ptr);
		return Span.__wrap(ret);
	}
	/**
	* Equivalent to calling \`.length\` on the result of \`suggestions()\`.
	* @returns {number}
	*/
	suggestion_count() {
		return wasm.lint_suggestion_count(this.__wbg_ptr) >>> 0;
	}
	/**
	* Get an array of any suggestions that may resolve the issue.
	* @returns {Suggestion[]}
	*/
	suggestions() {
		const ret = wasm.lint_suggestions(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
		wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.lint_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Lint.prototype[Symbol.dispose] = Lint.prototype.free;
var Linter = class Linter {
	static __wrap(ptr) {
		const obj = Object.create(Linter.prototype);
		obj.__wbg_ptr = ptr;
		LinterFinalization.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		LinterFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_linter_free(ptr, 0);
	}
	/**
	* Apply a suggestion from a given lint.
	* This action will be logged to the Linter's statistics.
	* @param {string} source_text
	* @param {Lint} lint
	* @param {Suggestion} suggestion
	* @returns {string}
	*/
	apply_suggestion(source_text, lint, suggestion) {
		let deferred3_0;
		let deferred3_1;
		try {
			const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			_assertClass(lint, Lint);
			_assertClass(suggestion, Suggestion);
			const ret = wasm.linter_apply_suggestion(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr, suggestion.__wbg_ptr);
			var ptr2 = ret[0];
			var len2 = ret[1];
			if (ret[3]) {
				ptr2 = 0;
				len2 = 0;
				throw takeFromExternrefTable0(ret[2]);
			}
			deferred3_0 = ptr2;
			deferred3_1 = len2;
			return getStringFromWasm0(ptr2, len2);
		} finally {
			wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
		}
	}
	clear_ignored_lints() {
		wasm.linter_clear_ignored_lints(this.__wbg_ptr);
	}
	/**
	* Clear the user dictionary.
	*/
	clear_words() {
		wasm.linter_clear_words(this.__wbg_ptr);
	}
	/**
	* Compute the context hash of a given lint.
	* @param {string} source_text
	* @param {Lint} lint
	* @returns {bigint}
	*/
	context_hash(source_text, lint) {
		const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		_assertClass(lint, Lint);
		const ret = wasm.linter_context_hash(this.__wbg_ptr, ptr0, len0, lint.__wbg_ptr);
		return BigInt.asUintN(64, ret);
	}
	/**
	* Export the linter's ignored lints as a privacy-respecting JSON list of hashes.
	* @returns {string}
	*/
	export_ignored_lints() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_export_ignored_lints(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Export words from the dictionary.
	* Note: this will only return words previously added by [\`Self::import_words\`].
	* @returns {string[]}
	*/
	export_words() {
		const ret = wasm.linter_export_words(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
		wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @returns {string}
	*/
	generate_stats_file() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_generate_stats_file(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get the dialect this struct was constructed for.
	* @returns {Dialect}
	*/
	get_dialect() {
		return wasm.linter_get_dialect(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	get_lint_config_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_get_lint_config_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {any}
	*/
	get_lint_config_as_object() {
		return wasm.linter_get_lint_config_as_object(this.__wbg_ptr);
	}
	/**
	* Get a JSON map containing the descriptions of all the linting rules, formatted as Markdown.
	* @returns {string}
	*/
	get_lint_descriptions_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_get_lint_descriptions_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a Record containing the descriptions of all the linting rules, formatted as Markdown.
	* @returns {any}
	*/
	get_lint_descriptions_as_object() {
		return wasm.linter_get_lint_descriptions_as_object(this.__wbg_ptr);
	}
	/**
	* Get a JSON map containing the descriptions of all the linting rules, formatted as HTML.
	* @returns {string}
	*/
	get_lint_descriptions_html_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_get_lint_descriptions_html_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* Get a Record containing the descriptions of all the linting rules, formatted as HTML.
	* @returns {any}
	*/
	get_lint_descriptions_html_as_object() {
		return wasm.linter_get_lint_descriptions_html_as_object(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	get_structured_lint_config_as_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.linter_get_structured_lint_config_as_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {any}
	*/
	get_structured_lint_config_as_object() {
		return wasm.linter_get_structured_lint_config_as_object(this.__wbg_ptr);
	}
	/**
	* Add a specific context hash to the ignored lints list.
	* @param {BigUint64Array} hashes
	*/
	ignore_hashes(hashes) {
		const ptr0 = passArray64ToWasm0(hashes, wasm.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.linter_ignore_hashes(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* @param {string} source_text
	* @param {Lint[]} lints
	*/
	ignore_lints(source_text, lints) {
		const ptr0 = passStringToWasm0(source_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ptr1 = passArrayJsValueToWasm0(lints, wasm.__wbindgen_malloc);
		const len1 = WASM_VECTOR_LEN;
		wasm.linter_ignore_lints(this.__wbg_ptr, ptr0, len0, ptr1, len1);
	}
	/**
	* Import into the linter's ignored lints from a privacy-respecting JSON list of hashes.
	* @param {string} json
	*/
	import_ignored_lints(json) {
		const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.linter_import_ignored_lints(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0(ret[0]);
	}
	/**
	* @param {string} file
	*/
	import_stats_file(file) {
		const ptr0 = passStringToWasm0(file, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.linter_import_stats_file(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0(ret[0]);
	}
	/**
	* Load a Weirpack from raw bytes, merging its rules into the current linter.
	* Returns test failures if any are found, and does not import in that case.
	* @param {Uint8Array} bytes
	* @returns {any}
	*/
	import_weirpack(bytes) {
		const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.linter_import_weirpack(this.__wbg_ptr, ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return takeFromExternrefTable0(ret[0]);
	}
	/**
	* Import words into the dictionary.
	* @param {string[]} additional_words
	*/
	import_words(additional_words) {
		const ptr0 = passArrayJsValueToWasm0(additional_words, wasm.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.linter_import_words(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* Helper method to quickly check if a plain string is likely intended to be English
	* @param {string} text
	* @returns {boolean}
	*/
	is_likely_english(text) {
		const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		return wasm.linter_is_likely_english(this.__wbg_ptr, ptr0, len0) !== 0;
	}
	/**
	* Helper method to remove non-English text from a plain English document.
	* @param {string} text
	* @returns {string}
	*/
	isolate_english(text) {
		let deferred2_0;
		let deferred2_1;
		try {
			const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ret = wasm.linter_isolate_english(this.__wbg_ptr, ptr0, len0);
			deferred2_0 = ret[0];
			deferred2_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
		}
	}
	/**
	* Perform the configured linting on the provided text.
	*
	* If the provided regex mask cannot be parsed, this method will return an empty array.
	* @param {string} text
	* @param {Language} language
	* @param {boolean} all_headings
	* @param {string | null | undefined} regex_mask
	* @param {boolean} dedup
	* @param {boolean} isolate_english
	* @returns {Lint[]}
	*/
	lint(text, language, all_headings, regex_mask, dedup, isolate_english) {
		const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		var len1 = WASM_VECTOR_LEN;
		const ret = wasm.linter_lint(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
		var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);
		wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v3;
	}
	/**
	* Construct a new \`Linter\`.
	* Note that this can mean constructing the curated dictionary, which is the most expensive operation
	* in Harper.
	* @param {Dialect} dialect
	* @returns {Linter}
	*/
	static new(dialect) {
		const ret = wasm.linter_new(dialect);
		return Linter.__wrap(ret);
	}
	/**
	* @param {string} text
	* @param {Language} language
	* @param {boolean} all_headings
	* @param {string | null | undefined} regex_mask
	* @param {boolean} dedup
	* @param {boolean} isolate_english
	* @returns {OrganizedGroup[]}
	*/
	organized_lints(text, language, all_headings, regex_mask, dedup, isolate_english) {
		const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		var ptr1 = isLikeNone(regex_mask) ? 0 : passStringToWasm0(regex_mask, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		var len1 = WASM_VECTOR_LEN;
		const ret = wasm.linter_organized_lints(this.__wbg_ptr, ptr0, len0, language, all_headings, ptr1, len1, dedup, isolate_english);
		var v3 = getArrayJsValueFromWasm0(ret[0], ret[1]);
		wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v3;
	}
	/**
	* @param {string} json
	*/
	set_lint_config_from_json(json) {
		const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.linter_set_lint_config_from_json(this.__wbg_ptr, ptr0, len0);
		if (ret[1]) throw takeFromExternrefTable0(ret[0]);
	}
	/**
	* @param {any} object
	*/
	set_lint_config_from_object(object) {
		const ret = wasm.linter_set_lint_config_from_object(this.__wbg_ptr, object);
		if (ret[1]) throw takeFromExternrefTable0(ret[0]);
	}
	/**
	* @param {bigint | null} [start_time]
	* @param {bigint | null} [end_time]
	* @returns {any}
	*/
	summarize_stats(start_time, end_time) {
		return wasm.linter_summarize_stats(this.__wbg_ptr, !isLikeNone(start_time), isLikeNone(start_time) ? BigInt(0) : start_time, !isLikeNone(end_time), isLikeNone(end_time) ? BigInt(0) : end_time);
	}
};
if (Symbol.dispose) Linter.prototype[Symbol.dispose] = Linter.prototype.free;
/**
* Used exclusively for [\`Linter::organized_lints\`]
*/
var OrganizedGroup = class OrganizedGroup {
	static __wrap(ptr) {
		const obj = Object.create(OrganizedGroup.prototype);
		obj.__wbg_ptr = ptr;
		OrganizedGroupFinalization.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		OrganizedGroupFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_organizedgroup_free(ptr, 0);
	}
	/**
	* @returns {string}
	*/
	get group() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.__wbg_get_organizedgroup_group(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {Lint[]}
	*/
	get lints() {
		const ret = wasm.__wbg_get_organizedgroup_lints(this.__wbg_ptr);
		var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
		wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
		return v1;
	}
	/**
	* @param {string} arg0
	*/
	set group(arg0) {
		const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.__wbg_set_organizedgroup_group(this.__wbg_ptr, ptr0, len0);
	}
	/**
	* @param {Lint[]} arg0
	*/
	set lints(arg0) {
		const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
		const len0 = WASM_VECTOR_LEN;
		wasm.__wbg_set_organizedgroup_lints(this.__wbg_ptr, ptr0, len0);
	}
};
if (Symbol.dispose) OrganizedGroup.prototype[Symbol.dispose] = OrganizedGroup.prototype.free;
/**
* A struct that represents two character indices in a string: a start and an end.
*/
var Span = class Span {
	static __wrap(ptr) {
		const obj = Object.create(Span.prototype);
		obj.__wbg_ptr = ptr;
		SpanFinalization.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		SpanFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_span_free(ptr, 0);
	}
	/**
	* @returns {number}
	*/
	get end() {
		return wasm.__wbg_get_span_end(this.__wbg_ptr) >>> 0;
	}
	/**
	* @returns {number}
	*/
	get start() {
		return wasm.__wbg_get_span_start(this.__wbg_ptr) >>> 0;
	}
	/**
	* @param {number} arg0
	*/
	set end(arg0) {
		wasm.__wbg_set_span_end(this.__wbg_ptr, arg0);
	}
	/**
	* @param {number} arg0
	*/
	set start(arg0) {
		wasm.__wbg_set_span_start(this.__wbg_ptr, arg0);
	}
	/**
	* @param {string} json
	* @returns {Span}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.span_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return Span.__wrap(ret[0]);
	}
	/**
	* @returns {boolean}
	*/
	is_empty() {
		return wasm.span_is_empty(this.__wbg_ptr) !== 0;
	}
	/**
	* @returns {number}
	*/
	len() {
		return wasm.span_len(this.__wbg_ptr) >>> 0;
	}
	/**
	* @param {number} start
	* @param {number} end
	* @returns {Span}
	*/
	static new(start, end) {
		const ret = wasm.span_new(start, end);
		return Span.__wrap(ret);
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.span_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Span.prototype[Symbol.dispose] = Span.prototype.free;
/**
* A suggestion to fix a Lint.
*/
var Suggestion = class Suggestion {
	static __wrap(ptr) {
		const obj = Object.create(Suggestion.prototype);
		obj.__wbg_ptr = ptr;
		SuggestionFinalization.register(obj, obj.__wbg_ptr, obj);
		return obj;
	}
	__destroy_into_raw() {
		const ptr = this.__wbg_ptr;
		this.__wbg_ptr = 0;
		SuggestionFinalization.unregister(this);
		return ptr;
	}
	free() {
		const ptr = this.__destroy_into_raw();
		wasm.__wbg_suggestion_free(ptr, 0);
	}
	/**
	* @param {string} json
	* @returns {Suggestion}
	*/
	static from_json(json) {
		const ptr0 = passStringToWasm0(json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.suggestion_from_json(ptr0, len0);
		if (ret[2]) throw takeFromExternrefTable0(ret[1]);
		return Suggestion.__wrap(ret[0]);
	}
	/**
	* Get the text that is going to replace the problematic section.
	* If [\`Self::kind\`] is \`SuggestionKind::Remove\`, this will return an empty
	* string.
	* @returns {string}
	*/
	get_replacement_text() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.suggestion_get_replacement_text(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
	/**
	* @returns {SuggestionKind}
	*/
	kind() {
		return wasm.suggestion_kind(this.__wbg_ptr);
	}
	/**
	* @returns {string}
	*/
	to_json() {
		let deferred1_0;
		let deferred1_1;
		try {
			const ret = wasm.suggestion_to_json(this.__wbg_ptr);
			deferred1_0 = ret[0];
			deferred1_1 = ret[1];
			return getStringFromWasm0(ret[0], ret[1]);
		} finally {
			wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
		}
	}
};
if (Symbol.dispose) Suggestion.prototype[Symbol.dispose] = Suggestion.prototype.free;
/**
* Tags the variant of suggestion.
* @enum {0 | 1 | 2}
*/
const SuggestionKind = Object.freeze({
	/**
	* Replace the problematic text.
	*/
	Replace: 0,
	"0": "Replace",
	/**
	* Remove the problematic text.
	*/
	Remove: 1,
	"1": "Remove",
	/**
	* Insert additional text after the error.
	*/
	InsertAfter: 2,
	"2": "InsertAfter"
});
/**
* @returns {any}
*/
function get_default_lint_config() {
	return wasm.get_default_lint_config();
}
/**
* @returns {string}
*/
function get_default_lint_config_as_json() {
	let deferred1_0;
	let deferred1_1;
	try {
		const ret = wasm.get_default_lint_config_as_json();
		deferred1_0 = ret[0];
		deferred1_1 = ret[1];
		return getStringFromWasm0(ret[0], ret[1]);
	} finally {
		wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
	}
}
/**
* Set up the WebAssembly module's logging.
*/
function setup() {
	wasm.setup();
}
/**
* @param {string} text
* @returns {string}
*/
function to_title_case(text) {
	let deferred2_0;
	let deferred2_1;
	try {
		const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
		const len0 = WASM_VECTOR_LEN;
		const ret = wasm.to_title_case(ptr0, len0);
		deferred2_0 = ret[0];
		deferred2_1 = ret[1];
		return getStringFromWasm0(ret[0], ret[1]);
	} finally {
		wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
	}
}
function __wbg_get_imports() {
	return {
		__proto__: null,
		"./harper_wasm_bg.js": {
			__proto__: null,
			__wbg_Error_30c8987f7c2ed4e2: function(arg0, arg1) {
				return Error(getStringFromWasm0(arg0, arg1));
			},
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0(String(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_boolean_get_5b446f51afd21013: function(arg0) {
				const v = arg0;
				const ret = typeof v === "boolean" ? v : void 0;
				return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
			},
			__wbg___wbindgen_debug_string_4687d8d8c2017d52: function(arg0, arg1) {
				const ptr1 = passStringToWasm0(debugString(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_is_function_1f9d30630b8b1d3d: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_object_3c45d4f2dde4e749: function(arg0) {
				const val = arg0;
				return typeof val === "object" && val !== null;
			},
			__wbg___wbindgen_is_string_90b56bc79aad6f6c: function(arg0) {
				return typeof arg0 === "string";
			},
			__wbg___wbindgen_jsval_loose_eq_677f21e468d6b461: function(arg0, arg1) {
				return arg0 == arg1;
			},
			__wbg___wbindgen_number_get_2e0e7dee9f701a71: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "number" ? obj : void 0;
				getDataViewMemory0().setFloat64(arg0 + 8, isLikeNone(ret) ? 0 : ret, true);
				getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
			},
			__wbg___wbindgen_string_get_0380ccaa2f57f0d9: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "string" ? obj : void 0;
				var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				var len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_throw_41e9ee4f547fc59a: function(arg0, arg1) {
				throw new Error(getStringFromWasm0(arg0, arg1));
			},
			__wbg_call_6137034ef55c9d0f: function() {
				return handleError(function(arg0, arg1) {
					return arg0.call(arg1);
				}, arguments);
			},
			__wbg_done_b41a1d26cdb37fb6: function(arg0) {
				return arg0.done;
			},
			__wbg_entries_fb6397112b1de25f: function(arg0) {
				return Object.entries(arg0);
			},
			__wbg_error_757e9472f8410341: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0(arg0, arg1));
				} finally {
					wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_getRandomValues_973dabfb0ad1769f: function() {
				return handleError(function(arg0, arg1) {
					globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
				}, arguments);
			},
			__wbg_getRandomValues_a608c4436c19407a: function() {
				return handleError(function(arg0, arg1) {
					globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
				}, arguments);
			},
			__wbg_getTime_f5a55efff2585d5d: function(arg0) {
				return arg0.getTime();
			},
			__wbg_get_658f6698067d9515: function() {
				return handleError(function(arg0, arg1) {
					return Reflect.get(arg0, arg1);
				}, arguments);
			},
			__wbg_get_6c896e0571ddae51: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_unchecked_288889d017702237: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_instanceof_ArrayBuffer_a99f175873e5d9b8: function(arg0) {
				let result;
				try {
					result = arg0 instanceof ArrayBuffer;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Uint8Array_828cef2aaacafc31: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Uint8Array;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_iterator_e3c31c892080e444: function() {
				return Symbol.iterator;
			},
			__wbg_length_7f3c00c40364105e: function(arg0) {
				return arg0.length;
			},
			__wbg_length_d4bdea10311bd9cf: function(arg0) {
				return arg0.length;
			},
			__wbg_lint_new: function(arg0) {
				return Lint.__wrap(arg0);
			},
			__wbg_lint_unwrap: function(arg0) {
				return Lint.__unwrap(arg0);
			},
			__wbg_log_1f8cbb01c83d06c2: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
				} finally {
					wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_log_a54ca6b45e09078a: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.log(getStringFromWasm0(arg0, arg1));
				} finally {
					wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
				}
			},
			__wbg_mark_6b7f03786f5e4d61: function(arg0, arg1) {
				performance.mark(getStringFromWasm0(arg0, arg1));
			},
			__wbg_measure_0e21b33a1c6e3a29: function() {
				return handleError(function(arg0, arg1, arg2, arg3) {
					let deferred0_0;
					let deferred0_1;
					let deferred1_0;
					let deferred1_1;
					try {
						deferred0_0 = arg0;
						deferred0_1 = arg1;
						deferred1_0 = arg2;
						deferred1_1 = arg3;
						performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
					} finally {
						wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
						wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
					}
				}, arguments);
			},
			__wbg_new_0_72d020f0c63443d4: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_1dbf7428bba60a42: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_28744009d011f847: function() {
				return /* @__PURE__ */ new Map();
			},
			__wbg_new_617a8cdb8bb1130e: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_ee2291f50781bf1d: function() {
				return new Array();
			},
			__wbg_next_33784799010f1bbe: function(arg0) {
				return arg0.next;
			},
			__wbg_next_f4aac29c42af995c: function() {
				return handleError(function(arg0) {
					return arg0.next();
				}, arguments);
			},
			__wbg_organizedgroup_new: function(arg0) {
				return OrganizedGroup.__wrap(arg0);
			},
			__wbg_prototypesetcall_bc27214492979395: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
			},
			__wbg_set_6ae97e73113c4f0b: function(arg0, arg1, arg2) {
				return arg0.set(arg1, arg2);
			},
			__wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
				arg0[arg1] = arg2;
			},
			__wbg_set_bea140a88be9b277: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_suggestion_new: function(arg0) {
				return Suggestion.__wrap(arg0);
			},
			__wbg_value_f3c585ee8f5ba40c: function(arg0) {
				return arg0.value;
			},
			__wbindgen_generic_0000000000000001: function(arg0) {
				return arg0;
			},
			__wbindgen_generic_0000000000000002: function(arg0, arg1) {
				return getStringFromWasm0(arg0, arg1);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			}
		}
	};
}
const LintFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_lint_free(ptr, 1));
const LinterFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_linter_free(ptr, 1));
const OrganizedGroupFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_organizedgroup_free(ptr, 1));
const SpanFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_span_free(ptr, 1));
const SuggestionFinalization = typeof FinalizationRegistry === "undefined" ? {
	register: () => {},
	unregister: () => {}
} : new FinalizationRegistry((ptr) => wasm.__wbg_suggestion_free(ptr, 1));
function addToExternrefTable0(obj) {
	const idx = wasm.__externref_table_alloc();
	wasm.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function _assertClass(instance, klass) {
	if (!(instance instanceof klass)) throw new Error(\`expected instance of \${klass.name}\`);
}
function debugString(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayJsValueFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	const mem = getDataViewMemory0();
	const result = [];
	for (let i = ptr; i < ptr + 4 * len; i += 4) result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
	wasm.__externref_drop_slice(ptr, len);
	return result;
}
function getArrayU8FromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
let cachedBigUint64ArrayMemory0 = null;
function getBigUint64ArrayMemory0() {
	if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
	return cachedBigUint64ArrayMemory0;
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
	if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
	return cachedDataViewMemory0;
}
function getStringFromWasm0(ptr, len) {
	return decodeText(ptr >>> 0, len);
}
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
	if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
	return cachedUint8ArrayMemory0;
}
function handleError(f, args) {
	try {
		return f.apply(this, args);
	} catch (e) {
		const idx = addToExternrefTable0(e);
		wasm.__wbindgen_exn_store(idx);
	}
}
function isLikeNone(x) {
	return x === void 0 || x === null;
}
function passArray64ToWasm0(arg, malloc) {
	const ptr = malloc(arg.length * 8, 8) >>> 0;
	getBigUint64ArrayMemory0().set(arg, ptr / 8);
	WASM_VECTOR_LEN = arg.length;
	return ptr;
}
function passArray8ToWasm0(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0().set(arg, ptr / 1);
	WASM_VECTOR_LEN = arg.length;
	return ptr;
}
function passArrayJsValueToWasm0(array, malloc) {
	const ptr = malloc(array.length * 4, 4) >>> 0;
	for (let i = 0; i < array.length; i++) {
		const add = addToExternrefTable0(array[i]);
		getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
	}
	WASM_VECTOR_LEN = array.length;
	return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN = offset;
	return ptr;
}
function takeFromExternrefTable0(idx) {
	const value = wasm.__wbindgen_externrefs.get(idx);
	wasm.__externref_table_dealloc(idx);
	return value;
}
let cachedTextDecoder = new TextDecoder("utf-8", {
	ignoreBOM: true,
	fatal: true
});
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
	numBytesDecoded += len;
	if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
		cachedTextDecoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder.decode();
		numBytesDecoded = len;
	}
	return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
const cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) cachedTextEncoder.encodeInto = function(arg, view) {
	const buf = cachedTextEncoder.encode(arg);
	view.set(buf);
	return {
		read: arg.length,
		written: buf.length
	};
};
let WASM_VECTOR_LEN = 0;
let wasm;
function __wbg_finalize_init(instance, module) {
	wasm = instance.exports;
	cachedBigUint64ArrayMemory0 = null;
	cachedDataViewMemory0 = null;
	cachedUint8ArrayMemory0 = null;
	wasm.__wbindgen_start();
	return wasm;
}
async function __wbg_load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (!module.ok) throw new Error(\`failed to fetch Wasm: \${module.status} \${module.statusText} fetching '\${module.url}'\`);
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
function initSync(module) {
	if (wasm !== void 0) return wasm;
	if (module !== void 0) {
		if (Object.getPrototypeOf(module) === Object.prototype) ({module} = module);
		else console.warn("using deprecated parameters for \`initSync()\`; pass a single object instead");
	}
	const imports = __wbg_get_imports();
	if (!(module instanceof WebAssembly.Module)) module = new WebAssembly.Module(module);
	return __wbg_finalize_init(new WebAssembly.Instance(module, imports), module);
}
async function __wbg_init(module_or_path) {
	if (wasm !== void 0) return wasm;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) module_or_path = new URL();
	const imports = __wbg_get_imports();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load(await module_or_path, imports);
	return __wbg_finalize_init(instance, module);
}
// ../../node_modules/.pnpm/p-lazy@5.0.0/node_modules/p-lazy/index.js
var PLazy = class PLazy extends Promise {
	#executor;
	#promise;
	constructor(executor) {
		super((resolve) => {
			resolve();
		});
		this.#executor = executor;
	}
	static from(function_) {
		return new PLazy((resolve) => {
			resolve(function_());
		});
	}
	static resolve(value) {
		return new PLazy((resolve) => {
			resolve(value);
		});
	}
	static reject(error) {
		return new PLazy((resolve, reject) => {
			reject(error);
		});
	}
	then(onFulfilled, onRejected) {
		this.#promise ??= new Promise(this.#executor);
		return this.#promise.then(onFulfilled, onRejected);
	}
	catch(onRejected) {
		this.#promise ??= new Promise(this.#executor);
		return this.#promise.catch(onRejected);
	}
	finally(onFinally) {
		this.#promise ??= new Promise(this.#executor);
		return this.#promise.finally(onFinally);
	}
};
// ../../node_modules/.pnpm/mimic-fn@4.0.0/node_modules/mimic-fn/index.js
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	if (property === "length" || property === "prototype") return;
	if (property === "arguments" || property === "caller") return;
	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) return;
	Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
	return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) return;
	Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => \`/* Wrapped \${withName}*/\\n\${fromBody}\`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
	const withName = name === "" ? "" : \`with \${name.trim()}() \`;
	const newToString = wrappedToString.bind(null, withName, from.toString());
	Object.defineProperty(newToString, "name", toStringName);
	Object.defineProperty(to, "toString", {
		...toStringDescriptor,
		value: newToString
	});
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
	const { name } = to;
	for (const property of Reflect.ownKeys(from)) copyProperty(to, from, property, ignoreNonConfigurable);
	changePrototype(to, from);
	changeToString(to, from, name);
	return to;
}
// ../../node_modules/.pnpm/p-memoize@7.1.1/node_modules/p-memoize/dist/index.js
const cacheStore = /* @__PURE__ */ new WeakMap();
/**
[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

@param fn - Function to be memoized.

@example
\`\`\`
import {setTimeout as delay} from 'node:timer/promises';
import pMemoize from 'p-memoize';
import got from 'got';

const memoizedGot = pMemoize(got);

await memoizedGot('https://sindresorhus.com');

// This call is cached
await memoizedGot('https://sindresorhus.com');

await delay(2000);

// This call is not cached as the cache has expired
await memoizedGot('https://sindresorhus.com');
\`\`\`
*/
function pMemoize(fn, { cacheKey = ([firstArgument]) => firstArgument, cache = /* @__PURE__ */ new Map() } = {}) {
	const promiseCache = /* @__PURE__ */ new Map();
	const memoized = function(...arguments_) {
		const key = cacheKey(arguments_);
		if (promiseCache.has(key)) return promiseCache.get(key);
		const promise = (async () => {
			try {
				if (cache && await cache.has(key)) return await cache.get(key);
				const result = await fn.apply(this, arguments_);
				try {
					return result;
				} finally {
					if (cache) await cache.set(key, result);
				}
			} finally {
				promiseCache.delete(key);
			}
		})();
		promiseCache.set(key, promise);
		return promise;
	};
	mimicFunction(memoized, fn, { ignoreNonConfigurable: true });
	cacheStore.set(memoized, cache);
	return memoized;
}
// src/BinaryModule.ts
function inferGlueFlavor(binary) {
	return binary.includes("harper_wasm_slim") ? "slim" : "full";
}
function loadGlue(glueFlavor) {
	if (glueFlavor === "slim") return harper_wasm_slim_exports;
	return harper_wasm_exports;
}
function getDefaultGlueBinary(binary, glueFlavor) {
	if (glueFlavor === "slim") return binary;
	if (binary.includes("harper_wasm_bg.wasm")) return binary.replace("harper_wasm_bg.wasm", "harper_wasm_slim_bg.wasm");
	return null;
}
function getInitInput(binary) {
	if (typeof process !== "undefined" && binary.startsWith("file://")) return import(
		/* webpackIgnore: true */
		/* @vite-ignore */
		"fs"
).then((fs) => new Promise((resolve, reject) => {
		fs.readFile(new URL(binary).pathname, (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	}));
	return binary;
}
async function loadBinaryUncached(binary, glueFlavor) {
	const exports = loadGlue(glueFlavor);
	const defaultGlueBinary = getDefaultGlueBinary(binary, glueFlavor);
	if (defaultGlueBinary != null) try {
		await __wbg_init$1({ module_or_path: getInitInput(defaultGlueBinary) });
	} catch (err) {
		if (glueFlavor === "slim") throw err;
	}
	await exports.default({ module_or_path: getInitInput(binary) });
	return exports;
}
const loadBinaryByFlavor = {
	full: pMemoize((binary) => loadBinaryUncached(binary, "full")),
	slim: pMemoize((binary) => loadBinaryUncached(binary, "slim"))
};
function loadBinary(binary, glueFlavor) {
	return loadBinaryByFlavor[glueFlavor](binary);
}
/** A wrapper around the underlying WebAssembly module that contains Harper's core code. Used to construct a \`Linter\`, as well as access some miscellaneous other functions. */
var BinaryModuleImpl = class {
	url = "";
	glueFlavor = "full";
	inner = null;
	/** Load a binary from a specified URL. This is the only recommended way to construct this type. */
	static create(url, glueFlavor) {
		const module = new SuperBinaryModule();
		module.url = url;
		module.glueFlavor = glueFlavor ?? inferGlueFlavor(typeof url === "string" ? url : url.href);
		module.inner = PLazy.from(() => loadBinary(typeof module.url === "string" ? module.url : module.url.href, module.glueFlavor));
		return module;
	}
	async getDefaultLintConfigAsJSON() {
		return (await this.inner).get_default_lint_config_as_json();
	}
	async getDefaultLintConfig() {
		return (await this.inner).get_default_lint_config();
	}
	async toTitleCase(text) {
		return (await this.inner).to_title_case(text);
	}
	async setup() {
		(await this.inner).setup();
	}
};
var SuperBinaryModule = class extends BinaryModuleImpl {
	async createLinter(dialect) {
		return (await this.getBinaryModule()).Linter.new(dialect ?? Dialect$1.American);
	}
	async getBinaryModule() {
		return await PLazy.from(() => loadBinary(typeof this.url === "string" ? this.url : this.url.href, this.glueFlavor));
	}
};
// src/LocalLinter.ts
function toWasmLanguage(language) {
	switch (language) {
		case "plaintext": return Language$1.Plain;
		case "typst": return Language$1.Typst;
		case "markdown":
		case void 0: return Language$1.Markdown;
		default:
			console.warn(\`Unknown Harper language '\${String(language)}'; using markdown.\`);
			return Language$1.Markdown;
	}
}
function toWasmLintArgs(text, options) {
	return [
		text,
		toWasmLanguage(options?.language),
		options?.forceAllHeadings ?? false,
		options?.regex_mask,
		options?.dedup ?? true,
		options?.isolateEnglish ?? false
	];
}
/** A Linter that runs in the current JavaScript context (meaning it is allowed to block the event loop).
* See the interface definition for more details. */
var LocalLinter = class {
	binary;
	inner;
	disposed = false;
	constructor(init) {
		this.binary = init.binary;
		this.binary.setup();
		this.inner = this.createInner(init.dialect);
	}
	createInner(dialect) {
		return PLazy.from(async () => {
			await this.binary.setup();
			return this.binary.createLinter(dialect);
		});
	}
	async setup() {
		await this.lint("", { language: "plaintext" });
		const exported = await this.exportIgnoredLints();
		await this.importIgnoredLints(exported);
	}
	async lint(text, options) {
		return (await this.inner).lint(...toWasmLintArgs(text, options));
	}
	async organizedLints(text, options) {
		const lintGroups = (await this.inner).organized_lints(...toWasmLintArgs(text, options));
		const output = {};
		for (const group of lintGroups) {
			output[group.group] = group.lints;
			group.free();
		}
		return output;
	}
	async applySuggestion(text, lint, suggestion) {
		return (await this.inner).apply_suggestion(text, lint, suggestion);
	}
	async isLikelyEnglish(text) {
		return (await this.inner).is_likely_english(text);
	}
	async isolateEnglish(text) {
		return (await this.inner).isolate_english(text);
	}
	async getLintConfig() {
		return (await this.inner).get_lint_config_as_object();
	}
	async getDefaultLintConfigAsJSON() {
		return await this.binary.getDefaultLintConfigAsJSON();
	}
	async getDefaultLintConfig() {
		return await this.binary.getDefaultLintConfig();
	}
	async getStructuredLintConfig() {
		return (await this.inner).get_structured_lint_config_as_object();
	}
	async getStructuredLintConfigJSON() {
		return (await this.inner).get_structured_lint_config_as_json();
	}
	async setLintConfig(config) {
		(await this.inner).set_lint_config_from_object(config);
	}
	async getLintConfigAsJSON() {
		return (await this.inner).get_lint_config_as_json();
	}
	async setLintConfigWithJSON(config) {
		(await this.inner).set_lint_config_from_json(config);
	}
	async toTitleCase(text) {
		return await this.binary.toTitleCase(text);
	}
	async getLintDescriptions() {
		return (await this.inner).get_lint_descriptions_as_object();
	}
	async getLintDescriptionsAsJSON() {
		return (await this.inner).get_lint_descriptions_as_json();
	}
	async getLintDescriptionsHTML() {
		return (await this.inner).get_lint_descriptions_html_as_object();
	}
	async getLintDescriptionsHTMLAsJSON() {
		return (await this.inner).get_lint_descriptions_html_as_json();
	}
	async ignoreLint(source, lint) {
		return await this.ignoreLints(source, [lint]);
	}
	async ignoreLints(source, lints) {
		(await this.inner).ignore_lints(source, lints);
	}
	async ignoreLintHash(hash) {
		(await this.inner).ignore_hashes(new BigUint64Array([hash]));
	}
	async exportIgnoredLints() {
		return (await this.inner).export_ignored_lints();
	}
	async importIgnoredLints(json) {
		(await this.inner).import_ignored_lints(json);
	}
	async contextHash(source, lint) {
		return (await this.inner).context_hash(source, lint);
	}
	async clearIgnoredLints() {
		(await this.inner).clear_ignored_lints();
	}
	async clearWords() {
		return (await this.inner).clear_words();
	}
	async importWords(words) {
		return (await this.inner).import_words(words);
	}
	async exportWords() {
		return (await this.inner).export_words();
	}
	async getDialect() {
		return (await this.inner).get_dialect();
	}
	async setDialect(dialect) {
		const inner = await this.inner;
		if (inner.get_dialect() !== dialect) {
			inner.free();
			this.inner = this.createInner(dialect);
		}
		return Promise.resolve();
	}
	async summarizeStats(start, end) {
		return (await this.inner).summarize_stats(start, end);
	}
	async generateStatsFile() {
		return (await this.inner).generate_stats_file();
	}
	async importStatsFile(statsFile) {
		return (await this.inner).import_stats_file(statsFile);
	}
	/**
	* Load a Weirpack from a Blob.
	*
	* Returns \`undefined\` if tests pass and rules are imported, otherwise returns
	* the Weirpack test failures.
	*/
	async loadWeirpackFromBlob(blob) {
		const bytes = new Uint8Array(await blob.arrayBuffer());
		return this.loadWeirpackFromBytes(bytes);
	}
	/**
	* Load a Weirpack from a byte array.
	*
	* Returns \`undefined\` if tests pass and rules are imported, otherwise returns
	* the Weirpack test failures.
	*/
	async loadWeirpackFromBytes(bytes) {
		const inner = await this.inner;
		const data = bytes instanceof Uint8Array ? bytes : Uint8Array.from(bytes);
		return inner.import_weirpack(data);
	}
	async dispose() {
		if (this.disposed) return;
		this.disposed = true;
		(await this.inner).free();
	}
};
// src/utils.ts
function assert(condition, message) {
	if (!condition) throw new Error(message ?? "Assertion failed");
}
// src/Serializer.ts
function isSerializedRequest(v) {
	return typeof v === "object" && v !== null && "procName" in v && "args" in v;
}
/** An internal class that helps the \`WorkerLinter\` shuffle data across a messaging channel. */
var Serializer = class {
	binary;
	constructor(binary) {
		this.binary = binary;
		this.binary.setup();
	}
	async serializeArg(arg) {
		const { Lint, Span, Suggestion } = await this.binary.getBinaryModule();
		if (Array.isArray(arg)) return {
			json: JSON.stringify(await Promise.all(arg.map((a) => this.serializeArg(a)))),
			type: "Array"
		};
		const argType = typeof arg;
		switch (argType) {
			case "string":
			case "number":
			case "boolean":
			case "undefined": return {
				json: JSON.stringify(arg),
				type: argType
			};
			case "bigint": return {
				json: arg.toString(),
				type: argType
			};
		}
		if (arg.to_json !== void 0) {
			const json = arg.to_json();
			let type;
			const constructorName = arg.constructor?.name;
			if (arg instanceof Lint || constructorName === "Lint") type = "Lint";
			else if (arg instanceof Suggestion || constructorName === "Suggestion") type = "Suggestion";
			else if (arg instanceof Span || constructorName === "Span") type = "Span";
			if (type === void 0) throw new Error("Unhandled case: type undefined");
			return {
				json,
				type
			};
		}
		if (argType == "object") return {
			json: JSON.stringify(await Promise.all(Object.entries(arg).map(([key, value]) => this.serializeArg([key, value])))),
			type: "object"
		};
		throw new Error(\`Unhandled case: \${arg}\`);
	}
	async serialize(req) {
		return {
			procName: req.procName,
			args: await Promise.all(req.args.map((arg) => this.serializeArg(arg)))
		};
	}
	async deserializeArg(requestArg) {
		const { Lint, Span, Suggestion } = await this.binary.getBinaryModule();
		switch (requestArg.type) {
			case "bigint": return BigInt(requestArg.json);
			case "undefined": return;
			case "boolean":
			case "number":
			case "string": return JSON.parse(requestArg.json);
			case "Suggestion": return Suggestion.from_json(requestArg.json);
			case "Lint": return Lint.from_json(requestArg.json);
			case "Span": return Span.from_json(requestArg.json);
			case "Array": {
				const parsed = JSON.parse(requestArg.json);
				assert(Array.isArray(parsed));
				return await Promise.all(parsed.map((arg) => this.deserializeArg(arg)));
			}
			case "object": {
				const parsed = JSON.parse(requestArg.json);
				return Object.fromEntries(await Promise.all(parsed.map((val) => this.deserializeArg(val))));
			}
			default: throw new Error(\`Unhandled case: \${requestArg.type}\`);
		}
	}
	async deserialize(request) {
		return {
			procName: request.procName,
			args: await Promise.all(request.args.map((arg) => this.deserializeArg(arg)))
		};
	}
};
// src/WorkerLinter/worker.ts
self.postMessage("ready");
self.onmessage = (e) => {
	const [binaryUrl, dialect, glueFlavor] = e.data;
	if (typeof binaryUrl !== "string") throw new TypeError(\`Expected binary to be a string of url but got \${typeof binaryUrl}.\`);
	if (glueFlavor !== void 0 && glueFlavor !== "full" && glueFlavor !== "slim") throw new TypeError(\`Expected glue flavor to be "full" or "slim" but got \${glueFlavor}.\`);
	const binary = SuperBinaryModule.create(binaryUrl, glueFlavor);
	const serializer = new Serializer(binary);
	const linter = new LocalLinter({
		binary,
		dialect
	});
	async function processRequest(v) {
		const { procName, args } = await serializer.deserialize(v);
		if (procName in linter) {
			const res = await linter[procName](...args);
			postMessage(await serializer.serializeArg(res));
		}
	}
	self.onmessage = (e) => {
		if (isSerializedRequest(e.data)) processRequest(e.data);
	};
};
`,lt=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",He],{type:"text/javascript;charset=utf-8"});var D=Uint8Array,ne=Uint16Array,Ke=Int32Array,Qe=new D([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ye=new D([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gt=new D([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ee=function(e,n){for(var t=new ne(31),r=0;r<31;++r)t[r]=n+=1<<e[r-1];for(var s=new Ke(t[30]),r=1;r<30;++r)for(var o=t[r];o<t[r+1];++o)s[o]=o-t[r]<<5|r;return{b:t,r:s}},te=ee(Qe,2),Xe=te.b,Ze=te.r;Xe[28]=258,Ze[258]=28;var re=ee(Ye,0),ct=re.b,ft=re.r,nt=new ne(32768);for(p=0;p<32768;++p)x=(p&43690)>>1|(p&21845)<<1,x=(x&52428)>>2|(x&13107)<<2,x=(x&61680)>>4|(x&3855)<<4,nt[p]=((x&65280)>>8|(x&255)<<8)>>1;var x,p;var on=new D(288);for(p=0;p<144;++p)on[p]=8;var p;for(p=144;p<256;++p)on[p]=9;var p;for(p=256;p<280;++p)on[p]=7;var p;for(p=280;p<288;++p)on[p]=8;var p,et=new D(32);for(p=0;p<32;++p)et[p]=5;var p;var tt=new D(0);var rt=typeof TextDecoder<"u"&&new TextDecoder;try{rt.decode(tt,{stream:!0})}catch{}export{qe as LocalLinter,Yn as createBinaryModuleFromUrl};
