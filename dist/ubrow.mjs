function t(t,e){if(t instanceof RegExp)return{keys:[],pattern:t};var n,i,r,s,o=[],a="",h=t.split("/");for(h[0]||h.shift();r=h.shift();)"*"===(n=r[0])?(o.push("wild"),a+="/(.*)"):":"===n?(i=r.indexOf("?",1),s=r.indexOf(".",1),o.push(r.substring(1,~i?i:~s?s:r.length)),a+=~i&&!~s?"(?:/([^/]+?))?":"/([^/]+?)",~s&&(a+=(~i?"?":"")+"\\"+r.substring(s))):a+="/"+r;return{keys:o,pattern:new RegExp("^"+a+(e?"(?=$|/)":"/?$"),"i")}}var e=function(t,e){var n=t.url;if(null!=n){var i=t._parsedUrl;if(i&&i._raw===n)return i;if(i={path:n,pathname:n,search:null,query:null,href:n,_raw:n},n.length>1){e&&!t._decoded&&~n.indexOf("%",1)&&(n=t.url=i.href=i.path=i.pathname=i._raw=decodeURIComponent(n),t._decoded=!0);var r=n.indexOf("?",1);-1!==r&&(i.search=n.substring(r),i.query=i.search.substring(1),i.pathname=n.substring(0,r),e&&i.query.length>0&&(i.query=function(t){for(var e,n={},r=i.query.split("&"),s=0,o=void 0,a=void 0;s<r.length;s++)a=void 0===(a=(e=r[s].split("="))[1])?"":a,n[o=e[0]]=void 0!==n[o]?[].concat(n[o],a):a;return n}()))}return t._parsedUrl=i}},n=function(t){var n=this;void 0===t&&(t={}),this.routes=[],this.parse=e,this.handler=this.handler.bind(this),this.onError=t.onError||this.onErrorI,this.onNoMatch=t.onNoMatch||this.onError.bind(null,{code:404}),this.attach=function(t,e){return setTimeout(n.handler,0,t,e)},this.all=this.add.bind(this,""),this.get=this.add.bind(this,"GET"),this.head=this.add.bind(this,"HEAD"),this.patch=this.add.bind(this,"PATCH"),this.options=this.add.bind(this,"OPTIONS"),this.connect=this.add.bind(this,"CONNECT"),this.delete=this.add.bind(this,"DELETE"),this.trace=this.add.bind(this,"TRACE"),this.post=this.add.bind(this,"POST"),this.put=this.add.bind(this,"PUT")};n.prototype.useI=function(e){for(var n=[],i=arguments.length-1;i-- >0;)n[i]=arguments[i+1];var r=[].concat.apply([],n),s=t(e,!0);return this.routes.push({keys:s.keys,pattern:s.pattern,method:"",handlers:r}),this},n.prototype.use=function(t){for(var e,i,r,s=[],o=arguments.length-1;o-- >0;)s[o]=arguments[o+1];return"function"==typeof t?(e=this).useI.apply(e,["/",t].concat(s)):"/"===t?(i=this).useI.apply(i,[t].concat(s)):(r=this).useI.apply(r,[t,function(e,n,i){if("string"==typeof t){var r=t.length;0===t.indexOf("/")||r++,e.url=e.url.substring(r)||"/",e.path=e.path.substring(r)||"/"}else e.url=e.url.replace(t,"")||"/",e.path=e.path.replace(t,"")||"/";i()}].concat(s.map(function(t){return t instanceof n?t.attach:t}),[function(t,e,n){t.url=t._parsedUrl.href,t.path=t._parsedUrl.pathname,n()}])),this},n.prototype.onErrorI=function(t,e,n){n.statusCode=t.code||t.status||500,n.end(t.length&&t||t.message)},n.prototype.add=function(e,n){for(var i=[],r=arguments.length-2;r-- >0;)i[r]=arguments[r+2];var s=t(n),o=s.keys,a=s.pattern,h=[].concat.apply([],i);return this.routes.push({keys:o,pattern:a,method:e,handlers:h}),this},n.prototype.handler=function(t,e,n){var i=this,r=this.parse(t,!0),s=this.find(t.method,t.path=r.pathname);t.params=s.params,t.originalUrl=t.originalUrl||t.url,t.query=r.query||{},t.search=r.search;try{var o=0,a=s.handlers.concat(this.onNoMatch),h=a.length,l=function(){return e.finished||o<h&&a[o++](t,e,n)};n=n||function(r){return r?i.onError(r,t,e,n):l()},l()}catch(i){this.onError(i,t,e,n)}},n.prototype.find=function(t,e){for(var n,i,r="HEAD"===t,s=0,o=0,a=this.routes,h=[],l={},c=[];s<a.length;s++)if(0===(i=a[s]).method.length||i.method===t||r&&"GET"===i.method)if(0==i.keys.length){if(null===(h=i.pattern.exec(e)))continue;if(void 0!==h.groups)for(n in h.groups)l[n]=h.groups[n];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else if(i.keys.length>0){if(null===(h=i.pattern.exec(e)))continue;for(o=0;o<i.keys.length;)l[i.keys[o]]=h[++o];i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0])}else i.pattern.test(e)&&(i.handlers.length>1?c=c.concat(i.handlers):c.push(i.handlers[0]));return{params:l,handlers:c}};var i=function(t){this.all=t||Object.create(null)};i.prototype.on=function(t,e){(this.all[t]||(this.all[t]=[])).push(e)},i.prototype.off=function(t,e){this.all[t]&&this.all[t].splice(this.all[t].indexOf(e)>>>0,1)},i.prototype.emit=function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];(this.all[t]||[]).slice().map(function(t){t.apply(void 0,e)}),(this.all["*"]||[]).slice().map(function(n){n.apply(void 0,[t].concat(e))})};var r=function(t){function e(){var e=this;if(t.call(this),this.win=null,this.addEvent=null,this.h=null,this.win="object"==typeof window&&window,this.ctx=this.win,this.h=this.ctx.history,!this.h)throw new Error("History API is not available");if(!this.ctx.location)throw new Error("Location API is not available");this.addEvent=this.ctx.addEventListener,this.addEvent&&this.ctx.addEventListener("popstate",function(t){e.emit("popstate",t),e.emit("change",e.ctx.location,e.h.state,"popstate")})}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.pushState=function(t,e,n){this.emit("pushState",t,e,n),this.h.pushState(t,e,n),this.emit("change",this.ctx.location,t,"pushState")},e.prototype.replaceState=function(t,e,n){this.emit("replaceState",t,e,n),this.h.replaceState(t,e,n),this.emit("change",this.ctx.location,t,"replaceState")},e}(i),s=function(t){var e=this;this.history=new r,this.base=null,this.req=null,this.res={statusCode:200,finished:!1,end:function(t,e){t&&console.error(t)}},this.setCallback=function(t){var n=location&&location.pathname+location.search||"/";"/"!=e.base&&(n=n.replace(e.base,"")),e.req={method:"GET",url:n},t(e.req,e.res)},this.base="/"+(t||"").replace(/^\/|\/$/g,""),this.rgx="/"==this.base?/^\/+/:new RegExp("^\\"+this.base+"(?=\\/|$)\\/?","i")};s.prototype.navigate=function(t){this.req={method:"GET",url:t},this.history.pushState(this.req,"",t)},s.prototype.on=function(t,e){this.history.on(t,e)},s.prototype.listen=function(t){var e=this;this.setCallback(t),addEventListener("click",function(t){var n=t.target.closest("a"),i=n&&n.getAttribute("href");t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||t.button||t.defaultPrevented||i&&!n.target&&n.host===location.host&&("/"!=i[0]||e.rgx.test(i))&&(t.preventDefault(),e.history.pushState(e.req,"",i))}),this.history.on("change",function(n,i,r){e.setCallback(t)})};var o=function(t){function e(e){t.call(this,e),this.client=new s(e.base)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.listen=function(){this.client.listen(this.handler)},e.prototype.on=function(t,e){return this.client.on(t,e),this},e.prototype.navigate=function(t){this.client.navigate(t)},e}(n);function a(t){void 0===t&&(t={});var e=t.onError;void 0===e&&(e=function(t,e,n){console.error(t)});var n=t.onNoMatch;void 0===n&&(n=function(t,e,n){console.error("no match")});var i=t.base;return void 0===i&&(i="/"),new o({onError:e,onNoMatch:n,base:i})}export{a as Client};
