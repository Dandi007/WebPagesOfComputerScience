
document.domain = "mydrivers.com";
var myurl = '/';
var my_return_url = window.parent.location.href;

function GetTopNComment() {
    var Tid = $("#HiddenTid").val();
    var Cid = $("#HiddenCid").val();
    var Hot = $("#HiddenIsHot").val();

    var reviewajaxurl = myurl + "ReviewAjax.aspx?Tid=" + Tid + "&Cid=" + Cid + "&IsTopN=1&hot=" + Hot + "&timestamp=" + new Date().getTime();
    
    $.ajax({
        type: "get",
        url: reviewajaxurl,
        beforeSend: function (XMLHttpRequest) {},
        success: function (data, textStatus) {
            var review = eval("(" + data + ")");

            var ReviewCount = review.Count[0].ReviewCount;
            var RelationCount = review.Count2[0].RelationCount;

            if (ReviewCount == 0)
                $("#div_commentslist").hide();
            else
                $("#div_commentslist").show();
 
            $(window.parent.document).find("#span_commentsnum").html(ReviewCount);
            $(window.parent.document).find("#span_commentscount").show();
        
            $("#span_reviewcount").html(ReviewCount);
            $("#review_count").html(ReviewCount);
            $("#review_canyu").html(parseInt(ReviewCount) + parseInt(RelationCount));

            var result = TrimPath.processDOMTemplate("_mycomments_", review);
            var myTemplateObj = TrimPath.parseDOMTemplate("_mycomments_");
            var result = myTemplateObj.process(review);
            $("#MyComments").html(result);

            iframeAutoFit();

            setAPPLink();
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
            //请求出错处理
        }
    });
}

function PostComment()
{
	var ajaxReq = '';
	var checkcode = $("#ValidateCode0").val();
	var content = $("#Content0").val();
	var cid = $("#HiddenCid").val(); 
	var usertype = 0;
	var rid = $("#HiddenRid").val();
	var tid = $("#HiddenTid").val();
	
	//===========================================验证开始
	if (content.length < 5)
	{
	    ShowAjaxTip('ReplyTip0', '评论内容不得少于5个字符！', 'AjaxTipWarning');
	    GetObj("Content0").focus();
		return;
	}

	if (checkcode == "") {
	    ShowAjaxTip('ReplyTip0', '请填写验证码！', 'AjaxTipWarning');
	    GetObj("ValidateCode0").focus();
	    return;
	}
	
	var mc = getCookie("mydrivers_userid");
    if ( mc != null && mc != "")
    {
        usertype = 1;
    }
    
    $.ajax({
		type: "POST",
		url: myurl + "Post.aspx",
		data: { cid: cid, tid: tid, rid: rid, usertype: usertype, checkcode: checkcode, content: Replace(content) },
		beforeSend: function(XMLHttpRequest){
	        ShowAjaxTip('ReplyTip0', "评论提交中...",'AjaxTipWarning');
		},
		success: function(data, textStatus)
		{
				switch(data)
				{
					case '0':
							ajaxReq = '您要评论的主题不存在';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case '1':
							ajaxReq = '验证码不正确';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case '2':
							ajaxReq = '15秒内不允许再次评论';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "4":
							ajaxReq = '评论内容不得少于 5 字多于 1000 字';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "5":
							ajaxReq = '发送评论成功.';
							ShowAjaxTip('ReplyTip0', '发表评论成功！', 'AjaxTipComplete');
							StopButton(0, 15);//发表按钮不可点
							
							top.location.href="http://comment8.mydrivers.com/review/"+tid+"-"+cid+".htm";
						    
							//处理验证码
							//GetObj("show_yzm0").style.display = 'none';
							//GetObj("ValidateCode0").value='';
							
							break;
					case "6":
							ajaxReq = '您的评论中含有被系统禁止的内容，请修改后再发表';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
				    case "7":
				            ajaxReq = '页面超时请刷新页面后再发表';
				            ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
				            break;
					case "9":
							ajaxReq ='暂时不允许发表评论';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "10":
							ajaxReq ='您的IP地址被屏蔽，请联系管理员';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "12":
							ajaxReq ='找不到验证码';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "13":
							ajaxReq ='60天以前的新闻评论被禁止,感谢您对本网站的支持';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "14":
							ajaxReq ='此新闻不允许发表评论,感谢您对本网站的支持';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "15":
							ajaxReq ='此新闻不允许匿名用户发表评论,感谢您对本网站的支持';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					case "16":
							ajaxReq ='此新闻的评论内容不允许重复,感谢您对本网站的支持';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
							break;
					default:
							ajaxReq = '未知错误';
							ShowAjaxTip('ReplyTip0', ajaxReq, 'AjaxTipWarning');
				}
		},
		complete: function(XMLHttpRequest, textStatus){
		
		},
		error: function(){
		    ShowAjaxTip('ReplyTip' + rid, "出错误了，请稍后重试！", 'AjaxTipWarning');
		}
    }); 
    
	return null;
}


function setAPPLink() {
    $("span").each(function () {

        if ($(this).hasClass("span_from")) {
            if ($(this).html().indexOf('Android') > 0 || $(this).hasClass("android"))
                $(this).html("<a class='from' target='_blank' href='http://www.yingyong.so/app/15/7633.htm'>" + $(this).html() + "</a>");
            else if ($(this).html().indexOf('iPhone') > 0 || $(this).hasClass("iphone") || $(this).hasClass("ios"))
                $(this).html("<a class='from' target='_blank' href='https://itunes.apple.com/cn/app/qu-jia-xin-wen/id796040119?mt=8'>" + $(this).html() + "</a>");
        }

    });
}

function InitUser() {
    var username = get_cookie("mydrivers_userid");
    var userid = get_cookie("mydrivers_usernumid");
    if (username != null && username != "") {
        $("#div_unlogin").hide();
        $("#div_logined").show().html("欢迎你: <font color='red'><a href='http://passport.mydrivers.com/myinfo.aspx'>" + decodeURI(username) + "</a></font><a style='padding-left:10px;' onclick='logout();return false;' href='javascript:;'>退出</a>");
    }
    else {
        $("#div_unlogin").show();
        $("#div_logined").hide();
    }
}

function logout() {
    window.parent.location = "http://passport.mydrivers.com/logout.aspx?ReturnUrl=" + my_return_url;
}

function iframeAutoFit(h) {
    try {
        if (window != parent) {
            var b = parent.document.getElementById("commentsiframe");
            
            $(b).removeAttr("height");
            var d = $(document).height();
            if (h == 0)
            {
                b.style.height = "0px";
            }
            else {
                b.style.height = d + "px";
            }
        }
    } catch (c) { }
}

function sndReq(tid, rid, action, num) {
    if (action == "support") {
        $("#s_" + rid).html("支持[" + (parseInt(num) + 1) + "]");

        $("#s_" + rid).css("position", "relative").css("text-decoration", "none").append($("<span>", {
            css: {
                font: "600 30px/34px '黑体'",
                color: "#c00",
                position: "absolute",
                display: "none",
                top: -20,
                left: 10
            },
            text: "+1",
            className: "supportfloat"
        })).find("> span").css("display", "block").animate({ top: [-50, "swing"] }, 300, function () { $(this).fadeOut(300) });
    }
    else {
        $("#o_" + rid).html("反对[" + (parseInt(num) + 1) + "]");
        $("#o_" + rid).css("position", "relative").css("text-decoration", "none").append($("<span>", {
            css: {
                font: "600 30px/34px '黑体'",
                color: "#c00",
                position: "absolute",
                display: "none",
                top: -10,
                left: 10
            },
            text: "+1",
            className: "opposefloat"
        })).find("> span").css("display", "block").animate({ top: [50, "swing"] }, 300, function () { $(this).fadeOut(300) });
    }

    var _getCookie = getCookie("Vote" + tid + rid);
    if (_getCookie != null) {
        return;
    }

    $.ajax({
        type: "POST",
        url: myurl + "Vote.aspx",
        data: { act: action, tid: tid, rid: rid },
        beforeSend: function (XMLHttpRequest) { },
        success: function (data, textStatus) {
            setCookie("Vote" + tid + rid, action);
        },
        complete: function (XMLHttpRequest, textStatus) { },
        error: function () {
        }
    });
}

function userReport(ID,Tid) {
    if (getCookie("report_" + ID) == "yes") {
        //ShowAjaxTip('ReplyTip' + ID, '您已经举报过，请不要重复举报！', 'AjaxTipWarning');
        alert("您已经举报过，请不要重复举报！");
        return;
    }

    $.ajax({
        type: "POST",
        url: myurl + 'UserReport.aspx',
        data: { ID: ID,Tid:Tid },
        beforeSend: function (XMLHttpRequest) {

        },
        success: function (data, textStatus) {
            if (data == "0") {
                //ShowAjaxTip('ReplyTip' + ID, '您已经举报过，请不要重复举报！', 'AjaxTipWarning');
                alert("您已经举报过，请不要重复举报！");
            }
            else {
                //ShowAjaxTip('ReplyTip' + ID, '举报成功，谢谢您的参与！', 'AjaxTipComplete');
                alert("举报成功，谢谢您的参与！");
            }
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function () {
            //请求出错处理
        }
    });
}

function ShowReply(tid, rid) {
    var str = "";
    str += "<div class=\"comment_form\">";
    str += "  <div class=\"comment_head\">";
    str += "    <div class=\"h3\">我要评论<\/div>";
    str += "    <div class=\"replyclose\" onclick=\"javascript:HidenReply(" + rid + ")\">关闭<\/div> ";
    str += "  <\/div>";
    str += "  <div class=\"comment_body\">";

    var m_temp = get_cookie("mydrivers_userid");
    if (m_temp == "" || m_temp == null) {
        str += "<form style=\"margin:0px;\" name=\"mydrivers_Login" + rid + "\" onsubmit=\"return check_login(" + rid + ",this);\" method=\"post\">";
        str += "<div class=\"comment_user\" style=\"width:450px;float:left;\">";
        str += "<label>用户名<\/label>";
        str += "<input onblur=\"checkisloginpost(" + rid + ")\" name=\"username\" id=\"UserName" + rid + "\" type=\"text\" \/>";
        str += "<span class=\"note\"><a target=\"_blank\" href=\"http://passport.mydrivers.com/reg.htm\">快速注册新用户<\/a><\/span> ";
        str += "<\/div>";

        str += "<div class=\"comment_user\" style=\"width:132px;float:left;padding:6px 0px; text-align:right;\"><a target=\"_parent\" href=\"http:\/\/passport.mydrivers.com\/qq\/qqlogin.aspx?reurl=" + my_return_url + "\"><img src=\"http:\/\/passport.mydrivers.com\/images\/qq.png\" width=\"124\" height=\"24\" alt=\"用腾讯微博登录\" \/><\/a><\/div>";

        str += "<div class=\"comment_user\" style=\"width:450px;float:left;padding-bottom:10px\">";
        str += "<label>密&nbsp;&nbsp;&nbsp;码<\/label>";
        str += "<input onblur=\"checkisloginpost(" + rid + ")\" name=\"password\" id=\"Pwd" + rid + "\" type=\"password\" \/>";
        str += "<span class=\"note\"><input style=\"width:50px;\" type=\"submit\" value=\"登 录\" />&nbsp;&nbsp;&nbsp;&nbsp;<a target=\"_blank\" href=\"http://passport.mydrivers.com/GetPassword.aspx\">忘记密码？<\/a><\/span>";
        str += "<\/div>";

        str += "<div class=\"comment_user\" style=\"width:132px;float:left;padding:6px 0px; text-align:right;\"><a href=\"http:\/\/passport.mydrivers.com\/weibo\/sinaweibo.aspx?reurl=" + my_return_url + "\" target=\"_parent\"><img src=\"http:\/\/passport.mydrivers.com\/images\/weibo.png\" width=\"126\" height=\"24\" alt=\"用新浪微捕帐号登录\" \/><\/a><\/div>";

        str += "</form>";
    }
    else {
        str += "<div class=\"comment_user\"><font class=\"name\">" + decodeURI(m_temp) + "<\/font>&nbsp;&nbsp;<a onclick='goUrl(3)' href=\"javascript:;\">退出</a><\/div> ";
    }

    str += "      <div class=\"comment_text\">";
    str += "        <textarea id=\"Content" + rid + "\" name=\"Content" + rid + "\" onfocus=\"show_yzm(" + rid + ")\"><\/textarea>";
    str += "      <\/div>";
    str += "      <div class=\"comment_submit\"> <span style=\"display:none;\" id=\"span_ValidateCode" + rid + "\">";
    str += "        <label>验证码：<\/label>";
    str += "        <input type=\"text\" id=\"ValidateCode" + rid + "\" class=\"captcha\" \/>";
    str += "        <img id=\"yzm_img" + rid + "\" onmouseover=\"this.style.cursor='pointer'\" onmouseout=\"this.style.cursor='default'\" onclick=\"reload_yzm(" + rid + ")\" title=\"点击刷新验证码\"> <\/span>";
    str += "        <input onclick=\"PostComment(" + rid + "," + tid + ")\" class=\"submit\" type=\"button\" value=\"提交评论\" \/>";
    str += "      <\/div>";
    str += "      <div class=\"AjaxTipdelay\" id=\"ReplyTip" + rid + "\"><\/div>";
    str += "<\/div>";
    str += "<\/div>";
    $("#div_reply" + rid).html(str).show();
}

function ShowReplyLogin(rid) {
    $.dialog({
        title: "我要回复",
        padding: 0,
        lock: false,
        follow: document.getElementById('div_bottom_'+rid),
        content: document.getElementById('div_post'),
        id: 'div_post_ididids',
        close: function () {
            $("#HiddenRid").val(0);//关闭的时候把引用的评论清空，不清空的话等于回复此评论了
        }
    });
    $("#HiddenRid").val(rid);
}

function HidenReply(rid) {
    $("#div_reply" + rid).hide();
}

function checkisloginpost(rid)
{
    if(GetObj("UserName"+rid).value!=""&&GetObj("Pwd"+rid).value!="")
   { 
      $("#span_ValidateCode"+rid).hide();
	  $("#Content"+rid).removeClass("has_bg");
    }
}
 
function StopButton(id,min)
{
	if (GetObj("Post"+id)!=null)
	{
		GetObj("Post"+id).disabled='disabled';
		GetObj("Post"+id).value="发表评论("+min+")";
		if(--min>0) setTimeout("StopButton('"+id+"',"+min+")",1000);
		if(min<=0)
		{
			GetObj("Post"+id).value='发表评论';
			GetObj("Post"+id).disabled='';
		}
	}
}

function goUrl()
{
	var reviewajaxurl = "http://passport.mydrivers.com/logout.aspx?ReturnUrl=" + my_return_url;
	parent.location=reviewajaxurl;
}

function show_yzm(id)
{
    if ($("#span_ValidateCode"+id).is(":hidden")) {
        $("#span_ValidateCode"+id).show();
        $("#yzm_img" + id).show().attr("src", "http://comment8.mydrivers.com/radompage.aspx?" + Math.random());
    }
}

function reload_yzm(id) {
    $("#yzm_img" + id).show().attr("src", "http://comment8.mydrivers.com/radompage.aspx?" + Math.random());
}

function GetCSRFToken() {
    $("#csrf_img").attr("src", "http://comment8.mydrivers.com/CSRFToken.aspx?" + Math.random());
}

function clearUserName(id)
{
	GetObj("UserName"+id).value='';
	GetObj("UserName"+id).style.color="blue";
	
}

function clearPwd(id)
{
	GetObj("Pwd"+id).value='';
	GetObj("Pwd"+id).style.color="blue";
}

function ShowAjaxTip(divobj,ajaxReq,reqClass){
		var AxajTipDiv = GetObj(divobj);
		ajaxReq = '<div style="float: right"><img src="http://11.mydrivers.com/comments/images/v20130509/' + reqClass + '.gif" style="margin: 7px 7px;cursor:pointer;" onclick="HideAxajTip(this);"></div><div>' + ajaxReq + '<div>';
		AxajTipDiv.className = reqClass;
		AxajTipDiv.innerHTML = ajaxReq;
		AxajTipDiv.style.display = 'block';
}

function HideAxajTip(myobj){
	myobj.parentNode.parentNode.style.display='none';
}

function mhotnewstabit(id)
{
    if(id==1)
   {
        $("#HotNewstab1").removeClass("hover");
        $("#HotNewstab2").addClass("hover");
        $("#HotNewstab0").addClass("hover");
        $("#hotday7").show();
        $("#hotday30").hide();
        $("#hotday0").hide();
   } 
   else if(id==2)
   {
        $("#HotNewstab1").addClass("hover");
        $("#HotNewstab0").addClass("hover");
        $("#HotNewstab2").removeClass("hover");
        $("#hotday7").hide();
        $("#hotday0").hide();
        $("#hotday30").show();
   }
   else
   {
        $("#HotNewstab1").addClass("hover");
        $("#HotNewstab0").removeClass("hover");
        $("#HotNewstab2").addClass("hover");
        $("#hotday7").hide();
        $("#hotday0").show();
        $("#hotday30").hide();
   }
}

function search()
{
	var s_keywords= document.myform.q.value;
	if((s_keywords =="" || s_keywords=="请输入关键字" ))
	{
		alert("请输入查询关键字!");
		GetObj("q").focus();
		return false;
	}
	GetObj("myform").action="http://so.mydrivers.com/news.aspx?q="+escape(s_keywords);
    
	return true;
}

function check_login(id,fr)
{ 
	if (GetObj("UserName"+id).value == "")
	{
		alert("请填写用户名！");
		GetObj("UserName"+id).focus();
		return false;
	}
	if (GetObj("Pwd"+id).value == "")
	{
		alert("请填写密码！");
		GetObj("Pwd"+id).focus();
		return false;
	}	
	fr.action="http://passport.mydrivers.com/comments/check_login.aspx?ReturnUrl=" + my_return_url;	
}
 
function Replace(str)
{
   re = /%/g;             // 创建正则表达式模式。
   str = str.replace(re, "％");    //  替换 
   re = /\+/g;
   str = str.replace(re, "＋");
   return(str);                   // 返回替换后的字符串。
}

// JS 对 cookie 操作
function setCookie(name,value)
{
  var Days = 30; //此 cookie 将被保存 30 天
  var exp  = new Date();    //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
}
 
function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
		return unescape(arr[2]);
	return null;
}

 function get_cookie(varname)
{
	var tmp_ary = new Array();
	if (varname)
	{
		var a = document.cookie.indexOf(varname+"=");
		if (a != -1)
		{
			var b = document.cookie.substring((a+varname.length+1),document.cookie.length);
			var c = b.split(";");
			var d = c[0];
			return d;
		}
	}
}

function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function GetObj(objName){
	if(document.getElementById){
		return eval('document.getElementById("' + objName + '")');
	}else if(document.layers){
		return eval("document.layers['" + objName +"']");
	}else{
		return eval('document.all.' + objName);
	}
}

function StringBuffer()//使用构造函数
{
	this._strings_=new Array;
}
StringBuffer.prototype.append=function (str)//使用原型定义函数属性
{
	this._strings_.push(str);
}
StringBuffer.prototype.toString=function ()//使用原型定义函数属性
{
	return this._strings_.join("");
}