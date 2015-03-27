if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
if (dwr.engine._getObject("pageAjax") == undefined) {
var p;

p = {};
p._path = '/dwr';





p.getOrgCode = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgCode', arguments);
};





p.getOrgName = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgName', arguments);
};





p.getOrgInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgInfo', arguments);
};




p.recommend = function(callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'recommend', arguments);
};








p.getPaperSelectHtml = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getPaperSelectHtml', arguments);
};




p.genValidateCode = function(callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genValidateCode', arguments);
};





p.getOrgBrand = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgBrand', arguments);
};






p.getOrgHasPosition = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgHasPosition', arguments);
};






p.getOrgHasPositionByStatus = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgHasPositionByStatus', arguments);
};







p.judgeNumIsRepeat = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeNumIsRepeat', arguments);
};









p.judgeNameIsRepeat = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeNameIsRepeat', arguments);
};





p.canBatchValidUser = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'canBatchValidUser', arguments);
};







p.favorate = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'favorate', arguments);
};





p.getWorkPlaceList = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getWorkPlaceList', arguments);
};





p.getOrgIsCompany = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgIsCompany', arguments);
};




p.getUserShortcuts = function(callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getUserShortcuts', arguments);
};





p.genBrandCheckbox = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genBrandCheckbox', arguments);
};






p.genOneBrandCheckbox = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genOneBrandCheckbox', arguments);
};






p.getOrgHasPositionByList = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getOrgHasPositionByList', arguments);
};





p.isCanSingleValidateUser = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'isCanSingleValidateUser', arguments);
};





p.getItemNamesByCodes = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getItemNamesByCodes', arguments);
};






p.checkValidateCodeIsRight = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkValidateCodeIsRight', arguments);
};




p.genValidateCodeMD5 = function(callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genValidateCodeMD5', arguments);
};





p.genValidateCodeById = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genValidateCodeById', arguments);
};







p.checkEmailIsHave = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkEmailIsHave', arguments);
};





p.checkUserNameIsHave = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkUserNameIsHave', arguments);
};








p.checkInnerUser = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkInnerUser', arguments);
};








p.getSecondChildrenByLanguage = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getSecondChildrenByLanguage', arguments);
};









p.fillBySelectSmallWith = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'fillBySelectSmallWith', arguments);
};








p.getSecondChildrenByCode = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getSecondChildrenByCode', arguments);
};








p.getSecondChildren = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getSecondChildren', arguments);
};








p.genSecondLevel = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genSecondLevel', arguments);
};







p.checkResumeIsFinished = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkResumeIsFinished', arguments);
};






p.genDicCheckBoxByFirstLevel = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genDicCheckBoxByFirstLevel', arguments);
};






p.spliceRadioVote = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'spliceRadioVote', arguments);
};








p.genRadioAnswerRelatedQuestionHTML = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genRadioAnswerRelatedQuestionHTML', arguments);
};









p.genCheckboxAnswerRelatedQuestionHTML = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genCheckboxAnswerRelatedQuestionHTML', arguments);
};





p.judgeIsCanDeleteProject = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeIsCanDeleteProject', arguments);
};





p.judgeIsCanBatchDeleteProject = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeIsCanBatchDeleteProject', arguments);
};









p.judgeNameIsRepeatOnly = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeNameIsRepeatOnly', arguments);
};









p.judgeWrittenExamPlanIsExceedNumber = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'judgeWrittenExamPlanIsExceedNumber', arguments);
};









p.canCopyOrAddNewPosition = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'canCopyOrAddNewPosition', arguments);
};





p.getCanInterviewerByPostIds = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getCanInterviewerByPostIds', arguments);
};






p.getAssessFactor = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getAssessFactor', arguments);
};








p.getDicRefSecondChildrenByLanguage = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getDicRefSecondChildrenByLanguage', arguments);
};









p.searchItemValues = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'searchItemValues', arguments);
};






p.searchPositionManager = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'searchPositionManager', arguments);
};








p.searchPositionManager2 = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'searchPositionManager2', arguments);
};





p.getSubFunctionId = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getSubFunctionId', arguments);
};






p.getPlansInfoByEhrOrgId = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getPlansInfoByEhrOrgId', arguments);
};









p.savePostMatch = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'savePostMatch', arguments);
};





p.getPostNameByPostType = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getPostNameByPostType', arguments);
};





p.getPostTempleteContentById = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getPostTempleteContentById', arguments);
};






p.accountIsRepeat = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'accountIsRepeat', arguments);
};







p.accountIsRepeatByEdit = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'accountIsRepeatByEdit', arguments);
};





p.getUserAppTip = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getUserAppTip', arguments);
};





p.isExsitProcess = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'isExsitProcess', arguments);
};





p.unShowMessage = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'unShowMessage', arguments);
};





p.getNewRecruitNeedNum = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getNewRecruitNeedNum', arguments);
};





p.getRecruitPlanInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getRecruitPlanInfo', arguments);
};





p.getHCInfo = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getHCInfo', arguments);
};







p.genChooseExternalPost = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'genChooseExternalPost', arguments);
};






p.validateExternalPostProportion = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'validateExternalPostProportion', arguments);
};





p.getUniquekeyUserByProcessId = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getUniquekeyUserByProcessId', arguments);
};





p.getCustOrgNameByPostId = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getCustOrgNameByPostId', arguments);
};





p.getCustPostAssessTypeByPosId = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getCustPostAssessTypeByPosId', arguments);
};








p.queryUserByKeyWord = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryUserByKeyWord', arguments);
};








p.queryWorkPlaceByKeyWord = function(p0, p1, p2, p3, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryWorkPlaceByKeyWord', arguments);
};










p.queryDicByKeyWord = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryDicByKeyWord', arguments);
};









p.queryRecruitUserByKeyWord = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryRecruitUserByKeyWord', arguments);
};









p.queryInterviewerByKeyWord = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryInterviewerByKeyWord', arguments);
};









p.queryBrandByKeyWord = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryBrandByKeyWord', arguments);
};









p.queryCorpUserByKeyWord = function(p0, p1, p2, p3, p4, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryCorpUserByKeyWord', arguments);
};










p.queryRoleAuditUserByKeyWord = function(p0, p1, p2, p3, p4, p5, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'queryRoleAuditUserByKeyWord', arguments);
};






p.checkHCNum = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkHCNum', arguments);
};







p.staffHCNum = function(p0, p1, p2, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'staffHCNum', arguments);
};





p.validateStaffNo = function(p0, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'validateStaffNo', arguments);
};






p.checkRecruitPlanHCNum = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'checkRecruitPlanHCNum', arguments);
};






p.getFunIdArrayByCode = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getFunIdArrayByCode', arguments);
};






p.getFunCodeArrayByCodeInConsole = function(p0, p1, callback) {
return dwr.engine._execute(p._path, 'pageAjax', 'getFunCodeArrayByCodeInConsole', arguments);
};

dwr.engine._setObject("pageAjax", p);
}
})();

