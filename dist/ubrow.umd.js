!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).ubrow={})}(this,(function(t){"use strict";function e(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var s,i,r,n,h=[],a="",o=t.split("/");for(o[0]||o.shift();r=o.shift();)"*"===(s=r[0])?(h.push("wild"),a+="/(.*)"):":"===s?(i=r.indexOf("?",1),n=r.indexOf(".",1),h.push(r.substring(1,~i?i:~n?n:r.length)),a+=~i&&!~n?"(?:/([^/]+?))?":"/([^/]+?)",~n&&(a+=(~i?"?":"")+"\\"+r.substring(n))):a+="/"+r;return{keys:h,pattern:new RegExp("^"+a+(e?"(?=$|/)":"/?$"),"i")}}function s(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var i;function r(t,e){let s=t.url;if(null==s)return;let r=t._parsedUrl;if(r&&r.raw===s)return r;let n,h=s,a="";if(s.length>1){let r=s.indexOf("?",1);if(-1!==r&&(a=s.substring(r),h=s.substring(0,r),a.length>1&&(n=i(a.substring(1)))),e&&!t._decoded&&(t._decoded=!0,-1!==h.indexOf("%")))try{h=decodeURIComponent(h)}catch(o){}}return t._parsedUrl={pathname:h,search:a,query:n,raw:s}}function n(t,e,s){"string"==typeof t?s.end(t):s.end(t.message)}i=function(t,e,i,r){e=e||"&",i=i||"=";var n={};if("string"!=typeof t||0===t.length)return n;var h=/\+/g;t=t.split(e);var a=1e3;r&&"number"==typeof r.maxKeys&&(a=r.maxKeys);var o=t.length;a>0&&o>a&&(o=a);for(var l=0;l<o;++l){var c,d,u,p,f=t[l].replace(h,"%20"),g=f.indexOf(i);g>=0?(c=f.substr(0,g),d=f.substr(g+1)):(c=f,d=""),u=decodeURIComponent(c),p=decodeURIComponent(d),s(n,u)?Array.isArray(n[u])?n[u].push(p):n[u]=[n[u],p]:n[u]=p}return n};const h=t=>t instanceof a?t.attach:t;class a extends class{constructor(){this.routes=[],this.all=this.add.bind(this,""),this.get=this.add.bind(this,"GET"),this.head=this.add.bind(this,"HEAD"),this.patch=this.add.bind(this,"PATCH"),this.options=this.add.bind(this,"OPTIONS"),this.connect=this.add.bind(this,"CONNECT"),this.delete=this.add.bind(this,"DELETE"),this.trace=this.add.bind(this,"TRACE"),this.post=this.add.bind(this,"POST"),this.put=this.add.bind(this,"PUT")}use(t,...s){let i=[].concat.apply([],s),{keys:r,pattern:n}=e(t,!0);return this.routes.push({keys:r,pattern:n,method:"",handlers:i}),this}add(t,s,...i){let{keys:r,pattern:n}=e(s),h=[].concat.apply([],i);return this.routes.push({keys:r,pattern:n,method:t,handlers:h}),this}find(t,e){let s,i,r="HEAD"===t,n=0,h=0,a=this.routes,o=[],l={},c=[];for(;n<a.length;n++)if(i=a[n],0===i.method.length||i.method===t||r&&"GET"===i.method)if(!1===i.keys){if(o=i.pattern.exec(e),null===o)continue;if(void 0!==o.groups)for(s in o.groups)l[s]=o.groups[s];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else if(i.keys.length>0){if(o=i.pattern.exec(e),null===o)continue;for(h=0;h<i.keys.length;)l[i.keys[h]]=o[++h];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else i.pattern.test(e)&&(i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0]));return{params:l,handlers:c}}}{constructor(t={}){super(),this.parse=r,this.handler=this.handler.bind(this),this.onError=t.onError||n,this.onNoMatch=t.onNoMatch||this.onError.bind(null,{code:404}),this.attach=(t,e)=>setTimeout(this.handler,0,t,e)}use(t,...e){return"/"===t?super.use(t,...e.map(h)):"function"==typeof t||t instanceof a?super.use("/",...[t,...e].map(h)):super.use(t,((e,s,i)=>{if("string"==typeof t){let s=t.length;t.startsWith("/")||s++,e.url=e.url.substring(s)||"/",e.path=e.path&&e.path.substring(s)||"/"}else e.url=e.url.replace(t,"")||"/",e.path=e.path&&e.path.replace(t,"")||"/";"/"!==e.url.charAt(0)&&(e.url="/"+e.url),i()}),...e.map(h),((t,e,s)=>{var i,r;t.path=(null==(i=t._parsedUrl)?void 0:i.pathname)||"",t.url=t.path+(null==(r=t._parsedUrl)?void 0:r.search)||"",s()})),this}handler(t,e,s){let i=this.parse(t,!0),r=this.find(t.method,t.path=i.pathname);if(t.params=r.params,t.originalUrl=t.originalUrl||t.url,t.url=i.pathname+i.search,t.query=i.query||{},t.search=i.search,t.routePath="",t.params){let e=t.originalUrl;for(const[s,i]of Object.entries(t.params))e=e.replace(i,`:${s}`);t.routePath=e.replace(t.search,"")}try{let i=0,n=r.handlers.concat(this.onNoMatch),h=n.length,a=async()=>e.finished||i<h&&n[i++](t,e,s);(s=s||(i=>i?this.onError(i,t,e,s):a().catch(s)))()}catch(n){this.onError(n,t,e,s)}}}class o extends class{constructor(t){this.all=t||Object.create(null)}on(t,e){(this.all[t]||(this.all[t]=[])).push(e)}off(t,e){this.all[t]&&this.all[t].splice(this.all[t].indexOf(e)>>>0,1)}emit(t,...e){(this.all[t]||[]).slice().map((t=>{t(...e)})),(this.all["*"]||[]).slice().map((s=>{s(t,...e)}))}}{constructor(){if(super(),this.listen=t=>{this.emit("popstate",t),this.emit("change",this.ctx.location,this.h.state,"popstate")},this.win="object"==typeof window&&window,this.ctx=this.win,this.h=this.ctx.history,!this.h)throw new Error("History API is not available");if(!this.ctx.location)throw new Error("Location API is not available");this.addEvent=this.ctx.addEventListener,this.addEvent&&this.ctx.addEventListener("popstate",this.listen)}pushState(t,e,s){this.emit("pushState",t,e,s),this.h.pushState(t,e,s),this.emit("change",this.ctx.location,t,"pushState")}replaceState(t,e,s){this.emit("replaceState",t,e,s),this.h.replaceState(t,e,s),this.emit("change",this.ctx.location,t,"replaceState")}unListen(){this.ctx.removeEventListener("popstate",this.listen)}}class l{constructor(t){this.history=new o,this.base="",this.res={statusCode:200,finished:!1,end:(t,e)=>{t&&console.error(t)},redirect:t=>{this.navigate(t)}},this.click=t=>{var e=t.target.closest("a"),s=e&&e.getAttribute("href");t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||t.button||t.defaultPrevented||s&&!e.target&&e.host===location.host&&("/"!=s[0]||this.rgx.test(s))&&(t.preventDefault(),this.history.pushState(this.req,"",s))},this.setCallback=t=>{let e=location&&location.pathname+location.search||"/";"/"!=this.base&&(e=e.replace(this.base,"")),this.req={method:"GET",url:e},t(this.req,this.res)},this.base="/"+(t||"").replace(/^\/|\/$/g,""),this.rgx="/"==this.base?/^\/+/:new RegExp("^\\"+this.base+"(?=\\/|$)\\/?","i")}navigate(t){this.req={method:"GET",url:t},this.history.pushState(this.req,"",t)}on(t,e){this.history.on(t,e)}unListen(){this.history.unListen(),removeEventListener("click",this.click)}listen(t){this.setCallback(t),addEventListener("click",this.click),this.history.on("change",((e,s,i)=>{this.setCallback(t)}))}}class c extends a{constructor(t){super(t),this.opts=t,this.onError=t.onError,this.onNoMatch=t.onNoMatch,this.client=new l(this.opts.base)}listen({onError:t=this.onError,onNoMatch:e=this.onNoMatch}={}){this.onError=t,this.onNoMatch=e,this.client.listen(this.handler)}unListen(){this.client.unListen()}on(t,e){return this.client.on(t,e),this}navigate(t){this.client.navigate(t)}}t.Client=function({onError:t=((t,e,s)=>{console.error(t)}),onNoMatch:e=((t,e,s)=>{console.error("no match")}),base:s="/"}={}){return new c({onError:t,onNoMatch:e,base:s})},Object.defineProperty(t,"__esModule",{value:!0}),t[Symbol.toStringTag]="Module"}));
