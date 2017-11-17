var uuid = require('node-uuid');

var sysDepartModel = db['sys_depart'];
var sysUserModel = db['sys_user']
//保存部门信息
exports.saveSysDepartInfo = function(data,callback){
    if(data.id){
        sysDepartModel.findOne({where:{org_code:data.org_code,id:{$notIn: [data.id]} },attributes:['id']}).then(function (res) {
            if(res&&res.id){
                return callback({flag:false,msg:'组织机构编码已存在，请确认后重新输入'});
            }else{
                sysDepartModel.update(data,{where:{id:data.id}}).then(function (res) {
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
        sysDepartModel.count({where:{org_code:data.org_code}}).then(function (res) {
            if(res&&res>0){
                return callback({flag:false,msg:'组织机构编码已存在，请确认后重新输入'});
            }else{
                sysDepartModel.upsert(data).then(function (res) {
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


//删除部门信息
exports.delSysDepartInfo = function (data,callback) {
    var where = {};
    var where2 = {};
    var arr = [];
    if(data.params){
        var _list = data.params;
        for(var i in _list){
            arr.push(_list[i].id);
        }
        where = {id:{$in:arr}};
        where2 = {departid:{$in:arr}};
    }else{
        where = {id:data.id};
        where2 = {departid:data.id};
    }
    sysUserModel.count({
        where:where2
    }).then(function (res) {
        if(res>0){
            callback({flag:false,msg:'所选部门下有用户，请先删除对应用户信息'});
        }else{
            sysDepartModel.destroy({where:where}).then(function (res) {
                callback({flag:true,msg:'删除成功'});
            }).catch(function (err) {
                if(err){
                    console.log(err);
                    return callback({flag:false,msg:'删除失败'});
                }
            })
        }
    }).catch(function (err) {
        console.log(err);
        if(err){
            console.log(err);
            return callback({flag:false,msg:'查询对应用户列表出现错误'});
        }
    })

};

//查询部门信息
exports.getSysDepartList = function(data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    if(data.departname!=undefined){
        where = {
            departname:{
                $like:'%'+data.departname+'%'
            }
        };
    }
    sysDepartModel.findAndCountAll({
        where:where,
        limit:parseInt(data.pageSize),
        offset:parseInt(data.start)
    }).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            console.log(err);
            return callback({flag:false,data:'查询错误'});
        }
    })
};

//查询部门名称
exports.getsysDepartName = function (data,callback) {
    sysDepartModel.findAll({attributes:['id','departname','org_code']}).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}
