const uuid = require('node-uuid');
const punchModel = db['atd_punch_record'];
const policeModel = db['pl_person'];
const orgModel = db['pl_org'];
const roleModel = db['pl_role'];
const rolePoliceModel = db['pl_role_police'];
const adtgroupModel = db['atd_group'];//考勤组
const atdscheduleModel = db['atd_schedule'];


const AjaxJson = require('../../utils/AjaxJson');
const async = require('async');
const sqls = require('../common/sqls');

const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

//分页获取考勤记录(每日统计)
exports.getAtdList = function (data, callback) {
    var where = {};
    var optJson = JSON.parse(data.options);
    var aj = new AjaxJson();
    if (isOptionNull(optJson)) {
        where = {
            record_date: {
                $gte: optJson.startDate,
                $lte: optJson.endDate
            }
        }
    }
    if (data.policeArr) {
        if (data.policeArr[0] == 'allPolice') {
            getPoliceId({}, function (ret1) {
                if (ret1.flag) {
                    where.policeid = {
                        $in: ret1.data
                    }
                    getListBySearch(where, data, function (result) {
                        callback(result);
                    })
                } else {
                    aj.msg = '查询考勤人员失败';
                    callback(aj);
                }
            })
        } else {
            where.policeid = {$in: data.policeArr};
            getListBySearch(where, data, function (result) {
                callback(result);
            })
        }
    } else {
        aj.success = false;
        aj.msg = '获取不到相关参数';
        callback(aj);
    }

};


//分页获取警员打卡记录(打卡记录)
exports.getListByDate = async function (data, callback) {
    console.log(data);
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    var where = {};
    var aj = new AjaxJson();
    var optJson = JSON.parse(data.options);
    var policeStr = '';
    var page = 'limit ' + data.start + ',' + data.pageSize;
    var resultData = getDateArr(optJson.startDate, optJson.endDate);
    var cols = resultData.cols;
    var dateArr = resultData.date;
    var rows = [];
    var count = 0;
    if (isOptionNull(optJson)) {
        where = {
            record_date: {
                $gte: optJson.startDate,
                $lte: optJson.endDate
            }
        }
    }
    try {
        if (data.policeArr[0] != 'allPolice') {
            var d = JSON.stringify(data.policeArr).replace('[', '').replace(']', '');
            policeStr = "atd_punch_record.policeid in (" + d + ") and ";
            count = data.policeArr.length;
        } else {
            var atdCount = await db.sequelize.query(sqls.monthStatsCount(optJson), {model: punchModel});
            if (atdCount.length > 0) {
                count = atdCount[0].dataValues.count;
            } else {
                count = 0;
            }
        }
        var punchList = await db.sequelize.query(sqls.punchSql1(optJson, policeStr, page), {model: punchModel});
        if (punchList.length > 0) {
            for (var i = 0; i < punchList.length; i++) {
                var d = punchList[i].dataValues;
                var data = {
                    police_name: d.police_name,
                    police_code: d.code,
                    org_name: d.org_name,
                    role_name: d.role_name
                };
                where.policeid = punchList[i].policeid;
                var policeRecord = await punchModel.findAll({
                    where: where,
                    attributes: ['work_time', 'off_work_time', 'record_date'],
                    order: [['record_date', 'ASC']]
                });
                for (var i = 0; i < policeRecord.length; i++) {
                    var dd = policeRecord[i];
                    data["day" + i] = [dd.work_time, dd.off_work_time];
                    if (dd.work_time != null) {
                        data["day" + i][0] = dd.work_time.Format("hh:mm");
                    }
                    if (dd.off_work_time != null) {
                        data["day" + i][1] = dd.off_work_time.Format("hh:mm");
                    }

                }
                rows.push(data);
            }
        }
        aj.result = {count: count, rows: rows, cols: cols};
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }

}

//根据选择时间、人员进行每月汇总统计
exports.getAtdSummaryByMonth = async function (data, callback) {
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    var optJson = JSON.parse(data.options);
    var aj = new AjaxJson();
    var policeStr = "";
    var page = 'limit ' + data.start + ',' + data.pageSize;
    var count = data.policeArr.length;
    try {
        if (data.policeArr[0] != 'allPolice') {
            var d = JSON.stringify(data.policeArr).replace('[', '').replace(']', '');
            policeStr = "atd_punch_record.policeid in (" + d + ") and ";
        } else {
            var atdCount = await db.sequelize.query(sqls.monthStatsCount(), {model: punchModel});
            if (atdCount.length > 0) {
                count = atdCount[0].dataValues.count;
            } else {
                count = 0;
            }
        }
        var atdSummary = await db.sequelize.query(sqls.monthStatsSql(optJson, policeStr, page), {model: punchModel});
        console.log(atdSummary);
        aj.result.rows = atdSummary;
        aj.result.count = count;
        callback(aj)
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}


function getDateArr(date1, date2) {
    var cols = [
        {prop: 'police_name', label: '姓名', children: []},
        {prop: 'org_name', label: '组织机构', children: []},
        {prop: 'police_code', label: '工号', children: []},
        {prop: 'role_name', label: '职位', children: []}
    ];
    var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    var data = {cols: cols, date: []};
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    var date3 = d2.getTime() - d1.getTime();
    d1.setHours(d1.getHours() + 8);
    d2.setHours(d2.getHours() + 8);
    var days = Math.floor(date3 / (24 * 3600 * 1000)) + 1;
    for (var i = 0; i < days; i++) {
        var x = new Date(d1);
        x.setHours(x.getHours() + 24 * i);
        var p = {
            prop: "day" + i,
            left: weeks[x.getDay()],
            right: x.Format("MM-dd")
        }
        data.cols.push(p);
        data.date.push(x.Format("MM-dd"));
    }
    return data;
}

//判断查询条件是否有一个以上有值
function isOptionNull(json) {
    var info = false;
    for (var p in json) {//遍历json对象的每个key/value对,p为key
        if (json[p] != '') {
            info = true;
        }
    }
    return info;
}

//递归查询选择的所有组织机构id
// function getDepart(idArr,callback) {
//     var arr = idArr;
//     var getList = function(childArr){
//         orgModel.findAll({
//                 where:{
//                     parentid:{
//                         $in:childArr
//                     }
//                 },
//                 attributes:['id']
//             })
//             .then(res =>{
//                 if(res&&res.length>0){
//                     var parentid = [];
//                     for(var i=0;i<res.length;i++){
//                         arr.push(res[i].id);
//                         parentid.push(res[i].id);
//                     }
//                     getList(parentid);
//                 }else{
//                     callback({flag:true,data:arr,msg:'查询成功'});
//                 }
//             }).catch(err =>{
//                 if(err){
//                     callback({flag:false,msg:'查询错误'})
//                 }
//             })
//     }
//     getList(idArr);
// }

//考勤记录分页查询
function getListBySearch(where, data, callback) {
    var aj = new AjaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    punchModel.findAndCountAll({
        where: where,
        limit: parseInt(data.pageSize),
        offset: parseInt(data.start),
        include: [
            {model: orgModel, attributes: ['org_name']},
            {
                model: policeModel, attributes: ['police_name', 'code'], include: [
                {
                    model: rolePoliceModel, attributes: ['id'], include: [
                    {model: roleModel, attributes: ['role_name']}
                ]
                }
            ]
            }
        ]
    }).then(function (res) {
        aj.msg = '操作成功';
        aj.success = true;
        aj.result = res;
        callback(aj);
    }).catch(err => {
        if (err) {
            callback(aj);
        }
    })
}

function getPoliceId(where, callback) {
    var dataArr = [];
    policeModel.findAll({where: where, attributes: ['id']}).then(res => {
        if (res && res.length > 0) {
            for (var i = 0; i < res.length; i++) {
                dataArr.push(res[i].id);
            }
            callback({flag: true, data: dataArr, msg: '操作成功'});
        } else {
            callback({flag: false, msg: '没有查询结果'});
        }
    }).catch(err => {
        if (err) {
            callback({flag: false, msg: '查询错误'});
        }
    })
}
exports.excelSummary = async function (req, res, next) {
    // console.log(7777,req.query);return;
    var conf = {};
    conf.stylesXmlFile = "../../../node_modules/excel-export/example/styles.xml";
    conf.name = "mysheet";
    conf.cols = [
        {caption: '工人姓名', type: 'string'},
        {caption: '所属班组', type: 'string'},
        {caption: '进洞时间', type: 'string'},
        {caption: '出洞时间', type: 'string'},
        {caption: '创建时间', type: 'string'},
        {caption: '所在位置', type: 'string'},
        {caption: '工作时长', type: 'string'}
    ];
    conf.rows = [];
    var sql = sqls.monthStatsSql(optJson, policeStr, page);
    var atdSummary = await db.sequelize.query(sql, {model: punchModel});

    if (atdSummary.length > 0) {
        for (var i in d) {
            var row = d[i].dataValues;
            var inDate = row.in_date;
            inDate = inDate.setHours(inDate.getHours() - 8);//减去八小时时间戳
            var outDate = row.out_date;
            outDate = outDate.setHours(outDate.getHours() - 8);
            var arr = [
                row.realname,
                row.depart_name,
                format(inDate),
                format(outDate),
                row.create_date.toLocaleString().substr(0, 10),
                row.team_type,
                row.work_hours
            ];
            conf.rows.push(arr);
        }
        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        res.end(result, 'binary');
    } else {
        res.send({flag: false, msg: '查询结果为空'});
    }

}
