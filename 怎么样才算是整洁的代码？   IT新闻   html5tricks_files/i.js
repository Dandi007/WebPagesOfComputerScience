(function(AD_CONFIG, LINKS, RT_CONFIG){
/*! Copyright 2014 Baidu Inc. All Rights Reserved. */
"";
"";
var baidu={version:"1.5.0"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.sio=baidu.sio||{};baidu.lang=baidu.lang||{};baidu.lang.isFunction=function(a){return"[object Function]"==Object.prototype.toString.call(a)};baidu.lang.isString=function(a){return"[object String]"==Object.prototype.toString.call(a)};baidu.isString=baidu.lang.isString;baidu.sio._createScriptTag=function(b,a,c){b.setAttribute("type","text/javascript");c&&b.setAttribute("charset",c);b.setAttribute("src",a);document.getElementsByTagName("head")[0].appendChild(b)};baidu.sio._removeScriptTag=function(b){if(b.clearAttributes){b.clearAttributes()}else{for(var a in b){if(b.hasOwnProperty(a)){delete b[a]}}}if(b&&b.parentNode){b.parentNode.removeChild(b)}b=null};baidu.sio.callByServer=function(a,m,n){var i=document.createElement("SCRIPT"),h="bd__cbs__",k,e,o=n||{},d=o.charset,f=o.queryField||"callback",l=o.timeOut||0,b,c=new RegExp("(\\?|&)"+f+"=([^&]*)"),g;
if(baidu.lang.isFunction(m)){k=h+Math.floor(Math.random()*2147483648).toString(36);window[k]=j(0)}else{if(baidu.lang.isString(m)){k=m}else{if(g=c.exec(a)){k=g[2]}}}if(l){b=setTimeout(j(1),l)}a=a.replace(c,"\x241"+f+"="+k);if(a.search(c)<0){a+=(a.indexOf("?")<0?"?":"&")+f+"="+k}baidu.sio._createScriptTag(i,a,d);function j(p){return function(){try{if(p){o.onfailure&&o.onfailure()}else{m.apply(window,arguments);clearTimeout(b)}window[k]=null;delete window[k]}catch(q){}finally{baidu.sio._removeScriptTag(i)}}}};baidu.array=baidu.array||{};baidu.array.removeAt=function(b,a){return b.splice(a,1)[0]};baidu.dom=baidu.dom||{};baidu.dom.g=function(a){if("string"==typeof a||a instanceof String){return document.getElementById(a)}else{if(a&&a.nodeName&&(a.nodeType==1||a.nodeType==9)){return a}}return null
};baidu.g=baidu.G=baidu.dom.g;baidu.dom._matchNode=function(a,c,d){a=baidu.dom.g(a);for(var b=a[d];b;b=b[c]){if(b.nodeType==1){return b}}return null};baidu.dom.next=function(a){return baidu.dom._matchNode(a,"nextSibling","nextSibling")};baidu.array.indexOf=function(e,b,d){var a=e.length,c=b;d=d|0;if(d<0){d=Math.max(0,a+d)}for(;d<a;d++){if(d in e&&e[d]===b){return d}}return -1};baidu.dom.first=function(a){return baidu.dom._matchNode(a,"nextSibling","firstChild")};baidu.page=baidu.page||{};baidu.page.getScrollLeft=function(){var a=document;return window.pageXOffset||a.documentElement.scrollLeft||a.body.scrollLeft};baidu.browser=baidu.browser||{};baidu.browser.ie=baidu.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?(document.documentMode||+RegExp["\x241"]):undefined;baidu.page.getViewHeight=function(){var b=document,a=b.compatMode=="BackCompat"?b.body:b.documentElement;
return a.clientHeight};baidu.dom.getDocument=function(a){a=baidu.dom.g(a);return a.nodeType==9?a:a.ownerDocument||a.document};baidu.dom._g=function(a){if(baidu.lang.isString(a)){return document.getElementById(a)}return a};baidu._g=baidu.dom._g;baidu.dom.getComputedStyle=function(b,a){b=baidu.dom._g(b);var d=baidu.dom.getDocument(b),c;if(d.defaultView&&d.defaultView.getComputedStyle){c=d.defaultView.getComputedStyle(b,null);if(c){return c[a]||c.getPropertyValue(a)}}return""};baidu.dom._styleFixer=baidu.dom._styleFixer||{};baidu.dom._styleFilter=baidu.dom._styleFilter||[];baidu.dom._styleFilter.filter=function(b,e,f){for(var a=0,d=baidu.dom._styleFilter,c;c=d[a];a++){if(c=c[f]){e=c(b,e)}}return e};baidu.string=baidu.string||{};baidu.string.toCamelCase=function(a){if(a.indexOf("-")<0&&a.indexOf("_")<0){return a
}return a.replace(/[-_][^-_]/g,function(b){return b.charAt(1).toUpperCase()})};baidu.dom.getStyle=function(c,b){var e=baidu.dom;c=e.g(c);b=baidu.string.toCamelCase(b);var d=c.style[b]||(c.currentStyle?c.currentStyle[b]:"")||e.getComputedStyle(c,b);if(!d){var a=e._styleFixer[b];if(a){d=a.get?a.get(c):baidu.dom.getStyle(c,a)}}if(a=e._styleFilter){d=a.filter(b,d,"get")}return d};baidu.getStyle=baidu.dom.getStyle;baidu.browser.opera=/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent)?+(RegExp["\x246"]||RegExp["\x242"]):undefined;baidu.browser.isWebkit=/webkit/i.test(navigator.userAgent);baidu.browser.isGecko=/gecko/i.test(navigator.userAgent)&&!/like gecko/i.test(navigator.userAgent);baidu.browser.isStrict=document.compatMode=="CSS1Compat";baidu.dom.getPosition=function(a){a=baidu.dom.g(a);
var j=baidu.dom.getDocument(a),d=baidu.browser,g=baidu.dom.getStyle,c=d.isGecko>0&&j.getBoxObjectFor&&g(a,"position")=="absolute"&&(a.style.top===""||a.style.left===""),h={left:0,top:0},f=(d.ie&&!d.isStrict)?j.body:j.documentElement,k,b;if(a==f){return h}if(a.getBoundingClientRect){b=a.getBoundingClientRect();h.left=Math.floor(b.left)+Math.max(j.documentElement.scrollLeft,j.body.scrollLeft);h.top=Math.floor(b.top)+Math.max(j.documentElement.scrollTop,j.body.scrollTop);h.left-=j.documentElement.clientLeft;h.top-=j.documentElement.clientTop;var i=j.body,l=parseInt(g(i,"borderLeftWidth")),e=parseInt(g(i,"borderTopWidth"));if(d.ie&&!d.isStrict){h.left-=isNaN(l)?2:l;h.top-=isNaN(e)?2:e}}else{k=a;do{h.left+=k.offsetLeft;h.top+=k.offsetTop;if(d.isWebkit>0&&g(k,"position")=="fixed"){h.left+=j.body.scrollLeft;
h.top+=j.body.scrollTop;break}k=k.offsetParent}while(k&&k!=a);if(d.opera>0||(d.isWebkit>0&&g(a,"position")=="absolute")){h.top-=j.body.offsetTop}k=a.offsetParent;while(k&&k!=j.body){h.left-=k.scrollLeft;if(!d.opera||k.tagName!="TR"){h.top-=k.scrollTop}k=k.offsetParent}}return h};baidu.lang.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)};baidu.lang.toArray=function(b){if(b===null||b===undefined){return[]}if(baidu.lang.isArray(b)){return b}if(typeof b.length!=="number"||typeof b==="string"||baidu.lang.isFunction(b)){return[b]}if(b.item){var a=b.length,c=new Array(a);while(a--){c[a]=b[a]}return c}return[].slice.call(b)};baidu.page.getViewWidth=function(){var b=document,a=b.compatMode=="BackCompat"?b.body:b.documentElement;return a.clientWidth};baidu.page.getScrollTop=function(){var a=document;
return window.pageYOffset||a.documentElement.scrollTop||a.body.scrollTop};baidu.dom.prev=function(a){return baidu.dom._matchNode(a,"previousSibling","previousSibling")};baidu.cookie=baidu.cookie||{};baidu.cookie._isValidKey=function(a){return(new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24')).test(a)};baidu.cookie.setRaw=function(c,d,b){if(!baidu.cookie._isValidKey(c)){return}b=b||{};var a=b.expires;if("number"==typeof b.expires){a=new Date();a.setTime(a.getTime()+b.expires)}document.cookie=c+"="+d+(b.path?"; path="+b.path:"")+(a?"; expires="+a.toGMTString():"")+(b.domain?"; domain="+b.domain:"")+(b.secure?"; secure":"")};baidu.cookie.remove=function(b,a){a=a||{};a.expires=new Date(0);baidu.cookie.setRaw(b,"",a)};(function(){var a=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");
baidu.string.trim=function(b){return String(b).replace(a,"")}})();baidu.trim=baidu.string.trim;baidu.string.escapeReg=function(a){return String(a).replace(new RegExp("([.*+?^=!:\x24{}()|[\\]/\\\\])","g"),"\\\x241")};baidu.dom.q=function(h,e,b){var j=[],d=baidu.string.trim,g,f,a,c;if(!(h=d(h))){return j}if("undefined"==typeof e){e=document}else{e=baidu.dom.g(e);if(!e){return j}}b&&(b=d(b).toUpperCase());if(e.getElementsByClassName){a=e.getElementsByClassName(h);g=a.length;for(f=0;f<g;f++){c=a[f];if(b&&c.tagName!=b){continue}j[j.length]=c}}else{h=new RegExp("(^|\\s)"+baidu.string.escapeReg(h)+"(\\s|\x24)");a=b?e.getElementsByTagName(b):(e.all||e.getElementsByTagName("*"));g=a.length;for(f=0;f<g;f++){c=a[f];h.test(c.className)&&(j[j.length]=c)}}return j};baidu.q=baidu.Q=baidu.dom.q;baidu.browser.firefox=/firefox\/(\d+\.\d+)/i.test(navigator.userAgent)?+RegExp["\x241"]:undefined;
baidu.json=baidu.json||{};baidu.json.parse=function(a){return(new Function("return ("+a+")"))()};baidu.dom.getAncestorBy=function(a,b){a=baidu.dom.g(a);while((a=a.parentNode)&&a.nodeType==1){if(b(a)){return a}}return null};baidu.lang.inherits=function(g,e,d){var c,f,a=g.prototype,b=new Function();b.prototype=e.prototype;f=g.prototype=new b();for(c in a){f[c]=a[c]}g.prototype.constructor=g;g.superClass=e.prototype;if("string"==typeof d){f._className=d}};baidu.inherits=baidu.lang.inherits;baidu.cookie.getRaw=function(b){if(baidu.cookie._isValidKey(b)){var c=new RegExp("(^| )"+b+"=([^;]*)(;|\x24)"),a=c.exec(document.cookie);if(a){return a[2]||null}}return null};baidu.cookie.get=function(a){var b=baidu.cookie.getRaw(a);if("string"==typeof b){b=decodeURIComponent(b);return b}return null};baidu.url=baidu.url||{};
baidu.url.escapeSymbol=function(a){return String(a).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g,function(b){return"%"+(256+b.charCodeAt()).toString(16).substring(1).toUpperCase()})};baidu.object=baidu.object||{};baidu.object.each=function(e,c){var b,a,d;if("function"==typeof c){for(a in e){if(e.hasOwnProperty(a)){d=e[a];b=c.call(e,d,a);if(b===false){break}}}}return e};baidu.url.jsonToQuery=function(c,e){var a=[],d,b=e||function(f){return baidu.url.escapeSymbol(f)};baidu.object.each(c,function(g,f){if(baidu.lang.isArray(g)){d=g.length;while(d--){a.push(f+"="+b(g[d],f))}}else{a.push(f+"="+b(g,f))}});return a.join("&")};baidu.json.stringify=(function(){var b={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function a(f){if(/["\\\x00-\x1f]/.test(f)){f=f.replace(/["\\\x00-\x1f]/g,function(g){var h=b[g];
if(h){return h}h=g.charCodeAt();return"\\u00"+Math.floor(h/16).toString(16)+(h%16).toString(16)})}return'"'+f+'"'}function d(m){var g=["["],h=m.length,f,j,k;for(j=0;j<h;j++){k=m[j];switch(typeof k){case"undefined":case"function":case"unknown":break;default:if(f){g.push(",")}g.push(baidu.json.stringify(k));f=1}}g.push("]");return g.join("")}function c(f){return f<10?"0"+f:f}function e(f){return'"'+f.getFullYear()+"-"+c(f.getMonth()+1)+"-"+c(f.getDate())+"T"+c(f.getHours())+":"+c(f.getMinutes())+":"+c(f.getSeconds())+'"'}return function(k){switch(typeof k){case"undefined":return"undefined";case"number":return isFinite(k)?String(k):"null";case"string":return a(k);case"boolean":return String(k);default:if(k===null){return"null"}else{if(k instanceof Array){return d(k)}else{if(k instanceof Date){return e(k)
}else{var g=["{"],j=baidu.json.stringify,f,i;for(var h in k){if(Object.prototype.hasOwnProperty.call(k,h)){i=k[h];switch(typeof i){case"undefined":case"unknown":case"function":break;default:if(f){g.push(",")}f=1;g.push(j(h)+":"+j(i))}}}g.push("}");return g.join("")}}}}}})();;
var l,p=p||{};p.global=this;p.ua=!0;p.wa="en";p.va=!0;p.qa=function(a){return void 0!==a};p.pa=function(a,b,c){a=a.split(".");c=c||p.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&p.qa(b)?c[d]=b:c=c[d]?c[d]:c[d]={}};p.ya=function(a,b,c){p.pa(a,b,c)};p.xa=function(a,b,c){a[b]=c};p.Aa=function(){return!1};p.Ba=function(){};p.za=function(){};var q=[];function r(a,b,c){function d(b){c.call(a,b)}b=b.replace(/^on/i,"");"string"===typeof a&&(a=document.getElementById(a));var e=b;b=b.toLowerCase();a.addEventListener?a.addEventListener(e,d,!1):a.attachEvent&&a.attachEvent("on"+e,d);q[q.length]=[a,b,c,d,e]}
function s(a,b,c){"string"===typeof a&&(a=document.getElementById(a));b=b.replace(/^on/i,"").toLowerCase();for(var d=q.length,e=!c,f,g;d--;)f=q[d],f[1]!==b||f[0]!==a||!e&&f[2]!==c||(g=f[4],f=f[3],a.removeEventListener?a.removeEventListener(g,f,!1):a.detachEvent&&a.detachEvent("on"+g,f),q.splice(d,1))}function t(a){a.preventDefault?a.preventDefault():a.returnValue=!1};var u;u=function(a,b,c){var d,e,f=a.length;if("function"===typeof b)for(e=0;e<f&&(d=a[e],d=b.call(c||a,d,e),!1!==d);e++);};var v;if(v=/msie (\d+\.\d)/i.exec(navigator.userAgent))var y=document.documentMode||+v[1];v=/firefox\/(\d+\.\d)/i.exec(navigator.userAgent);function z(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function aa(a){var b=Object.prototype.hasOwnProperty,c;if(!(a&&"[object Object]"===Object.prototype.toString.call(a)&&"isPrototypeOf"in a)||a.constructor&&!b.call(a,"constructor")&&!b.call(a.constructor.prototype,"isPrototypeOf"))return!1;for(c in a);return void 0===c||b.call(a,c)};var ba="function"===typeof"".trim?function(a){return String(a).trim()}:function(a){return String(a).replace(/(^[\s\t\xa0\u3000\ufeff]+)|([\ufeff\u3000\xa0\s\t]+$)/g,"")};
function ea(a,b){a=String(a);var c=arguments[1];if("undefined"!==typeof c){if(aa(c))return a.replace(/\$\{(.+?)\}/g,function(a,b){var d=c[b];"function"===typeof d&&(d=d(b));return"undefined"===typeof d?"":d});var d=Array.prototype.slice.call(arguments,1),e=d.length;return a.replace(/\{(\d+)\}/g,function(a,c){c=parseInt(c,10);return c>=e?a:d[c]})}return a};function fa(a){this.r=a||document}l=fa.prototype;l.g=function(a){return"[object String]"===Object.prototype.toString.call(a)?this.r.getElementById(a):a&&a.nodeName&&(1===a.nodeType||9===a.nodeType)?a:null};l.D=null;l.J=null;function ga(a){var b=B;b.D=a;var c=b.r.head||b.r.getElementsByTagName("head")[0]||b.r.body;c.insertBefore(a,c.firstChild);b.D=null}
function ha(){var a=B;if(a.D)return a.D;if(a.J&&"interactive"===a.J.readyState)return a.J;for(var b=a.r.getElementsByTagName("script"),c=b.length;c--;){var d=b[c];if("interactive"===d.readyState)return a.J=d}return null}l.remove=function(a){(a=this.g(a))&&a.parentNode&&a.parentNode.removeChild(a)};function C(a){a=B.g(a);var b=baidu.dom.getPosition(a);b.width=a.offsetWidth;b.height=a.offsetHeight;return b}
l.contains=function(a,b){a=this.g(a);b=this.g(b);return a.contains?a!==b&&a.contains(b):!!(a.compareDocumentPosition(b)&16)};l.getComputedStyle=function(a,b){a=this.g(a);var c=a.ownerDocument;return c.defaultView&&c.defaultView.getComputedStyle&&(c=c.defaultView.getComputedStyle(a,null))?c[b]||c.getPropertyValue(b):""};
l.getStyle=function(a,b){a=this.g(a);b=baidu.string.toCamelCase(b);var c=(a.currentStyle?a.currentStyle[b]:"")||this.getComputedStyle(a,b);if(!c||"auto"===c){var d=E[b];d&&(c=d.get?d.get(a,b,c):this.getStyle(a,d))}if(G)for(var d=b,e=0,f;f=G[e];e++)(f=f.get)&&(c=f(d,c));return c};var E=E||{};
E.display=y&&8>y?{set:function(a,b){var c=a.style;"inline-block"===b?(c.display="inline",c.zoom=1):c.display=b}}:baidu.browser.firefox&&3>baidu.browser.firefox?{set:function(a,b){a.style.display="inline-block"===b?"-moz-inline-box":b}}:null;E["float"]=baidu.browser.ie?"styleFloat":"cssFloat";
E.opacity=baidu.browser.ie?{get:function(a){return(a=a.style.filter)&&0<=a.indexOf("opacity=")?parseFloat(a.match(/opacity=([^)]*)/)[1])/100+"":"1"},set:function(a,b){var c=a.style;c.filter=(c.filter||"").replace(/alpha\([^\)]*\)/gi,"")+(1==b?"":"alpha(opacity="+100*b+")");c.zoom=1}}:null;var G=G||[];
G[G.length]={get:function(a,b){if(/color/i.test(a)&&-1!==b.indexOf("rgb(")){var c=b.split(",");b="#";for(var d=0,e;e=c[d];d++)e=parseInt(e.replace(/[^\d]/gi,""),10).toString(16),b+=1===e.length?"0"+e:e;b=b.toUpperCase()}return b}};G[G.length]={set:function(a,b){b.constructor!==Number||/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(a)||(b+="px");return b}};var B=new fa;var H={},I=[];function ia(a,b){function c(){d++;d>=e&&b.apply(null,ja(a))}"string"===typeof a&&(a=[a]);for(var d=0,e=a.length,f=0;f<e;f++)ka(a[f],c)}function ja(a){for(var b=[],c=0;c<a.length;c++)b.push(H[a[c]]||null);return b}
function ka(a,b){function c(){var a=d.readyState;if("undefined"===typeof a||/^(?:loaded|complete)$/.test(a))if(a=d.src,d=d.onload=d.onreadystatechange=null,H[a])b(H[a]);else{var c=I.pop();c&&(H[a]=c,b(c))}}if(H[a])b(H[a]);else{var d=la();d.src=a;document.addEventListener?d.onload=c:d.readyState&&(d.onreadystatechange=c);ga(d)}}function la(){var a=document.createElement("script");a.type="text/javascript";a.charset="utf-8";a.async=!0;return a}
window.ECMA_define=window.ECMA_define||function(a){var b=ha();b?(a=a(),(b=b.src)?H[b]=a:I.push(a)):(b=a(),I.push(b))};window.ECMA_require=window.ECMA_require||function(a,b){ia(a,b)};function ma(a){this.o=a}ma.prototype.get=function(a,b){return a in this.o?this.o[a]:b};"object"!==typeof RT_CONFIG||RT_CONFIG.HOST||(RT_CONFIG.HOST=function(a){return"http://"+a});function J(){return Math.floor(2147483648*Math.random()).toString(36)}var na={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object","[object Error]":"error"},oa=Object.prototype.toString;
function pa(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?na[oa.call(a)]||"object":typeof a}function L(a,b,c){for(var d in b)if(b.hasOwnProperty(d)&&(c||!a.hasOwnProperty(d))){var e=pa(b[d]);if("object"===e||"array"===e){var f=pa(a[d]);"object"!==f&&"array"!==f&&(a[d]="object"===e?{}:[]);L(a[d],b[d],c)}else a[d]=b[d]}}var M={},N={};function O(a,b){qa();var c=setTimeout(a,b);M[c]=!0;return c}function P(a){a&&(delete M[a],clearTimeout(a))}var ra=!1;
function qa(){ra||(ta(function(){for(var a in M)M.hasOwnProperty(a)&&P(parseInt(a,10));for(a in N)if(N.hasOwnProperty(a)){var b=parseInt(a,10);b&&(delete N[b],clearInterval(b))}}),ra=!0)}function ta(a){var b;a:{b=["bds","comm","registerUnloadHandler"];for(var c=window,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}"function"===typeof b&&b(a)};function Q(){}Q.prototype.rendDone=function(){};Q.prototype.addListener=function(){};Q.prototype.getImg=function(){};Q.prototype.getImgWrapper=function(){};Q.prototype.getCanvas=function(){};Q.prototype.getImgIndex=function(){};Q.prototype.getImgRect=function(){};Q.prototype.setShareData=function(){};Q.prototype.getShareData=function(){};Q.prototype.recordTime=Q.prototype.j=function(){};Q.prototype.getRecordedTime=function(){};Q.prototype.getRenderUrl=function(){};Q.prototype.getLoaderConfig=function(){};
Q.prototype.fa=function(){};Q.prototype.getRenderId=function(){};function ua(a,b){this.t="f21ac82b21eeb7322631b6aa94e17f45"+J();this.na=this.render();a.insertBefore(this.na,a.firstChild);va(this,b)}function va(a,b){var c=B.g(a.t+"-icon");r(c,"mouseover",function(a){t(a);c.nextSibling.style.display="block";b("tipmouseover")});r(c,"mouseout",function(a){t(a);c.nextSibling.style.display="none";b("tipmouseout")});r(c,"click",function(a){t(a);b("tipclick")})}
ua.prototype.render=function(){var a=document.createElement("div");a.id=this.t;a.innerHTML='<a href="javascript:void(0);" id="'+this.t+'-icon" data-action="icon"></a><div>\u67e5\u770b\u6807\u8bc6\u83b7\u53d6\u66f4\u591a\u4fe1\u606f</div>';var b=a.childNodes[0],c=ea("#${domId} {position:absolute;top:0;left:0;right:auto;bottom:auto;margin:0;padding:0;border:0;width:200px;background:transparent;}#${domId} div{float:left;width:144px;height:17px;line-height:17px;margin:3px 0 0 -2px;background:url(${TIP_BACK_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${TIP_BACK_URL}');font-family:sans-serif;text-align:center;font-size:12px;color:#666;padding:8px 10px;display:none;}#${domId}-icon {float:left;height:38px;width:38px;cursor:default;background:url(${ICON_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_URL}');}#${domId}-icon:hover {float:left;height:38px;width:38px;background:url(${ICON_HOVER_URL}) 0 0 no-repeat;_background:0;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='corp',src='${ICON_HOVER_URL}');}",
{domId:this.t,TIP_BACK_URL:"http://ecma.bdimg.com/public03/imageplus/tip-back.png",ICON_URL:"http://ecma.bdimg.com/public03/imageplus/tip.png",ICON_HOVER_URL:"http://ecma.bdimg.com/public03/imageplus/tip-hover.png"}),d=B.r,e=b.parentNode;if(e){var f=d.createElement("style");f.type="text/css";f.media="screen";e.insertBefore(f,b);f.styleSheet?f.styleSheet.cssText=c:f.appendChild(d.createTextNode(c))}return a};function R(a){this.c=this.l=0;this.a=[];this.F=[];this.config=a;this.la=Math.ceil(new Date/36E5);this.N={};this.n=null}R.prototype.U=function(){};R.prototype.da=function(){};R.prototype.ga=function(){};
function wa(a,b){var c=a.getImgIndex(b);if(!c){var c=++a.c,d=a.da(b);r(d,"mouseover",function(b){S(a,b.relatedTarget||b.fromElement,c)||a.b(c,"mouseover")});r(d,"mouseout",function(b){S(a,b.relatedTarget||b.toElement,c)||a.b(c,"mouseout")});r(d,"mousemove",function(d){(d.target||d.srcElement)!==b&&a.b(c,"mousemove")});r(b,"mouseover",function(b){S(a,b.relatedTarget||b.fromElement,c)||a.b(c,"mouseover")});r(b,"mouseout",function(b){S(a,b.relatedTarget||b.toElement,c)||a.b(c,"mouseout")});r(b,"mousemove",
function(){a.b(c,"mousemove")});a.a[c]={h:b,d:d,canvas:{},w:{},M:"",ra:!1};a.l++}return c}function S(a,b,c){a=a.a[c];if(!a||null==b)return!1;if(a.h===b||B.contains(a.d,b))return!0;var d=!1;a.links&&u(a.links,function(a){if(a===b||B.contains(a,b))return d=!0,!1});return d}
function xa(a,b){var c=a.a[b];if(c){a.b(b,"release");var d=c.canvas,e;for(e in d)B.remove(e);c.M&&B.remove(c.M);d=c.h;s(d,"mouseover");s(d,"mouseout");c=c.d;s(c,"mouseover");s(c,"mouseout");a.ga(b);delete a.a[b];delete a.F[b];a.l--}}
function ya(a,b,c,d){var e="string"===typeof c?c:c.url;c="string"===typeof c?"":c.id;var f=new U(a,b),g=f.getImgWrapper();if(g)f.ba=e,f.fa(c),c=e,c=-1!==c.indexOf("?")?c+"&":c+"?",c+="cacheTime="+a.la,ECMA_require(c,function(c){if(null!=a.a[b]&&B.contains(document.documentElement,g)){a.N[e]||(a.N[e]=c.get("AD_CONFIG"));var k=baidu.json.parse(baidu.json.stringify(a.N[e])),h=k.id||"f21ac82b21eeb7322631b6aa94e17f45"+b+J();d.id=h;a.b(b,"renderloaded",e,h);var m=a.config.get("adConfig");m&&L(k,m,!0);L(k,
d,!0);k.api=f;c.set("AD_CONFIG",k);k=document.createElement("div");k.id=h;k.style.margin="0px";k.style.padding="0px";k.style.border="none";k.style.overflow="visible";k.style.textAlign="left";g.appendChild(k);a.a[b].canvas[h]=k;f.A=h;c.start(!0,!0)}});else throw Error("LOADER: Run `setupImg` before `createCanvas`!");}function za(a,b){var c=a.a[b];if(c&&!c.M){var d=new ua(c.d,function(){var c=[].slice.call(arguments,0);c.unshift(b);a.b.apply(a,c)});c.M=d.t}}
R.prototype.b=function(a,b,c){var d=this.F[a];if(d){var e;"string"!==typeof b&&(e=b,b=b.type);if((d=d[b])&&0!==d.length){var f=Array.prototype.slice.call(arguments,2);e?e.imgIndex=a:e={imgIndex:a,id:J(),type:b};f.unshift(e);for(var g=0,n=d.length;g<n;g++)e=d[g],e.apply(null,f)}}};R.prototype.getImgIndex=function(a){if("number"===typeof a)return a;for(var b=this.a,c=1,d=b.length;c<d;c++)if(b[c]&&b[c].h===a)return c;return 0};function V(a,b){for(var c=a.a,d=1,e=c.length;d<e;d++)c[d]&&b(c[d],d)}
R.prototype.j=function(a,b,c,d){if(a=this.a[a])a.w[b]=a.w[b]||[],a.w[b].push("string"===typeof c?{type:c,time:d}:c)};R.prototype.addListener=function(a,b,c){var d=this.F[a];d||(d=this.F[a]={});d[b]||(d[b]=[]);d[b].push(c)};function U(a,b){this.f=a;this.c=b;this.aa=this.ba=this.A="";this.version="1.0.1"}U.prototype.rendDone=function(a){var b=this.f;a&&za(b,this.c);b.a[this.c].ra=!0};U.prototype.addListener=function(a,b){this.f.addListener(this.c,a,b)};
U.prototype.getImg=function(){var a=this.f.a[this.c];return a?a.h:null};U.prototype.getImgWrapper=function(){var a=this.f.a[this.c];return a?a.d:null};U.prototype.getCanvas=function(){var a=this.f.a[this.c];return a&&a.canvas?a.canvas[this.A]:null};U.prototype.getImgIndex=function(){return this.c};U.prototype.getImgRect=function(){var a=this.f.a[this.c];return a.rect||C(a.h)};U.prototype.setShareData=function(a,b,c){var d=this.f;if(c)d.n=d.n||{},d.n[a]=b;else if(c=d.a[this.c])c.L=c.L||{},c.L[a]=b};
U.prototype.getShareData=function(a,b){if(b){var c=this.f.n;return c?c[a]||null:null}return(c=this.f.a[this.c])&&c.L?c.L[a]:null};U.prototype.recordTime=U.prototype.j=function(a,b){this.f.j(this.c,this.A,a,b)};U.prototype.getRecordedTime=function(){var a=this.f.a[this.c];return a&&a.w?a.w[this.A]:null};U.prototype.getRenderUrl=function(){return this.ba};U.prototype.fa=function(a){this.aa=a};U.prototype.getRenderId=function(){return this.aa};
U.prototype.getLoaderConfig=function(a,b){var c=this.f.config;return c.get.apply(c,arguments)};function W(a){R.call(this,a);(a=baidu.cookie.get("baiduImageplusQid"))&&baidu.cookie.remove("baiduImageplusQid",{path:"/"});a=this.$=a||J()+(new Date).getTime();this.n=this.n||{};this.n.qid=a;this.p=this.config.get("maxAdCount");this.B=this.C=0;this.m={};this.P={};this.ia=document.getElementsByTagName("img").length;this.ja=!1;this.ka=[];this.ma=this.T=0;this.O=null}baidu.inherits(W,R);
function X(a){a=(a=a.config.get("imgContainerId"))?B.g(a):document;return baidu.lang.toArray("img"===a.nodeName.toLowerCase()?[a]:a.getElementsByTagName("img"))}l=W.prototype;l.U=function(){function a(){Aa(b);b.X();b.ja=!0;u(b.ka,function(a){a()})}var b=this;b.config.get("autoStart")&&("complete"===document.readyState?a():r(window,"load",a))};
function Aa(a){var b=a.l;0<b&&V(a,function(c,b){Ba(a,b)});if(b<a.p){var c=X(a),d=function(){if(c.length&&!(a.l>=a.p)){var b=c.shift();Ca(a.config,b)?a.V(b,function(c){c?(Da(a,b),O(d,500)):d()}):d()}};d()}}
l.V=function(a,b){var c=this,d=c.getImgIndex(a);if(d)Ba(c,d),b&&b(d);else if(c.l>=c.p)b&&b(0);else if(Ea(c,a))b&&b(0);else{var e=(new Date).getTime();Fa(a,function(d){if(!d||c.l>=c.p)b&&b(0);else{a.baiduImageplusRect=Y(a);var g=(new Date).getTime();c.getData(a,function(d){if(!d||c.l>=c.p)b&&b(0);else{for(var f=(new Date).getTime(),h=decodeURIComponent(a.src),m,w,A,x,D=!1,F=!1,Ya=function(a,b,d){if(a.imgIndex===m){for(var n in c.m)c.j(m,d,n,c.m[n]);c.j(m,d,"found",e);c.j(m,d,"loading",g);c.j(m,d,"loaded",
f);c.j(m,d,"render_loaded",(new Date).getTime());c.j(m,d,"ad_count",c.T);c.j(m,d,"pg_rect",Ga());a=K.rect;c.j(m,d,"img_rect",[a.top,a.left,a.width,a.height].join("_"))}},ca=0,Za=d.length;ca<Za;ca++)if(w=d[ca],A=w.ads,A.length){for(var da=0,$a=A.length;da<$a;da++)if(x=A[da],h===x.image){var sa=Ha(c,w.render);if(sa){x.position_type=w.position_type;w.box&&(x.box=x.box||{},L(x.box,w.box,!0));if(!F){D=a.baiduImageplusRect;m=wa(c,a);c.T++;var K=c.a[m],F=Y(a);K.rect=D||F;F.width<c.config.minWidth||F.height<
c.config.minHeight?(K.u=!1,K.d.style.display="none"):K.u=Ia(c,a);F=!0;c.addListener(m,"renderloaded",Ya)}ya(c,m,{url:sa,id:w.render_id},x);D=!0}}D&&Ja(c,m)}b&&b(m||0)}})}})}};function Ha(a,b){var c=a.config.get("renderReplaceRules");if(!c)return b;for(var d in c){var e=RegExp(d);if(b.match(e))return(c=c[d])?b.replace(e,c):""}return b}
l.ea=function(a){if(a=this.getImgIndex(a)){var b=this.a[a];b.links&&(u(b.links,function(a){s(a,"mouseover");s(a,"mouseout");s(a,"mousemove")}),b.links.length=0);xa(this,a);this.T--}};l.da=function(a){var b=document.createElement("div");b.style.cssText="position:absolute;border:0;margin:0;padding:0;height:0;overflow:visible;text-align:left;";Ka(b,a);document.body.appendChild(b);var c=a.baiduImageplusRect;a.baiduImageplusRect=null;La(this,c,b);return b};
function La(a,b,c){b=b.nodeName?Y(b):b;var d=a.O;d||("static"===B.getStyle(document.body,"position")?a.O=d={top:0,left:0}:a.O=d=baidu.dom.getPosition(document.body));c.style.top=b.top-d.top+"px";c.style.left=b.left-d.left+"px";c.style.width=b.width+"px"}l.ga=function(a){(a=this.a[a])&&B.remove(a.d)};
l.getData=function(a,b){if(location.href.match(/(\?|&)baiduImageplus=/))b(window.baiduImagePlusFakeData);else{var c,d,e,f,g;if(a.nodeName&&"img"===a.nodeName.toLowerCase()){c=decodeURIComponent(a.src);var n=this.P[c];if(n){b(n);return}d=this.config.get("apiWd");"function"===typeof d&&(d=d(a));d=encodeURIComponent(d);e=a.offsetWidth;f=a.offsetHeight;g=0}else c=a.image,d=a.wd||"",e=a.width,f=a.height,g=a.cached||1;var n=this.config.get("api"),k=this.config.get("unionId");c=baidu.url.jsonToQuery({src:this.config.get("apiSrc"),
k:d,"iurl[]":c,qid:this.$,tu:k,width:e,height:f,opt:this.m.opt||"",v:this.m.v||"",cached:g,pic:this.ia,dri:++this.ma});n+=(-1===n.indexOf("?")?"?":"&")+c;baidu.sio.callByServer(n,b,{charset:"gbk",timeOut:1E4,onfailure:b})}};function Fa(a,b){if(a.complete)b(!0);else{var c=function(){b(!0);s(a,"load",c)};r(a,"load",c);var d=function(){b(!1);s(a,"abort",d);s(a,"error",d)};r(a,"abort",d);r(a,"error",d)}}
function Ma(a,b,c){var d=[];c?(d[0]=c,d[1]=b):(d[0]=a.getImgIndex(b),d[1]=a.a[d[0]]);return d[0]&&d[1]?d:null}
l.W=function(a,b){var c=Ma(this,a,b);if(c){var d=c[0],c=c[1];if(B.contains(document.documentElement,c.h)){var e=Y(c.h),f=c.rect;if(e.top!==f.top||e.left!==f.left||e.width!==f.width||e.height!==f.height)if(c.rect=e,e.width<this.config.minWidth||e.height<this.config.minHeight){if(d=this.getImgIndex(d))c=this.a[d],c.u=!1,c.d.style.display="none",this.b(d,"hide")}else La(this,e,c.d),Ba(this,d),Ka(c.d,c.h),this.b(d,"resize",e)}else this.ea(d)}};
function Ba(a,b){var c=a.a[b];c.d.style.display="block";c.u=Ia(a,c.h);a.b(b,"show")}l.ha=function(){var a=this;V(a,function(b,c){a.W(b,c)})};l.X=function(){var a=this;Na(function(){a.l&&(Oa(a),V(a,function(b,c){a.W(b,c);Pa(a,b,c)}))});Qa(function(){a.l&&V(a,function(b,c){Pa(a,b,c)})})};function Na(a){var b;r(window,"resize",function(){b&&P(b);var c=arguments,d=this;b=O(function(){a.apply(d,c);b=null},500)})}
function Qa(a){function b(){d=g;c=null;a.apply(e,f);e=f=null}var c,d,e,f,g;r(window,"scroll",function(){e=this;f=arguments;g=(new Date).getTime();d=d||g;var a=1E3-(g-d);0>=a?(P(c),b()):c||(c=O(b,a))})}function Pa(a,b,c){var d=Ia(a,b.h);b.u!==d&&(b.u=d,a.b(c,d?"intoview":"outview"));d&&a.b(c,"inview")}function Ia(a,b){a.C=a.C||baidu.page.getViewWidth();a.B=a.B||baidu.page.getViewHeight();var c=b.getBoundingClientRect();return 0<c.bottom&&c.top<a.B&&0<c.right&&c.left<a.C}
function Oa(a){a.C=baidu.page.getViewWidth();a.B=baidu.page.getViewHeight()}function Da(a,b){function c(a){(a="."===a.charAt(0)?baidu.q(a.replace(/^\./,"")):B.g(a.replace(/^#/,"")))&&(baidu.lang.isArray(a)?a.length&&u(a,function(a){d.K(a,f,e)}):d.K(a,f,e))}var d=a,e=b?d.getImgIndex(b):1,f=d.a[e];if(f){var g=d.config.get("imgCoverId");g&&c(g);(g=d.config.get("imgCovers"))&&u(g.split(","),c)}}
l.K=function(a,b,c){var d=this;if(b=Ma(d,b,c)){var e=b[0];b=b[1];b.links=b.links||[];b.s=b.s||[];c=function(a){S(d,a.relatedTarget||a.fromElement,e)||d.b(e,"mouseover")};var f=function(a){S(d,a.relatedTarget||a.toElement,e)||d.b(e,"mouseout")},g=function(){d.b(e,"mousemove")};b.links.push(a);b.s.push({mouseover:c,mouseout:f,mousemove:g});r(a,"mouseover",c);r(a,"mouseout",f);r(a,"mousemove",g);Ka(b.d,a)}};
function Ka(a,b){var c;var d=b,e=d;for(c=[d];(e=e.offsetParent)&&"body"!==e.nodeName.toLowerCase();)"static"!==B.getStyle(e,"position")&&(d=e,c.push(d));if(6===y)c=parseInt(B.getStyle(d,"z-index"),10)||0;else{for(e=0;c.length;)d=c.pop(),d=parseInt(B.getStyle(d,"z-index"),10),isNaN(d)||(e=Math.max(d,e));c=e}d=parseInt(B.getStyle(a,"z-index"),10)||0;c>d&&(a.style.zIndex=c+10)}
l.sa=function(a,b){var c=this.getImgIndex(b);if(c&&(c=this.a[c],c.links)){var d=baidu.array.indexOf(c.links,a);if(-1!==d){var e=c.s[d],f;for(f in e)s(a,f,e[f]);baidu.array.removeAt(c.links,d);baidu.array.removeAt(c.s,d)}}};l.ta=function(a){if(a=this.getImgIndex(a)){var b=this.a[a];b.links&&(u(b.links,function(a,d){var e=b.s[d],f;for(f in e)s(a,f,e[f])}),b.links.length=0,b.s.length=0)}};
function Ja(a,b){if(a.config.get("autoDetectCover")){var c=a.config.get("findCoverLevel");if(!(0>=c)){var d=a.a[b];if(d){var e=d.h,f=-1,g=function(n,k){if(!(f>=c)){f++;var h;if(h=0!==k)if("a"===n.nodeName.toLowerCase()?h=!0:(h=B.getStyle(n,"cursor"),h="pointer"===h||0===h.indexOf("url(")),h&&(h=!B.contains(n,e))){h=C(n);var m=d.rect,w=h.top,A=h.left,x=m.top,D=m.left,A=Math.abs(A-D)<(A>D?m.width:h.width);h=Math.abs(w-x)<(w>x?m.height:h.height)&&A}h&&a.K(n,d,b);4!==k&&(h=baidu.dom.first(n))&&g(h,1);
3!==k&&(h=baidu.dom.next(n))&&g(h,2);2!==k&&(h=baidu.dom.prev(n))&&g(h,3);(0===k||4===k)&&(h=n.parentNode)&&g(h,4);f--}};g(e,0)}}}}
function Y(a){var b={top:0,left:0,width:0,height:0};if(Ra(a))return b;var c=a.baiduImageplusOverflowParent;if(c&&Sa(c))return Ta(a,c);if((c=a.baiduImageplusHiddenParent)&&Ra(c))return b;var d=!1,e=null,c=baidu.dom.getAncestorBy(a,function(b){if(Ra(b))return d=!0;if(!Sa(b))return!1;e=Ta(a,b);return e.clipped});if(!c)return C(a);if(d)return a.baiduImageplusHiddenParent=c,b;a.baiduImageplusOverflowParent=c;return e}
function Ra(a){return"none"===B.getStyle(a,"display")||"0"===B.getStyle(a,"opacity")||"hidden"===B.getStyle(a,"visibility")}function Sa(a){if("HTML"===a.nodeName)return!1;var b=B.getStyle(a,"display"),c=B.getStyle(a,"float");return"inline"!==b||"none"!==c&&""!==c?"visible"!==B.getStyle(a,"overflow")?!0:!1:!1}
function Ta(a,b){var c=C(a),d=C(b),e=c.top,f=c.left,g=c.width,n=c.height,k=d.top,h=d.left,m=d.width,d=d.height;if(e>=k&&f>=h&&f+g<=h+m&&e+n<=k+d)return c.clipped=!1,c;c={clipped:!0};f>h?(c.left=f,c.width=m-(f-h)):(c.left=h,c.width=g-(h-f));c.width=Math.min(c.width,g,m);e>k?(c.top=e,c.height=d-(e-k)):(c.top=k,c.height=n-(k-e));c.height=Math.min(c.height,n,d);return c}function Ea(a,b){var c=!1;V(a,function(a){c||a.d&&(c=B.contains(a.d,b))});return c}
function Ga(){var a=baidu.page.getViewHeight(),b=baidu.page.getViewWidth(),c=baidu.page.getScrollTop(),d=baidu.page.getScrollLeft();return[c,d,b,a].join("_")};function Ua(a){this.I="baiduImageplusStatus";this.Z="baiduImageplusOriginalSrc";this.ca=this.H=this.S=!1;this.R=[];W.call(this,a)}baidu.inherits(Ua,W);
Ua.prototype.U=function(){var a=this;if(a.config.get("autoStart")){var b=a.config.get("cachedImgs");a.H=!!b;a.m.opt=1|(a.H?4:0);a.m.v=7;a.H&&Va(a,b);var c=a.config.get("startOnLoad"),d,b=function(){function b(){a.l<a.p&&(a.H&&!a.ca?Wa(a):Xa(a));a.ha();O(b,a.config.get("tickInterval"))}c&&(a.m.onload=(new Date).getTime());d&&clearTimeout(d);b();a.X()};c&&"complete"!==document.readyState?(r(window,"load",b),d=setTimeout(b,a.config.get("onloadTimeout"))):b()}};
function Xa(a){var b=X(a),c=a.I;u(b,function(b){if(b&&Ca(a.config,b))switch(b[c]||0){case 0:ab(a,b);break;case 1:b[a.Z]!==b.src&&(b[c]=1,ab(a,b))}})}function Wa(a){var b=X(a),c=a.I;u(b,function(b){b&&null==b[c]&&Ca(a.config,b)&&(b[c]=0,a.R.push(b))})}function bb(a){var b=a.I;u(a.R,function(c){var d=c[b]||0;a.P[decodeURIComponent(c.src)]&&0===d&&ab(a,c,{immediate:!0})})}
function ab(a,b,c){var d=c||{};if(d.immediate||!a.S)a.S=!0,a.V(b,function(c){a.S=!1;var f=a.I;c?(b[f]=2,Da(a,b)):(b[f]=1,b[a.Z]=b.src);d.callback&&d.callback(c)})}function Va(a,b){var c,d=0;a.m.c_loading=(new Date).getTime();for(var e=0;e<b.length;e++)c=b[e],c.image&&c.width&&c.height&&a.getData(c,function(c){return function(e){e&&(a.P[c]=e);d++;a.m["c_loaded_"+d]=(new Date).getTime();d===b.length?(Wa(a),bb(a),a.R.length=0,a.ca=!0):bb(a)}}(c.image))};function cb(a){this.Y=z({autoStart:!0,imgContainerId:"",imgCoverId:"",imgCovers:"",apiSrc:1E3,apiWd:function(a){return a.alt||document.title},api:"http://imageplus.baidu.com/ui",minImgWidth:300,minImgHeight:200,maxAdCount:4,autoDetectCover:!0,findCoverLevel:4},this.Y||{});this.o=z(this.Y,a);this.oa=/.(?:gif|html|htm)(?:$|#|\?)/;this.minWidth=parseInt(this.get("minImgWidth"),10);this.minHeight=parseInt(this.get("minImgHeight"),10);(a=ba(this.get("unionId")))&&0===a.indexOf("u")&&(a=a.slice(1));this.o.unionId=
a}baidu.inherits(cb,ma);function Ca(a,b){var c=b.getAttributeNode("data-baiduimageplus-ignore");return!(c&&c.specified)&&b.offsetWidth>=a.minWidth&&b.offsetHeight>=a.minHeight&&!a.oa.test(b.src)};function db(a){cb.call(this,a);this.o=z({tickInterval:1E3,onloadTimeout:5E3,startOnLoad:!1},this.o)}baidu.inherits(db,cb);var eb=window.cpro_id||"",Z=window.baiduImagePlus||{},fb={};!Z.unionId&&eb&&(Z.unionId=eb);
if("loading"!==Z._status&&"loaded"!==Z._status){Z._status="loading";window.baiduImagePlus=Z;fb.start=(new Date).getTime();var $=Z.api||"http://imageplus.baidu.com/ui",$=$+(-1===$.indexOf("?")?"?":"&")+"api=config&tu="+ba(Z.unionId||"").replace(/^u/,"")+"&pic="+document.getElementsByTagName("img").length;baidu.sio.callByServer($,function(a){fb.site_api_loaded=(new Date).getTime();a=a||{};gb(z(Z,a))},{charset:"gbk",timeOut:1E4,onfailure:gb})}
function gb(a){var b=new Ua(new db(a||Z));b.m=fb;b.U();window.baiduImagePlus={_status:"loaded",_loader:b,showAd:function(){return b.V.apply(b,arguments)},removeAd:function(){return b.ea.apply(b,arguments)},updateAd:function(){return b.W.apply(b,arguments)},updateAds:function(){return b.ha.apply(b,arguments)},watchAds:function(){return b.X.apply(b,arguments)},linkAd:function(){return b.K.apply(b,arguments)},unlinkAd:function(){return b.sa.apply(b,arguments)},unlinkAds:function(){return b.ta.apply(b,
arguments)}}};

})(/** AD_CONFIG */{}, /** LINKS */[], /** RT_CONFIG */{});
//Tue Aug 26 2014 14:50:19 GMT+0800 (CST)