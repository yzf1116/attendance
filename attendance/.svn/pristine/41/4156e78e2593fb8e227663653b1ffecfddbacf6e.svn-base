/**
 * Created by DELL on 2017/7/5.
 */
const sqls = {
    //登录获取人员基本信息
    getPersonSql: (personId)=> {
        return `SELECT per.id AS policeid, per.pl_orgid AS departid, org.org_name AS depart_name, per.police_name, per.phone , anx.realpath, ro.role_name, ro.role_level, atgup.atd_name, atgup.id AS atd_groupid , atgup.type AS atd_type FROM pl_person per LEFT JOIN pl_role_police per_ro ON per.id = per_ro.policeid LEFT JOIN pl_org org ON per.pl_orgid = org.id LEFT JOIN pl_role ro ON per_ro.roleid = ro.id LEFT JOIN atd_group atgup ON per.atd_groupid = atgup.id LEFT JOIN sys_annex anx ON per.id = anx.businesskey WHERE per.id = '${personId}'`
    },
    //获取警员某月考勤记录
    getAtdRecordSql: (policeid, month)=> {

        return `SELECT pl_person.police_name,pl_org.org_name,a.policeid,a.work_status,a.off_work_status,a.is_overtime,a.overtime_hours,a.work_hours,a.late_long,
        DATE_FORMAT(a.record_date, '%Y-%m-%d') AS date,DATE_FORMAT(a.record_date, '%w') AS week FROM atd_punch_record AS a
        LEFT JOIN pl_person ON (pl_person.id = a.policeid)
        LEFT JOIN pl_org ON (pl_person.pl_orgid = pl_org.id)
        where YEAR(a.record_date) = ${month.getFullYear()} and MONTH(a.record_date)=${month.getMonth() + 1} and a.policeid = '${policeid}';`
    },
    getQjSql: (policeid, month)=> {
        return `select * FROM rev_apply a where YEAR(a.create_date) = '${month.getFullYear()}' and 
        MONTH(a.create_date)='${month.getMonth() + 1}' and a.personid = '${policeid}'`;
    },
    //获取参与考勤人员id的列表
    getAtdPensonidSql: ()=> {
        return `SELECT id from pl_person where atd_groupid is not null and atd_groupid !=''`
    }
};
module.exports = sqls;