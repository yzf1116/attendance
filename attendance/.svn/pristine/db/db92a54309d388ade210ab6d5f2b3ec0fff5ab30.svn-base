/**
 * Created by DELL on 2017/6/22.
 */
var schedule = require('../../../service/attendance/AtdScheduleService.js');
module.exports={
    get_index: function (req, res) {
        res.send({msg: '班次请求'})
    },
    //保存班次
    post_savescheduleinfo:function (req,res) {
        if(req.body){
            schedule.saveScheduleInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //删除班次信息
    post_deletescheduleinfo:function (req,res) {
        if(req.body){
            schedule.delScheduleInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //查询组织机构
    get_getschedulelist:function (req,res) {
        schedule.getScheduleList(req.query,function (ret) {
            res.send(ret);
        })
    },
    get_getscheduleforgrouplist:function (req,res) {
        schedule.getScheduleForGroupList(req.query,function (ret) {
            res.send(ret)
        })
    }
}