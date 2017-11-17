var uuid = require('node-uuid');
var plRoleModel = db['pl_role'];
var policeModel=db['pl_person'];
var plRolePoliceModel=db['pl_role_police'];

var ajaxJson = require('../../utils/AjaxJson');
var sysAnnexModel = db['sys_annex'];

// plRolePoliceModel.belongsTo(policeModel,{foreignKey:'policeid'});
//保存(警员)角色信息
exports.savePlRole = function(data,callback){
    if(data.id){
        plRoleModel.findOne({where:{role_code:data.role_code,id:{$notIn: [data.id]} },attributes:['id']}).then(function (res) {
            if(res&&res.id){
                return callback({flag:false,msg:'警员角色编码已存在，请确认后重新输入'});
            }else{
                plRoleModel.update(data,{where:{id:data.id}}).then(function (res) {
                    callback({flag: res, msg: '操作成功'});
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
        plRoleModel.count({where:{role_code:data.role_code}}).then(function (res) {
            if(res&&res>0){
                return callback({flag:false,msg:'警务角色编码已存在，请确认后重新输入'});
            }else{
                plRoleModel.upsert(data).then(function (res) {
                    callback({flag: res, msg: '操作成功'});
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


//删除(警员)角色信息
exports.delPlRoleInfo = function (data,callback) {
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
    plRolePoliceModel.count({
        where:where2
    }).then(function (res) {
        if(res&&res>0){
            callback({flag:false,msg:'所选角色已绑定警员，请先删除对应警员信息'});
        }else{
            plRoleModel.destroy({where:where}).then(function (res) {
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
            return callback({flag:false,msg:'查询错误'});
        }
    })

};

//分页查询(警员) 角色信息
exports.getPlRoleList = function(data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    if(data.role_name){
        where = {
            role_name:{
                $like:'%'+data.role_name+'%'
            }
        };
    }
    plRoleModel.findAndCountAll({
        where:where,
        limit:parseInt(data.pageSize),
        offset:parseInt(data.start)
    }).then(function (res) {
        var d = res.rows;
        for(var i=0;i<d.length;i++){
            d[i].useable = d[i].useable==1?true:d[i].useable==0?false:true;
        }
        //console.log(44,res.rows);
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            console.log(err);
            return callback({flag:false,data:'查询错误'});
        }
    })
};

//查询所有(警员)角色
exports.getAllPlRoles = function (data,callback) {
    plRoleModel.findAll({attributes:['id','role_name','role_code']}).then(function (res) {
        callback({flag:true,data:res});
    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'查询失败'});
        }
    })
}

//获取所有警员角色列表
exports.getPoliceRoleListRole = function (data,callback) {
    var aj = new ajaxJson();
    plRoleModel.findAll({
        attributes:['id','role_name']
    }).then(function (res) {
        callback(aj);
    }).catch(function (err) {
        if(err){
            aj.success = false;
            aj.msg = '查询失败';
            callback(aj);
        }
    })
}

//根据警员id获取已绑定警员角色id
exports.getRoleByPolice = function (data,callback) {
    var aj = new ajaxJson();
    plRolePoliceModel.findAll({
        where:data,
        attributes:['roleid']
    }).then(function (res) {
        callback(aj);
    }).catch(function (err) {
        if(err){
            aj.success = false;
            aj.msg = '查询失败';
            callback(aj);
        }
    })
}


/**************与警员相关  start*********************/
//按角色获取所有警员
exports.getPListByRole = function (data, callback) {
    var aj = new ajaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize)
    var where = {};
    var count;
    var result;
    if (data.police_name != undefined) {
        where = {
            police_name: {
                $like: '%' + data.police_name + '%'
            }
        }
    }
    plRolePoliceModel.findAndCountAll({
        where: {roleid:data.roleid},
        limit: parseInt(data.pageSize),
        offset: parseInt(data.start)
    }).then(function (res) {
        if(res&&res.count>0){
            count = res.count;
            var d = res.rows;
            var policeArr = [];
            for(var i=0;i<d.length;i++){
                policeArr.push(d[i].policeid);
            }
            where.id = {$in:policeArr};
            policeModel.findAll({
                where:where,
                attributes: ['id', 'police_name', 'phone', 'code']
            }).then(res =>{
                aj.result = {count:count,rows:res};
                callback(aj);
            }).catch(err => {
                if (err) {
                    aj.success = false;
                    aj.msg = '查询错误';
                    callback(aj);
                }
            })
        }else{
            aj.result = {count:0,rows:[]};
            callback(aj);
        }
       
    }).catch(function (err) {
        if (err) {
            aj.success = false;
            aj.msg = '查询错误';
            callback(aj);
        }
    })
}
/**************与警员相关  end*********************/

//获取未绑定角色的警员列表(警员与角色1对1)
exports.getPoliceNotBindRole = function(data,callback){
    data.start = (parseInt(data.page)-1)*parseInt(data.pageSize);
    var where = {};
    var aj = new ajaxJson();//返回前端内容
    var optJson = JSON.parse(data.options);
    if (isOptionNull(optJson)) {
        where = {
            police_name: {
                $like: '%' + optJson.police_name + '%'
            }
        }
    }
    plRolePoliceModel.findAll({
        attributes:['policeid']
    }).then(res=>{
        var d = res;
        var policeArr = []
        if(d&&d.length>0){
            for(var i=0;i<d.length;i++){
                if(d[i].policeid!=null){
                    policeArr.push(d[i].policeid);
                }
            }
            where.id = {$notIn:policeArr};
        }
        policeModel.findAndCountAll({
            where:where,
            limit:parseInt(data.pageSize),
            offset:parseInt(data.start),
            attributes: ['id', 'police_name', 'phone', 'code']
        }).then(res => {
            aj.result = res;
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

//绑定警员角色
exports.saveRolePolice = function(data,callback){
    var policeArr = data.policeList;
    var dataArr = [];
    var aj = new ajaxJson();
    for(var i=0;i<policeArr.length;i++){
        var param = {
            id:uuid.v1(),
            policeid:policeArr[i],
            roleid:data.roleid
        }
        dataArr.push(param);
    }
    plRolePoliceModel.bulkCreate(dataArr).then(res =>{
        aj.success = res;
        callback(aj);
    }).catch(err=>{
        if(err){
            aj.success = false;
            aj.msg = "警员角色关联插入错误";
            return callback(aj);
        }
    })
}

//判断查询条件是否有一个以上有值
function isOptionNull(json){
    var info = false;
    for(var p in json){//遍历json对象的每个key/value对,p为key
        if(json[p]!=''){
            info = true;
        }
    }
    return info;
}