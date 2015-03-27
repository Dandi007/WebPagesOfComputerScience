
function applySucess(){
    var $this = $("#hrs_applyJob"),
        content = '<p class="sec_success"><span>'+_MSG_LABEL_APPLY_SUCESS+'</span></p>',
        dialog = new BC_Dialog({'auto_close':true, 'width':'auto', 'dropback':false, 'title':'', 'buttons':false, 'need_close':false, 'dialog_type':'success', content:content,position:{'trigger':$this}});
    dialog.open();
}

function favorateSucess(){
    var $this = $("#hrs_favoriteJob"),
        content = '<p class="sec_success"><span>'+_MSG_LABEL_FAVOR_SUCESS+'</span></p>',
        dialog = new BC_Dialog({'auto_close':true, 'width':'auto', 'dropback':false, 'title':'', 'buttons':false, 'need_close':false, 'dialog_type':'success', content:content,position:{'trigger':$this}});
    dialog.open();
}

//关闭选择简历窗口
function hideChooseResumeDiv(){
	jQuery("#selectResume").hide();
}
function hidePleaseLoginDiv(){
	jQuery("#pleaseLogin").hide();
}

function setLanTypeValue(lanType){
	document.getElementById('resumeLanType').value=lanType;
}

//立即申请
function checkPositionRegist(){
	var url = document.getElementById("dispatchRegistForm").action;
	var submitUserId = document.getElementById('submitUserId').value;
    jQuery.post(url,{postId:_POST_ID,submitUserId:submitUserId},
		function(data){
    		var dataArray = data.split("_,,_");
    		var datamsg = dataArray[0];
    		var msg = dataArray.length>0? dataArray[1]: _MSG_ERROR_CAUSE_APPLY;
    		if(datamsg==0){
            	applySucess();
    		}else if(datamsg==1 || datamsg==2 || datamsg==3){
    			jQuery("#pleaseLogin").show();
            }else if(datamsg==9 || datamsg==10){
            	jQuery("#selectResume").show();
            }
    		/*
            else if(datamsg==10){
            	//alert("跳转到填写简历页面")
            	window.location= _URL_EDIT_RESUME;
            }
            */
            else {
            	alert(msg);
            }
        });
}

//收藏JS
function favorate(){
	var submitUserId = document.getElementById('submitUserId').value;
    pageAjax.favorate(submitUserId,_RECRUIT_TYPE,_POST_ID,favorateResult);
}

function favorateResult(result){
	var dataArray = result.split("_,,_");
	var datamsg = dataArray[0];
	var msg = dataArray.length>0? dataArray[1]: _MSG_ERROR_CAUSE_FAVOR;
    if(datamsg==0){
    	jQuery("#pleaseLogin").show();
    }else if(datamsg==1){
        alert(_MSG_FAVORATE1);
        return false;
    }else if(datamsg==2){
        alert(_MSG_FAVORATE2);
        return false;
    }else if(datamsg==3){
        favorateSucess();
        return false;
    }else if(datamsg==4){
        alert(_MSG_FAVORATE4);
        return false;
    }else if(datamsg==5){
        alert(_MSG_FAVORATE5);
        return false;
    }else{
    	alert(msg);
    }
}
