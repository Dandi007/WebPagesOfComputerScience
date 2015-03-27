var EMC_OPTIONS = {
    monitor : 'emaradx_id',
    callback : function( values ) {
        /**本地cookie同步完成后回调*/
        var isExist = true;
        for ( var i = 0, len = values.length; i < len; i++ ) {
            if ( !values[i].value.session || values[i].value.session === 'undefined' ) { isExist = false;}
        }

        /**如果有一个监控KEY没有内容，则请求COOKIE服务*/
        if ( !isExist ) {
                /**cookie 服务器*/
            var engineServer = 'http://p.yiqifa.com/engine/asyn.jsp',
                monitor = emcookie.getMonitorKey(),
                /**cookie处理回调地址*/
                callbackPage = location.protocol + '//'+location.host+'/static/node/callback.html?v=',
                ifr = document.createElement('iframe');
            ifr.id = 'emcookie_asyn_iframe';
            ifr.width = ifr.height = 0;
            ifr.style.border = 'none';
            ifr.src = engineServer + '?monitor='+monitor+'&callback='+callbackPage;
            var _waitbody = setInterval(function(){if(document.body) {document.body.appendChild(ifr);clearInterval(_waitbody)}},1);
        } 
    },
    crossDomainSyncCallback : function(values) {
        /**与cookie服务器同步完成后回调*/
       
  /**删除同步页面*/
//        /**
        var ifr = document.getElementById('emcookie_asyn_iframe');
        ifr.parentNode.removeChild(ifr);
        ifr = null;
//        **/
    }
};

/*! emcookie.js 0.1.3 2014-07-10 | emar.com  */
!function(a,b){function c(a){return(a||"").replace(/(^\s*)|(\s*$)/g,"")}function d(a){var e=arguments;if(e.length>1){for(var f=0,g=e.length;g>f;f++)if(d(e[f]))return!0;return!1}return a===b||"null"===String(a)||"undefined"===a||(p(a)?""===c(a):!1)}function e(a){return function(b){return Object.prototype.toString.call(b)==="[object "+a+"]"}}function f(a,b){if(d(a))return null;if(p(a))return a;b=b||"=";var c=[];for(var e in a)if(a.hasOwnProperty(e)){var g=a[e];if(o(g))g="{"+f(g,b)+"}";else if(q(g)){for(var h="[",i=0,j=g.length;j>i;i++)h+=f[g[i]];h+="]"}c.push(e+b+g)}return c.join(",")}function g(a){if(a){var b=0;a.replace(/\.+/g,function(){return b++,arguments[0]}),b>1&&a.replace(/[\w-]+\.(com|net|org|gov|cc|biz|info|cn|co)\b(\.(cn|hk|uk|jp|tw))*/,function(b){a=b})}else a="";return a}function h(a,b){var c=s[a];return d(c)?b:c}function i(){for(var a in v)if(v.hasOwnProperty(a)){var b=v[a].call();b&&(u[a]=b)}m.callback.call(t,w.run(m.monitor,m.callbackFormat)),w.start(m.monitor,m.monitorCallback,m.monitorTime)}function j(a){for(var b in u)u.hasOwnProperty(b)&&a.call(u[b],b)}function k(a,b,c,d){var e=this;return e.db=function(){return a.call(e)}(),e.get=function(a){return a&&e.db?b.call(e,e.db,a):""},e.set=function(a,b){a&&e.db&&c.call(e,e.db,a,b)},e.remove=function(a){return a&&e.db?d.call(e,e.db,a):!1},e.db?e:null}function l(a,b){this.key=a,this.value=b}if(!a.emcookie){var m,n=document,o=e("Object"),p=e("String"),q=Array.isArray||e("Array"),r=e("Function"),s=window.EMC_OPTIONS||{};m={monitor:h("monitor","uid"),monitorCallback:h("monitorCallback",function(){}),monitorTime:h("monitorTime",3e3),callback:h("callback",function(){}),callbackFormat:h("callbackFormat","array"),cookieEncode:h("cookieEncode",!1),cookiePath:h("cookiePath","/"),cookieDomain:h("cookieDomain",g(location.hostname)),cookiePriority:h("cookiePriority",!1),pid:h("pid",0),protocol:n.location.protocol+"//",userDatePrefix:"emc-data-userdata",crossDomainSyncCallback:h("crossDomainSyncCallback",function(){})},s=window.EMC_OPTIONS=null;var t=a.emcookie={version:"0.1.3"},u={};t.get=function(a){var b="",c=t.getAll(a);if(c)for(var e in c)if(b=c[e],!d(b))break;return b},t.getAll=function(a){var c,e,f={};return a&&(j(function(b){e=this.get(a),"cookie"!==b||m.cookiePriority||d(e)?c=d(e)?c:e:d(c)&&(c=e),f[b]=c}),d(c)||t.set(a,c,function(c){var e=this.get(a);f[c]=d(e)?b:e})),f},t.set=function(a,b,c){return a&&j(function(d){this.set(a,b),r(c)&&c.call(this,d)}),t},t.remove=function(a){var b=!1;return a&&j(function(){this.remove(a)&&(b=!0)}),b},t.getMonitorKey=function(){return m.monitor},t.crossdomainsynccallback=function(a){if(o(a)){for(var b in a)d(a[b])||t.set(b,a[b]);r(m.crossDomainSyncCallback)&&m.crossDomainSyncCallback.call(t,a)}};var v={};v.localStorage=function(){return k.call({},function(){return window.localStorage?window.localStorage:b},function(a,b){return a.getItem(b)},function(a,b,c){a.setItem(b,c)},function(a,b){return a.removeItem(b)})},v.userData=function(){return k.call({},function(){try{var a=n.body,b=n.documentElement,c=m.userDatePrefix,d="#default#userData";if("addBehavior"in a&&(a.addBehavior(d),b.addBehavior(d),"load"in a&&"load"in b))return{sync:function(a,d){b.load(c);var e=""+(b.getAttribute(c)||""),f=new RegExp("\\b"+a+"\\b,?","i"),g=f.test(e)?1:0;e=d?e.replace(f,"").replace(",",""):g?e:""===e?a:e.split(",").concat(a).join(","),b.setAttribute(c,e),b.save(c)},set:function(b,c){a.setAttribute(b,c),a.save(b),this.sync(b,!1)},get:function(b){return a.load(b),a.getAttribute(b)},remove:function(b){a.removeAttribute(b),a.save(b),this.sync(b,!0)}}}catch(e){}return null},function(a,b){return a.get(b)},function(a,b,c){a.set(b,c)},function(a,b){return a.remove(b)})},v.session=function(){return k.call({},function(){return{}},function(a,b){return a[b]},function(a,b,c){a[b]=c},function(a,b){return delete a[b]})},v.cookie=function(){return k.call({},function(){return function(a,c){var d=encodeURIComponent;if(c!==b){var e=m.cookieDomain,f=m.cookiePath,g=m.cookieEncode,h=new Date,i=c?36500:-36500;return h.setDate(h.getDate()+i),c=String(c),n.cookie=[d(a),"=",g?d(c):c,"; expires="+h.toUTCString(),f?"; path="+f:"",e?"; domain="+e:"","https://"===m.protocol?"; secure":""].join("")}var j,k=g?decodeURIComponent:function(a){return a};return(j=new RegExp("(?:^|; )"+d(a)+"=([^;]*)").exec(n.cookie))?k(j[1]):null}},function(a,b){return a(b)||""},function(a,b,c){a(b,c)},function(a,b){return a(b,null)})};var w=function(){function a(a){if(!a)return[];switch(a){case"string":case"object":return{};case"array":default:return[]}}var b=-1,c={};return c.start=function(a,d,e){r(d)&&(b=setInterval(function(){d.call(t,c.run(a))},e))},c.stop=function(){clearInterval(b)},c.run=function(b,c){if(d(b))return[];b=b.split(",");for(var e=a(c),g=0,h=b.length;h>g;g++){var i=t.getAll(b[g]);q(e)?e.push(new l(b[g],i)):o(e)&&(e[b[g]]=i)}return"string"===c&&(e=f(e,":")),e},c}();i()}}(window);

