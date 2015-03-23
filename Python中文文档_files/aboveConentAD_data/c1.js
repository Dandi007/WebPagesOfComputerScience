

﻿/**
baseNamespace是基础命名空间, 上面存放js框架的最基础的初始化命名空间和初始化类的方法.
框架会在window上注册两个变量:
一个是 ___baseNamespaceName , 为基础命名空间的名字.
一个是 window[___baseNamespaceName], 即基础命名空间对象.
___baseNamespaceName 全局变量在后面所有的类上都需要使用.所以必须定义成全局的.
通过修改 ___baseNamespaceName 变量可以修改基础命名空间的变量名.
*/


//@delete {
try{
	if(!window.___is3b){
		window.___is3b = "prepare";
	}
	function test3b() {
		window.___is3b = "loading";
		var ua = navigator.userAgent.toLowerCase();
		if (!ua.match(/msie ([\d.]+)/)) {
			window.___is3b = "false";
			return;
		}
		var img = new Image();
		var key = 'bdtest___' +Math.floor(Math.random() * 2147483648).toString(36);
		window[key] = img;

		img.onload = function() {
			window.___is3b = "true";
			img.onload = img.onerror = img.onabort = null;
			window[key] = null;
			img = null;
		};
		img.onerror = function() {
			window.___is3b = "false";
			img.onload = img.onerror = img.onabort = null;
			window[key] = null;
			img = null;
		};
		img.src = "res://360se.exe/2/2025";
		
	}
	if (window.___is3b === "prepare") {
		test3b();
		/* 暂时关闭延时
		var startTime = (new Date()).getTime();
		var endTime = startTime + 50;
		while (startTime < endTime) {
			startTime = (new Date()).getTime()
		}
		*/
	}
}
catch(ex){
}
finally{
}
//@delete }

//基础命名空间变量名
var ___baseNamespaceName = "CproNamespace";
    
(function(){
    //基础命名空间变量名
    var baseNamespaceName = ___baseNamespaceName;

    //判断是否在跨域的iframe中. 对于多层iframe嵌套, 只要有一层嵌套是跨域的, 则认为是跨域嵌套.
    //循环时最多10次循环, 如果用户修改了window.top和window.parent, 则会进行10次循环, 当作跨域处理.
    var win = window, counter=0, isInIframe=false, isCrossDomain = false;
    while ((win != window.top || win != win.parent) && counter<10) {
        isInIframe = true;
        try {
            win.parent.location.toString();
        }
        catch (ex) {
            isCrossDomain = true;
            break;
        }
        counter++;
        win = win.parent;
    }
    if(counter>=10){
        isCrossDomain = true;
    }
    
    if( !isCrossDomain ){
        var tempTopLocation = "";
        try{
            tempTopLocation = top.location.href;
        }
        catch(ex){
            tempTopLocation = "";
        }
        if( tempTopLocation ){
            if(tempTopLocation.indexOf("union.baidu.com") >0 
            || tempTopLocation.indexOf("unionqa.baidu.com") >0 
            || tempTopLocation.indexOf("musicmini.baidu.com") >0 
            || tempTopLocation.indexOf("qianqianmini.baidu.com") >0 ){
                isCrossDomain = true;
            }
        }
    }

    //注册基础命名空间的方法
    var registerBaseNamespace = function(baseNamespace, isInIframe, isCrossDomain){
        /**
        是否在iframe中,是否跨域    
        */
        baseNamespace.baseName = baseNamespaceName;
        baseNamespace.isInIframe = isInIframe;
        baseNamespace.isCrossDomain = isCrossDomain;
        baseNamespace.needInitTop = isInIframe && !isCrossDomain;        
        baseNamespace.buildInObject = {
            //buildInObject, 用于处理无法遍历Date等对象的问题
            '[object Function]': 1,
            '[object RegExp]'  : 1,
            '[object Date]'    : 1,
            '[object Error]'   : 1,
            '[object Window]'  : 1
        };
        
        /**
        克隆一个对象,返回它的副本.
        */
        baseNamespace.clone = function(source){
            var result=source,i, len;
            if (!source
                || source instanceof Number
                || source instanceof String
                || source instanceof Boolean) {
                return result;
            } else if (source instanceof Array) {
                result = [];
                var resultLen = 0;
                for (i = 0, len = source.length; i < len; i++) {
                    result[resultLen++] = this.clone(source[i]);
                }
            } else if ('object' === typeof source) {
                if(this.buildInObject[Object.prototype.toString.call(source)]){
                    return result;
                }
                result = {};
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        result[i] = this.clone(source[i]);
                    }
                }
            }
            return result;
        }        
        
        /**
        用于创建类的某一个实例
        */
        baseNamespace.create = function(classObj, params){    
            var args = Array.prototype.slice.call(arguments, 0);
            args.shift();
            var tempclassObj = function (args) {
                this.initialize = this.initialize || function(){};
                this.initializeDOM = this.initializeDOM || function(){};
                this.initializeEvent = this.initializeEvent || function(){};
                
                this.initialize.apply(this, args);
                this.initializeDOM.apply(this, args);
                this.initializeEvent.apply(this, args);
            };
            
            tempclassObj.prototype = classObj;  
            var result = new tempclassObj(args);                
            //如果类的某一个属性是对象, 并且具有"modifier=dynamic"属性, 则需要克隆.
            for(var classPropertyName in classObj){
                if( result[classPropertyName]
                    && typeof result[classPropertyName] === "object"
                    && result[classPropertyName].modifier
                    && result[classPropertyName].modifier.indexOf("dynamic")>-1){
                    result[classPropertyName] = this.clone(result[classPropertyName]);
                }
            }
            result.instances = null;
            classObj.instances = classObj.instances || [];
            classObj.instances.push(result);
            return result;
        };
                
        /**
        初始化方法. 将类的属性和方法分离, 每一次都初始化实例的所有方法.
        */
        baseNamespace.registerMethod = function(target, classObj){      
            var methodMapping = {};
            var propertyMapping = {};
            
            //分离obj的属性和方法
            var item, skey, instance;
            for (skey in classObj) {
                item = classObj[skey];
                if (!skey || !item) {
                    continue;
                }
                              
                if(typeof item === "object" && item.modifier && item.modifier === "dynamic"){
                    target[skey] = target[skey] || {};
                    this.registerMethod( target[skey] ,item);
                }
                else if (typeof item === "function") {
                    methodMapping[skey] = item;
                }
                else {
                    propertyMapping[skey] = item;
                }
            }
            
            //初始化方法
            for (skey in methodMapping) {
                item = methodMapping[skey];
                if (skey && item) {
                    target[skey] = item;
                }
            }
            
            //如果类有实例, 则还需要初始化类的每一个实例
            if(target && target.instances && target.instances.length && target.instances.length>0){
                for( var i=0, count= target.instances.length; i<count; i++){
                    instance = target.instances[i];
                    this.registerMethod(instance, classObj);
                }
            }           
        }
        
        /**
        创建对象
        */
        baseNamespace.registerObj = function(classObj, params){
            var args = Array.prototype.slice.call(arguments, 0);
            args.shift();
            var tempclassObj = function (args) {
				this.register = this.register || function(){};				
                this.register.apply(this, args);
            };            
            tempclassObj.prototype = classObj;
            tempclassObj.prototype.instances = null;    
            var result = new tempclassObj(args);            
            return result;
        };    
        
        /**
        初始化命名空间, 指定window对象
        */
        baseNamespace.registerNamespaceByWin = function(namespace, win){        
            //要初始化的window对象, 同时初始化namespace类上的win属性.
            var win = namespace.win = win || window;
            
            //拆分fullName, 获取所有前置和当前命名空间的名字
            var fullName = namespace.fullName.replace("$baseName", this.baseName);
            var namespaceNames = fullName.split(".");
            
            //初始化前置命名空间
            var count = namespaceNames.length;
            var currNamespace = win;            
            var firstName;
            for(var i=0; i<count-1; i++){
                var tempName = namespaceNames[i];
                if(currNamespace == win){//第一个命名空间,需要特殊处理
                    currNamespace[tempName]  = win[tempName] = win[tempName] || {};
                    firstName = tempName;
                    namespace.baseName = firstName;
                }
                else{
                    currNamespace[tempName] = currNamespace[tempName] || {};
                }                
                currNamespace = currNamespace[tempName];
            }
            
            var targetNamespace = currNamespace[namespaceNames[count-1]] || {};
            if(targetNamespace.fullName && targetNamespace.version){    //已经初始化过, 需要保存原始的静态变量
                this.registerMethod(targetNamespace, namespace);        //初始化namespace的function方法
            }
            else{                                                        //没有初始化过
                targetNamespace = this.registerObj(namespace);           //创建命名空间
                targetNamespace.instances = null;                        //命名空间不需要记录实例引用
                currNamespace[namespaceNames[count-1]] = targetNamespace;                
            }        
        };
        
        /**
        初始化命名空间
        */
        baseNamespace.registerNamespace = function(namespace){
            if(!namespace || !namespace.fullName || !namespace.version){
                return;
            }        
            
            this.registerNamespaceByWin(namespace, window);
            if(this.needInitTop){
                this.registerNamespaceByWin(namespace, window.top);
            }
        };        

        /**
        初始化类
        */
        baseNamespace.registerClass = baseNamespace.registerNamespace;   

        /**
        创建命名空间的简短引用:
        var U = G.using("Utility");
        */
        baseNamespace.using = function(name, win){
            var result;            
            if( !win && this.isInIframe && !this.isCrossDomain && top 
				&& typeof top ==="object" && top.document && "setInterval" in top){
                win = top;
            }
			else{
				win = win || window;
			}
            
			name = name.replace("$baseName", this.baseName);
            var nameArray = name.split(".");
            result = win[nameArray[0]];
            for(var i=1, count=nameArray.length; i<count; i++){
                if(result && result[nameArray[i]]){
                    result = result[nameArray[i]];
                }
                else{
                    result = null;
                }
            }
            return result;
        }
    }
    
    //在window和top上(非跨域iframe)注册基础命名空间
    window[baseNamespaceName] = window[baseNamespaceName] || {};
    registerBaseNamespace(window[baseNamespaceName], isInIframe, isCrossDomain);
	//如果在iframe中, 非跨域, 并且top对象没有被修改, 则需要在window.top上注册.
    if(isInIframe && !isCrossDomain){
		window.top[baseNamespaceName] = window.top[baseNamespaceName] || {};
		registerBaseNamespace(window.top[baseNamespaceName], isInIframe, isCrossDomain)
    }
})();


﻿///@import BaiduCproNamespace

(function(G) {
	// 声明命名空间
	var UtilityNamespace = {
		fullName : "$baseName.Utility",
		version : "1.0.0",
		register : function() {
			// 获取浏览器信息.
			// IE 8下，以documentMode为准
			// 在百度模板中，可能会有$，防止冲突，将$1 写成 \x241
			this.browser = this.browser || {};
			if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
				this.browser.ie = document.documentMode || +RegExp['\x241'];
			}
			if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
				this.browser.opera = +RegExp['\x241'];
			}
			if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
				this.browser.firefox = +RegExp['\x241'];
			}
			if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i
					.test(navigator.userAgent)
					&& !/chrome/i.test(navigator.userAgent)) {
				this.browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
			}
			if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
				this.browser.chrome = +RegExp['\x241'];
			}
			try {
				if (/(\d+\.\d)/.test(window["external"].max_version)) {
					this.browser.maxthon = +RegExp['\x241'];
				}
			} catch (ex) {
			}
			this.browser.isWebkit = /webkit/i.test(navigator.userAgent);
			this.browser.isGecko = /gecko/i.test(navigator.userAgent)
					&& !/like gecko/i.test(navigator.userAgent);
			this.browser.isStrict = document.compatMode == "CSS1Compat";
		},
		/**
		 * 保存用户浏览器的信息, 在register中对browser属性赋值
		 */
		browser : {},

		/**
		 * 判断传入的win是否是window对象. 如果win对象不可访问(比如跨域iframe中的top),则认为其不是window对象.
		 */
		isWindow : function(win) {
			var result = false;
			try {
				if (win && typeof win === "object" && win.document
						&& "setInterval" in win) {
					result = true;
				}
			} catch (ex) {
				result = false;
			}
			return result;
		},

		/**
		 * 判断当前窗口是否包含在Iframe中
		 * 
		 * @name this.isInIframe
		 * @function
		 * @grammar this.isInIframe([win])
		 * @param {Window}
		 *            win 要检测的window对象，不传递则为脚本执行时的window对象。
		 * @meta cpro
		 * 
		 * @return {Boolean} true表示当前窗口包含在iframe中。
		 */
		isInIframe : function(win) {
			win = win || window;
			return win != window.top && win != win.parent;
		},

		/**
		 * 判断win对象是否包含在跨域的iframe中.如果同时传递win和topWin，则只判断win和topWin之间是否跨域。
		 * 
		 * @name this.isCrossDomain
		 * @function
		 * @grammar this.isCrossDomain([win][, topWin])
		 * @param {Window}
		 *            win 要检测的window对象，默认为当前窗口的window。
		 * @param {Window}
		 *            topWin 父窗口window对象，默认为top
		 * @meta cpro
		 * 
		 * @return {Boolean} true表示win与topWin存在跨域
		 */
		isInCrossDomainIframe : function(win, another) {
			var result = false;
			win = win || window;
			another = another || window.top;

			var count = 0;

			// 检查top和parent对象是否被篡改.
			if (!this.isWindow(another) || !this.isWindow(another.parent)) {
				result = true;
			} else {
				while ((win != another) && count < 10) {
					count++;
					// 每次循环依然需要检查top和parent对象是否被篡改.
					if (this.isWindow(win) && this.isWindow(win.parent)) {
						// top和parent没有被修改
						try {
							win.parent.location.toString();
						} catch (ex) {
							result = true;
							break;
						}
					} else {
						// top或parent对象被修改, 认为是跨域iframe调用.
						result = true;
						break;
					}
					win = win.parent;
				}
			}

			if (count >= 10) {
				// 如果嵌套层数大于10层, 认为是跨域iframe调用
				result = true;
			}
			return result;
		},

		/**
		 * 从文档中获取指定的DOM元素
		 * 
		 * @name Utility.g
		 * @function
		 * @grammar Utility.g(id)
		 * @param {string|HTMLElement}
		 *            id 元素的id或DOM元素
		 * @shortcut g,G
		 * @meta standard
		 * 
		 * @returns {HTMLElement|null} 获取的元素，查找不到时返回null,如果参数不合法，直接返回参数
		 */
		g : function(id, win) {
			win = win || window;
			if ('string' === typeof id || id instanceof String) {
				return win.document.getElementById(id);
			} else if (id && id.nodeName
					&& (id.nodeType == 1 || id.nodeType == 9)) {
				return id;
			}
			return id;
		},
        
        /*
         * 通过请求一个图片的方式令服务器存储一条日志
         * @param   {string}    url 要发送的地址.
         */
        sendRequestViaImage : function(url, win) {
            var img = new Image();
            var key = 'cpro_log_' +
                Math.floor(Math.random() * 2147483648).toString(36);
            
            win = win || window;
            // 这里一定要挂在window下
            // 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
            // 导致服务器收不到日志
            win[key] = img;
         
            img.onload = img.onerror = img.onabort = function() {
                // 下面这句非常重要
                // 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
                // 则在gif动画播放过程中，img会多次触发onload
                // 因此一定要清空
                img.onload = img.onerror = img.onabort = null;
         
                win[key] = null;
         
                // 下面这句非常重要
                // new Image创建的是DOM，DOM的事件中形成闭包环引用DOM是典型的内存泄露
                // 因此这里一定要置为null
                img = null;
            };
         
            // 一定要在注册了事件之后再设置src
            // 不然如果图片是读缓存的话，会错过事件处理
            // 最后，对于url最好是添加客户端时间来防止缓存
            // 同时服务器也配合一下传递Cache-Control: no-cache;
            img.src = url;
        },

		// @delete {
		/**
		 * 获取目标元素所属的document对象
		 * 
		 * @name Utility.getDocument
		 * @function
		 * @grammar Utility.getDocument(element)
		 * @param {HTMLElement|string}
		 *            element 目标元素或目标元素的id
		 * @meta standard
		 * 
		 * @returns {HTMLDocument} 目标元素所属的document对象
		 */
		getDocument : function(element) {
			if (!element)
				return document;
			element = this.g(element);
			return element.nodeType == 9 ? element : element.ownerDocument
					|| element.document;
		},

		/**
		 * 获取元素所在的window对象
		 */
		getWindow : function(element) {
			element = this.g(element);
			var doc = this.getDocument(element);

			// 没有考虑版本低于safari2的情况
			// @see goog/dom/dom.js#goog.dom.DomHelper.prototype.getWindow
			return doc.parentWindow || doc.defaultView || null;
		},

		/**
		 * 获取最顶层的window对象. 如果window在跨域iframe中, 或者top对象被修改, 则返回window本身
		 */
		getTopWindow : function(win) {
			win = win || window;
			if (this.isInIframe(win)
					&& !this.isInCrossDomainIframe(win, win.top)
					&& this.isWindow(win.top)) {
				// 在iframe中, 非跨域, top是window对象
				return win.top
			}
			return win;
		},

		/**
		 * 绑定事件
		 */
		bind : function(element, type, listener) {
			element = this.g(element);
			type = type.replace(/^on/i, '').toLowerCase();

			// 事件监听器挂载
			if (element.addEventListener) {
				element.addEventListener(type, listener, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, listener);
			}
			return element;
		},
		/**
		 * 移除事件
		 */
		unBind : function(element, type, listener) {
			element = this.g(element);
			type = type.replace(/^on/i, '').toLowerCase();

			// 事件监听器挂载
			if (element.removeEventListener) {
				element.removeEventListener(type, listener, false);
			} else if (element.detachEvent) {
				element.detachEvent('on' + type, listener);
			}
			return element;
		},

		// @delete }

		/**
		 * proxy函数用于修改函数的this指向。
		 */
		proxy : function(fn, context, args) {
			var method = fn;
			var thisObj = context;
			return function() {
				if (args && args.length) {
					return method.apply(thisObj || {}, args);
				} else {
					return method.apply(thisObj || {}, arguments);
				}
			};
		},

		// @delete {
		/**
		 * 获取目标元素的样式值
		 * 
		 * @returns {string} 目标元素的样式值
		 */
		getStyle : function(element, styleName) {
			var result;
			element = this.g(element);
			var doc = this.getDocument(element);
			// ie9下获取到的样式名称为: backgroundColor
			// 其他标准浏览器下样式为: background-color
			// 分别使用这两个名字尝试获取样式信息
			var styleNameOther = "";
			if (styleName.indexOf("-") > -1) {
				styleNameOther = styleName.replace(/[-_][^-_]{1}/g, function(
								match) {
							return match.charAt(1).toUpperCase();
						});
			} else {
				styleNameOther = styleName.replace(/[A-Z]{1}/g,
						function(match) {
							return "-" + match.charAt(0).toLowerCase();
						});
			}

			// 优先使用w3c标准的getComputedStyle方法, 在ie6,7,8下使用currentStyle
			var elementStyle;
			if (doc && doc.defaultView && doc.defaultView.getComputedStyle) {
				elementStyle = doc.defaultView.getComputedStyle(element, null);
				if (elementStyle) {
					result = elementStyle.getPropertyValue(styleName);
				}
				if (typeof result !== "boolean" && !result) {
					result = elementStyle.getPropertyValue(styleNameOther);
				}
			} else if (element.currentStyle) { // ie6,7,8使用currentStyle
				elementStyle = element.currentStyle;
				if (elementStyle) {
					result = elementStyle[styleName];
				}
				if (typeof result !== "boolean" && !result) {
					result = elementStyle[styleNameOther];
				}
			}

			return result;
		},

		/**
		 * 获取元素相对于页面左上角的坐标
		 */
		getPositionCore : function(element) {
			element = this.g(element);
			var doc = this.getDocument(element), browser = this.browser,
			// Gecko 1.9版本以下用getBoxObjectFor计算位置
			// 但是某些情况下是有bug的
			// 对于这些有bug的情况
			// 使用递归查找的方式
			BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 && doc.getBoxObjectFor
					&& this.getStyle(element, 'position') == 'absolute'
					&& (element.style.top === '' || element.style.left === ''), pos = {
				"left" : 0,
				"top" : 0
			}, viewport = (browser.ie && !browser.isStrict)
					? doc.body
					: doc.documentElement, parent, box;

			if (element == viewport) {
				return pos;
			}

			if (element.getBoundingClientRect) { // IE and Gecko 1.9+

				// 当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
				// 考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
				box = element.getBoundingClientRect();

				pos.left = Math.floor(box.left)
						+ Math.max(doc.documentElement.scrollLeft,
								doc.body.scrollLeft);
				pos.top = Math.floor(box.top)
						+ Math.max(doc.documentElement.scrollTop,
								doc.body.scrollTop);

				// IE会给HTML元素添加一个border，默认是medium（2px）
				// 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
				// 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
				// 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
				// clientTop和clientLeft不会更新
				pos.left -= doc.documentElement.clientLeft;
				pos.top -= doc.documentElement.clientTop;

				var htmlDom = doc.body,
				// 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
				htmlBorderLeftWidth = parseInt(this.getStyle(htmlDom,
						'borderLeftWidth')), htmlBorderTopWidth = parseInt(this
						.getStyle(htmlDom, 'borderTopWidth'));
				if (browser.ie && !browser.isStrict) {
					pos.left -= isNaN(htmlBorderLeftWidth)
							? 2
							: htmlBorderLeftWidth;
					pos.top -= isNaN(htmlBorderTopWidth)
							? 2
							: htmlBorderTopWidth;
				}
				/*
				 * 因为firefox 3.6和4.0在特定页面下(场景待补充)都会出现1px偏移,所以暂时移除该逻辑分支 如果
				 * 2.0版本时firefox仍存在问题,该逻辑分支将彻底移除. by rocy 2011-01-20 } else if
				 * (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT){ // gecko
				 * 1.9-
				 *  // 1.9以下的Gecko，会忽略ancestors的scroll值 //
				 * https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and //
				 * https://bugzilla.mozilla.org/show_bug.cgi?id=330619
				 * 
				 * box = doc.getBoxObjectFor(element); var vpBox =
				 * doc.getBoxObjectFor(viewport); pos.left = box.screenX -
				 * vpBox.screenX; pos.top = box.screenY - vpBox.screenY;
				 */
			} else { // safari/opera/firefox
				parent = element;

				do {
					pos.left += parent.offsetLeft;
					pos.top += parent.offsetTop;

					// safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
					if (browser.isWebkit > 0
							&& this.getStyle(parent, 'position') == 'fixed') {
						pos.left += doc.body.scrollLeft;
						pos.top += doc.body.scrollTop;
						break;
					}

					parent = parent.offsetParent;
				} while (parent && parent != element);

				// 对body offsetTop的修正
				if (browser.opera > 0
						|| (browser.isWebkit > 0 && this.getStyle(element,
								'position') == 'absolute')) {
					pos.top -= doc.body.offsetTop;
				}

				// 计算除了body的scroll
				parent = element.offsetParent;
				while (parent && parent != doc.body) {
					pos.left -= parent.scrollLeft;
					// see https://bugs.opera.com/show_bug.cgi?id=249965
					// if (!b.opera || parent.tagName != 'TR') {
					if (!browser.opera || parent.tagName != 'TR') {
						pos.top -= parent.scrollTop;
					}
					parent = parent.offsetParent;
				}
			}

			return pos;
		},

		/**
		 * 如果目标元素在Iframe中，获取目标元素相对于顶层文档(或第一个非跨域的iframe)左上角的位置
		 * 
		 * @name this.getPosition
		 * @function
		 * @grammer this.getPosition(element)
		 * @param {HTMLElement|string}
		 *            element 目标元素或目标元素的id
		 * @meta Cpro
		 * 
		 * @return {Object} 目标元素的位置，包含键值top和left的Object对象
		 */
		getPosition : function(id, win) {
			win = win || window;
			var element = this.g(id, win);
			if (!element)
				return;
			var result = this.getPositionCore(element); // 获取DOM元素在当前window上的位置
			var tempPos; // 从当前DOM的window开始累加top和left偏移量
			var maxCount = 10, count = 0;
			while (win != win.parent && count < maxCount) {
				count++;
				tempPos = {
					top : 0,
					left : 0
				};
				if (!this.isInCrossDomainIframe(win, win.parent)
						&& win.frameElement) {
					tempPos = this.getPositionCore(win.frameElement);
				} else {
					break;
				}
				result.left += tempPos.left;
				result.top += tempPos.top;
				win = win.parent;
			}
			return result;

		},

		/**
		 * 获取元素的宽度，包含padding和border，可选是否包含margin（默认为false不包含）
		 * 
		 * @name this.getOuterWidth
		 * @function
		 * @grammar this.getOuterWidth(element[,includeMargin])
		 * @param {HTMLElement|string}
		 *            element 目标元素或目标元素的id
		 * @param {Boolean}
		 *            includeMargin 是否包含margin，默认为false不包含。
		 * @meta cpro
		 * 
		 * @return {number} 元素宽度值
		 */
		getOuterWidth : function(element, includeMargin) {
			element = this.g(element); // 获取DOM元素
			includeMargin = includeMargin || false;
			var result = element.offsetWidth;
			if (includeMargin) {
				var marginLeft = this.getStyle(element, "marginLeft")
						.toString().toLowerCase().replace("px", "").replace(
								"auto", "0");
				var marginRight = this.getStyle(element, "marginRight")
						.toString().toLowerCase().replace("px", "").replace(
								"auto", "0");
				result = result + parseInt(marginLeft || 0)
						+ parseInt(marginRight || 0);
			}
			return result;
		},

		/**
		 * 获取元素的高度，包含padding和border，可选是否包含margin（默认为false不包含）
		 * 
		 * @name this.getOuterHeight
		 * @function
		 * @grammar this.getOuterHeight(element[,includeMargin])
		 * @param {HTMLElement|string}
		 *            element 目标元素或目标元素的id
		 * @param {Boolean}
		 *            includeMargin 是否包含margin，默认为false不包含。
		 * @meta cpro
		 * 
		 * @return {number} 元素高度值
		 */
		getOuterHeight : function(element, includeMargin) {
			element = this.g(element); // 获取DOM元素
			includeMargin = includeMargin || false;
			var result = element.offsetHeight;
			if (includeMargin) {
				var marginTop = this.getStyle(element, "marginTop").toString()
						.toLowerCase().replace("px", "").replace("auto", "0");
				var marginBottom = this.getStyle(element, "marginBottom")
						.toString().toLowerCase().replace("px", "").replace(
								"auto", "0");
				result = result + parseInt(marginTop || 0)
						+ parseInt(marginBottom || 0);
			}
			return result;
		},

		/**
		 * 如果存在iframe嵌套，则返回DOM对象最外层的Iframe容器对象。如果不包含iframe嵌套或者在跨域的iframe中，则直接返回DOM对象本身。
		 * 
		 * @name this.getTopIframe
		 * @function
		 * @grammar this.getTopIframe("elemID")
		 * @param {string|HTMLElement}
		 *            id 元素的id或DOM元素
		 * @meta cpro
		 * 
		 * @return {Boolean}
		 *         如果存在iframe嵌套，则返回DOM对象最外层的Iframe容器对象。如果不包含iframe嵌套或者在跨域的iframe中，则直接返回DOM对象本身。
		 */
		getTopIframe : function(id) {
			var result = this.g(id);
			var currWin = this.getWindow(result);
			var count = 0;
			if (this.isInIframe(window) && !this.isInCrossDomainIframe(window)) {
				while (currWin.parent != window.top && count < 10) {
					count++;
					currWin = currWin.parent;
				}
				if (count < 10) {
					result = currWin.frameElement || result;
				}
			}
			return result;
		},

		/**
		 * 获取元素在其所属window中的透明度，不会计算iframe嵌套的透明度。
		 * div嵌套时，IE中filter透明度不会累加（如两个50%透明度嵌套，结果还是50）。FF等其浏览器会累加（如两个50%透明度嵌套，结果是25）
		 * 
		 * @name this.getOpacityInWin
		 * @function
		 * @grammar this.getOpacityInWin("elemID")
		 * @param {string|HTMLElement}
		 *            id 元素的id或DOM元素
		 * @meta cpro
		 * 
		 * @return {number} 0-100的透明度值。
		 */
		getOpacityInWin : function(id) {
			var domElement = this.g(id);
			var win = this.getWindow(domElement);
			var result = 100;

			var node = domElement;
			var nodeOpacity;
			try {
				while (node && node.tagName) {
					nodeOpacity = 100;
					if (this.browser.ie) {
						if (this.browser.ie > 5) {
							try {
								nodeOpacity = node.filters.alpha.opacity || 100;
							} catch (e) {
							}
						}
						result = result > nodeOpacity ? nodeOpacity : result;
					} else {
						try {
							nodeOpacity = (win.getComputedStyle(node, null).opacity || 1)
									* 100;
						} catch (e) {
						}
						result = result * (nodeOpacity / 100);
					}

					node = node.parentNode;
				}
			} catch (ex) {
			}

			return result || 100;
		},

		/**
		 * 获取元素的透明度，如果元素嵌套在非跨域Iframe中，并尝试计算iframe的透明度并累加。
		 * 
		 * @name this.getOpacity
		 * @function
		 * @grammar this.getOpacity("elemID")
		 * @param {string|HTMLElement}
		 *            id 元素的id或DOM元素
		 * @meta cpro
		 * 
		 * @return {number} 0-100的透明度值。
		 */
		getOpacity : function(id) {
			var domElement = this.g(id);
			var win = this.getWindow(domElement);
			var result = this.getOpacityInWin(domElement);
			var tempOpacity = 100;
			var count = 0, maxCount = 10;
			while (this.isInIframe(win)) {
				count++;
				if (!this.isInCrossDomainIframe(win, win.parent)) {
					tempOpacity = 100;
					if (win.frameElement) {
						tempOpacity = this.getOpacityInWin(win.frameElement);
					}
					result = result * (tempOpacity / 100);
				} else {
					break;
				}
				win = win.parent;
			}
			return result;
		},

		/**
		 * 对Date的扩展，将 Date 转化为指定格式的String
		 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 年(y)可以用
		 * 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
		 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二
		 * 20:09:04 (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==>
		 * 2009-03-10 周二 08:09:04 (new Date()).pattern("yyyy-MM-dd EEE
		 * hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new Date()).pattern("yyyy-M-d
		 * h:m:s.S") ==> 2006-7-2 8:9:4.18
		 */
		dateToString : function(dateObj, formatString) {
			var o = {
				"M+" : dateObj.getMonth() + 1, // 月份
				"d+" : dateObj.getDate(), // 日
				"h+" : dateObj.getHours() % 12 == 0 ? 12 : dateObj.getHours()
						% 12, // 小时
				"H+" : dateObj.getHours(), // 小时
				"m+" : dateObj.getMinutes(), // 分
				"s+" : dateObj.getSeconds(), // 秒
				"q+" : Math.floor((dateObj.getMonth() + 3) / 3), // 季度
				"S" : dateObj.getMilliseconds()
				// 毫秒
			};
			var week = {
				"0" : "\u65e5",
				"1" : "\u4e00",
				"2" : "\u4e8c",
				"3" : "\u4e09",
				"4" : "\u56db",
				"5" : "\u4e94",
				"6" : "\u516d"
			};
			if (/(y+)/.test(formatString)) {
				formatString = formatString.replace(RegExp.$1, (dateObj
								.getFullYear() + "").substr(4
								- RegExp.$1.length));
			}
			if (/(E+)/.test(formatString)) {
				formatString = formatString.replace(RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2
								? "\u661f\u671f"
								: "\u5468") : "")
								+ week[dateObj.getDay() + ""]);
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(formatString)) {
					formatString = formatString.replace(RegExp.$1,
							(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
									.substr(("" + o[k]).length)));
				}
			}
			return formatString;
		},

		/**
		 * 将对象{a:1, b:2}序列化成“a=1&b=2”形式的字符串
		 */
		param : function(obj, mapper) {
			var result = new Array(), tempKey, tempValue, tempIsAdd;
			for (var key in obj) {
				tempIsAdd = true;
				if (mapper) {
					tempKey = mapper[key] ? mapper[key] : key;
					tempIsAdd = mapper[key] ? true : false;
				}
				if (!tempIsAdd) {
					continue;
				}

				var tempValue = obj[key];
				switch (typeof tempValue) {
					case "string" :
					case "number" :
						result.push(tempKey + "=" + tempValue.toString());
						break;
					case "boolean" :
						result.push(tempKey + "=" + (tempValue ? "1" : "0"));
						break;
					case "object" :
						if (tempValue instanceof Date) {
							result.push(tempKey
									+ "="
									+ this.dateToString(tempValue,
											"yyyyMMddhhmmssS"));
						}
						break;
					default :
						break;
				}
			}
			return result.join("&");
		},

		/**
		 * 获取数组的长度或者对象的属性个数
		 * 
		 * @name this.getLength
		 * @function
		 * @grammar this.getLength(obj)
		 * @param {Object|Array}
		 *            id 元素的id或DOM元素
		 * @meta cpro
		 * 
		 * @return {number} 数组的长度或者对象的属性个数
		 */
		getLength : function(obj) {
			var result = 0;
			if (typeof obj === "object") {
				if (obj instanceof Array) {
					result = obj.length;
				} else {
					var i;
					for (i in obj) {
						if (i)
							result++;
					}
				}
			}
			return result;
		},

		/**
		 * 计算MD5值
		 * 
		 * @name this.md5
		 * @function
		 * @grammer var md5Value = this.md5("aabbccc");
		 * @param {String}
		 *            要生成MD5签名的字符串
		 * @meta cpro
		 * 
		 * @return {String} MD5签名值
		 */
		md5 : function(string) {

			function RotateLeft(lValue, iShiftBits) {
				return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
			}

			function AddUnsigned(lX, lY) {
				var lX4, lY4, lX8, lY8, lResult;
				lX8 = (lX & 0x80000000);
				lY8 = (lY & 0x80000000);
				lX4 = (lX & 0x40000000);
				lY4 = (lY & 0x40000000);
				lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
				if (lX4 & lY4) {
					return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
				}
				if (lX4 | lY4) {
					if (lResult & 0x40000000) {
						return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					} else {
						return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
					}
				} else {
					return (lResult ^ lX8 ^ lY8);
				}
			}

			function F(x, y, z) {
				return (x & y) | ((~x) & z);
			}
			function G(x, y, z) {
				return (x & z) | (y & (~z));
			}
			function H(x, y, z) {
				return (x ^ y ^ z);
			}
			function I(x, y, z) {
				return (y ^ (x | (~z)));
			}

			function FF(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function GG(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function HH(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function II(a, b, c, d, x, s, ac) {
				a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
				return AddUnsigned(RotateLeft(a, s), b);
			};

			function ConvertToWordArray(string) {
				var lWordCount;
				var lMessageLength = string.length;
				var lNumberOfWords_temp1 = lMessageLength + 8;
				var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64))
						/ 64;
				var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
				var lWordArray = Array(lNumberOfWords - 1);
				var lBytePosition = 0;
				var lByteCount = 0;
				while (lByteCount < lMessageLength) {
					lWordCount = (lByteCount - (lByteCount % 4)) / 4;
					lBytePosition = (lByteCount % 4) * 8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string
							.charCodeAt(lByteCount) << lBytePosition));
					lByteCount++;
				}
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = lWordArray[lWordCount]
						| (0x80 << lBytePosition);
				lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
				lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
				return lWordArray;
			};

			function WordToHex(lValue) {
				var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
				for (lCount = 0; lCount <= 3; lCount++) {
					lByte = (lValue >>> (lCount * 8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue
							+ WordToHexValue_temp.substr(
									WordToHexValue_temp.length - 2, 2);
				}
				return WordToHexValue;
			};

			function Utf8Encode(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = "";

				for (var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}

				return utftext;
			};

			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
			var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
			var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
			var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

			string = Utf8Encode(string);

			x = ConvertToWordArray(string);

			a = 0x67452301;
			b = 0xEFCDAB89;
			c = 0x98BADCFE;
			d = 0x10325476;

			for (k = 0; k < x.length; k += 16) {
				AA = a;
				BB = b;
				CC = c;
				DD = d;
				a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
				b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
				b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
				a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
				d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
				c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
				c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
				a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
				d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
				c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
				a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
				a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
				b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
				d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
				a = AddUnsigned(a, AA);
				b = AddUnsigned(b, BB);
				c = AddUnsigned(c, CC);
				d = AddUnsigned(d, DD);
			}

			var fixedLength = function(source) {
				var result = source;
				for (var i = 0, count = 8 - source.length; i < count; i++) {
					result = "0" + result;
				}
				return result;
			}

			var hightBit = ((parseInt("0x" + WordToHex(a), 16) + parseInt("0x"
							+ WordToHex(b), 16)) % 4294967296).toString(16);
			var lowBit = ((parseInt("0x" + WordToHex(c), 16) + parseInt("0x"
							+ WordToHex(d), 16)) % 4294967296).toString(16);

			if (hightBit.length < 8) {
				hightBit = fixedLength(hightBit);
			}
			if (lowBit.length < 8) {
				lowBit = fixedLength(lowBit);
			}

			return hightBit + lowBit;
		},

		/**
		 * 获取窗口的宽度(含滚动条)
		 * 
		 * @name this.getScrollWidth
		 * @function
		 * @grammer var width = this.getScrollWidth(window);
		 * @param {window}
		 *            window对象. 不传递则默认为当前窗口的window对象
		 * @meta cpro
		 * 
		 * @return {number} 页面的总宽度
		 */
		getScrollWidth : function(win) {
			try {
				win = win || window;
				if (win.document.compatMode === "BackCompat") {
					return win.document.body.scrollWidth;
				} else {
					return win.document.documentElement.scrollWidth;
				}
			} catch (e) {
				return 0;
			}
		},

		/**
		 * 获取窗口的高度(含滚动条)
		 * 
		 * @name this.getScrollWidth
		 * @function
		 * @grammer var width = this.getScrollWidth(window);
		 * @param {window}
		 *            window对象. 不传递则默认为当前窗口的window对象
		 * @meta cpro
		 * 
		 * @return {number} 页面的总高度
		 */
		getScrollHeight : function(win) {
			try {
				win = win || window;
				if (win.document.compatMode === "BackCompat") {
					return win.document.body.scrollHeight;
				} else {
					return win.document.documentElement.scrollHeight;
				}
			} catch (e) {
				return 0;
			}
		},

		// @delete }

		/**
		 * 获得浏览器可视区域宽
		 */
		getClientWidth : function(win) {
			try {
				win = win || window;
				if (win.document.compatMode === "BackCompat")
					return win.document.body.clientWidth;
				else
					return win.document.documentElement.clientWidth;
			} catch (e) {
				return 0;
			}
		},

		/**
		 * 获得浏览器可视区域高
		 */
		getClientHeight : function(win) {
			try {
				win = win || window;
				if (win.document.compatMode === "BackCompat")
					return win.document.body.clientHeight;
				else
					return win.document.documentElement.clientHeight;
			} catch (e) {
				return 0;
			}
		},

		// @delete {

		/**
		 * 获取纵向滚动量
		 */
		getScrollTop : function(win) {
			win = win || window;
			var d = win.document;
			return window.pageYOffset || d.documentElement.scrollTop
					|| d.body.scrollTop;
		},

		/**
		 * 获取横向滚动量
		 */
		getScrollLeft : function(win) {
			win = win || window;
			var d = win.document;
			return window.pageXOffset || d.documentElement.scrollLeft
					|| d.body.scrollLeft;
		},

		// @delete }
		/**
		 * 将url中的使用escape编码(%u[\d|\w]{4})格式的参数转换为encodeURIComponent格式 eg:
		 * "a=%u4E2D%u56FD"转换后为:"a=%E4%B8%AD%E5%9B%BD"
		 * 
		 * @name this.escapeToEncode
		 * @function
		 * @grammer var url =
		 *          this.escapeToEncode("http://www.baidu.com/?a=%u1234");
		 * @param {string}
		 *            url
		 * @meta cpro
		 * 
		 * @return {string} 参数被转换编码后的url
		 */
		escapeToEncode : function(url) {
			var result = url || "";
			if (result) {
				result = result.replace(/%u[\d|\w]{4}/g, function(word) {
							return encodeURIComponent(unescape(word))
						});
			}
			return result
		},

		// @delete {
		/**
		 * 使用数据格式化字符串模版
		 * 
		 * @example
		 * var template = "<div>{name}-{age}</div>";
		 *    var data = {name:zhangziqiu, age:18};
		 *    var result = this.template(template, data); //output:<div>zhangziqiu-18</div>
		 * @function
		 * @meta cpro
		 * @return {string} 格式化后的字符串
		 */
		template : function(source, data) {
			var regexp = /{(.*?)}/g;
			return source.replace(regexp, function(match, subMatch, index, s) {
						return data[subMatch] || "";
					});
		},

		/**
		 * 将源对象的所有属性拷贝到目标对象中
		 * 
		 * @author erik
		 * @name baidu.object.extend
		 * @function
		 * @grammar baidu.object.extend(target, source)
		 * @param {Object}
		 *            target 目标对象
		 * @param {Object}
		 *            source 源对象
		 * @see baidu.array.merge
		 * @remark
		 * 
		 * 1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
		 * 2.源对象的prototype成员不会拷贝。
		 * 
		 * @shortcut extend
		 * @meta standard
		 * 
		 * @returns {Object} 目标对象
		 */
		extend : function(target, source) {
			for (var p in source) {
				if (source.hasOwnProperty(p)) {
					target[p] = source[p];
				}
			}
			return target;
		},

		/**
		 * 日志记录函数
		 */
		log : function(message, isAdd) {
			isAdd = typeof isAdd === "undefined" ? true : false;
			if (!this.logMsg) {
				this.logMsg = document.getElementById("baiduCproLogMsg");
				if (!this.logMsg)
					return;
			}

			var msgBuilder = new Array();
			if (typeof(message) === "object") {
				for (var key in message) {
					if (key !== "analysisUrl") {
						msgBuilder.push(key + ":" + message[key]);
					}
				}
			} else {
				msgBuilder.push("" + message);
			}

			this.logMsg.innerHTML = isAdd ? this.logMsg.innerHTML : "";
			this.logMsg.innerHTML += msgBuilder.join("<br/>") + "<br/>";
		},

		/**
		 * 获取Cookie
		 */
		getCookieRaw : function(key, win) {
			var result;
			var win = win || window;
			var doc = win.document;
			var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)");
			var regResult = reg.exec(doc.cookie);
			if (regResult) {
				result = regResult[2];
			}
			return result;
		},

		setCookieRaw : function(key, value, options) {
			options = options || {};

			// 计算cookie过期时间
			var expires = options.expires;
			if ('number' == typeof options.expires) {
				expires = new Date();
				expires.setTime(expires.getTime() + options.expires);
			}

			document.cookie = key + "=" + value
					+ (options.path ? "; path=" + options.path : "")
					+ (expires ? "; expires=" + expires.toGMTString() : "")
					+ (options.domain ? "; domain=" + options.domain : "")
					+ (options.secure ? "; secure" : '');
		},
		
		removeCookie : function(key) {
		  var t = new Date();
		  t.setTime(t.getTime() - 86400);
		  this.setCookieRaw(key,'',{
		    path: '/',
		    expires: t
		  });
		},

		/**
		 * 将json字符串解析成json对象
		 */
		jsonToObj : function(jsonString) {
			return (new Function("return " + jsonString))();
		},

		/**
		 * 获取url上指定参数的值
		 */
		getUrlQueryValue : function(url, key) {
			if (url && key) {
				var reg = new RegExp("(^|&|\\?|#)" + key + "=([^&]*)(&|\x24)",
						"");
				var match = url.match(reg);
				if (match) {
					return match[2];
				}
			}
			return null;
		},
		parseUrlQuery : function(url,startChar) {
		  url = url || '';
		  startChar = startChar || '?';//it can also be '#'
		  var me = arguments.callee;
		  if(!me.hasOwnProperty[startChar]){
		    me[startChar] = {};  
		  }
		  var map = me[startChar];
		  if(map.hasOwnProperty(url)){
		    return map[url];  
		  }
		  var ret = {},
	      idx = url.indexOf(startChar),
	      urlPart = url.substring(idx + 1),
	      pairs = urlPart.split('&');
		  if(idx !== -1){
		    for(var i=0,len=pairs.length;i<len;i++){
		      var pair = pairs[i].split('='),
		        key = decodeURIComponent(pair[0]),
		        value = decodeURIComponent(pair[1]);
		      ret[key] = value;
		    }
		  }
		  map[url] = ret;
		  return ret;
		},

		/**
		 * Dom Ready Event
		 */
		ready : function(callback, delay, win) {
			win = win || this.win || window;
			var doc = win.document;
			delay = delay || 0;
			this.domReadyMonitorRunTimes = 0;

			// 将时间函数放入数组, 在DomReady时一起执行.
			this.readyFuncArray = this.readyFuncArray || [];
			this.readyFuncArray.push({
						func : callback,
						delay : delay,
						done : false
					});

			// domReadyMonitor为监控进程的事件处理函数
			var domReadyMonitor = this.proxy(function() {
				var isReady = false;
				this.domReadyMonitorRunTimes++;

				// 对于非iframe嵌套的ie6,7,8浏览器, 使用doScroll判断Dom Ready.
                var isInIframe = false;
                try{
                    if(win.frameElement){
                        isInIframe = true;
                    }
                }
                catch(e){
                    isInIframe = true;
                }
				if (this.browser.ie && this.browser.ie < 9 && !isInIframe) {
					try {
						doc.documentElement.doScroll("left");
						isReady = true;
					} catch (e) {
					}
				}
				// 非ie浏览器
				// 如果window.onload和DOMContentLoaded事件都绑定失败,
				// 则使用定时器函数判断readyState.
				else if (doc.readyState === "complete" || this.domContentLoaded) {
					isReady = true;
				}
				// 对于某些特殊页面, 如果readyState永远不能为complete, 设置了一个最大运行时间5分钟.
				// 超过了最大运行时间则销毁定时器.
				// 定时器销毁不影响window.onload和DOMContentLoaded事件的触发.
				else {
					if (this.domReadyMonitorRunTimes > 300000) {
						if (this.domReadyMonitorId) {
							win.clearInterval(this.domReadyMonitorId);
							this.domReadyMonitorId = null;
						}
						return;
					}
				}

				// 执行ready集合中的所有函数
				if (isReady) {
					try {
						if (this.readyFuncArray && this.readyFuncArray.length) {
							for (var i = 0, count = this.readyFuncArray.length; i < count; i++) {
								var item = this.readyFuncArray[i];
								if (!item || !item.func || item.done) {
									continue;
								}
								if (!item.delay) {
									item.done = true;
									item.func();
								} else {
									item.done = true;
									win.setTimeout(item.func, item.delay);
								}
							}
						}
					} catch (ex) {
						throw ex;
					} finally {
						if (this.domReadyMonitorId) {
							win.clearInterval(this.domReadyMonitorId);
							this.domReadyMonitorId = null;
						}
					}
				}
			}, this);

			/**
			 * domContentLoadedHandler直接执行所有ready函数.
			 * 没使用传参的形式是因为ff中的定时器函数会传递一个时间参数.
			 */
			var domContentLoadedHandler = this.proxy(function() {
						this.domContentLoaded = true;
						domReadyMonitor();
					}, this);

			// 启动DomReady监控进程
			if (!this.domReadyMonitorId) {
				this.domReadyMonitorId = win.setInterval(domReadyMonitor, 50);
				// Mozilla, Opera and webkit nightlies currently support this
				// event
				if (doc.addEventListener) {
					// Use the handy event callback
					doc.addEventListener("DOMContentLoaded",
							domContentLoadedHandler, false);
					// A fallback to window.onload, that will always work
					win
							.addEventListener("load", domContentLoadedHandler,
									false);
				} else if (doc.attachEvent) {
					// A fallback to window.onload, that will always work
					win.attachEvent("onload", domContentLoadedHandler, false);
				}
			}
		},

		/**
		 * 当前浏览器是否支持fixed
		 */
		canFixed : function() {
			var result = true;
			// ie6即以下版本不支持fixed
			// ie7即以上版本在Qurik模式中不支持fixed
			if (this.browser.ie
					&& (this.browser.ie < 7 || document.compatMode === "BackCompat")) {
				result = false;
			}
			return result;
		},
		/**
		 * 获取请求地址后面的查询参数
		 * 
		 * @name this.getJsPara
		 * @function
		 * @grammar this.getJsPara(src)
		 * @param {String}
		 *            要解析的请求地址
		 * @meta cpro
		 * 
		 * @returns {Object} 返回包含查询参数的对象
		 */
		getPara : function(src) {
			var obj = {};
			if (src && typeof src == 'string' && src.indexOf("?") > -1) {
				var paras = src.split("?")[1].split("&");
				for (var i = 0, len = paras.length; i < len; i++) {
					var tempPara = paras[i].split("=");
					var name = tempPara[0];
					var value = tempPara[1];
					obj[name] = value;
				}
			}
			return obj;
		},

		// @delete }
		noop : function() {
		}
	};

	// 注册命名空间
	G.registerNamespace(UtilityNamespace);

})(window[___baseNamespaceName]);
///@import BaiduCproNamespace
///@import BaiduCproNamespace.Utility

(function (G) {
    // 声明命名空间, 业务逻辑命名空间用于保存与业务相关的逻辑.
    var BusinessLogicNamespace = {
        fullName: "$baseName.BusinessLogic",
        version: "1.0.0",
        register: function () {
            this.G = G.using("$baseName", this.win);
            this.U = G.using("$baseName.Utility", this.win);
        },

        /**
         * 静态变量
         */
        randomArray: [], // 随机数数组, 用于生成前端的唯一检索id(ui中的jk参数)时使用
        clientTree: {}, // 用于记录模版名称和channel值
        displayCounter: 1, // 广告块计数器, 页面每显示一个广告则计数器加1, 生成广告块iframe的id时使用
        displayTypeCounter: {}, // 按照展现类型分类的计数器
        adsArray: [], // 生成的广告块集合.每个广告块对象为: {domId:"cproIframe1",
        // js:"c", displayType:"inlay",
        // analysisUrl:"http://eclick.baidu.com...",
        // uiParamSnap:uiParamSnap,
        // clientParam:clientParam,
        // viewContext:viewContext, win:window}
        adsWrapStore: {}, // 标记已经渲染过的广告容器，防止重复
        winFocused: true, // 当前页面是否获取到了焦点
        cproServiceUrl: "http://cpro.baidu.com/cpro/ui/uijs.php", // cpro广告检索服务的api地址
        iframeIdPrefix: "cproIframe", // 广告块iframe的前缀.
        isAsyn: false, // 表示广告是否异步加载，true为异步
        currentWindowOnUnloadHandler: null, //脚本所在window卸载处理函数指针

        // @delete {
        /*
         * <summary>从广告管家获取广告位数据</summary> <param name="slotId"
         * type="string">广告位id</param> <param name="callbackName"
         * type="string">回调函数名称</param> union广告位数据形式为: { "u207621" : { "_html" :
         * "cpro_client=sequel_cpr|cpro_template=text_default_760_90|cpro_h=90|cpro_w=760|cpro_at=text|cpro_161=4|cpro_flush=4|cpro_cflush=#e10900|cpro_curl=#008000|cpro_cdesc=#5f5f5f|cpro_ctitle=#0f0cbf|cpro_cbg=#FFFFFF|cpro_cbd=#dfdfdf|cpro_uap=0|cpro_cad=1" } }
         */
        getSlotDataFromUnion: function (slotId, callbackName, isAsync) {
            var url = "http://pos.baidu.com/ecom?";
            if (!slotId || !callbackName || !window[callbackName]) {
                return null;
            }
            //是否是多广告块请求
            var isMulti = slotId instanceof Array ? true : false;
            //本次有几个广告块发送请求
            var slotCount = isMulti ? slotId.length : 1;

            var params = this.G.create(this.G.BusinessLogic.Param, {
                currentWindow: window,
                timeStamp: (new Date()).getTime()
            });

            //获取前端did, 对应adx的dai参数. 广告块计数器.
            var slotDid = "";
            if (isMulti) {
                slotDid = [];
                var len = slotId.length;
                while (len--) {
                    slotDid.push(params.get("did"));
                    //params.set("did")
                }
                slotDid = slotDid.join(",");
            }
            else {
                slotDid = params.get("did");
                //params.set("did")
            }

            //处理跨域
            var isCrossDomain = this.U.isInCrossDomainIframe(window);
            var topWin = this.U.isWindow(top) ? top : window;
            var win = isCrossDomain ? window : topWin;

            //处理广告坐标
            var positionString = "";
            try {
                var scripts = document.getElementsByTagName("script");
                var currentScript = scripts[scripts.length - 1];
                if (isAsync) {
                    //处理异步广告块
                    for (var i = 0; i < slotCount; i++) {
                        var tempSlotId = isMulti ? slotId[i] : slotId.toString();
                        var cproAdWrapId = 'cpro_' + tempSlotId;
                        var cproAdWrap = this.U.g(cproAdWrapId, window);
                        if (cproAdWrap) {
                            var position = this.U.getPosition(currentScript, window);
                            if (i > 0) {
                                positionString += ","
                            }
                            positionString += position.top + "x" + position.left;
                        }
                    }
                }
                else {
                    //处理同步广告块
                    var tempId = "cproTemp" + parseInt(Math.random() * 10000).toString();
                    document.write('<div style="width:0px; height:0px;" id="' + tempId + '">-</div>');
                    var tempDom = this.U.g(tempId, window);
                    var position = null;

                    if (tempDom) {
                        position = this.U.getPosition(tempDom, window);
                        tempDom.parentNode.removeChild(tempDom);
                        tempDom = null;
                    }

                    if (!position) {
                        position.top = "-1";
                        position.left = "-1";
                    }

                    positionString = position.top + "x" + position.left;
                    if (isMulti) {
                        for (var i = 1; i < slotCount; i++) {
                            positionString += "," + position.top + "x" + position.left;
                        }
                    }
                }
                if (!positionString) {
                    //没有获取到位置坐标
                    positionString = "-1x-1";
                }
            }
            catch (ex) {
                positionString = "-1x-1";
            }

            //获取coa参数: 用户开放样式API的参数, 只支持非批量投放
            var styleApiParamString = "";
            try{
                if(!isMulti){            
                    var mapping = this.Param.getSlot2UIMapping(params); 
                    styleApiParamString = this.getStyleApi(slotId.toString(), params, null, mapping, true ); 
                    styleApiParamString = styleApiParamString.slice(1);
                }
            }
            catch(ex){
               styleApiParamString = ""; 
            }

            var paramsBox = [
                ["di", isMulti ? slotId.join(",") : slotId.toString()],
                ["dcb", callbackName],
                ["dtm", "BAIDU_CPRO_SETJSONADSLOT"],
                ["dai", slotDid],
                ["jn", params.get("jn")],
                ["ltu", encodeURIComponent(params.get("word").slice(0,400))],
                ["liu", encodeURIComponent(window.location.href.toString().slice(0,400))],
                ["ltr", encodeURIComponent(params.get("refer").slice(0,400))],
                ["ps", positionString],
                ["psr", params.get("csp").toString().replace(",", "x")],
                ["par", params.get("csn").toString().replace(",", "x")],
                ["pcs", this.U.getClientWidth(win) + "x" + this.U.getClientHeight(win)],
                ["pss", this.U.getScrollWidth(win) + "x" + this.U.getScrollHeight(win)],
                ["pis", this.U.getClientWidth(window) + "x" + this.U.getClientHeight(window)],
                ["cfv", params.get("fv")],
                ["ccd", params.get("ccd")],
                ["col", params.get("csl")],
                ["coa", encodeURIComponent(styleApiParamString)],
                ["cec", ((document.characterSet ? document.characterSet : document.charset) || "")],
                ["tpr", params.get("prt")],
                ["kl", params.get("k")],
                ["dis", params.get("if")]
            ];

            //品牌广告预览的处理
            try{
                var preview = getPreviewInfo(this);
                var id = slotId;
                var mid;
                var sid;
                if (preview && id == preview.sid) {
                    url = url + "mid=" + preview.mid + "&sid=" + preview.vc + "&";
                }
            }
            catch(ex){
            }

            
            //拼接url
            var paramsBoxLen = paramsBox.length;
            while (paramsBoxLen--) {
                var tempParam = paramsBox.shift();
                url += tempParam[0] + "=" + tempParam[1] + "&"
            }
            url = url.replace(/&$/, "");
            
            
            if (/u\d+/.test(slotId)) {
                if (isAsync) {
                    var tempUnionScript = document.createElement("script");
                    tempUnionScript.setAttribute("type", "text/javascript");
                    tempUnionScript.setAttribute("src", url);
                    document.getElementsByTagName("head")[0].appendChild(tempUnionScript)
                }
                else {

                    document.write('<script type="text/javascript" charset="utf-8" src="' + url + '"><\/script>')
                }
            }
            else {
                window[callbackName](null, {
                    _html: slotId
                })
            }


            //获得URL中用于品牌预览的参数
            function getPreviewInfo(_this) {
                if (_this.U.isInCrossDomainIframe()) {
                    var paramString = window.location.search.slice(1)
                }
                else {
                    var paramString = top.location.search.slice(1)
                }
                var sid = _this.U.getUrlQueryValue(paramString, 'baidu_clb_preview_sid');
                var mid = _this.U.getUrlQueryValue(paramString, 'baidu_clb_preview_mid');
                var vc = _this.U.getUrlQueryValue(paramString, 'baidu_clb_preview_vc');
                var timestamp = +_this.U.getUrlQueryValue(paramString, 'baidu_clb_preview_ts');
                var now = +new Date;
                if (now - timestamp <= 30 * 1000) {
                    return {
                        sid: sid,
                        mid: mid,
                        vc: vc
                    };
                }
                else {
                    return null;
                }
            }
        },

        /*
         * <summary>从广告管家托管位获取广告数据</summary>
         */
        getSlotDataFromCB: function (slotId, adObj) {
            var result = null;
            slotId = slotId || window["tempClbCproAdSlotId"];
            adObj = adObj || window["tempClbCproAdObj"];
            if (slotId && adObj) {
                result = {};
                result[slotId] = {
                    "_html": adObj._html
                };
            }
            return result;
        },

        /*
         * <summary>清除广告管家托管位在全局变量上放置的广告位数据</summary>
         */
        clearSlotDataFromCB: function () {
            window["tempClbCproAdSlotId"] = null;
            window["tempClbCproAdObj"] = null;
        },

        /*
         * <summary>从广告管家返回的结果中提取广告位数据</summary> 数据格式: { "u207621" : { "_html" :
         * "cpro_client=sequel_cpr|cpro_template=text_default_760_90|cpro_h=90|cpro_w=760|cpro_at=text|cpro_161=4|cpro_flush=4|cpro_cflush=#e10900|cpro_curl=#008000|cpro_cdesc=#5f5f5f|cpro_ctitle=#0f0cbf|cpro_cbg=#FFFFFF|cpro_cbd=#dfdfdf|cpro_uap=0|cpro_cad=1" } }
         */
        parseSlotDataFromUnion: function (unionSlotData) {
            var result = {};
            // 获取广告位
            var slotId = "";
            for (var tempKey in unionSlotData) {
                if (tempKey && unionSlotData.hasOwnProperty(tempKey)) {
                    slotId = tempKey;
                    break;
                }
            }
            result["slotId"] = slotId;
            // 获取其他数据
            if( unionSlotData[slotId] &&  unionSlotData[slotId]._html){
                var keyValueStringArray = unionSlotData[slotId]._html.split("|");
                var keyValueString, keyValueArray;
                for (var i = 0, count = keyValueStringArray.length; i < count; i++) {
                    keyValueString = keyValueStringArray[i];
                    if (keyValueString) {
                        keyValueArray = keyValueString.split("=");
                        result[keyValueArray[0]] = keyValueArray[1];
                    }
                }
            }
            else if(unionSlotData[slotId]){
                if( unionSlotData[slotId].sw ){
                    result["cpro_w"] = unionSlotData[slotId].sw;
                }
                if( unionSlotData[slotId].sh ){
                    result["cpro_h"] = unionSlotData[slotId].sh;
                }
                result["cpro_at"] = "all";
            }
            return result;
        },

        /*
         * <summary>用户开放API,允许用户自己在页面上定义部分广告位参数</summary>
         */
        getSlotDataFromUserOpenApi: function () {
            var result = null;
            if (window["cproApi"] && typeof window["cproApi"] === "object" && (this.U.getLength(window["cproApi"]) > 0)) {
                var apiSlotData = window["cproApi"]
                result = {};
                window["cproApi"] = null;

                for (var key in apiSlotData) {
                    if (key && apiSlotData[key]) {
                        result["cpro_" + key] = apiSlotData[key];
                    }
                }
            }
            return result;
        },

        /*
         * <summary>获取用户设置的开放样式参数</summary>
         */
        getStyleApi: function (slotId, uiParam, slotParams, mapping, isDup) {
            var styleKeyRecorder = {};
            
            //首先获取从pos返回的广告位数据中, 设置的样式参数
            var uiParamName, slotParamName;
            for (slotParamName in slotParams) {
                if (slotParamName && slotParams[slotParamName] && slotParams.hasOwnProperty(slotParamName)) {
                    if (!mapping[slotParamName] && typeof styleKeyRecorder[slotParamName] === "undefined") {
                        styleKeyRecorder[slotParamName.replace("cpro_", "")] = encodeURIComponent(slotParams[slotParamName]);
                        //##注意##
                        //中文参数需要编码两次后UI才能正常解析
                        //例如，用户设置的字体
                        if (slotParamName === "cpro_titFF") {
                            styleKeyRecorder[slotParamName.replace("cpro_", "")] = encodeURIComponent(styleKeyRecorder[slotParamName.replace("cpro_", "")]);
                        }
                    }
                }
            }

            if (window["cproStyleApi"] && slotId && window["cproStyleApi"][slotId]) {
                for (var key in window["cproStyleApi"][slotId]) {
                    if (key && typeof window["cproStyleApi"][slotId][key] !== "undefined") {
                        var tempValue = window["cproStyleApi"][slotId][key];
                        if (uiParam[key]) {
                            //dup中, 广告位设置参数同样需要通过开放样式api传递. 使用参数名coa
                            if(isDup){
                                styleKeyRecorder[key] = encodeURIComponent(tempValue).toString();
                            }
                            else{                            
                                //ui参数
                                uiParam.set(key, tempValue)
                            }
                        }
                        else {
                            //用户特殊设置的配置优先级更高, 会覆盖pos上的设置.
                            styleKeyRecorder[key] = encodeURIComponent(tempValue).toString();
                        }
                        tempValue = null;
                    }
                }
            }

            //对于主题连接, hn和wn的特殊处理
            if (uiParam.get("tn") === "baiduTlinkInlay" && uiParam.displayType === "inlay") {
                var columnCount = 3;
                var rowCount = 3;

                var font_size = parseInt(styleKeyRecorder["titFS"]) || 12;
                var border_size = parseInt(styleKeyRecorder["conBW"]) || 0;
                var width = parseInt(uiParam.get("rsi0")) - 2 * border_size;
                var height = parseInt(uiParam.get("rsi1")) - 2 * border_size;
                var maxKeyworkLength = 7;
                var keyword_width = maxKeyworkLength * font_size;
                var keyword_height = font_size + 6;
                var keyword_padding = 7;
                var basic_width = keyword_width + 2 * keyword_padding;
                var basic_height = keyword_height;
                var columnMax = Math.floor(width / basic_width);
                var rowMax = Math.floor(height / basic_height);
                var adn = parseInt(uiParam.get("adn")) || 6;
                if (adn > columnMax * rowMax) {
                    columnCount = columnMax;
                    rowCount = rowMax;
                }
                else {
                    if (adn < columnMax) {
                        //单行
                        columnCount = adn;
                        rowCount = 1;
                    }
                    else {
                        //多行
                        columnCount = columnMax;
                        rowCount = Math.ceil(adn / columnMax)
                    }
                }

                styleKeyRecorder["hn"] = rowCount || 3;
                styleKeyRecorder["wn"] = columnCount || 3;
            }

            //生成url
            var result = "";
            for (var tempKey in styleKeyRecorder) {
                if (tempKey && typeof styleKeyRecorder[tempKey] !== "undefined" && styleKeyRecorder.hasOwnProperty(tempKey)) {
                    result += "&" + tempKey + "=" + styleKeyRecorder[tempKey];
                }
            }

            return result.slice(0, 1000);
        },

        /**
         * 是否是预览
         */
        isPreview: function isPreview(w, h, displayType, cpro_at, url) {
            var result = false;
            var paramString;
            if (url) {
                paramString = url.substring(url.indexOf("?"))
            }
            else if (this.U.isInCrossDomainIframe()) {
                paramString = window.location.search.slice(1);
            }
            else {
                paramString = top.location.search.slice(1);
            }
            var referString = document.referrer;
            var stUrlKey = displayType === "inlay" || displayType === "ui" ? "bd_cpro_prev" : "bd_cpro_fprev";
            var prevValue = "";
            var prevObj;
            var domCookie;
            try {
                domCookie = document.cookie
            }
            catch (e) {}

            // 首先从当前页url获取预览, 并且从URL中解析对象
            if (paramString.indexOf(stUrlKey) !== -1) {
                prevValue = this.U.getUrlQueryValue(paramString, stUrlKey);
            }

            // 如果当前页url不是预览, 则检查cookie.
            if (!prevValue && domCookie && domCookie.indexOf(stUrlKey) !== -1) {
                prevValue = this.U.getCookieRaw(stUrlKey);
            }

            // 如果当前url, cookie中都找不到预览参数, 则检查上一个页面的url
            if (!prevValue && referString.indexOf(stUrlKey) !== -1) {
                prevValue = this.U.getUrlQueryValue(referString, stUrlKey);
            }

            if (prevValue) {
                prevValue = decodeURIComponent(prevValue).replace(/\\x1e/g, '&').replace(/\\x1d/g, '=').replace(/\\x1c/, '?').replace(/\\x5c/, '\\');
                prevObj = this.U.jsonToObj(prevValue);
                if (cpro_at == undefined) cpro_at = 1;
                if (prevObj.type != 1 && (cpro_at & 2) == 2) {
                    result = (parseInt(prevObj.imgWidth) === parseInt(w) && parseInt(prevObj.imgHeight) === parseInt(h));
                }
                else if (prevObj.type == 1 && ((cpro_at & 1) == 1 || (cpro_at & 64) == 64 || (cpro_at & 32) == 32)) {
                    result = true;
                }
            }
            return result;
        },
        /**
         * 得到广告块的ID
         */
        getAdsDomId: function (displayId) {
            displayId = displayId || 1;
            return this.iframeIdPrefix + displayId;
        },

        /**
         * 检查广告个数, 每一种展现类型的广告块个数有限制, 返回true表示超过个数限制, 不应检索广告
         */
        checkAdsCounter: function (displayType, win, tn) {
            var result = false;
            var adNumLimitNum;
            //主题链接单独计数，一个页面最多可以投放三个主题链接的广告
            if (tn && (tn.indexOf("tlink") > -1 || tn.indexOf("baiduTlinkInlay") > -1 || tn.indexOf("baiduCustSTagLinkUnit") > -1)) {
                displayType = "linkunit";
            }
            switch (displayType.toLowerCase()) {
            case "inlay":
                adNumLimitNum = 4;
                break;
            case "linkunit":
                adNumLimitNum = 6;
                break;
            case "float":
                adNumLimitNum = 2;
                break;
            case "ui":
                adNumLimitNum = 3;
                if (tn == "baiduDEFINE") {
                    adNumLimitNum = 4;
                }
                if (tn == "baiduTpclickedDEFINE" || 
                        tn == "baiduTpclickedDEFINE_mob") {
                    adNumLimitNum = 30;
                }
                break
            default:
                adNumLimitNum = 3;
                break;
            }
            win["__bdcpro__displayTypeCounter"] = win["__bdcpro__displayTypeCounter"] || {};
            win["__bdcpro__displayTypeCounter"][displayType] = win["__bdcpro__displayTypeCounter"][displayType] || 0;
            if (win["__bdcpro__displayTypeCounter"][displayType] >= adNumLimitNum) {
                result = true;
            }
            return result;
        },
        /**
         * 增加广告块计数器
         */
        addAdsCounter: function (displayType, win, tn) {
            //主题链接单独计数，一个页面最多可以投放三个主题链接的广告
            if (tn && (tn.indexOf("tlink") > -1 || tn.indexOf("baiduTlinkInlay") > -1 || tn.indexOf("baiduCustSTagLinkUnit") > -1)) {
                displayType = "linkunit";
            }
            win["__bdcpro__displayTypeCounter"] = win["__bdcpro__displayTypeCounter"] || {};
            win["__bdcpro__displayTypeCounter"][displayType] = win["__bdcpro__displayTypeCounter"][displayType] || 0;
            win["__bdcpro__displayTypeCounter"][displayType]++;
            return true;
        },
        /**
         * 获取广告容器
         */
        getAdsWrapArray: function (slotId) {
            var adsWrapArray = [];
            if (slotId && typeof slotId == 'string') {
                var tempSlotIdArray = slotId.split(",");
                var adsWrapNum = 0;
                for (var i = 0, count = tempSlotIdArray.length; i < count; i++) {
                    if (/u\d+/.test(tempSlotIdArray[i]) && !this.adsWrapStore[tempSlotIdArray[i]]) {
                        adsWrapArray[adsWrapNum] = tempSlotIdArray[i];
                        adsWrapNum++;
                        this.adsWrapStore[tempSlotIdArray[i]] = true;
                    }
                }
            }
            return adsWrapArray;
        },

        /*
         * 获取自定义链接单元横向/纵向最大广告个数
         */
        getLinkUnitMaxCount: function (option) {
            var font_size = parseInt(option.get("titFS"));
            var border_size = parseInt(option.get("conBW"));
            var width = parseInt(option.get("rsi0")) - 2 * border_size;
            var height = parseInt(option.get("rsi1")) - 2 * border_size;


            var maxKeyworkLength = 7;
            var keyword_width = maxKeyworkLength * font_size;
            var keyword_height = font_size + 6;
            var keyword_padding = 7;

            var basic_width = keyword_width + 2 * keyword_padding;
            var basic_height = keyword_height;

            return {
                VerticalCount: Math.floor(width / basic_width),
                HorizontalCount: Math.floor(height / basic_height)
            };
        },

        /**
         * 如果存在iframe嵌套，且只iframe页面卸载的时候，修正cn和did值，以使得PV在下次iframe加载的时候，可以累加
         */
        initParam: function (win) {
            if (!this.U.isInIframe()) {
                return;
            }
            var win = win || window;
            this.currentWindowOnUnloadHandler = this.U.proxy(this.currentWindowOnUnload, this, [win]);
            this.U.bind(win, "beforeunload", this.currentWindowOnUnloadHandler)
        },
        /**
         * 脚本所在的window被unload的时候，处理函数
         */
        currentWindowOnUnload: function (win) {
            this.clientTree = {};
            this.displayCounter = 1;
            var win = win || window;
            this.U.unBind(win, "beforeunload", this.currentWindowOnUnloadHandler);
        },
        checkFloatLu: function (win) {
            var blackList = {
                "test.com": true,
                "people.com.cn": true,
                "chinanews.com": true,
                "cri.cn": true,
                "chinadaily.com": true,
                "cnki.com.cn": true,
                "cnki.net": true,
                "ku6.com": true,
                "tgbus.com": true,
                "5068.com": true,
                "yzz.cn": true,
                "aipai.com": true,
                "stockstar.com": true
            };

            win = win || window;
            var mainDomain = "";
            var domainArray = win.document.domain.split(".");
            var domainLength = domainArray.length;
            if (domainLength && domainLength > 2) {
                if (domainArray[domainLength - 1] === "cn" && domainArray[domainLength - 2] === "com") {
                    mainDomain = domainArray[domainLength - 3] + "." + domainArray[domainLength - 2] + "." + domainArray[domainLength - 1]
                }
                else {
                    mainDomain = domainArray[domainLength - 2] + "." + domainArray[domainLength - 1];
                }
            }
            else if (domainLength) {
                mainDomain = win.document.domain;
            }

            if (mainDomain && blackList[mainDomain]) {
                return false;
            }
            return true;
        },
        // @delete }
        noop: function () {}
    };

    // 注册命名空间
    G.registerNamespace(BusinessLogicNamespace);
})(window[___baseNamespaceName]);

﻿
///@import BaiduCproNamespace
///@import BaiduCproNamespace.Utility
///@import BaiduCproNamespace.BusinessLogic
///@import BaiduCproNamespace.BusinessLogic.Distribute

/**
slotParams:    广告位参数, 从union获取到的广告位的参数. 
            比如: 模版名称的广告位参数名为:cpro_template, 值为text_default_125_125
uiParams:    Param类实例.检索广告时传递给UI的参数, 广告位参数经过逻辑处理后会转换为UI参数.
            比如: 模版名称的UI参数名为:tn, 值为text_default_125_125
mapping:    有的广告位参数转换为UI参数时, 名称会发生变化. mapping对象保存名字的映射关系.
            比如: 模版名称的(广告位参数名cpro_template)->(UI参数名tn).
*/
(function (G){    
    /**
    参数类.用于保存API参数接口相关的逻辑.
    @class 
    @namespace BaiduCproNamespace.BusinessLogic
     */
    var ParamClass = {
        fullName    : "$baseName.BusinessLogic.Param",
        version     : "1.0.0",
        register    : function() {
			this.G = G.using("$baseName", this.win); 
            this.U = G.using("$baseName.Utility", this.win);
			this.BL = G.using("$baseName.BusinessLogic", this.win);  
        },        
    
        /**
        构造函数
        @constructor 
        */ 
        initialize : function(option){
			this.currentWindow = option.currentWindow;
            this.doc = this.win.document;
            this.nav = this.win.navigator;
            this.scr = this.win.screen;
            this.displayType = option.displayType || "inlay";
            this.startTime = (new Date());
            this.BL.pnTypeArray = this.BL.pnTypeArray || [];
            this.BL.pnTypeArray[this.displayType]  = this.BL.pnTypeArray[this.displayType] || [];            
            this.timeStamp = option.timeStamp || (new Date()).getTime();
        },
        
        
        /**
        创建广告位参数到UI参数的映射表
        @param            {Object}    uiParams    UI参数类(Param类实例)
        @returns        {Object}    广告参数与UI参数的名称映射对象, 形如:{"cpro_template":"tn", "cpro_client":"n"} 
        */
        getSlot2UIMapping : function(uiParams){
            var result = {};
            var uiParamName;
            for(uiParamName in uiParams){
                if( uiParamName && uiParams[uiParamName] &&  uiParams[uiParamName].slotParamName){                
                    result[uiParams[uiParamName].slotParamName] = uiParamName;                
                }
            }
            return result;
        },
		
		/**
        创建自定义广告位参数到UI参数的映射表
        @param            {Object}    uiParams    UI参数类(Param类实例)
        @returns        {Object}    广告参数与UI参数的名称映射对象, 形如:{"cpro_template":"tn", "cpro_client":"n"} 
        */
		getCust2UIMapping : function(uiParams){
			var result = {};
            var uiParamName;
            for(uiParamName in uiParams){
                if( uiParamName && uiParams[uiParamName] &&  uiParams[uiParamName].custParamName){                
                    result[uiParams[uiParamName].custParamName] = uiParamName;                
                }
            }
            return result;
		},
        
        /**
        将广告位参数合并到UI参数
        @param        {Object}    uiParams    UI参数类(Param类实例)    
        @param        {Object}    slotParams    广告位数据对象.
        @returns    {Object}    使用slotParams数据填充后的uiParams对象.
        */
        mergeSlot2UI : function(uiParams, slotParams, mapping){
            if(!uiParams || !slotParams || !mapping){
                return null;
            }        
            var uiParamName, slotParamName;
            for(slotParamName in slotParams){
                if(slotParamName && slotParams[slotParamName] && slotParams.hasOwnProperty(slotParamName) ){
                    uiParamName = mapping[slotParamName];
                    if(uiParamName){
                        uiParams.set(uiParamName, slotParams[slotParamName]);
                    }
                }
            }
            return uiParams;
        },
        
        /**
        将UI参数对象序列化成URL中使用的字符串, 形如:"key=value&key=value"
        @param        {Object}    uiParams    UI参数对象(Param类实例)    
        @returns    {String}    使用"key=value&key=value"形式的字符串
        */
        serialize : function(uiParams){
            var result = [];
            var uiParamName, uiParamValue;
            for(uiParamName in uiParams){
                if(uiParamName 
                && uiParams[uiParamName]
                && (typeof uiParams[uiParamName] ==="object")
                && uiParams[uiParamName].isUIParam
                && uiParams[uiParamName].isUIParam[uiParams.displayType]){
                    if(uiParamName==="pn" && !uiParams.get(uiParamName)){
                        continue;
                    }        
                
                    uiParamValue = uiParams.get(uiParamName);
                    if(uiParamValue == null){
						continue;
					}
					if(uiParams.displayType == "ui" && uiParamValue == "baiduCADS"){
						continue;
					}
                    if(uiParams[uiParamName].encode || uiParams.displayType == "ui"){
                        uiParamValue = encodeURIComponent(uiParamValue);
                    }
                    if(uiParams[uiParamName].limit){
                    	uiParamValue = uiParamValue.substr(0,uiParams[uiParamName].limit);
                    }
                    result.push(uiParamName + "=" + uiParamValue);            
                }
            }
            return result.join("&");
        },
        
        /**
        获取快照
        */
        snap : function(uiParams){
            var result = {};
            var uiParamName, uiParamValue;
            for(uiParamName in uiParams){
                if(uiParamName 
                && uiParams[uiParamName]
                && (typeof uiParams[uiParamName] ==="object")
                && uiParams[uiParamName].defaultValue){  
                    uiParamValue = uiParams.get(uiParamName);
                    if(uiParamValue == null){
						continue;
					}
                    if(uiParams[uiParamName].encode || uiParams.displayType == "ui"){
                        uiParamValue = encodeURIComponent(uiParamValue);
                    }
                    result[uiParamName] = uiParamValue;    
                }
            }
            return result;
        },
        
        /**
        默认的get方法
        @param        {String}    paramName    UI参数名称    
        @returns    {String|Number}    UI参数值
        */
        get : function(paramName){ 
                        var result; 
						//参数对象为空的监测
						if( !this[paramName] ){
							return result;
						}
						
                        if( this[paramName].get && this[paramName].get !== "default"){
                            var args = Array.prototype.slice.call(arguments, 0);
                            args.shift();
                            //对于自定义的get函数, 也要先为参数设置默认值.
                            if(!this[paramName]._init){
                                this[paramName]._value = this[paramName].defaultValue[this.displayType];
                            }
                            result = this.U.proxy(this[paramName].get, this, args)();;
                        }
                        else{
                            if(!this[paramName]._init){
                                result = this[paramName].defaultValue[this.displayType];
                            }
                            else{
                                result = this[paramName]._value
                            }
                        }                            
                        return result;
                    },
            
        /**
        默认的set方法
        @param        {String}    paramName    UI参数名称    
        @param        {String|Number}    paramValue    UI参数值    
        @returns    {Boolean}    true表示使用了默认的set方法
        */
        set : function(paramName, paramValue){ 
                        var result = false;                        
                        if( this[paramName].set && this[paramName].set !== "default"){
                            var args = Array.prototype.slice.call(arguments, 0);
                            args.shift();
							result = this.U.proxy(this[paramName].set, this,  args)();                           
                        }
                        else{
                            this[paramName]._value = paramValue;
                            this[paramName]._init = true;
                            result = true;
                        }
                        return result;
                    },   
		/**
		 * 当前检索关键字 
		*/
		k :{   slotParamName: "k",
			   custParamName: "k",
			   modifier: "dynamic",
			   defaultValue: {inlay:"", "float":"", custInlay:""},
			   encode: false,  
			   isUIParam: {inlay:false, "float":false, ui:true, post:false, custInlay:false, "captcha":false},
			   get: "default",
			   set: "default"
		},
        /**
		 * lu中间页策略标识符，因为需要和第一次策略相对应，故需要将第一次策略的cf传递给第二次
		*/
		cf :{   slotParamName: "cf",
			    custParamName: "cf",
			    modifier: "dynamic",
			    defaultValue: {inlay:"", "float":"", custInlay:""},
			    encode: false,  
			    isUIParam: {inlay:false, "float":false, ui:true, post:false, custInlay:false, "captcha":false},
			    get: "default",
			    set: "default"
		},
         /**
		 * lu中间页策略标识符，因为需要和第一次策略相对应，故需要将第一次策略的cf传递给第二次
		*/
		tp2jk :{    slotParamName: "tp2jk",
			        custParamName: "tp2jk",
                    modifier: "dynamic",
			        defaultValue: {inlay:"", "float":"", custInlay:""},
                    encode: false,  
                    isUIParam: {inlay:false, "float":false, ui:true, post:false, custInlay:false, "captcha":false},
                    get: "default",
                    set: "default"
		},
        /**
		 * lu中间页需要区分是来自第一次标签点击还是来自中间页标签点击
		*/
		rs :{       slotParamName: "cpro_rs",
			        custParamName: "rs",
                    modifier: "dynamic",
			        defaultValue: {inlay:0, "float":0, ui:0, post:0, custInlay:0, "captcha":0},
                    encode: false,  
                    isUIParam: {inlay:true, "float":true, ui:true, post:false, custInlay:false, "captcha":false},
                    get: "default",
                    set: "default"
		},
        //@delete {
        
        /**
         * 广告位id
        */
        tu :{  	slotParamName:"slotId", 
                custParamName: "tu",
                modifier:"dynamic", 
                defaultValue:{ inlay:"", "float":"", "captcha":""},
                encode:false, 
                isUIParam:{inlay:true, "float":true, custInlay:true, captcha:true, ui:true},
                get: "default",
                set: "default"
             },    
        /**
         * 模板名称
        */
        tn :{  	slotParamName:"cpro_template",
				custParamName:"tn",
                modifier:"dynamic", 
                defaultValue:{ inlay:"text_default_125_125", "float":"float_xuanfusld_120_270", ui: null, post:null, custInlay:"baiduCust",  captcha:"vcode_captchaF_254_218", pad:"pad_tiepian_400_300"},
                encode:false,  
                isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
             },
        /**
         * 计费名
         */
        n:  { 	slotParamName:"cpro_client",
				custParamName:"n",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },            
        /**
         * 请求的广告个数
         */
        adn:{   slotParamName:"cpro_161",
				modifier:"dynamic", 
				defaultValue:{inlay:"1", "float":"1", captcha:"1"},
				encode:false, 
				isUIParam:{inlay:true, "float":false,custInlay:true,"captcha":false},
				get: "default",
				set: "default"
            },
        /**
         * 广告块的高
         */
        rsi1: { slotParamName:"cpro_h",
				custParamName:"h",
                modifier:"dynamic", defaultValue:{inlay:"125", "float":"270", ui:null, custInlay:null, "captcha":"218", pad:null},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
            
        /**
         * 在贴片里面，广告块的宽跟其它广告不一致，广告的宽为400，而整个iframe的宽为430
         */      
        rsi3: {
                slotParamName:"cpro_adw",
                custParamName:"adw",
                modifier: "dynamic",
                defaultValue: { pad: "430"},
                encode: false,
                isUIParam: { inlay: false, "float": false, ui: false, custInlay: false, captcha: false,
                pad: true},
                get: "default",
                set: "default"
        },
        /**
         * 在贴片里面，广告块的高跟其它广告不一致，广告的宽为400，而整个iframe的宽为430
         */ 
        rsi4: { slotParamName:"cpro_adh",
                custParamName:"adh",
                modifier: "dynamic",
                defaultValue: { pad: "350"},
                encode: false,
                isUIParam: { inlay: false, "float": false, ui: false, custInlay: false, captcha: false,
                pad: true},
                get: "default",
                set: "default"
        }, 
        /**
         * 广告块的宽
         */        
        rsi0:{  slotParamName:"cpro_w",
				custParamName:"w",
                modifier:"dynamic", defaultValue:{inlay:"125", "float":"120", ui:null, custInlay:null, "captcha":"254", pad:null},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
		/**
         * 是否展现show url
         */        
        rsi2:{  custParamName:"bu",
                modifier:"dynamic", defaultValue:{ui:null},
                encode:true, isUIParam:{ui:true},
                get: "default",
                set: "default"
            },
        /**
         * 是否出不相关广告
         */    
        rad:{   slotParamName:"cpro_rad",
				custParamName:"rad",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"",ui:null, post:null, custInlay:"", captcha:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 边框颜色
         */        
        rss0:{  slotParamName:"cpro_cbd",
				custParamName:"bd",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, custInlay:"", captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 背景颜色
         */    
        rss1:{  slotParamName:"cpro_cbg",
				custParamName:"bg",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, post:null, custInlay:"", captcha:"", pad:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        /**
         * 背景是否透明
         */    
        conOP:{  slotParamName:"cpro_conOP",
                modifier:"dynamic", defaultValue:{inlay:0},
                encode:true, isUIParam:{inlay:true, "float":false, ui:false, post:false, custInlay:true, "captcha":false},
                get: "default",
                set: "default"
            },
        /**
         * 标题颜色
         */        
        rss2:{  slotParamName:"cpro_ctitle",
				custParamName:"tt",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, post:null, custInlay:"", captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, post:true, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 描述颜色
         */        
        rss3:{  slotParamName:"cpro_cdesc",
				custParamName:"ct",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, post:null, custInlay:"", captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, post:true, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * show url颜色
         */        
        rss4:{  slotParamName:"cpro_curl",
				custParamName:"url",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, post:null, custInlay:"", captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, post:true, custInlay:"", "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * “百度推广”logo颜色
         */        
        rss5:{  slotParamName:"cpro_clink",
				custParamName:"bdl",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:null, captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, ui:true, "captcha":true},
                get: "default",
                set: "default"
            },
		/**
         * logo文字左右位置，left/right
         */        
        rssl0:{ custParamName:"ta",
                modifier:"dynamic", defaultValue:{ui:null,post:null},
                encode:true, isUIParam:{ui:true, post:true},
                get: "default",
                set: "default"
            },
		/**
         * logo文字上下位置，top/bottom
         */        
        rssl1:{ custParamName:"tl",
                modifier:"dynamic", defaultValue:{ui:null, post:null},
                encode:true, isUIParam:{ui:true, post:true},
                get: "default",
                set: "default"
            },
        /**
         * 飘红处具体飘什么颜色
         */    
        rss6:{    slotParamName:"cpro_cflush",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", custInlay:"", captcha:""},
                encode:true, isUIParam:{inlay:true, "float":false, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 广告标题和描述是否飘红
         */        
        rsi5:{  slotParamName:"cpro_flush",
				custParamName:"nfr",
                modifier:"dynamic", 
				defaultValue:{inlay:"4", "float":"", ui:null , custInlay:"4", captcha:"4"},
                encode:false, 
				isUIParam:{inlay:true, "float":false, ui:true, custInlay:true, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 广告跟随滚动时, 悬浮广告的顶部(侧栏)或底部(按钮), 至浏览器窗口顶部(侧栏)或底部(按钮)距离的固定像素值
         */        
        rsi6:{  slotParamName:"cpro_ctoph",
                modifier:"dynamic", 
				defaultValue:{inlay:-1, "float":-1},
                encode:false, 
				isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },
        /**
         * 广告跟随滚动时, 悬浮广告的顶部(侧栏)或底部(按钮), 至页面顶部(侧栏)或底部(按钮)距离的最小像素值
         */        
        rsi7:{  slotParamName:"cpro_ptoph",
                modifier:"dynamic", 
				defaultValue:{inlay:"0", "float":"0"},
                encode:false, 
				isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },            
        /**
         * 标题是否加粗
         */        
        ts:{    slotParamName:"cpro_ts",
                modifier:"dynamic", defaultValue:{inlay:"1", "float":"", captcha:"1"},
                encode:false, isUIParam:{inlay:true, "float":false, "captcha":true},
                get: "default",
                set: "default"
            },
        /**
         * 请求显示广告的类型
		 *  text
			image
            flash
			video
            widget
			tuwen
			tuwen,text
         */    
        at:{    slotParamName:"cpro_at",
				custParamName:"at",
                modifier:"dynamic", defaultValue:{inlay:"all", "float":"image_flash", ui:"", post:"", custInlay:"text_tuwen", captcha:"image_flash", pad:"image_flash"},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get: function(){
                    var result = 0;
                    var tempValue = this["at"]._value;
                    var regexpText = new RegExp("(text){1}","g"); 
                    var regexpImage = new RegExp("(image){1}|(flash){1}","g");
                    var regexpImageFlash = new RegExp("(image){1}_(flash){1}", "g");
					var regexpOnlyImage = new RegExp("(image){1}","g");					
                    var regexpVideo = new RegExp("(video){1}","g"); 
                    var regexpTuwen = new RegExp("(tuwen){1}","g"); 
                    var regexpAll = new RegExp("(all){1}","g");
					if(this.displayType == "ui" && this["tn"]._value != "baiduCPROiknow"){
						if(regexpText.test(tempValue)){
							result |= 1;
							result |= 64;
						};    
						if(regexpOnlyImage.test(tempValue)){
							result |= 2;
						};
                        if(regexpImageFlash.test(tempValue)){
                            result |= 2;
                            result |= 4;
                        };
                        if(regexpTuwen.test(tempValue)){
                            result |= 32;
                        };   
						return result;
					}
                    if(regexpText.test(tempValue)){
                        result |= 1;
                        result |= 64;
                    }; 
                    if(regexpVideo.test(tempValue)){
                        result |= 8;
                    };   
                    if(regexpTuwen.test(tempValue)){
                        result |= 32;
                    };                     
                    if(this["tn"]._value == "template_inlay_all_mobile"){
                        if(regexpOnlyImage.test(tempValue)){
                        result |= 2;
                        };
                        if(regexpAll.test(tempValue)){
                        result |= 99;
                        };
                    }else{
                        if(regexpImage.test(tempValue)){
                            result |= 2;
                            result |= 4;
                        }; 
                        if(regexpAll.test(tempValue)){
                            result |= 103;
                        };
                    };
                     
                  
                  
                    //仅仅为豆瓣测试用，实验结束后需删除
                    if(this["n"]._value == "54009059_cpr"){
                        result = 2;
                    }
                    return result;                    
                },
                set: "default"
            },
        /**
         * 渠道值
         */    
        ch:{    slotParamName:"cpro_channel",
				custParamName:"channel",
                modifier:"dynamic", defaultValue:{inlay:"0", "float":"0", ui:"0", custInlay:"0", captcha:"0", pad:"0"},
                encode:true, isUIParam:{inlay:true, "float":true, ui:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        /**
         * 是否出公益广告
         */    
        cad:{   slotParamName:"cpro_cad",
				custParamName:"cad",
                modifier:"dynamic", defaultValue:{inlay:"1", "float":"1", ui:"0",post:"0", custInlay:"1", captcha:"1", pad:"1"},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        /**
         * 用户自定义的url
         * 当用户不允许公益广告，同时又没有其他匹配的广告时，广告位可以跳转到用户指定的url
         */    
        aurl:{    slotParamName:"cpro_aurl",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", custInlay:"", captcha:"", pad:""},
                encode:true, isUIParam:{inlay:true, "float":true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        /**
         * 用户自定义的色块颜色
         * 无广告，不允许公益，无aurl的情况下可以指定广告位为一个色块
         */                
        rss7:{    slotParamName:"cpro_acolor",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", custInlay:"", captcha:"", pad:""},
                encode:true, isUIParam:{inlay:true, "float":true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        /**
         * 是否出cpa广告
         */
        cpa:{   slotParamName:"cpro_uap",
				custParamName:"uap",
                modifier:"dynamic", defaultValue:{inlay:"1", "float":"0", ui:"0", custInlay:"1", captcha:"1", pad:"0"},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, custInlay:true, "captcha":true, pad:true},
                get: "default",
                set: "default"
            },
        
        //@delete }
        
        /**
         * flash版本
         * 调用函数flashVersion
         */    
        fv:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"0", "float":"0",ui:"", post:"", custInlay:"0", captcha:"0", pad:"0"},
                encode:true, isUIParam:{inlay:true, "float":true,ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get:function(){
                        var activeXName = "ShockwaveFlash.ShockwaveFlash",
                        nav = this.nav,
                        fla,
                        ActiveX;
                    if (this.nav.plugins && nav.mimeTypes.length) {
                        fla = nav.plugins["Shockwave Flash"];
                        if (fla && fla.description) {
                            return fla.description.replace(/[^\d\.]/g, "").split(".")[0];
                        }
                    } else if (this.U.browser.ie) {
                        ActiveX = ActiveXObject;
                        try {
                            fla = new ActiveX(activeXName + ".7");
                        } catch(e) {
                            try {
                                fla = new ActiveX(activeXName + ".6");
                                fla.AllowScriptAccess = "always";
                                return 6;
                            } catch(e) {}
                            try {
                                fla = new ActiveX(activeXName);
                            } catch(e) {}
                        }
                        if (fla != null) {
                            try {
                                return fla.GetVariable("$version").split(" ")[1].split(",")[0];
                            } catch(e) {}
                        }
                    }
                    return 0;
                },
                set: "default"
            },
        /**
         * cn参数. 第一个[计费名+channel]的cn值为1(无channel值)或者3(有channel值).后面的为0或2(channel第一次出现).
         */        
        cn:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", 
                defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, 
                isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get:function(){
                    if(  !this["n"] || !this["n"].get){
                        return 1;
                    }
                
                    var result = 0; 
                    var client = this.get("n");
                    var channel = this.get("ch") || "0";
                    if (client) {
                        this.BL.clientTree = this.BL.clientTree || {};
                        if ( !this.BL.clientTree[client] ) {
                            result += 1;
							if(channel && channel !== "0"){
								result += 2;
							}
							return result;
                        }
                        if (  channel && channel !== "0" && this.BL.clientTree[client]  && (!this.BL.clientTree[client][channel])) {
                            result += 2;
                        }
                    }
                    return result;
                },
                set: function(){
                    var client = this.get("n");
                    var channel = this.get("ch") || "0";
                    if (client) {
                        this.BL.clientTree = this.BL.clientTree || {};
                        if ( !this.BL.clientTree[client] ) {
							this.BL.clientTree[client] = {};
                        }
                        if ( channel && channel !== "0"  && (!this.BL.clientTree[client][channel])) {
							this.BL.clientTree[client][channel] = true;
                        }
                    }
                    return true;				
                }
            },
        /**
        if字段, 0000 0000 , 从低位开始, 
        第一位:是否iframe嵌套
        第二位:是否跨域iframe嵌套
        第三位:是否宽<40或者高小于10
        第四位:是否实际显示的宽高小于广告位的宽高
        第五位:实际显示的宽高大于二倍的广告位宽高
         */    
        "if":{  slotParamName:"",
				custParamName:"",
                modifier:"dynamic", 
                defaultValue:{inlay:"0", "float":"0",ui:"0", post:"0", custInlay:"0", captcha:"0", pad:"0"},
                encode:false, 
                isUIParam:{inlay:true, "float":true,ui:true, post:true, custInlay:true, "captcha":true, pad:true},
                get:function(){
                    var result = 0;
                    var win = this.currentWindow;
                    if (this.U.isInIframe(win)) {
                        result += 1;
                    }    
                    
                    if( this.U.isInCrossDomainIframe(win, win.top)){
                        result += 2;
                    }    
                    
                    if( !this["rsi0"] || !this["rsi0"].get ||  !this["rsi1"] || !this["rsi1"].get){
                        return result;
                    }
                    
                    var expectedWidth = this.get("rsi0");
                    var expectedHeight = this.get("rsi1");
                    var actualWidth = this.U.getClientWidth(this.currentWindow);
                    var actualHeight = this.U.getClientHeight(this.currentWindow);               
                    
                    if (actualWidth < 40 || actualHeight < 10) {
                        result += 4;
                    } 
                    else if (actualWidth < expectedWidth || actualHeight < expectedHeight) {
                        result += 8;
                    }
                    if ( (actualWidth >= 2 * expectedWidth) 
                        || (actualHeight >= 2 * expectedHeight) ){
                        result += 16;
                    }                    
                    return result;
                },
                set: "default"
            },           
            
        /**
         word字段表示广告所在页面url.如果存在iframe嵌套,则为第一个宽高大于广告块宽高2倍的页面url.
         iframe嵌套查找最多为10层.
         */        
        word:{  slotParamName:"",
				custParamName:"",
                modifier:"dynamic",
                limit:700,
                defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:true, 
                isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
					var win = this.currentWindow;
                    var result, maxCounter=10, counter=0;
                    var expectWidth, expectHeight;
                    
                    //DPLU的特殊处理
                    if( window.dpClient && window.dpClientDomain){
                        return "http://" + window.dpClientDomain 
                            + "/domain_parking.htm?site=" 
                            + encodeURIComponent(window.location.href).substring(0, 700);
                    }
                    
                    
                    try{
                        expectWidth = this.get("rsi0") || 0;
                        expectHeight = this.get("rsi1") || 0;
                    }
                    catch(ex){
                        expectWidth = 200, expectHeight=60;         
                    }
                    
                    result = win.document.location.href;
					if(this.U.isInIframe(win)){//在iframe中
						var	 winWidth, 	winHeight, 	currentWinUrl;
						for(counter=0; counter<maxCounter; counter++){
							if( !this.U.isInCrossDomainIframe(win, win.parent)){
								//非跨域iframe, 取第一个页面长宽大于广告长宽二倍的页面url
								winWidth = this.U.getClientWidth(win);
								winHeight = this.U.getClientHeight(win);
								currentWinUrl = win.document.location.href;
								win = win.parent;
								if( expectWidth > 0 && expectHeight > 0 && winWidth>2*expectWidth && winHeight>2*expectHeight ){
									result = currentWinUrl;
									break;
								}

								if( !this.U.isInIframe(win, win.parent) ){
									//如果在非跨域的iframe中, 则取top的url
									result = win.location.href;
									break;
								}
							}
							else{//如果存在iframe嵌套, 则取第一个跨域iframe的referrer
								result = win.document.referrer || win.document.location.href;
								break;
							}
						}

						//存在嵌套层数大于10, 或者window.top和window.parent被修改的情况.
						//此时按照跨域iframe处理.
						if(counter>=10){
							result = win.document.referrer || win.document.location.href;
						}
					}
                    
					//对tpclicked1模板的word字段进行特殊处理
					if( ((result.search(/cpro.baidu.com/i)!= -1) ||  (result.search(/\?hide=1/i)!= -1)) && result.search(/t=tpclicked/i) != -1){
						//第一个问号的索引
						var qIndex = result.indexOf('?');
						//获取result的参数部分
						var result = result.substring(qIndex+1);
						//分割result的参数为参数数组
						var tArray = result.split('&');
						for(var i = 0; i < tArray.length; i++){
							if(tArray[i].search(/^u=/i) != -1){
								result = tArray[i].replace(/^u=/i,'');
								break;
							}
						}
					} 
                    return result;
                },
                set: "default"
            },
        /**
         * refer页url. 如果url中包含escape编码(%u1234格式)则会转成encodeURIComponent编码.
         */    
        refer:{		slotParamName:"",
					custParamName:"",
                    modifier:"dynamic",
                    limit:700,
				    defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                    encode:true, 
				    isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                    get:function(){
						var result;
						try{
							result = this.win.opener ?  this.win.opener.document.location.href : this.doc.referrer; 
						}
						catch(ex){
							result = this.doc.referrer;
						}
						return this.U.escapeToEncode(result);
                    },
                    set: "default"
            },
        /**
         * readystate
         */        
        ready:{		slotParamName:"",
					custParamName:"",
                    modifier:"dynamic", 
				    defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:""},
                    encode:true, 
				    isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true},
                    get:function(){
                        //refer : http://www.w3schools.com/jsref/prop_doc_readystate.asp
                        var statusmap = {
                            "uninitialized" : 0,
                            "loading"       : 1,
                            "loaded"        : 2,
                            "interactive"   : 3,
                            "complete"      : 4
                        };
                        try{
                            return statusmap[this.doc.readyState];
                        }
                        catch(e){
                            return 5;
                        }
                    },
                    set: "default"
            },          
        
		//@delete {
		/**
         * 前端s值, 用于标识一次检索请求.
         */    
        jk:{    slotParamName:"",
				custParamName:"",
				modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
				encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
				get:function(){
					if(!this["jk"]._value){
						this["jk"]._value = this.U.md5(this.BL.randomArray.join("") + Math.random()*1000000 + this.doc.location.href + this.doc.cookie);
						this["jk"]._init = true;
					}
					return this["jk"]._value;
				},
				set: function(){
					this["jk"]._value = "";
				}
            },
        //@delete }
		
		/**
         * ???? 做什么用的 ????
         */    
        jn:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"3", "float":"3", ui:"3", post:"3", custInlay:"3", captcha:"3", pad:"3"},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return 3;
                },
                set: "default"
            },
		/**
         * 本请求使用的js文件名称
         */    
        "js":{  slotParamName:"",
				custParamName:"",
				modifier:"dynamic", 
				defaultValue:{inlay:"c", "float":"f", ui:"ui", post:"post", custInlay:"custInlay", captcha:"y"},
				encode:false, 
				isUIParam:{inlay:false, "float":false, ui:true, post:true, custInlay:true, captcha:true},
				get:"default",
				set: "default"
            },
			
        /**
         * document.lastModified 文档最后修改时间. 参见w3c:
         * http://www.w3.org/TR/html5/dom.html#dom-document-lastmodified
         */    
        lmt:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return Date.parse(this.doc.lastModified)/1000;
                },
                set: "default"
            },
        /**
         * 桌面的分辨率, 包含任务条
         * 形式为:宽，高。e.g.:1024,768
         */    
        csp:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"",post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.scr.width + "," + this.scr.height;
                },
                set: "default"
            },
        /**
         * 桌面的分辨率, 不包含任务条
         * 形式为:宽，高。e.g.:1024,740
         */    
        csn:{   slotParamName:"",
                modifier:"dynamic", 
				defaultValue:{inlay:"", "float":"", custInlay:"", captcha:""},
                encode:false, 
				isUIParam:{inlay:true, "float":true, custInlay:true, captcha:true},
                get:function(){
                    return this.scr.availWidth + "," + this.scr.availHeight;
                },
                set: "default"
            },
        /**
         * 桌面色深. ff的实现与显卡驱动输出有关, 与桌面的显示设置可能不同.
         */    
        ccd:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.scr.colorDepth || 0;
                },
                set: "default"
            },
        /**
         * 浏览器历史表长度
         */
        chi:{    slotParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.win.history.length || 0;
                },
                set: "default"
            },
        /**
         * 是否允许java
         */    
        cja:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.nav.javaEnabled().toString() ;
                },
                set: "default"
            }, 
        /**
         * plugin插件数量
         */    
        cpl:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.nav.plugins.length || 0;
                },
                set: "default"
            },
        /**
         * mime对象数量
         */    
        cmi:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.nav.mimeTypes.length || 0;
                },
                set: "default"
            },
        /**
         * 是否支持cookie
         */    
        cce:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return this.nav.cookieEnabled || 0;
                },
                set: "default"
            },
        /**
         * OS使用的默认语言
         */    
        csl:{   uuserApiName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
					return encodeURIComponent( this.nav.language || this.nav.browserLanguage || this.nav.systemLanguage ).replace(/[^a-zA-Z0-9\-]/g, '');
                },
                set: "default"
            },
        /**
         * 广告自增id
         */    
        did:{   uuserApiName:"",
				custParamName:"",
                modifier:"dynamic", 
                defaultValue:{inlay:"1", "float":"1", ui:"1",post:"1", custInlay:"1", captcha:"1", pad:"1"},
                encode:false, 
                isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    this.win["__bdcpro__displayTypeCounter"] = this.win["__bdcpro__displayTypeCounter"]  || {};
                    if(this.get("tn") && this.get("tn").toLowerCase().indexOf("tlink") > -1){
                        return this.win.__bdcpro__displayTypeCounter.lu_total || 1;
                    }
                    else{
                        return this.win.__bdcpro__displayTypeCounter.total || 1;
                    }
                },
                set: function(){
                    if(this.get("tn") && this.get("tn").toLowerCase().indexOf("tlink") > -1){
                        this.win.__bdcpro__displayTypeCounter.lu_total = this.win.__bdcpro__displayTypeCounter.lu_total || 1;
                        this.win.__bdcpro__displayTypeCounter.lu_total++;
                    }
                    else{
                        this.win.__bdcpro__displayTypeCounter.total = this.win.__bdcpro__displayTypeCounter.total || 1;
                        this.win.__bdcpro__displayTypeCounter.total++;
                    }
					return true;
                }
        },     
        /**
         * 脚本运行时间
         */    
        rt:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    var result = 0;
                    if(this.startTime){    
                        result = (new Date()).getTime() - this.startTime.getTime();
                    }
                    return result;
                },
                set: "default"
            },            
        /**
         * 当前客户端时间
         */
        dt:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true, pad:true},
                get:function(){
                    return Math.round((new Date).getTime() / 1000);
                },
                set: "default"
            },
        /**
        记录页面展现过的广告位, 用于去重. 格式为: "模版名称1:模版名称2|模版个数1:模版个数2"
         */
        pn:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", 
				defaultValue:{inlay:"", "float":"", ui:"", custInlay:"", captcha:""},
                encode:false, 
				isUIParam:{inlay:true, "float":true, ui:true, custInlay:true, captcha:true},
                get:function(){
                        var result = "";
                        var i, count, item, templateNameArray = [], templateValeArray = [], templateAtArray = [];
						var pnArray = this.BL.pnTypeArray[this.displayType] = this.BL.pnTypeArray[this.displayType] || [];
                        if (pnArray && pnArray.length > 0) {
                            for (i = 0, count = pnArray.length; i < count; i++) {
                                item = pnArray[i]
                                if (!item || !item.name || !item.num || !item.at) {
                                    continue;
                                }                            
                                templateNameArray.push(item.name);
                                templateValeArray.push(item.num);
								templateAtArray.push(item.at);
                            }
                            result = templateValeArray.join(":") + "|" + templateNameArray.join(":") + "|" + templateAtArray.join(":");
                        }
                        return result;
                    },
                set: function (templateName, adNum ,adAt) {
						var result = true;
						if(!templateName || !adNum || !adAt){
							templateName = this.get("tn");
							if(this.displayType == "ui"){
								adNum =  this.get("hn") * this.get("wn") || 0;
							}
							else{
								adNum =  this.get("adn") || 0;
							}
							adAt =  this.get("at") || 103;
						}
                        if (!templateName || !adNum || !adAt) {
                            result = false;
                        }
						else if( this.displayType != "ui" && this.BL.pnTypeArray[this.displayType].length == 2 ){ //非自定义样式广告块限制最多3个
							result = false;
						}
						else if( this.displayType == "ui" && this.BL.pnTypeArray[this.displayType].length == 3 ){ //自定义样式广告块限制最多4个
							result = false;
						}
                        else {
							this.BL.pnTypeArray[this.displayType]  = this.BL.pnTypeArray[this.displayType]  || [];
                            this.BL.pnTypeArray[this.displayType].push({ name: templateName, num: adNum ,at: adAt });
                        }
                        return result;						
                    }
            },        
        
        //@delete {
        /**
         * 效果变量
         */
        ev:{    slotParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":true, captcha:true, pad:true},
                get:function(){
                    var result = this.get("adn");
                    var temp_tn = this.get("tn");
                    if( temp_tn && temp_tn.indexOf("tlink_default")>-1){
                        result = 0;
                    }
                    result = result << 24;
                    return result;
                },
                set: "default"
            },
        //@delete }

       /**
         * 是否使用了用户API
         */
        c01:{   slotParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"0", "float":"0", captcha:""},
                encode:false, isUIParam:{inlay:true, "float":true, captcha:true},
                get:"default",
                set: "default"
            },
			
		/**
         页面第一次请求的时间戳
         */
        prt:{   slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"0", "float":"0", ui:"0", post:"0", custInlay:"0", captcha:"0"},
                encode:false, isUIParam:{inlay:true, "float":true, ui:true, post:true, custInlay:true, captcha:true},
                get: function(){
                    var now = (new Date()).getTime();
                    
                    /* 
                    * prt最长生存周期，单位是毫秒
                    * 用来实现不刷新页面时重复请求广告，prt可更新，减小prt重复几率
                    */
                    var max_age = 4 * 60 * 1000;
                    
					if(!this.BL.pageFirstRequestTime){
						this.BL.pageFirstRequestTime = now;
					}
                    else{
                        if(now - this.BL.pageFirstRequestTime >= max_age){
                            this.BL.pageFirstRequestTime = now;
                        }
                    }
					return this.BL.pageFirstRequestTime || "";
				},
                set: "default"
            },
	
        //@delete {
        /**
        悬浮广告类型: 整型，1侧栏(D)，2按钮，3视窗
         */    
        fa:{    slotParamName:"cpro_float",
                modifier:"dynamic", defaultValue:{inlay:1, "float":1, captcha:"1"},
                encode:false, 
                isUIParam:{inlay:false, "float":true, captcha:false},
                get: "default",
                set: "default"
            },
        /**
        悬浮广告位置: 整型，1左，2右，3左右（D）
         */    
        ls:{    slotParamName:"cpro_location",
                modifier:"dynamic", defaultValue:{inlay:3, "float":3},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },    
        /**
        悬浮广告定位方式: 整型，1普适(D)，2贴边
         */    
        pt:{    slotParamName:"cpro_position",
                modifier:"dynamic", defaultValue:{inlay:1, "float":1},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },
        /**
        悬浮广告跟随方式: 整型，1跟随(D)，2固定
         */    
        flw:{    slotParamName:"cpro_follow",
                modifier:"dynamic", defaultValue:{inlay:1, "float":1},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },
        /**
        悬浮广告关闭方式: 整型，1直接关闭(D)，2cookie关闭
         */    
        ct:{    slotParamName:"cpro_close",
                modifier:"dynamic", defaultValue:{inlay:1, "float":1},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },    
        /**
        悬浮广告站长页面宽度: 整型
         */    
        ccw:{   slotParamName:"cpro_contw",
                modifier:"dynamic", 
				defaultValue:{inlay:900, "float":900},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: function(){
					if(typeof this["ccw"]._value === "undefined" ||  !this["ccw"]._value  || this["ccw"]._value < 720){
						return 10000;
					}
					else{
						return this["ccw"]._value;
					}
					
				},
                set: "default"
            },
        /**
        悬浮广告广告位最小分辨率限制: 整型. 取值范围0-4095(D), 如果此最小分辨率>=用户分辨率, 则不请求广告.
         */    
        ww:{    slotParamName:"cpro_clientw",
                modifier:"dynamic", defaultValue:{inlay:4095, "float":4095},
                encode:false, 
                isUIParam:{inlay:false, "float":true},
                get: "default",
                set: "default"
            },
		/**
		描述文字长度
		*/	
		cm:{	custParamName:"cm",
				modifier:"dynamic", defaultValue:{ui:0,post:0},
                encode:true, 
                isUIParam:{ui:true,post:true},
                get: "default",
                set: "default"
			},
		/**
		show url长度
		*/	
		um:{	custParamName:"um",
				modifier:"dynamic", defaultValue:{ui:0,post:0},
                encode:true, 
                isUIParam:{ui:true,post:true},
                get: "default",
                set: "default"
			},
		/**
		横向广告条数
		*/	
		wn:{	custParamName:"wn",
				modifier:"dynamic", defaultValue:{ui:null, post:null, custInlay:1},
                encode:true, 
                isUIParam:{ui:true, post:true, custInlay:true},
                get: "default",
                set: "default"
			},
		/**
		标题长度
		*/	
		tm:{	custParamName:"tm",
				modifier:"dynamic", defaultValue:{ui:0, post:0},
                encode:true, 
                isUIParam:{ui:true, post:true},
                get: "default",
                set: "default"
			},
		/**
		回调函数
		*/
		func:{	custParamName:"func",
				modifier:"dynamic", defaultValue:{ui:"renderBaiduCproAds"},
                encode:true, 
                isUIParam:{ui:true},
                get: "default",
                set: "default"
			},
		/**
		纵向广告条数
		*/
		hn:{	custParamName:"hn",
				modifier:"dynamic", defaultValue:{ui:null,post:null, custInlay:4},
                encode:true, 
                isUIParam:{ui:true,post:true, custInlay:true},
                get: "default",
                set: "default"
			},
		/**
		当前编码
		*/
		ie:{	custParamName:"charset",
				modifier:"dynamic", defaultValue:{ui:null, custInlay:"utf8"},
                encode:true, 
                isUIParam:{ui:true, custInlay:true},
                get: function(){
					if(typeof(this["ie"]._value) == "string"){
						switch(this["ie"]._value.toLowerCase()){
							case "gb2312": 
							case "gbk":
								return "0"; 
								break;
							case "utf8": 
							case "utf-8":
								return "1"; 
								break;
							default: 
								return null; 
								break;
						}
					}
				},
                set: "default"
			},
			
		/**
		是否是360浏览器
		*/
		i3:{    slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:"p", "float":"p",ui:"p", post:"p", custInlay:"p", captcha:"p"},
                encode:false, isUIParam:{inlay:true, "float":true,ui:true, post:true, custInlay:true, "captcha":true},
                get:function(){
					var result = "p";
					switch( window.___is3b ){
						case "loading":
							result = "l";
							break;
						case "true":
							result = "t";
							break;
						case "false":
							result = "f";
							break;	
						default:
							result = "p";
							break;
					}
					return result;
                },
                set: "default"
            },  
            
        /**
		统计类型. 大于100表示不计入检索统计
		*/
		anatp:{ slotParamName:"",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:0, "float":0, ui:0, post:0, custInlay:0, captcha:0},
                encode:false, isUIParam:{inlay:true, "float":true, ui:false, post:false, custInlay:false, "captcha":false},
                get: "default",
                set: "default"
            },
        /**
		样式实验号
		*/
		stid:{ slotParamName:"cpro_stid",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:0, "float":0,ui:0, post:0, custInlay:0, captcha:0},
                encode:false, isUIParam:{inlay:true, "float":true,ui:true, post:false, custInlay:false, "captcha":false},
                get: function(){
                    try{                
                        //从url中获取stid的值
                        if(this.displayType === "ui"){
                            var win = this.currentWindow;
                            if (!this.U.isInIframe(win)) {
                                var url=document.location.href;
                                var urlStyleId = this.U.getPara(url)["stid"];
                                if(urlStyleId){
                                    return urlStyleId;
                                }
                            } 
                        }
                  
                        //start 悬浮LU实验
                        if( this.BL.checkFloatLu && this.BL.checkFloatLu(this.win) && this.G.BusinessLogic.Distribute.dispatch("floatLu", {displayType: this.displayType, displayWidth:this.get("rsi0"), displayHeight:this.get("rsi1")})){
                            if(this.G.BusinessLogic.Distribute.dispatch("floatLuShow", {displayType:this.displayType, displayWidth:this.get("rsi0"), displayHeight:this.get("rsi1")})){
                                return 2; //悬浮LU 
                            }else{
                                return 1; //
                            }   
                        }
                        else{
                            return this["stid"]._value;
                        }
                    }
                    catch(ex){
                        return this["stid"]._value;
                    }
                    
                    //end 悬浮LU实验
                },                
                set: "default"
        }, 
		 /**
		展现类型
		*/
		distp: {
            slotParamName: "",
            custParamName: "",
            modifier: "dynamic",
            defaultValue: {
                inlay: "1001",
                "float": "2001",
                ui: "1001",
                post: "1001",
                custInlay: "1001",
				pad: "3001",
                captcha: "4001"
            },
            encode: false,
            isUIParam: {
                inlay: true,
                "float": true,
                ui: true,
                post: true,
                custInlay: true,
                captcha: true,
				pad:true
            },
            get: "default",
            set: "default"
        },		
		/**
		如果有LU广告, 此参数表示LU广告的格式
		*/
		lunum:{ slotParamName:"cpro_lunum",
				custParamName:"",
                modifier:"dynamic", defaultValue:{inlay:0, "float":0,ui:0, post:0, custInlay:0, captcha:0},
                encode:false, isUIParam:{inlay:true, "float":true,ui:false, post:false, custInlay:false, "captcha":false},
                get: function(){
                    if((typeof this["lunum"]._value !== "undefined")&&(typeof this["lunum"]._init !== "undefined")){
                        //如果用户有设置, 以用户设置的为准
                        this["lunum"]._value = parseInt(this["lunum"]._value);
                        if(this["lunum"]._value > 0){
                            return 6;
                        }
                        else{
                            return 0;
                        }
                    }
                    else{
                        try{
                        //如果用户未设置, 根据黑名单逻辑判断
                            if( this.BL.checkFloatLu && this.BL.checkFloatLu(this.win) && this.G.BusinessLogic.Distribute.dispatch("floatLu", {displayType:this.displayType, displayWidth:this.get("rsi0"), displayHeight:this.get("rsi1")})){
                                if(this.G.BusinessLogic.Distribute.dispatch("floatLuShow", {displayType: this.displayType, displayWidth:this.get("rsi0"), displayHeight:this.get("rsi1")})){
                                    return 6; 
                                }
                            }
                            else if( this.displayType === "inlay" ){
                                return 6;
                            }
                            
                        }
                        catch(ex){
                        }
                        return 0;
                    }
                },
                set: "default"
        },	
        /**
         * 移动广告缩放比例
         */
        scale:{ slotParamName:"cpro_scale",
				custParamName:"scale",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":false, ui:false, post:false, custInlay:false, captcha:false, pad:false},
                get: "default",
                set: "default"
            },
         /**
         * 广告皮肤
         */
        skin:{ slotParamName:"cpro_skin",
				custParamName:"skin",
                modifier:"dynamic", defaultValue:{inlay:"", "float":"", ui:"", post:"", custInlay:"", captcha:"", pad:""},
                encode:false, isUIParam:{inlay:true, "float":false, ui:false, post:false, custInlay:false, captcha:false, pad:false},
                get: "default",
                set: "default"
            },  
        //@delete }
		noop:{	custParamName:"",
				modifier:"dynamic", defaultValue:{ui:null,post:null},
                encode:false, 
                isUIParam:{ui:false,post:false},
                get: "default",
                set: "default"
		}
    };

    //注册类
    G.registerClass(ParamClass);    
})(window[___baseNamespaceName]);

﻿///@import BaiduCproNamespace
///@import BaiduCproNamespace.Utility

(function (G) {
    /**
    分流模块类
    使用举例:
    if ( !isUnionPreview && BL.Distribute.dispatch("viewtime")) {
        BL.ViewWatch.getInstance();
    }    
    */
    var DistributeClass = {        
        fullName    : "$baseName.BusinessLogic.Distribute",
        version     : "1.0.0",
        register    : function() {
            this.G = G.using("$baseName", this.win); 
            this.U = G.using("$baseName.Utility", this.win);
            //this.BL = G.using("$baseName.BusinessLogic", this.win);
        },    

        //分流模块相关的状态类。
        status: {},

        //每个功能的分流比例
        viewtime: 100,
        viewtimeIE: 100,

        //悬浮LU实验
        floatLu:{percent: 100, displayType:"float", displayWidth:"120", displayHeight:"270"},
        floatLuShow:{percent: 100, displayType:"float", displayWidth:"120", displayHeight:"270"},
        
        //计算分流的方法
        dispatch: function (itemName, config) {
            //跨域不执行分流
            if (this.U.isInCrossDomainIframe()) {
                return false;
            }
            
            var statusKey = itemName;
            //如果传入了配置文件, 则判断状态的key为要根据配置文件生成
            if(config){
                for( var key in config ){
                    if(key && config[key]){
                        statusKey += "_" + config[key].toString();
                    }
                }
            }

            //分流基于页面级别。只执行一次分流判定。
            if (this.status[statusKey + "Dispatched"]) {
                return this.status[statusKey];
            }

            this.status[statusKey] = false;
            this.status[statusKey + "Dispatched"] = true;
            var percent = 0;
            if( (typeof this[itemName]).toLowerCase() === "object" )//复杂分流模式
            {
                var expConfig = this[itemName];
                percent = expConfig.percent;
                if( expConfig.displayType ){
                    if( !config.displayType || expConfig.displayType !== config.displayType ){
                        return false;
                    }                    
                }
                
                if( expConfig.displayWidth ){
                    if( !config.displayWidth || expConfig.displayWidth !== config.displayWidth ){
                        return false;
                    }                    
                }
                
                if( expConfig.displayHeight ){
                    if( !config.displayHeight || expConfig.displayHeight !== config.displayHeight ){
                        return false;
                    }                    
                }
            }
            else if( (typeof this[itemName]).toLowerCase() === "number" ){//基本分流模式
                percent = this[itemName];
            }
            
            
            var tempNum = parseInt(Math.random() * 100);
            if (percent && tempNum < percent) {
                this.status[statusKey] = true;
            }
            return this.status[statusKey];
        }
    };
    
    //初始化类
    G.registerClass(DistributeClass);
})(window[___baseNamespaceName]);
﻿///@import BaiduCproNamespace
///@import BaiduCproNamespace.Utility
///@import BaiduCproNamespace.BusinessLogic

(function (G) {
    //声明类. 可视区域监控类
    var ViewWatchClass = {
        fullName: "$baseName.BusinessLogic.ViewWatch",
        version: "1.0.0",
        register: function () {
            this.G = G.using("$baseName", this.win);
            this.U = G.using("$baseName.Utility", this.win);
            this.BL = G.using("$baseName.BusinessLogic", this.win);
        },

        /**
        属性
        */
        analysisUrl: "http://eclick.baidu.com/a.js", //回发url
        longTime: 7200000, //最长监控时间，2小时(7200000ms)

        //ui参数对象的参数映射关系
        uiParamMapping: {
            tu: "tu",
            did: "did",
            tn: "tn",
            word: "word",
            jk: "jk",
            "if": "if",
            rsi0: "aw",
            rsi1: "ah",
            ch: "ch",
            n: "n",
            js: "js",
            dt:"dt"
        },

        //视图上下文(存取广告停留时间信息)的参数映射关系
        viewContextParamMapping: {
            pageStayTime: "pt",
            pageStayTimeStamp: "ps",
            inViewTime: "it",
            inViewTimeStamp: false,
            currViewStatus: "vs",
            focusTime: "ft",
            adViewTime: "vt", //可视面积超过50%
            currAdViewStatus: false,
            adViewTimeStamp: false
        },

        //客户端数据对象的参数映射关系
        clientParamMapping: {
            opacity: "op",
            desktopResolution: "csp",
            browserRegion: "bcl",
            pageRegion: "pof",
            top: "top",
            left: "left",
            focusSwitch: "fs"
        },

        //记录用户最后访问过的url
        lastVisitedUrl: {
            currentIndex: 0,
            sendIndex: 0,
            maxSize: 10,
            paramTimeName: "lvt",
            paramUrlName: "lvu",
            paramValue: [] //item格式: { url:aaa,  time:"1339947288530"}  其中time是GMT 时间           
        },

        isIEWatchFocus: true, //是否启用IE焦点监控, 分流时计算是否开启.
        focusSwitch: true, //页面是否启用了焦点监控
        watchArrayPointer: null, //监控对象数组指针            
        intervalId: null, //定时器
        intervalTimeSpan: 500, //定时器的间隔时间
        intervalStatus: "wait", //定时器监控进程的状态:wait->load->run->unload

        //构造函数
        initialize: function () {
            this.watchArrayPointer = this.BL.adsArray;
        },

        //初始化DOM
        initializeDOM: function () {},

        //初始化事件
        initializeEvent: function () {
            //立刻开始监控
            this.windowOnLoad();
            //绑定window.OnLoad事件            
            var windowOnLoadDelayHandler = this.U.proxy(this.windowOnLoadDelay, this);
            this.U.ready(windowOnLoadDelayHandler, 2000);
            //绑定window.Unload事件
            this.U.bind(this.win, "beforeunload", this.U.proxy(this.windowOnUnload, this));
            /*
            if (this.U.browser.ie) {
                this.U.bind(this.win, "beforeunload", this.U.proxy(this.windowOnUnload, this));
            }
            else {
                this.U.bind(this.win, "unload", this.U.proxy(this.windowOnUnload, this));
            }
            */
        },

        /**
        计算广告块位置, 页面分辨率, 页面宽高等数据.
        */
        calculateClientParam: function (watchObj, watchDom, watchWin) {
            //开始计算DOM元素的各种数据
            watchObj.clientParam = watchObj.clientParam || {};
            //计算元素的位置
            var tempPosition = this.U.getPosition(watchDom);
            watchObj.clientParam.left = tempPosition.left || 0;
            watchObj.clientParam.top = tempPosition.top || 0;
            //透明度数据
            watchObj.clientParam.opacity = this.U.getOpacity(watchDom);
            //桌面分辨率(不算任务栏)
            var availWidth = watchWin.screen.availWidth;
            var availHeight = watchWin.screen.availHeight;
            if (availWidth > 10000) availWidth = 0;
            if (availHeight > 10000) availHeight = 0;
            watchObj.clientParam.desktopResolution = availWidth + "," + availHeight;
            //浏览器可见区域大小
            watchObj.clientParam.browserRegion = this.U.getClientWidth(watchWin) + "," + this.U.getClientHeight(watchWin);
            //页面总的大小(即浏览器可见区域+滚动条区域)
            watchObj.clientParam.pageRegion = this.U.getScrollWidth(watchWin) + "," + this.U.getScrollHeight(watchWin);
            //页面是否启用了焦点监控
            watchObj.clientParam.focusSwitch = this.focusSwitch;
        },

        /**
        * 切换显示状态
        * @name switchViewStatus
        * @function
        * @param {Object}     viewContexts     上下文对象集合
        * @param {DOMElement}     watchDom     当前被观察的对象
        * @param {boolean} inViewStatus    当前对象的可视状态
        * @param {boolean} adViewStatus    当前对象的50%可视状态
        * @meta cpro         
        * @return {Object} viewContext      当前元素的上下文对象
        
        页面加载时, this.intervalStatus=load, 不累加定时器的间隔.
        页面关闭时, this.intervalStatus=unload,根据时间戳计算时间, 计算出来的时间间隔必须在定时器间隔以内.
        定时执行时, this.intervalStatus=run, 累加定时器间隔.        
        */
        updateViewStatus: function (viewContext, inViewStatus, adViewStatus) {
            var currDate = new Date();
            var inviewTimeSpan = pageTimeSpan = this.intervalTimeSpan; //本次计算出的时间间隔
            var adviewTimeSpan = inviewTimeSpan;

            //第一次计算时, 时间间隔为0
            if (this.intervalStatus === "load") {
                this.intervalStatus = "run";
                inviewTimeSpan = pageTimeSpan = 0;
                adviewTimeSpan = pageTimeSpan = 0;
            }

            if (viewContext.currViewStatus) {
                //计算广告停留时间
                if (this.intervalStatus === "unload") { //页面关闭时计算时间间隔
                    inviewTimeSpan = parseInt(currDate.getTime() - viewContext.inViewTimeStamp.getTime());
                    if (inviewTimeSpan < 0) {
                        inviewTimeSpan = 0;
                    }
                    else if (inviewTimeSpan > this.intervalTimeSpan) {
                        inviewTimeSpan = this.intervalTimeSpan;
                    }
                }
                viewContext.inViewTime += inviewTimeSpan;
                viewContext.inViewTimeStamp = currDate;
                if (viewContext.inViewTime > this.longTime) {
                    viewContext.inViewTime = this.longTime;
                }
            }
            else {
                //原始状态是不可见 第一次仅仅修改可见状态和时间戳
                if (inViewStatus) { //
                    viewContext.inViewTimeStamp = currDate;
                }
            }
            viewContext.currViewStatus = inViewStatus;

            if (viewContext.currAdViewStatus) {
                //计算50%可视面积广告停留时间
                if (this.intervalStatus === "unload") {
                    adviewTimeSpan = parseInt(currDate.getTime() - viewContext.adViewTimeStamp.getTime());
                    if (adviewTimeSpan < 0) {
                        adviewTimeSpan = 0;
                    }
                    else if (adviewTimeSpan > this.intervalTimeSpan) {
                        adviewTimeSpan = this.intervalTimeSpan;
                    }
                }
                viewContext.adViewTime += adviewTimeSpan;
                viewContext.adViewTimeStamp = currDate;
                if (viewContext.adViewTime > this.longTime) {
                    viewContext.adViewTime = this.longTime;
                }
            }
            else {
                if (adViewStatus) { //第一次仅仅修改可见状态和时间戳
                    viewContext.adViewTimeStamp = currDate;
                }
            }
            viewContext.currAdViewStatus = adViewStatus;


            //计算页面停留时间
            viewContext.pageStayTime = viewContext.pageStayTime || 0;
            if (this.intervalStatus === "unload") { //页面关闭时计算时间间隔
                pageTimeSpan = parseInt(currDate.getTime() - viewContext.pageStayTimeStamp.getTime());
                if (pageTimeSpan < 0) {
                    pageTimeSpan = 0;
                }
                else if (pageTimeSpan > this.intervalTimeSpan) {
                    pageTimeSpan = this.intervalTimeSpan;
                }
            }
            viewContext.pageStayTime += pageTimeSpan;
            //计算页面焦点停留时间
            if (this.BL.winFocused) {
                viewContext.focusTime += pageTimeSpan;
            }
            viewContext.pageStayTimeStamp = currDate;
            if (viewContext.pageStayTime >= this.longTime) {
                viewContext.pageStayTime = this.longTime;
            }

            return viewContext;
        },

        /*
        进行可视计算  
        */
        viewableCompute: function () {
            //监控watchArrayPointer数组中的每一个广告位对象
            var i, count;
            for (i = 0, count = this.watchArrayPointer.length; i < count; i++) {
                var watchObj = this.watchArrayPointer[i];
                var watchDom, watchWin = watchObj.win,
                    tempId = watchObj.domId;
                if (watchWin && tempId) {
                    watchDom = watchWin.document.getElementById(tempId);
                }
                //没有获取到DOM元素
                if (!watchDom) {
                    continue;
                }

                //广告块可能在启动监控后添加. 需要初始化广告块的viewContext
                if (!watchObj.viewContext) {
                    var currDate = new Date();
                    watchObj.viewContext = {
                        pageStayTime: 0,
                        pageStayTimeStamp: currDate,
                        inViewTime: 0,
                        inViewTimeStamp: currDate,
                        currViewStatus: false,
                        focusTime: 0,
                        adViewTime: 0,
                        currAdViewStatus: false,
                        adViewTimeStamp: currDate,
                        offlineConditionIndex: 0
                    }
                }

                var isInView = false;
                var isAdView = false;
                if (!this.BL.winFocused) {
                    //当前页面没有获得焦点
                    isInView = false;
                    isAdView = false;
                }
                else {
                    try {
                        //当前页面有焦点
                        var winWidth = this.U.getClientWidth(this.win);
                        var winHeight = this.U.getClientHeight(this.win);
                        var iframePos = this.U.getPosition(tempId, watchWin);
                        var scrollTop = this.U.getScrollTop(this.win);
                        var scrollLeft = this.U.getScrollLeft(this.win);
                        var domWidth = this.U.getOuterWidth(watchDom);
                        var domHeight = this.U.getOuterHeight(watchDom);

                        //长与宽的35%在可视区域内
                        var domTopPos = iframePos.top - scrollTop + domHeight * 0.35;
                        var domLeftPos = iframePos.left - scrollLeft + domWidth * 0.35;
                        isInView = domTopPos > 0 && domTopPos < winHeight;
                        isInView = isInView && (domLeftPos > 0 && domLeftPos < winWidth);

                        //50%广告面积在可视区域内
                        domTopPos = iframePos.top - scrollTop;
                        domLeftPos = iframePos.left - scrollLeft;
                        var domSpace = domWidth * domHeight;
                        var adViewHeight = (winHeight - domTopPos) > domHeight ? domHeight : winHeight - domTopPos;
                        var adViewWidth = (winWidth - domLeftPos) > domWidth ? domWidth : winWidth - domLeftPos;
                        isAdView = adViewHeight * adViewWidth > 0.5 * domSpace ? true : false;
                    }
                    catch (ex) {
                        //页面加载时无法计算.此时均按照不可见处理
                        isInView = false;
                        isAdView = false;
                        continue;
                    }
                    //console.log("isInView:" + isInView);
                    //console.log("isAdView:" + isAdView);
                    //console.log(adViewHeight * adViewWidth);
                    //console.log(0.5 * domSpace);
                }

                //根据计算出来的可见状态, 更新监控对象的viewContext.
                watchObj.viewContext = this.updateViewStatus(watchObj.viewContext, isInView, isAdView);

                //提前计算每一个监控对象的回发数据url, 减少关闭页面事件的计算量
                watchObj.analysisUrl = this.buildAnalysisUrl(this.analysisUrl, watchObj, watchDom);
            }
        },
        /*
        构建回发URL
        */
        buildAnalysisUrl: function (urlpre, watchObj, watchDom) {
            if (!urlpre || !watchObj) {
                return;
            }
            var tempAnalysisUrl = urlpre + "?";
            //添加ui相关的参数
            var uiParamObj = watchObj.uiParamSnap,
                uiParamBuilder = [];
            for (var paramName in this.uiParamMapping) {
                if (paramName && this.uiParamMapping[paramName] && uiParamObj[paramName]) {
                    uiParamBuilder.push(this.uiParamMapping[paramName] + "=" + uiParamObj[paramName]);
                }
            }
            tempAnalysisUrl += uiParamBuilder.join("&");
            //添加viewContext相关参数
            tempAnalysisUrl += "&" + this.U.param(watchObj.viewContext, this.viewContextParamMapping);
            //添加其他用户数据参数, 这些数据会在onload延时函数里计算, 所以可能开始不存在.
            if (!watchObj.clientParam || !watchObj.clientParam.pageRegion) {
                try {
                    this.calculateClientParam(watchObj, watchDom, watchObj.win);
                }
                catch (ex) {}
            }
            if (watchObj.clientParam) {
                tempAnalysisUrl += "&" + this.U.param(watchObj.clientParam, this.clientParamMapping);
            }
            else {
                for (var key in this.clientParamMapping) {
                    if (key && this.clientParamMapping[key]) {
                        tempAnalysisUrl += "&" + this.clientParamMapping[key] + "=";
                    }
                }
            }
            return tempAnalysisUrl;
        },

        /*
        事件函数
        */
        viewOnChange: function () {
            this.viewableCompute();
            if (this.watchArrayPointer[0].viewContext.pageStayTime >= this.longTime) {
                this.windowOnUnload(false);
            }
        },

        /**
        页面加载完毕时执行, 初始化监控数据并启动监控.
        */
        windowOnLoad: function (e) {


            //初始化监控的广告块的viewContext
            var i, count, currDate = new Date();
            for (i = 0, count = this.watchArrayPointer.length; i < count; i++) {

                //viewContext用于存储广告停留时间数据.
                this.watchArrayPointer[i].viewContext = {
                    pageStayTime: 0,
                    pageStayTimeStamp: currDate,
                    inViewTime: 0,
                    inViewTimeStamp: currDate,
                    currViewStatus: false,
                    focusTime: 0,
                    adViewTime: 0,
                    currAdViewStatus: false,
                    adViewTimeStamp: currDate,
                    offlineConditionIndex: 0
                };
            }

            this.intervalStatus = "load"; //更改监控进程的状态
            this.focusSwitch = this.winFocusBlurOnChange(this.win, this.isIEWatchFocus); //开启浏览器焦点监控
            if (!this.U.browser.ie || (this.U.browser.ie && this.U.browser.ie > 6)) {
                this.viewOnChange(); //只有非IE6的版本中，才立刻开始可视计算
            }
            this.intervalId = setInterval(this.U.proxy(this.viewOnChange, this), this.intervalTimeSpan); //开启监控进程
        },

        /**
        页面加载完毕后3秒执行的事件. 用户可能在页面加载完毕后修改广告块的位置.
        此事件主要用于收集用户客户端数据
        */
        windowOnLoadDelay: function (e) {
            //超链接监控功能
            var links = this.win.document.getElementsByTagName("a");
            var linkLength = links.length || 0;
            var iframeLinks = [];
            if (this.U.isInIframe()) {
                iframeLinks = window.document.getElementsByTagName("a");
            }
            var linksCount = linkLength + iframeLinks.length;
            var watchLinks = false;
            if (this.U.browser.ie && this.U.browser.ie <= 7 && linksCount > 500) { //在ie6或7浏览器下, 如果超链接数目大于500, 则不监控超链接
                watchLinks = false;
            }
            else if (linksCount < 1000) { //非IE或IE8(含)以上浏览器, 如果连接数小于1000, 则监控超链接
                watchLinks = true;
            }
            if (watchLinks) {
                for (var i = 0; i < linksCount; i++) {
                    var classObj = this;
                    var dom;
                    if (i - linkLength >= 0 && iframeLinks[i - linkLength]) {
                        dom = iframeLinks[i - linkLength];
                    }
                    else if (links[i]) {
                        dom = links[i];
                    }

                    if (!dom) {
                        continue;
                    }


                    this.U.bind(dom, "click", function () {
                        //处理event对象, 如果出错则终止记录
                        var event, target, targetUrl;
                        var event = window.event ? window.event : arguments[0];
                        if (event) {
                            target = event.target || event.srcElement;
                            if (target && target.href) {
                                targetUrl = target.href;
                            }
                            else {
                                return;
                            }
                        }
                        else {
                            return;
                        }

                        var tempIndex = classObj.lastVisitedUrl.currentIndex;
                        classObj.lastVisitedUrl.paramValue[tempIndex] = {};
                        classObj.lastVisitedUrl.paramValue[tempIndex].url = encodeURIComponent(targetUrl).substring(0, 300);
                        classObj.lastVisitedUrl.paramValue[tempIndex].time = ((new Date()).getTime()).toString();
                        if (tempIndex < classObj.lastVisitedUrl.maxSize - 1) {
                            classObj.lastVisitedUrl.sendIndex = classObj.lastVisitedUrl.currentIndex;
                            classObj.lastVisitedUrl.currentIndex++;
                        }
                        else {
                            classObj.lastVisitedUrl.sendIndex = classObj.lastVisitedUrl.currentIndex;
                            classObj.lastVisitedUrl.currentIndex = 0;
                        }
                    })
                }
            }


            var i, count, currDate = new Date(),
                watchObj, watchDom, watchWin, watchDomId;
            for (i = 0, count = this.watchArrayPointer.length; i < count; i++) {
                var watchObj = this.watchArrayPointer[i];
                //监控对象为空
                if (!watchObj) {
                    continue;
                }
                //获取监控的广告块DOM元素
                watchWin = watchObj.win;
                watchDomId = watchObj.domId;
                if (watchWin && watchDomId) {
                    watchDom = watchWin.document.getElementById(watchDomId);
                }

                //未获取到DOM元素
                if (!watchDom) {
                    continue;
                }

                //开始计算DOM元素的各种数据
                watchObj.clientParam = watchObj.clientParam || {};
                this.calculateClientParam(watchObj, watchDom, watchWin);
            }
        },

        /**
        关闭浏览器时的事件, 发送统计数据.
        调用该函数有两种情况：
        (1)触发window的unload事件.
        参数为beforeunload事件.
        (2)窗口停留时间（pageStayTime）大于2小时，停止监控，直接发送数据.
        参数为false，表示不是因为触发beforeunload事件调用该函数，所以不执行延时关闭分支.
        */
        windowOnUnload: function (e) {
            try {
                //释放资源
                clearInterval(this.intervalId);

                //白名单
                if (document.domain.toLowerCase().indexOf("autohome.com.cn") > -1 || document.domain.toLowerCase().indexOf("sina.com.cn") > -1 
                    || document.domain.toLowerCase().indexOf("pconline.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("pcauto.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("pclady.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("pcgames.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("pcbaby.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("pchouse.com.cn") > -1
                    || document.domain.toLowerCase().indexOf("xcar.com.cn") > -1) {
                    return;
                }

                //如果定时器没有启动, 则不发送数据.
                if (this.intervalStatus !== "run") {
                    this.intervalStatus = "unload";
                    return;
                }
                this.intervalStatus = "unload";

                var i, paramString, count, watchObj, watchDom, mapper;
                this.viewableCompute(); //关闭窗口前，执行一次监控运算。

                for (i = 0, count = this.watchArrayPointer.length; i < count; i++) {
                    watchObj = this.watchArrayPointer[i];
                    if (watchObj && watchObj.analysisUrl && !watchObj.isSended) {
                        watchObj.isSended = true;
                        //var tempImg = document.createElement("img");
                        //document.getElementsByTagName("body")[0].appendChild(tempImg);
                        //tempImg.style.display = "none";
                        if (i == 0) { //添加eclick总数用于统计
                            watchObj.analysisUrl += "&total=" + this.watchArrayPointer.length;
                        }

                        //添加超链接监控数据发送
                        var urlSendIndex = this.lastVisitedUrl.sendIndex;

                        if (urlSendIndex < 0) {
                            urlSendIndex = this.lastVisitedUrl.maxSize - 1;
                            this.lastVisitedUrl.sendIndex = urlSendIndex;
                        }

                        if (this.lastVisitedUrl && this.lastVisitedUrl.paramValue && urlSendIndex < this.lastVisitedUrl.paramValue.length) {
                            watchObj.analysisUrl += "&" + this.lastVisitedUrl.paramUrlName + "1=" + this.lastVisitedUrl.paramValue[urlSendIndex].url;
                            watchObj.analysisUrl += "&" + this.lastVisitedUrl.paramTimeName + "1=" + this.lastVisitedUrl.paramValue[urlSendIndex].time;
                            this.lastVisitedUrl.sendIndex--;
                            urlSendIndex--;

                            if (urlSendIndex < 0) {
                                urlSendIndex = this.lastVisitedUrl.maxSize - 1;
                                this.lastVisitedUrl.sendIndex = urlSendIndex;
                            }
                            //添加两行数据
                            if (this.lastVisitedUrl && this.lastVisitedUrl.paramValue && urlSendIndex < this.lastVisitedUrl.paramValue.length) {
                                watchObj.analysisUrl += "&" + this.lastVisitedUrl.paramUrlName + "2=" + this.lastVisitedUrl.paramValue[urlSendIndex].url;
                                watchObj.analysisUrl += "&" + this.lastVisitedUrl.paramTimeName + "2=" + this.lastVisitedUrl.paramValue[urlSendIndex].time;
                                this.lastVisitedUrl.sendIndex--;
                                urlSendIndex--;
                            }
                        }
                        //tempImg.setAttribute("src", watchObj.analysisUrl);
                        this.U.sendRequestViaImage(watchObj.analysisUrl, this.win);
                    }
                }
                //参数e为beforeunload事件时，调用该分支.
                if (e) {
                    var delayTime = 200;

                    var tempCurrTime = (new Date()).getTime();
                    var tempEndTime;
                    if (this.U.browser.ie) {
                        tempEndTime = tempCurrTime + delayTime;
                        while (tempEndTime > tempCurrTime) {
                            tempCurrTime = (new Date()).getTime();
                        }
                    }
                    else {
                        var count = 100000;
                        for (var i = 0; i < count; i++) {}
                        tempEndTime = (new Date()).getTime();
                        count = 100000 * delayTime / (tempEndTime - tempCurrTime);
                        count = count > 10000000 ? 10000000 : count;
                        for (var i = 0; i < count; i++) {}
                    }
                }
            }
            catch (ex) {
            }
        },

        //获取焦点和失去焦点事件, 如果为所有元素绑定了focus和blur事件，则返回true
        winFocusBlurOnChange: function (win) {
            var result = false,
                win = win || this.win;

            //winFocused属性标识页面是否获得了焦点.true标识页面有焦点.false表示页面没有交点.
            this.BL.winFocused = true;

            //获取焦点时的事件
            var allDomOnFocus = this.U.proxy(function (e) {
                this.BL.winFocused = true;
            }, this);

            //失去焦点时的事件
            var allDomOnBlur = this.U.proxy(function (e) {
                this.BL.winFocused = false;
            }, this);

            //在IE下, 页面是否获取焦点没有准确的事件可以参考.
            //所以如果isIEWatchFocus为true(开启IE焦点监控), 并且页面性能允许(DOM数&获取所有DOM的花费时间)
            //则开启IE焦点监控.否则在IE下不监控浏览器的焦点.
            if (this.U.browser.ie || this.U.browser.maxthon) {
                /*
                var startTimeStamp = (new Date()).getTime();
                var allDomElement = document.querySelectorAll ? document.querySelectorAll("*") : document.getElementsByTagName("*");
                var count = allDomElement ? allDomElement.length : 0;
                var timeStamp = (new Date()).getTime() - startTimeStamp;
                this.BL.performanceTime = timeStamp;
                this.BL.domNum = allDomElement.length;
                if (timeStamp < 200 && this.BL.domNum < 2000) {//如果页面效率过低，则不考虑页面切换的情况。暂时都设置为false。
                    for (var i = 0; i < count; i++) {
                        this.U.bind(allDomElement[i], "focus", allDomOnFocus);
                        this.U.bind(allDomElement[i], "blur", allDomOnBlur);
                    }
                    result = true;
                }
                */

                this.U.bind(win, "focusin", allDomOnFocus);
                this.U.bind(win, "focusout", allDomOnBlur);
                result = true;
            }
            else { //FF, Chrome等标准浏览器支持直接使用window的focus和blur事件
                this.U.bind(win, "focus", allDomOnFocus);
                this.U.bind(win, "blur", allDomOnBlur);
                result = true;
            }
            return result;
        },
        /**
        获取在当前window对象上的唯一实例
        */
        getInstance: function () {
            if (!this.instances || this.instances.length < 1) {
                this.instances = [];
                var viewWatchObj = this.G.create(this);
                this.instances.push(viewWatchObj);
            }
        }
    };

    //注册类
    G.registerClass(ViewWatchClass);
})(window[___baseNamespaceName]);
﻿///@import BaiduCproNamespace
///@import BaiduCproNamespace.Utility

(function (G) {

    //声明类. dynamicFloatAds标识一个悬停广告对象.
    var dynamicFloatAds = {
        fullName: "$baseName.UI.DynamicFloatAds",
        version: "1.0.0",
        register: function () {
            this.G = G.using("$baseName", this.win);
            this.U = G.using("$baseName.Utility", this.win);
        },

        uiParams: null,
        initialize: function (option) {
            this.canFixed = this.U.canFixed();
            this.xuantingRoofAttribute = "baiduCproXuantingRoof";
            this.xuantingId = option.xuantingId;
            this.xuantingIframeId = option.xuantingIframeId;
      			this.topSpace = 5;
      			this.xuantingTop = this.topSpace;
      			this.xuantingDom = this.U.g(this.xuantingId);
            this.xuantingCloseButton = this.U.g(option.xuantingCloseButtonId);
			this.xuanting4CloseButtonId = this.U.g(option.xuanting4CloseButtonId);
      			this.dockTo = option.dockTo;
      			this.slotId = option.slotId;
            this.jk = option.jk || 0;
            this.closeFor = option.closeFor || 0;
            if(this.closeFor < 0){this.closeFor = 0;}
            var cookieKey = 'bd_close_' + this.slotId;
      			var cookieValue = this.U.getCookieRaw(cookieKey, this.win);
      			this.cookieKey = cookieKey;
      			if(this.dockTo){
      			    this.animDuration = 500;  
      			    this.animRunning = false;
      			    this.visible = true;
      			    this.delayIn = option.delayIn || 0;
      			    this.delayOut = option.delayOut || 0;
      			    if(this.delayIn < 0){this.delayIn = 0;}
      			    if(this.delayOut < 0){this.delayOut = 0;}
      			    this.sessionSync = option.sessionSync || false;
      			    if(this.sessionSync){
      			      this.closeFor = 0;  
      			    }
      			    this.userClosed = !!cookieValue;
      			}
            this.xuanting = option.xuanting; //xuanting=1表示页面中的悬停，xuanting=2表示顶部悬停，xuanting=3表示底部悬停
            var iframe= this.U.g(this.xuantingIframeId);
            if(this.xuanting == 0){
              if(iframe){
		            var _src = iframe.getAttribute('_src');
		            if(_src){
		              iframe.setAttribute('src',iframe.getAttribute('_src'));
		            }
                //iframe.removeAttribute('_src');
              }
              return;  
            }else if(isNaN(this.xuanting)){
              iframe.parentNode.removeChild(iframe);
              return;
            }
            this.xuantingDomWidth = option.xuantingDomWidth?option.xuantingDomWidth:0;
            this.xuantingDomHeight = option.xuantingDomHeight?option.xuantingDomHeight:0;
            this.clientWidth = this.U.getClientWidth(window);
            this.clientHeight = this.U.getClientHeight(window);
            this.mobile = option.mobile || false;
        },
        initializeDOM: function(args){
          if(this.mobile){
               return;
          }
          if(+this.xuanting){
            var xuanting = this.xuanting,
                xuantingDom = this.xuantingDom,
                U = this.U;
            var bkPosX = 0, bkPosY = 0, dockTo = '', bkId = 1;
            if(xuanting == 2){
                bkPosX = -30;
                dockTo = 'top';
                bkId = 2;
            }else if(xuanting == 3){
                bkPosX = 0;  
                dockTo = 'bottom';
                bkId = 1;
            }else if(xuanting != 1 && xuanting != 0){
                if(this.xuantingDom){
                  this.xuantingDom.style.display = 'none';
                  return;  
                }
            }
            //preload the background images
            for(var bkIndex = 1;bkIndex <= 2;bkIndex++){
              (function(i){
                var rndKey = 'bkimg_'+(+new Date()) + Math.floor(Math.random()*100000);
                var bkImg = window[rndKey] = new Image();
                bkImg.onload = bkImg.onerror = function(){
                  bkImg.onload = bkImg.onerror = null;
                  window[rndKey] = null;
                  bkImg = null;
                };
                bkImg.src = 'http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk'+i+'.png';
              })(bkIndex);
            }
            if(dockTo && !this.canFixed){
              if(this.xuantingDom){
                document.body.appendChild(this.xuantingDom);  
              }
            }
            var canToggle = (xuanting == 2 || xuanting == 3);
            var displayString = (xuanting > 1)?'display:none;':'';
            var widthString = (xuanting == 1)?'width:'+this.xuantingDomWidth+'px;':'';
            if(dockTo && !this.canFixed){
              widthString = U.getClientWidth(window) + 'px';  
            }
            var positionString;
            if(U.canFixed()){
                if (xuanting == 2) {
                    positionString = "position:fixed;top:0;width:100%;"
                } else {
                    if (xuanting == 3) {
                        positionString = "position:fixed;bottom:0;width:100%;"
                    }
                }
            }else{
                if (xuanting == 2) {
                    positionString = "position:absolute;top:0;width:100%;"
                } else {
                    if (xuanting == 3) {
                        var positionTop =U.getScrollTop(window)+ U.getClientHeight(window) - this.xuantingDomWidth;
                        positionString = "position:absolute;top:"+positionTop+"px;width:100%;"
                    }
                }
            }
            var ie6Hack4TB = '';
            if(this.U.browser.ie && this.U.browser.ie < 7){
                ie6Hack4TB = "_background-image:none;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk"+bkId+".png');";
            }
            if(this.xuantingDom){
              var toggleButtonString = canToggle ? '<div id="'+this.xuantingId+'Toggle" style="z-index:2147483646;cursor:pointer;position:absolute;right:0;'+dockTo+':0;width:40px;height:100%;background-color:#3f3f3f;"><div style="width:20px;height:22px;position:absolute;top:50%;margin-top:-11px;left:50%;margin-left:-10px;background:no-repeat url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk'+bkId+'.png);'+ie6Hack4TB+'"></div></div>' :'';
              var bkString = canToggle ? '<div id="'+this.xuantingId+'Bk" style="'+dockTo+':0;left:0;position:absolute;width:100%;height:100%;background-color:#666;-moz-opacity:.6;filter:alpha(opacity=60);opacity:.6;"></div>': '';
              var iframeStyleString = 'position:relative;margin:5px 0;';
              xuantingDom.insertAdjacentHTML('afterBegin',bkString + toggleButtonString);
              this.xuantingIframe = this.xuantingDom.getElementsByTagName('IFRAME')[0];
            }else{
              this.xuantingIframe = this.U.g(this.xuantingIframeId);
            }
            
            if(canToggle){
                this.xuantingToggleButton = document.getElementById(this.xuantingId + 'Toggle');
      			    this.xuantingToggleButtonArrow = this.xuantingToggleButton.getElementsByTagName('DIV')[0];
      			    /*
      			    if (U.browser.ie >= 7) {
                    this.xuantingToggleButtonArrow.style.filter = '';
                }
                */
      			    this.xuantingBk = document.getElementById(this.xuantingId + 'Bk');
                if(dockTo){
                    xuantingDom.setAttribute('dockTo',dockTo);
                }
                this.xuantingBk.style.height = (this.xuantingDomHeight + 10) + 'px';
                this.xuantingToggleButton.style.height = (this.xuantingDomHeight + 10) + 'px';
                var wrapStyleString = displayString + widthString + 'height:'+(this.xuantingDomHeight + 10)+'px;right:0;z-index:2147483646;text-align:center;font-size:0;_overflow-y:hidden;'+positionString;
                xuantingDom.style.cssText = wrapStyleString;
                this.xuantingIframe.style.cssText = iframeStyleString;
            }
            this.setPositionOnChange();
          }
          
        },

        initializeEvent: function (options) {
          //在页面DOM准备完毕时, 初始化悬停广告块.
          this.U.ready(this.U.proxy(this.onReadyHandler, this));
          //悬停逻辑
      		this.U.bind(this.win, "scroll", this.U.proxy(this.setPositionOnChange, this));
      		this.U.bind(this.win, "resize", this.U.proxy(this.setPositionOnChange, this));
			if(this.mobile){
				var resizeEvt = "onorientationchange" in window ? "orientationchange" : "resize";
				this.U.bind(this.win, resizeEvt, this.U.proxy(this.setPositionOnChange, this));
			}
      		//点击悬停的按钮
      		if(this.xuantingToggleButton){
      			this.U.bind(this.xuantingToggleButton, "click", this.U.proxy(this.toggleVisibility, this));
      		}
          //点击悬停关闭按钮
          if(this.xuantingCloseButton){
              this.U.bind(this.xuantingCloseButton, "click", this.U.proxy(this.xuantingCloseButtonHandler, this));
          }
		    if(this.xuanting4CloseButtonId){
				this.U.bind(this.xuanting4CloseButtonId, "click", this.U.proxy(this.xuanting4CloseButtonHandler, this))
			}
        },

		onReadyHandler : function(){
            var xuantingDom = this.xuantingDom = this.U.g(this.xuantingId);
            if (xuantingDom) {
                xuantingDom.setAttribute("baiduxuanting", this.xuantingRoofAttribute);
            }
            this.xuantingIframe = this.xuantingIframe || this.U.g(this.xuantingIframeId);
			if(this.dockTo){
			    var that = this;
			    if(!this.userClosed){
  			   //if(this.delayIn){
  			        setTimeout(function(){
  			            //set the iframe's src -- the actual request
  			            var iframe = that.xuantingIframe;
  			            var _src = iframe.getAttribute('_src');
  			            if(_src){
  			              iframe.setAttribute('src',iframe.getAttribute('_src'));
  			            }
  			            //iframe.removeAttribute('_src');
  			            if(that.xuantingDom){
  			              that.xuantingDom.style.display = 'block';  
  			            }
  			        },this.delayIn);  
  			  //}
  			        if(this.delayOut){
  			            setTimeout(function(){
  			            that.xuantingDom.style.display = 'none';
  			            if(that.xuantingDom){
  			              xuantingDom.parentNode.removeChild(xuantingDom);
  			            }
  			           },this.delayIn + this.delayOut);  
  			        }
			    }else{
			       xuantingDom.parentNode.removeChild(xuantingDom);  
			    }
			}
		},
        //点击关闭按钮时，添加关闭时间控制，在这个时间范围内，不在展现广告
        setCloseCookie:function(){
            var options = {
                path: ''  
            };
            if(this.closeFor){
                var t = new Date();
                t.setTime(t.getTime() + this.closeFor);  
                options.expires = t;   
                }
            this.U.setCookieRaw(this.cookieKey, 1, options);
        },
        
        xuantingCloseButtonHandler:function(){
            var xuantingDom = this.U.g(this.xuantingId);
            xuantingDom.parentNode.removeChild(xuantingDom);

            this.U.removeCookie(this.cookieKey);
            if (this.sessionSync || this.closeFor) {
                this.setCloseCookie();
            }
            
            document.body.removeChild(this.U.g(this.xuantingIframeId+"Wrap_placeholder"));
        },
		xuanting4CloseButtonHandler:function(){
			var xuantingIframe = this.U.g(this.xuantingIframeId);
			if(xuantingIframe.parentNode.style.visibility == "hidden"){
				xuantingIframe.parentNode.style.visibility = "visible";
				this.xuanting4CloseButtonId.style.backgroundImage = "url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/lu_shouqi.png)";
				this.xuanting4CloseButtonId.innerHTML = "\u6536\u8D77";
			}else{
				xuantingIframe.parentNode.style.visibility = "hidden";
				this.xuanting4CloseButtonId.style.backgroundImage = "url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/lu_logo.png)";
				this.xuanting4CloseButtonId.innerHTML = "";
			}
		},
        toggleVisibility: function(){
            if(this.visible){
                this.hide();
            }else{
                this.show();  
           };
        },
        setVisibility: function(visible){
            if(this.animRunning){
                return;  
            }
            this.animRunning = true;
            var xtDom = this.xuantingDom,
            U = this.U,
            xtBk = this.xuantingBk,
            xtIframe = this.xuantingIframe,
            dockTo = this.dockTo,
            size = xtDom.offsetHeight,
            dur = this.animDuration,
            itvl = Math.round(dur/size),
            times = 0,
            that = this;
            if(visible){
                xtDom.style.width = '100%';  
            }
            var startTime = +new Date();
            var timer = setInterval(function(){
                //times++;
                var now = +new Date();
                var diff = now - startTime;
                times = Math.round(diff/itvl);
                var value = times;
                var val = value;
                if(visible){
                    val = size - value;  
                }
                xtBk.style[dockTo] = -val + 'px';
                xtIframe.style[dockTo] = -val + 'px';
            
                if(value >= size){
                    that.animRunning = false;
                    that.visible = visible;
                    var arrowUp = (visible && dockTo === 'top') || (!visible && dockTo === 'bottom');
                    if(arrowUp){
                        if (U.browser.ie && (U.browser.ie < 7)) {
                            that.xuantingToggleButtonArrow.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk2.png\');';
                            //that.xuantingToggleButtonArrow.style.backgroundImage = 'none !important';
                        }else{
                            that.xuantingToggleButtonArrow.style.backgroundImage = 'url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk2.png)';
                            
                        }
                        //that.xuantingToggleButtonArrow.style.backgroundPosition = '-30px 0';  
                    }else{
                        if (U.browser.ie && (U.browser.ie < 7)) {
                            that.xuantingToggleButtonArrow.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk1.png\');';
                            //that.xuantingToggleButtonArrow.style.backgroundImage = 'none !important';
                        }else{
                            that.xuantingToggleButtonArrow.style.backgroundImage = 'url(http://cpro.baidustatic.com/cpro/ui/noexpire/img/toggle_btn_bk1.png)';
                        }
                        //that.xuantingToggleButtonArrow.style.backgroundPosition = '0 0';
                    }
                    /*
                    if(!visible){
                        xtDom.style.width = '40px';  
                    }
                    */
                    //avoid overly done
                    val = size;
                    if(visible){
                        val = 0;
                    }
                    xtBk.style[dockTo] = -val + 'px';
                    xtIframe.style[dockTo] = -val + 'px';
                    clearInterval(timer);  
                }
            },itvl);
        },
        show: function(){
            if(this.sessionSync){
                this.U.removeCookie(this.cookieKey);
            }
            this.setVisibility(true);
        },
        hide: function(){
            if(this.sessionSync || this.closeFor){
                this.setCloseCookie();
            }
            this.setVisibility(false);
        },
        /**
        鼠标滚动或者页面resize时的事件处理函数
        */
        setPositionOnChange: function (e) {
            //update the dimensions in case the window's dimensions were changed
            this.clientWidth = this.U.getClientWidth(window);
            this.clientHeight = this.U.getClientHeight(window);
            if(this.dockTo && !this.mobile){
              if(this.xuantingDom){
                  this.xuantingDom.style.width = this.clientWidth + 'px';
              }
              if(this.xuantingBk){
                  this.xuantingBk.style.width = this.clientWidth + 'px';
              }
            }
            if (this.setPositionTimer) {
                clearTimeout(this.setPositionTimer);
            }
            this.setPositionTimer = setTimeout(this.U.proxy(this.onScrollHandler, this), 5);
        },
            
            onScrollHandler : function(){
                var bodyPosition = this.U.getStyle(document.body, "position").toString();
                
                var xuantingDom = this.xuantingDom || document.getElementById(this.xuantingId);
                if(!xuantingDom){
                    return;
                }
                if(this.U.canFixed()){
                    xuantingDom.style.zIndex = 2147483646;
                    if(this.xuanting==1){
                        if(xuantingDom.style.position == "fixed"){
                            this.adjustLeft();
                            if(this.backToHolder()){
                                xuantingDom.style.cssText = null;
                                this.removeAdPlaceHolder();
                            }
                        }else{
                            var _top = this.touchRoof();
                            if(_top){
                                this.createAdPlaceHolder();
                                //less then float
                                xuantingDom.style.position = "fixed";
                                xuantingDom.style.top = _top + "px";
                                this.adjustLeft();
                            }
                        }
                        
                    }/*else if(this.xuanting==2){
                        xuantingDom.style.position = "fixed";
                        xuantingDom.style.top = "0";
                        //xuantingDom.style.left = (this.clientWidth - this.xuantingDomWidth)/2 + "px";
                    }else if(this.xuanting==3){
                        xuantingDom.style.position = "fixed";
                        xuantingDom.style.bottom = "0";
                        //xuantingDom.style.left = (this.clientWidth - this.xuantingDomWidth)/2 + "px";
                    }*/
                    if(this.xuanting ==4){
						if(!this.xuanting4bottom){
							this.xuanting4bottom = xuantingDom.style.bottom.replace("px","");
						}
						if(this.U.getClientHeight() < 361){
							xuantingDom.style.bottom = Math.min(60,this.xuanting4bottom) + "px"
						}else{
							xuantingDom.style.bottom = this.xuanting4bottom+ "px";
						}
					}
                
                    
                }else {
                    this.setPosition(this.xuantingId);
                }
            },
		
		/**
		 *	为对应id的悬停广告iframe创建占位块
		 *
		 *	@param xuantingId 广告位iframe对应id
		 *	@return 创建成功返回true，否则返回false
		 */
		createAdPlaceHolder : function(xuantingId) {
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
				var holderId = xuantingId + "placeholder";
			}else {
				var xuantingDom = this.xuantingDom || document.getElementById(this.xuantingId);
				var holderId = this.xuantingId + "placeholder";
			}
			
			var holderNode = document.createElement("div");
			holderNode.id = holderId;
			if(holderNode.align){
				holderNode.align = xuantingDom.getAttribute("align");
			}
			//todo 不存在attribute时的判断
			holderNode.style.width = xuantingDom.getAttribute("width")+"px";
			holderNode.style.height = xuantingDom.getAttribute("height")+"px";
			holderNode.style.margin = "0";
			holderNode.style.padding = "0";
			holderNode.style.background = "none";
			holderNode.style.border = "none";
			
			(xuantingDom.parentNode).insertBefore(holderNode, xuantingDom);
			
			return true;
		},

		/**
		 *	去除对应id的悬停广告iframe占位块
		 *
		 *	@param adIframeId 广告位iframe对应id
		 *	@return 删除成功返回true，否则返回false
		 */
		removeAdPlaceHolder : function(xuantingId) {
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
				var holderId = xuantingId + "placeholder";
			}else {
				var xuantingDom = this.xuantingDom || document.getElementById(this.xuantingId);
				var holderId = this.xuantingId + "placeholder";
			}
			var holder = document.getElementById(holderId);
			
			(holder.parentNode).removeChild(holder);
			holder = null;
			
			return true;
		},

		/**
		 *	判断元素是否到悬停位置
		 *
		 *	@return 悬停位置top
		 */
		touchRoof : function(xuantingId) {
			var _space = this.topSpace;
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
			}else {
				var xuantingDom = this.xuantingDom || document.getElementById(this.xuantingId);
			}
			
			var adOffset = this.getAdPosition(xuantingDom);
			
			if(adOffset.top < _space){
				return _space;
			}else {
				return false;
			}
		},

		/**
		 *	判断元素是否到悬停位置（绝对定位）
		 *
		 *	@return 悬停位置top
		 */
		touchRoof_abs : function(xuantingId) {
			var _space = this.topSpace;
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
			}else {
				var xuantingDom = this.xuantingDom || document.getElementById(this.xuantingId);
			}
			
			var adOffset = this.getAdPosition(xuantingDom);
			
			if(adOffset.top < _space){
				return _space;
			}else {
				return false;
			}
		},
		
		/**
		 *	广告位是否回到悬停前的位置
		 *
		 *	@return 
		 */
		backToHolder : function(xuantingId) {
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
				var holder = document.getElementById(xuantingId + "placeholder");
			}else {
				var xuantingDom = this.adDom || document.getElementById(this.xuantingId);
				var holder = document.getElementById(this.xuantingId + "placeholder");
			}
			
			if(xuantingDom&&holder){
				var holderTop = this.getAdPosition(holder).top_abs;
				var adTop = this.getAdPosition(xuantingDom).top_abs;
				if(adTop <= holderTop){
					return true;
				}
			}
			return false;
		},

		adjustLeft : function(xuantingId) {
			if(xuantingId){
				var xuantingDom = document.getElementById(xuantingId);
				var holder = document.getElementById(xuantingId + "placeholder");
			}else {
				var xuantingDom = this.adDom || document.getElementById(this.xuantingId);
				var holder = document.getElementById(this.xuantingId + "placeholder");
			}
			
			if(xuantingDom&&holder){
				var holderLeft = this.getAdPosition(holder).left;
				xuantingDom.style.left = holderLeft + "px";
			}
		},

		getAdPosition : function(xuantingDom) {
			//return adIframe.getBoundingClientRect();
			
			var position_abs = this.U.getPositionCore(xuantingDom);
			var scrollLeft = this.U.getScrollLeft(window);
			var scrollTop = this.U.getScrollTop(window);
			var adsWidth = this.U.getOuterWidth(xuantingDom, false);
			var adsHeight = this.U.getOuterHeight(xuantingDom, false);
			
			return {
				//相对屏幕位置
				top: position_abs.top - scrollTop,
				bottom: position_abs.top - scrollTop + adsHeight,
				left: position_abs.left - scrollLeft,
				right: position_abs.left - scrollLeft + adsWidth,
				//页面绝对位置
				top_abs: position_abs.top,
				bottom_abs: position_abs.top + adsHeight,
				left_abs: position_abs.left,
				right_abs: position_abs.left + adsWidth
			};
		},

		
		/**
        为不支持fix属性浏览器下DOM元素定位
        */
		setPosition : function(xuantingId) {
			var scollTop = this.U.getScrollTop(window);
			var bodyPosition = this.U.getStyle(document.body, "position").toString();
			var bodyPos = this.U.getPositionCore(document.body);
			var bodyLeft = bodyPos.left;
			var bodyTop = bodyPos.top;
            var domElement = document.getElementById(xuantingId);
            if(!domElement){
            //avoid null pointer error!!
              return;  
            }
            domElement.style.position = "absolute";
            domElement.style.zIndex = 2147483646;
            if(this.xuanting == 1){
                if(document.getElementById(xuantingId + "placeholder")){                   
                    var holderDiv = document.getElementById(xuantingId + "placeholder");
                    var basePosition = this.getAdPosition(holderDiv);
                    
                    //悬停定位
                    domElement.style.top = scollTop + this.xuantingTop +"px";
                    domElement.style.left = basePosition.left_abs + "px";
                    if(bodyPosition == "relative"){
                        domElement.style.top = scollTop + this.xuantingTop - bodyTop + "px";
                        domElement.style.left = basePosition.left_abs - bodyLeft + "px";
                    }
                    domElement.style.visibility = "visible";
                    
                    var adPosition = this.getAdPosition(domElement);
                    
                    if(basePosition.top_abs >= adPosition.top_abs){
                        //去除悬停状态
                        domElement.parentNode.removeChild(domElement);
                        (holderDiv.parentNode).insertBefore(domElement, holderDiv);
                        (holderDiv.parentNode).removeChild(holderDiv);
                        holderDiv = null;
                        domElement.style.cssText = null;
                    }
                    return;
                }
                
                //悬停上边界
                var _top = this.touchRoof_abs(xuantingId);
                if(_top){
                    this.xuantingTop = _top;
                    this.createAdPlaceHolder(xuantingId);
                    
                    var holderDiv = document.getElementById(xuantingId + "placeholder");
                    var basePosition = this.getAdPosition(holderDiv);
                    
                    domElement.parentNode.removeChild(domElement);
                    document.body.appendChild(domElement);
                    
                    //位于悬浮广告下层
                    domElement.style.zIndex = 2147483646;
                    domElement.style.top = scollTop + this.xuantingTop +"px";
                    domElement.style.left = basePosition.left_abs + "px";
                    if(bodyPosition == "relative"){
                        domElement.style.top = scollTop + this.xuantingTop - bodyTop + "px";
                        domElement.style.left = basePosition.left_abs - bodyLeft + "px";
                    }
                    domElement.style.visibility = "visible";
                    
                    domElement.style.position = "absolute";
                }
            }else if(this.xuanting == 2){
                 domElement.style.top = scollTop+ "px";
                 //domElement.style.left = (this.clientWidth - this.xuantingDomWidth)/2 + "px";
                 
            }else if(this.xuanting ==3){
                    domElement.style.top = scollTop + this.clientHeight - (this.xuantingDomHeight + 10) + "px";
                    //domElement.style.left = (this.clientWidth - this.xuantingDomWidth)/2 + "px"
            }else if(this.xuanting ==4){
					if(!this.xuanting4bottom){
						this.xuanting4bottom = xuantingDom.style.bottom.replace("px","");
					}
					if(this.U.getClientHeight()<361){
						xuantingDom.style.bottom = Math.min(60,this.xuanting4bottom) + scollTop + "px"
					}else{
						xuantingDom.style.bottom = this.xuanting4bottom+ scollTop +"px";
					}
			}
		}
      
    }

    //注册类
    G.registerClass(dynamicFloatAds);
})(window[___baseNamespaceName]);

/**
名词解释:
union广告位:     是指在网盟平台申请广告位, 在网站上直接使用网盟检索端脚本
广告管家广告位: 是指通过广告管家投放的广告位, 由广告管家的脚本调用网盟检索端脚本出广告 
unionSlotData:    union传递的原始广告参数数据格式, 形如:{ "u207621" : { _html:"cpro_h=90|cpro_w=760..."}}
unionSlotParam:    将unionSlotData格式化后的对象, 使用key/value形式保存各个参数.
uiParam:        调用后台UI接口出广告时的参数对象
mapping:        因为unionSlotParam的参数名称, 与最后传递给UI的参数名不同, 所以使用mapping对象保存参数名的映射关系.
*/
(function (G) {

    //创建命名空间别名
    var G = G;
    var U = G.using("$baseName.Utility");
    var BL = G.using("$baseName.BusinessLogic");
    
    var unionSlotData;                                      //广告位数据对象 格式为:{"u123456":{_html:"cpro_client=sequel_cpr|..."}}
    var jsFile = "c1";                                 //脚本文件类型: c, cc, cf, f. 在编译时确定.
    var displayType = "inlay";                       //显示类型. inlay:嵌入式, float:悬浮. 目前手工修改.以后在编译时确定.
    var unionCreateSlotName = "BAIDU_CPRO_SETJSONADSLOT";   //union创建广告块函数的名称.此函数挂接在window上.
    var isUnionPreview = false;                             //是否是联盟预览
    BL.randomArray.push(Math.random()*1000000);             //随机数用于生成前端检索id
	//用于向指定页面中动态添加脚本，并在脚本加载完成后执行回调函数。
	var	addScript = function (doc, src, cb) {
		var s = doc.createElement("script");
		s.type = "text/javascript";
		s.async = true;
		if (cb) {
			s.onload = cb;
			s.onreadystatechange = function () {
				(s.readyState === "loaded" || s.readyState === "complete") && cb();
			}
		}
		s.src = src;
		doc.body.insertBefore(s, doc.body.firstChild);
	}
    //回调函数, 从union广告位接口获取到广告位数据后调用
    var unionCreateSlot = window[unionCreateSlotName] = function(unionSlotData, asynDomID) {
		//品牌广告逻辑
		var tmpKey;
		for (tmpKey in unionSlotData) {
			if (unionSlotData.hasOwnProperty(tmpKey)) {
				var tmpData = unionSlotData[tmpKey];
				break
			}
		}
		if (tmpData._isMlt && tmpData._isMlt == 3) {
			//品牌广告通过网盟异步接口投放
			var wrapperId = asynDomID || "cpro_" + tmpKey;
			if (!U.g(wrapperId)) {
				wrapperId = "baiduAdsInlay" + Math.floor(Math.random() * 10000000000000000);
				document.write('<div id="' + wrapperId + '"></div>');
			} else {
				U.g(wrapperId).innerHTML = "";
			}
			window.BAIDU_CLB_SLOTS_MAP = window.BAIDU_CLB_SLOTS_MAP || {};
			window.BAIDU_CLB_SLOTS_MAP[tmpKey] = tmpData;
			if (window.BAIDU_DAN_showAdArray) {
				//已加载或正在加载品牌广告投放脚本
				window.BAIDU_DAN_showAd ? window.BAIDU_DAN_showAd(tmpKey, wrapperId) : window.BAIDU_DAN_showAdArray.push([tmpKey, wrapperId]);
			} else {
				//未加载过且未开始加载品牌广告投放脚本
				window.BAIDU_DAN_showAdArray = window.BAIDU_DAN_showAdArray || [];
				window.BAIDU_DAN_showAdArray.push([tmpKey, wrapperId]);
				addScript(document, "http://cbjs.baidu.com/js/dn.js", function() {
					while (window.BAIDU_DAN_showAdArray.length) {
						var tmp = window.BAIDU_DAN_showAdArray.shift();
						window.BAIDU_DAN_showAd(tmp[0], tmp[1])
					}
				});
			}
			return
		}
		
        //网盟广告逻辑
        var unionSlotParams = {};                    //广告位参数对象
        var userOpenApiParams = null;                //用户开放API传入的广告位参数
        var slotParams = {};                        //合并用户开放API后的广告位参数对象
        var mapping = {};                            //广告位参数与UI接口参数的映射关系表.    
        var uiParams = {};                            //UI接口参数集合 
        var useUserOpenApi = 0;                        //是否使用了用户开放API        
        BL.randomArray.push(Math.random()*1000000); //随机数用于生成前端检索id
        
        //格式化广告位数据, 转换成广告位参数对象
        unionSlotParams = BL.parseSlotDataFromUnion(unionSlotData);
        
        //获取从用户开放API获取到的数据
        userOpenApiParams = BL.getSlotDataFromUserOpenApi();
        
        //合并用户开放API数据, 并记录是否使用.
        if(userOpenApiParams){
            useUserOpenApi = 1;
            slotParams = U.extend(unionSlotParams, userOpenApiParams);
        }
        else{
            slotParams = unionSlotParams;
        }  

        //创建UI参数对象.
        uiParams = G.create(BL.Param, {displayType:displayType, currentWindow: window,  timeStamp: (new Date()).getTime()});        
        
        //创建广告位参数到UI参数的映射表
        mapping = BL.Param.getSlot2UIMapping(uiParams);    
        
        //将广告位参数合并到UI参数
        uiParams = BL.Param.mergeSlot2UI(uiParams, slotParams, mapping);    
        uiParams.set("js", jsFile);
        if(useUserOpenApi){
            uiParams.set("c01", 1);
        }    
        
        //获取用户开放样式API
        var styleApiParamString = BL.getStyleApi(uiParams.get('tu'), uiParams, slotParams, mapping );   
        
        //判断是否是异步加载, 并且获取到异步加载的外围容器
        var cproAdWrapId = asynDomID || 'cpro_'+ uiParams.get('tu');
        var cproAdWrap = U.g(cproAdWrapId,window);
        var isAsync = cproAdWrap ? true : false;
        
        //预览与非预览的处理
        var iframeWidth = uiParams.get("rsi0");
        var iframeHeight = uiParams.get("rsi1");
        var slotId = uiParams.get('tu');
        //特殊处理iframe的宽高
        if( window["cproStyleApi"] && slotId && window["cproStyleApi"][slotId]){
            if( window["cproStyleApi"][slotId].conW ){
                iframeWidth = parseInt(window["cproStyleApi"][slotId].conW);
            }
            if( window["cproStyleApi"][slotId].conH ){
                iframeHeight = parseInt(window["cproStyleApi"][slotId].conH);
            }
        }
        var cpro_at = uiParams.get("at");
        var cpro_at_string = uiParams["at"]._value;
        var cpro_template = uiParams.get("tn").toString();      
        
        if (BL.isPreview(iframeWidth, iframeHeight, displayType , cpro_at)) { //预览, 调用union端的预览脚本
            if(isAsync){//预览-异步加载
                window.cproPreviewArray = window.cproPreviewArray || [];                
                window.cproPreviewArray.push({
                    domId  : cproAdWrapId,
                    template: cpro_template,
                    width  : iframeWidth.toString(),
                    height : iframeHeight.toString(),
                    at     : cpro_at_string
                });
                var scr = document.createElement("SCRIPT");
                scr.setAttribute('type', 'text/javascript');
                scr.setAttribute('src', "http://cpro.baidu.com/cpro/ui/inlayPreview.js");
                //scr.setAttribute('src', "http://wm.baidu.com/preview/preview_asyn.js");               
                var tempScriptElement = document.getElementsByTagName('script')[0];
                tempScriptElement.parentNode.insertBefore(scr, tempScriptElement);          
            }
            else{//预览-同步加载
                window.cpro_isSyncPreview = true;
                window.cpro_template = uiParams.get("tn").toString();
                window.cpro_w = iframeWidth.toString();
                window.cpro_h = iframeHeight.toString();
                window.cpro_at = uiParams["at"]._value;         
                document.write('<script type="text/javascript" language="javascript" src="http://cpro.baidu.com/cpro/ui/inlayPreview.js"></script>');
                //document.write('<script type="text/javascript" language="javascript" src="http://wm.baidu.com/preview/preview.js"></script>');
            }
        } 
        else if (tmpData._isMlt && tmpData._isMlt === 4) {//ADX流量的广告
			//ADX广告
			//创建UI参数对象.
			var qn = tmpData.qn || '';
			uiParams.jk._value = qn;
			uiParams.jk._init = true;
            //广告个数判断. 一个页面上每种展现类型广告块有个数限制.
            if( BL.checkAdsCounter(displayType, window, uiParams.get("tn"))){
                return;
            }
			//绘制广告块
            //===bfp ziqiu.zhang
            var iframeHtmlTemplate;
            if(!tmpData.qn){
                //无qn时, 画一个空div
                iframeHtmlTemplate = '<div style="width:{iframeWidth};height:{iframeHeight}"></div>'
            }
            else{
                iframeHtmlTemplate = '<div style="display:none">-</div>'
                                + ' <iframe id="{iframeId}" src="{adxServiceUrl}?{paramString}"'
                                + ' width="{iframeWidth}" height="{iframeHeight}" align="center,center" marginwidth="0" '
                                + ' marginheight="0" scrolling="no" frameborder="0" allowtransparency="true" ></iframe>';
            }

             //判断南北机房, 上线时修改
            var adxServiceUrl = "";
            if(tmpData._location.toLowerCase() === "e"){
                adxServiceUrl="http://esnippet.pos.baidu.com/bfp/snippetcacher.php";
            }
            else{
                adxServiceUrl="http://snippet.pos.baidu.com/bfp/snippetcacher.php";
            }
            var iframeId = BL.getAdsDomId( uiParams.get("did") );
           
            var templateData = {    iframeId:iframeId, 
                                    paramString:"qn=" + tmpData.qn, 
                                    iframeWidth:tmpData.sw,
                                    iframeHeight:tmpData.sh,
                                    adxServiceUrl:adxServiceUrl
                                };
			//判断是否是异步加载, 并且获取到异步加载的外围容器
			var cproAdWrapId = asynDomID || 'cpro_'+ uiParams.get('tu');
			var cproAdWrap = U.g(cproAdWrapId,window);
			var isAsync = cproAdWrap ? true : false;								
            //异步与同步绘制iframe元素. ID传错时，仍按异步处理，防止调用同步的代码
            if(isAsync || asynDomID){
                if(cproAdWrap){
                    cproAdWrap.innerHTML = U.template(iframeHtmlTemplate, templateData);
                }
            }
            else{
                document.write( U.template(iframeHtmlTemplate, templateData) );
            }                  
            //显示广告后的逻辑
            //将广告块的信息添加到一个全局数组中. 以便以后对展现的广告块进行监控和处理.
            var uiParamSnap = BL.Param.snap(uiParams);
            BL.adsArray.push( {domId:iframeId, uiParamSnap:uiParamSnap, win:window, js:jsFile } ); 
            BL.addAdsCounter(displayType, window, uiParams.get("tn"));   //分展现类型计数器+1, 此参数用于cn字段                       
            uiParams.set("cn");     //设置cn参数            
            uiParams.set("pn");     //设置pn参数 
            uiParams.set("did")            
            //广告可见时间统计功能
            if (BL.Distribute.dispatch("viewtime")) {
                BL.ViewWatch.getInstance();
            }
            //如果存在非跨域iframe嵌套，且只iframe页面卸载的时候，修正cn和did的初始值，以使得PV在下次iframe加载的时候，可以累加
            BL.initParam(window);
			return;
		}
        else {//非预览, 生成广告块iframe           
            /**
            @process    广告个数判断. 一个页面上每种展现类型广告块有个数限制.
            */
            if( BL.checkAdsCounter(displayType, window, cpro_template) ){
                return;
            }
        
            /**
            @process    绘制广告块
            */
            
            /**
            @process    悬停广告位判断. 作为嵌入式广告的一种展现形式，以新展现类型判断个数限制--1个.
            */
			//var slotId = uiParams.get('tu');
			//var paramObject = U.parseUrlQuery(paramString);
			/*
			var cproXuantingValue = U.getUrlQueryValue(paramString, 'xuanting'),
			    cproDelayInValue = U.getUrlQueryValue(paramString, 'delayIn'),
			    cproDelayOutValue = U.getUrlQueryValue(paramString, 'delayOut'),
			    cproSessionSyncValue = U.getUrlQueryValue(paramString, 'sessionSync'),
			    cproCloseForValue = U.getUrlQueryValue(paramString, 'closeFor');
			    */
          //var slotId = uiParams.get("tu");
          //var paramObject = U.parseUrlQuery(paramString);
          var cproXuantingValue = slotParams["cpro_xuanting"],
    			    cproDelayInValue = U.getUrlQueryValue(paramString, 'delayIn'),
    			    cproDelayOutValue = U.getUrlQueryValue(paramString, 'delayOut'),
    			    cproSessionSyncValue = U.getUrlQueryValue(paramString, 'sessionSync'),
    			    cproCloseForValue = U.getUrlQueryValue(paramString, 'closeFor');
            if ((window.cproStyleApi && slotId && window.cproStyleApi[slotId] && window.cproStyleApi[slotId]["xuanting"]) != undefined || (cproXuantingValue != null)) {
                if (!U.isInIframe()) {
                    var cproStyleApi = window.cproStyleApi || {};
                    var styleApiObject = cproStyleApi[slotId] || {};
                    var xuanting = styleApiObject.xuanting || cproXuantingValue,
                        delayIn = styleApiObject.delayIn || cproDelayInValue,
                        delayOut = styleApiObject.delayOut || cproDelayOutValue,
                        sessionSync = styleApiObject.sessionSync || cproSessionSyncValue,
                        closeFor = styleApiObject.closeFor || cproCloseForValue;
                    canToggle = (xuanting == 2 || xuanting == 3);
                    xuantingleft = (U.getClientWidth(window) - iframeWidth) / 2;
                    //xuanting = +xuanting;
                }
            }
            var dockTo;
            if(xuanting == 2){
                dockTo = 'top';
            }else if(xuanting == 3){
                dockTo = 'bottom';
            }
            var nXuanting = +xuanting;
            if(nXuanting){
              if(nXuanting !== 1 && nXuanting !== 2 && nXuanting !== 3){
              //invalid xuanting value
                  return;  
              }
            }
            var cookieKey = 'bd_close_' + slotId,
                cookieValue = U.getCookieRaw(cookieKey, this.win);
            if(cookieValue){
              return;  
            }
            /*
            var srcAttrName = 'src';
            if(xuanting == 2 || xuanting == 3){
              srcAttrName = '_src';
            }
            */
            var srcAttrName = (xuanting == undefined || xuanting == 1)?'src':'_src';
            var iframeHtmlTemplate = '<div style="display:none">-</div>';
            var iframeHtmlTemplate2 = '<iframe id="{iframeId}" '+srcAttrName+'="{cproServiceUrl}?{paramString}"'
                                + ' width="{iframeWidth}" height="{iframeHeight}" align="center,center" marginwidth="0" '
                                + ' marginheight="0" scrolling="no" frameborder="0" allowtransparency="true" ></iframe>';
            if(xuanting != undefined){
              if(xuanting == 1 || xuanting == 2 || xuanting == 3){
                iframeHtmlTemplate2 = ' <div id="{iframeId}Wrap" width="{iframeWidth}" height="'+(+iframeHeight + 10)+'">' + iframeHtmlTemplate2 + '</div>';
              }  
            }
            iframeHtmlTemplate += iframeHtmlTemplate2;
            /*
                                + ' <div id="{iframeId}Wrap" width="{iframeWidth}" height="'+(+iframeHeight + 10)+'" style='+adDisplay+'><iframe id="{iframeId}" '+srcAttrName+'="{cproServiceUrl}?{paramString}"'
                                + ' width="{iframeWidth}" height="{iframeHeight}" align="center,center" marginwidth="0" '
                                + ' marginheight="0" scrolling="no" frameborder="0" allowtransparency="true" ></iframe></div>';
                                */
            var iframeId = BL.getAdsDomId( uiParams.get("did") );
             //Linkunit_1
            var tempTemplateName = uiParams.get("tn").toLowerCase();            
            if( tempTemplateName && ( tempTemplateName.indexOf("tlink")>-1 || tempTemplateName.indexOf("linkunit_1")>-1 ) ){
                iframeId += (new Date()).getTime().toString(); 
            }
			
			
			//设置展现类型
			if(xuanting != undefined){
				if(xuanting == 1){
					uiParams.set("distp","1002");
				}else if(xuanting == 2){
					uiParams.set("distp","2005");
				}else if(xuanting == 3){
					uiParams.set("distp","2006");
				}
            }else{
				uiParams.set("distp","1001");
			}
            var paramString = BL.Param.serialize(uiParams);
            //仅针对QQ短期实验去掉lu词的下划线
            var cpro_client = uiParams.get("n").toString();
            if(cpro_client == "07095078_1_cpr" || cpro_client == "07095078_cpr" || cpro_client == "71049059_cpr" || cpro_client == "68056018_cpr" ){
                paramString = paramString + "&titSU=0"
            }
            //用户开放样式API
            paramString += styleApiParamString || "";            
            
            
            var templateData = {    iframeId:iframeId, 
                                    paramString:paramString, 
                                    iframeWidth:iframeWidth,
                                    iframeHeight:iframeHeight,
                                    cproServiceUrl:BL.cproServiceUrl
                                };          
            /**
            @process 异步与同步绘制iframe元素. ID传错时，仍按异步处理，防止调用同步的代码
            */
            if(isAsync || asynDomID){
                if(cproAdWrap){
                    cproAdWrap.innerHTML = U.template(iframeHtmlTemplate, templateData);
                }
            }
            else{
                document.write( U.template(iframeHtmlTemplate, templateData) );
            }                  
            /**
            @process    悬停广告位判断. 作为嵌入式广告的一种展现形式，以新展现类型判断个数限制--1个.
            */
            
			      if(xuanting != undefined){
                G.create(G.UI.DynamicFloatAds, {dockTo:dockTo, closeFor:closeFor, slotId:slotId, xuantingIframeId:iframeId, xuantingId: iframeId+"Wrap",xuanting:+xuanting,xuantingDomWidth:+iframeWidth,xuantingDomHeight:+iframeHeight,delayIn:delayIn,delayOut:delayOut,sessionSync:sessionSync});
            }
            /**
            @process    显示广告后的逻辑
            */
            //将广告块的信息添加到一个全局数组中. 以便以后对展现的广告块进行监控和处理.
            var uiParamSnap = BL.Param.snap(uiParams);
            BL.adsArray.push( {domId:iframeId, uiParamSnap:uiParamSnap, win:window, js:jsFile } ); 
            BL.addAdsCounter(displayType, window, cpro_template);   //分展现类型计数器+1, 此参数用于cn字段  
			uiParams.set("did");
            uiParams.set("cn");     //设置cn参数            
            uiParams.set("pn");     //设置pn参数     
            //广告可见时间统计功能
            if ( !isUnionPreview && BL.Distribute.dispatch("viewtime")) {
                BL.ViewWatch.getInstance();
            }   
            
            //如果存在非跨域iframe嵌套，且只iframe页面卸载的时候，修正cn和did的初始值，以使得PV在下次iframe加载的时候，可以累加
            BL.initParam(window);
        }
    }
    
    
    //广告管家高级模式的回调函数.在高级模式中,会首先在头部加载好所有广告的数据
    //然后在需要绘制广告的地方, 由广告管家的js调用此函数.
    var cbCreateSlot = window["BAIDU_CLB_CPROCSLOT"] =function(slotId, adObj) {
        var unionTempSlotData = BL.getSlotDataFromCB(slotId, adObj);
        if(unionTempSlotData){
            unionCreateSlot(unionTempSlotData);
        }
    }    
    
    //页面加载主流程开始. 判断是广告管家广告位还是union广告位. 最后都是用unionCreateSlot绘制广告. 
    if ( jsFile==="cc" ) {//广告管家广告位
        //异步回调渲染
        var cbAsynCreateSlot = window["BAIDU_CLB_CPROASYNCSLOT"] = function(obj){
            obj._html = obj.data;   
            var unionTempSlotData = BL.getSlotDataFromCB(obj.id, obj);
            if(unionTempSlotData){
                unionCreateSlot(unionTempSlotData,obj.domid);
            }
        }
        /*
        if(window["tempClbCproAdSlotId"] && window["tempClbCproAdObj"]){
            unionSlotData = BL.getSlotDataFromCB();                            //广告管家将广告位数据写在全局变量中.
            if(unionSlotData){
                unionCreateSlot(unionSlotData);                                //绘制广告
                BL.clearSlotDataFromCB();                                    //绘制完一次广告后,清除全局变量的广告数据
            }
        }
        */      
        if(window["BAIDU_CLB_ASYNSLOTS"] && window["BAIDU_CLB_ASYNSLOTS"].length > 0){
            for(var i in window["BAIDU_CLB_ASYNSLOTS"]){
                cbAsynCreateSlot(window["BAIDU_CLB_ASYNSLOTS"][i]);
            }
            window["BAIDU_CLB_ASYNSLOTS"] = [];//一定要清空，否则页面上既有同步又有异步时就都走异步代码了!
        }    
    }
    else if( jsFile ==="c1" ){//union广告位
        var scripts = document.getElementsByTagName("script");
        var scriptsSrc = scripts[scripts.length-1].src; 
        var jsPara = U.getPara(scriptsSrc);
        BL.isAsyn = jsPara.asyn;         
        
        if(window.cproArray){//异步加载
            var slotIdArray = [];
            for(var i=0, count=window.cproArray.length; i<count; i++){
                BL.getSlotDataFromUnion(window.cproArray[i].id, unionCreateSlotName, true);   //从union接口获取广告位数据
            }
             window.cproArray = null;
        } 
        
        if(window.cpro_id){//同步加载
            var tempSlotId = window.cpro_id;//获取广告位id
            //union预览的数据形式是:
            //var cpro_id="cpro_template=text_default_234_60|cpro_h=60|cpro_w=234|cpro_at=text|cpro_161=1|cpro_flush=4|cpro_cflush=#e10900|cpro_curl=#008000|cpro_cdesc=#444444|cpro_ctitle=#0000FF|cpro_cbg=#FFFFFF|cpro_cbd=#FFFFFF|cpro_cad=1|cpro_client=baiducprostyle_cpr"
            if(tempSlotId && /cpro_template=/gi.test(tempSlotId)){//union预览
                isUnionPreview = true;
                window[unionCreateSlotName]({"0":{_html:tempSlotId}});
             }else if(tempSlotId){            
                var expIds = {
                    'u709994': {
                        'u709994': {
                            "_html": "cpro_client=daqi2011_cpr|cpro_template=text_default_300_250|cpro_h=250|cpro_w=300|cpro_at=all|cpro_161=3|cpro_flush=4|cpro_cflush=#e10900|cpro_curl=#008000|cpro_cdesc=#444444|cpro_ctitle=#0000FF|cpro_cbg=#FFFFFF|cpro_cbd=#FFFFFF|cpro_cad=1|cpro_lunum=6|cpro_rs=65000",
                            "_dai": 2
                        }
                    },
                    'u160109': {
                        'u160109': {
                            "_html": "cpro_client=360doc168_cpr|cpro_template=text_default_728_90|cpro_h=90|cpro_w=728|cpro_at=image|cpro_cbd=#A2BE43|cpro_cbg=#F4FAE1|cpro_ctitle=#178102|cpro_cdesc=#444444|cpro_curl=#2D4383|cpro_cflush=#e10900|cpro_161=4|cpro_flush=4|cpro_cad=0|cpro_acolor=#ffffff|cpro_rs=65000",
                            "_dai": 1
                        }
                    },
                    'u917839': {
                        'u917839': {
                            "_html": "cpro_client=qinchen007_cpr|cpro_template=text_default_360_300|cpro_lunum=6|cpro_h=300|cpro_w=360|cpro_xuanting=0|cpro_at=all|cpro_cbd=#ffffff|cpro_cbg=#ffffff|cpro_ctitle=#0000FF|cpro_cdesc=#444444|cpro_curl=#008000|cpro_cflush=#e10900|cpro_161=4|cpro_flush=1|cpro_cad=1|cpro_rs=65000",
                            "_dai": 2
                        }
                    }
                };
                if (expIds[tempSlotId] && Math.random() < 0.5) {
                    unionCreateSlot(expIds[tempSlotId]);
                    return;
                }
                BL.getSlotDataFromUnion(tempSlotId, unionCreateSlotName);//从union接口获取广告位数据
             }
        }
        //window.cpro_id = null;//清空广告位id避免再次绘制
    }    
})(window[___baseNamespaceName]);
