var uuid = require('node-uuid');
var async = require('async');

var sysRolesModel = db['sys_role'];
var sysRoleUserModel = db['sys_role_user'];
var sysRoleMenuModel = db['sys_role_menu'];
var sysMenuModel = db['sys_menu'];
var sysUserModel = db['sys_user'];

var defData = {userid: '996eb844-dc43-44ca-b014-1e6b55f88afa', roleid: '7ccabe10-3a17-11e7-b6fc-bbe623bbcad0'};
//保存角色信息
exports.saveSysRoleInfo = function(data,callback){
    if(data.id){
        sysRolesModel.findOne({where:{rolename:data.rolename,id:{$notIn: [data.id]} },attributes:['id']}).then(function (res) {
            if(res&&res.id){
                return callback({flag:false,msg:'角色名称已存在，请确认后重新输入'});
            }else{
                sysRolesModel.update(data,{where:{id:data.id}}).then(function (res) {
                    callback({flag:true})
                }).catch(function (err) {
                    if(err){
                        callback({flag:false,msg:'修改错误'});
                    }
                })
            }
        }).catch(function (err) {
            if(err){
                return callback({flag:false,msg:'查询错误'})
            }
        })

    }else{
        data.id = uuid.v1();
        sysRolesModel.count({where:{rolename:data.rolename}}).then(function (res) {
            if(res&&res>0){
                return callback({flag:false,msg:'角色名称已存在，请确认后重新输入'});
            }else{
                sysRolesModel.upsert(data).then(function (res) {
                    callback({flag:true});
                }).catch(function (err) {
                    if(err){
                        callback({flag:false,msg:'插入错误'});
                    }
                })
            }
        }).catch(function (err) {
            if(err){
                return callback({flag:false,msg:'查询错误'});
            }
        })

    }
};

//删除角色信息
exports.delSysRoleInfo = function (data,callback) {
    var where = {};
    var where2 = {};
    var arr = [];
    if(data.params){
        var _list = data.params;
        for(var i in _list){
            arr.push(_list[i].id);
        }
        where = {id:{$in:arr}};
        where2 = {roleid:{$in:arr}};
    }else{
        where = {id:data.id};
        where2 = {roleid:data.id};
    }
    sysRoleUserModel.count({
        where:where2
    }).then(function (res) {
        if(res>0){
            callback({flag:false,msg:'所选角色已绑定用户，请先删除对应用户信息'});
        }else{
            sysRolesModel.destroy({where:where}).then(function (res) {
                callback({flag:true,msg:'删除成功'});
            }).catch(function (err) {
                if(err){
                    console.log(err);
                    return callback({flag:false,msg:'角色删除失败'});
                }
            })
        }
    }).catch(function (err) {
        console.log(err);
        if(err){
            console.log(err);
            return callback({flag:false,msg:'查询用户角色表出错'});
        }
    })

};

//查询角色信息
exports.getSysRoleList = function(req,callback){
    // if (!req.session.roleList || !req.session.adminData) {
    //     return callback({flag: false, msg: '未能获取到session，请重新登录'});
    // }
    var data = req.query;
    // var roleList = req.session.roleList;
    // var roleid = req.session.adminData.roleid;
    var roleid = defData.roleid;

    var btnShow=true;
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    if(data.rolename!=undefined){
        where = {
            rolename:{
                $like:'%'+data.rolename+'%'
            }
        };
    }

    // if(roleList.indexOf(roleid)!=-1){
    //     btnShow = true;
    // }else{
    //     sysRolesModel.count({
    //         where:{
    //             id:{$in:roleList},
    //             rolecode:'admin'
    //         }
    //     }).then(function (res) {
    //         if(res&&res>0){
    //             btnShow = true;
    //         }else{
    //             btnShow = false;
    //         }
    //     })
    // }
    sysRolesModel.findAndCountAll({
        where:where,
        limit:parseInt(data.pageSize),
        offset:parseInt(data.start)
    }).then(function (res) {
         callback({flag:true,data:res,btnShow:btnShow});
    }).catch(function (err) {
        if(err){
            console.log(err);
            return callback({flag: false, data: '查询错误', btnShow: btnShow});
        }
    })
};

//查询角色名称
exports.getsysRolesName = function (data,callback) {
    sysRolesModel.findAll({attributes:['id','rolename']}).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}

//根据角色获取菜单权限
exports.getSysRoleMenu = function (data,callback) {
    sysRoleMenuModel.findAll({
        where:data,
        attributes:[['menuid','id']]
    }).then(function (res) {
        callback({flag:true,data:res})
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'查询错误'})
        }
    })

}
//获取菜单列表
exports.getUserRoleMenu= function (req,callback) {
    var roleList = req.query.rolList;
    // var btnShow;
    // if(roleList.indexOf(admin)!=-1){
    //     btnShow = true;
    // }else{
    //     sysRolesModel.count({
    //         where:{
    //             id:{$in:roleList},
    //             rolecode:'admin'
    //         }
    //     }).then(function (res) {
    //         if(res&&res>0){
    //             btnShow = true;
    //         }else{
    //             btnShow = false;
    //         }
    //     })
    // }
    /**********判断用户角色是普通用户还是管理员**************/
    sysRoleMenuModel.findAll({
        where:{
            roleid:{
                $in:roleList
            }
        },
        attributes:['menuid']
    }).then(function (res) {
        var arr = [];
        for(var i=0;i<res.length;i++){
            arr.push(res[i].menuid);
        }
        sysMenuModel.findAll({
            where:{
                id:{
                    $in:arr
                },
                parent_menu_id:{
                    $not:null
                }
            },
            group:'parent_menu_id',
            attributes:['parent_menu_id']
        }).then(function (res) {
            for(var i=0;i<res.length;i++){
                if(arr.indexOf(res[i].parent_menu_id)==-1){
                    arr.push(res[i].parent_menu_id);
                }
            }
            sysMenuModel.findAll({
                where:{
                    id:{
                        $in:arr
                    }
                },
                order:[
                    ['menu_order']
                ]
            }).then(function (res) {
                callback({flag:true,data:res});
            }).catch(function (err) {
                if(err){
                    callback({flag:false,msg:'获取菜单列表错误'})
                }
            })
        }).catch(function (err) {
            if(err){
                callback({flag:false,msg:'获取菜单列表错误'})
            }
        })
    }).catch(function (err) {
        if(err){
            callback({flag:false,msg:'获取菜单列表错误'})
        }
    })

}

//保存角色菜单权限关联记录
exports.saveRoleMenu = function (req,callback) {
    var data = req.body;
    async.waterfall([
        function(cb){
            sysRoleMenuModel.destroy({
                where:{
                    roleid:data.roleid,
                    menuid:{
                        $in:data.delList
                    }
                }
            }).then( function (res){
                cb(null,res);
            }).catch(function (err) {
                return callback({flag:false,msg:'删除失败'});
            })
        },
        function (res,cb) {
            var addList = data.addList;
            var addArr = [];
            if(res>=0){
                for(var i=0;i<addList.length;i++){
                    var params = {
                        id:uuid.v1(),
                        roleid:data.roleid,
                        menuid:addList[i]
                    }

                   addArr.push(params);
                }
            }
            sysRoleMenuModel.bulkCreate(addArr).then(function (res) {
                cb(null,res);
            }).catch(function (err) {
                return callback({flag:false,msg:'批量插入失败'});
            })

        }],function(err,res){
            if(err){
                return callback({flag:false,msg:'绑定错误'})
            }
            callback({flag:true,msg:'保存成功'});
    });

}

//根据角色获取用户列表
exports.sysRoleUser = function (data, callback) {
    sysRolesModel.findAll({
        where: data,
        include:[
            {model:sysUserModel,attributes:['id','username']}
        ]
    }).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'查询错误'})
        }
    })
}


//根据用户获取用户角色列表
exports.getSysRoleUser = function (data,callback) {
    sysRoleUserModel.findAll({
        where:data,
        attributes:[['roleid','id']]
    }).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'查询错误'})
        }
    })
}
//保存用户角色关联
exports.saveRoleUser = function (data,callback) {
    async.waterfall([
        function(cb){
            sysRoleUserModel.destroy({
                where:{
                    userid:data.userid,
                    roleid:{
                        $in:data.delList
                    }
                }
            }).then( function (res){
                cb(null,res);
            }).catch(function (err) {
                return callback({flag:false,msg:'删除失败'});
            })
        },
        function (res,cb) {
            var addList = data.addList;
            var addArr = [];
            if(res>=0){
                for(var i=0;i<addList.length;i++){
                    var params = {
                        id:uuid.v1(),
                        userid:data.userid,
                        roleid:addList[i]
                    }
                    addArr.push(params);
                }
            }
            sysRoleUserModel.bulkCreate(addArr).then(function (res) {
                cb(null,res);
            }).catch(function (err) {
                return callback({flag:false,msg:'批量插入失败'});
            })

        }],function(err,res){
        if(err){
            return callback({flag:false,msg:'绑定错误'})
        }
        callback({flag:true,msg:'保存成功'});
    });

}
