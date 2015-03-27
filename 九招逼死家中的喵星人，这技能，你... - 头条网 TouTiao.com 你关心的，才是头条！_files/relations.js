(function($){

    var lock = {};
	var is_follows = {};
	var loading = false;

    $.fn.InitFollowUserButtons = function(settings) {
        var defaults = {
            followedCls: 'followed',
            followCls: 'follow',
            followedText: '',
            followText: '',
            buttonCls: '.follow-button',
			buttonSuggest : '.refresh_user_intro'
        };

        settings = $.extend(defaults, settings);
		
		var _this = this;
        var followedText = settings.followedText;
        var followedCls = settings.followedCls;
        var followCls = settings.followCls;
        var followText = settings.followText;
        var buttonCls = settings.buttonCls;
		var buttonSuggest = settings.buttonSuggest;

        this.delegate(buttonCls, 'click', function() {

            var _this = $(this);
			var user_id = _this.attr('user_id');
				
			if(lock[user_id]) {
				return;
			}
			
			if(!(user_id in is_follows)) {
				is_follows[user_id] = _this.attr('is_follow');
			}
			
			var is_follow = is_follows[user_id];
			
			var follow = function() {
				lock[user_id] = true;
				$.ajax({
					url:is_follow ? '/api/user/unfollow/': '/api/user/follow/',
					data: {user_id: user_id, app_name: 'news_article'},
					success: function(ret) {
						if(ret.message == 'success') {
							if(!is_follow) {
								$(_this).html(followedText).addClass(followedCls).removeClass(followCls);
								is_follows[user_id] = true;
							} else {
								$(_this).html(followText).removeClass(followedCls).addClass(followCls);
								is_follows[user_id] = false;
							}
						} else {
							if(ret.error_code == "401") {
								userjs.loginRequired(function() {follow(board_id, _this);});
							} else {
								alert(ret.reason);
							}
						}
					},
					'complete': function() {
						lock[user_id] = false;
					},
					type: 'post',
					dataType:'json' 
				});
			};
			
			var userjs = require('user');
			userjs.loginRequired(follow);
		
		}).on("click",buttonSuggest,function(){			
			if(loading) return;
			loading = true;			
			
			var $con = _this.find("table tbody");
			var $btn = $(this);
			var offset = $btn.attr("offset");
			$btn.addClass("loading");
			$con.css("opacity","0.3");
			$.get("/get_suggest_users/?offset="+offset)
			 .done(function(d){
				setTimeout(function(){
					if($.trim(d).length){
						$con.html(d);
						$btn.attr("offset",parseInt(offset)+5).removeClass("loading");;
					}else{
						alert("没有更多了");
						$btn.hide();
					}
					$con.css("opacity","1");
					loading = false;
				},1000)
			 })
			 .fail();
			 gaqpush("index","replace");	
		});
    };
})(jQuery);
