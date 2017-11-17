/**
 * Created by Jessi on 2017/7/10.
 */
const AjaxJson = require('../../../utils/AjaxJson');
const PersonService = require('../../../service/api/personService');

const uploadMulter = require('../../../utils/uploadMulter');
const upload = uploadMulter();//如果不传路径参数，路径默认为图片路径public/upload/image,传入参数可以指定其他路径。

module.exports = {
    get_index: function (req, res) {
        res.send({msg: 'home api'});
    },
    post_monthstats:function(req,res){//按月统计
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            if(req.body.policeid&&req.body.month){
                PersonService.monthStats(req.body,function(ret){
                    res.send(ret);
                })
            }else{
                aj.msg = "参数错误";
                res.send(aj); 
            }
        }else{
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_dailystats:function(req,res){//按月统计
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            if(req.body.policeid&&req.body.day){
                PersonService.dailyStats(req.body,function(ret){
                    res.send(ret);
                })
            }else{
                aj.msg = "参数错误";
                res.send(aj);
            }
        }else{
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_personalinfo:function(req,res){//查询用户信息
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            if(req.body.policeid){
                PersonService.personalInfo(req.body,function(ret){
                    res.send(ret);
                })
            }else{
                aj.success = false;
                aj.msg = "参数错误";
                res.send(aj); 
            }
        }else{
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_changepsd:function(req,res){//修改密码
        const aj = new AjaxJson();
        if(req.body&&Object.keys(req.body).length>0){
            if(req.body.policeid&&req.body.oldPsd&&req.body.newPsd){
                PersonService.changePsd(req.body,function(ret){
                    res.send(ret);
                })
            }else{
                aj.success = false;
                aj.msg = "参数错误";
                res.send(aj); 
            }
        }else{
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_uploadavatar: [upload.array('file'), function (req, res) {
        PersonService.uploadAvatar(req,function(ret){
            res.send(ret);
        });
    }],
    post_locationrecord: function (req, res) {//保存用户位置信息
        const aj = new AjaxJson();
        if (req.body && Object.keys(req.body).length > 0) {
            if (req.body.policeid) {
                PersonService.saveLocationRecord(req.body, function (ret) {
                    res.send(ret);
                })
            } else {
                aj.success = false;
                aj.msg = '没有用户id';
                callback(aj);
            }
        } else {
            aj.success = false;
            aj.msg = '没有参数';
            callback(aj);
        }
    },
    post_getorglist: function (req, res) {//获取组织机构列表，不需要参数
        var aj = new AjaxJson();
        if (req.body && req.body.departid) {
            PersonService.getOrgList(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }

    },
    post_getorginfo: function (req, res) {//获取组织机构详情
        var aj = new AjaxJson();
        if (req.body && req.body.departid) {
            PersonService.getOrgInfo(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    post_getpolicelist: function (req, res) {//获取警员列表，带参数
        var aj = new AjaxJson();
        if (req.body && req.body.departid) {
            PersonService.getPoliceList(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = "没有相关参数";
            res.send(aj);
        }
    },
    // post_test:function (req,res) {
    //     PersonService.test(req,function (ret) {
    //         res.send(ret)
    //     })
    // }
};