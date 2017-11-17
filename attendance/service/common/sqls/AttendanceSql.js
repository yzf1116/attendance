/**
 * Created by DELL on 2017/7/5.
 */
const sqls = {
        //获取考勤地址信息
        getAddressSql: (atdGroupid)=> {
            return `SELECT ad.location, ad.x_point, ad.y_point, ag.range FROM atd_address ad INNER JOIN atd_address_group agp ON ad.id = agp.addressid INNER JOIN atd_group ag ON ag.id = agp.groupid WHERE agp.groupid = '${atdGroupid}'`
        },
        //获取班次信息
        getScheduleSql: (atdGroupid)=> {
            return `SELECT sche.name, sche.work_time, sche.off_work_time FROM atd_schedule sche INNER JOIN atd_schedule_group schegrp ON sche.id = schegrp.scheduleid WHERE schegrp.groupid = '${atdGroupid}'`
        },
        //获取考勤人员类型
        getAtdTypeSql: (personid)=> {
            return `SELECT grp.type FROM atd_group grp INNER JOIN pl_person psn ON grp.id = psn.atd_groupid WHERE psn.id = '${personid}'`
        },
        //获取班次时间
        getScheduleGroupViewSql: (atdGroupid)=> {
            return `SELECT name,work_time,off_work_time from atd_schedule_group_view where atd_groupid='${atdGroupid}'`
        }
    }
    ;
module.exports = sqls;