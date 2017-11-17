const sqls = {
    monthStatsCount: function (optJson) {
        return `select count(t.counts) as count from 
        (select count(*) counts from atd_punch_record where record_date>='${optJson.startDate}' and record_date<='${optJson.endDate}' group by policeid) t `;
    },
    monthStatsSql:function (date,policeArr,page) {
        return `SELECT pl_person.police_name,pl_person.code,pl_org.org_name,pl_role.role_name,rev_apply.form_json,
        COUNT( CASE WHEN work_status !='休息' THEN 1 ELSE null END )-COUNT( CASE WHEN work_status='缺卡' and  off_work_status ='缺卡'  THEN 1 ELSE null END )-COUNT( CASE WHEN work_status='请假'and off_work_status='请假'  THEN 1 ELSE null END ) AS attendDays,
        COUNT( CASE WHEN work_status='休息' THEN 1 ELSE null END ) AS restDays,
        COUNT( CASE WHEN work_status ='迟到'  THEN 1 ELSE null END ) AS lateNum,
        COUNT( CASE WHEN off_work_status ='早退'  THEN 1 ELSE null END ) AS leaveNum,
        COUNT( CASE WHEN work_status='缺卡' and  off_work_status !='缺卡' THEN 1 ELSE null END ) as missNum1,
        COUNT(CASE WHEN  work_status!='缺卡' and  off_work_status ='缺卡'  THEN 1 ELSE null END ) AS missNum2,
        COUNT( CASE WHEN work_status='缺卡' and  off_work_status ='缺卡'  THEN 1 ELSE null END ) AS absenteeism,
        COUNT( CASE WHEN work_status='出差'  THEN 1 ELSE null END ) AS travelDays,
        COUNT( CASE WHEN work_status='外勤' or off_work_status='外勤'  THEN 1 ELSE null END ) AS fieldTimes,
        COUNT( CASE WHEN work_status='补卡' or off_work_status='补卡'  THEN 1 ELSE null END )+COUNT( CASE WHEN work_status='补卡'and off_work_status='补卡'  THEN 1 ELSE null END ) AS fillCard,
        COUNT( CASE WHEN work_status='请假' or off_work_status='请假'  THEN 1 ELSE null END )+COUNT( CASE WHEN work_status='请假' and off_work_status='请假'  THEN 1 ELSE null END ) AS leaveTimes, 
        SUM(work_hours) as workHours,SUM(overtime_hours) as overTimeHours 
        FROM atd_punch_record LEFT JOIN pl_person on (pl_person.id = atd_punch_record.policeid) 
        LEFT JOIN pl_org on (pl_person.pl_orgid = pl_org.id) LEFT JOIN pl_role_police on (pl_role_police.policeid = pl_person.id)
        LEFT JOIN pl_role on (pl_role_police.roleid = pl_role.id) LEFT JOIN rev_apply on (pl_person.id = rev_apply.personid and rev_apply.template_code='qj')
        where ${policeArr} record_date>='${date.startDate}' and record_date<='${date.endDate}' GROUP BY atd_punch_record.policeid ${page};`
    },//数据库变更后
    punchSql1:function (date,policeArr,page) {
        return `SELECT pl_person.police_name,pl_person.code,pl_org.org_name,pl_role.role_name,atd_punch_record.policeid FROM atd_punch_record 
        LEFT JOIN pl_person on (pl_person.id = atd_punch_record.policeid) 
        LEFT JOIN pl_org on (pl_person.pl_orgid = pl_org.id) 
        LEFT JOIN pl_role_police on (pl_role_police.policeid = pl_person.id)
        LEFT JOIN pl_role on (pl_role_police.roleid = pl_role.id)
        where ${policeArr} record_date>='${date.startDate}' and record_date<='${date.endDate}' GROUP BY atd_punch_record.policeid ${page};`
    },//数据库变更后
    punchSql2:function (date,policeArr,page) {
        return `SELECT pl_person.police_name,pl_person.code,pl_org.org_name,policeid FROM atd_punch_record 
        LEFT JOIN pl_person on (pl_person.id = atd_punch_record.policeid) 
        LEFT JOIN pl_org on (pl_person.pl_orgid = pl_org.id) 
        where ${policeArr} record_date>='${date.startDate}' and record_date<='${date.endDate}' GROUP BY policeid ${page};`
    }
}
module.exports = sqls;