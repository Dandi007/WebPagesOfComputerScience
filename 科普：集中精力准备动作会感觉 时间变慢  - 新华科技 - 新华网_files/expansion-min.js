var _addpic = '<div class="sidebarboder"><div id="shoujipic"><a href="http://www.xinhuanet.com/shouji/chupingban.htm" target="_blank"><img src="http://www.news.cn/xilan/20120615/xliphonetit1.gif" style="border:1px solid #d7d7d7;" /></a></div></div>';$("#ad3").before(_addpic);
var bshare_s='<DIV class=bshare-custom sizcache08521370026118069="0" sizset="0" style="float:left;padding-right:10px; padding-top:5px;">';var xinhua='<A class=bshare-xinhuamb title=\u5206\u4eab\u5230\u65b0\u534e\u5fae\u535a href="javascript:void(0);"></A>';var shouji='<A class=bshare-shouji href="javascript:void(0);"></A>';var sina='<A class=bshare-sinaminiblog title=\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a href="javascript:void(0);"></A>';var qqkj='<A class=bshare-qzone title=\u5206\u4eab\u5230QQ\u7a7a\u95f4 href="javascript:void(0);"></A>';var qq='<A class=bshare-qqmb title=\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a href="javascript:void(0);"></A>';var renren='<A class=bshare-renren title=\u5206\u4eab\u5230\u4eba\u4eba\u7f51 href="javascript:void(0);"></A>';var bsharesync='<A class=bshare-bsharesync title=\u5206\u4eab\u5230\u4e00\u952e\u901a href="javascript:void(0);"></A>';var more='<A class="bshare-more bshare-more-icon more-style-addthis" title=\u66f4\u591a\u5e73\u53f0></A>';var bshare_e='<SPAN class="BSHARE_COUNT bshare-share-count">0</SPAN></DIV>';var bshare=bshare_s+xinhua+shouji+sina+qqkj+qq+renren+bsharesync+more+bshare_e;$("#bshare01").html(bshare);$("#bshare02").html(bshare);var linkurl;var SharePageUrl=location.href;var ShareTitle=document.title;linkurl="http://go.10086.cn/ishare.do?m=wt&u="+encodeURI(SharePageUrl)+"&t="+encodeURI(ShareTitle)+"&sid=052412243205";$(".ishare").attr("href",linkurl);document.writeln("<script type='text/javascript' charset='utf-8'> var bShareOpt = {style: -1, pop: 1, uuid: 'fae4ac1c-0568-4b2b-9749-7ca9475eb315',pophcol: 2};<\/script>");document.writeln("<script type='text/javascript' src='http://static.bshare.cn/b/buttonLite.js' charset='utf-8'><\/script>");document.writeln("<script type='text/javascript' src='http://static.bshare.cn/b/bshareC0.js' charset='utf-8'><\/script>");var Speed=10;var Space=10;var PageWidth=480;var fill=0;var MoveLock=false;var MoveTimeObj;var Comp=0;var AutoPlayObj=null;function initAutoPlay(){GetObj("List2").innerHTML=GetObj("List1").innerHTML;GetObj('ISL_Cont').scrollLeft=fill;GetObj("ISL_Cont").onmouseover=function(){clearInterval(AutoPlayObj);}
GetObj("ISL_Cont").onmouseout=function(){AutoPlay();}
AutoPlay();}
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function AutoPlay(){clearInterval(AutoPlayObj);AutoPlayObj=setInterval('ISL_GoDown();ISL_StopDown();',5000);}
function StopPlay(){clearInterval(AutoPlayObj);clearInterval(MoveTimeObj);}
function ISL_GoUp(){if(MoveLock)
return;clearInterval(AutoPlayObj);MoveLock=true;ISL_ScrUp();MoveTimeObj=setInterval('ISL_ScrUp()',Speed);}
function ISL_StopUp(){clearInterval(MoveTimeObj);if(GetObj('ISL_Cont').scrollLeft%PageWidth-fill!=0){Comp=fill-(GetObj('ISL_Cont').scrollLeft%PageWidth);CompScr();}else{MoveLock=false;}
AutoPlay();}
function ISL_ScrUp(){if(GetObj('ISL_Cont').scrollLeft<=0){var elements=getChildElements(GetObj('List1'),"div");var len=parseInt(elements[0].offsetWidth,10)*parseInt(elements.length,10);GetObj('ISL_Cont').scrollLeft=GetObj('ISL_Cont').scrollLeft+parseInt(len,10);}
GetObj('ISL_Cont').scrollLeft-=Space;}
function ISL_GoDown(){clearInterval(MoveTimeObj);if(MoveLock)
return;clearInterval(AutoPlayObj);MoveLock=true;ISL_ScrDown();MoveTimeObj=setInterval('ISL_ScrDown()',Speed);}
function ISL_StopDown(){clearInterval(MoveTimeObj);if(GetObj('ISL_Cont').scrollLeft%PageWidth-fill!=0){Comp=PageWidth-GetObj('ISL_Cont').scrollLeft%PageWidth+fill;CompScr();}else{MoveLock=false;}
AutoPlay();}
function ISL_ScrDown(){if(GetObj('ISL_Cont').scrollLeft>=GetObj('List1').scrollWidth){GetObj('ISL_Cont').scrollLeft=GetObj('ISL_Cont').scrollLeft-GetObj('List1').scrollWidth;}
GetObj('ISL_Cont').scrollLeft+=Space;}
function CompScr(){var num;if(Comp==0){MoveLock=false;return;}
if(Comp<0){if(Comp<-Space){Comp+=Space;num=Space;}else{num=-Comp;Comp=0;}
GetObj('ISL_Cont').scrollLeft-=num;setTimeout('CompScr()',Speed);}else{if(Comp>Space){Comp-=Space;num=Space;}else{num=Comp;Comp=0;}
GetObj('ISL_Cont').scrollLeft+=num;setTimeout('CompScr()',Speed);}}
function showItems(){if($("#itemsList")[0].style.display=="none"){$("#itemsList").show();}else{$("#itemsList").hide();}}
function getChildElements(ele,tagName){if(!(ele&&ele.nodeType&&ele.nodeType===1))
return false
var child=ele.firstChild;var a=[]
if(tagName){while(child){if(child.nodeType==1&&child.tagName.toLowerCase()==tagName.toLowerCase()){a.push(child);}
child=child.nextSibling;}}else{while(child){if(child.nodeType==1){a.push(child);}
child=child.nextSibling;}}
return a;}
function RandomArray(arr){var arrayLength=arr.length;var tmpArray1=new Array();for(var i=0;i<arrayLength;i++){tmpArray1[i]=i;}
var tmpArray2=new Array();for(var i=0;i<arrayLength;i++){tmpArray2[i]=tmpArray1.splice(Math.floor(Math.random()*tmpArray1.length),1);}
var randomArray=new Array();for(var i=0;i<arrayLength;i++){randomArray[i]=arr[tmpArray2[i]];}
return randomArray;}
function baidukeyword(){var link1="http://news.baidu.com/z/hotquery/roll/?from=xinhuanet";var link2="http://news.baidu.com/view.html?from=xinhuanet"
var alink1="<a href="+link1+" class='baidulink1' target='_blank'></a>";var alink2="<a href="+link2+" class='baidulink2' target='_blank'></a>";$(alink1).appendTo("#rcsearch");$(alink2).appendTo("#rcsearch");var ids=[];var names=[];var urls=[];$.ajax({type:"GET",url:"http://news.xinhuanet.com/news/c_20120516.xml",async:false,dataType:"xml",success:function(xml){$(xml).find("item").each(function(i){ids[i]=$(this).find("id").text();names[i]=$(this).find("name").text();urls[i]="http://news.baidu.com/ns?cl=2&ct=1&rn=20&sp=hotquery&q1="+$(this).find("url").text()+"&q6=%D0%C2%BB%AA%CD%F8";});}})
var len=parseInt(ids.length,10);if(len>0){var item=$("<span><a href=\"#\" target=\"_blank\"></a></span>");var tempItem;var bditems=[];var arr1=[];var arr2=[];$("#baidukeys").html("");for(var i=0;i<10;i++){tempItem=item.clone();if(i<2){tempItem.attr("class","reci4");}else if(i>=2&&i<6){tempItem.attr("class","reci1");}else{tempItem.attr("class","reci2");}
$("a",tempItem).attr("href",urls[i]);$("a",tempItem).text(names[i]);bditems[i]=tempItem;}
for(var i=0;i<10;i++){if(i%2==0){arr1.push(bditems[i]);}else{arr2.push(bditems[i]);}}
var rarr1=[];var rarr2=[];rarr1=RandomArray(arr1);rarr2=RandomArray(arr2);for(var i=0;i<5;i++){$("#baidukeys").append(rarr1[i]);}
for(var i=0;i<5;i++){$("#baidukeys").append(rarr2[i]);}}}
function delHtmlTag(str){return str.replace(/<[^>]+>/g,"");}
function getLength(str){var realLength=0,len=str.length,charCode=-1;for(var i=0;i<len;i++){charCode=str.charCodeAt(i);if(charCode>=0&&charCode<=128)realLength+=1;else realLength+=2;}
return realLength;};function getExtent(path){var arid=[];var linkurl=[];var atitles=[];$.ajax({type:"GET",url:path,async:false,dataType:"xml",success:function(xml){$("#contextual").show();$(xml).find("item").each(function(i){arid[i]=$(this).find("arid").text();linkurl[i]=$(this).find("htmlurl").text();atitles[i]=$(this).find("atitle").text();});}})
if(parseInt(arid.length,10)>0){for(var i=0;i<atitles.length;i++){atitles[i]=delHtmlTag(atitles[i]);var thisstr=atitles[i];var len=getLength(thisstr);if(len>48){atitles[i]=thisstr.substring(0,24)+"...";}}
var scrollItems=[];var items=[];var thisurl=window.location.href
var thisarticleid=thisurl.substring(thisurl.lastIndexOf("."),thisurl.lastIndexOf("c_")+2);var thisindex=-1;var preurl;var nexturl;var totalindex=parseInt(arid.length,10);for(var i=0;i<arid.length;i++){if(parseInt(thisarticleid,10)==parseInt(arid[i],10)){thisindex=i;break;}}
var item=$("<table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"lan12\"><tr><td width=\"16\">·</td><td><a href=\"#\" target=\"_blank\"></a></td></tr></table>");var scrollItem=$("<div class=\"pic\"><a href=\"#\"></a></div>");;var tempItem;var tempcrollItem;for(var i=0;i<10;i++){tempItem=item.clone();tempcrollItem=scrollItem.clone();if(thisindex-5<0){$("a",tempcrollItem).attr("href",linkurl[i]);$("a",tempcrollItem).text(atitles[i]);tempItem.attr("articleid",arid[i]);$("a",tempItem).text(atitles[i]);$("a",tempItem).attr("href",linkurl[i]);}else if(totalindex-thisindex<5){$("a",tempcrollItem).attr("href",linkurl[totalindex-10+i]);$("a",tempcrollItem).text(atitles[totalindex-10+i]);tempItem.attr("articleid",arid[totalindex-10+i]);$("a",tempItem).text(atitles[totalindex-10+i]);$("a",tempItem).attr("href",linkurl[totalindex-10+i]);}else{$("a",tempcrollItem).attr("href",linkurl[thisindex-5+i]);$("a",tempcrollItem).text(atitles[thisindex-5+i]);tempItem.attr("articleid",arid[thisindex-5+i]);$("a",tempItem).text(atitles[thisindex-5+i]);$("a",tempItem).attr("href",linkurl[thisindex-5+i]);}
scrollItems[i]=tempcrollItem;items[i]=tempItem;}
for(var i=0;i<items.length;i++){$("#List1").append(scrollItems[i]);if(i<5){$("#leftitems").append(items[i]);}else{$("#rightitems").append(items[i]);}}}}
baidukeyword();function gethotkeys(){return false;}