/**
 * Created by DELL on 2017/6/22.
 */
var AjaxJson = require('../../utils/AjaxJson')
var uuid = require('node-uuid');
var ScheduleModel = db['atd_schedule'];
var atdGroupModel = db['atd_group'];
var ScheduleGroupModel = db['atd_schedule_group']
var atdSchedulePlanModel = db['atd_schedule_plan'];
// ScheduleGroupModel.belongsTo(atdGroupModel, {foreignKey: 'groupid'});
const aj = new AjaxJson();
//保存部门信息
exports.saveScheduleInfo = function (data, callback) {
    if (data.id) {
        ScheduleModel.findOne({
            where: {name: data.name, id: {$notIn: [data.id]}},
            attributes: ['id']
        }).then(function (res) {
            if (res && res.id) {
                return callback({flag: false, msg: '班组已存在，请确认后重新输入'});
            } else {
                ScheduleModel.update(data, {where: {id: data.id}}).then(function (res) {
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
        ScheduleModel.count({where: {name: data.name}}).then(function (res) {
            if (res && res > 0) {
                return callback({flag: false, msg: '班组已存在，请确认后重新输入'});
            } else {
                ScheduleModel.upsert(data).then(function (res) {
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


/**
 * 删除班次信息
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.delScheduleInfo = async (data, callback) => {
    try {
        var where = {};
        var where2 = {};
        var where3 = {};
        var arr = [];
        if (data.params) {
            var _list = data.params;
            for (var i in _list) {
                arr.push(_list[i].id);
            }
            where = {id: {$in: arr}};
            where2 = {scheduleid: {$in: arr}};
            where3 = {atd_scheid: {$in: arr}}
        } else {
            where = {id: data.id};
            where2 = {scheduleid: data.id};
            where3 = {atd_scheid: data.id}
        }
        const ScheduleGroupRes = await   ScheduleGroupModel.destroy({where: where2});
        const atdSchedulePlanRes = await atdSchedulePlanModel.update({atd_scheid: '', is_rest: 1}, {where: where3});
            const ScheduleRes = ScheduleModel.destroy({where: where});
            aj.success = true;
            aj.msg = '删除成功';
            return callback(aj)
    } catch (err) {
        aj.msg = '删除失败';
        aj.success = false;
        return callback(aj)
    }
}
// //删除部门信息
// exports.delScheduleInfo = function (data, callback) {
//     var where = {};
//     var where2 = {};
//     var arr = [];
//     if (data.params) {
//         var _list = data.params;
//         for (var i in _list) {
//             arr.push(_list[i].id);
//         }
//         where = {id: {$in: arr}};
//         where2 = {scheduleid: {$in: arr}};
//     } else {
//         where = {id: data.id};
//         where2 = {scheduleid: data.id};
//     }
//     ScheduleModel.destroy({where: where}).then(function (res) {
//         ScheduleGroupModel.destroy({where: where2}).then(function (res) {
//             callback({flag: true, msg: '删除成功'});
//         }).catch(function (err) {
//             if (err) {
//                 console.log(err);
//                 return callback({flag: false, msg: '删除失败'});
//             }
//         })
//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             return callback({flag: false, msg: '删除失败'});
//         }
//     })
//
//
// };

// //查询部门信息
// exports.getScheduleList = function (data, callback) {
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     var where = {};
//     if (data.name != undefined) {
//         where = {
//             name: {
//                 $like: '%' + data.name + '%'
//             }
//         };
//     }
//     ScheduleModel.findAndCountAll({
//         where: where,
//         limit: parseInt(data.pageSize),
//         offset: parseInt(data.start),
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
 * 查询部门信息
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.getScheduleList = async (data, callback) => {
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        var where = {};
        if (data.name != undefined) {
            where = {
                name: {
                    $like: '%' + data.name + '%'
                }
            };
        }
        const ScheduleRes = await  ScheduleModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
        });
        if (ScheduleRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = ScheduleRes;
            return callback(aj)
        }
    } catch (err) {
        aj.msg = err;
        aj.success = false;
        return callback(aj)
    }
}


/**
 * 通过组织机构名称查询
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.getScheduleName = async (data, callback) => {
    try {
        const ScheduleRes = await findAll({attributes: ['id', 'name',]});
        if (ScheduleRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = ScheduleRes;
            return callback(aj);
        }
    } catch (err) {
        aj.msg = err;
        aj.success = false;
        return callback(aj);
    }
}
// //查询部门名称
// exports.getScheduleName = function (data, callback) {
//     ScheduleModel.findAll({attributes: ['id', 'name',]}).then(function (res) {
//         callback({flag: true, data: res});
//     }).catch(function (err) {
//         if (err) {
//             callback({flag: false, data: '查询失败'});
//         }
//     })
// };

// exports.getScheduleForGroupList = function (data, callback) {
//     ScheduleGroupModel.count({
//         where: {scheduleid: {$in: data.scheduleList}},
//         attributes: [],
//         include: [
//             {model: atdGroupModel}
//         ]
//     }).then(function (res) {
//         callback({success: true, result: res});
//     }).catch(function (err) {
//         if (err) {
//             callback({success: false, result: '查询失败'});
//         }
//     })
// }

/**
 * 查询关联考勤组
 * @param data
 * @param callback
 * @returns {Promise.<*>}
 */
exports.getScheduleForGroupList = async (data, callback) => {
    try {
        let result = 0;
        const ScheduleGroupRes = await  ScheduleGroupModel.count({
            where: {scheduleid: {$in: data.scheduleList}},
            attributes: [],
            include: [
                {model: atdGroupModel}
            ]
        });
        const atdSchedulePlanRes = await atdSchedulePlanModel.count({
            where: {atd_scheid: {$in: data.scheduleList}},
            attributes: [],
        });
        if (ScheduleGroupRes > 0 || atdSchedulePlanRes > 0) {
            result = 1
        }
        aj.success = true;
        aj.msg = '查询成功';
        aj.result = result;
        return callback(aj);
    } catch (err) {
        aj.success = false;
        aj.msg = err;
        return callback(aj)
    }

}