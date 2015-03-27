/////////////////////////////////////// Remove Javascript Disabled Class ///////////////////////////////////////


var el = document.getElementsByTagName("html")[0];
el.className = "";


/////////////////////////////////////// Window Loaded ///////////////////////////////////////


jQuery(window).load(function(){

	"use strict";


	/////////////////////////////////////// Navigation Menu Positioning ///////////////////////////////////////


	gpNavPos();

	jQuery(window).resize(function() {
		gpNavPos();
	});
	
	function gpNavPos() {	
		jQuery(".nav > ul > li").each(function() {
			var navPos = jQuery(this).offset();
			if(navPos.left + 300 > jQuery(window).width()+document.body.scrollLeft-300) {
				jQuery(this).addClass("left-nav");
			} else {
				jQuery(this).removeClass("left-nav");
			}
		});	
	}
	
		
});



/////////////////////////////////////// Document Ready ///////////////////////////////////////


jQuery(document).ready(function(){

	"use strict";
	

	/////////////////////////////////////// Navigation Menus ///////////////////////////////////////


	/*************************************** Mobile Menu ***************************************/	
	
	jQuery("<option />", {"selected": "selected", "value": "", "text": navigationText}).prependTo(".nav select");
			
	jQuery(".nav select").change(function() {
		window.location = jQuery(this).find("option:selected").val();
	});


	/*************************************** Nav Titles ***************************************/	
	
	jQuery(".sub-menu .nav-title").each(function() {
		jQuery(this).nextUntil(".nav-title").andSelf().wrapAll("<div class='nav-section'></div>");
	});


	/*************************************** Nav Text ***************************************/	
	
	jQuery(".sub-menu .nav-text a").contents().unwrap();
	

	/*************************************** Mega Menus ***************************************/
	 	
	jQuery(".nav").find(".menu li").each(function() {

		if(jQuery(this).find("ul").length > 0) {	

			jQuery(".nav ul > li").mouseenter(function() {
			
				var total_width = 0;			
		
				jQuery(this).find(".nav-section").each(function() {				
					total_width += jQuery(this).outerWidth(); 
				});
				
				jQuery(".nav ul.menu li").find(".sub-menu").css("width",total_width);

			});
		
		}	
		
	});
	
		
	/////////////////////////////////////// Search Button ///////////////////////////////////////


	jQuery('#searchsubmit').val("▶");


	/////////////////////////////////////// Back To Top ///////////////////////////////////////


	jQuery().UItoTop({ 
		text: '<i class="icon-chevron-up"></i>',
		scrollSpeed: 600
	});


	/////////////////////////////////////// Prevent Empty Search - Thomas Scholz http://toscho.de ///////////////////////////////////////


	(function($) {
		$.fn.preventEmptySubmit = function(options) {
			var settings = {
				inputselector: "#searchbar",
				msg          : emptySearchText
			};
			if (options) {
				$.extend(settings, options);
			}
			this.submit(function() {
				var s = $(this).find(settings.inputselector);
				if(!s.val()) {
					alert(settings.msg);
					s.focus();
					return false;
				}
				return true;
			});
			return this;
		};
	})(jQuery);

	jQuery('#searchform').preventEmptySubmit();
	

	/////////////////////////////////////// Accordion ///////////////////////////////////////


	jQuery(".accordion").accordion({header: "h3.accordion-title"});
	jQuery("h3.accordion-title").toggle(
		function(){
			jQuery(this).find("i").addClass("icon-circle-arrow-up").removeClass("icon-circle-arrow-down");
		},
		function() {
			jQuery(this).find("i").removeClass("icon-circle-arrow-up").addClass("icon-circle-arrow-down");
		}
	);


	/////////////////////////////////////// Tabs ///////////////////////////////////////


	jQuery(".sc-tabs").tabs({
		fx: {
			height:'toggle',
			duration:'fast'
		}
	});


	/////////////////////////////////////// Toggle Content ///////////////////////////////////////


	jQuery(".toggle-box").hide(); 
	jQuery(".toggle").toggle(
		function(){
			jQuery(this).find("i").addClass("icon-minus-sign").removeClass("icon-plus-sign");
		},
		function() {
			jQuery(this).find("i").removeClass("icon-minus-sign").addClass("icon-plus-sign");
		}
	);
	jQuery(".toggle").click(function(){
		jQuery(this).next(".toggle-box").slideToggle();
	});


	/////////////////////////////////////// Contact Form ///////////////////////////////////////


	jQuery('#contact-form').submit(function() {

		jQuery('.contact-error').remove();
		var hasError = false;
		jQuery('.requiredFieldContact').each(function() {
			if(jQuery.trim(jQuery(this).val()) == '') {
				jQuery(this).addClass('input-error');
				hasError = true;
			} else if(jQuery(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test(jQuery.trim(jQuery(this).val()))) {
					jQuery(this).addClass('input-error');
					hasError = true;
				}
			}
		});

	});
			
	jQuery('#contact-form .contact-submit').click(function() {
		jQuery('.loader').css({display:"block"});
	});	


});