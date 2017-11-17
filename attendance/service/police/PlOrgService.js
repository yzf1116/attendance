/**
 * Created by DELL on 2017/6/21.
 */
var uuid = require('node-uuid');
var PlOrgModel = db['pl_org'];
var plPersonModel = db['pl_person']

//保存部门信息
exports.savePlOrgInfo = function (data, callback) {

    if (data.id) {

        PlOrgModel.findOne({
            where: {org_code: data.org_code, id: {$notIn: [data.id]}},
            attributes: ['id']
        }).then(function (res) {
            if (res && res.id) {
                return callback({flag: false, msg: '组织机构编码已存在，请确认后重新输入'});
            } else {
                PlOrgModel.update(data, {where: {id: data.id}}).then(function (res) {
                    callback({flag: true})
                }).catch(function (err) {
                    if (err) {
                        callback({flag: false, msg: '修改错误'});
                    }
                })
            }
        }).catch(function (err) {
            if (err) {
                return callback({flag: false, msg: '查询错误'})
            }
        })

    } else {
        data.id = uuid.v1();
        PlOrgModel.count({where: {org_code: data.org_code}}).then(function (res) {
            if (res && res > 0) {
                return callback({flag: false, msg: '组织机构编码已存在，请确认后重新输入'});
            } else {
                PlOrgModel.upsert(data).then(function (res) {
                    callback({flag: true});
                }).catch(function (err) {
                    if (err) {
                        callback({flag: false, msg: '插入错误'});
                    }
                })
            }
        }).catch(function (err) {
            if (err) {
                return callback({flag: false, msg: '查询错误'});
            }
        })

    }
};


//删除部门信息
exports.delPlOrgInfo = function (data, callback) {
    var where = {};
    var where2 = {};
    var arr = [];
    if (data.params) {
        var _list = data.params;
        for (var i in _list) {
            arr.push(_list[i].id);
        }
        where = {id: {$in: arr}};
        where2 = {pl_orgid: {$in: arr}};
    } else {
        where = {id: data.id};
        where2 = {pl_orgid: data.id};
    }
    plPersonModel.count({
        where: where2
    }).then(function (res) {
        if (res > 0) {
            callback({flag: false, msg: '所选组织机构下有用户，请先删除对应用户信息'});
        } else {
            PlOrgModel.destroy({where: where}).then(function (res) {
                callback({flag: true, msg: '删除成功'});
            }).catch(function (err) {
                if (err) {
                    console.log(err);
                    return callback({flag: false, msg: '删除失败'});
                }
            })
        }
    }).catch(function (err) {
        console.log(err);
        if (err) {
            console.log(err);
            return callback({flag: false, msg: '查询对应用户列表出现错误'});
        }
    })

};

//查询部门信息
exports.getPlOrgList = function (data, callback) {
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    var where = {};
    if (data.org_name != undefined) {
        where = {
            org_name: {
                $like: '%' + data.org_name + '%'
            }
        };
    }
    PlOrgModel.findAndCountAll({
        where: where,
        limit: parseInt(data.pageSize),
        offset: parseInt(data.start),
    }).then(function (res) {
        callback({flag: true, data: res});
    }).catch(function (err) {
        if (err) {
            console.log(err);
            return callback({flag: false, data: '查询错误'});
        }
    })
};

//查询部门名称
exports.getPlOrgName = function (data, callback) {
    var where = {};
    if (data.org_type) {
        where = {
            org_type: data.org_type
        }
    }
    if (data.parentid) {
        where = {
            parentid: data.parentid
        }
    }
    PlOrgModel.findAll({
        where: where,
        attributes: ['id', ['org_name','name']]
    }).then(function (res) {
        callback({flag: true, data: res});
    }).catch(function (err) {
        if (err) {
            callback({flag: false, data: '查询失败'});
        }
    })
}