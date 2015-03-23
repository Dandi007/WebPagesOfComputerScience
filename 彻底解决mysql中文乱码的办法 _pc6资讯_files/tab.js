function PostCookie(a){var b=new Date;b.setTime(b.getTime()+6048E5);document.cookie=a+";expires="+b.toGMTString()+";path = /;"}function getCookie(a){var b=document.cookie,c=b.indexOf(a+"=");if(-1==c)return null;c+=a.length+1;a=b.indexOf(";",c);return-1==a?unescape(b.substring(c)):unescape(b.substring(c,a))}String.prototype.Trim=function(){return this.replace(/(^\s+)|(\s+$)/g,"")};String.prototype.Ltrim=function(){return this.replace(/(^\s+)/g,"")};
String.prototype.Rtrim=function(){return this.replace(/(\s+$)/g,"")};var http_request=!0;
function send_request(a,b,c,d){http_request=!1;if(window.XMLHttpRequest)http_request=new XMLHttpRequest,http_request.overrideMimeType&&http_request.overrideMimeType("text/xml");else if(window.ActiveXObject)try{http_request=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{http_request=new ActiveXObject("Microsoft.XMLHTTP")}catch(f){}}if(!http_request)return window.alert("\u4e0d\u80fd\u521b\u5efaXMLHttpRequest\u5bf9\u8c61\u5b9e\u4f8b."),!1;http_request.onreadystatechange=c;
//http_request.open("Post",a,d);
http_request.open("Get", a+'?'+b, true);
http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");http_request.send(b)}function processRequest(){4==http_request.readyState&&200==http_request.status&&alert(http_request.responseText)}function addfav(a,b){try{window.external.addFavorite(a,b)}catch(c){try{window.sidebar.addPanel(b,a,"")}catch(d){alert("\u52a0\u5165\u6536\u85cf\u5931\u8d25\uff0c\u8bf7\u4f7f\u7528Ctrl+D\u8fdb\u884c\u6dfb\u52a0")}}}function address(a,b){window.external.AddFavorite(a,b)}
function isNumberS(a,b){if(""==b.value)return alert(b.name+": \u4e0d\u80fd\u4e3a\u7a7a"),b.focus(),!1;if(isNaN(b.value))return alert(b.name+": \u5fc5\u987b\u4e3a\u6570\u5b57"),b.focus(),!1;if(a<b.value)return alert(b.name+": \u4e0d\u80fd\u5927\u4e8e"+a),b.focus(),!1}function ViewCmsHits(a,b){var c=document.getElementById(a);send_request("../ajax.asp","Action=4&id="+b,function(){4==http_request.readyState&&200==http_request.status&&($(c).html(http_request.responseText))},!0)}
function ViewCommCount(a,b,c){var d=document.getElementById(a);send_request("../ajax.asp","Action=16&CommentTpye="+b+"&id="+c,function(){4==http_request.readyState&&200==http_request.status&&(d.innerHTML=http_request.responseText)},!0)}
function ViewCmsImages(a,b){var c=document.getElementById(a).getElementsByTagName("img");for(i=0;i<c.length;i++)"a"!=c[i].parentNode.tagName&&(c[i].onclick=function(){window.open("/viewimg_"+b+"_1.html?"+this.src,"n","")},c[i].title="\u70b9\u51fb\u67e5\u770b\u5927\u56fe",c[i].style.cursor="pointer")}
function liClick(a,b,c,d){c=document.getElementById(b).getElementsByTagName(c);for(i=1;i<c.length;i++)c[i].className=null,c[i]==a?document.getElementById(b+"_"+i).style.display="":document.getElementById(b+"_"+i).style.display="none";a.className=d}var isSubmit=!1;
function submitComment(){var a=document.forms.FormComment;null==a&&(a=document.forms.zt_ly);var b=a.Content;null==b&&(b=a.ly_content);var c=b.value.Trim();if(""==c)return alert("\u8bc4\u8bba\u7684\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a\uff01"),b.focus(),!1;if(5>c.length||1E3<c.length)return alert("\u8bc4\u8bba\u7684\u5185\u5bb9\u4e0d\u80fd\u5c0f\u4e8e5 \u5927\u4e8e 1000 \u4e2a\u5b57\u7b26\uff01"),b.focus(),!1;var d;d=c.replace(/\{.+?\}/g,"");if(""==d.Trim())return alert("\u5bf9\u4e0d\u8d77\u4e0d\u80fd\u53d1\u8868\u7eaf\u8868\u60c5! \u611f\u8c22\u60a8\u7684\u652f\u6301\uff01"),
b.focus(),!1;d=a.ly_id;null==d&&(d=a.softid);a=a.CommentTpye;a=null==a?0:a.value;c="content="+escape(c)+"&SoftID="+escape(d.value)+"&Action=2&CommentTpye="+a;send_request("/ajax.asp",c,function(){if(4==http_request.readyState&&200==http_request.status){var a=http_request.responseText;b.value="";ViewComment(a)}},!0);isSubmit=!0}
function ViewComment(a){var b="<dt><span><i>\u9876\u697c </i><b >\u60a8\u53d1\u8868\u7684\u8bc4\u8bba</b> </span><em>\u53d1\u8868\u4e8e: <font color='red'> "+(new Date).toLocaleString()+" </font> </em></dt>";$("#comment_1 dl").append(b+("<dd> "+a+" <p></p></dd>"))}function CommentOnblur(){document.getElementById("viewGetCode").style.display=""}function submitForm(){if("undefined"!=typeof window.event&&window.event.ctrlKey&&13==window.event.keyCode)return submitComment(),!0}
function switchTab(a,b,c,d){for(var e=a.parentNode,f=0,g=0,g=0;g<e.childNodes.length;g++)if("#text"!=e.childNodes[g].nodeName){e.childNodes[g].className=c+"1";var h=document.getElementById(d+f);null!=h&&(h.style.display="none",b==f&&(h.style.display=""));f+=1}a.className=c+"2"}
function shortcutKey(a){"undefined"==typeof passcss&&(a="#cms_showpage_text");var b=$(a);if(0!=b.length){var c=document.createElement("span");c.innerHTML='\u63d0\u793a\uff1a\u6309"\u2190\u2192"\u952e\u5feb\u901f\u7ffb\u9875';b[0].appendChild(c);var d=$(a+" a"),e=parseInt($(a+" b").text());$(document).keyup(function(a){var b=a.target.tagName.toLowerCase();"input"===b||"textarea"===b||(37==a.keyCode&&(1<e?window.location.href=d[e-2].href:alert("\u8fd9\u5df2\u7ecf\u662f\u7b2c\u4e00\u9875\u4e86")),39==
a.keyCode&&(e<d.length?window.location.href=d[e-1].href:alert("\u4f60\u5df2\u7ecf\u6d4f\u89c8\u5b8c\u6240\u6709\u5185\u5bb9")))})}}function Cms_Title_Click(a){a.style.background="  url(images/cms_c2_2.jpg) top center'"}function softCount(a,b){var c="Action=6&SoftLinkID="+escape(b)+"&SoftID="+escape(a);send_request("../ajax.asp",c,function(){},!0)}function resizepic(a){700<a.width&&(a.width=700)}
function bbimg(a){var b=parseInt(a.style.zoom,10)||100,b=b+event.wheelDelta/12;0<b&&(a.style.zoom=b+"%");return!1}function ThissetHomePage(){document.body.style.behavior="url(#default#homepage)";document.body.setHomePage("http://www.1188b.com/?i")}function address_click(){"Yes"!=getCookie("Address_Home")&&(ThissetHomePage(),PostCookie("Address_Home=Yes"));return!0}
function setHomepage(a){if(document.all)document.body.style.behavior="url(#default#homepage)",document.body.setHomePage(a);else if(window.sidebar){if(window.netscape)try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(b){alert("\u8be5\u64cd\u4f5c\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff0c\u5047\u5982\u60f3\u542f\u7528\u8be5\u529f\u80fd\uff0c\u8bf7\u5728\u5730\u5740\u680f\u5185\u8f93\u5165 about:config,\u7136\u540e\u5c06\u9879 signed.applets.codebase_principal_support \u503c\u8be5\u4e3atrue")}Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch).setCharPref("browser.startup.homepage",a)}}
function address_click2(a){"Yes"!=getCookie("Address_Home")&&(document.body.style.behavior="url(#default#homepage)",document.body.setHomePage(a),PostCookie("Address_Home=Yes"));return!0}function ReImgSize(a,b,c){a.width>b&&(a.width=b,a.style.border="none")}
var debug="",img_maxwidth=function(){if("maxWidth"in document.createElement("img").style)return function(){};var a,b=function(){try{document.documentElement.doScroll("left")}catch(c){setTimeout(b,20);return}a()},c="undefined"!==typeof jQurey?jQuery:function(c){a=c;b()},d=function(a){c(function(){"string"==typeof a&&(a=document.getElementById(a));f(a.getElementsByTagName("img"))})},e=function(a,b){a.attachEvent("onload",function(){a.width>b&&(a.style.width=b+"px")})},f=function(a){for(var b,c,d=a.length;b=
a[--d];)if(c=parseInt(b.currentStyle["max-width"]))b.complete||b.width>c?b.style.width=c+"px":e(b,c)};return function(a){var b;a?"string"==typeof a?(b=document.getElementById(a))?f(b.getElementsByTagName("img")):d(a):0 in a&&1==a[0].nodeType&&f(a):d(document)}}();function getRadioBoxValue(a){a=document.getElementsByName(a);for(i=0;i<a.length;i++)if(a[i].checked)return a[i].value;return"undefined"}
function html_trans(a){a=a.replace(/\r/g,"");a=a.replace(/on(load|click|dbclick|mouseover|mousedown|mouseup)="[^"]+"/ig,"");a=a.replace(/<script[^>]*?>([\w\W]*?)<\/script>/ig,"");a=a.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/ig,"[url=$1]$2[/url]");a=a.replace(/<font[^>]+color=([^ >]+)[^>]*>(.*?)<\/font>/ig,"[color=$1]$2[/color]");a=a.replace(/<img[^>]+src="([^"]+)"[^>]*>/ig,"[img]$1[/img]");a=a.replace(/<([\/]?)b>/ig,"[$1b]");a=a.replace(/<([\/]?)strong>/ig,"[$1b]");a=a.replace(/<([\/]?)u>/ig,
"[$1u]");a=a.replace(/<([\/]?)i>/ig,"[$1i]");a=a.replace(/&nbsp;/g," ");a=a.replace(/&amp;/g,"&");a=a.replace(/&quot;/g,'"');a=a.replace(/&lt;/g,"<");a=a.replace(/&gt;/g,">");a=a.replace(/<br>/ig,"\n");a=a.replace(/<[^>]*?>/g,"");a=a.replace(/\[url=([^\]]+)\]\n(\[img\]\1\[\/img\])\n\[\/url\]/g,"$2");a=a.replace(/\n+/g,"\n");a=my_format(a);return a=a.replace(/\n/g,"\n")}
function my_format(a){var b;b="";a=a.split("\n");for(var c=0;c<a.length;c++){for(;" "==a[c].substr(0,1)||"\u3000"==a[c].substr(0,1);)a[c]=a[c].substr(1,a[c].length);0<a[c].length&&(b+="\u3000\u3000"+a[c]+"\n")}return b}
function MakeUbb(a){a=document.getElementById(a);if(isNaN(a.TopNum.value))return a.TopNum.value="",a.TopNum.focus(),alert("\u8bb0\u5f55\u6761\u6570\u53ea\u80fd\u4e3a\u6570\u5b57\uff01\uff01"),!1;var b;b="undefined"==typeof UbbType?0:UbbType;document.getElementById("List").innerHTML="\u6b63\u5728\u67e5\u8be2\u4e2d...";var c="Action=8&IsSize="+escape(a.IsSize.checked)+"&IsCateID="+escape(a.IsCateID.checked)+"&IsAtrImages="+escape(a.IsAtrImages.checked)+"&IsZhilian="+escape(a.IsZhilian.checked),c=c+
("&IsLanguage="+escape(a.IsLanguage.checked)+"&IsSoftSystem="+escape(a.IsSoftSystem.checked)+"&IsSoftViewImg="+escape(a.IsSoftViewImg.checked)),c=c+("&IsContent="+escape(a.IsContent.checked)+"&IsHttp="+escape(a.IsHttp.checked)+"&IsXunLei="+escape(a.IsXunLei.checked)),c=c+("&Bdate="+escape(a.Bdate.value)+"&Edate="+escape(a.Edate.value)+"&TopNum="+escape(a.TopNum.value)),c=c+("&Tradio="+escape(getRadioBoxValue("Tradio"))+"&order="+escape(getRadioBoxValue("order"))+"&Keys_u="+escape(a.Keys_u.value)),
c=c+("&UbbType="+b);null!=document.getElementById("ContentNum")&&(c+="&ContentNum="+escape(a.ContentNum.value));null!=document.getElementById("IsDownLink")&&(c+="&IsDownLink="+escape(a.IsDownLink.checked));send_request("ajax.asp",c,function(){4==http_request.readyState&&(200==http_request.status?1==b?makeCheckBtn(http_request.responseText):document.getElementById("List").innerHTML=unescape(http_request.responseText):alert(http_request.responseText))},!0)}
function senfe(a,b,c,d,e){a=document.getElementById(a).getElementsByTagName("tr");for(var f=0;f<a.length;f++)a[f].style.backgroundColor=0==a[f].sectionRowIndex%2?b:c,a[f].onclick=function(){"1"!=this.x?(this.x="1",this.style.backgroundColor=e):(this.x="0",this.style.backgroundColor=0==this.sectionRowIndex%2?b:c)},a[f].onmouseover=function(){"1"!=this.x&&(this.style.backgroundColor=d)},a[f].onmouseout=function(){"1"!=this.x&&(this.style.backgroundColor=0==this.sectionRowIndex%2?b:c)}}
var mailshowed=!1,showDiv="ListSpaces";
function setShowSpace(a,b){if(""!=b){if(null==document.getElementById(showDiv)){var c=document.createElement("div");c.id=showDiv;c.innerHTML="";c.onmouseout=function(){closelisetSpace()};var d=document.getElementById("top");null==d?a.parentNode.insertBefore(c):d.parentNode.insertBefore(c,d)}var c=a.offsetLeft,e;for(e=a;e=e.offsetParent;)c+=e.offsetLeft;d=a.offsetTop;for(e=a;e=e.offsetParent;)d+=e.offsetTop;e=document.getElementById(showDiv);null!=e&&(e.innerHTML="<img src="+b+">",e.style.left=c+"px",
e.style.top=d+a.clientHeight+"px",e.style.display="")}}function closelisetSpace(){var a=document.getElementById(showDiv);null!=a&&(a.style.display="none")}var showYouxiPicDiv="divLable",timer;
function showYouxiPic(a,b){if(!(""==b||null==a)){var c="";send_request("../ajax.asp","Action=9&id="+b,function(){4==http_request.readyState&&200==http_request.status&&(c=http_request.responseText)},!1);if(!(""==c||"NO"==c)){var d=document.getElementById(showYouxiPicDiv);d.getElementsByTagName("div")[1].innerHTML=c;var e=a.offsetLeft,f;for(f=a;f=f.offsetParent;)e+=f.offsetLeft;var g=a.offsetTop;for(f=a;f=f.offsetParent;)g+=f.offsetTop;d.style.top=g;d.style.left=document.body.scrollWidth-e<document.body.scrollWidth/
2?e-500+"px":e+a.clientWidth+"px";d.style.display="block"}}}function closeshowYouxiPic(){"block"==document.getElementById(showYouxiPicDiv).style.display&&(timer=setTimeout("showYouxiPicDiv_hide()",500))}function showYouxiPicDiv_mouseover(){try{window.clearTimeout(timer)}catch(a){}}function showYouxiPicDiv_hide(){var a=document.getElementById(showYouxiPicDiv);null!=a&&(a.style.display="none")}function insFace(a,b){document.getElementById(b).value+="{f:"+a+"}"}var isVote=!1;
function sEval(a,b,c,d,e){b="Action=0&softid="+escape(a)+"&num="+escape(b)+"&type="+e;send_request("../ajax.asp",b,function(){4==http_request.readyState&&200==http_request.status&&(ReadMark(a,c,d,e),alert("\u6295\u7968\u6210\u529f!!"))},!1);isVote=!0}
function ReadMark(a,b,c,d){a="Action=1&softid="+escape(a)+"&type="+d;b=document.getElementById(b).getElementsByTagName("div")[1].getElementsByTagName("div");var e=b[0].getElementsByTagName("span")[0],f=b[1];b=document.getElementById(c).getElementsByTagName("div")[1].getElementsByTagName("div");var g=b[0].getElementsByTagName("span")[0],h=b[1];send_request("../ajax.asp",a,function(){if(4==http_request.readyState&&200==http_request.status){var a=http_request.responseText,b=a.split("|")[0],a=a.split("|")[1],
c=parseInt(b)+parseInt(a);if(0==c)var d=50,c=50;else d=parseInt(100*(parseInt(b)/c)),c=100-parseInt(100*(parseInt(b)/c));f.innerHTML="%"+d+"("+b+")";h.innerText="%"+c+"("+a+")";e.style.width=d+"%";g.style.width=c+"%"}},!1)}function ngsEval(a,b,c,d,e){var f=$(b),g=$(c);f.css({cursor:"pointer"});f.click(function(){ngSendEval(a,b,c,d,1,e);isVote=!0});g.click(function(){ngSendEval(a,b,c,d,2,e);isVote=!0})}
function ngSendEval(a,b,c,d,e,f){if(isVote&&0<e)return alert("\u60a8\u5df2\u7ecf\u6295\u8fc7\u7968\u4e86,\u8bf7\u4e0d\u8981\u91cd\u590d\u6295\u7968,\u611f\u8c22\u60a8\u7684\u652f\u6301!!"),!0;$.ajax({type:"POST",url:"/ajax.asp",data:"action=3&id="+a+"&num="+e+"&type="+f,success:function(a){ListEval(b,c,d,a)}})}
function ListEval(a,b,c,d){var e=$(a+" img"),f=$(a+" em");a=$(a+" b");var g=$(b+" img"),h=$(b+" em");b=$(b+" b");c=$(c);d=eval("("+d+")");e.eq(0).animate({width:"1%"},200);e.eq(0).animate({width:+d.Percentage[0]+"%"},"slow");g.eq(0).animate({width:"1%"},200);g.eq(0).animate({width:+d.Percentage[1]+"%"},"slow");f.eq(0).html(d.Percentage[0]+"%("+d.Num[0]+")");h.eq(0).html(d.Percentage[1]+"%("+d.Num[1]+")");a.eq(0).html(d.Num[0]);b.eq(0).html(d.Num[1]);c.html(d.Very[0])}
function countLyNum(a,b){var c=document.getElementById(b),d=a.innerHTML.length;500<d&&(alert("\u53ea\u5141\u8bb8\u8f93\u5165500\u4e2a\u5b57\u7b26\uff0c\u8d85\u8fc7\u90e8\u4efd\u5c06\u81ea\u52a8\u5220\u9664"),a.innerHTML=a.innerHTML.substr(1,500));null!=c&&(c.innerHTML=d)}
function autoSearch(){var a;a={serviceUrl:"/ajax.asp",minChars:1,delimiter:/(,|;)\s*/,maxHeight:400,zIndex:9999,deferRequestBy:0,params:{action:"15"},onSelect:function(a,c){window.location=c},noCache:!0};0<$("#keyword").length&&$("#keyword").autocomplete(a)}function SetMoon(a,b){$("#"+b+" b");$("#"+b+" span");var c=$("#"+b+" em"),d=c.length;c.css({cursor:"pointer"});c.click(function(){SendMoon(a,d,$(this).attr("name"),b)});SendMoon(a,d,0,b)}
function SendMoon(a,b,c,d){if(c>0)ajaxtype="POST";else ajaxtype="GET";$.ajax({type:ajaxtype,url:"/ajax.asp",data:"Action=17&id="+a+"&countid="+b+"&sendid="+c+"",success:function(a){ListMoon(a,d)}})}
function ListMoon(a,b){var c=$("#"+b+" b"),d=$("#"+b+"  >ul>li> span >  img");$("#"+b+" em");var e=c.length,f=eval("("+a+")");$("#"+b+" label").html(f.CountNumBer);for(var g=0;g<e;g++)c.get(g).innerHTML=f.Num[g],d.eq(g).hide(),d.eq(g).css("height",f.data[g]+"%"),d.eq(g).slideDown("slow")}
function senderror(a,b){var c=document.getElementById(b);if(1>c.value.Trim().length)return alert("\u8bf7\u63d0\u4f9b\u62a5\u9519\u4fe1\u606f\u8c22\u8c22!!"),!1;var d="content="+escape(c.value)+"&SoftID="+escape(a)+"&Action=2&CommentTpye=3";send_request("/ajax.asp",d,function(){if(4==http_request.readyState)if(200==http_request.status){var a=http_request.responseText;"OK"==a?(alert("\u4f60\u7684\u62a5\u9519\u4fe1\u606f\u5df2\u7ecf\u63d0\u4ea4\u611f\u8c22\u60a8\u7684\u652f\u6301\u3002"),c.value=""):
alert(a)}else alert("\u5199\u6570\u636e\u51fa\u9519\u4e86\uff01\uff01")},!0);return!0}function BindDing(a,b,c){$(a)}function SendDing(a){$.ajax({type:"POST",url:"/ajax.asp",data:"action=19&id="+a,success:function(a){}})}function ReadDing(a,b,c){$(a)}function ListDing(a,b){for(var c=$(a),d=eval("("+b+")"),e=0;e<c.length;e++)for(var f=c.eq(e).find("span"),g=c.eq(e).attr("id"),h=0;h<d.ID.length;h++)if(g==d.ID[h]){f.html(d.Ding[h]);break}}
function SendVote(a,b,c){b=$(b+" input");for(var d="",e=0;e<b.length;e++)!0==b.eq(e).attr("checked")&&(""!=d&&(d+=","),d+=e),b.eq(e).attr("checked",!1);""==d?alert("\u8bf7\u9009\u62e9\u4e00\u4e2a\u9879\u76ee!!"):(a="action=21&id="+a+"&v="+escape(d),$.ajax({type:"POST",url:"/ajax.asp",data:a,success:function(a){c(a)}}))}function OneVote(a,b,c){a="action=21&id="+a+"&v="+escape(b);$.ajax({type:"POST",url:"/ajax.asp",data:a,success:function(a){c(a)}})}
function ReadVote(a,b){$.ajax({type:"POST",url:"/ajax.asp",data:"action=21&id="+a+"&v=",success:function(a){b(a)}})}function Listvote(a,b,c,d){a=$(a);b=eval("("+b+")");for(var e=0,f=0;f<a.length;f++)c?a.eq(f).html(b.Num[f]):(e=(100*(b.Num[f]/b.NumBer)).toFixed(1),""==d?a.eq(f).html(e+"%"):a.eq(f).css(d,e+"%"))};

//选项卡
function onSelect(obj,ch)
 {
	 var parentNodeObj= obj.parentNode;
	 var s=0;
	 for(i=0;i<parentNodeObj.childNodes.length;i++)
	 {
		// alert("第" +i +"次")
		if (parentNodeObj.childNodes[i].nodeName=="#text")
		   {
			 continue;  
		   }
		parentNodeObj.childNodes[i].className="tab_1";
		var newObj=document.getElementById(ch + "_" + s);
		
		if(newObj!=null)
		{
			 newObj.style.display='none';
			 if(parentNodeObj.childNodes[i]==obj)
			 {
				newObj.style.display='';	
			 }
		}
		s +=1;
	 }
	 obj.className="tab_2";
 }
//IE6图片自动缩放
function imgFix(){ 
  var widthRestriction = 600; 
  var heightRestriction = 600; 
  var allElements = document.getElementsByTagName('*')   
  for (var i = 0; i < allElements.length; i++) 
  { 
    if (allElements[i].id.indexOf('contentBox') >= 0) 
        { 
      var imgElements = allElements[i].getElementsByTagName('img'); 
      for (var j=0; j < imgElements.length; j++) 
           { 
			  if ( imgElements[j].width > widthRestriction ) 
			     { 
				    imgElements[j].width = widthRestriction; 
			     } 		 
           } /*for j*/ 
       } 
  }/*for i*/ 
} 
imgFix();

//支持效果 lj
//评论页读取顶
function BindDing(objtext,id,CommentTpye)
{
    var obj=$(objtext)
    //var sobj = obj..$("a")
    
    if (obj.length==0) return false;
      //alert(obj.length) 
     for (var i=0 ;i<obj.length;i++)
     {
      var sobj = obj.eq(i).find("a").first();
      //alert(sobj.length)  

      sobj.click(function (){ 
                           SendDing($(this).parent().attr("id"));
                           
                           var  spanobj = $(this).parent().find("span")
                           spanobj.html(parseInt(spanobj.html())+1);
						   spanobj.css({"color":"#999"});
						   
						   var emobj = $(this).parent().find("em");
						   emobj.css({"color":"#999"});
						   
                            $(this).unbind();                            
                            $(this).attr("title","您已经顶过了").css({"cursor":"default","color":"#999"});														
							                            
                           })
     }
    ReadDing(objtext,id,CommentTpye)    
}

function SendDing(id)//发送顶
{
    //alert(id)
    var url="action=19&id="+id
   $.ajax({
   type: "POST",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
     // alert(msg)  ;
   }
});
}

function ReadDing(objtext,id,CommentTpye)
{
    var obj=$(objtext)
    var sendid=""
    for (var i=0 ;i<obj.length;i++)
    {
        sendid+=obj.eq(i).attr("id");
        if (i<(obj.length-1)) sendid+=",";
    }
  var url="Action=18&id="+id+"&CommentTpye="+CommentTpye+"&sendid="+escape(sendid)+""
 //alert(url)
  $.ajax({
   type: "GET",
   url: "/ajax.asp",
   data: url,
   success: function(msg){
      ListDing(objtext,msg);
   }
}); 
}

function ListDing(objtext,msg) //显示顶的数据
{
    //alert(msg)
    var obj=$(objtext)
    var dataObj=eval("("+msg+")");//转换为json对象
     for (var i=0 ;i<obj.length;i++)
     { 
       var spanobj = obj.eq(i).find("span")
       var sid = obj.eq(i).attr("id");
       for (var y=0;y < dataObj.ID.length;y++)
       {
           if (sid == dataObj.ID[y])
           {
             spanobj.html(dataObj.Ding[y]);
             break;
           }
       }
    }   
}


var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7265b2702fa648faa05b494e47b2e16a' type='text/javascript'%3E%3C/script%3E"));

$(function(){ 
	 if ($("#vote").length > 0){
			 var voteid = $("#voteId").val();
			 ReadVote(voteid,ref) //读数据 
	 }
	 
	 if($('#comment-2011').length>0){
		$('.glBtn').click(function(){
			if(this.qpid){reply = this.qpid; }
			$('#ly_content').focus();
			document.getElementById('zt_ly').ly_content.value=reply; return false;
		});
     }
});

$('#container #topbanner').html('<iframe id="cproIframe1" src="http://pc6.com/js/html/info-top.html" width="960" height="90" align="center,center" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" allowtransparency="true"></iframe>');
$('#container #topbanner').css('margin','-5px 0 5px 5px');

document.writeln("<script src=\'http:\/\/w.cnzz.com\/c.php?id=30069696\' language=\'JavaScript\'><\/script>")