/**
 * Created by Jessi on 2017/7/25.
 */
const schedule = require("node-schedule");
const uuid = require('node-uuid');
const dateUtils = require('../../utils/dateUtils');
const personSql = require('../../service/common/sqls/PersonSql');
const punchRecordModel = db['atd_punch_record'];

class TimingTask {
        //每日初始化一次考勤表
    static async initAttendanceRecord() {
        try {
            //先判定当天没有考勤人员记录,如果有,则不生成记录
            var ret = await punchRecordModel.findAll({
                where: {
                    record_date: new Date().Format('yyyy-MM-dd')
                }
            });
            if (ret.length > 0) {
                return;
            }
            //查询参与考勤的人员id
            var personids = await db.sequelize.query(personSql.getAtdPensonidSql());
            if (personids[0].length === 0) {
                return null
            }
        } catch (e) {
            console.error(e,`${punchRecordModel.getTableName()}查询失败`);
            throw new Error(e);
        }

        // const day = require('../../config/baseConfig').taskConfig.day;
        const day = require('../../config/baseConfig').taskConfig.minutes;//test
        schedule.scheduleJob(day, ()=> {
            const ids = [];
            for (let value of personids) {
                let obj = {};
                obj.id = uuid.v1();
                obj.policeid = value.id;
                obj.record_date = new Date().Format('yyyy-MM-dd');
                ids.push(obj);
            }

            punchRecordModel.bulkCreate(ids).then((ret)=> {
                if (!ret) {
                    return null;
                }
                console.log('每日初始化人员考勤记录成功!');
            }).catch((e)=> {
                console.error(e, `${punchRecordModel.getTableName()}插入数据失败`);
                throw new Error(e);
            });

        })
    }

}

module.exports = TimingTask;

