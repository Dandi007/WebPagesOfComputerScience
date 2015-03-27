/**
 *  BC_Dialog
 *  @author     beatacao <beatacao@gmail.com>
 *  @version    1.0
 */
(function(window){

    window.BC_Dialog = window.BC_Dialog || {};

    //为避免冲突，定义plugin来代表当前对象实例
    var plugin = {};

    window.BC_Dialog = function(){

        plugin = this;
        
        /**
        * @params
        * @dropback         boolean 是否需要遮罩层;
        * @need_close       boolean 是否需要关闭按钮;
        * @auto_close       是否自动关闭dialog; true: 3s后自动关闭dialog; false:不自动关闭; 可自行设置数值，单位ms, 如：2000;
                            默认为false;
        *
        * @buttons          设置dialog底部按钮，true: 显示按钮，需要@dialog_type来确定显示几个按钮; false：不显示任何按钮；还可自行设定需要显示的按钮，需数组形式，如：
                            [
                                {caption:'按钮1',id:'btn1', classes: 'class1', keyCode: 13, callback: fn1},
                                {caption:'按钮2',id:'btn2', classes: 'class2', callback: fn2}
                            ]
                            caption: 按钮文字; id; 按钮id; class: 按钮classes名,多个class用空格隔开; keyCode: 按钮快捷键的keyCode; callback: 点击按钮的回调函数;
                            默认为 true;

        * @dialog_type      设置dialog类型；
                            confirm: 确认框, 显示‘确认’和‘取消’按钮; 需 @buttons 设置为true;
                            error:错误提示；warning:警告； success：成功；info：信息；
                            如果不为以上任何类型，并且 @buttons 为true, 则dialog有一个操作按钮，即‘确定’;
                            默认为 confirm;
        *
        * @id               字符串,设置dialog的id,默认dialog-时间戳;
        * @wrapper          设置dialog的外围元素, 默认为 $('body');
        * @ajaxUrl          设置通过ajax加载dialog内容的url;
        * @width            设置dialog的宽度, 默认560px
        * @height           设置dialog的高度，默认auto
        * @title            字符串,设置dialog的title, 默认为‘请确认’
        * @content          html或字符串,设置dialog的主体内容,默认为空
        * @ajaxUrl          url地址,设置此url,将通过ajax方式加载dialog主体内容
        * @keyboard         boolean,是否设置ESC键关闭dialog, 默认为true
        *
        * @position         设置dialog定位;
                            水平：left, right, center; 可设置偏移量，如： left - 20; 可直接设置数值：-20 或 -20px;
                            垂直：top, bottom, middle; 可设置偏移量，如：top - 20; 可直接设置数值：-20 或 -20px;
                            默认居中：['center', 'middle'], 可简写为['center']
        *
        * @prevOpenCallback     设置dialog打开前的回调函数;
        * @prevCloseCallback    设置dialog关闭前的回调函数;
        * @openCallback     设置dialog打开后的回调函数;
        * @closeCallback    设置dialog关闭后的回调函数;
        * @okCallback       设置'确认'按钮回调函数
        * @cancelCallback   设置'取消'按钮回调函数
        */

        //获取当前时间戳，用来作为dialog的默认id
        var timestamp = new Date().getTime();
        var fn = function(){};

        //默认设置
        var defaults = {
            dropback: true, //有遮罩层
            need_close: true, //有关闭按钮
            auto_close: false, //不自动关闭
            title: '请确认', //设置dialog的标题，默认‘请确认’
            buttons: true, //显示按钮，默认为‘确定’和‘取消’两个，‘确定’按钮已绑定enter快捷键
            dialog_type: 'confirm', //可为confirm, error, success, waring, info;
            id: 'dialog-' + timestamp,  //设置dialog的id,默认为空
            wrapper: $('body'),  //设置dialog的外围元素
            width:'560px',   //设置dialog的宽度
            height:'auto',  //设置dialog的高度
            keyboard: true,  //点击ESC键关闭dialog
            position: ['center','middle'],  //设置dialog定位,默认垂直居中，左右居中；水平值：left,right,center; 垂直：top,bottom,middle; 
                                            //可以设置偏移值，如：['left-20','top-20']；还可以直接自定义,如;[20, 35]
            okCallback: fn,     //'确认'按钮回调函数
            cancelCallback: fn  //'取消'按钮回调函数
        }

        var options = {};

        //默认设置和用户设置的合集初始化为空
        plugin.settings = {};

        //如果用户直接传递一个字符串参数，将该字符串设置为dialog内容，其余按照默认设置
        if(whatType(arguments[0]) == '[object string]'){
            options.content = arguments[0];
        }

        if(whatType(arguments[0]) == '[object object]'){
            options = $.extend(options, arguments[0]);
        }

        //构造函数
        var _init = function(){
            var 
                //合并默认设置和用户设置到plugin.settings中,为书写方便,定义缩写ps
                ps = plugin.settings = $.extend({}, defaults, options),

                //用于设置dialog id,如果用户没有设置，则为空 
                pId = ps.id || '',

                //用于设置dialog 的class, 根据dialog_type,方便设置不同类型dialog的样式
                pClass = 'dialog hide ';

            //error, success,warning和info类型的dialog有共同点，添加共同的class名：d-alert;
            if((/^\s*(error|success|warning|info)\s*$/).test(ps.dialog_type)){
                pClass += ' d-alert ' +ps.dialog_type;
            }else if((/^\s*(confirm|alert)\s*$/).test(ps.dialog_type)){
                pClass += ' d-confirm';
            }else{
                pClass += ' ' + ps.dialog_type;
            }

            //创建dialog元素
            plugin.dialog = $('<div>',{id: pId}).addClass(pClass).css({width:ps.width, height:ps.height});
            //创建dialog header元素
            plugin.dialogHeader = $('<div>').addClass('d-header');
            //创建dialog body元素
            plugin.dialogBody = $('<div>').addClass('d-body');
            //创建dialog footer元素
            plugin.dialogFooter = $('<div>').addClass('d-footer');
            //创建遮罩层元素
            plugin.backDrop = $('<div>').addClass('d-backdrop hide');

            //将header, body, footer添加到dialog中；
            plugin.dialog.append(plugin.dialogHeader);
            plugin.dialog.append(plugin.dialogBody);
            plugin.dialog.append(plugin.dialogFooter);


            //如果需要关闭按钮，创建关闭按钮元素到dialog
            if(ps.need_close){
                addClose(plugin);
            }

            //设置标题
            if(ps.title){
                plugin.setTitle(ps.title);
            }

            //设置dialog的button及为button绑定事件
            plugin.setButtons();

            //如果用户设置了content,添加内容到dialog
            if(ps.content){
                //plugin.setContent(ps.content);
                plugin.dialogBody.html(ps.content);
            }

            //如果设置了ajaxUrl,通过ajax方式加载dialog内容
            if(ps.ajaxUrl){
                //plugin.getAjax(ps.ajaxUrl);
                $.get(ps.ajaxUrl, function(data){
                    //设置dialog内容
                    plugin.dialogBody.html(data);
                })
            }

            //如果需要ESC键退出dialog,绑定事件。默认是绑定的。
            if(plugin.settings.keyboard){
                $(document).keyup(function(e){
                    var e = window.event || e,
                        code = e.charCode || e.keyCode || e.which;
                    if(code == 27){
                        plugin.close();
                    }
                })
            }

            //返回对象实例
            return plugin;
        }
        //返回构造函数
        return _init();
    }

    /*判断数据类型
     *@value 要判断类型的值或对象
     *返回值：
     *whatType([123]) : [object array]
     *whatType('123') : [object string]
     *whatType({a:'123'}) : [object object]
     *whatType(/123/) : [object regexp]
     *whatType(123) : [object number]
     *whatType(undefined) : [object undefined]
     *whatType(null) : [object null]
    */
     var whatType = function(value){
        var whatType = Object.prototype.toString,
            type = typeof value;
        if(null === value){
            return '[object null]'.toLowerCase();
        }
        if('undefined' == type || 'string' == type){
            return '[object '+type+']'.toLowerCase();
        }
        return whatType.call(value).toLowerCase();

    }

    /*添加对话框的关闭按钮并绑定关闭事件*/
    var addClose = function(){
        //创建关闭按钮元素
        plugin.closeBt = $('<span>', {text:'×'}).addClass('d-close');
        //将关闭按钮添加到dialog header中
        plugin.closeBt.appendTo(plugin.dialogHeader);
        //为关闭按钮绑定关闭dialog事件
        plugin.closeBt.bind('click', function(){
            plugin.close();
        })
    }

    /*添加对话框的操作按钮并绑定回调事件及keyboard事件
     *@obj 需要为数组
    */
    var addButtons = function(obj){
        //如果obj不是数组或数组为空，不添加任何按钮
        if(whatType(obj) !== '[object array]' || obj.length == 0) return false;

        //循环数组，添加按钮并为按钮绑定事件
        $.each(obj, function(index,value){
            var 
                //按钮class,默认为d-btn d-btn-primary
                btClass = (value.classes == undefined) ? 'd-btn d-btn-primary' : value.classes,
                //按钮id,默认为''
                btId = (value.id == undefined) ? '' : value.id,
                //创建按钮元素，并设置id,class
                button = $('<a>',{href:'javascript:;', id:btId}).addClass(btClass);

            //如果数组元素为string,直接设置为按钮的text
            if(whatType(value) == '[object string]'){
                button.html(value);

            //如果数组元素为对象，取对象的caption值设置为按钮的text
            }else if(whatType(value) == '[object object]'){
                button.html(value.caption);

            //如果数组元素不是字符串，也没有caption设置，默认设置按钮text为 default
            }else{
                button.html('default');
            }

            //为按钮绑定click回调函数,通过闭包保证plugin为正确的实例
            (function(plugin){
                button.bind('click', function(){
                    //如果用户设置了按钮的回调函数，调用回调函数
                    if(value.callback != undefined && whatType(value.callback) == '[object function]'){
                        value.callback(plugin);
                    } 
                    //关闭对话框
                    //var self = $(this).closest('.dialog');
                    plugin.close();
                })
            })(plugin)

            //按键绑定
            if((/^\s*\d+\s*$/).test(value.keyCode)){
                $(document).bind({
                    //取消keydown事件的默认动作
                    keydown: function(e){
                        var e = window.event || e,
                            code = e.keyCode || e.which || e.charCode;
                        if(code == parseInt(value.keyCode)){
                            e.preventDefault();
                        }
                    },
                    //在keyup时绑定按键
                    keyup: function(e){
                        var e = window.event || e,
                            code = e.keyCode || e.which || e.charCode;
                        if(code == parseInt(value.keyCode)){
                            e.preventDefault();
                            button.click();
                        }
                    }
                })
            }
            //添加按钮到dialog footer中
            button.appendTo(plugin.dialogFooter);
        })

    }

    Object.Equals = function(x, y) {
        // x,y都为null, undefined 或者完全相同
        if (x === y) {
            return true;
        }
        //x,y必须都为object
        if( !(x instanceof Object) || !(y instanceof Object)) {
            return false;
        }
        //x,y要有相同的原型链
        if (x.constructor !== y.constructor) {
            return false;
        }

        for (var p in x) {
            //检查对象本身的成员
            if (x.hasOwnProperty(p)) {
                if (!y.hasOwnProperty(p)) {
                    return false;
                }
                
                if (x[p] === y[p]) {
                    continue;
                }

                //如果x[p]为Numbers, Strings, Functions, Booleans,则必须满足 x[p] === y[p]; 否则，x[p]必须为object类型
                if(typeof( x[ p ]) !== "object") {
                    return false;
                }
                //如果x[p]对object类型，则必须递归检测
                if (! Object.Equals( x[ p ],  y[ p ])) {
                    return false;
                }
            }
        }

        for (p in y) {
            if (y.hasOwnProperty( p ) && ! x.hasOwnProperty( p )) {
                return false;
            }
        }
        return true;
    };


    /*定位*/
    var setPosition = function(){
        var //获取用户设置的position
            position = plugin.settings.position;

        if(//以外围元素为基准定位dialog
            !position.trigger){
            var 
                //外围元素
                wrapper = (Object.Equals(plugin.settings.wrapper, $('body'))) ? $(window) : plugin.settings.wrapper,
                //dialog元素
                dialog = plugin.dialog,

                //外围元素的宽和高
                wrapperWidth = wrapper.width(),
                wrapperHeight = wrapper.height(),

                //dialog的宽和高
                dialogWidth = dialog.width(),
                dialogHeight = dialog.height(),

                //定义左中右，上中下的值
                values = {
                    left: 0,
                    top: 0,
                    right: wrapperWidth - dialogWidth,
                    bottom: wrapperHeight - dialogHeight,
                    center: (wrapperWidth - dialogWidth)/2,
                    middle: (wrapperHeight - dialogHeight)/2
                };

            //初始化dialog居上和居左变量
            plugin.dialog_left = undefined;
            plugin.dialog_top = undefined;

            if($.isArray(position)){
                var 
                    //获取position数组的第一个元素,将转换为dialog的left定位
                    p0 = position[0],
                    //获取position数组的第二个元素,将转换为dialog的top定位
                    p1 = position[1],
                    //匹配类似 20，'20' 或 '20px'的正则，支持前后有空格
                    p_number = /^\s*\d+(\.\d)*(\s|px)*$/i;
                    //验证left定位的正则,支持在left、right、center基础上加减数值
                    p0_expression = /^\s*(left|right|center)\s*([\+\-]{1}\s*\d+\s*)*$/i;
                    //验证top定位的正则，支持在top、bottom、middle基础上加减数值
                    p1_expression = /^\s*(top|bottom|middle)\s*([\+\-]{1}\s*\d+\s*)*$/i;

                //计算left定位
                if(p_number.test(p0)){
                    //如果为数值、数值字符串或数值字符串+'px',取数值部分
                    plugin.dialog_left = parseInt(p0);
                }else if(p0_expression.test(p0)){
                    //如果匹配成功，根据values对象替换left,right,center为对应的数值
                    $.each(values, function(index, value){

                        var tmp1 = p0.replace(index, value);

                        //如果替换成功，结果赋值给plugin.dialog_left
                        if(tmp1 != p0){
                            plugin.dialog_left = tmp1;
                        }
                    })
                }

                //计算top定位
                if(p_number.test(p1)){
                    //如果为数值、数值字符串或数值字符串+'px',取数值部分
                    plugin.dialog_top = parseInt(p1);
                }else if(p1_expression.test(p1)){
                    //如果匹配成功，根据values对象替换left,right,center为对应的数值
                    $.each(values, function(index, value){

                        var tmp2 = p1.replace(index, value);

                        //如果替换成功，结果赋值给plugin.dialog_top
                        if(tmp2 != p1){
                            plugin.dialog_top = tmp2;
                        }
                    })
                }
            }

            //如果用户设置不符合规范或用户没有设置定位，水平定位默认为values.center对应的值; 垂直定位默认为values.middle对应的值
            plugin.dialog_left = (plugin.dialog_left != undefined)? eval(plugin.dialog_left) : values.center;
            plugin.dialog_top = (plugin.dialog_top != undefined)? eval(plugin.dialog_top) : values.middle;

            //判断是否为ie6. 如果是ie6,将为dialog及遮罩层做定位的兼容性
            plugin.isIE6 = ($.browser.msie && parseInt($.browser.version, 10) == 6) || false;

            if(plugin.isIE6){
                var 
                    //获取window宽度,ie6 遮罩层100%不能正确获取window宽度兼容
                    width = $(window).width(),
                    //获取window高度,ie6 遮罩层100%不能正确获取window高度兼容
                    height = $(window).height(),
                    //获取窗口水平滚动距离,兼容ie6 position:fixed定位
                    scrollLeft = $(window).scrollLeft(),
                    //获取窗口垂直滚动距离,兼容ie6 position:fixed定位
                    scrollTop = $(window).scrollTop();

                //ie6下的通过position:absolute；模拟fixed定位。正常水平或垂直距离+滚动距离
                var ie_dialog_left = plugin.dialog_left + scrollLeft;
                var ie_dialog_top = plugin.dialog_top + scrollTop;

                //如果有遮罩层，遮罩层定位
                if(plugin.settings.dropback){
                    plugin.backDrop.css({width:width, height:height, left:scrollLeft, top:scrollTop});
                }

                //dialog定位
                plugin.dialog.css({left: ie_dialog_left + 'px', top: ie_dialog_top + 'px'});

                //滚动时，实时定位模拟fixed定位效果
                $(window).scroll(function(){
                    var scrollLeft = $(window).scrollLeft(),
                        scrollTop = $(window).scrollTop(),
                        d_left = plugin.dialog_left + scrollLeft,
                        d_top = plugin.dialog_top + scrollTop;

                    plugin.dialog.css({left: d_left + 'px', top: d_top + 'px'});

                    if(plugin.settings.dropback){
                        plugin.backDrop.css({left:scrollLeft, top:scrollTop});
                    }
                })
                //如果是ie6，到此定位执行完毕
                return ;
            }

            //定位非ie6 dialog
            plugin.dialog.css({left: plugin.dialog_left + 'px', top: plugin.dialog_top + 'px'});
        }else{//以触发dialog事件的元素为基准定位dialog
            var $trigger = position.trigger,
                top = $trigger.offset().top - plugin.dialog.outerHeight() -5,
                left = $trigger.offset().left + $trigger.outerWidth() - plugin.dialog.outerWidth();

            if(top < 0){
                top = $trigger.offset().top + $trigger.outerHeight() +5;
            }
            if(left < 0){
                left = $trigger.offset().left;
            }
            console.log($.browser);
            /*  yxie IE不支持
            if($.browser.msie){
                top = top - $(window).scrollTop();
                left = left - $(window).scrollLeft();
            }*/
            plugin.dialog.offset({left:left, top:top});
        }
    }

/*
*开放接口
*setWidth(value)    设置dialog宽度
*setHeight(value)   设置dialog高度
*setTitle(msg)      设置dialog标题
*setButtons(buttons)    添加dialog操作按钮
*setContent(content)    设置dialog内容
*getAjax(url)       通过ajax加载dialog内容
*open               打开dialog
*close              关闭dialog
*/

    /*设置宽和高*/
    BC_Dialog.prototype.setWidth = function(value){
        var val = parseInt(value);
        plugin.dialog.css('width',val+'px');
    }
    BC_Dialog.prototype.setHeight = function(value){
        var val = parseInt(value);
        plugin.dialog.css('height',val+'px');
    }

    /*给对话框设置title*/
    BC_Dialog.prototype.setTitle = function(msg){
        //创建title元素并添加到dialog header中
        $('<h3>',{text: msg}).appendTo(plugin.dialogHeader);
    }

    /*给对话框设置操作按钮，具体添加需调用addButtons函数*/
    BC_Dialog.prototype.setButtons = function(buttons){
        var btObj;
        //如果需要显示buttons
        if(plugin.settings.buttons === true){
            //如果dialog_type为confirm,添加'确定'和'取消'按钮,并绑定‘确定’的Enter键响应
            if(plugin.settings.dialog_type == 'confirm'){
                btObj = [{caption:'确定', classes:'d-btn d-btn-primary', keyCode:13, callback:plugin.settings.okCallback}, {caption:'取消', classes:'d-btn', callback:plugin.settings.cancelCallback}];
            }else{
                //添加‘确定’按钮,并绑定‘确定’的Enter键响应
                btObj = [{caption:'确定', keyCode:13, callback:plugin.settings.okCallback}];
            }
        //如果不需要显示buttons
        }else if(plugin.settings.buttons === false){
            //不执行addbButtons, 不添加任何按钮
            return false;
        }else{
            //添加用户自定义按钮
            btObj = plugin.settings.buttons;
        }
        //执行添加按钮函数
        addButtons(btObj);
    }

    /*设置对话框主体内容*/
    BC_Dialog.prototype.setContent = function(html){
        //设置dialog内容
        plugin.dialogBody.html(html);
        //给dialog及遮罩层定位
        setPosition();
    }

    /*设置对话框内容，通过ajax加载*/
    BC_Dialog.prototype.getAjax = function(url){
        var self = plugin;
        //请求url获取内容
        $.get(url, function(data){
            //设置dialog内容
            self.dialogBody.html(data);
            //给dialog及遮罩层定位
            setPosition();
        })
    }

    /*打开对话框*/
    BC_Dialog.prototype.open = function(){

         var plugin = this;

        //如果有打开前函数的设置，执行该函数
        if(plugin.settings.prevOpenCallback != undefined && whatType(plugin.settings.prevOpenCallback) == '[object function]'){
            plugin.settings.prevOpenCallback(plugin);
        }

        //如果有遮罩层，显示遮罩层
        if(plugin.settings.dropback){
            plugin.backDrop.removeClass('hide');
        }
        //显示dialog
        plugin.dialog.removeClass('hide');

        //如果需要遮罩层，添加遮罩层到外围元素
        if(plugin.settings.dropback){
            plugin.settings.wrapper.append(plugin.backDrop);
        }

        //添加dialog到外围元素
        plugin.settings.wrapper.append(plugin.dialog);

        setPosition();

        //如果有open的回调函数，执行回调函数
        if(plugin.settings.openCallback != undefined && whatType(plugin.settings.openCallback) == '[object function]'){
            plugin.settings.openCallback(plugin);
        }

        //如果需要自动关闭dialog
        if(plugin.settings.auto_close !== false){
            //通过闭包保证plugin为正确的实例
            (function(plugin){
                //如果用户设置auto_close为数值，则取该值为自动隐藏延迟时间，否则延迟时间为3000
                plugin.displayTime = parseInt(plugin.settings.auto_close) > 0 ? parseInt(plugin.settings.auto_close) : 500;
                plugin.timeOut = setTimeout(function(){
                    plugin.close();
                },plugin.displayTime)
            })(plugin)
        } 
    }

    /*关闭对话框*/
    BC_Dialog.prototype.close = function(){

        var plugin = this;

        //如果有关闭前函数的设置，执行该函数
        if(plugin.settings.prevCloseCallback != undefined && whatType(plugin.settings.prevCloseCallback) == '[object function]'){
            plugin.settings.prevCloseCallback(plugin);
        }

        if(plugin.settings.auto_close){
            plugin.dialog.fadeOut(1000,function(){
                //从文档移除dialog
                plugin.dialog.remove();
                //如果有遮罩层，移除遮罩层
                if(plugin.settings.dropback){
                    plugin.backDrop.remove();
                }

                //如果有关闭回掉函数，执行回调函数
                if(plugin.closeCallback != undefined && whatType(plugin.closeCallback) == '[object function]'){
                    plugin.closeCallback(plugin);
                }
            })
        }else{
            //从文档移除dialog
            plugin.dialog.remove();

            //如果有遮罩层，移除遮罩层
            if(plugin.settings.dropback){
                plugin.backDrop.remove();
            }

            //如果有关闭回掉函数，执行回调函数
            if(plugin.closeCallback != undefined && whatType(plugin.closeCallback) == '[object function]'){
                plugin.closeCallback(plugin);
            }
        }
        
    }

})(window)