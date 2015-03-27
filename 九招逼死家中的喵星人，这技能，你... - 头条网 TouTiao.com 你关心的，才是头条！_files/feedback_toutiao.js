feebback_togger = function(){
	$("#feed_back").toggle();
};

back_top = function(){
	 $("html,body").animate({ scrollTop: 0 }, 120);
};

feedback_submit = function(){
	var $mail_input = $("#feedback-email"),
		$content_input = $("#feedback-content"),
		$feedback_form = $("#feedback");
	var MESSAGE = {
		'success' 	: '已提交,感谢您的意见',
		'fail'		: '提交错误,请稍后重试',
		'mail_error': '请输入正确的联系方式',
		'content_error' : '请输入您的意见',
		'content_length_error' : '意见长度超出限制'
	},
	CONTENT_MAX_LENGTH = 1000,
	mail_str = $mail_input.val(),
	mail_placeHolder = $mail_input.attr("placeHolder"),
	//mail_reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	//qq_reg = /^\d{5,13}$/,
	content_str = $content_input.val(),
	content_placeHolder = $content_input.attr("placeHolder");
	
	
	if($.trim(mail_str).length < 6 || mail_str == mail_placeHolder){
		show_feedback_tip(MESSAGE.mail_error,'text-danger');
		$mail_input.focus();
		return false;
	};
	if(content_str && content_str!== content_placeHolder){
		if(content_str.length > CONTENT_MAX_LENGTH) {
			show_feedback_tip(MESSAGE.content_length_error,'text-danger')
		}else{
			$.post("/post_message/",{
				appkey : 'web',
				uuid : mail_str,
				content : "["+location.host+"]"+content_str
			}).done(function(d){
				if(d.message == "success"){
					show_feedback_tip(MESSAGE.success,'text-success');
					setTimeout(function(){
						$mail_input.val("");
						$content_input.val("");						
						feebback_togger();
					},1000);
				}else{
					show_feedback_tip(MESSAGE.fail,'text-danger');
				}
			}).fail(function(){
				show_feedback_tip(MESSAGE.fail,'text-danger');
			});			
		};		
	}else{
		show_feedback_tip(MESSAGE.content_error,'text-danger');
		return false;
	};
	return false;
};

//type: success/alert/
function show_feedback_tip(str,type){
	var $tip = $("#feedback-form-tip");
	$tip.text(str).addClass(type);
	setTimeout(function(){
		$tip.text("").removeClass(type);
	},3000)
};