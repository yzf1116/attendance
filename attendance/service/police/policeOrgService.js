/**
 * Created by DELL on 2017/6/21.
 */
var uuid = require('node-uuid');
var PlOrgModel = db['pl_org'];
var plPersonModel = db['pl_person']
PlOrgModel.hasMany(plPersonModel, {
    foreignKey: 'pl_orgid'
})
var AjaxJson = require('../../utils/AjaxJson');


var aj = new AjaxJson();

/**
 * 保存组织机构（编辑）
 * @param data
 * @param callback
 * @returns {Promise.<void>}
 */
exports.savePlOrgInfo = async(data, callback) => {
    try {
        if (data.id) {
            const plOrgRes = await PlOrgModel.findOne({
                where: {
                    org_code: data.org_code,
                    id: {
                        $notIn: [data.id]
                    }
                },
                attributes: ['id']
            });
            if (plOrgRes && plOrgRes.id) {
                aj.success = false;
                aj.msg = '组织机构编码已存在，请确认后重新输入';
                return callback(aj)
            } else {
                const plOrgByIdRes = await PlOrgModel.update(data, {
                    where: {
                        id: data.id
                    }
                });
                if (plOrgByIdRes) {
                    aj.success = true;
                    return callback(aj)
                }
            }
        } else {
            data.id = uuid.v1();
            const plOrgCodeRes = await PlOrgModel.count({
                where: {
                    org_code: data.org_code
                }
            });
            if (plOrgCodeRes && plOrgCodeRes > 0) {
                aj.success = false;
                aj.msg = '组织机构编码已存在，请确认后重新输入';
                return callback(aj)
            } else {
                const plOrgData = await PlOrgModel.upsert(data);
                if (plOrgData) {
                    aj.success = true;
                    return callback(aj)
                }
            }
        }
    } catch (err) {
        aj.success = false;
        aj.msg = '修改错误'
        return callback(aj)
    }
};

/**
 * 删除组织机构信息
 * @param data
 * @param callback
 * @returns {Promise.<void>}
 */
exports.delPlOrgInfo = async(data, callback) => {
    try {
        let where = {};
        let where2 = {};
        let arr = [];
        if (data.params) {
            var _list = data.params;
            for (var i in _list) {
                arr.push(_list[i].id);
            }
            where = {
                id: {
                    $in: arr
                }
            };
            where2 = {
                pl_orgid: {
                    $in: arr
                }
            };
        } else {
            where = {
                id: data.id
            };
            where2 = {
                pl_orgid: data.id
            };
        }

        const plPersonRes = await plPersonModel.count({
            where: where2
        });
        if (plPersonRes > 0) {
            aj.success = false;
            aj.msg = '所选组织机构下有用户，请先删除对应用户信息';
            return callback(aj)
        } else {
            const plPersonDestoryRes = await PlOrgModel.destroy({
                where: where
            });
            if (plPersonDestoryRes) {
                aj.success = true;
                aj.msg = '删除成功';
                return callback(aj)
            }
        }

    } catch (err) {
        console.log(err)
        aj.success = false;
        aj.msg = '删除失败'
    }
};


/**
 * 查询组织机构信息
 * @param data
 * @param callback
 * @returns {Promise.<void>}
 */
exports.getPlOrgList = async(data, callback) => {
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        var where = {};
        if (data.org_name != undefined) {
            where = {
                org_name: {
                    $like: '%' + data.org_name + '%'
                }
            };
        }
        const plOrgListRes = await PlOrgModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
            order: [
                ['org_code', 'ASC']
            ]
        })
        if (plOrgListRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = plOrgListRes;
            return callback(aj)
        }

    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = '查询错误';
        return callback(aj);
    }
};
// //保存部门信息
// exports.savePlOrgInfo = function (data, callback) {
//
//     if (data.id) {
//         PlOrgModel.findOne({
//             where: {org_code: data.org_code, id: {$notIn: [data.id]}},
//             attributes: ['id']
//         }).then(function (res) {
//             if (res && res.id) {
//                 return callback({flag: false, msg: '组织机构编码已存在，请确认后重新输入'});
//             } else {
//                 PlOrgModel.update(data, {where: {id: data.id}}).then(function (res) {
//                     callback({flag: true})
//                 }).catch(function (err) {
//                     if (err) {
//                         callback({flag: false, msg: '修改错误'});
//                     }
//                 })
//             }
//         }).catch(function (err) {
//             if (err) {
//                 return callback({flag: false, msg: '查询错误'})
//             }
//         })
//
//     } else {
//         data.id = uuid.v1();
//         PlOrgModel.count({where: {org_code: data.org_code}}).then(function (res) {
//             if (res && res > 0) {
//                 return callback({flag: false, msg: '组织机构编码已存在，请确认后重新输入'});
//             } else {
//                 PlOrgModel.upsert(data).then(function (res) {
//                     callback({flag: true});
//                 }).catch(function (err) {
//                     if (err) {
//                         callback({flag: false, msg: '插入错误'});
//                     }
//                 })
//             }
//         }).catch(function (err) {
//             if (err) {
//                 return callback({flag: false, msg: '查询错误'});
//             }
//         })
//
//     }
// };


//删除部门信息
// exports.delPlOrgInfo = function (data, callback) {
//     var where = {};
//     var where2 = {};
//     var arr = [];
//     if (data.params) {
//         var _list = data.params;
//         for (var i in _list) {
//             arr.push(_list[i].id);
//         }
//         where = {id: {$in: arr}};
//         where2 = {pl_orgid: {$in: arr}};
//     } else {
//         where = {id: data.id};
//         where2 = {pl_orgid: data.id};
//     }
//     plPersonModel.count({
//         where: where2
//     }).then(function (res) {
//         if (res > 0) {
//             callback({flag: false, msg: '所选组织机构下有用户，请先删除对应用户信息'});
//         } else {
//             PlOrgModel.destroy({where: where}).then(function (res) {
//                 callback({flag: true, msg: '删除成功'});
//             }).catch(function (err) {
//                 if (err) {
//                     console.log(err);
//                     return callback({flag: false, msg: '删除失败'});
//                 }
//             })
//         }
//     }).catch(function (err) {
//         console.log(err);
//         if (err) {
//             console.log(err);
//             return callback({flag: false, msg: '查询对应用户列表出现错误'});
//         }
//     })
//
// };

//查询部门信息
// exports.getPlOrgList = function (data, callback) {
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     var where = {};
//     if (data.org_name != undefined) {
//         where = {
//             org_name: {
//                 $like: '%' + data.org_name + '%'
//             }
//         };
//     }
//     PlOrgModel.findAndCountAll({
//         where: where,
//         limit: parseInt(data.pageSize),
//         offset: parseInt(data.start),
//         order: [['org_code', 'ASC']]
//     }).then(function (res) {
//         callback({flag: true, data: res});
//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             return callback({flag: false, data: '查询错误'});
//         }
//     })
// };
/**
 * 通过用户名查询组织机构信息
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.getPlOrgName = async(data, callback) => {
    try {
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
        if (data.org_name) {
            where = {
                org_name: {
                    $like: '%' + data.org_name + '%'
                }
            }
        }
        const plOrgAllRes = await PlOrgModel.findAll({
            where: where,
            attributes: ['id', ['org_name', 'name'], 'org_code'],
            order: [
                ['org_code', 'ASC']
            ]
        });
        if (plOrgAllRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = plOrgAllRes;
            return callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = '${err.name}';
        return callback(aj);
    }
};
//查询部门名称
// exports.getPlOrgName = function (data, callback) {
//     var where = {};
//     if (data.org_type) {
//         where = {
//             org_type: data.org_type
//         }
//     }
//     if (data.parentid) {
//         where = {
//             parentid: data.parentid
//         }
//     }
//     if (data.org_name) {
//         where = {
//             org_name: {
//                 $like: '%' + data.org_name + '%'
//             }
//         }
//     }
//     PlOrgModel.findAll({
//         where: where,
//         attributes: ['id', ['org_name', 'name'], 'org_code'],
//         order: [['org_code', 'ASC']]
//     }).then(function (res) {
//         callback({flag: true, data: res});
//     }).catch(function (err) {
//         if (err) {
//             callback({flag: false, data: '查询失败'});
//         }
//     })
// }

/**
 * 获取所有关联人员信息
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.getorgForPersonList = async(data, callback) => {
    try {
        const plOrgRes = await PlOrgModel.count({
            where: {
                parentid: {
                    $in: data.orgIdList
                }
            },
        });
        if (plOrgRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = plOrgRes;
            return callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = '${err.name}';
        return callback(aj);
    }
}


//获取所有关联人员信息
// exports.getorgForPersonList = function (data, callback) {
//     PlOrgModel.count({
//         where: {parentid: {$in: data.orgIdList}},
//     }).then(function (res) {
//         callback({success: true, result: res});
//     }).catch(function (err) {
//         if (err) {
//             callback({success: false, result: '查询失败'});
//         }
//     })
// }


//获取所有组织机构信息(构建组织结构树)
exports.getAllPlOrgList = async function (data, callback) {
    try {
        let where = {};
        if (data.org_name != undefined) {
            where = {
                org_name: {
                    $like: '%' + data.org_name + '%'
                }
            };
        }
        const org = await PlOrgModel.findAll({
            where: where,
            order: [
                ['org_code', 'ASC']
            ]
        });
        if (org) {
            aj.msg = '查询成功';
            aj.success = true;
            aj.result = org;
            callback(aj);
        }
    } catch (err) {
        console.log(err)
        aj.msg = '${err.name}';
        aj.success = false;
        callback(aj);
    }
}

//获取所有组织机构信息及其警员信息(构建组织结构树)
exports.getAllPlOrgAndPoliceList = async function (data, callback) {
    try {
        let where = {};
        if (data.org_name != undefined) {
            where = {
                org_name: {
                    $like: '%' + data.org_name + '%'
                }
            };
        }
        const org = await PlOrgModel.findAll({
            where: where,
            include: [{
                model: plPersonModel,
                attributes: ['id', 'police_name', 'pl_orgid'],
            }],
            order: [
                ['org_code', 'ASC']
            ]
        });
        if (org) {
            aj.msg = '查询成功';
            aj.success = true;
            aj.result = org;
            callback(aj);
        }
    } catch (err) {
        console.log(err)
        aj.msg = `${err.name}`;
        aj.success = false;
        callback(aj);
    }
}

//获取未绑定组织机构的警员
exports.getPoliceNotBindOrg = async(data, callback) => {
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        let where = {
            $or: [{
                pl_orgid: ""
            }, {
                pl_orgid: null
            }]
        };
        var optJson = JSON.parse(data.options);
        if (isOptionNull(optJson)) {
            where.police_name = {
                $like: '%' + optJson.police_name + '%'
            }
        }
        const policeList = await plPersonModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
        });
        if (policeList) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = policeList;
            callback(aj)
        }
    } catch (err) {
        console.log(err);
        aj.msg = '${err}';
        aj.success = false;
        callback(aj);
    }
}


exports.saveOrgPolice = async(data, callback) => {
    try {
        const police = await plPersonModel.update({
            pl_orgid: data.pl_orgid,
        }, {
            where: {
                id: {
                    $in: data.policeList
                }
            }
        })
        if (police) {
            aj.msg = '保存成功';
            aj.success = true;
            callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.msg = '保存失败';
        aj.success = false;
        callback(aj);
    }
}
exports.unbundOrg = async(data, callback) => {
    try {
        const police = await plPersonModel.update({
            pl_orgid: null,
        }, {
            where: {
                id: data.policeid
            }
        })
        if (police) {
            aj.msg = '解绑成功';
            aj.success = true;
            callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.msg = '保存失败';
        aj.success = false;
        callback(aj);
    }
}
/**
 * 获取最高级组织机构
 * @param callback
 */
exports.getHighestOrg = async function (callback) {
    try {
        var data = await PlOrgModel.findAll({
            where: {
                parentid: '1',
                org_type: '1'
            }
        });
        if (!data) {
            aj.msg = '没有查询结果';
            aj.success = false;
            callback(aj);
        } else {
            aj.result = data;
            callback(aj);
        }

    } catch (err) {
        console.log(err);
        aj.msg = '查询失败';
        aj.success = false;
        callback(aj);
    }
}

/**
 * 设置警员为主管
 * @param data 
 * @param callback
 * @returns {Promise.<*>}
 */
exports.setCharge = async(data, callback) => {
    try {
        const policeRes = await plPersonModel.update({
            is_charge: 1,
        }, {
            where: {
                id: {
                    $in: data.policeList
                }
            }
        });
        if (policeRes) {
            aj.msg = '设置成功';
            aj.success = true;
            callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.msg = '保存失败';
        aj.success = false;
        callback(aj);
    }
}
/**
 * 取消警员为主管
 * @param data 
 * @param callback
 * @returns {Promise.<*>}
 */
exports.unCharge = async(data, callback) => {
    try {
        const policeRes = await plPersonModel.update({
            is_charge: null,
        }, {
            where: {
                id: {
                    $in: data.policeList
                }
            }
        });
        if (policeRes) {
            aj.msg = '解除主管成功';
            aj.success = true;
            callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.msg = '解除失败';
        aj.success = false;
        callback(aj);
    }
}
/**
 * 判断查询条件是否有一个以上有值
 * @param json
 * @returns {boolean}
 */
function isOptionNull(json) {
    var info = false;
    for (var p in json) { //遍历json对象的每个key/value对,p为key
        if (json[p] != '') {
            info = true;
        }
    }
    return info;
}