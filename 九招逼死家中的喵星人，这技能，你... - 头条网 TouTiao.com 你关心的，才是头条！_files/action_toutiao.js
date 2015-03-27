/*
 * 顶,踩,收集等按钮事件
 */

(function($) {

    var disable_actions = [];

    var group_actions = {};

    var lock = {};
    
    var on_success = null;
	
	var $expandComment = null;

    var getActionUrl = function(action_type, group_id, count){
        //TODO django template的url的确有个问题, url出来的是最终路径, 和nginx的配置回不一致
        
        if (action_type === 'digg')       return "/group/article/" + group_id + "/digg/"; 
        if (action_type === 'bury')       return "/group/article/" + group_id + "/bury/";
        if (action_type === 'favorite')   return "/group/article/" + group_id + "/repin/";
        if (action_type === 'repin')      return "/group/article/" + group_id + "/repin/";
		if (action_type === 'unrepin')    return "/group/article/" + group_id + "/unrepin/";
		if (action_type === 'comment')	  return "/group/article/" + group_id + "/comments/?count="+count;
		if (action_type === 'comment_digg') return "/comment/action/?group_id="+group_id+"&action=digg&comment_id=";
		

        return false;
    };

    var updateClass = function(action_type, context){
        if(action_type == 'digg'){
            context.find('.like').addClass('undigg').show();
            context.find('.digg').removeClass('digg').addClass('undigg').show();
            context.find('[action_type=digg]').attr('title', '已顶').removeAttr('data-toggle');
            context.find('[action_type=bury]').removeAttr('data-toggle').css("cursor","default");
            context.find('[update-text=digg]').text('已顶');
        }else if(action_type == 'bury'){
            context.find('.hate').addClass('unbury').show();
            context.find('.bury').removeClass('bury').addClass('unbury').show();
            context.find('[action_type=bury]').attr('title', '已踩').removeAttr('data-toggle');
            context.find('[action_type=digg]').removeAttr('data-toggle').css("cursor","default");
            context.find('[update-text=bury]').text('已踩');
        }else if(action_type == 'repin'){
            context.find('.fav').addClass('unfavorite').removeClass("fav").show();
            context.find('[action_type=repin]').attr('title', '已收藏').attr("action_type","unrepin");
        }else if(action_type == 'unrepin'){
            context.find('.unfavorite').addClass('fav').removeClass("unfavorite");
            context.find('[action_type=unrepin]').attr('title', '收藏').attr("action_type","repin");
        }
    };
	
	var gaEvents = function(action_type){
		var from_iframe = location.href.indexOf("toutiao.com/i/") == -1 ? false: true;
		if(from_iframe){
			var t1 = "iframe",t2 = ""
		}else{
			var t1 = "index",t2 = "item_"
		};
		
		
		if(action_type == 'digg'){
			gaqpush(t1,t2+"digg");
        }else if(action_type == 'bury'){
			gaqpush(t1,t2+"bury");
        }else if(action_type == 'repin'){
			gaqpush(t1,t2+"fav");
        }else if(action_type == 'comment_digg'){
			gaqpush("index","comment_digg");
		};
	};

    $.fn.initActionButtons = function(settings) {
        
        if(typeof settings == 'object') {
            on_success = settings.on_success;
        }

        this.delegate('[data-toggle=action]', 'click', function(e) {
			
            var $this = $(this);
			
			var user = require('user');

            user.loginRequired(function(){

                var action_type = $this.attr('action_type');				
				var remove_pin  = $this.attr('remove_pin');
                var context     = $this.parents('[data-type=context]');
                
                var group_id    = context.attr('group_id');
                var pin_id      = context.attr('pin_id');
                
                if(action_type == 'favorite')  action_type = 'repin';
                
                if(!group_id && !pin_id) return;

                if($.inArray(action_type, ['digg', 'bury', 'repin','unrepin','comment_digg','comment_digged']) == -1) {
                    return false;
                }
                if(action_type == "comment_digged"){
					alert("您已经顶过");
					return false;
				};
				
				if(action_type == "unrepin"){
					if(!confirm("您确定要取消收藏这篇文章?")) return;
				}
				
                var lock_key = group_id;
                if(lock[lock_key]) {
                    return;
                }

                lock[lock_key] = true;

                var action_url = getActionUrl(action_type, group_id);
				
				if(action_type == "comment_digg"){
					var comment_id = $this.attr("comment_id");
					action_url += comment_id;
				};

                if(!action_url) {
                    return;
                }
				
				gaEvents(action_type);
				
				$.ajax({
                    url: action_url, 
                    type: 'post',
                    dataType: 'json',
                    data: {group_id: group_id},

                    success: function(ret) {
                        if(ret.message == 'success') {
							updateClass(action_type, context);
							
							if(action_type == "comment_digg"){
								updateCommentDigg(comment_id,ret);
							}else{
								var stats = ret.pin_stats || ret.stats;
								
								if(remove_pin){
									context.slideUp(400,function(){
										context.remove();
									})
								}else{		
									updateStats(context,
										stats.digg_count, 
										stats.bury_count, 
										stats.pin_count, 
										stats.comment_count);
								}
	
								if(typeof on_success == 'function') {
									var stats = ret.stats;
									on_success(stats);
								}
							}

                        } else {
							if(action_type == "comment_digg") alert('您已经顶过');
                        }
                    },
                    complete: function(ret) {
                        lock[lock_key] = false;
                    }
                });

            });
			
			return false;

        })
        
        return this;
    };

    var updateStats = function($context, digg_count, bury_count, pin_count, comment_count){
        // update the pin_action count show
        $('[action_type=digg]',         $context).html(digg_count);
        $("[action_type=undigg]",       $context).html(digg_count);
        $("[action_type=bury]",         $context).html(bury_count);
        $("[action_type=unbury]",       $context).html(bury_count);
        $('[action_type=repin]',        $context).html(pin_count);
        $("[action_type=unrepin]",      $context).html(pin_count);		
    };
	
	var updateCommentDigg = function(comment_id,obj){
		$('[comment_id="'+comment_id+'"]')
		  .addClass("comment_digged")
		  .html(obj.digg_count)
		  .attr("action_type","comment_digged");
	};
    
})(jQuery);
