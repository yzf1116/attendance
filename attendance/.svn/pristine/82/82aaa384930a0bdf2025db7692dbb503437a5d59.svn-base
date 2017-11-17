var uuid = require('node-uuid');
var async = require('async');

var defData = {userid:'996eb844-dc43-44ca-b014-1e6b55f88afa',roleid: '7ccabe10-3a17-11e7-b6fc-bbe623bbcad0'};

var sysUserModel = db['sys_user'];
var sysDepartModel = db['sys_depart'];
var sysRoleUserModel = db['sys_role_user'];

var ajaxJson = require('../../utils/AjaxJson');
var cryptoUtils = require('../../utils/cryptoUtils');

//查询用户信息
exports.getSysUserList = function (data,callback) {
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var optJson = JSON.parse(data.options);
    var where = {};
    if(isOptionNull(optJson)){
        if(optJson.departid.length>0){
            where = {
                departid:{
                    $in:optJson.departid
                },
                username:{
                    $like:'%'+optJson.username+'%'
                },
                realname:{
                    $like:'%'+optJson.realname+'%'
                }
            };
        }else{
            where = {
                username:{
                    $like:'%'+optJson.username+'%'
                },
                realname:{
                    $like:'%'+optJson.realname+'%'
                }
            };
        }
    }
    async.waterfall([
        function(cb){
          sysUserModel.findAndCountAll({
              where:where,
              limit:parseInt(data.pageSize),
              offset:parseInt(data.start)
          }).then(function (res) {
                if (res){
                    cb(null,res);
                }
            }).catch(function (err) {
                cb(err);
            })
        },function (res,cb) {
            var count = res.count;
            var i = 0;
            var dataList = res.rows;
            var Arr = [];
            async.whilst(
                function(){
                    return i<dataList.length;
                },function(whilecb){
                    var d = dataList[i].dataValues;
                    var departid = d.departid;
                  sysDepartModel.findOne({
                      where: {
                        id:departid
                      },
                      attributes: ['departname']
                  }).then( function (res){
                      if(res) {
                          d.departname=res.dataValues.departname;
                      }else{
                        d.departname='未知';
                      }
                      Arr.push(d);
                      whilecb('',Arr,count);
                  }).catch(function (err) {
                      if(err){
                          return console.log(err);
                      }
                  })
                  i++;
                },function(err,res,res2){
                    if(err){
                        return console.log(err);
                    }
                    cb('',res,res2);
                })
        }],function(err,res,res2){
        if(err){
            return callback({flag:false,data:err})
        }
        callback({flag:true,data:res,count:res2});
    });

};


//保存用户信息
exports.saveSysUserInfo = function (data,callback) {
    var aj = new ajaxJson();
    if(data.password){
        data.password = cryptoUtils.irreversibleEncrypt(data.username,data.password);//加密
    }
    if(data.id){
        sysUserModel.findOne({where:{username:data.username,id:{$notIn: [data.id]}},attributes:['id']}).then(function (res) {
            if(res&&res.id){
                aj.success = false;
                aj.msg = '用户名已存在，请重新输入';
                return callback(aj);
            }else{
                sysUserModel.update(data,{where:{id:data.id}}).then(function (res) {
                    if(res){
                        return callback(aj);
                    }else{
                        aj.success = false;
                        aj.msg = '更新失败';
                        return callback(aj);
                    }
                }).catch(function (err) {
                    if(err){
                        aj.success = false;
                        aj.msg = '修改错误';
                        return callback(j);
                    }
                })
            }
        }).catch(function (err) {
            if(err){
                aj.success = false;
                aj.msg = '查询错误';
                return callback(aj);
            }
        })

    }else{
        data.id = uuid.v1();
        data.status = 1;
        sysUserModel.count({where:{username:data.username}}).then(function (res) {
            if(res&&res>0){
                aj.success = false;
                aj.msg = '用户名已存在，请重新输入';
                return callback(aj);
            }else{
                sysUserModel.upsert(data).then(function (res) {
                    return callback(aj);
                }).catch(function (err) {
                    if(err){
                        aj.success = false;
                        aj.msg = '新增错误';
                        return callback(aj);
                    }
                })
            }
        }).catch(function (err) {
            if(err){
                aj.success = false;
                return callback(aj);
            }
        })

    }
};

//删除用户信息
exports.delSysUserInfo = function (req,callback) {
    var data = req.body;
    var userid = defData.userid;//系统用户id,现在写死的
    if(data.id===userid){
      return callback({flag:false,msg:'系统用户不能删除'});
    }
    // var where = {};
    // var arr = [];
    // if(data.params){
    //     var _list = data.params;
    //     for(var i in _list){
    //         arr.push(_list[i].id);
    //     }
    //     where = {id:{$in:arr}};
    // }else{
    //     where = {id:data.id};
    // }
     sysRoleUserModel.destroy({where:{userid:data.id}}).then(function (res) {
            sysUserModel.destroy({where:{id:data.id}}).then(function (res) {
                    callback({flag:true});
                }).catch(function (err) {
                    if(err){
                        console.log(err);
                        return callback({flag:false,msg:"删除用户信息失败"});
                    }
                })
        }).catch(function (err) {
            if(err){
                console.log(err);
                return callback({flag:false,msg:"删除用户角色信息失败"});
            }
        })
   
};

//获取用户名
exports.getSysUserName = function (data,callback) {
    sysUserModel.findAll({
        attributes:['id','username']
    }).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'获取错误'})
        }
    })
}
//验证旧密码
exports.checkPsd = function (data,callback) {
    data.password = cryptoUtils.irreversibleEncrypt(data.username,data.password);
    sysUserModel.count({
        where:data
    }).then(function (res) {
        callback({flag:res,msg:'操作成功'});
    }).catch(function (err) {
        if(err){
            return callback({flag:false,msg:'获取错误'})
        }
    })
}


function isOptionNull(json){
    var info = false;
    for(var p in json){//遍历json对象的每个key/value对,p为key
        if(json[p]!=''){
            info = true;
        }
    }
    return info;
}

/************角色管理页面对用户操作 start***************/
//按角色分页查询
exports.getUsersByRole =function (data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var optJson = JSON.parse(data.options);
    var where = {};
    var aj = new ajaxJson();//返回前端内容
    if(isOptionNull(optJson)){
            
        where = {
            username:{
                $like:'%'+optJson.username+'%'
            },
            realname:{
                $like:'%'+optJson.realname+'%'
            }
        };
    }
    sysRoleUserModel.findAndCountAll({
        where:{roleid:data.roleid},
        limit:parseInt(data.pageSize),
        offset:parseInt(data.start)
    }).then(res=>{
        var count = res.count;
        var d = res.rows;
        var userid = []
        for(var i=0;i<d.length;i++){
            if(d[i].userid != defData.userid){//不显示系统用户
                userid.push(d[i].userid);
            }
           
        }
        where.id = {$in:userid};
        sysUserModel.findAll({
            where:where
        }).then(res => {
            aj.result = {count:count,rows:res};
            callback(aj);
        }).catch(err =>{
            if(err){
                aj.success = false;
                aj.msg = "用户列表查询错误";
                callback(aj);
            }
        })
    }).catch(err=>{
        if(err){
            aj.success = false;
            aj.msg = "角色用户关联查询错误";
            return callback(aj);
        }
    })
}
//保存用户信息和用户角色关联
exports.saveSysUserByRole = function(data,callback){
    var aj = new ajaxJson();
    data.id = uuid.v1();
    data.status = 1;
    data.password = cryptoUtils.irreversibleEncrypt(data.password);
    sysUserModel.count({where:{username:data.username}}).then(function (res) {
        if(res&&res>0){
            return callback({flag:false,msg:'用户名已存在，请重新输入'})
        }else{
            sysUserModel.upsert(data).then(function (res) {
                if(res){
                    var par = {id:uuid.v1(),roleid:data.roleid,userid:data.id};
                    sysRoleUserModel.upsert(par).then(res => {
                          return callback(aj);  
                    }).catch(err =>{
                        if(err){
                            aj.success =false;
                            aj.msg = "用户信息插入成功，角色绑定错误";
                            return callback(aj);
                        }
                    })
                }else{
                    aj.success = false;
                    aj.msg = "用户信息插入错误";
                    return callback(aj); 
                }
            }).catch(function (err) {
                if(err){
                    aj.success = false;
                    aj.msg = "用户排重查询错误";
                    return callback(aj);
                }
            })
        }
    }).catch(function (err) {
        if(err){
            aj.success = false;
            aj.msg = "用户排重查询错误";
            return callback(aj);
        }
    })
}

//排除角色分页查询用户列表
exports.getUsersNotBindRole =function (data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    var aj = new ajaxJson();//返回前端内容
    var optJson = JSON.parse(data.options);
    if(isOptionNull(optJson)){
        where = {
            username:{
                $like:'%'+optJson.username+'%'
            },
            realname:{
                $like:'%'+optJson.realname+'%'
            }
        };
    }
    sysRoleUserModel.findAll({
        where:{roleid:data.roleid},
        attributes:['userid']
    }).then(res=>{
        var d = res;
        var userid = [defData.userid];
        if(res&&res.length>0){
            for(var i=0;i<d.length;i++){
                if(d[i].userid!=null){
                    userid.push(d[i].userid);
                }
            }
        }
        where.id = {$notIn:userid};
        sysUserModel.findAndCountAll({
            where:where,
            limit:parseInt(data.pageSize),
            offset:parseInt(data.start)
        }).then(res => {
            aj.result = res;
            callback(aj);
        }).catch(err =>{
            if(err){
                aj.success = false;
                aj.msg = '用户列表查询错误';
                callback(aj);
            }
        })
    }).catch(err=>{
        if(err){
            aj.success = false;
            aj.msg = '角色用户关联查询错误';
            return callback(aj);
        }
    })
}
//保存用户角色关联
exports.saveUserRole = function(data,callback){
    var userArr = data.userList;
    var dataArr = [];
    var aj = new ajaxJson();
    for(var i=0;i<userArr.length;i++){
        var params = {
            id:uuid.v1(),
            roleid:data.roleid,
            userid:userArr[i]
        }
        dataArr.push(params);
    }
    sysRoleUserModel.bulkCreate(dataArr).then(res=>{
            aj.success = res;
            callback(aj);
    }).catch(err=>{
        if(err){
            aj.success = false;
            aj.msg = '用户角色关联插入错误';
            return callback(aj);
        }
    })

}

//删除当前用户与当前角色绑定关系
exports.delUserRole = function(data,callback){
    var aj = new ajaxJson();
    sysRoleUserModel.destroy({
        where:data
    }).then(res=>{
        aj.success = res;
        callback(aj);
    }).catch(err=>{
        if(err){
            aj.success = false;
            aj.msg = "用户角色关联插入错误";
            return callback(aj);
        }
    })

}
/***************角色管理页面对用户操作 end************/