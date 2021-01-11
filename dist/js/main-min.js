!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.anime=n()}(this,function(){"use strict";var e={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},n={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},t=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],r={CSS:{},springs:{}};function a(e,n,t){return Math.min(Math.max(e,n),t)}function o(e,n){return e.indexOf(n)>-1}function u(e,n){return e.apply(null,n)}var i={arr:function(e){return Array.isArray(e)},obj:function(e){return o(Object.prototype.toString.call(e),"Object")},pth:function(e){return i.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||i.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return i.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return i.hex(e)||i.rgb(e)||i.hsl(e)},key:function(t){return!e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&"targets"!==t&&"keyframes"!==t}};function c(e){var n=/\(([^)]+)\)/.exec(e);return n?n[1].split(",").map(function(e){return parseFloat(e)}):[]}function s(e,n){var t=c(e),o=a(i.und(t[0])?1:t[0],.1,100),u=a(i.und(t[1])?100:t[1],.1,100),s=a(i.und(t[2])?10:t[2],.1,100),l=a(i.und(t[3])?0:t[3],.1,100),f=Math.sqrt(u/o),d=s/(2*Math.sqrt(u*o)),p=d<1?f*Math.sqrt(1-d*d):0,g=1,m=d<1?(d*f-l)/p:-l+f;function h(e){var t=n?n*e/1e3:e;return t=d<1?Math.exp(-t*d*f)*(g*Math.cos(p*t)+m*Math.sin(p*t)):(g+m*t)*Math.exp(-t*f),0===e||1===e?e:1-t}return n?h:function(){var n=r.springs[e];if(n)return n;for(var t=0,a=0;;)if(1===h(t+=1/6)){if(++a>=16)break}else a=0;var o=t*(1/6)*1e3;return r.springs[e]=o,o}}function l(e){return void 0===e&&(e=10),function(n){return Math.ceil(a(n,1e-6,1)*e)*(1/e)}}var f,d,p=function(){var e=11,n=1/(e-1);function t(e,n){return 1-3*n+3*e}function r(e,n){return 3*n-6*e}function a(e){return 3*e}function o(e,n,o){return((t(n,o)*e+r(n,o))*e+a(n))*e}function u(e,n,o){return 3*t(n,o)*e*e+2*r(n,o)*e+a(n)}return function(t,r,a,i){if(0<=t&&t<=1&&0<=a&&a<=1){var c=new Float32Array(e);if(t!==r||a!==i)for(var s=0;s<e;++s)c[s]=o(s*n,t,a);return function(e){return t===r&&a===i?e:0===e||1===e?e:o(l(e),r,i)}}function l(r){for(var i=0,s=1,l=e-1;s!==l&&c[s]<=r;++s)i+=n;var f=i+(r-c[--s])/(c[s+1]-c[s])*n,d=u(f,t,a);return d>=.001?function(e,n,t,r){for(var a=0;a<4;++a){var i=u(n,t,r);if(0===i)return n;n-=(o(n,t,r)-e)/i}return n}(r,f,t,a):0===d?f:function(e,n,t,r,a){for(var u,i,c=0;(u=o(i=n+(t-n)/2,r,a)-e)>0?t=i:n=i,Math.abs(u)>1e-7&&++c<10;);return i}(r,i,i+n,t,a)}}}(),g=(f={linear:function(){return function(e){return e}}},d={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var n,t=4;e<((n=Math.pow(2,--t))-1)/11;);return 1/Math.pow(4,3-t)-7.5625*Math.pow((3*n-2)/22-e,2)}},Elastic:function(e,n){void 0===e&&(e=1),void 0===n&&(n=.5);var t=a(e,1,10),r=a(n,.1,2);return function(e){return 0===e||1===e?e:-t*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/t))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach(function(e,n){d[e]=function(){return function(e){return Math.pow(e,n+2)}}}),Object.keys(d).forEach(function(e){var n=d[e];f["easeIn"+e]=n,f["easeOut"+e]=function(e,t){return function(r){return 1-n(e,t)(1-r)}},f["easeInOut"+e]=function(e,t){return function(r){return r<.5?n(e,t)(2*r)/2:1-n(e,t)(-2*r+2)/2}},f["easeOutIn"+e]=function(e,t){return function(r){return r<.5?(1-n(e,t)(1-2*r))/2:(n(e,t)(2*r-1)+1)/2}}}),f);function m(e,n){if(i.fnc(e))return e;var t=e.split("(")[0],r=g[t],a=c(e);switch(t){case"spring":return s(e,n);case"cubicBezier":return u(p,a);case"steps":return u(l,a);default:return u(r,a)}}function h(e){try{return document.querySelectorAll(e)}catch(e){return}}function v(e,n){for(var t=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<t;o++)if(o in e){var u=e[o];n.call(r,u,o,e)&&a.push(u)}return a}function y(e){return e.reduce(function(e,n){return e.concat(i.arr(n)?y(n):n)},[])}function b(e){return i.arr(e)?e:(i.str(e)&&(e=h(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function M(e,n){return e.some(function(e){return e===n})}function x(e){var n={};for(var t in e)n[t]=e[t];return n}function w(e,n){var t=x(e);for(var r in e)t[r]=n.hasOwnProperty(r)?n[r]:e[r];return t}function k(e,n){var t=x(e);for(var r in n)t[r]=i.und(e[r])?n[r]:e[r];return t}function C(e){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(n)return n[1]}function I(e,n){return i.fnc(e)?e(n.target,n.id,n.total):e}function O(e,n){return e.getAttribute(n)}function B(e,n,t){if(M([t,"deg","rad","turn"],C(n)))return n;var a=r.CSS[n+t];if(!i.und(a))return a;var o=document.createElement(e.tagName),u=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;u.appendChild(o),o.style.position="absolute",o.style.width=100+t;var c=100/o.offsetWidth;u.removeChild(o);var s=c*parseFloat(n);return r.CSS[n+t]=s,s}function D(e,n,t){if(n in e.style){var r=n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[n]||getComputedStyle(e).getPropertyValue(r)||"0";return t?B(e,a,t):a}}function P(e,n){return i.dom(e)&&!i.inp(e)&&(!i.nil(O(e,n))||i.svg(e)&&e[n])?"attribute":i.dom(e)&&M(t,n)?"transform":i.dom(e)&&"transform"!==n&&D(e,n)?"css":null!=e[n]?"object":void 0}function S(e){if(i.dom(e)){for(var n,t=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;n=r.exec(t);)a.set(n[1],n[2]);return a}}function T(e,n,t,r){switch(P(e,n)){case"transform":return function(e,n,t,r){var a,u=o(n,"scale")?1:0+(o(a=n,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),i=S(e).get(n)||u;return t&&(t.transforms.list.set(n,i),t.transforms.last=n),r?B(e,i,r):i}(e,n,r,t);case"css":return D(e,n,t);case"attribute":return O(e,n);default:return e[n]||0}}function L(e,n){var t=/^(\*=|\+=|-=)/.exec(e);if(!t)return e;var r=C(e)||0,a=parseFloat(n),o=parseFloat(e.replace(t[0],""));switch(t[0][0]){case"+":return a+o+r;case"-":return a-o+r;case"*":return a*o+r}}function E(e,n){if(i.col(e))return function(e){return i.rgb(e)?(t=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n=e))?"rgba("+t[1]+",1)":n:i.hex(e)?(r=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(e,n,t,r){return n+n+t+t+r+r}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):i.hsl(e)?function(e){var n,t,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),o=parseInt(a[1],10)/360,u=parseInt(a[2],10)/100,i=parseInt(a[3],10)/100,c=a[4]||1;function s(e,n,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?e+6*(n-e)*t:t<.5?n:t<2/3?e+(n-e)*(2/3-t)*6:e}if(0==u)n=t=r=i;else{var l=i<.5?i*(1+u):i+u-i*u,f=2*i-l;n=s(f,l,o+1/3),t=s(f,l,o),r=s(f,l,o-1/3)}return"rgba("+255*n+","+255*t+","+255*r+","+c+")"}(e):void 0;var n,t,r,a}(e);if(/\s/g.test(e))return e;var t=C(e),r=t?e.substr(0,e.length-t.length):e;return n?r+n:r}function F(e,n){return Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2))}function A(e){for(var n,t=e.points,r=0,a=0;a<t.numberOfItems;a++){var o=t.getItem(a);a>0&&(r+=F(n,o)),n=o}return r}function N(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return o=e,2*Math.PI*O(o,"r");case"rect":return 2*O(a=e,"width")+2*O(a,"height");case"line":return F({x:O(r=e,"x1"),y:O(r,"y1")},{x:O(r,"x2"),y:O(r,"y2")});case"polyline":return A(e);case"polygon":return t=(n=e).points,A(n)+F(t.getItem(t.numberOfItems-1),t.getItem(0))}var n,t,r,a,o}function j(e,n){var t=n||{},r=t.el||function(e){for(var n=e.parentNode;i.svg(n)&&i.svg(n.parentNode);)n=n.parentNode;return n}(e),a=r.getBoundingClientRect(),o=O(r,"viewBox"),u=a.width,c=a.height,s=t.viewBox||(o?o.split(" "):[0,0,u,c]);return{el:r,viewBox:s,x:s[0]/1,y:s[1]/1,w:u,h:c,vW:s[2],vH:s[3]}}function q(e,n,t){function r(t){void 0===t&&(t=0);var r=n+t>=1?n+t:0;return e.el.getPointAtLength(r)}var a=j(e.el,e.svg),o=r(),u=r(-1),i=r(1),c=t?1:a.w/a.vW,s=t?1:a.h/a.vH;switch(e.property){case"x":return(o.x-a.x)*c;case"y":return(o.y-a.y)*s;case"angle":return 180*Math.atan2(i.y-u.y,i.x-u.x)/Math.PI}}function H(e,n){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=E(i.pth(e)?e.totalLength:e,n)+"";return{original:r,numbers:r.match(t)?r.match(t).map(Number):[0],strings:i.str(e)||n?r.split(t):[]}}function V(e){return v(e?y(i.arr(e)?e.map(b):b(e)):[],function(e,n,t){return t.indexOf(e)===n})}function $(e){var n=V(e);return n.map(function(e,t){return{target:e,id:t,total:n.length,transforms:{list:S(e)}}})}function W(e,n){var t=x(n);if(/^spring/.test(t.easing)&&(t.duration=s(t.easing)),i.arr(e)){var r=e.length;2!==r||i.obj(e[0])?i.fnc(n.duration)||(t.duration=n.duration/r):e={value:e}}var a=i.arr(e)?e:[e];return a.map(function(e,t){var r=i.obj(e)&&!i.pth(e)?e:{value:e};return i.und(r.delay)&&(r.delay=t?0:n.delay),i.und(r.endDelay)&&(r.endDelay=t===a.length-1?n.endDelay:0),r}).map(function(e){return k(e,t)})}function Z(e,n){var t=[],r=n.keyframes;for(var a in r&&(n=k(function(e){for(var n=v(y(e.map(function(e){return Object.keys(e)})),function(e){return i.key(e)}).reduce(function(e,n){return e.indexOf(n)<0&&e.push(n),e},[]),t={},r=function(r){var a=n[r];t[a]=e.map(function(e){var n={};for(var t in e)i.key(t)?t==a&&(n.value=e[t]):n[t]=e[t];return n})},a=0;a<n.length;a++)r(a);return t}(r),n)),n)i.key(a)&&t.push({name:a,tweens:W(n[a],e)});return t}var X={css:function(e,n,t){return e.style[n]=t},attribute:function(e,n,t){return e.setAttribute(n,t)},object:function(e,n,t){return e[n]=t},transform:function(e,n,t,r,a){if(r.list.set(n,t),n===r.last||a){var o="";r.list.forEach(function(e,n){o+=n+"("+e+") "}),e.style.transform=o}}};function Y(e,n){$(e).forEach(function(e){for(var t in n){var r=I(n[t],e),a=e.target,o=C(r),u=T(a,t,o,e),i=L(E(r,o||C(u)),u),c=P(a,t);X[c](a,t,i,e.transforms,!0)}})}function G(e,n){return v(y(e.map(function(e){return n.map(function(n){return function(e,n){var t=P(e.target,n.name);if(t){var r=function(e,n){var t;return e.tweens.map(function(r){var a=function(e,n){var t={};for(var r in e){var a=I(e[r],n);i.arr(a)&&1===(a=a.map(function(e){return I(e,n)})).length&&(a=a[0]),t[r]=a}return t.duration=parseFloat(t.duration),t.delay=parseFloat(t.delay),t}(r,n),o=a.value,u=i.arr(o)?o[1]:o,c=C(u),s=T(n.target,e.name,c,n),l=t?t.to.original:s,f=i.arr(o)?o[0]:l,d=C(f)||C(s),p=c||d;return i.und(u)&&(u=l),a.from=H(f,p),a.to=H(L(u,f),p),a.start=t?t.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=m(a.easing,a.duration),a.isPath=i.pth(o),a.isPathTargetInsideSVG=a.isPath&&i.svg(n.target),a.isColor=i.col(a.from.original),a.isColor&&(a.round=1),t=a,a})}(n,e),a=r[r.length-1];return{type:t,property:n.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(e,n)})})),function(e){return!i.und(e)})}function Q(e,n){var t=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=t?Math.max.apply(Math,e.map(function(e){return r(e)+e.duration})):n.duration,a.delay=t?Math.min.apply(Math,e.map(function(e){return r(e)+e.delay})):n.delay,a.endDelay=t?a.duration-Math.max.apply(Math,e.map(function(e){return r(e)+e.duration-e.endDelay})):n.endDelay,a}var z=0,_=[],R=function(){var e;function n(t){for(var r=_.length,a=0;a<r;){var o=_[a];o.paused?(_.splice(a,1),r--):(o.tick(t),a++)}e=a>0?requestAnimationFrame(n):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){K.suspendWhenDocumentHidden&&(J()?e=cancelAnimationFrame(e):(_.forEach(function(e){return e._onDocumentVisibility()}),R()))}),function(){e||J()&&K.suspendWhenDocumentHidden||!(_.length>0)||(e=requestAnimationFrame(n))}}();function J(){return!!document&&document.hidden}function K(t){void 0===t&&(t={});var r,o=0,u=0,i=0,c=0,s=null;function l(e){var n=window.Promise&&new Promise(function(e){return s=e});return e.finished=n,n}var f,d,p,g,m,h,y,b,M=(d=w(e,f=t),g=Z(p=w(n,f),f),y=Q(h=G(m=$(f.targets),g),p),b=z,z++,k(d,{id:b,children:[],animatables:m,animations:h,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));function x(){var e=M.direction;"alternate"!==e&&(M.direction="normal"!==e?"normal":"reverse"),M.reversed=!M.reversed,r.forEach(function(e){return e.reversed=M.reversed})}function C(e){return M.reversed?M.duration-e:e}function I(){o=0,u=C(M.currentTime)*(1/K.speed)}function O(e,n){n&&n.seek(e-n.timelineOffset)}function B(e){for(var n=0,t=M.animations,r=t.length;n<r;){var o=t[n],u=o.animatable,i=o.tweens,c=i.length-1,s=i[c];c&&(s=v(i,function(n){return e<n.end})[0]||s);for(var l=a(e-s.start-s.delay,0,s.duration)/s.duration,f=isNaN(l)?1:s.easing(l),d=s.to.strings,p=s.round,g=[],m=s.to.numbers.length,h=void 0,y=0;y<m;y++){var b=void 0,x=s.to.numbers[y],w=s.from.numbers[y]||0;b=s.isPath?q(s.value,f*x,s.isPathTargetInsideSVG):w+f*(x-w),p&&(s.isColor&&y>2||(b=Math.round(b*p)/p)),g.push(b)}var k=d.length;if(k){h=d[0];for(var C=0;C<k;C++){d[C];var I=d[C+1],O=g[C];isNaN(O)||(h+=I?O+I:O+" ")}}else h=g[0];X[o.type](u.target,o.property,h,u.transforms),o.currentValue=h,n++}}function D(e){M[e]&&!M.passThrough&&M[e](M)}function P(e){var n=M.duration,t=M.delay,f=n-M.endDelay,d=C(e);M.progress=a(d/n*100,0,100),M.reversePlayback=d<M.currentTime,r&&function(e){if(M.reversePlayback)for(var n=c;n--;)O(e,r[n]);else for(var t=0;t<c;t++)O(e,r[t])}(d),!M.began&&M.currentTime>0&&(M.began=!0,D("begin")),!M.loopBegan&&M.currentTime>0&&(M.loopBegan=!0,D("loopBegin")),d<=t&&0!==M.currentTime&&B(0),(d>=f&&M.currentTime!==n||!n)&&B(n),d>t&&d<f?(M.changeBegan||(M.changeBegan=!0,M.changeCompleted=!1,D("changeBegin")),D("change"),B(d)):M.changeBegan&&(M.changeCompleted=!0,M.changeBegan=!1,D("changeComplete")),M.currentTime=a(d,0,n),M.began&&D("update"),e>=n&&(u=0,M.remaining&&!0!==M.remaining&&M.remaining--,M.remaining?(o=i,D("loopComplete"),M.loopBegan=!1,"alternate"===M.direction&&x()):(M.paused=!0,M.completed||(M.completed=!0,D("loopComplete"),D("complete"),!M.passThrough&&"Promise"in window&&(s(),l(M)))))}return l(M),M.reset=function(){var e=M.direction;M.passThrough=!1,M.currentTime=0,M.progress=0,M.paused=!0,M.began=!1,M.loopBegan=!1,M.changeBegan=!1,M.completed=!1,M.changeCompleted=!1,M.reversePlayback=!1,M.reversed="reverse"===e,M.remaining=M.loop,r=M.children;for(var n=c=r.length;n--;)M.children[n].reset();(M.reversed&&!0!==M.loop||"alternate"===e&&1===M.loop)&&M.remaining++,B(M.reversed?M.duration:0)},M._onDocumentVisibility=I,M.set=function(e,n){return Y(e,n),M},M.tick=function(e){i=e,o||(o=i),P((i+(u-o))*K.speed)},M.seek=function(e){P(C(e))},M.pause=function(){M.paused=!0,I()},M.play=function(){M.paused&&(M.completed&&M.reset(),M.paused=!1,_.push(M),I(),R())},M.reverse=function(){x(),M.completed=!M.reversed,I()},M.restart=function(){M.reset(),M.play()},M.remove=function(e){ee(V(e),M)},M.reset(),M.autoplay&&M.play(),M}function U(e,n){for(var t=n.length;t--;)M(e,n[t].animatable.target)&&n.splice(t,1)}function ee(e,n){var t=n.animations,r=n.children;U(e,t);for(var a=r.length;a--;){var o=r[a],u=o.animations;U(e,u),u.length||o.children.length||r.splice(a,1)}t.length||r.length||n.pause()}return K.version="3.2.1",K.speed=1,K.suspendWhenDocumentHidden=!0,K.running=_,K.remove=function(e){for(var n=V(e),t=_.length;t--;)ee(n,_[t])},K.get=T,K.set=Y,K.convertPx=B,K.path=function(e,n){var t=i.str(e)?h(e)[0]:e,r=n||100;return function(e){return{property:e,el:t,svg:j(t),totalLength:N(t)*(r/100)}}},K.setDashoffset=function(e){var n=N(e);return e.setAttribute("stroke-dasharray",n),n},K.stagger=function(e,n){void 0===n&&(n={});var t=n.direction||"normal",r=n.easing?m(n.easing):null,a=n.grid,o=n.axis,u=n.from||0,c="first"===u,s="center"===u,l="last"===u,f=i.arr(e),d=f?parseFloat(e[0]):parseFloat(e),p=f?parseFloat(e[1]):0,g=C(f?e[1]:e)||0,h=n.start||0+(f?d:0),v=[],y=0;return function(e,n,i){if(c&&(u=0),s&&(u=(i-1)/2),l&&(u=i-1),!v.length){for(var m=0;m<i;m++){if(a){var b=s?(a[0]-1)/2:u%a[0],M=s?(a[1]-1)/2:Math.floor(u/a[0]),x=b-m%a[0],w=M-Math.floor(m/a[0]),k=Math.sqrt(x*x+w*w);"x"===o&&(k=-x),"y"===o&&(k=-w),v.push(k)}else v.push(Math.abs(u-m));y=Math.max.apply(Math,v)}r&&(v=v.map(function(e){return r(e/y)*y})),"reverse"===t&&(v=v.map(function(e){return o?e<0?-1*e:-e:Math.abs(y-e)}))}return h+(f?(p-d)/y:d)*(Math.round(100*v[n])/100)+g}},K.timeline=function(e){void 0===e&&(e={});var t=K(e);return t.duration=0,t.add=function(r,a){var o=_.indexOf(t),u=t.children;function c(e){e.passThrough=!0}o>-1&&_.splice(o,1);for(var s=0;s<u.length;s++)c(u[s]);var l=k(r,w(n,e));l.targets=l.targets||e.targets;var f=t.duration;l.autoplay=!1,l.direction=t.direction,l.timelineOffset=i.und(a)?f:L(a,f),c(t),t.seek(l.timelineOffset);var d=K(l);c(d),u.push(d);var p=Q(u,e);return t.delay=p.delay,t.endDelay=p.endDelay,t.duration=p.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t},K.easing=m,K.penner=g,K.random=function(e,n){return Math.floor(Math.random()*(n-e+1))+e},K});const MoonBath="M8 15.0741C8 23.3583 15.5 30.0741 15.5 30.0741C7.21573 30.0741 0.5 23.3583 0.5 15.0741C0.5 6.78979 7.21573 0.0740662 15.5 0.0740662C15.5 0.0740662 8 6.78979 8 15.0741Z",sunBath="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15Z",darkmood=document.querySelector("#Darkmood");let toggle=!1;document.body.classList.add(localStorage.getItem("theme")||"light-mode"),darkmood.addEventListener("click",()=>{const e=localStorage.getItem("theme");anime.timeline({duration:750,easing:"easeOutExpo"}).add({targets:".sun",d:[{value:toggle?sunBath:MoonBath}]}).add({targets:"#Darkmood",rotate:320},"-=350"),toggle?(toggle=!1,localStorage.setItem("theme","light-mode")):(toggle=!0,localStorage.setItem("theme","dark-mode")),"dark-mode"===e?(document.body.classList.remove("dark-mode"),document.body.classList.add(localStorage.getItem("theme"))):(document.body.classList.remove("light-mode"),document.body.classList.add(localStorage.getItem("theme")))});