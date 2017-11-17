/**
 * Created by DELL on 2017/6/29.
 */

var AjaxJson = require('../../utils/AjaxJson')
var async = require('async')
var uuid = require('node-uuid');
var attendGroupModel = db['atd_group'];
var personModel = db['pl_person'];
var scheduleGroupModel = db['atd_schedule_group'];
var atdAddressModel = db['atd_address'];
var addressGroupModel = db['atd_address_group'];
var atdScheduleModel = db['atd_schedule'];
var atdSchedulePlanModel = db['atd_schedule_plan'];

attendGroupModel.hasMany(atdSchedulePlanModel, {foreignKey: 'atd_groupid'});
atdSchedulePlanModel.belongsTo(atdScheduleModel, {foreignKey: 'atd_scheid'})
// attendGroupModel.hasMany(scheduleGroupModel, {foreignKey: 'groupid'});
// attendGroupModel.hasMany(personModel, {foreignKey: 'atd_groupid'})
// attendGroupModel.hasMany(addressGroupModel, {foreignKey: 'groupid'})
// addressGroupModel.belongsTo(atdAddressModel, {foreignKey: 'addressid'})
// scheduleGroupModel.belongsTo(atdScheduleModel, {foreignKey: 'scheduleid'})
const aj = new AjaxJson();


/**
 * 新增（编辑）考勤组
 * @param data     请求数据
 * @param callback      回调
 * @returns {Promise.<*>}
 */
exports.saveGroupInfo = async (data, callback) => {
    try {
        if (data.id) {
            const attendGroupRes = await attendGroupModel.findOne({
                where: {atd_name: data.atd_name, id: {$notIn: [data.id]}},
                attributes: ['id']
            });
            if (attendGroupRes && attendGroupRes.id) {
                aj.success = false;
                aj.msg = '考勤组名称已存在，请确认后重新输入';
                return callback(aj);
            } else {
                const attendGrouccpRes = await attendGroupModel.update(data, {where: {id: data.id}});
                if (attendGrouccpRes) {
                    console.log('1111')
                    /****考勤人员Start***/
                    let adddepartList = [];
                    let addpoliceList = [];
                    for (let item of data.addPersonList) {
                        if (item.type === 'depart') {
                            adddepartList.push(item.id)
                        } else if (item.type === 'police') {
                            addpoliceList.push(item.id)
                        }
                    }
                    /**(1)***删除警员**/
                    if (data.delPersonList.length > 0) {
                        let delList = [];
                        for (let item of data.delPersonList) {
                            delList.push(item.id)
                        }
                        const personRes = await personModel.update({
                            atd_groupid: null,
                            responsible: 0
                        }, {where: {id: {$in: delList}}});
                    }
                    /**(2)***组织机构**/
                    let where = {
                        pl_orgid: {$in: adddepartList}
                    };
                    if (adddepartList.length > 0) {
                        const personAddRes = await personModel.findAll({where: where});
                        if (personAddRes) {
                            var idList = res.map(({id}) => id);
                            const personUpdateRes = await personModel.update({atd_groupid: data.id}, {where: {id: {$in: idList}}});

                        }
                    }

                    /**(3)***警员处理**/
                    if (addpoliceList.length > 0) {
                        const personuPARes = await personModel.update({
                            atd_groupid: data.id,
                            responsible: 0
                        }, {where: {id: {$in: addpoliceList}}});

                    }
                    /**(4)***负责人处理**/
                    if (data.delManagerPersonList.length > 0) {
                        const delidList = data.delManagerPersonList.map(({id}) => id);
                        const clearPoliceRes = await personModel.update({
                            atd_groupid: null,
                            responsible: 0
                        }, {where: {id: {$in: delidList}}});
                    }
                    if (data.addManagerPersonList.length > 0) {
                        const addidList = data.addManagerPersonList.map(({id}) => id);
                        const addPoliceRes = await personModel.update({
                            atd_groupid: data.id,
                            responsible: 1
                        }, {where: {id: {$in: addidList}}});
                    }
                    /**(5)***班次**/
                    const delscRes = await scheduleGroupModel.destroy({
                        where: {
                            groupid: data.id,
                        }
                    });
                    const delplanRes = await atdSchedulePlanModel.destroy({
                        where: {
                            atd_groupid: data.id,
                        }
                    });
                    switch (data.type) {
                        case 1:
                            const schedulePlanList = [];
                            // data.scheduleData.forEach(item => {
                            //     item.atd_groupid = data.id;
                            // });
                            for (let item of data.scheduleList) {
                                schedulePlanList.push({
                                    week_calendar: item.week_calendar,
                                    atd_groupid: data.id,
                                    atd_scheid: item.atd_scheid,
                                    is_rest: item.is_rest,
                                    create_date:new Date()
                                })
                            }
                            console.log(schedulePlanList)
                            var planRes = await atdSchedulePlanModel.bulkCreate(schedulePlanList);
                            break;
                        case 2:
                            var scheduleList = [];
                            for (var item of data.scheduleList) {
                                scheduleList.push({
                                    id: uuid.v1(),
                                    scheduleid: item.id,
                                    groupid: data.id
                                })
                            }
                            const newAddscheduleGroupRes = await  scheduleGroupModel.bulkCreate(scheduleList);
                            break;
                        case 3:
                            break;
                    }
                    // if (data.type !== 3) {       //不等于自由工时
                    //     const newscheduleList = [];
                    //     if (data.addscheduleList.length > 0) {
                    //         for (var item of data.addscheduleList) {
                    //             newscheduleList.push({
                    //                 id: uuid.v1(),
                    //                 scheduleid: item,
                    //                 groupid: data.id
                    //             })
                    //         }
                    //         const buladdscRes = await  scheduleGroupModel.bulkCreate(newscheduleList);
                    //     }
                    // }
                    /**(6)***地址**/
                    if (data.delAddressList.length > 0) {
                        const idList = data.delAddressList.map(({id}) => id);
                        const atdAddressRes = await atdAddressModel.destroy({
                            where: {
                                id: {
                                    $in: idList
                                }
                            }
                        });
                        if (atdAddressRes) {
                            const addressGroupRes = await addressGroupModel.destroy({
                                where: {
                                    groupid: data.id,
                                    addressid: {
                                        $in: idList
                                    }
                                }
                            })
                        }
                    }
                    console.log(data.addAddressList.length)
                    if (data.addAddressList.length > 0) {
                        for (let item of data.addAddressList) {
                            item.id = uuid.v1();
                        }
                        const addAddresRes = await atdAddressModel.bulkCreate(data.addAddressList);
                        if (addAddresRes) {
                            let addressidList = [];
                            for (let item of data.addAddressList) {
                                addressidList.push({
                                    id: uuid.v1(),
                                    groupid: data.id,
                                    addressid: item.id
                                })
                            }
                            const addressGroupRes = await  addressGroupModel.bulkCreate(addressidList);
                        }
                    }

                    aj.success = true;
                    aj.msg = '修改成功';
                    return callback(aj)

                }
            }
        } else {
            data.id = uuid.v1();
            const newAddattendGroupRes = await  attendGroupModel.count({where: {atd_name: data.atd_name}});
            if (newAddattendGroupRes && newAddattendGroupRes > 0) {
                aj.success = false;
                aj.msg = '考勤组已经存在，请确认后重新输入';
                return callback(aj);

            } else {
                const newAddattendGroupRes = await  attendGroupModel.upsert(data);
                if (newAddattendGroupRes) {
                    let attendDancePolice = data.attendanceClerk;
                    let departList = [];
                    let policeList = [];
                    for (let item of attendDancePolice) {
                        if (item.type === 'depart') {
                            departList.push(item.id)
                        } else if (item.type === 'police') {
                            policeList.push(item.id)
                        }
                    }
                    let where = {
                        pl_orgid: {$in: departList}
                    }
                    /****(1)组织机构***/
                    if (departList.length > 0) {
                        const newAddpersonRes = await personModel.findAll({where: where});
                        if (newAddpersonRes) {
                            let idList = res.map(({id}) => id);
                            const newAddpersonRes = await personModel.update({atd_groupid: data.id}, {where: {id: {$in: idList}}});

                        }
                    }
                    /****(2)警员***/
                    if (policeList.length > 0) {
                        const newAddRes = await  personModel.update({
                            atd_groupid: data.id,
                            responsible: 0
                        }, {where: {id: {$in: policeList}}});

                    }
                    /****(3)考勤负责人***/
                    var addidList = data.adAttendanceClerk.map(({id}) => id);
                    const newAddUpRes = await  personModel.update({
                        atd_groupid: data.id,
                        responsible: 1
                    }, {where: {id: {$in: addidList}}});

                    /****(4)考勤班次***/
                    if (data.type !== 3) {       //不等于自由工时
                        switch (data.type) {
                            case 1:
                                const schedulePlanList = [];
                                // data.scheduleData.forEach(item => {
                                //     item.atd_groupid = data.id;
                                // });
                                for (let item of data.scheduleData) {
                                    schedulePlanList.push({
                                        week_calendar: item.week_calendar,
                                        atd_groupid: data.id,
                                        atd_scheid: item.atd_scheid,
                                        is_rest: item.is_rest,
                                        create_date:new Date()
                                    })
                                }
                                console.log(schedulePlanList)
                                var planRes = await atdSchedulePlanModel.bulkCreate(schedulePlanList);
                                break;
                            case 2:
                                var scheduleList = [];
                                for (var item of data.scheduleData) {
                                    scheduleList.push({
                                        id: uuid.v1(),
                                        scheduleid: item,
                                        groupid: data.id
                                    })
                                }
                                const newAddscheduleGroupRes = await  scheduleGroupModel.bulkCreate(scheduleList);
                                break;
                        }


                    }
                    /****(5)考勤地址***/
                    for (var item of data.atdWayTableData) {
                        item.id = uuid.v1();
                    }
                    const newAddatdAddressRes = await atdAddressModel.bulkCreate(data.atdWayTableData);
                    if (newAddatdAddressRes) {
                        var addressidList = [];
                        for (var item of data.atdWayTableData) {
                            addressidList.push({
                                id: uuid.v1(),
                                groupid: data.id,
                                addressid: item.id
                            })
                        }
                        const newAddaddressGroupRes = await addressGroupModel.bulkCreate(addressidList);
                        aj.success = true;
                        aj.msg = '保存成功';
                        return callback(aj);
                    }

                }
            }
        }
    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = `${err}`;
        return callback(aj);
    }
};


//删除考勤组信息
// exports.deleteGroupInfo = function (data, callback) {
//     var where = {};
//     var where2 = {};
//     var where3 = {};
//     var arr = [];
//     var result = {};
//     if (data.params) {
//         var _list = data.params;
//         for (var i in _list) {
//             arr.push(_list[i].id);
//         }
//         where = {id: {$in: arr}};
//         where2 = {atd_groupid: {$in: arr}};
//         where3 = {groupid: {$in: arr}}
//     } else {
//         where = {id: data.id};
//         where2 = {atd_groupid: data.id};
//         where3 = {groupid: data.id}
//     }
//     personModel.count({
//         where: where2
//     }).then(function (res) {
//         if (res > 0) {
//             // result = new AjaxJson(false,"所选考勤组有参与考勤人员，请先删除取消考勤人员", res, null);
//             result.success = false;
//             result.msg = '所选考勤组有参与考勤人员，请先删除取消考勤人员';
//             result.result = res;
//             return callback(result)
//         } else {
//             attendGroupModel.destroy({where: where}).then(function (res) {
//                 scheduleGroupModel.destroy({where: where3}).then(function (res) {
//                     addressGroupModel.destroy({where: where3}).then(function (res) {
//                         var addlist = [];
//                         data.atd_address_groups.forEach(item => addlist.push(item.atd_address.id));
//                         var where4 = {id: {$in: addlist}}
//                         atdAddressModel.destroy({where: where4}).then(function (res) {
//                             callback({success: true, msg: "考勤组删除成功"})
//                         }).catch(function (err) {
//                             if (err) {
//                                 console.log(err);
//                                 return callback({success: false, msg: "地址删除失败"})
//                             }
//                         })
//
//                     }).catch(function (err) {
//                         if (err) {
//                             console.log(err);
//                             return callback({success: false, msg: "地址关联删除失败"})
//                         }
//                     })
//                 }).catch(function (err) {
//                     if (err) {
//                         console.log(err);
//                         return callback({success: false, msg: "班组关联删除失败"})
//                     }
//                 })
//
//
//             }).catch(function (err) {
//                 if (err) {
//                     console.log(err);
//                     return callback({success: false, msg: "考勤组删除失败"})
//                 }
//             })
//         }
//     }).catch(function (err) {
//         console.log(err);
//         if (err) {
//             console.log(err);
//             return callback({flag: false, msg: '查询用户角色表出错'});
//         }
//     })
// }

/**
 *删除考勤组信息
 * @param data  请求数据
 * @param callback  回调
 * @returns {Promise.<*>}
 */
exports.deleteGroupInfo = async (data, callback) => {
    try {
        let where = {};
        let where2 = {};
        let where3 = {};
        let arr = [];
        if (data.params) {
            let _list = data.params;
            for (let i in _list) {
                arr.push(_list[i].id);
            }
            where = {id: {$in: arr}};
            where2 = {atd_groupid: {$in: arr}};
            where3 = {groupid: {$in: arr}}
        } else {
            where = {id: data.id};
            where2 = {atd_groupid: data.id};
            where3 = {groupid: data.id}
        }

        const personCountRes = await personModel.count({
            where: where2
        });
        if (personCountRes > 0) {
            aj.success = false;
            aj.msg = '所选考勤组有参与考勤人员，请先删除取消考勤人员';
            aj.result = personCountRes;
            return callback(aj);
        } else {
            const scheduleGroupRes = await scheduleGroupModel.destroy({where: where3});
            const schedulePlanRes = await atdSchedulePlanModel.update({where: where2});
                const addressGroupRes = await addressGroupModel.destroy({where: where3});
                if (addressGroupRes) {
                    let addlist = [];
                    data.atd_address_groups.forEach(item => addlist.push(item.atd_address.id));
                    let where4 = {id: {$in: addlist}};
                    const atdAddressRes = atdAddressModel.destroy({where: where4});
                    if (atdAddressRes) {
                        const attendGroupRes = await attendGroupModel.destroy({where: where});
                        if (attendGroupRes) {
                            aj.success = true;
                            aj.msg = '考勤组删除成功';
                            return callback(aj);
                        }
                    }
                }

        }
    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = `${err}`;
        return callback(aj);
    }
}


//查询考勤组信息
// exports.getGroupList = function (data, callback) {
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize)
//     var where = {};
//     if (data.atd_name) {
//         where = {
//             atd_name: {
//                 $like: '%' + data.atd_name + '%'
//             }
//         }
//     }
//     var result = {};
//     attendGroupModel.findAll({
//         where: where,
//         limit: parseInt(data.pageSize),
//         offset: parseInt(data.start),
//         include: [
//             {
//                 model: scheduleGroupModel, attributes: ['id'], include: [
//                 {model: atdScheduleModel}
//             ]
//             },
//             {
//                 model: addressGroupModel, attributes: ['id'], include: [
//                 {model: atdAddressModel}
//             ]
//             },
//             {
//                 model: personModel,
//             }
//         ]
//     }).then(function (res) {
//         console.log(res)
//         result = new AjaxJson(true, "查询成功", res, null);
//         return callback(result)
//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             result = new AjaxJson(false, err, null, null);
//             return callback(result)
//         }
//     })
// }

/**
 * 查询考勤组信息
 * @param data  请求数据
 * @param callback  回调
 * @returns {Promise.<*>}
 */
exports.getGroupList = async (data, callback) => {
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize)
        let where = {};
        if (data.atd_name) {
            where = {
                atd_name: {
                    $like: '%' + data.atd_name + '%'
                }
            }
        }
        const models = {};
        const count = await attendGroupModel.count();
        const attendGroupList = await attendGroupModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
            include: [
                {
                    model: atdSchedulePlanModel, include: [
                    {model: atdScheduleModel}
                ]
                },
                {
                    model: scheduleGroupModel, attributes: ['id'], include: [
                    {model: atdScheduleModel}
                ]
                }
                ,
                {
                    model: addressGroupModel, attributes: ['id'], include: [
                    {model: atdAddressModel}
                ]
                },
                {
                    model: personModel,
                }
            ]
        });
        if (attendGroupList) {
            attendGroupList.count = count;
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = attendGroupList;
            return callback(aj);
        }

    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = `${err}`;
        return callback(aj);
    }
}

//通过ID查询考勤信息
//
// exports.getGroupById = function (data, callback) {
//     var where = {};
//     where = {
//         id: data.id
//     }
//     attendGroupModel.findAll({
//         where: where,
//         include: [
//             {
//                 model: scheduleGroupModel, attributes: ['id'], include: [
//                 {model: atdScheduleModel}
//             ]
//             },
//             {
//                 model: addressGroupModel, attributes: ['id'], include: [
//                 {model: atdAddressModel}
//             ]
//             },
//             {
//                 model: personModel,
//             }
//         ]
//     }).then(function (res) {
//         console.log(res)
//         result = new AjaxJson(true, "查询成功", res, null);
//         return callback(result)
//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             result = new AjaxJson(false, err, null, null);
//             return callback(result)
//         }
//     })
//
// }

/**
 * 通过考勤组ID查询考勤组信息
 * @param data  请求数据
 * @param callback  回调
 * @returns {Promise.<*>}
 */
exports.getGroupById = async (data, callback) => {
    try {
        let where = {};
        where = {
            id: data.id
        }

        const groupIdList = await  attendGroupModel.findAll({
            where: where,
            order: [[{model: atdSchedulePlanModel}, 'id', 'ASC'],
            ],
            include: [
                {
                    model: atdSchedulePlanModel, include: [
                    {model: atdScheduleModel}
                ]
                },
                {
                    model: scheduleGroupModel, attributes: ['id'], include: [
                    {model: atdScheduleModel}
                ]
                },
                {
                    model: addressGroupModel, attributes: ['id'], include: [
                    {model: atdAddressModel}
                ]
                },
                {
                    model: personModel,
                }
            ]
        });
        if (groupIdList) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = groupIdList;
            return callback(aj);
        }
    } catch (err) {
        console.log(err);
        aj.success = false;
        aj.msg = `${err.name}`;
        return callback(aj);
    }
}
