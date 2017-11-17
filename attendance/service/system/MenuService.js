var uuid = require('node-uuid');

var sysMenuModel = db['sys_menu'];
var sysRoleMenuModel = db['sys_role_menu'];
var defData = {userid: '996eb844-dc43-44ca-b014-1e6b55f88afa', roleid: '7ccabe10-3a17-11e7-b6fc-bbe623bbcad0'};

//保存菜单信息
exports.saveSysMenuInfo = function(req,callback){
    // var roleid = req.session.adminData.roleid||'7ccabe10-3a17-11e7-b6fc-bbe623bbcad0';
    // var roleid = '7ccabe10-3a17-11e7-b6fc-bbe623bbcad0';
    var roleid = defData.roleid;//现在先在全局存储系统的userid,roleid
    var data = req.body;
    if(data.id){
        sysMenuModel.findOne({where:{menu_name:data.menu_name,id:{$notIn: [data.id]} },attributes:['id']}).then(function (res) {
            if(res&&res.id){
                return callback({flag:false,msg:'菜单名称已经存在，请确认后重新输入'});
            }else{
                sysMenuModel.update(data,{where:{id:data.id}}).then(function (res) {
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
        sysMenuModel.count({where:{menu_name:data.menu_name}}).then(function (res) {
            if(res&&res>0){
                return callback({flag:false,msg:'菜单名称已经存在，请确认后重新输入'});
            }else{
                sysMenuModel.upsert(data).then(function (res){
                    if(res){
                        var d = {
                            id: uuid.v1(),
                            roleid: roleid,
                            menuid: data.id
                        };
                        sysRoleMenuModel.upsert(d).then(function (res) {//更新超管角色菜单
                            callback({flag:true});
                        }).catch(function (err) {
                            if(err){
                                callback({flag:false,msg:'超级管理员角色菜单插入错误'});
                            }
                        })
                    }
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


//删除菜单信息
exports.delSysMenuInfo = function (data,callback) {
    sysMenuModel.count({where:{parent_menu_id:data.id}}).then(function (res) {
        if(res&&res>0){
            return callback({flag:false,msg:'此菜单下存在子菜单，请先删除子菜单'});
        }else{
            sysMenuModel.destroy({where:{id:data.id}}).then(function (res) {
                if(res){
                    sysRoleMenuModel.destroy({where:{menuid:data.id}}).then(function (res) {
                        callback({flag:true});
                    }).catch(function (err) {
                        if(err){
                            console.log(err);
                            return callback({flag:false,msg:err});
                        }
                    })
                }else{
                    callback({flag:false});
                }

            }).catch(function (err) {
                if(err){
                    console.log(err);
                    return callback({flag:false,msg:err});
                }
            })
        }
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'查询错误'});
        }
    })




};

//查询菜单信息
exports.getSysMenuList = function(data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    if(data.menu_name!=undefined||data.menu_type!=undefined){
        where = {
            menu_name:{
                $like:'%'+data.menu_name+'%'
            },
            menu_type:{
                $like:'%'+data.menu_type+'%'
            },
        };
    }
    sysMenuModel.findAndCountAll({
        where:where,
        limit:parseInt(data.pageSize),
        offset:parseInt(data.start),
        // include:[
        //     {model:baseModel.tunnelModel,attributes:['id','tunnel_title']}
        // ]
    }).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            console.log(err);
            return callback({flag:false,data:'查询错误'});
        }
    })
};

//查询菜单名称
exports.getsysMenuName = function (data,callback) {
    var where = {};
        where={
            menu_name:data.menu_name
        }
    sysMenuModel.findAll({where:where,attributes:['id','menu_name']}).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}

//查询父级菜单
exports.getsysMenuLevel = function (data,callback) {
    var where = {};
    where={
        menu_level:0
    }
    sysMenuModel.findAll({where:where,attributes:['id','menu_name']}).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}


//查询菜单信息（所有）
exports.getsysMenuAllList = function (data,callback) {
    sysMenuModel.findAll({
            order: [
                // 转义 username 并对查询结果按 DESC 方向排序
                ['menu_order'],
            ]
    }
    ).then(function (res) {
        var obj={};
        var data=[];
        var datacom=[];
        for (var i = 0; i < res.length; i++) {
            if (res[i].menu_level === 0) {
                if(res[i].menu_type===1){
                    var sub={};
                    sub.id=res[i].id;
                    sub.menu_name=res[i].menu_name;
                    sub.menu_order=res[i].menu_order;
                    sub.menu_icon=res[i].menu_icon;
                    sub.children=[];
                    for(var x=0;x<res.length;x++){
                        if(res[x].parent_menu_id==res[i].id){
                            sub.children.push({id:res[x].id,menu_name:res[x].menu_name,menu_order:res[x].menu_order})
                        }
                    }
                    data.push(sub);
                }else{
                    var sub={};
                    sub.id=res[i].id;
                    sub.menu_name=res[i].menu_name+' (便捷导航)';
                    sub.menu_order=res[i].menu_order;
                    sub.menu_icon=res[i].menu_icon;
                    sub.children=[];
                    for(var x=0;x<res.length;x++){
                        if(res[x].parent_menu_id==res[i].id){
                            sub.children.push({id:res[x].id,menu_name:res[x].menu_name,menu_order:res[x].menu_order})
                        }
                    }
                    data.push(sub);
                }

            }
        }
        obj.public=data;
        obj.sys=datacom;
        callback({flag:true,data:data});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}
