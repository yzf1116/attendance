/**
 * 前缀get为get请求，post为post请求，函数名统一小写，如果大写将获取不到路由映射。
 *
 */
var sysDepart = require('../../../service/system/DepartService.js');

module.exports = {

    get_index: function (req, res) {
        res.send({msg: '系统部门管理控制器入口文件测试成功'})

    },
    //保存部门信息
    post_savesysdepartinfo:function (req,res) {
        if(req.body&&Object.keys(req.body).length!=0){
            sysDepart.saveSysDepartInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //删除部门信息
    post_delsysdepartinfo:function (req,res) {
        if(req.body&&Object.keys(req.body).length!=0){
            sysDepart.delSysDepartInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //查询部门信息
    get_getsysdepartlist:function (req,res) {
        if(req.query&&Object.keys(req.query).length!=0){
            sysDepart.getSysDepartList(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //查询部门名称
    get_getsysdepartname:function (req,res) {
        sysDepart.getsysDepartName(req.query,function (ret) {
            res.send(ret);
        })
    }
    
}    



