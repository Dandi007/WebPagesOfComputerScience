/*Test*/
  window.smartShow = {
    init: function() {
      if (document.referrer && (document.referrer.indexOf('baidu.com') !== -1 || document.referrer.indexOf('so.com') !== -1 || document.referrer.indexOf('google.com') !== -1 || document.referrer.indexOf('google.com.hk') !== -1 || document.referrer.indexOf('sogou.com') !== -1 || document.referrer.indexOf('bing.com') !== -1)) {
        this.setCookie('lhb_smart', '1');
      }
    },
    isShow: function(){
    	if(this.getCookie('lhb_smart') === '1') {
    		return true;
    	} else {
    		return false;
    	}
    },
    setCookie: function(name, value) {
      var exp = new Date();
      exp.setTime(exp.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + window.escape(value) + ";expires=" + exp.toGMTString()+";path=/";
    },
    getCookie: function(name) {
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr) {
        return window.unescape(arr[2]);
      }
      return;
    }
  };
  smartShow.init();

/*运行代码*/
function runCode(id){
	var obj = document.getElementById(id); 
	var TestWin=open('');  
	TestWin.opener = null;
	TestWin.document.write(obj.value); 
	TestWin.document.close(); 
}

/*加载脚本*/
function loader(name){
	var elem=document.createElement('script');
	elem.src='http://files.cnblogs.com/lhb25/'+name;
	document.getElementsByTagName('head')[0].appendChild(elem);
}

/*回到顶部*/
$(function(){
	// hide #back-top first
	$("#back-top").hide();
	// fade in #back-top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('#back-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});

/*自定义导航*/
$(function(){
	$("#navList").append('<li><a class="menu" href="http://www.cnblogs.com/lhb25/category/279316.html">网页设计</a></li><li><a class="menu" href="http://www.cnblogs.com/lhb25/category/277769.html">精美素材</a></li><li><a class="menu" href="http://www.cnblogs.com/lhb25/category/146074.html">JavaScript</a></li><li><a class="menu" href="http://www.cnblogs.com/lhb25/category/277997.html">jQuery</a></li><li><a class="menu" href="http://www.cnblogs.com/lhb25/category/146076.html">HTML5</a></li><li><a class="menu" href="http://www.cnblogs.com/lhb25/category/146075.html">CSS3</a></li>');
	$("#MyLinks1_XMLLink").parent().appendTo($("#navList"));
	$("#navList li").eq(2).remove();
	$("#navList li").eq(3).remove();
	$("#MyLinks1_Syndication").append('<div style="position:relative;left:-10px;top:-45px"><img src="http://cdn1.iconfinder.com/data/icons/supra_rss/png/32%20x%2032/rss2_1-20.png"/></div>');
	$("#navList li").eq(0).remove();
});

/*左上角广告浮动*/
$(function(){
	$(window).scroll(function(){
		var ref_min=$(".RecentComment")[0];
		if(!ref_min)return;
		var scroll_top=$(window).scrollTop();
		var ref_height_min=ref_min.offsetTop+ref_min.offsetHeight;
        if(scroll_top>ref_height_min){
			$(".focus-bar").addClass("fixed-bar");
			$(".focus-ads").addClass("fixed-ads").height(280);
		}else{
			$(".focus-bar").removeClass("fixed-bar");
			$(".focus-ads").removeClass("fixed-ads");
		}
	});
	if($(".pub_index").length>0){
		$("#top_recom").clone().appendTo($(".focus-ads").empty()).show();
	}
});

/*文章底部广告*/
/*$(function(){
	var showBottomAds = function(){
		var ctn = $('.bottom-ads');
		if(ctn.length===0) {
			setTimeout(function(){
				showBottomAds();
			},1000);
			return;
		} else {
			$('.ready-bottom-ads').appendTo($(".bottom-ads")).show();
		}
	};
	showBottomAds();
});*/
