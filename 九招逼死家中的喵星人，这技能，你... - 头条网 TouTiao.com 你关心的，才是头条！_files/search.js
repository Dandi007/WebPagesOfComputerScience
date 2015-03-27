var keyArrowDown = 40, keyArrowUp = 38, keyArrowBack = 8,keyArrowDelete = 46;
var Search = {
	init : function(opts){
		this.form  = $(opts.form);
		this.input = this.form.find(opts.input);
		this.btn   = this.form.find(opts.btn);
		this.placeholder = this.form.find(opts.placeholder);
		this.menu  = this.form.find(opts.menu);
		this.menuItemIndex = null;
		this.keyword = opts.keyword;
		this.hasHotwords = false;
		this.initEvents();
		this.getHotwords();
	},
	initEvents : function(){		
		var _this = this;
 		this.placeholder.on('click',function(){
			_this.input.focus();
		});
		this.input.on('keyup',function(e){
			var v = this.value, 
				key = e.keyCode, 
				isUpDown = (key == keyArrowDown || key == keyArrowUp), 
				isBack = (key == keyArrowBack || key == keyArrowDelete);
			
			if(v){
				if(!isUpDown) _this.hideMenu();
				_this.placeholder.hide();
			}else{
				if(isBack) _this.showMenu();
				if(!isUpDown)_this.placeholder.show();
			};
			
			if(isUpDown){
				_this.showMenu();
				var txt =  _this.selectMenuItem(key);
				_this.input.val(txt);			
				_this.placeholder.hide();																
			};
		}).on('focusin',function(){
			_this.placeholder.addClass('active');
			_this.btn.addClass('active');
			_this.showMenu();
		}).on('focusout',function(e){
			_this.placeholder.removeClass('active');
			_this.btn.removeClass('active');
			_this.hideMenu();
		});
		
		this.form.on('submit',function(){
			var keyword = $.trim(_this.input.val());
			if(!keyword) return false;
		});
		
		this.menu.on("click",'.link',function(){
			_this.input.val($(this).text());
			_this.placeholder.hide();
			_this.btn.click();
			return false;
		});
	},
	getHotwords : function(){
		var hotwords = $.cookie("hotwords"), _this = this;
		if(hotwords){
			fillwords(hotwords.split("|"));			
		}else{
			$.get("/hot_words/")
			.done(function(d){
				$.cookie("hotwords", d.join("|"),{expires: 1000*60*60*10,path:'/'});
				fillwords(d)
			})
		};
		
		function fillwords(words){
			if(words.length) _this.hasHotwords = true;
			_this.menu.empty();
			for(var i=0; i<words.length; i++){
				_this.menu.append('<li><a class="link" href="#">'+words[i]+'</a></li>')
			};
			var first_word = _this.keyword || words [0];
			if(first_word){
				_this.input.val(first_word);
				_this.placeholder.hide();
			}
		}
	},
	selectMenuItem : function(key){
		var menu = this.menu,
			links = this.menu.find("a.link"),
			linksTotal = links.length,
			curlink = links.filter(".active"),
			nextIndex,prevIndex,tmplink,
			hasItemIndex = $.isNumeric(this.menuItemIndex);			
		
		if(key == keyArrowDown){
			if(!hasItemIndex)	this.menuItemIndex = -1;
			nextIndex = (this.menuItemIndex + 1)%linksTotal;	
			tmplink = links.eq(nextIndex);
			this.menuItemIndex = nextIndex;																
		}else if(key == keyArrowUp){						
			if(!hasItemIndex)	this.menuItemIndex = linksTotal;
			prevIndex = (this.menuItemIndex - 1)%linksTotal;		
			tmplink = links.eq(prevIndex);
			this.menuItemIndex = prevIndex;
		};
		
		curlink.removeClass("active");
		tmplink.addClass("active");
		return tmplink.text();
	},				
	showMenu : function(key){
		if(!this.hasHotwords) return;
		this.menu.show()
	},
	hideMenu : function(){
		var menu = this.menu;
		setTimeout(function(){menu.hide()},300)
	}
};			
