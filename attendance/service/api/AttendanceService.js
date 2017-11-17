/**
 * Created by Jessi on 2017/7/6.
 * 移动端考勤相关API
 */

const CommonService = require('../../service/common/CommonServiceTest');
const uuid = require('node-uuid');
const attendanceSql = require('../../service/common/sqls/attendanceSql');
// const moment = require('moment')
const dateUtils = require('../../utils/dateUtils');
const schePlanModel = db['atd_schedule_plan'];
const scheModel = db['atd_schedule'];
const atdGroupModel = db['atd_group'];

const punchRecordModel = db['atd_punch_record'];


class AttendanceService extends CommonService {
    constructor(params) {
        super(params);
        this.params = params;//参数集对象
        this.currentDate = new Date().Format('yyyy-MM-dd');//当前天
    }

    //查询考勤地址与班次信息
    async queryScheAddress() {

        try {
            const policeid = this.params.policeid;
            const personInfo = await db['pl_person'].findOne({
                include: [{model: db['atd_group'], attributes: ['type']}],
                where: {id: policeid},
                attributes: ['atd_groupid']
            });

            const atdType = personInfo.atd_group.type;
            const atdGroupid = personInfo.atd_groupid;
            //1获取地址信息
            const addressSql = attendanceSql.getAddressSql(atdGroupid);
            const addressInfo = await db.sequelize.query(addressSql);
            //先判断考勤类型,
            if (atdType == 1) {
                var week = dateUtils.nowFewWeeks(new Date());
                var schePlanInfo = await schePlanModel.findAll( //返回当天的排班计划
                    {
                        where: {atd_groupid: atdGroupid, week_calendar: week},
                        include: [{model: scheModel, attributes: ['name', 'work_time', 'off_work_time']}],
                        attributes: ['week_calendar', 'is_rest']
                    });
                if (schePlanInfo.length === 0) {
                    return false;
                } else {

                    if (schePlanInfo.is_rest == 1) {//如果是休息日，直接返回
                        return {is_rest: schePlanInfo.is_rest};
                    } else {

                        return {
                            atd_groupid: atdGroupid,
                            atd_type: atdType,
                            scheduleInfo: schePlanInfo,
                            addressInfo: addressInfo
                        };
                    }
                }
            } else if (atdType == 2) {
                const addressSql = attendanceSql.getAddressSql(atdGroupid);
                const scheduleSql = attendanceSql.getScheduleSql(atdGroupid);

                const addressInfo = await db.sequelize.query(addressSql);
                const scheduleInfo = await db.sequelize.query(scheduleSql);
                return {
                    atd_groupid: atdGroupid,
                    atd_type: atdType,
                    scheduleInfo: scheduleInfo[0],
                    addressInfo: addressInfo[0]
                };

            } else if (atdType == 3) {
                return {is_free: 1}
            }

        } catch (err) {
            return {error: err};

        }


    }

    async punchCard(workType) {//workType为1，标识上班，workType为2，标识下班。
        try {
            const atdType = this.params.atd_type;
            if (atdType) {
                switch (atdType) {
                    case '1':
                        return await this.weekWork(workType);
                    case '2':
                        return await this.everyWork(workType);
                    case '3':
                        return await this.freeWork(workType);
                }


            } else {
                return false
            }
        } catch (e) {
            console.error(e);
        }


    }

    //按周排班考勤判定
    async weekWork(workType) {
        console.log('weekWork很正常')
        var {policeid, atd_groupid, punch_time, removing}=this.params;
        try {

            var week = dateUtils.nowFewWeeks(new Date());
            var result = await schePlanModel.findOne( //返回当天的排班计划
                {
                    where: {atd_groupid: atd_groupid, week_calendar: week},
                    include: [{model: scheModel, attributes: ['work_time', 'off_work_time']}]
                });
            if (!result) {
                return false;

            } else {
                var queryInfo = await atdGroupModel.findById(atd_groupid, {attributes: ['range', 'late_minutes', 'forth_hours']});

                const range = queryInfo.range;  //考勤有效范围

                const workTime = new Date(`${this.currentDate} ${result['atd_schedule'].work_time}`).getTime();//规定的上班时间

                const offWorkTime = new Date(`${this.currentDate} ${result['atd_schedule'].off_work_time}`).getTime();//规定的下班时间

                const punchTime = new Date(punch_time).getTime(); //移动端打卡时间

                const lateTime = workTime + Number(queryInfo.late_minutes) * 60000; //上班打卡截止时间

                const forthTime = workTime - Number(queryInfo.forth_hours) * 3600000; //提前打卡的开始时间
                /**
                 *判断考勤状态
                 */
                var status = '';
                var msg = '';
                var kqzt = global.dictionary;
                var values = {};
                if (workType == 1) {//上班打卡

                    if (Number(removing) > range) {
                        // workStatus = '外勤';
                        status = kqzt[3].name;
                    } else {
                        if (punchTime < forthTime) {
                            // return msg = `打卡时间应在上班时间提前${queryInfo.forth_hours}个小时以后进行`;
                            return false;

                        } else if (punchTime > workTime && punchTime < lateTime) {

                            // workStatus = '迟到';
                            status = kqzt[1].name
                        } else if (punchTime > lateTime) {
                            console.error(punchTime, lateTime)

                            // workStatus = '缺卡';
                            status = kqzt[2].name
                        } else {
                            // workStatus = '正常'
                            status = kqzt[0].name
                        }
                    }
                    values = {
                        policeid: policeid,
                        work_time: punchTime,
                        work_status: status
                    };
                } else {//下班打卡
                    if (Number(removing) > range) {
                        // status = '外勤';
                        status = kqzt[3].name;
                    } else if (punchTime < offWorkTime) {
                        // status = '早退';
                        status = kqzt[4].name;
                    } else {
                        status = kqzt[0].name;
                    }

                    values = {
                        policeid: policeid,
                        off_work_time: punchTime,
                        off_work_status: status
                    };

                }

                console.error('workType=' + workType + '的' + status);


                var created = await punchRecordModel.update(values, {
                    where: {
                        policeid: policeid,
                        record_date: this.currentDate
                    }
                });
                if (!created) {
                    return false
                } else {
                    return status
                }
            }

        } catch (e) {
            console.error(e);
            return {error: e};
        }


    }


    //排班制，每天的排班都一样
    async everyWork(workType) {

        try {
            var {policeid, atd_groupid, punch_time, removing}=this.params;

            // const scheduleInfo = await db.sequelize.query(attendanceSql.getScheduleGroupViewSql(atd_groupid), {type: db.sequelize.QueryTypes.SELECT});
            const scheduleInfo = await db['atd_schedule_group_view'].findAll({
                where: {atd_groupid: atd_groupid},
                attributes: ['work_time', 'off_work_time']
            });
            console.log(JSON.stringify(scheduleInfo), 12358123);

            if (scheduleInfo.length === 0) {
                return false;

            } else {
                if (workType == 1) {

                    for (let obj of scheduleInfo) {

                    }
                } else {

                }

            }

        } catch (e) {
            console.error(e)
        }


    }

    //自由工时
    freeWork() {
    }


}


// exports.ofPunchCard = async function (params, callback) {
//     var {policeid, of_time} = params;
//
//     const isComplete = await punchRecordModel.create();
//
//
// };
module.exports = AttendanceService;