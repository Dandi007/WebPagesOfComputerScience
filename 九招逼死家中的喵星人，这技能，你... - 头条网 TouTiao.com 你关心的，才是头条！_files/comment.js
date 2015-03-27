define(function(require, exports, module){
    require('mustache');
    var user = require('user');
    //var $comment_item_tpl = $("#comment-item-tpl").html();

    var maxLength = 140;
	
	var is_recomment = false;
	
	var $recomment_btn = null;
	
	var lock = false;

	var hasfaces = false;
	
	var comment_lock = [];
	
    var get_post_comment_url = function(pin_id, group_id){
        if(pin_id) {
            return "/pin/" + pin_id + "/post_comment/";
        }
        
        return "/group/" + group_id + "/post_comment/";
    }

    var getValidText = function(){
        var text = $.trim($("#comment-box").val());
        return text;
    }

    var init_commentbox = function(){
        var $commentbox = $("#comment-box");
        $commentbox
		.on('keydown keyup change', checkComment)
		.on("mouseup keyup  touchend change",function(){ textarea_saveCursorPosition(this)}) 
		.trigger('keydown')
		.keydown(function(e){
			e = e?e:window.event;
			if(e.ctrlKey && 13==e.keyCode){
			   $("#post_comment_btn").click();
			}
		});
		
		//评论头像
		var $comment_emoji_toggle = $(".comment_emoji_toggle").click(function(){
			$(".comment_emoji_content").slideToggle("fast");
			if(!hasfaces){ init_emoji(".comment_emoji_content"); hasfaces = true; }
			return false;		
		});
		
		$(".comment_emoji_content").on("click","img",function(){
			textarea_add("["+this.title+"]",'comment-box');
			$(".comment_emoji_content").slideUp("fast");
			checkComment();
		}).on("click",".comment_emoji_close",function(){
			$(".comment_emoji_content").slideUp("fast");
			return false;
		});
    }

    var tip = function(text, num){
        $("#comment_tip").html(Mustache.render("{{text}}<span>{{num}}</span>字", {'text': text, 'num': num}));
    }

    var checkComment = function(event){
        var text = getValidText();
        var sub = maxLength - text.length;
        if(sub >= 0){
            tip("您还可以输入", sub);
        }else if(sub<0){
            tip("已经超过", -sub);
        }
    }

    var post_comment = function(pin_id, group_id){
		$(".comment_emoji_content").slideUp("fast");
		var post_comment_url = get_post_comment_url(pin_id, group_id);
        user.loginRequired(function(){
			if(lock) return;		
			lock = true;
            var text = getValidText();

            if(text.length > maxLength){
                alert('评论字数最多140字');
				lock = false;
                return;
            }
            var enablePlatform = get_actives();
            var data = {
                status: text,
                platform: enablePlatform.join(',')
            };
            $.post(post_comment_url, data=data, function(result){
                //var rendered = Mustache.to_html($comment_item_tpl, result);
				lock = false;
                var rendered = result.tpl;
                if (rendered){
                    $("#comment_list").prepend(rendered);
                }else{
                    alert('已提交至服务器，请耐心等待审核！');
                }
                $("#comment-box").val('');
				checkComment();
				if(is_recomment){
					$recomment_btn.html("已评论 / 转发").removeClass("recomment").addClass("recommented");
					is_recomment = false;
				};
            }, 'json')
        });
    };

    var load_comments = function(pin_id, group_id){
        
        var base_url = pin_id ? "/pin/" + pin_id + "/comments/": "/group/" + group_id + "/comments/";

        var $comment_pane = $("[data-toggle='comment_pane']");
        $comment_pane.on('click.prev_page', '[action_type="prev_page"]', function(e){
			
            e.preventDefault();
            var $this = $(this);
            var href = $this.attr('href').replace(/(.*)\?/,'?');
            var url = base_url + href;
            $comment_pane.load(url);
			setTimeout(function(){
				$("html, body").animate({ scrollTop: $(".comment-box").offset().top-50 }, 120);
			},1000);
			return false;
        })
        $comment_pane.on('click.next_page', '[action_type="next_page"]', function(e){
            e.preventDefault();
            var $this = $(this);
            var href = $this.attr('href').replace(/(.*)\?/,'?');
            var url = base_url + href;
            $comment_pane.load(url);
			setTimeout(function(){
				$("html, body").animate({ scrollTop: $(".comment-box").offset().top-50 }, 120);
			},1000);
			return false;
        })
    }

	var init_comment_action = function(){
		$(".comment-pane").on('click','.action a', function(){
		   //评论转发
		   if($(this).is(".recomment") || $(this).is(".recommented")){
			   
			   $("#comment_box").attr("selectionstart",0).attr("selectionend",0);
			   is_recomment = true;
			   $recomment_btn = $(this);
			   var c = $(this).parents(".comment-content");
			   var name = $.trim(c.find(".name a").text());
			   var text = $.trim(c.find(".content").text());
			   $("#comment-box").val("//@"+name+" :"+text);
			   textarea_setCursorPosition("comment-box",0);		   
			   checkComment();
			   setTimeout(function(){
					$("html, body").animate({ scrollTop: $(".comment-box").offset().top-50 }, 120);
			   },1000);
			   return false;
		   };

		   //顶踩
    	   var url = $(this).attr('href');
		   var $that = $(this);
		   var user = require('user');

           user.loginRequired(function(){
			   var $span = $that.parent();
			   var status = $span.attr("status");
			   if(status !== ""){
				  alert("您已经"+status+"过了");
				  return false;
			   };
			   
			   var action_type = $that.is('.comment_digg')?'顶':'踩';
			   var after_class = $that.is('.comment_digg')?'comment_digged':'comment_buryed';
			   
			   $span.attr("status",action_type);
			   $that.text( parseInt($that.text())+1)
			        .addClass(after_class);
			   
			   $.post(url)
				.done(function(data){
					if(data.message == "success"){
					}else{
						//alert("出错了，请等会儿再试");
					}
				})
				.fail();
			   
		   });
		  return false;
		   
		})
	}
	
	
	var init_update_actions = function(selector){
		$(selector).on("click",".update_comments_digg",function(){
		   var $that = $(this);
	   	   var diggcnt = parseInt($that.text());
		   var url = $that.attr('url');
		   var user = require('user');
		   
	
		   user.loginRequired(function(){
			   var status = $that.attr("status");
			   if(status == "1"){
				  alert("您已经顶过了");
				  return false;
			   };
			   			   			   
			   $that.attr("status","1")
			        .text(diggcnt+1)
					.addClass('update_comments_digged');
			   
			   $.get(url)
				.done(function(data){
					if(data.message == "success"){
					}else{
						//alert("出错了，请等会儿再试");
					}
				})
				.fail();
			   
		   });
		   return false;
		})
	}
	
	
	
    var init_platform = function(callback){
        show_user_info();
        binding_platforms_event(callback);
    }

    var binding_platforms_event = function(callback){
        var platforms = $("[data-toggle='sns_platform']");
        platforms.on('click', function(e){
            var $this = $(this);
            var platformId = $this.attr('name');
            if (user.isConnect(platformId)){
                toggle_platform_stats(platformId);
            }else{
                // for popup
                var label = "platform="+platformId;
                label += "&page=detail";
                try{_gaq.push(['_trackEvent', 'event', 'auth_sns', label]);}catch(e) {}
                user.doConnect(platformId, function(){
                    show_user_info(callback);
                })
            };
        })
    }

    //platform stats
    var _platform_info = {
        sina_weibo: false
        ,qq_weibo: false
        ,renren_sns: false
        ,kaixin_sns: false
        ,qzone_sns: false
    }
    var is_active = function(platformId){
        return _platform_info[platformId]
    }
    var deactivate = function(platformId){
        _platform_info[platformId] = false;
        $("[name='"+platformId+"']", '.platform-box').find('.follow_icon').hide();
    }
    var activate = function(platformId){
        _platform_info[platformId] = true;
        $("[name='"+platformId+"']", '.platform-box').find('.follow_icon').show();
    }
    var get_actives = function(){
        return $.map(_platform_info, function(value, key){
            return value ? key : null;
        })
    }
    var toggle_platform_stats = function(platformId){
        if (is_active(platformId)){
            deactivate(platformId);
        }else{
            activate(platformId);
        }
    }

    var show_user_info = function(callback){
        if(user.isLogin()) {
            info = user.get_info();
            $("[data-context='user-pic']").attr('src', info['avatar_url']);
            var connects = info['connects'];
            for (key in connects) {
                if (connects.hasOwnProperty(key)){
                    activate(key);
                }
            };
			if(typeof callback == "function"){
				callback();
			}
        }
    }

    var comment_action = function(comment_id, action){
       var url = '/comment/action/';
       $.post(url, {'comment_id': comment_id, 'action': action}, function(result){
        console.log(result);
       })
    }
	
	
	
	
	var textarea_setCursorPosition = function(targetId, pos){ 
		var ctrl = document.getElementById(targetId);
		if(ctrl.setSelectionRange){ 
			ctrl.focus(); 
			ctrl.setSelectionRange(pos,pos); 
		}else if (ctrl.createTextRange) { 
			var range = ctrl.createTextRange(); 
			range.collapse(true); 
			range.moveEnd('character', pos); 
			range.moveStart('character', pos); 
			range.select(); 
		} 
	} 
	
	var textarea_add = function(txt,box){
		var textBox = document.getElementById(box);
		var start = textBox.getAttribute("selectionStart") || 0;
		var end = textBox.getAttribute("selectionEnd") || 0;
		var pre = textBox.value.substr(0, start);	
		var post = textBox.value.substr(end);	
		txt = $.trim(txt);
		textBox.value = pre + txt + post;
		textarea_setCursorPosition(box,(pre+txt).length);
		textarea_saveCursorPosition(textBox);
	}
	
	function textarea_saveCursorPosition(textarea) {
		var rangeData = {text: "", start: 0, end: 0 };
			textarea.focus();
		if (textarea.setSelectionRange) { // W3C
			rangeData.start= textarea.selectionStart;
			rangeData.end = textarea.selectionEnd;
			rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): "";
		} else if (document.selection) { // IE
			var i,
				oS = document.selection.createRange(),
				// Don't: oR = textarea.createTextRange()
				oR = document.body.createTextRange();
			oR.moveToElementText(textarea);
	
			rangeData.text = oS.text;
			rangeData.bookmark = oS.getBookmark();
	
			// object.moveStart(sUnit [, iCount])
			// Return Value: Integer that returns the number of units moved.
			for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
				// Why? You can alert(textarea.value.length)
				if (textarea.value.charAt(i) == '\n') {
					i ++;
				}
			}
			rangeData.start = i;
			rangeData.end = rangeData.text.length + rangeData.start;
		}
		textarea.setAttribute("selectionStart",rangeData.start);
		textarea.setAttribute("selectionEnd",rangeData.end);
	}
	
	
	var init_emoji = function(selector){
		$.getScript('http://s.pstatp.com/r2/js/weibofaces.js', function() {
		 	$(selector).append(weibofaces.sina_face)
					   .append("<a class='comment_emoji_close' href='#'>[关闭]</a>");
			
		});
	}
	

	//首页 评论展开部分
	var get_recent_comments = function(obj,group_id,cnt){
		if(comment_lock[group_id]) return;
		
		comment_lock[group_id] = true;
		
		if(!group_id) return;
			
		var $this = $(obj);
		
	
		var comments_total = parseInt($this.attr("comments_count"));
		if(comments_total == 0) return;
		
		
		var shown = $this.attr("comments_shown");
		var $pin = $this.parents(".pin");
		cnt = cnt || 5;
		
		if(shown == "false"){
			$.get("/group/article/"+group_id+"/comments/?count="+cnt)
			 .done(function(data){
				$this.attr("comments_shown","true").addClass("expand");				
				
				$pin.append("<div class='comment-pane expand-comment'><div class='comment-list'>"+data+"</div><div class='clearfix'></div></div>");
				$pane = $pin.find(".comment-pane");
				$pane.prepend("<i class='W_arrline'></i>");
				
				if(comments_total > cnt){
					$('<div class="comments_fix"><a href="/group/article/'+group_id+'/#platform_div" class="more_comments" target="_blank">查看更多评论</a></div>').appendTo($pane);					
				};
				
				$pane.find(".comment-item:last-child").css("border","none");
								
				comment_lock[group_id] = false;

			 })
			 .fail(function(data){
				 comment_lock[group_id] = false;
				 //console.log(data);
			 })
		}else{
			comment_lock[group_id] = false;
			$pin.find(".comment-pane").remove();
			$this.attr("comments_shown","false").removeClass("expand");
		}
	}
	
	remove_all_comments = function(){
		var $pan = $(".comment-pane");
		if($pan.length){
			var $pin = $pan.parent();
			$pin.find("span.comment").attr("comments_shown","false");
			$pan.remove();	
		}
	}
	
	
	scrollToThis = function($obj){
		if($obj instanceof jQuery){
			var offsetBody = document.documentElement.scrollTop||document.body.scrollTop;
			var offsetThis = $obj.offset().top;
			if(offsetBody > offsetThis) setTimeout(function(){$("html, body").animate({ scrollTop: offsetThis-35 }, 0)}, 300);
		}else{
			return;
		}
	}
	
	exports.get_recent_comments = get_recent_comments; 
    exports.post_comment = post_comment;    
    exports.load_comments = load_comments;
    exports.init_platform = init_platform;
    exports.init_commentbox = init_commentbox;
    exports.comment_action = comment_action;
	exports.init_update_actions = init_update_actions;
	exports.init_comment_action = init_comment_action;
})

