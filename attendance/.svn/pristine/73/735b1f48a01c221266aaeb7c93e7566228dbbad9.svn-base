/**
 * 前缀get为get请求，post为post请求，函数名统一小写，如果大写将获取不到路由映射。
 *
 */
var sysRoles = require('../../../service/system/RoleService.js');
var defData = {userid: '996eb844-dc43-44ca-b014-1e6b55f88afa', roleid: '7ccabe10-3a17-11e7-b6fc-bbe623bbcad0'};

module.exports = {

    get_index: function (req, res) {
        res.send({msg: '系统角色管理控制器入口文件测试成功'})

    },
    //保存角色信息
    post_savesysroleinfo: function (req, res) {
        if(req.body&&Object.keys(req.body).length!=0){
            sysRoles.saveSysRoleInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }

    },
    //删除角色信息
    post_delsysroleinfo: function (req, res) {
        var d = req.body;
        if((d.id&&d.id===defData.roleid)||(d.params&&d.params.indexOf(defData.roleid)!=-1)){
        // if((d.id&&d.id===req.session.adminData.roleid)||(d.params&&d.params.indexOf(req.session.adminData.roleid)!=-1)){
            res.send({flag:false,msg:'超级管理员不能删除'});
        }else{
            sysRoles.delSysRoleInfo(req.body,function (ret) {
                res.send(ret);
            })
        }

    },
    //保存角色菜单关联记录
    post_saverolemenu:function (req,res) {
        if(req.body&&Object.keys(req.body).length!=0){
            sysRoles.saveRoleMenu(req,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //保存用户角色关联
    post_saveroleuser:function (req,res) {
        if(req.body&&Object.keys(req.body).length!=0){
            sysRoles.saveRoleUser(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //查询角色信息
    get_getsysrolelist: function (req, res) {
        if(req.query&&Object.keys(req.query).length!=0){
            sysRoles.getSysRoleList(req,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //查询角色名称
    get_getsysrolesname: function (req, res) {
        sysRoles.getsysRolesName(req.query,function (ret) {
            res.send(ret);
        })
    },
    //根据角色获取菜单权限
    get_getsysrolemenu: function (req, res) {
        if(req.query&&Object.keys(req.query).length!=0){
            sysRoles.getSysRoleMenu(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //用户根据角色列表获取菜单列表
    get_getuserrolemenu:function (req,res) {
        if(req.query&&req.query.rolList){
            sysRoles.getUserRoleMenu(req,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //获取该角色绑定的所有用户
    get_sysroleuser:function (req,res) {
        if(req.query&&Object.keys(req.query).length!=0){
            sysRoles.sysRoleUser(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //根据用户获取角色列表
    get_getsysroleuser:function (req,res) {
        if(req.query&&Object.keys(req.query).length!=0){
            sysRoles.getSysRoleUser(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    }
}    


