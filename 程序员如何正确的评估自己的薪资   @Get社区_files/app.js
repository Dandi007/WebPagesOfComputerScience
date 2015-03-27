/*
send form data via ajax and return the data to callback function 
*/
function send_form( name , func )
{
	var url = $('#'+name).attr('action');
	
	var params = {};
	$.each( $('#'+name).serializeArray(), function(index,value) 
	{
		params[value.name] = value.value;
	});
	
	
	$.post( url , params , func );	
}

/*
send form data via ajax and show the return content to pop div 
*/

function send_form_pop( name )
{
	return send_form( name , function( data ){ show_pop_box( data ); } );
}


function send_form_pic( name , seditor )
{
	console.log('in');
	// 如果sim编辑器中有图片，检查图片
	var count = $(".simditor-body img[ref!='getgot']").length;
	if( count > 0 )
	{
		var f = $(".simditor-body img[ref!='getgot']").first();
		var reg = /\/\/newsget-(.+)\.stor\.sinaapp\.com/;
		var url = f.attr('src');

		//console.log( url );
		
		if(!reg.test(url))
		{
			$.notify('正在保存远程图片');
			
			// 如果存在其他网站的图片
			$.post( '/?a=snap_img'  , { 'url': url } , function( data )
			{
				var data_obj = jQuery.parseJSON( data );
				console.log( data_obj  );
				
				if( data_obj.errno == 0  )
				{
					f.attr('src',data_obj.dataset);
					//seditor.setValue($(".simditor-body").html());
					seditor.sync();
					//console.log($(that).attr('src'));
					//tips(".followlink-"+guid,data_obj.dataset , 'top' );
					$.notify('成功');
				}
				else
				{
					//$.notify('保存远程图片失败');
				}

				f.attr('ref','getgot');

				if( count > 1 )
					$.notify('还有'+ (count-1) + '张远程图片待处理' );

				send_form_pic( name , seditor );	

			} );
		}
		else
		{
			console.log('found!'+url);
			f.attr('ref','getgot');
			send_form_pic( name , seditor );
		}


		
	}
	else
	{
		//alert('end!');
		//console.log($('#editor').val());
		//return ;
		return send_form_in( name );
	}
	
	
}

function change2(url)
{
	location = url;
}

function change2new(cate)
{
	location = '/?cate='+cate+'&new=1';
}

function change2hot(cate)
{
	location = '/?cate='+cate+'&new=0';
}


/*
send form data via ajax and show the return content in front of the form 
*/
function send_form_in( name )
{	
	return send_form( name , function( data ){ set_form_notice( name , data ) } );
}


function set_form_notice( name , data )
{
	data = '<span class="label label-default lable-form">' + data + '</span>';
	
	if( $('#form_'+name+'_notice').length != 0 )
	{
		$('#form_'+name+'_notice').html(data);
	}
	else
	{
		var odiv = $( "<div class='form_notice'></div>" );
		odiv.attr( 'id' , 'form_'+name+'_notice' );
		odiv.html(data);
		$('#'+name).prepend( odiv );
	} 
	
}


function show_pop_box( data , popid )
{
	if( popid == undefined ) popid = 'lp_pop_box'
	//console.log($('#' + popid) );
	if( $('#' + popid).length == 0 )
	{
		var did = $('<div><div id="' + 'lp_pop_container' + '"></div></div>');
		did.attr( 'id' , popid );
		did.css( 'display','none' );
		$('body').prepend(did);
	} 
	
	if( data != '' )
		$('#lp_pop_container').html(data);
	
	var left = ($(window).width() - $('#' + popid ).width())/2;
	
	$('#' + popid ).css('left',left);
	$('#' + popid ).css('display','block');
}

function hide_pop_box( popid )
{
	if( popid == undefined ) popid = 'lp_pop_box'
	$('#' + popid ).css('display','none');
}

function remove_article( aid )
{
	if( confirm( '确定要删除此文章么？' ) )
	{
		location = '/?a=remove&aid='+aid;
	}
}

function follow( guid )
{
	$.post( '/?a=follow'  , { 'guid': guid } , function( data )
	{
		var data_obj = jQuery.parseJSON( data );
		console.log( data_obj  );
		
		if( data_obj.errno == 0  )
		{
			tips(".followlink-"+guid,data_obj.dataset , 'top' );			
		}
		else
		{
			tips(".followlink-"+guid,data_obj.errmsg , 'top' );	
		}	
	} );
}

function unfollow( guid )
{
	$.post( '/?a=unfollow'  , { 'guid': guid } , function( data )
	{
		var data_obj = jQuery.parseJSON( data );
		console.log( data_obj  );
		
		if( data_obj.errno == 0  )
		{
			tips(".followlink-"+guid,data_obj.dataset , 'top' );			
		}
		else
		{
			tips(".followlink-"+guid,data_obj.errmsg , 'top' );	
		}	
	} );
}

function add2kb( aid , pos )
{
	$.post( '/?a=fork'  , { 'aid':aid} , function( data )
	{
		var data_obj = jQuery.parseJSON( data );
		console.log( data_obj  );
		
		if( data_obj.errno == 0  )
		{
			tips(".kblink-"+aid,data_obj.dataset , pos );			
		}
		else
		{
			tips(".kblink-"+aid,data_obj.errmsg , pos );	
		}	
	} );
	//tips(".kblink-"+aid,"Hi"+aid);
}

function tips( item , text , pos )
{
	pos = pos || "right";

	$(item).notify(text,{ position:pos,className:"success",arrowShow:false });
}

function toggle_user_menu()
{
	if( $('.get-user-menu .dropup').length > 0 )
	{
		$('.get-user-menu').css('height','150');
		$('.get-user-menu .dropup').removeClass('dropup');
	}
	else
	{
		$('.get-user-menu').css('height','50');
		$('.get-user-menu > div').addClass('dropup');
	}

	
}





/* post demo
$.post( 'url&get var'  , { 'post':'value'} , function( data )
{
	var data_obj = jQuery.parseJSON( data );
	console.log( data_obj  );
	
	if( data_obj.err_code == 0  )
	{
					
	}
	else
	{
		
	}	
} );

*/