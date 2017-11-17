/**
 * 前缀get为get请求，post为post请求，函数名统一小写，如果大写将获取不到路由映射。
 *
 */
var sysMenu = require('../../../service/system/MenuService.js');

module.exports = {

    get_index: function (req, res) {
        res.send({msg: '菜单管理控制器入口文件测试成功'})

    },
    //保存菜单信息
    post_savesysmenuinfo: function (req, res) {
        sysMenu.saveSysMenuInfo(req,function (ret) {
            res.send(ret);
        })

    },
    //删除菜单信息
    post_delsysmenuinfo: function (req, res) {
        sysMenu.delSysMenuInfo(req.body,function (ret) {
            res.send(ret);
        })
    },
    //查询菜单信息
    get_getsysmenulist: function (req, res) {
        sysMenu.getSysMenuList(req.query,function (ret) {
            res.send(ret);
        })
    },
    //查询菜单名称

    get_getsysmenulevel: function (req, res) {
        sysMenu.getsysMenuLevel(req.query,function (ret) {
            res.send(ret);
        })
    },
    //查询菜单

    get_getsysmenualllist: function (req, res) {
        sysMenu.getsysMenuAllList(req.query,function (ret) {
            res.send(ret);
        })
    }
}    

