/**
 * Created by Jessi on 2017/7/3.
 */
const cryptoUtils = require('../../utils/cryptoUtils');
const sqls = require('../common/sqls/PersonSql');
const AjaxJson = require('../../utils/AjaxJson');
const fileUtils = require('../../utils/fileUtils');

const personModel = db['pl_person'];
const punchModel = db['atd_punch_record'];
const annexModel = db['sys_annex'];
const locationRecordModel = db['pl_location_record'];
const currentModel = db['pl_current_location'];
const orgModel = db['pl_org'];
const roleModel = db['pl_role'];
const rolePoliceModel = db['pl_role_police'];
const applyModdel = db['rev_apply'];

const uuid = require('node-uuid');
const path = require('path');
const fs = require('fs');
const config =require('../../config/baseConfig');
const serverPath = config.webConfig.defaultServerPath;
const week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

exports.personLogin = async(phone, password, callback)=> {
    var aj = new AjaxJson();
    var code = cryptoUtils.irreversibleEncrypt(phone, password);
    var where = {
        where: {phone: phone, password: code},
        attributes: ['id']
    };
    try {
        var perSon = await personModel.findOne(where);
        if (!perSon) {
            aj.msg = '你输入的密码和账户名不匹配';
            aj.success = false;
            callback(aj);//如果查询为空
            return;
        }else if(perSon.is_lock==1){
            aj.msg = '你的账号已被锁定！不能登录!';
            aj.success = false;
            callback(aj);
        return
        }
        var pensonid = perSon.dataValues.id;
        var sql = sqls.getPersonSql(pensonid);
        var userInfo = await db.sequelize.query(sql, {model: personModel});

        if (!userInfo) {
            aj.msg = '未匹配到查询信息';
            aj.success = false;
            callback(aj);
            return;
        }
        var defaultServerPat = require('../../config/baseConfig').webConfig.defaultServerPath;
        userInfo[0].dataValues.realpath = `${defaultServerPat}/${userInfo[0].dataValues.realpath}`;
        aj.result = userInfo[0].dataValues;
        callback(aj);
    }
    catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }

};
/**
 * 个人考勤每日统计
 * @param data
 * data.policeid 警员id
 * data.day 统计日期
 * @param callback
 */
exports.dailyStats = async(data, callback)=> {

    var day = new Date(data.day).toLocaleDateString();
    var aj = new AjaxJson();
    var where = {
        where:{
            policeid:data.policeid,
            record_date: new Date(day)
        }
    };

    try {
        var dailyRecord = await punchModel.findOne(where);
        console.log(dailyRecord);
        if(!dailyRecord){
            aj.msg = '查询结果为空';
            aj.success = false;
            callback(aj);
        }
        aj.result = dailyRecord;
        callback(aj);
    }
    catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }

};

/**
 * 个人考勤按月统计
 * @param data
 * data.policeid 警员id
 * data.month 统计月份
 * @param callback
 */
exports.monthStats = async(data, callback)=> {
    var month = new Date(data.month);
    var aj = new AjaxJson();
    var d1 = [];//休息
    var d2 = [];//外勤
    var d3 = [];//迟到
    var d4 = [];//早退
    var d5 = [];//旷工
    var d6 = [];//缺卡
    var d7 = [];//(出勤天数)
    var d8 = [];//请假
    var d9 = [];//补卡
    var d10 = [];//出差
    var d11 = {hour:0,detail:[]};//加班
    var hours = 0;//工作总时长;
    try {
        var record = await db.sequelize.query(sqls.getAtdRecordSql(data.policeid,month), {model: punchModel});
        if (record.length > 0) {//查询不为空才进入
            for (var i = 0; i < record.length; i++) {
                var d = record[i].dataValues;
                d.week = week[d.week];
                var stringDate = d.date + "(" + d.week + ")";
                if (d.is_overtime && d.overtime_hours != null) {//加班
                    d11.hour += (parseFloat(d.overtime_hours));
                    var str = d.date + "(" + parseInt(d.overtime_hours / 60) + "时)";
                    if (d.overtime_hours % 60 != 0) {
                        str = d.date + "(" + parseInt(d.overtime_hours / 60) + "时" + d.overtime_hours % 60 + "分)"
                    }
                    d11.detail.push(str);
                    hours += (parseFloat(d.overtime_hours));
                }
                //工作总时长
                if (d.work_hours != null) {
                    hours += (parseFloat(d.work_hours));
                }
                switch (d.work_status) {
                    case '休息':
                        d1.push(stringDate);
                        break;
                    case '外勤':
                        d2.push(stringDate + '上班');
                        d7.push(stringDate);
                        break;
                    case '迟到':
                        d3.push(stringDate);
                        d7.push(stringDate);
                        break;
                    case '缺卡':
                        if (d.off_work_status != '缺卡') {
                            d6.push(stringDate + '上班缺卡');//上班缺卡
                            d7.push(stringDate);
                        } else {
                            d5.push(stringDate);//旷工
                        }
                        break;
                    case '正常':
                        d7.push(stringDate);
                        break;
                    case '请假':
                        if (d.off_work_status != '请假') {
                            d7.push(stringDate);
                        }
                        break;
                    case '补卡':
                        d9.push(stringDate + '上班补卡');//上班补卡
                        d7.push(stringDate);
                        break;
                    case '出差':
                        d10.push(stringDate);
                        d7.push(stringDate);
                        break;
                    default:
                        break;
                }
                switch (d.off_work_status) {
                    case '外勤':
                        d2.push(stringDate + '下班');
                        break;
                    case '早退':
                        d4.push(stringDate);
                        break;
                    case '补卡':
                        d9.push(stringDate + '下班补卡');
                        break;
                    case '缺卡':
                        if (d.work_status != '缺卡') {
                            d6.push(stringDate + '下班缺卡');
                        }
                        break;
                    default:
                        break;
                }
            }
            var qjDate = await db.sequelize.query(sqls.getQjSql(data.policeid, month), {model: applyModdel});
            if (qjDate.length > 0) {
                for (var i = 0; i < qjDate.length; i++) {
                    if (isJSON(qjDate[i].form_json)) {
                        var d = JSON.parse(qjDate[i].form_json);
                        d8.push(d.dateScope.begin + '至' + d.dateScope.end + "(" + d.leaveType + d.dateScope.interval + d.dateScope.intervalUnit + ")");
                    }
                }
            }
            var items = [
                {days: d1.length + '天', detail: d1, title: '休息天数'},
                {days: d2.length + '次', detail: d2, title: '外勤'},
                {days: d3.length + '次', detail: d3, title: '迟到'},
                {days: d4.length + '次', detail: d4, title: '早退'},
                {days: d5.length + '天', detail: d5, title: '旷工'},
                {days: d6.length + '次', detail: d6, title: '缺卡'},
                {days: d7.length + '天', detail: d7, title: '出勤天数'},
                {days: d8.length + '次', detail: d8, title: '请假'},
                {days: d9.length + '次', detail: d9, title: '补卡'},
                {days: d10.length + '天', detail: d10, title: '出差'},
                {days: (parseInt(d11.hour / 60)) + '小时' + (d11.hour % 60) + '分钟', detail: d11.detail, title: '加班'}
            ];
            var params = {
                police_name: record[0].dataValues.police_name,
                org_name: record[0].dataValues.org_name,
                role_name: record[0].dataValues.role_name,
                hours: (parseInt(hours / 60)) + '小时' + (hours % 60) + '分钟',
                items: items
            };
            aj.result = params;
        }
        callback(aj);
    }
    catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
};
/**
 * 修改密码
 *
 */
exports.changePsd = async function(data,callback){
    var aj = new AjaxJson();
    var where = {
        where:{id:data.policeid},
        attributes:['id','phone','password']
    };
    try {
        var person = await personModel.findOne(where);
        if (!person) {
            aj.success = false;
            aj.msg = "该用户不存在";
            callback(aj);

        }
        if (person.password && person.password != cryptoUtils.irreversibleEncrypt(person.phone, data.oldPsd)) {
            aj.success = false;
            aj.msg = "旧密码错误";
            return callback(aj);
        }
        person.password = cryptoUtils.irreversibleEncrypt(person.phone,data.newPsd);
        await person.save();
        callback(aj);

    }
    catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}

/**
 *
 * @param data
 * data.policeid
 * @param callback
 */
exports.personalInfo = async function(data,callback){
    var aj = new AjaxJson();
    var where = {
        where:{id:data.policeid},
        include: [
            {model: orgModel, attributes: ['org_name']},
        ],
        attributes:{exclude:['password','pl_orgid','atd_groupid','responsible','remarks']}//不查询这些字段
    };
    var where2 = {
        where: {policeid: data.policeid},
        include: [
            {model: roleModel, attributes: ['role_name']}
        ]
    };
    try {
        var person = await personModel.findOne(where);
        if(!person){
            aj.success = false;
            aj.msg = "该用户不存在";
            callback(aj);
        }
        person.dataValues.pl_org = person.dataValues.pl_org.org_name;//部门
        var role = await rolePoliceModel.findOne(where2);
        if (!role) {
            person.dataValues.role = "未知";
        }else{
            person.dataValues.role = role.pl_role.role_name;
        }
        var annex = await annexModel.findOne({where: {businesskey: data.policeid}});
        if (!annex) {
            person.photo = serverPath + '/upload/image/default.jpg';
        }else{
            person.photo = serverPath + "/" + annex.realpath;
        }
        aj.result = person;
        callback(aj);
    }
    catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}
/**
 * 用户上传头像
 * @param req
 * req.files
 * req.body {policeid:''}
 * @param callback
 */
exports.uploadAvatar = async function (req, callback) {
    var policeid = req.body.policeid;
    var path = req.files[0].destination.substr(7) + "/" + req.files[0].filename;
    var aj = new AjaxJson();
    var where = {where: {id: policeid}};
    var annxData = {//插入数据
        id: uuid.v1(),
        businesskey: policeid,
        realpath: path
    };
    try {
        var person = await personModel.findOne(where);//找人
        if (!person) {
            aj.success = false;
            aj.msg = '该用户不存在';
            callback(aj);
        }
        var annexData = await annexModel.findOne({where: {businesskey: policeid}});//找附件
        if (!annexData) {
            var annexC = await annexModel.create(annxData);//添加记录
            if (!annexC) {
                aj.success = false;
                aj.msg = '附件信息保存失败';
                callback(aj);
            }
            return callback(aj);
        } else {
            var oldPath = 'public/' + annexData.realpath;
            var annexU = await annexModel.update({realpath: path}, {where: {businesskey: policeid}});//更新记录
            if (!annexU) {
                aj.success = false;
                aj.msg = '附件信息更新失败';
                return callback(aj);
            }
            // console.log(oldPath);
            fs.unlink(oldPath, function (err) {//删除图片
                if (err) {
                    console.log(err);
                    aj.success = false;
                    aj.msg = '原图片删除失败';
                    return callback(aj);
                } else {
                    aj.result = {realpath: serverPath + "/" + path};
                    return callback(aj)
                }
            })
        }
    } catch (err) {
        aj.success = false;
        aj.msg = err;
        callback(aj)
    }
}

/**
 * 保存用户打卡位置信息流水
 * @param data
 * @param callback
 */
exports.saveLocationRecord = async function (data, callback) {
    var aj = new AjaxJson();
    data.id = uuid.v1();
    data.create_date = new Date();
    try {
        var local = await locationRecordModel.create(data);
        if (!local) {
            aj.success = false;
            aj.msg = '保存错误';
        }
        var d = await currentModel.findOne({where: {policeid: data.policeid}});
        var params = {x_pt: data.x_pt, y_pt: data.y_pt, create_date: data.create_date};
        if (!d) {
            params.id = uuid.v1();
            params.policeid = data.policeid;
            var curr1 = await currentModel.create(params);
            if (!curr1) {
                aj.success = false;
                aj.msg = '实时定位保存错误';
            }
        } else {
            var curr2 = await currentModel.update(params, {where: {policeid: data.policeid}});
            if (!curr2) {
                aj.success = false;
                aj.msg = '实时定位更新错误';
            }
        }
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}

/**
 * 获取所有组织机构列表
 * @param callback
 */
// exports.getOrgList = async function (callback) {
//     var aj = new AjaxJson();
//     try {
//         var orgData = await orgModel.findAll({attributes:['id','parentid','org_name','org_code']});
//         aj.result = orgData;
//         callback(aj);
//     } catch (err) {
//         console.log(`${err.name} : ${err.message}`);
//         aj.success = false;
//         aj.msg = `${err.name}:数据库查询失败`;
//         callback(aj); //如果是数据库查询失败，就返回err
//     }
// }
exports.getOrgList = async function (data, callback) {
    var aj = new AjaxJson();
    var policeList = [];
    var departList = [];
    var where = {where: {parentid: data.departid}, attributes: ['id', 'org_name']};
    var where2 = {
        where: {pl_orgid: data.departid},
        attributes: ['id', 'police_name'],
        include: [{model: annexModel, attributes: ['realpath']}]
    };
    try {
        var orgData = await orgModel.findAll(where);//部门
        departList = orgData;
        if (data.departid == 1) {
            var where1 = {
                where: {id: data.policeid},
                attributes: ['id'],
                include: [{model: orgModel, attributes: ['id', 'org_name']}]
            };
            var personDepart = await personModel.findOne(where1);
            if (personDepart) {
                if (personDepart.pl_org) {
                    var d = personDepart.pl_org;
                    if (departList.indexOf(d) == -1) {
                        departList.push(d);
                    }
                }
            }
        }
        var personData = await personModel.findAll(where2);
        if (personData.length > 0) {
            for (var i in personData) {
                if (personData[i].sys_annex != null) {
                    personData[i].dataValues.realpath = serverPath + '/' + personData[i].sys_annex.realpath;
                } else {
                    personData[i].dataValues.realpath = serverPath + '/upload/image/default.jpg';//设置默认头像
                }
                delete personData[i].dataValues.sys_annex;
            }
        }
        policeList = personData;
        aj.result = {policeList: policeList, departList: departList};
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}
/**
 *获取组织机构详情
 * @param data {departid:string}
 * @param callback
 */
exports.getOrgInfo = async function (data, callback) {
    var aj = new AjaxJson();
    var where = {where: {id: data.departid}};
    try {
        var orgInfo = await orgModel.findOne(where);
        if (!orgInfo) {
            aj.success = false;
            aj.msg = "该部门不存在或已被删除";
        }
        aj.result = orgInfo;
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}

/**
 * 获取警员列表
 * @param data {departid:string} //-1表示获取全部
 * @param callback
 */
exports.getPoliceList = async function (data, callback) {
    var aj = new AjaxJson();
    var idArr = [];
    try {
        if (data.departid && data.departid != -1) {
            idArr.push(data.departid);
            getDepart(idArr, async function (res) {
                console.log(res);
                if (res.flag) {
                    var dataList = await personModel.findAll({
                        where: {pl_orgid: {$in: res.data}},
                        attributes: ['id', 'police_name', 'pl_orgid']
                    });
                    aj.result = dataList;
                    callback(aj);
                } else {
                    aj.success = false;
                    aj.msg = "数据库查询错误"
                    callback(aj);
                }
            })
        } else {
            var policeList = await personModel.findAll({attributes: ['id', 'police_name', 'pl_orgid']});
            aj.result = policeList;
            callback(aj);
        }
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj); //如果是数据库查询失败，就返回err
    }
}
// exports.test=function (data,callback) {
//     var path = 'public/upload/image/default1.jpg';
//     fs.unlink(path, function (err) {//删除图片
//         console.log(err);
//         if (err) {
//             console.log(888);
//
//             return callback({flag:false});
//         } else {
//             console.log('success');
//             return callback ({flag:true})
//         }
//     })

//递归查询选择的所有组织机构id
function getDepart(idArr, callback) {
    var arr = idArr;
    var getList = function (childArr) {
        var where = {parentid: {$in: childArr}};
        orgModel.findAll({
            where: where,
            attributes: ['id']
        }).then(res => {
            if (res && res.length > 0) {
                var parentid = [];
                for (var i = 0; i < res.length; i++) {
                    arr.push(res[i].id);
                    parentid.push(res[i].id);
                }
                getList(parentid);
            } else {
                callback({flag: true, data: arr, msg: '查询成功'});
            }
        }).catch(err => {
            if (err) {
                callback({flag: false, msg: '查询错误'})
            }
        })
    };
    getList(idArr);
}

/**
 * 判断是否为json字符串
 * @param str
 * @returns {boolean}
 */
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}