define(function(require, exports, module){
    require('mustache');
    require('bootstrap-modal');

    //TODO remove to urls
    var login_url = "/auth/login/";
	var the_type = location.host.indexOf("feifei")== -1? "toutiao" : "feifei";
    var connect_url = function(platformId) {
        return Mustache.render("/auth/connect/?type={{type}}&platform={{platform}}", {type: the_type, platform: platformId})
    }
    var user_info_url = "/user/info/";

    var _user_cache;

	
	var _info_tpl = '<li class="menu"><div class="trigger" style="float:left"><a href="http://web.toutiao.com/user/{{user_id}}/updates/" class="ava"><img src="{{avatar_url}}" height="20" width="20"></a><a href="http://web.toutiao.com/user/{{user_id}}/updates/" class="sig">&nbsp;{{name}}</a></div><div class="dropdown p-select"><ul><li><a href="http://web.toutiao.com/user/{{user_id}}/trends/">我的头条</a></li><li><a href="http://web.toutiao.com/user/{{user_id}}/pin/">我的收藏</a></li><li><a href="http://web.toutiao.com/user/{{user_id}}/followers/">我的粉丝</a></li><li><a href="http://web.toutiao.com/user/{{user_id}}/followings/">我的关注</a></li><li><a href="http://web.toutiao.com/user/{{user_id}}/message/">我的消息</a></li><li><a href="http://web.toutiao.com/settings/" rel="nofollow">账户设置</a></li><li><a href="http://web.toutiao.com/auth/logout/" rel="nofollow">退出</a></li></ul></div></li>';
	
    var init = function(user){
        _store_user_info(user);
    }

    var isLogin = function(){
        //TODO should read from cookie
        return _user_cache && _user_cache['user_id'];
    };

    //update toolbar
    var _render_user_info = function(){
		if($("#my_feifei").length) return;
        var tpl = Mustache.render(_info_tpl, {
            user_id: _user_cache.user_id,
            name: _user_cache.name,
            avatar_url: _user_cache.avatar_url
        });
		$("#p-infos > ul").prepend(tpl);
        $("#infos").hide();

    };

    var _store_user_info = function(user){
        _user_cache = user;
    }

    var get_info = function(){
        return _user_cache;
    }

    var refreshUserInfo = function(callback){
        //load user info ajax
        $.getJSON(user_info_url, function(json){
            _store_user_info(json);
            _render_user_info();
            //update user info
            if(isLogin()){
                setTimeout(callback, 0);
            }
        })
    }
	
	var getNotifyNum = function(){
		$.ajax({
			url: 'http://api.snssdk.com/4/update/count/?min_create_time=1363065517&iid=1466385608&ac=wifi&channel=local&app_name=news_article&version_code=240&device_platform=android&device_type=MI-ONE%20Plus&os_version=4.0.4&openudid=f41d7f8ad904437c&os_api=15',
			success: function(json) {
				console.log(json);
			},
			dataType: 'jsonp'
		});
	}

    //TODO reqire login page template?
    var openLoginPanel = function(callback){
    try{_gaq.push(['_trackEvent', 'event', 'popup_login', '']);}catch(e) {}
        $('#auth_modal').modal();
        
        //login form event
        $("#modal_login_form").submit(function(e){
			var data = $(this).serialize();
			var $authModal = $("#auth_modal");
			
            $.post(login_url, data=data, function(result){
				var $login_btn = $authModal.find("#submit_btn").attr("disabled","disabled").val("登陆中...");
				var $login_msg = $authModal.find("#login_msg");
				
				
				if (result.message === 'success'){
					$login_msg.text("成功");					
                    $authModal.modal('hide');
                    _store_user_info(result.user);
					setTimeout(function(){$('#login_msg').text('')}, 2000);
                    setTimeout(_render_user_info, 0);
                    setTimeout(callback, 0);
                }else{
					$login_msg.text("登陆失败");
					$login_btn.removeAttr("disabled").val("登陆");					
					$authModal.find("#password").val("");
					setTimeout("$('#login_msg').text('')", 2000);
				};
            }, 'json')
            return false;
        });
        //sns connect event
        $("[data-toggle='sns_login']").on('click', function(e){
            $("#auth_modal").modal('hide');
            var name = $(this).attr('name');
            
            // for popup
            var label = "platform="+name;
            label += "&page=popup";
            try{_gaq.push(['_trackEvent', 'event', 'auth_sns', label]);}catch(e) {}
            doConnect(name, callback);
            return false;
        })
    };

    function goLoginPage(){
        window.location = login_url;
    };

    var loginRequired = function(logined){
        if (!isLogin()){
            openLoginPanel(logined);
        }else{
            logined();
        }
    };


    //======== connects
    var isConnect = function(platformId){
        return isLogin() && _user_cache['connects'].hasOwnProperty(platformId);
    }

    var doConnect = function(platformId, callback){
        var url = connect_url(platformId);
        var width = 650;
        var height = 440;
        var left = Math.max((window.screen.width/2) - (width/2), 0);
        var top = Math.max((window.screen.height/2) - (height/2), 0);

        var optStr = Mustache.render("location=0,toolbar=0,status=0,resizable=0,scrollbars=1," +
                                     "width={{width}},height={{height}},top={{top}},left={{left}};", {
            width: width,
            height: height,
            top: top,
            left: left
        });
        var loginWindow = window.open(url, "login", optStr);
        try{loginWindow.focus();}catch(e){}
        whenClosed(loginWindow, function(){
                refreshUserInfo(callback);
        })
    }


    //======= 
    var whenClosed = function(windowObj, callback){
        var closed;
        try{
            closed = windowObj.closed;
        }catch(e){
            closed = true;
        }
        if(closed){
            clearTimeout(arguments.callee.timer);
            callback();
        }else{
            arguments.callee.timer = setTimeout(function(){
                whenClosed(windowObj, callback); 
            }, 600);
        }
    };

    exports.isLogin = isLogin;
    exports.openLoginPanel = openLoginPanel;
    exports.goLoginPage = goLoginPage;
    exports.loginRequired = loginRequired;
    exports.doConnect = doConnect;
    exports.isConnect = isConnect;
    exports.refreshUserInfo = refreshUserInfo;
    exports.init = init;
    exports.get_info = get_info;
})
