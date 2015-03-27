
(function($){
	var pfx = ["webkit", "moz", "MS", "o", ""];
	$.prefixedEvent = function(element, type, callback) {
	    for (var p = 0; p < pfx.length; p++) {
	        if (!pfx[p]) type = type.toLowerCase();
	        element.addEventListener && element.addEventListener(pfx[p]+type, callback, false);
	    }
	}
})(jQuery);

;(function($){
	var _defaults = {
		"holder":".holder",
		"list":".list"
	}
	var methods = {
		init:function(options){
			var op = $.extend({}, _defaults, options);
			var _op = !$.data( this, "pullDownMenuData" ) ? op : $.data(this, "pullDownMenuData");

			var $holder = $(_op.holder), 
				$root = $(this),
				$list = $( _op.list, $root);

			if( !$holder.hasClass("holder") ){
				$holder.addClass("holder");
			}
			$root.on( "mouseenter", function(){
				$holder.addClass( _op.toggleClass );
				$list.show();
			}).on("holder.mouseleave", function(){
				$holder.removeClass( _op.toggleClass );
				$list.hide();
			});
			$root.on("mouseleave", function(){
				$root.trigger("holder.mouseleave");
			});

		}
	} 
	$.fn.pullDownMenu = function(method){
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
})(jQuery);

;(function($){
	var _defaults = {
		"holder":".holder",
		"list":".list"
	}
	var methods = {
		init:function(options){
			var op = $.extend({}, _defaults, options);
			var _op = !$.data( this, "search" ) ? op : $.data(this, "search");

			var $root = $(this),
				$searchInput = $("input:text", $root),

				$searchMenu = $(".searchMenu", $root),
				$holder = $(_op.holder, $searchMenu),
				$list = $( _op.list, $searchMenu);

			$searchMenu.pullDownMenu( _op );

	        $list.on("click", "li", function(){
	        	
	            $(this).addClass("selected").siblings().removeClass("selected");
	            /* by dayee Start */
	            var navName = $("#curNavName").val();
	            if(navName == "social"){
	            	$("#searchSelected_social").text( $(this).text() );
	            	$("#workPlace_social").attr("value",$(this).attr("valfull"));
	            }else if(navName == "school"){
	            	$("#searchSelected_school").text( $(this).text() );
	            	$("#workPlace_school").attr("value",$(this).attr("valfull"));
	            }else if(navName == "practice"){
	            	$("#searchSelected_practice").text( $(this).text() );
	            	$("#workPlace_practice").attr("value",$(this).attr("valfull"));
	            }else if(navName == "overseas"){
	            	$("#searchSelected_overseas").text( $(this).text() );
	            	$("#workPlace_overseas").attr("value",$(this).attr("valfull"));
	            }
	            //$("#searchSelected").text( $(this).text() );
	            /* by dayee End */
	            //$(".search input:text").val("").focus();
	        }).on("mouseleave", function(event){
	            /* by dayee Start */
	            var navName = $("#curNavName").val();
	        	if(navName == "social"){
	            	$("#searchSelected_social").trigger("search.mouseleave");
	            }else if(navName == "school"){
	            	$("#searchSelected_school").trigger("search.mouseleave");
	            }else if(navName == "practice"){
	            	$("#searchSelected_practice").trigger("search.mouseleave");
	            }else if(navName == "overseas"){
	            	$("#searchSelected_overseas").trigger("search.mouseleave");
	            }
	            /* by dayee End */
	            //$("#searchSelected").trigger("search.mouseleave");
	        });

	        var temp = $searchInput.val() || "请输入关键字";
	        $searchInput.on("focus", function(){
	        	$(this).css({"color":"#000"})
	        	if($(this).val() === temp){
	            	$(this).val("");
	        	}
	        }).on("blur", function(){
	            if($(this).val() == ""){
	            	$(this).css({"color":"#666"});
	        		$(this).val(temp)
	        	}
	        }).on("change", function(){
	        	
	        	if($(this).val() == ""){
	        		$(this).val(temp)
	        	}
	        }).css({"color":"#666"}).val(temp);

		}
	} 
	$.fn.search = function(method){
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
})(jQuery);