"use strict";function t(t,e){if(t instanceof RegExp)return{keys:[],pattern:t};var s,i,r,h,n=[],a="",o=t.split("/");for(o[0]||o.shift();r=o.shift();)"*"===(s=r[0])?(n.push("wild"),a+="/(.*)"):":"===s?(i=r.indexOf("?",1),h=r.indexOf(".",1),n.push(r.substring(1,~i?i:~h?h:r.length)),a+=~i&&!~h?"(?:/([^/]+?))?":"/([^/]+?)",~h&&(a+=(~i?"?":"")+"\\"+r.substring(h))):a+="/"+r;return{keys:n,pattern:new RegExp("^"+a+(e?"(?=$|/)":"/?$"),"i")}}Object.defineProperty(exports,"__esModule",{value:!0}),exports[Symbol.toStringTag]="Module";var e=(t,e)=>{let s=t.url;if(null==s)return;let i=t._parsedUrl;if(i&&i.raw===s)return i;let r,h=s,n="";if(s.length>1){let i=s.indexOf("?",1);if(-1!==i&&(n=s.substring(i),h=s.substring(0,i),n.length>1&&(r=function(t,e,s,i){e=e||"&",s=s||"=";var r={};if("string"!=typeof t||0===t.length)return r;var h,n,a=/\+/g,o=1e3,l=(t=t.split(e)).length;o>0&&l>o&&(l=o);for(var c=0;c<l;++c){var d,p,u,f,g=t[c].replace(a,"%20"),b=g.indexOf(s);b>=0?(d=g.substr(0,b),p=g.substr(b+1)):(d=g,p=""),u=decodeURIComponent(d),f=decodeURIComponent(p),h=r,n=u,Object.prototype.hasOwnProperty.call(h,n)?Array.isArray(r[u])?r[u].push(f):r[u]=[r[u],f]:r[u]=f}return r}(n.substring(1)))),e&&!t._decoded&&(t._decoded=!0,-1!==h.indexOf("%")))try{h=decodeURIComponent(h)}catch(a){}}return t._parsedUrl={pathname:h,search:n,query:r,raw:s}};class s{constructor(t={}){this.mount=t=>t instanceof s?t.attach:t,this.routes=[],this.parse=e,this.handler=this.handler.bind(this),this.onError=t.onError||this.onErrorI,this.onNoMatch=t.onNoMatch||this.onError.bind(null,{code:404}),this.attach=(t,e)=>setTimeout(this.handler,0,t,e),this.all=this.add.bind(this,""),this.get=this.add.bind(this,"GET"),this.head=this.add.bind(this,"HEAD"),this.patch=this.add.bind(this,"PATCH"),this.options=this.add.bind(this,"OPTIONS"),this.connect=this.add.bind(this,"CONNECT"),this.delete=this.add.bind(this,"DELETE"),this.trace=this.add.bind(this,"TRACE"),this.post=this.add.bind(this,"POST"),this.put=this.add.bind(this,"PUT")}useI(e,...s){let i=[].concat.apply([],s),{keys:r,pattern:h}=t(e,!0);return this.routes.push({keys:r,pattern:h,method:"",handlers:i}),this}use(t,...e){return"/"===t?this.useI(t,e.map(this.mount)):"function"==typeof t||t instanceof s?this.useI("/",[t,...e].map(this.mount)):this.useI(t,((e,s,i)=>{if("string"==typeof t){let s=t.length;t.startsWith("/")||s++,e.url=e.url.substring(s)||"/",e.path=e.path.substring(s)||"/"}else e.url=e.url.replace(t,"")||"/",e.path=e.path.replace(t,"")||"/";"/"!==e.url.charAt(0)&&(e.url="/"+e.url),i()}),...e.map(this.mount),((t,e,s)=>{t.path=t._parsedUrl.pathname,t.url=t.path+t._parsedUrl.search,s()})),this}onErrorI(t,e,s){s.end(t.length&&t||t.message)}add(e,s,...i){let{keys:r,pattern:h}=t(s),n=[].concat.apply([],i);return this.routes.push({keys:r,pattern:h,method:e,handlers:n}),this}handler(t,e,s){let i=this.parse(t,!0),r=this.find(t.method,t.path=i.pathname);t.params=r.params,t.originalUrl=t.originalUrl||t.url,t.url=i.pathname+i.search,t.query=i.query||{},t.search=i.search;try{let i=0,h=r.handlers.concat(this.onNoMatch),n=h.length,a=async()=>e.finished||i<n&&h[i++](t,e,s);(s=s||(i=>i?this.onError(i,t,e,s):a().catch(s)))()}catch(h){this.onError(h,t,e,s)}}find(t,e){let s,i,r="HEAD"===t,h=0,n=0,a=this.routes,o=[],l={},c=[];for(;h<a.length;h++)if(i=a[h],0===i.method.length||i.method===t||r&&"GET"===i.method)if(!1===i.keys){if(o=i.pattern.exec(e),null===o)continue;if(void 0!==o.groups)for(s in o.groups)l[s]=o.groups[s];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else if(i.keys.length>0){if(o=i.pattern.exec(e),null===o)continue;for(n=0;n<i.keys.length;)l[i.keys[n]]=o[++n];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else i.pattern.test(e)&&(i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0]));return{params:l,handlers:c}}}class i extends class{constructor(t){this.all=t||Object.create(null)}on(t,e){(this.all[t]||(this.all[t]=[])).push(e)}off(t,e){this.all[t]&&this.all[t].splice(this.all[t].indexOf(e)>>>0,1)}emit(t,...e){(this.all[t]||[]).slice().map((t=>{t(...e)})),(this.all["*"]||[]).slice().map((s=>{s(t,...e)}))}}{constructor(){if(super(),this.win="object"==typeof window&&window,this.ctx=this.win,this.h=this.ctx.history,!this.h)throw new Error("History API is not available");if(!this.ctx.location)throw new Error("Location API is not available");this.addEvent=this.ctx.addEventListener,this.addEvent&&this.ctx.addEventListener("popstate",(t=>{this.emit("popstate",t),this.emit("change",this.ctx.location,this.h.state,"popstate")}))}pushState(t,e,s){this.emit("pushState",t,e,s),this.h.pushState(t,e,s),this.emit("change",this.ctx.location,t,"pushState")}replaceState(t,e,s){this.emit("replaceState",t,e,s),this.h.replaceState(t,e,s),this.emit("change",this.ctx.location,t,"replaceState")}}class r{constructor(t){this.history=new i,this.base="",this.res={statusCode:200,finished:!1,end:(t,e)=>{t&&console.error(t)}},this.setCallback=t=>{let e=location&&location.pathname+location.search||"/";"/"!=this.base&&(e=e.replace(this.base,"")),this.req={method:"GET",url:e},t(this.req,this.res)},this.base="/"+(t||"").replace(/^\/|\/$/g,""),this.rgx="/"==this.base?/^\/+/:new RegExp("^\\"+this.base+"(?=\\/|$)\\/?","i")}navigate(t){this.req={method:"GET",url:t},this.history.pushState(this.req,"",t)}on(t,e){this.history.on(t,e)}listen(t){this.setCallback(t),addEventListener("click",(t=>{var e=t.target.closest("a"),s=e&&e.getAttribute("href");t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||t.button||t.defaultPrevented||s&&!e.target&&e.host===location.host&&("/"!=s[0]||this.rgx.test(s))&&(t.preventDefault(),this.history.pushState(this.req,"",s))})),this.history.on("change",((e,s,i)=>{this.setCallback(t)}))}}class h extends s{constructor(t){super(t),this.client=new r(t.base)}listen(){this.client.listen(this.handler)}on(t,e){return this.client.on(t,e),this}navigate(t){this.client.navigate(t)}}exports.Client=function({onError:t=((t,e,s)=>{console.error(t)}),onNoMatch:e=((t,e,s)=>{console.error("no match")}),base:s="/"}={}){return new h({onError:t,onNoMatch:e,base:s})};
