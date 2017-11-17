/**
 * Created by Jessi on 2017/7/10.
 */
const AjaxJson = require('../../../utils/AjaxJson');
const ReviewService = require('../../../service/api/ReviewService');

const uploadMulter = require('../../../utils/uploadMulter');
const upload = uploadMulter();//如果不传路径参数，路径默认为图片路径public/upload/image,传入参数可以指定其他路径。

module.exports = {
    post_gettemplist:function(req,res){//获取审批模板列表
        ReviewService.getTempList(req.body,function(ret){
            res.send(ret);
        })
    },
    post_gettempbyid:function(req,res){//根据模板类型获取审批模板
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            if(req.body.policeid){
                ReviewService.getTempById(req.body,function(ret){
                    res.send(ret);
                })
            }else{
                aj.success = false;
                aj.msg = "参数错误";
                res.send(aj);
            }
        }else{
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_saveapplyrecord: [upload.array('file'), function (req, res) {
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            ReviewService.saveApplyRecord(req, function (ret) {
                res.send(ret);
            })
        }else{
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    }],

    //通过申请人id查询申请表信息
    post_getapplylist: function (req, res) {
        const aj = new AjaxJson();
        if (req.body && Object.keys(req.body).length > 0) {
            ReviewService.getApplyList(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    //通过审批人id查询审核记录表信息
    post_getapprovallist:function (req,res) {
        const aj = new AjaxJson();
        if (req.body && Object.keys(req.body).length > 0) {
            ReviewService.getApprovalList(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_saveapprover: function (req, res) {
        const aj = new AjaxJson();
        if (req.body && Object.keys(req.body).length > 0) {
            ReviewService.changeApplyByAppr(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.msg = "没有相关参数";
            res.send(aj);
        } 
    }
};