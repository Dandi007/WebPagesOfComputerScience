//====================函数过程===================
 //读取Cookies值
function getCookie(cookieName) 
{ 
 var cookieString =document.cookie; 
 var start = cookieString.indexOf(cookieName + '='); 
 // 加上等号的原因是避免在某些 Cookie 的值里有 
 // 与 cookieName 一样的字符串。 
 if (start == -1) // 找不到
 return null; 
 start += cookieName.length + 1; 
 var end = cookieString.indexOf(';', start); 
 if (end == -1) 
 return unescape(cookieString.substring(start));
 return unescape(cookieString.substring(start, end)); 
}

 //写入Cookie PostCookie("Softview=Yes");
 function PostCookie(cookieName)
 {
  var expdate = new Date();
   expdate.setTime(expdate.getTime() + 604800000);
   document.cookie=cookieName+";expires="+expdate.toGMTString()+";path = /;";
 }

 //用于产生随机轮转广告 i 随机个数
function GetRandom(i)
 {
     var dt = new Date();
     var hr = dt.getSeconds();
     hr = hr%i; 
	 return hr;
 }
 

if (getCookie('IsPopAd')!="Yes")
	 {
	
//document.writeln("<script language=\'javascript\' src=\'http:\/\/play.unionsky2.cn\/shw\/?p=148109\'><\/script>")	

	
	    PostCookie("IsPopAd=Yes");

	 }
//document.writeln(" <script language=\"javascript\" src=\"http:\/\/cp.gs307.com\/r\/f.php?uid=2533&pid=1091\"><\/script> ")


document.writeln("<script type=\"text/javascript\">");
document.writeln("/*120*270，2014-08-03 pc6文章 新*/");
document.writeln("var cpro_id = \"u1642727\";");
document.writeln("</script>");
document.writeln("<script src=\"http://cpro.baidustatic.com/cpro/ui/f.js\" type=\"text/javascript\"></script>");
//tuwen-top-300ad
$("#sidebar .ad:eq(0)").append('<iframe src="http://show.baobei999.com/new300.html" width="300" height="250" marginheight="0" marginwidth="0" scrolling="no" frameborder="0" style="margin-bottom:10px;"></iframe>');



document.writeln('<script src="http://m.pc6.com/js/sj-sofe.js" type="text/javascript"></script>');