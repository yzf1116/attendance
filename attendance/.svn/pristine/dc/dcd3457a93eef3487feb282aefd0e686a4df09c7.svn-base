const approve    = require('../../../service/approve/ApproveService');
module.exports = {
    //获取审批记录列表接口
    get_approverecord: function (req, res) {
        if (req.query && Object.keys(req.query).length !== 0) {
            approve.approveRecord(req.query, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到相关查询参数'})
        }

    },
    //删除审批记录
    post_delapproverecord: function (req, res) {
        if (req.body && Object.keys(req.body).length !== 0) {

            approve.delApproveRecord(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到参数'})
        }
    },
    //设置审批记录审批人，抄送人
    post_setapprovepolice: function (req, res) {
        if (req.body && Object.keys(req.body).length !== 0) {
            approve.setApprovePolice(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到参数'})
        }
    },
    //获取审批人
    get_getapprove: function (req, res) {
           approve.getApprove(req.query,function(ret) {
               res.send(ret)
           })
    },
    //保存审批人
    post_saveapproves: function (req,res){
        if (req.body && Object.keys(req.body).length !== 0) {
            approve.saveApproves(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到参数'})
        }
    },
    //保存默认审批人
    post_savedefaultapprove: function(req,res){
        if (req.body && Object.keys(req.body).length !== 0) {
            approve.saveDefaultApprove(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到参数'})
        }
    },
    //获取抄送人
    get_getsendperson: function(req,res){
           approve.getSendPerson(req.query,function(ret){
               res.send(ret)
           })
    },
    //保存抄送人
    post_savesendperson: function(req,res){
        if (req.body && Object.keys(req.body).length !== 0) {
            approve.saveSendPerson(req.body, function (ret) {
                res.send(ret)
            })
        } else {
            res.send({flag: false, msg: '未接收到参数'})
        }
    },
    //获取所有警员
    get_getallpolice: function(req,res){
        approve.getAllPolice(req.query,function(ret){
            res.send(ret)
        })
    },
    //获取出差审批列表
    get_gettravellist: function(req,res){
        approve.getTravelList(req.query,function(ret){
            res.send(ret)
        })
    },
    //获取请假审批记录
    get_getleavelist: function(req,res){
        approve.getLeaveList(req.query,function(ret){
            res.send(ret)
        })
    },
    //获取加班审批记录
    get_getovertimelist: function(req,res){
        approve.getOverTimeList(req.query,function(ret){
            res.send(ret)
        })
    },
    //获取补卡审批记录
    get_getfillcardlist: function(req,res){
        approve.getFillCardList(req.query,function(ret){
            res.send(ret)
        })
    },
    //从四个表中查询所有审批
    get_getallapprove: function(req,res){
        approve.getAllApprove(req.query,function(ret){
            res.send(ret)
        })
    },
    //从rev_apply中查询数据
    get_getapply: function(req,res){
        approve.getApply(req.query,function(ret){
            res.send(ret)
        })
    }

}
;