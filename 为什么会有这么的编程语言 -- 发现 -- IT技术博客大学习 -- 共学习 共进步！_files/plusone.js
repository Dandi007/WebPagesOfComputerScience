var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){var aa=encodeURIComponent,k=window,ba=Object,q=document,ca=Array,da=parseInt,r=String,ea=decodeURIComponent;function fa(a,b){return a.type=b}
var ga="appendChild",ha="shift",ia="exec",ja="width",s="replace",ka="concat",la="charAt",ma="match",t="createElement",v="setAttribute",na="bind",oa="getTime",pa="getElementsByTagName",x="substr",y="toString",z="split",A="location",B="style",qa="protocol",D="href",ra="action",E="apply",sa="attributes",ta="height",F="push",G="test",ua="slice",va="getElementById",wa="JSON",H="indexOf",xa="nodeName",ya="type",I="length",K="prototype",za="removeChild",L="call",M="getAttribute",N="charCodeAt",Aa="substring",
Ba="documentMode",O="parentNode",Ca="update",P="join",Da="toLowerCase",Ea=function(a,b,c){return a[L][E](a[na],arguments)},Fa=function(a,b,c){if(!a)throw Error();if(2<arguments[I]){var d=ca[K][ua][L](arguments,2);return function(){var c=ca[K][ua][L](arguments);ca[K].unshift[E](c,d);return a[E](b,c)}}return function(){return a[E](b,arguments)}},Ga=function(a,b,c){Ga=Function[K][na]&&-1!=Function[K][na][y]()[H]("native code")?Ea:Fa;return Ga[E](null,arguments)};
Function[K].bind=Function[K][na]||function(a,b){if(1<arguments[I]){var c=ca[K][ua][L](arguments,1);c.unshift(this,a);return Ga[E](null,c)}return Ga(this,a)};var Q=k,R=q,Ha=Q[A],Ia=function(){},Ja=/\[native code\]/,S=function(a,b,c){return a[b]=a[b]||c},Ka=function(a){for(var b=0;b<this[I];b++)if(this[b]===a)return b;return-1},La=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a[I];d++){var e=a[d];e!=c&&b[F](e);c=e}return b},Ma=/&/g,Na=/</g,Oa=/>/g,Pa=/"/g,Qa=/'/g,Ra=function(a){return r(a)[s](Ma,"&amp;")[s](Na,"&lt;")[s](Oa,"&gt;")[s](Pa,"&quot;")[s](Qa,"&#39;")},T=function(){var a;if((a=ba.create)&&Ja[G](a))a=a(null);else{a={};for(var b in a)a[b]=
void 0}return a},U=function(a,b){return ba[K].hasOwnProperty[L](a,b)},Sa=function(a){if(Ja[G](ba.keys))return ba.keys(a);var b=[],c;for(c in a)U(a,c)&&b[F](c);return b},V=function(a,b){a=a||{};for(var c in a)U(a,c)&&(b[c]=a[c])},Ta=function(a){return function(){Q.setTimeout(a,0)}},Ua=function(a,b){if(!a)throw Error(b||"");},W=S(Q,"gapi",{});var X=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d[ia](a)||b[ia](a)))try{c=ea(a[2])}catch(e){}return c},Va=/^([^?#]*)(\?([^#]*))?(\#(.*))?$/,Wa=function(a){a=a[ma](Va);var b=T();b.H=a[1];b.j=a[3]?[a[3]]:[];b.o=a[5]?[a[5]]:[];return b},Xa=function(a){return a.H+(0<a.j[I]?"?"+a.j[P]("&"):"")+(0<a.o[I]?"#"+a.o[P]("&"):"")},Ya=function(a,b){var c=[];if(a)for(var d in a)if(U(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];c[F](aa(d)+
"="+aa(e))}return c},Za=function(a,b,c,d){a=Wa(a);a.j[F][E](a.j,Ya(b,d));a.o[F][E](a.o,Ya(c,d));return Xa(a)},$a=function(a,b){var c="";2E3<b[I]&&(c=b[Aa](2E3),b=b[Aa](0,2E3));var d=a[t]("div"),e=a[t]("a");e.href=b;d[ga](e);d.innerHTML=d.innerHTML;b=r(d.firstChild[D]);d[O]&&d[O][za](d);return b+c},ab=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var bb=function(a,b,c,d){if(Q[c+"EventListener"])Q[c+"EventListener"](a,b,!1);else if(Q[d+"tachEvent"])Q[d+"tachEvent"]("on"+a,b)},cb=function(){var a=R.readyState;return"complete"===a||"interactive"===a&&-1==navigator.userAgent[H]("MSIE")},fb=function(a){var b=db;if(!cb())try{b()}catch(c){}eb(a)},eb=function(a){if(cb())a();else{var b=!1,c=function(){if(!b)return b=!0,a[E](this,arguments)};Q.addEventListener?(Q.addEventListener("load",c,!1),Q.addEventListener("DOMContentLoaded",c,!1)):Q.attachEvent&&
(Q.attachEvent("onreadystatechange",function(){cb()&&c[E](this,arguments)}),Q.attachEvent("onload",c))}},gb=function(a){for(;a.firstChild;)a[za](a.firstChild)},hb={button:!0,div:!0,span:!0};var Y;Y=S(Q,"___jsl",T());S(Y,"I",0);S(Y,"hel",10);var ib=function(a){return Y.dpo?Y.h:X(a,"jsh",Y.h)},jb=function(a){var b=S(Y,"sws",[]);b[F][E](b,a)},kb=function(a){return S(Y,"watt",T())[a]},lb=function(a){var b=S(Y,"PQ",[]);Y.PQ=[];var c=b[I];if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},nb=function(a){return S(S(Y,"H",T()),a,T())};var ob=S(Y,"perf",T()),pb=S(ob,"g",T()),qb=S(ob,"i",T());S(ob,"r",[]);T();T();var rb=function(a,b,c){var d=ob.r;"function"===typeof d?d(a,b,c):d[F]([a,b,c])},sb=function(a,b,c){pb[a]=!b&&pb[a]||c||(new Date)[oa]();rb(a)},ub=function(a,b,c){b&&0<b[I]&&(b=tb(b),c&&0<c[I]&&(b+="___"+tb(c)),28<b[I]&&(b=b[x](0,28)+(b[I]-28)),c=b,b=S(qb,"_p",T()),S(b,c,T())[a]=(new Date)[oa](),rb(a,"_p",c))},tb=function(a){return a[P]("__")[s](/\./g,"_")[s](/\-/g,"_")[s](/\,/g,"_")};var vb=T(),wb=[],xb=function(a){throw Error("Bad hint"+(a?": "+a:""));};wb[F](["jsl",function(a){for(var b in a)if(U(a,b)){var c=a[b];"object"==typeof c?Y[b]=S(Y,b,[])[ka](c):S(Y,b,c)}if(b=a.u)a=S(Y,"us",[]),a[F](b),(b=/^https:(.*)$/[ia](b))&&a[F]("http:"+b[1])}]);var yb=/^(\/[a-zA-Z0-9_\-]+)+$/,zb=/^[a-zA-Z0-9\-_\.,!]+$/,Ab=/^gapi\.loaded_[0-9]+$/,Bb=/^[a-zA-Z0-9,._-]+$/,Fb=function(a,b,c,d){var e=a[z](";"),f=vb[e[ha]()],g=null;f&&(g=f(e,b,c,d));if(b=g)b=g,c=b[ma](Cb),d=b[ma](Db),b=!!d&&1===d[I]&&Eb[G](b)&&!!c&&1===c[I];b||xb(a);return g},Ib=function(a,b,c,d){a=Gb(a);Ab[G](c)||xb("invalid_callback");b=Hb(b);d=d&&d[I]?Hb(d):null;var e=function(a){return aa(a)[s](/%2C/g,",")};return[aa(a.T)[s](/%2C/g,",")[s](/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+
e(d):"","/rt=j/sv=1/d=1/ed=1",a.J?"/am="+e(a.J):"",a.K?"/rs="+e(a.K):"","/cb=",e(c)][P]("")},Gb=function(a){"/"!==a[la](0)&&xb("relative path");for(var b=a[Aa](1)[z]("/"),c=[];b[I];){a=b[ha]();if(!a[I]||0==a[H]("."))xb("empty/relative directory");else if(0<a[H]("=")){b.unshift(a);break}c[F](a)}a={};for(var d=0,e=b[I];d<e;++d){var f=b[d][z]("="),g=ea(f[0]),h=ea(f[1]);2==f[I]&&g&&h&&(a[g]=a[g]||h)}b="/"+c[P]("/");yb[G](b)||xb("invalid_prefix");c=Jb(a,"k",!0);d=Jb(a,"am");a=Jb(a,"rs");return{T:b,version:c,
J:d,K:a}},Hb=function(a){for(var b=[],c=0,d=a[I];c<d;++c){var e=a[c][s](/\./g,"_")[s](/-/g,"_");Bb[G](e)&&b[F](e)}return b[P](",")},Jb=function(a,b,c){a=a[b];!a&&c&&xb("missing: "+b);if(a){if(zb[G](a))return a;xb("invalid: "+b)}return null},Eb=/^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Db=/\/cb=/g,Cb=/\/\//g,Kb=function(){var a=ib(Ha[D]);if(!a)throw Error("Bad hint");return a};
vb.m=function(a,b,c,d){(a=a[0])||xb("missing_hint");return"https://apis.google.com"+Ib(a,b,c,d)};var Lb=decodeURI("%73cript"),Mb=function(a,b){for(var c=[],d=0;d<a[I];++d){var e=a[d];e&&0>Ka[L](b,e)&&c[F](e)}return c},Ob=function(a){"loading"!=R.readyState?Nb(a):R.write("<"+Lb+' src="'+encodeURI(a)+'"></'+Lb+">")},Nb=function(a){var b=R[t](Lb);b[v]("src",a);b.async="true";(a=R[pa](Lb)[0])?a[O].insertBefore(b,a):(R.head||R.body||R.documentElement)[ga](b)},Pb=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<wb[I];d++){var e=wb[d][0],f=wb[d][1];f&&U(c,e)&&f(c[e],a,b)}},Rb=function(a,b){Qb(function(){var c;
c=b===ib(Ha[D])?S(W,"_",T()):T();c=S(nb(b),"_",c);a(c)})},Tb=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Pb(a,c);var d=a?a[z](":"):[],e=c.h||Kb(),f=S(Y,"ah",T());if(f["::"]&&d[I]){for(var g=[],h=null;h=d[ha]();){var l=h[z]("."),l=f[h]||f[l[1]&&"ns:"+l[0]||""]||e,n=g[I]&&g[g[I]-1]||null,m=n;n&&n.hint==l||(m={hint:l,M:[]},g[F](m));m.M[F](h)}var p=g[I];if(1<p){var w=c.callback;w&&(c.callback=function(){0==--p&&w()})}for(;d=g[ha]();)Sb(d.M,c,d.hint)}else Sb(d||[],c,e)},Sb=function(a,
b,c){a=La(a)||[];var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=null,l=!1;if(f&&!g||!f&&g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";var n=S(nb(c),"r",[]).sort(),m=S(nb(c),"L",[]).sort(),p=[][ka](n),w=function(a,b){if(l)return 0;Q.clearTimeout(h);m[F][E](m,C);var d=((W||{}).config||{})[Ca];d?d(e):e&&S(Y,"cu",[])[F](e);if(b){ub("me0",a,p);try{Rb(b,c)}finally{ub("me1",a,p)}}return 1};0<f&&(h=Q.setTimeout(function(){l=!0;g()},f));var C=Mb(a,m);if(C[I]){var C=
Mb(a,n),u=S(Y,"CP",[]),J=u[I];u[J]=function(a){if(!a)return 0;ub("ml1",C,p);var b=function(b){u[J]=null;w(C,a)&&lb(function(){d&&d();b()})},c=function(){var a=u[J+1];a&&a()};0<J&&u[J-1]?u[J]=function(){b(c)}:b(c)};if(C[I]){var mb="loaded_"+Y.I++;W[mb]=function(a){u[J](a);W[mb]=null};a=Fb(c,C,"gapi."+mb,n);n[F][E](n,C);ub("ml0",C,p);b.sync||Q.___gapisync?Ob(a):Nb(a)}else u[J](Ia)}else w(C)&&d&&d()};var Qb=function(a){if(Y.hee&&0<Y.hel)try{return a()}catch(b){Y.hel--,Tb("debug_error",function(){try{k.___jsl.hefn(b)}catch(a){throw b;}})}else return a()};W.load=function(a,b){return Qb(function(){return Tb(a,b)})};var Ub=function(a){var b=k.___jsl=k.___jsl||{};b[a]=b[a]||[];return b[a]},Vb=function(a){var b=k.___jsl=k.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},Wb=function(a){return"object"===typeof a&&/\[native code\]/[G](a[F])},Xb=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]&&b[c]&&"object"===typeof a[c]&&"object"===typeof b[c]&&!Wb(a[c])&&!Wb(b[c])?Xb(a[c],b[c]):b[c]&&"object"===typeof b[c]?(a[c]=Wb(b[c])?[]:{},Xb(a[c],b[c])):a[c]=b[c])},Yb=function(a){if(a&&!/^\s+$/[G](a)){for(;0==a[N](a[I]-
1);)a=a[Aa](0,a[I]-1);var b;try{b=k[wa].parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(d){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(e){}return"object"===typeof b?b:{}}},Zb=function(a){Vb(!0);var b=k.___gcfg,c=Ub("cu");if(b&&b!==k.___gu){var d={};Xb(d,b);c[F](d);k.___gu=b}var b=Ub("cu"),e=q.scripts||q[pa]("script")||[],d=[],f=[];f[F][E](f,Ub("us"));for(var g=0;g<e[I];++g)for(var h=e[g],l=0;l<f[I];++l)h.src&&
0==h.src[H](f[l])&&d[F](h);0==d[I]&&0<e[I]&&e[e[I]-1].src&&d[F](e[e[I]-1]);for(e=0;e<d[I];++e)d[e][M]("gapi_processed")||(d[e][v]("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=Yb(f))&&b[F](f));a&&(d={},Xb(d,a),c[F](d));d=Ub("cd");a=0;for(b=d[I];a<b;++a)Xb(Vb(),d[a]);d=Ub("ci");a=0;for(b=d[I];a<b;++a)Xb(Vb(),d[a]);a=0;for(b=c[I];a<b;++a)Xb(Vb(),c[a])},Z=function(a){if(!a)return Vb();a=a[z]("/");for(var b=Vb(),c=0,d=a[I];b&&
"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a[I]&&void 0!==b?b:void 0},$b=function(a,b){var c=a;if("string"===typeof a){for(var d=c={},e=a[z]("/"),f=0,g=e[I];f<g-1;++f)var h={},d=d[e[f]]=h;d[e[f]]=b}Zb(c)};var ac=function(){var a=k.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),S(Y,"ci",[])[F](a),k.__GOOGLEAPIS=void 0)};var bc={apppackagename:1,callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},cc=!1,dc=T(),ec=function(){if(!cc){for(var a=q[pa]("meta"),b=0;b<a[I];++b){var c=a[b].name[Da]();if(0==c.lastIndexOf("google-signin-",0)){var c=c[Aa](14),d=a[b].content;bc[c]&&d&&(dc[c]=d)}}if(k.self!==k.top){var a=q[A][y](),e;for(e in bc)0<bc[e]&&(b=X(a,e,""))&&(dc[e]=b)}cc=!0}e=T();V(dc,e);return e},fc=function(a){return!!(a.clientid&&a.scope&&a.callback)};var gc=k.console,hc=function(a){gc&&gc.log&&gc.log(a)};var ic=function(){return!!Y.oa},jc=function(){};var $=S(Y,"rw",T()),kc=function(a){for(var b in $)a($[b])},lc=function(a,b){var c=$[a];c&&c.state<b&&(c.state=b)};var mc;var nc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/u\/(\d)\//,oc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?\#]*)?\/b\/(\d{10,})\//,pc=function(a){var b=Z("googleapis.config/sessionIndex");null==b&&(b=k.__X_GOOG_AUTHUSER);if(null==b){var c=k.google;c&&(b=c.authuser)}null==b&&(a=a||k[A][D],b=X(a,"authuser")||null,null==b&&(b=(b=a[ma](nc))?b[1]:null));return null==b?null:r(b)},qc=function(a){var b=Z("googleapis.config/sessionDelegate");null==b&&(b=(a=(a||k[A][D])[ma](oc))?
a[1]:null);return null==b?null:r(b)};var rc=function(){this.c=-1};var sc=function(){this.c=-1;this.c=64;this.b=[];this.p=[];this.N=[];this.n=[];this.n[0]=128;for(var a=1;a<this.c;++a)this.n[a]=0;this.l=this.g=0;this.reset()};(function(){function a(){}a.prototype=rc[K];sc.$=rc[K];sc.prototype=new a;sc.H=function(a,c,d){return rc[K][c][E](a,ca[K][ua][L](arguments,2))}})();sc[K].reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.l=this.g=0};
var tc=function(a,b,c){c||(c=0);var d=a.N;if("string"==typeof b)for(var e=0;16>e;e++)d[e]=b[N](c)<<24|b[N](c+1)<<16|b[N](c+2)<<8|b[N](c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];for(var g=a.b[2],h=a.b[3],l=a.b[4],n,e=0;80>e;e++)40>e?20>e?(f=h^c&(g^h),n=1518500249):(f=c^g^h,n=1859775393):60>e?(f=c&g|h&(c|g),n=2400959708):(f=c^g^h,n=3395469782),f=(b<<5|b>>>27)+f+
l+n+d[e]&4294967295,l=h,h=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+l&4294967295};
sc[K].update=function(a,b){void 0===b&&(b=a[I]);for(var c=b-this.c,d=0,e=this.p,f=this.g;d<b;){if(0==f)for(;d<=c;)tc(this,a,d),d+=this.c;if("string"==typeof a)for(;d<b;){if(e[f]=a[N](d),++f,++d,f==this.c){tc(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.c){tc(this,e);f=0;break}}this.g=f;this.l+=b};var uc=function(){this.q=new sc};uc[K].reset=function(){this.q.reset()};var Bc=function(){var a;vc?(a=new Q.Uint32Array(1),wc.getRandomValues(a),a=Number("0."+a[0])):(a=xc,a+=da(yc[x](0,20),16),yc=zc(yc),a/=Ac+Math.pow(16,20));return a},wc=Q.crypto,vc=!1,Cc=0,Dc=0,xc=1,Ac=0,yc="",Ec=function(a){a=a||Q.event;var b=a.screenX+a.clientX<<16,b=b+(a.screenY+a.clientY),b=(new Date)[oa]()%1E6*b;xc=xc*b%Ac;0<Cc&&++Dc==Cc&&bb("mousemove",Ec,"remove","de")},zc=function(a){var b=new uc;a=unescape(aa(a));for(var c=[],d=0,e=a[I];d<e;++d)c[F](a[N](d));b.q[Ca](c);a=b.q;b=[];d=8*a.l;
56>a.g?a[Ca](a.n,56-a.g):a[Ca](a.n,a.c-(a.g-56));for(c=a.c-1;56<=c;c--)a.p[c]=d&255,d/=256;tc(a,a.p);for(c=d=0;5>c;c++)for(e=24;0<=e;e-=8)b[d]=a.b[c]>>e&255,++d;a="";for(c=0;c<b[I];c++)a+="0123456789ABCDEF"[la](Math.floor(b[c]/16))+"0123456789ABCDEF"[la](b[c]%16);return a},vc=!!wc&&"function"==typeof wc.getRandomValues;
vc||(Ac=1E6*(screen[ja]*screen[ja]+screen[ta]),yc=zc(R.cookie+"|"+R[A]+"|"+(new Date)[oa]()+"|"+Math.random()),Cc=Z("random/maxObserveMousemove")||0,0!=Cc&&bb("mousemove",Ec,"add","at"));var Fc=function(){var a=Y.onl;if(!a){a=T();Y.onl=a;var b=T();a.e=function(a){var d=b[a];d&&(delete b[a],d())};a.a=function(a,d){b[a]=d};a.r=function(a){delete b[a]}}return a},Gc=function(a,b){var c=b.onload;return"function"===typeof c?(Fc().a(a,c),c):null},Hc=function(a){Ua(/^\w+$/[G](a),"Unsupported id - "+a);Fc();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},Ic=function(a){Fc().r(a)};var Jc={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},Kc={allowtransparency:!0,onload:!0},Lc=0,Mc=function(a){Ua(!a||ab[G](a),"Illegal url for new iframe - "+a)},Nc=function(a,b,c,d,e){Mc(c.src);var f,g=Gc(d,c),h=g?Hc(d):"";try{f=a[t]('<iframe frameborder="'+Ra(r(c.frameborder))+'" scrolling="'+Ra(r(c.scrolling))+'" '+h+' name="'+Ra(r(c.name))+'"/>')}catch(l){f=a[t]("iframe"),g&&(f.onload=function(){f.onload=
null;g[L](this)},Ic(d))}for(var n in c)a=c[n],"style"===n&&"object"===typeof a?V(a,f[B]):Kc[n]||f[v](n,r(a));(n=e&&e.beforeNode||null)||e&&e.dontclear||gb(b);b.insertBefore(f,n);f=n?n.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var Oc=/^:[\w]+$/,Pc=/:([a-zA-Z_]+):/g,Qc=function(){var a=pc()||"0",b=qc(),c;c=pc(void 0)||a;var d=qc(void 0),e="";c&&(e+="u/"+c+"/");d&&(e+="b/"+d+"/");c=e||null;(e=(d=!1===Z("isLoggedIn"))?"_/im/":"")&&(c="");var f=Z("iframes/:socialhost:"),g=Z("iframes/:im_socialhost:");return mc={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}},Rc=function(a,b){return Qc()[b]||""},Sc=function(a){return function(b,c){return a?Qc()[c]||a[c]||"":Qc()[c]||""}};var Tc={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},Uc=function(a){var b,c,d;b=/[\"\\\x00-\x1f\x7f-\x9f]/g;if(void 0!==a){switch(typeof a){case "string":return b[G](a)?'"'+a[s](b,function(a){var b=Tc[a];if(b)return b;b=a[N]();return"\\u00"+Math.floor(b/16)[y](16)+(b%16)[y](16)})+'"':'"'+a+'"';case "number":return isFinite(a)?r(a):"null";case "boolean":case "null":return r(a);case "object":if(!a)return"null";b=[];if("number"===typeof a[I]&&!a.propertyIsEnumerable("length")){d=
a[I];for(c=0;c<d;c+=1)b[F](Uc(a[c])||"null");return"["+b[P](",")+"]"}for(c in a)!/___$/[G](c)&&U(a,c)&&"string"===typeof c&&(d=Uc(a[c]))&&b[F](Uc(c)+":"+d);return"{"+b[P](",")+"}"}return""}},Vc=function(a){if(!a)return!1;if(/^[\],:{}\s]*$/[G](a[s](/\\["\\\/b-u]/g,"@")[s](/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")[s](/(?:^|:|,)(?:\s*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}return!1},Wc=!1;try{Wc=!!k[wa]&&'["a"]'===k[wa].stringify(["a"])&&"a"===k[wa].parse('["a"]')[0]}catch(Xc){}
var Yc=function(a){try{return k[wa].parse(a)}catch(b){return!1}},Zc=Wc?k[wa].stringify:Uc,$c=Wc?Yc:Vc;var ad=function(a){var b;a[ma](/^https?%3A/i)&&(b=ea(a));return $a(q,b?b:a)},bd=function(a){a=a||"canonical";for(var b=q[pa]("link"),c=0,d=b[I];c<d;c++){var e=b[c],f=e[M]("rel");if(f&&f[Da]()==a&&(e=e[M]("href"))&&(e=ad(e))&&null!=e[ma](/^https?:\/\/[\w\-\_\.]+/i))return e}return k[A][D]};var cd={se:"0"},dd={post:!0},ed={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},fd="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),gd=S(Y,"WI",T()),hd=function(a,b,c){var d,e;d={};var f=e=a;"plus"==a&&b[ra]&&(e=a+"_"+b[ra],f=a+"/"+b[ra]);(e=Z("iframes/"+e+"/url"))||(e=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");for(var g in cd)d[g]=g+"/"+(b[g]||cd[g])+"/";d=$a(R,e[s](Pc,Sc(d)));g="iframes/"+
a+"/params/";f={};V(b,f);(e=Z("lang")||Z("gwidget/lang"))&&(f.hl=e);dd[a]||(f.origin=k[A].origin||k[A][qa]+"//"+k[A].host);f.exp=Z(g+"exp");if(g=Z(g+"location"))for(e=0;e<g[I];e++){var h=g[e];f[h]=Q[A][h]}switch(a){case "plus":case "follow":g=f[D];e=b[ra]?void 0:"publisher";g=(g="string"==typeof g?g:void 0)?ad(g):bd(e);f.url=g;delete f[D];break;case "plusone":g=(g=b[D])?ad(g):bd();f.url=g;g=b.db;e=Z();null==g&&e&&(g=e.db,null==g&&(g=e.gwidget&&e.gwidget.db));f.db=g||void 0;g=b.ecp;e=Z();null==g&&
e&&(g=e.ecp,null==g&&(g=e.gwidget&&e.gwidget.ecp));f.ecp=g||void 0;delete f[D];break;case "signin":f.url=bd()}Y.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;for(var l in cd)f[l]&&delete f[l];f.gsrc=Z("iframes/:source:");l=Z("inline/css");"undefined"!==typeof l&&0<c&&l>=c&&(f.ic="1");l=/^#|^fr-/;c={};for(var n in f)U(f,n)&&l[G](n)&&(c[n[s](l,"")]=f[n],delete f[n]);n="q"==Z("iframes/"+a+"/params/si")?f:c;l=ec();for(var m in l)!U(l,m)||U(f,m)||U(c,m)||(n[m]=l[m]);m=[][ka](fd);(n=Z("iframes/"+
a+"/methods"))&&"object"===typeof n&&Ja[G](n[F])&&(m=m[ka](n));for(var p in b)U(b,p)&&/^on/[G](p)&&("plus"!=a||"onconnect"!=p)&&(m[F](p),delete f[p]);delete f.callback;c._methods=m[P](",");return Za(d,f,c)},id=["style","data-gapiscan"],kd=function(a){for(var b=T(),c=0!=a[xa][Da]()[H]("g:"),d=0,e=a[sa][I];d<e;d++){var f=a[sa][d],g=f.name,h=f.value;0<=Ka[L](id,g)||c&&0!=g[H]("data-")||"null"===h||"specified"in f&&!f.specified||(c&&(g=g[x](5)),b[g[Da]()]=h)}a=a[B];(c=jd(a&&a[ta]))&&(b.height=r(c));(a=
jd(a&&a[ja]))&&(b.width=r(a));return b},jd=function(a){var b=void 0;"number"===typeof a?b=a:"string"===typeof a&&(b=da(a,10));return b},md=function(){var a=Y.drw;kc(function(b){if(a!==b.id&&4!=b.state&&"share"!=b[ya]){var c=b.id,d=b[ya],e=b.url;b=b.userParams;var f=R[va](c);if(f){var g=hd(d,b,0);g?(f=f[O],e[s](/\#.*/,"")[s](/(\?|&)ic=1/,"")!==g[s](/\#.*/,"")[s](/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,fa(b,d),ld(f,b),(d=$[f.lastChild.id])&&(d.oid=c),lc(c,4))):delete $[c]}else delete $[c]}})};var nd,od,pd,qd,rd,sd=/(?:^|\s)g-((\S)*)(?:$|\s)/,td={plusone:!0,autocomplete:!0,profile:!0,signin:!0};nd=S(Y,"SW",T());od=S(Y,"SA",T());pd=S(Y,"SM",T());qd=S(Y,"FW",[]);rd=null;
var vd=function(a,b){ud(void 0,!1,a,b)},ud=function(a,b,c,d){sb("ps0",!0);c=("string"===typeof c?q[va](c):c)||R;var e;e=R[Ba];if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:Sa(nd)[ka](Sa(od))[ka](Sa(pd));for(var f=[],g=0;g<e[I];g++){var h=e[g];f[F](".g-"+h,"g\\:"+h)}e=c.querySelectorAll(f[P](","))}else e=c[pa]("*");c=T();for(f=0;f<e[I];f++){g=e[f];var l=g,h=d,n=l[xa][Da](),m=void 0;l[M]("data-gapiscan")?h=null:(0==n[H]("g:")?m=n[x](2):(l=(l=r(l.className||l[M]("class")))&&sd[ia](l))&&(m=l[1]),h=!m||!(nd[m]||
od[m]||pd[m])||h&&m!==h?null:m);h&&(td[h]||0==g[xa][Da]()[H]("g:")||0!=Sa(kd(g))[I])&&(g[v]("data-gapiscan",!0),S(c,h,[])[F](g))}if(b)for(var p in c)for(b=c[p],d=0;d<b[I];d++)b[d][v]("data-onload",!0);for(var w in c)qd[F](w);sb("ps1",!0);if((p=qd[P](":"))||a)try{W.load(p,a)}catch(C){hc(C);return}if(wd(rd||{}))for(var u in c){a=c[u];w=0;for(b=a[I];w<b;w++)a[w].removeAttribute("data-gapiscan");xd(u)}else{d=[];for(u in c)for(a=c[u],w=0,b=a[I];w<b;w++)e=a[w],yd(u,e,kd(e),d,b);zd(p,d)}},Ad=function(a){var b=
S(W,a,{});b.go||(b.go=function(b){return vd(b,a)},b.render=function(b,d){var e=d||{};fa(e,a);return ld(b,e)})},Bd=function(a){nd[a]=!0},Cd=function(a){od[a]=!0},Dd=function(a){pd[a]=!0};var xd=function(a,b){var c=kb(a);b&&c?(c(b),(c=b.iframeNode)&&c[v]("data-gapiattached",!0)):W.load(a,function(){var c=kb(a),e=b&&b.iframeNode;e&&c?(c(b),e[v]("data-gapiattached",!0)):(0,W[a].go)(e&&e[O])})},wd=function(){return!1},zd=function(){},yd=function(a,b,c,d,e,f){switch(Ed(b,a,f)){case 0:a=pd[a]?a+"_annotation":a;d={};d.iframeNode=b;d.userParams=c;xd(a,d);break;case 1:var g;if(b[O]){for(var h in c){if(f=U(c,h))f=c[h],f=!!f&&"object"===typeof f&&(!f[y]||f[y]===ba[K][y]||f[y]===ca[K][y]);if(f)try{c[h]=
Zc(c[h])}catch(l){delete c[h]}}var n=!0;c.dontclear&&(n=!1);delete c.dontclear;jc();f=hd(a,c,e);h={allowPost:1,attributes:ed};h.dontclear=!n;e={};e.userParams=c;e.url=f;fa(e,a);var m;c.rd?m=b:(m=q[t]("div"),b[v]("data-gapistub",!0),m[B].cssText="position:absolute;width:450px;left:-10000px;",b[O].insertBefore(m,b));e.siteElement=m;m.id||(b=m,S(gd,a,0),n="___"+a+"_"+gd[a]++,b.id=n);b=T();b[">type"]=a;V(c,b);n=f;c=m;f=h||{};b=f[sa]||{};Ua(!f.allowPost||!b.onload,"onload is not supported by post iframe");
h=b=n;Oc[G](b)&&(h=Z("iframes/"+h[Aa](1)+"/url"),Ua(!!h,"Unknown iframe url config for - "+b));n=$a(R,h[s](Pc,Rc));b=c.ownerDocument||R;m=0;do h=f.id||["I",Lc++,"_",(new Date)[oa]()][P]("");while(b[va](h)&&5>++m);Ua(5>m,"Error creating iframe id");m={};var p={};b[Ba]&&9>b[Ba]&&(m.hostiemode=b[Ba]);V(f.queryParams||{},m);V(f.fragmentParams||{},p);var w=f.connectWithQueryParams?m:p,C=f.pfname,u=T();u.id=h;u.parent=b[A][qa]+"//"+b[A].host;var J=X(b[A][D],"parent"),C=C||"";!C&&J&&(J=X(b[A][D],"id",""),
C=X(b[A][D],"pfname",""),C=J?C+"/"+J:"");u.pfname=C;V(u,w);(u=X(n,"rpctoken")||m.rpctoken||p.rpctoken)||(u=w.rpctoken=f.rpctoken||r(Math.round(1E8*Bc())));f.rpctoken=u;u=b[A][D];w=T();(J=X(u,"_bsh",Y.bsh))&&(w._bsh=J);(u=ib(u))&&(w.jsh=u);f.hintInFragment?V(w,p):V(w,m);n=Za(n,m,p,f.paramsSerializer);p=T();V(Jc,p);V(f[sa],p);p.name=p.id=h;p.src=n;f.eurl=n;if((f||{}).allowPost&&2E3<n[I]){m=Wa(n);p.src="";p["data-postorigin"]=n;n=Nc(b,c,p,h);-1!=navigator.userAgent[H]("WebKit")&&(g=n.contentWindow.document,
g.open(),p=g[t]("div"),w={},u=h+"_inner",w.name=u,w.src="",w.style="display:none",Nc(b,p,w,u,f));p=(f=m.j[0])?f[z]("&"):[];f=[];for(w=0;w<p[I];w++)u=p[w][z]("=",2),f[F]([ea(u[0]),ea(u[1])]);m.j=[];p=Xa(m);m=b[t]("form");m.action=p;m.method="POST";m.target=h;m[B].display="none";for(h=0;h<f[I];h++)p=b[t]("input"),fa(p,"hidden"),p.name=f[h][0],p.value=f[h][1],m[ga](p);c[ga](m);m.submit();m[O][za](m);g&&g.close();g=n}else g=Nc(b,c,p,h,f);e.iframeNode=g;e.id=g[M]("id");g=e.id;c=T();c.id=g;c.userParams=
e.userParams;c.url=e.url;fa(c,e[ya]);c.state=1;$[g]=c;g=e}else g=null;g&&((e=g.id)&&d[F](e),xd(a,g))}},Ed=function(a,b,c){if(a&&1===a.nodeType&&b){if(c)return 1;if(pd[b]){if(hb[a[xa][Da]()])return(a=a.innerHTML)&&a[s](/^[\s\xa0]+|[\s\xa0]+$/g,"")?0:1}else{if(od[b])return 0;if(nd[b])return 1}}return null},ld=function(a,b){var c=b[ya];delete b[ya];var d=("string"===typeof a?q[va](a):a)||void 0;if(d){var e={},f;for(f in b)U(b,f)&&(e[f[Da]()]=b[f]);e.rd=1;(f=!!e.ri)&&delete e.ri;var g=[];yd(c,d,e,g,0,
f);zd(c,g)}else hc("string"==="gapi."+c+".render: missing element "+typeof a?a:"")};S(W,"platform",{}).go=vd;var wd=function(a){for(var b=["_c","jsl","h"],c=0;c<b[I]&&a;c++)a=a[b[c]];b=ib(Ha[D]);return!a||0!=a[H]("n;")&&0!=b[H]("n;")&&a!==b},zd=function(a,b){Fd(a,b)},db=function(a){ud(a,!0)},Gd=function(a,b){for(var c=b||[],d=0;d<c[I];++d)a(c[d]);for(d=0;d<c[I];d++)Ad(c[d])};
wb[F](["platform",function(a,b,c){rd=c;b&&qd[F](b);Gd(Bd,a);Gd(Cd,c._c.annotation);Gd(Dd,c._c.bimodal);ac();Zb();if("explicit"!=Z("parsetags")){jb(a);fc(ec())&&!Z("disableRealtimeCallback")&&jc();var d;c&&(a=c.callback)&&(d=Ta(a),delete c.callback);fb(function(){db(d)})}}]);W._pl=!0;var Hd=function(a){a=(a=$[a])?a.oid:void 0;if(a){var b=R[va](a);b&&b[O][za](b);delete $[a];Hd(a)}};var Id=/^\{h\:'/,Jd=/^!_/,Kd="",Fd=function(a,b){function c(){bb("message",d,"remove","de")}function d(d){var g=d.data,h=d.origin;if(Ld(g,b)){var l=e;e=!1;l&&sb("rqe");Md(a,function(){l&&sb("rqd");c();for(var a=S(Y,"RPMQ",[]),b=0;b<a[I];b++)a[b]({data:g,origin:h})})}}if(0!==b[I]){Kd=X(Ha[D],"pfname","");var e=!0;bb("message",d,"add","at");Tb(a,c)}},Ld=function(a,b){a=r(a);if(Id[G](a))return!0;var c=!1;Jd[G](a)&&(c=!0,a=a[x](2));if(!/^\{/[G](a))return!1;var d=$c(a);if(!d)return!1;var e=d.f;if(d.s&&
e&&-1!=Ka[L](b,e)){if("_renderstart"===d.s||d.s===Kd+"/"+e+"::_renderstart"){var f=d.a&&d.a[c?0:1],c=R[va](e);lc(e,2);if(f&&c&&f[ja]&&f[ta]){n:{d=c[O];e=f||{};if(ic()){var g=c.id;if(g){f=(f=$[g])?f.state:void 0;if(1===f||4===f)break n;Hd(g)}}(f=d.nextSibling)&&f[M]&&f[M]("data-gapistub")&&(d[O][za](f),d[B].cssText="");var f=e[ja],h=e[ta],l=d[B];l.textIndent="0";l.margin="0";l.padding="0";l.background="transparent";l.borderStyle="none";l.cssFloat="none";l.styleFloat="none";l.lineHeight="normal";l.fontSize=
"1px";l.verticalAlign="baseline";d=d[B];d.display="inline-block";l=c[B];l.position="static";l.left=0;l.top=0;l.visibility="visible";f&&(d.width=l.width=f+"px");h&&(d.height=l.height=h+"px");e.verticalAlign&&(d.verticalAlign=e.verticalAlign);g&&lc(g,3)}c["data-csi-wdt"]=(new Date)[oa]()}}return!0}return!1},Md=function(a,b){Tb(a,b)};var Nd=function(a,b){this.B=a;var c=b||{};this.R=c.W;this.A=c.domain;this.C=c.path;this.S=c.X},Od=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,Pd=/^[A-Z_][A-Z0-9_]{0,63}$/;
Nd[K].write=function(a,b){if(!Pd[G](this.B))throw"Invalid cookie name";if(!Od[G](a))throw"Invalid cookie value";var c=this.B+"="+a;this.A&&(c+=";domain="+this.A);this.C&&(c+=";path="+this.C);var d="number"===typeof b?b:this.R;if(0<=d){var e=new Date;e.setSeconds(e.getSeconds()+d);c+=";expires="+e.toUTCString()}this.S&&(c+=";secure");q.cookie=c;return!0};Nd.iterate=function(a){for(var b=q.cookie[z](/;\s*/),c=0;c<b[I];++c){var d=b[c][z]("="),e=d[ha]();a(e,d[P]("="))}};var Qd=function(a){this.U=a},Rd={};Qd[K].write=function(a){Rd[this.U]=a;return!0};Qd.iterate=function(a){for(var b in Rd)Rd.hasOwnProperty(b)&&a(b,Rd[b])};var Sd="https:"===k[A][qa],Td=Sd||"http:"===k[A][qa]?Nd:Qd,Ud=function(a){var b=a[x](1),c="",d=k[A].hostname;if(""!==b){c=da(b,10);if(isNaN(c))return null;b=d[z](".");if(b[I]<c-1)return null;b[I]==c-1&&(d="."+d)}else d="";return{d:"S"==a[la](0),domain:d,i:c}},Vd=function(a){if(0!==a[H]("GCSC"))return null;var b={w:!1};a=a[x](4);if(!a)return b;var c=a[la](0);a=a[x](1);var d=a.lastIndexOf("_");if(-1==d)return b;var e=Ud(a[x](d+1));if(null==e)return b;a=a[Aa](0,d);if("_"!==a[la](0))return b;d="E"===
c&&e.d;return!d&&("U"!==c||e.d)||d&&!Sd?b:{w:!0,d:d,V:a[x](1),domain:e.domain,i:e.i}},Wd=function(a){if(!a)return[];a=a[z]("=");return a[1]?a[1][z]("|"):[]},Xd=function(a){a=a[z](":");return{t:a[0][z]("=")[1],O:Wd(a[1]),Z:Wd(a[2]),Y:Wd(a[3])}},Yd=function(){var a,b=null;Td.iterate(function(c,d){if(0===c[H]("G_AUTHUSER_")){var e=Ud(c[Aa](11));if(!a||e.d&&!a.d||e.d==a.d&&e.i>a.i)a=e,b=d}});if(null!==b){var c;Td.iterate(function(b,d){var e=Vd(b);e&&e.w&&e.d==a.d&&e.i==a.i&&(c=d)});if(c){var d=Xd(c),
e=d&&d.O[Number(b)],d=d&&d.t;if(e)return{P:b,Q:e,t:d}}}return null};var Zd=function(a){this.G=a};Zd[K].k=0;Zd[K].F=2;Zd[K].G=null;Zd[K].v=!1;Zd[K].L=function(){this.v||(this.k=0,this.v=!0,this.D())};Zd[K].D=function(){this.v&&(this.G()?this.k=this.F:this.k=Math.min(2*(this.k||this.F),120),k.setTimeout(Ga(this.D,this),1E3*this.k))};for(var $d=0;64>$d;++$d);var ae=null,ic=function(){return Y.oa=!0},jc=function(){Y.oa=!0;var a=Yd();(a=a&&a.P)&&$b("googleapis.config/sessionIndex",a);ae||(ae=S(Y,"ss",new Zd(be)));a=ae;a.L&&a.L()},be=function(){var a=Yd(),b=a&&a.Q||null,c=a&&a.t;Tb("auth",{callback:function(){var a=Q.gapi.auth,e={client_id:c,session_state:b};a.checkSessionState(e,function(b){var c=e.session_state,h=Z("isLoggedIn");b=Z("debug/forceIm")?!1:c&&b||!c&&!b;if(h=h!=b)$b("isLoggedIn",b),jc(),md(),b||((b=a.signOut)?b():(b=a.setToken)&&b(null));b=
ec();var l=Z("savedUserState"),c=a._guss(b.cookiepolicy),l=l!=c&&"undefined"!=typeof l;$b("savedUserState",c);(h||l)&&fc(b)&&!Z("disableRealtimeCallback")&&a._pimf(b,!0)})}});return!0};sb("bs0",!0,k.gapi._bs);sb("bs1",!0);delete k.gapi._bs;})();
gapi.load("plusone",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"llang":"zh","client":{"headers":{"response":["Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","ETag","Expires","Last-Modified","Location","Pragma","Range","Server","Transfer-Encoding","WWW-Authenticate","X-Goog-Safety-Content-Type","X-Goog-Safety-Encoding","X-Goog-Upload-Chunk-Granularity","X-Goog-Upload-Control-URL","X-Goog-Upload-Size-Received","X-Goog-Upload-Status","X-Goog-Upload-URL","X-Goog-Diff-Download-Range","X-Goog-Hash","X-Server-Object-Version","X-Guploader-Customer","X-Guploader-Upload-Result","X-Guploader-Uploadid"],"request":["Accept","Accept-Language","Authorization","Cache-Control","Content-Disposition","Content-Encoding","Content-Language","Content-Length","Content-MD5","Content-Range","Content-Type","Date","GData-Version","Host","If-Match","If-Modified-Since","If-None-Match","If-Unmodified-Since","Origin","OriginToken","Pragma","Range","Slug","Transfer-Encoding","X-ClientDetails","X-GData-Client","X-GData-Key","X-Goog-AuthUser","X-Goog-PageId","X-Goog-Encode-Response-If-Executable","X-Goog-Correlation-Id","X-Goog-Request-Info","X-Goog-Experiments","x-goog-iam-role","x-goog-iam-authorization-token","X-Goog-Spatula","X-Goog-Upload-Command","X-Goog-Upload-Content-Disposition","X-Goog-Upload-Content-Length","X-Goog-Upload-Content-Type","X-Goog-Upload-File-Name","X-Goog-Upload-Offset","X-Goog-Upload-Protocol","X-Goog-Visitor-Id","X-HTTP-Method-Override","X-JavaScript-User-Agent","X-Pan-Versionid","X-Origin","X-Referer","X-Upload-Content-Length","X-Upload-Content-Type","X-Use-HTTP-Status-Code-Override","X-YouTube-VVT","X-YouTube-Page-CL","X-YouTube-Page-Timestamp"]},"cors":false},"plus_layer":{"isEnabled":false},"enableMultilogin":true,"disableRealtimeCallback":false,"isLoggedIn":false,"iframes":{"additnow":{"methods":["launchurl"],"url":"https://apis.google.com/additnow/additnow.html?usegapi\u003d1"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"photocomments":{"url":":socialhost:/:session_prefix:_/widget/render/photocomments?usegapi\u003d1"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"signin":{"methods":["onauth"],"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"youtube":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"reportabuse":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/reportabuse?usegapi\u003d1"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"shortlists":{"url":""},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},":socialhost:":"https://apis.google.com","post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},":source:":"3p","blogger":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1"},"savetowallet":{"url":"https://clients5.google.com/s2w/o/savetowallet"},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"savetodrive":{"methods":["save"],"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1"},":im_socialhost:":"https://plus.googleapis.com","ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},":signuphost:":"https://plus.google.com","plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"methods":["scroll","openwindow"],"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1"},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"}},"isPlusUser":false,"debug":{"host":"https://apis.google.com","forceIm":false,"reportExceptionRate":0.05,"rethrowException":false},"enableContextualSignin":false,"enableSigninTooltip":false,"deviceType":"desktop","inline":{"css":1},"lexps":[102,99,97,79,109,45,17,117,115,81,127,123,122,61,30],"include_granted_scopes":true,"oauth-flow":{"usegapi":false,"disableOpt":true,"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay"},"report":{"apiRate":{"gapi\\.signin\\..*":0.05},"host":"https://apis.google.com","rate":0.001,"apis":["iframes\\..*","gadgets\\..*","gapi\\.appcirclepicker\\..*","gapi\\.auth\\..*","gapi\\.client\\..*"]},"csi":{"rate":0.01},"googleapis.config":{"auth":{"useFirstPartyAuthV2":false}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.zh_CN.xFQUMmaJaHg.O/m\u003d__features__/am\u003dAQ/rt\u003dj/d\u003d1/t\u003dzcms/rs\u003dAItRSTPtS9Amc-7RC1mb59EvTfRyVVT75w","u":"https://apis.google.com/js/plusone.js","hee":true,"fp":"55da5efad07bbc48f46e6e998cd919f2a45d531c","dpo":false},"platform":["additnow","blogger","comments","commentcount","community","follow","page","person","plus","plusone","post","reportabuse","savetodrive","savetowallet","shortlists","visibility","youtube","ytsubscribe","zoomableimage","photocomments","hangout"],"fp":"55da5efad07bbc48f46e6e998cd919f2a45d531c","annotation":["interactivepost","recobar","autocomplete","profile"],"bimodal":["signin","share"]}});