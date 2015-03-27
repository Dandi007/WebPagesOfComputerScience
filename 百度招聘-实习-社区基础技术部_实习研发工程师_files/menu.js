(function($){

	var _defaults = {
		el : ".menu",
		navHolder:".nav",
		duration:300,
		generateNav:false,
		initNav:"index"
	};

	var _navCon = $(".nav-con").last();

	/*
		return 每组导航的字符串
	*/
	var _generateNavItem = function(i, item){
		var arr = [];
		$.each(item, function(){
		    arr.push( ['<li><a class="', this.aClassName ? this.aClassName : "" , '" href="', this.href, '">', this.name, '<span class="', this.spanClassName, '">', this.name, '</span></a></li>'].join("") );
		})
		return arr.join("");
	};
	/*
		return 管理导航字符串的对象
	*/
	var _generateNav = function(obj){
		var itemCollect = {};
		$.each(obj, function(i, item){
			itemCollect[i] = _generateNavItem(i, item);
		})
		return itemCollect;
	};
	/*
		从ul.nav 中获取li的字符串
	*/
	var _getNav = function(obj){
		$(obj).html();
	}

	var _mouseenter = function(_op){
        $(this).animate({"margin-top":"-106px"}, _op.duration);
	};

	var _mouseleave = function(_op){
        $(this).css({"margin-top":"-106px"}).animate({"margin-top":"0px"}, _op.duration, function(){
        	this.animateStatus = "play";
        });
	}

	var _top = function(_op){
		var _self = this;
		$(this).closest(_op.warpNav).animate({"top":0, "margin-top":0}, _op.duration, function(){
			_op.push && _op.push(_op.url);
		});
	},
	_center = function(_op, cb){			
		var _self = this;
		$(this).closest( _op.warpNav ).animate({"top":"50%", "margin-top":"-28px"}, _op.duration, function(){
			_op.push && _op.push(_op.url);
		});
	}, 
	_change = function(_op, navName, cb){
		$(this).slideUp(500, function(){
			$(this).css({"margin-top":"-50px"})
				.html( _op.itemCollect[navName] )
				.show().animate({"margin-top":"0px"}, function(){
					_op.changeAfter(navName);
				});
		});
	};

	var methods = {
		init:function(options){
			var op = $.extend({}, _defaults, options);
			var _op = !$.data( this, "menu" ) ? op : $.data(this, "menu");
			if( _op.generateNav ){
				_op.itemCollect = _generateNav( _navObj );
				$(this).html( _op.itemCollect[ _op.initNav ] );
			}

			$.data( this, "menu", _op );

			var _self = this;
	        $(_self).on("mouseenter", "a", function(event){
	        	_mouseenter.call(this, _op); 	
	        	this.animateStatus = "play";
	        }).on("mouseleave", "a", function(event, animateStatus){
	        	this.animateStatus = !!animateStatus ? animateStatus : this.animateStatus ;
	        	
	        	if( this.animateStatus === "play" ){
	        		_mouseleave.call(this, _op);
	        	}
	        });
	        if( _op.bindAClick ){
		        $(_self).on("click", "a:not(.outLink)", function(event){
		            var url = _op.url = $(this).attr("href");
		        	
		            if(~url.indexOf("index")){
		                _center.call( _self, _op );
		            }else{
		                _top.call( _self, _op );
		            }

		            if(!~url.indexOf(".html")){
		                event.preventDefault();
		            }
		        	$(this).trigger("mouseleave", "stop");
		        });
	        }
		},
		fixTop:function(){
			var _op = $(this).data("menu");
			$(this).closest(_op.warpNav).css({"top":0, "margin-top":0});
		},
		fixCenter:function(){
			var _op = $(this).data("menu");
			$(this).closest(_op.warpNav).animate({"top":"50%", "margin-top":"-28px"});
		},
		top:function(duration, cb){
			var _op = $(this).data("menu"), $self = $(this);
			$(this).closest(_op.warpNav).animate({"top":0, "margin-top":0}, _op.duration, function(){
				_op.push && _op.push(_op.url);
			});
		},
		center:function(duration, cb){			
			var _op = $(this).data("menu"), $self = $(this);
			$(this).closest(_op.warpNav).animate({"top":"50%", "margin-top":"-28px"}, duration, function(){
				cb && cb.call( $self );
			});
		}, 
		change:function(navName, cb){
			var _op = $(this).data("menu");
			$("#curNavName").val(navName);// yxhong
			if( (navName !=null && navName!="" && navName=="overseas") 
			    || (_userType=="13" && (navName=="" || navName=="index" ) ) ){
				$(".tLogin").html("Login");
				$(".tRegister").html("Register");
				$(".Settings").html("Settings");
				$(".SignOut").html("Logout");
				$(".Sybdbd").html("Disclaimer");
				$(".Bdgy").html("CSR");
				$(".Bdxy").html("Baidu Campus");
				$(".Gybd").html("About Baidu");
				$(".Hzhb").html("Partners");
				
				var urlSettings = $(".Settings").attr("href");
				if(urlSettings){
				    urlSettings = urlSettings.replace("?request_locale=cn","");
				    urlSettings = urlSettings.replace("?request_locale=CN","");
				    urlSettings = urlSettings.replace("?request_locale=zh_CN","");
				    urlSettings += "?request_locale=en";
				    $(".Settings").attr("href",urlSettings);				    
				}
				
				var oldHref = $(".tLogin").attr("href");
				var newHref = oldHref + "Global";
				var newHrefReg = newHref + "#toRegister";
				$(".tLogin").attr("href",newHref);
				$(".tRegister").attr("href",newHrefReg);
				
				$(".tLogin").addClass("en");
				$(".tRegister").addClass("en");
				$(".Settings").addClass("en");
				$(".SignOut").addClass("en");
				$(".Sybdbd").addClass("en");
				$(".Bdgy").addClass("en");
				$(".Bdxy").addClass("en");
				$(".Gybd").addClass("en");
				$(".Hzhb").addClass("en");
				$("body").addClass("en");
			}else{
				$(".tLogin").html("登录");				
				$(".tRegister").html("注册");				
				$(".Settings").html("设 置");				
				$(".SignOut").html("退 出");				
				$(".Sybdbd").html("使用百度前必读");
				$(".Bdgy").html("百度公益");
				$(".Bdxy").html("百度校园");
				$(".Gybd").html("关于百度");
				$(".Hzhb").html("合作伙伴");
				
				var urlSettings = $(".Settings").attr("href");
				if(urlSettings){
                    urlSettings = urlSettings.replace("?request_locale=cn","");
                    urlSettings = urlSettings.replace("?request_locale=CN","");
                    urlSettings = urlSettings.replace("?request_locale=zh_CN","");
				    urlSettings = urlSettings.replace("?request_locale=en","");
				    $(".Settings").attr("href",urlSettings);				    
				}
				
				if($(".tLogin").length>0){
					var nowHref = $(".tLogin").attr("href");
					var goHref;
					if(nowHref.indexOf("Global")>0){
						goHref = nowHref.replace("Global","");
						goHrefReg = goHref + "#toRegister";
						$(".tLogin").attr("href",goHref);
						$(".tRegister").attr("href",goHrefReg);
					}
				}
				
				$(".tLogin").removeClass("en");
				$(".tRegister").removeClass("en");
				$(".Settings").removeClass("en");
				$(".SignOut").removeClass("en");
				$(".Sybdbd").removeClass("en");
				$(".Bdgy").removeClass("en");
				$(".Bdxy").removeClass("en");
				$(".Gybd").removeClass("en");
				$(".Hzhb").removeClass("en");
				$("body").removeClass("en");
			}
			_change.call(this, _op, navName, cb);
		}
	};

	$.fn.menu = function(method){
		var args = arguments;
		return this.each(function(){
			if(methods[method]){
				return methods[method].apply(
					this,
					Array.prototype.slice.call(args, 1)
				);
			}else if(typeof method == "object" || !method){
				return methods.init.apply(this, args);
			}
		});
	}


})(jQuery)