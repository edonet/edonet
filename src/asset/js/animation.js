!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};n.m=t,n.c=e,n.p="";var r=n(0);if("undefined"!=typeof module&&"object"==typeof exports)module.exports=r;else if("function"==typeof define&&(define.amd||define.cmd))define(function(t,n,e){return e.exports=r});else for(var i in r)r.hasOwnProperty(i)&&(window[i]=r[i])}([function(t,n,e){(function(t){"use strict";function r(){for(var t,n=[],e=y.length,i=0;e>i;i++)t=y[i],t.handler.call(t.context,t.argus)!==!1&&n.push(t);y=n,n.length&&f(r)}function i(t){return y.push(t),1===y.length&&r(),t}function s(t){t=t||{},this.initSuper(),this.begin=t.begin||0,this.end=t.end||100,this.duration=t.duration||1e3,this.easing=t.easing||"easa-in-out",this.handler=t.handler,this.nextTask=null,this.stateStack=[],this.progress=0,u(this,"ready"),o(this,t)}function o(t,n){t.on("start",n.onStart).on("finish",n.onFinish).on("pause",n.onPause).on("stop",n.onStop).on("cancel",n.onCancel)}function u(t,n){if(t.state===n||!h.isFunction(t.handler))return t;switch(t.request&&(t.request.argus.state="stop",t.request=null),n){case"start":t.progress<1&&a(t,1)&&h.setReadonlyProperty(t,"state",n).emit("start");break;case"cancel":t.progress>0&&a(t,0)&&h.setReadonlyProperty(t,"state",n).emit("cancel");break;case"stop":t.progress=0;default:h.setReadonlyProperty(t,"state",n).emit(n)}return t}function a(t,n){var e=t.progress,r=n-e,s=Math.abs(r)*t.duration,o=r/s,u=new p(t.easing),a=t.end-t.begin,c=+new Date;return t.request=i({context:t,argus:{state:"animating"},handler:function(t){if("animating"!==t.state)return!1;var r,i=new Date-c;return i>=s?(this.progress=n,r=this.begin+a*this.progress,this.handler.call(this,n,r),h.setReadonlyProperty(this,"state","finish"),this.request=null,this.emit("finish",r,this),!1):(this.progress=e+i*o,r=this.begin+a*u.invoke(this.progress),this.handler.call(this,this.progress,r),void 0)}})}var c="undefined"!=typeof window?window:t,f=c.requestAnimationFrame||c.webkitRequestAnimationFrame||c.mozRequestAnimationFrame||c.oRequestAnimationFrame||c.msRequestAnimationFrame||function(t){c.setTimeout(t,13)},h=e(1),p=e(3),l=e(4),y=[];s.prototype=h.inherit(l,{constructor:s,start:function(){return u(this,"start")},pause:function(){return u(this,"pause")},stop:function(){return u(this,"stop")},cancel:function(){return u(this,"cancel")}}),n.animation=function(t){return new s(t)},n.animate=function(t,n,e){return"function"==typeof t?i({argus:n,context:e,handler:t}):"object"==typeof t?new s(t).start():null}}).call(n,function(){return this}())},function(t,n){"use strict";function e(t){return null===t||isNaN(t)&&"number"==typeof t?t+"":Object.prototype.toString.call(t).slice(8,-1)}function r(t){return"string"==typeof t}function i(t){return"number"==typeof t&&isFinite(t)}function s(t){return"boolean"==typeof t}function o(t){return"function"==typeof t}function u(t){return Array.isArray?Array.isArray(t):"Array"===e(t)}function a(t){return t&&!u(t)&&"object"==typeof t}function c(t){return"RegExp"===e(t)}function f(t){var n,r,i=e(t);return"Array"===i||"String"===i?!0:!t||"number"!=typeof t.length||isNaN(t.length)?!1:(n=t.length-1,r=~~(Math.random()*n),void 0!==t[0]&&void 0!==t[r])}function h(t,n,e){return!!~v(n,t,e)}function p(t){return r(t)?void 0:""}function l(t,n){if("function"!=typeof n)return!1;if(f(t)){for(var e=t.length,r=0;e>r;r++)if(n.call(t,r,t[r],t)===!1)return!1;return!0}if(a(t)){var r;for(r in t)if((!t.hasOwnProperty||t.hasOwnProperty(r))&&n.call(t,r,t[r],t)===!1)return!1;return!0}return!1}function y(t,n){if(!f(t)||!o(n))return[];for(var e=t.length,r=[],i=0;e>i;i++)r.push(n.call(t,i,t[i],t));return r}function d(t,n){if(!f(t)||!o(n))return[];for(var e=t.length,r=[],i=0;e>i;i++)n.call(t,i,t[i],t)&&r.push(t[i]);return r}function v(t,n,e){if(!f(t))return-1;var r=t.length;for(e=i(e)?e:0;r>e;e++)if(n===t[e])return e;return-1}function g(t,n,e){if(!f(t))return-1;var r=t.length;for(e=i(e)&&r>e?e:r;e-- >0;)if(n===t[e])return e;return-1}function m(){var t={},n=d(arguments,function(n,e){return o(e)?b(t,e.prototype):(a(e)&&b(t,e),!1)});return t.initSuper=function(){var t=this,e=arguments;l(n,function(n,r){r.apply(t,e)})},t}function b(t,n){var e=function(){};return l(n,function(n,r){a(r)?(e.prototype=r,t[n]=new e,e.prototype=null):u(r)?t[n]=r.slice(0):t[n]=r}),t}function x(t,n,e,r){try{Object.defineProperty(t,n,e)}catch(i){t[n]=r}return t}function w(t,n,e){return t.hasOwnProperty(n)&&delete t[n],x(t,n,{configurable:!0,get:function(){return e}},e)}function P(t,n,e){return t.hasOwnProperty(n)?!1:x(t,n,{enumerable:!1,get:function(){return e}},e)}t.exports={type:e,isString:r,isNumber:i,isBoolean:s,isFunction:o,isArray:u,isObject:a,isRegExp:c,isArrayLike:f,inArray:h,trim:p,each:l,map:y,filter:d,indexOf:v,lastIndexOf:g,inherit:m,setReadonlyProperty:w,setPrivateProperty:P}},function(t,n){"use strict";function e(t,n,e,r){t=0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,this.cx=3*t,this.bx=3*(e-t)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*n,this.by=3*(r-n)-this.cy,this.ay=1-this.cy-this.by}var r=Math.abs;e.prototype={constructor:e,sampleCurveX:function(t){return((this.ax*t+this.bx)*t+this.cx)*t},sampleCurveY:function(t){return((this.ay*t+this.by)*t+this.cy)*t},sampleCurveDerivativeX:function(t){return(this.dx*t+this.ex)*t+this.cx},solveCurveX:function(t){for(var n,e,i,s,o=this,u=t,a=0,c=.001;8>a;a++){if(i=o.sampleCurveX(u)-t,r(i)<c)return u;if(s=o.sampleCurveDerivativeX(u),r(s)<1e-6)break;u-=i/s}if(n=0,e=1,u=t,n>u)return n;if(u>e)return e;for(;e>n;){if(i=o.sampleCurveX(u),r(i-t)<c)return u;t>i?n=u:e=u,u=.5*(e-n)+n}return u}},t.exports=function(t,n,r,i){var s=new e(t,n,r,i);return function(t){return 0>t?0:t>1?1:s.sampleCurveY(s.solveCurveX(t))}}},function(t,n,e){"use strict";function r(t){if("string"!=typeof t)return this.handler=s.linear,this;if(t=t.replace(/^\s+/,"").replace(/\s+$/,""),t in s)return this.handler=s[t],this;var n=/^cubic-bezier\(([\d\.\,\s]+)\)$/,e=t.match(n);return e&&e[1]&&(this.handler=r.bezier(t,e[1].split(/\s*,\s*/))),this}var i=e(2),s={linear:function(t){return t},"ease-in-out":function(t){return t-Math.sin(2*Math.PI*t)/(2*Math.PI)},"ease-in":function(t){return Math.pow(t,3)},"ease-out":function(t){return Math.pow(t-1,3)+1},"back-in":function(t){var n=1.70158;return t*t*((n+1)*t-n)},"back-out":function(t){t-=1;var n=1.70158;return t*t*((n+1)*t+n)+1},elastic:function(t){return.4>t?Math.pow(2.5*t,3):Math.sin(5*t*Math.PI)*Math.cos(.5*t*Math.PI)/3+1},bounce:function(t){var n=7.5625,e=2.75;return 1/e>t?n*t*t:2/e>t?(t-=1.5/e,n*t*t+.75):2.5/e>t?(t-=2.25/e,n*t*t+.9375):(t-=2.625/e,n*t*t+.984375)}};r.prototype.invoke=function(t){return this.handler(t)},r.create=function(t,n){return"string"!=typeof t||"function"!=typeof n?!1:s[t]=n},r.bezier=function(t,n){return"string"==typeof t&&n instanceof Array?s[t]=i.apply(this,n):!1},t.exports=r},function(t,n,e){"use strict";function r(){i.setPrivateProperty(this,"events",{})}var i=e(1);r.prototype={constructor:r,on:function(t,n){if(!i.isString(t)||!i.isFunction(n))return this;var e=this.events,r={cycle:!0,handler:n};return e[t]?e[t].push(r):e[t]=[r],this},one:function(t,n){if(!i.isString(t)||!i.isFunction(n))return this;var e=this.events,r={cycle:!1,handler:n};return e[t]?e[t].push(r):e[t]=[r],this},off:function(t,n){var e=this,r=e.events;return"undefined"==typeof t?i.each(r,function(t,n){r[t]=[]}):i.isString(t)&&("undefined"==typeof n?r[t]=[]:i.isFunction(n)&&(r[t]=i.filter(r[t],function(t,e){return e.handler!==n}))),this},emit:function(t,n,e){if(!i.isString(t))return this;var r=this.events[t]||[];return e="object"==typeof e?e:this,n=i.isArray(n)?n:[n],this.events[t]=i.filter(r,function(t,r){return r.handler.apply(e,n),r.cycle}),this}},t.exports=r}]);