/**
 * 前缀get为get请求，post为post请求，函数名统一小写，如果大写将获取不到路由映射。
 *
 */
var sysUser = require('../../../service/system/UserService.js');

module.exports = {

    get_index: function (req, res) {
        res.send({msg: '系统用户管理控制器入口文件测试成功'})

    },
    //查询所有用户信息
    get_getsysuserlist:function (req,res) {
        if(req.query&&Object.keys(req.query).length != 0){
            console.log(req.query);
            sysUser.getSysUserList(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'未接收到相关查询参数'});
        }
    },
    //保存用户信息
    post_savesysuserinfo:function (req,res) {
        if(req.body&&Object.keys(req.body).length != 0){
            if(req.body.roleid&&!req.body.id){//角色新增用户
                sysUser.saveSysUserByRole(req.body,function (ret) {
                    res.send(ret);
                })
            }else{
                sysUser.saveSysUserInfo(req.body,function (ret) {
                    res.send(ret);
                })
            }
            
        }else{
            res.send({success:false,msg:'未接收到用户信息'});
        }

    },
    //删除单个用户信息
    post_delsysuserinfo:function (req,res) {
        if(req.body&&req.body.id){
            sysUser.delSysUserInfo(req,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'未接收到要删除的用户信息'});
        }
    },
    //获取用户名
    get_getsysusername:function (req,res) {
        sysUser.getSysUserName(req.query,function (ret) {
            res.send(ret);
        })
    },
    /*********角色关联操作用户 start************* */
    //获取该角色绑定的所有用户
    get_getusersbyrole:function (req,res) {
        if(req.query&&req.query.roleid){
            sysUser.getUsersByRole(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null})
        }
    },
    //获取未绑定该角色的用户
    get_getusersnotbindrole:function(req,res){
        if(req.query&&req.query.roleid){
            sysUser.getUsersNotBindRole(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null})
        }
    },
    //保存用户角色绑定
    post_saveuserrole:function(req,res){
        if(req.body&&req.body.roleid){
            sysUser.saveUserRole(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null})
        }
    },
    //用户与当前角色解除绑定
    post_deluserrole:function(req,res){
        if(req.body&&req.body.roleid&&req.body.userid){
            sysUser.delUserRole(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null})
        }
    },
    //验证密码
    get_checkpsd:function (req,res) {
        if(req.query&&req.query.password){
            sysUser.checkPsd(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null})
        }
    }
    /*********角色关联操作用户 end************* */

}    

