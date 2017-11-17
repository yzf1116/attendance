/**
 * Created on 2017/7/18.
 */
const AjaxJson = require('../../utils/AjaxJson');
const uuid = require('node-uuid');
const config = require('../../config/baseConfig');
const serverPath = config.webConfig.defaultServerPath;

const templateModel = db['rev_template'];
const customModel = db['rev_custom'];
const personModel = db['pl_person'];
const approveModel = db['rev_approver_temp'];
const sendModel = db['rev_send_temp'];
const applyRecordModel = db['rev_apply'];
const annexModel = db['sys_annex'];
const approvalModel = db['rev_approval'];
const orgModel = db['pl_org'];
/**
 * 获取审批模板列表
 * @param data {is_use:'1'}
 * @param callback
 */
exports.getTempList = async function (data, callback) {
    var aj = new AjaxJson();
    var where = {
        where: {
            is_use: "1"
        },
        attributes: ['template_name', 'template_code']
    };
    try {
        var temp = await templateModel.findAll(where);
        aj.result = temp;
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}

/**
 * 获取审批模板信息，包含审批人、抄送人
 * @param data {template_code:"string"}
 * @param callback
 */
exports.getTempById = async function (data, callback) {
    var aj = new AjaxJson();
    var where = {
        where: {
            template_code: data.template_code
        },
        attributes: ['id', 'template_name', 'template_code', 'form_items']
    };
    var retData = {};
    var approverList = [];
    var ccList = [];
    var where3 = {};
    try {
        var temp = await templateModel.findOne(where);
        if (!temp) {
            aj.success = false;
            aj.msg = '该审批模板不存在或已被删除';
            callback(aj);
        }
        retData.template_name = temp.template_name;
        retData.template_code = temp.template_code;
        retData.formData = JSON.parse(temp.form_items);
        var where1 = {
            where: {
                templateid: temp.id
            }
        };
        var sendPerson = await sendModel.findAll(where1);
        if (sendPerson.length > 0) {
            for (var i = 0; i < sendPerson.length; i++) { //获取抄送人
                var d = sendPerson[i];
                var person = await personModel.findOne({
                    where: {
                        id: d.personid
                    }
                });
                if (person) {
                    var annex = await annexModel.findOne({
                        where: {
                            businesskey: person.id
                        }
                    });
                    var p = {
                        id: person.id,
                        police_name: person.police_name,
                        realpath: serverPath + '/upload/image/default.jpg'
                    };
                    if (annex != null) {
                        p.realpath = serverPath + "/" + annex.realpath
                    }
                    ccList.push(p);
                }
            }
        }
        var approver = await approveModel.findOne({
            where: {
                templateid: temp.id,
                appr_level: 1
            }
        }); //获取审批人列表 null
        if (approver) {
            if (approver.approverid === "1") {
                var where2 = {
                    where: {
                        id: data.policeid
                    },
                    attributes: ['pl_orgid']
                };
                var person1 = await personModel.findOne(where2); //获取部门id
                if (person1) {
                    where3 = {
                        where: {
                            pl_orgid: person1.pl_orgid,
                            is_charge: 1
                        },
                        attributes: ['id', 'police_name']
                    };
                }
            } else {
                where3 = {
                    where: {
                        id: approver.approverid
                    },
                    attributes: ['id', 'police_name']
                };
            }
            // var person2 = await personModel.findAll(where3);//审批人
            // if(person2.length>0){
            //     for(var j=0;j<person2.length;j++){
            //         var annex2 = await annexModel.findOne({where:{businesskey:person2[j].id}});
            //         var param = {id:person2[j].id,police_name:person2[j].police_name,realpath:serverPath + '/upload/image/default.jpg'};
            //         if(annex2!=null){
            //             param.realpath = serverPath + "/" + annex2.realpath
            //         }
            //         approverList.push(param);
            //     }
            // }
            var apprPerson = await getApprList(where3);
            if (apprPerson) {
                approverList = apprPerson.approverList;
            }
        }
        retData.ccList = ccList;
        retData.approverList = approverList;
        aj.result = retData;
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}

/**
 * 保存审批申请记录
 * @param data
 * @param callback
 */
exports.saveApplyRecord = async function (req, callback) {
    var data = req.body;
    var aj = new AjaxJson();
    data.id = uuid.v1();
    data.review_code = getRandom();
    data.create_date = new Date();
    data.status = '1';
    try {
        var d = await applyRecordModel.create(data);
        if (!d) {
            aj.success = false;
            aj.msg = '提交失败';
            callback(aj);
        }
        if (req.files != undefined) {
            var params = [];
            for (var i = 0; i < req.files.length; i++) {
                var param = {
                    id: uuid.v1(),
                    businesskey: data.id,
                    realpath: req.files[i].destination.substr(7) + "/" + req.files[0].filename,
                    clientid: data.personid,
                    create_date: new Date()
                };
                params.push(param);
            }
            var annex = await annexModel.bulkCreate(params);
            if (!annex) {
                aj.success = false;
                aj.msg = '附件信息保存失败';
                callback(aj);
            }
        }
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}

/**
 * 更新申请状态
 * @param data
 * @param callback
 */
exports.updateStatus = async function (data, callback) {
    var aj = new AjaxJson();

    try {
        var d = await leaveModel.update();
        if (!d) {
            aj.success = false;
            aj.msg = '审批失败';
            callback(aj);
        }
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}

/**
 * 审批完成更改考勤记录
 * @param data
 * @param callback
 */
exports.changeAtdRecordByApply = async function (data, callback) {

    var aj = new AjaxJson();

    try {
        var d = await punchModel.create(data);
        if (!d) {
            aj.success = false;
            aj.msg = '请假申请提交失败';
            callback(aj);
        }
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
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
/**
 * 根据当前日期生成编号
 * @returns {string}
 */
function getRandom() {
    var dateStr = new Date().Format('yyyyMMdd');
    var num1 = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 5 - 1));
    var num2 = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, 5 - 1));
    return dateStr + num1 + '000' + num2;
}
/**
 * 通过申请人id获取申请表信息
 * @param {Object} data
 * @param callback
 * @param data : date.page  页码
 * @param        data.pageSize  分页数
 * @param        data.id  申请人id
 */
exports.getApplyList = async(data, callback) => {
    const aj = new AjaxJson();
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        var where = {
            personid: data.id
        };
        const applyRes = await applyRecordModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
        });
        if (applyRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = applyRes;
            return callback(aj)
        }
    } catch (err) {
        aj.msg = `查询申请失败:${err}`;
        aj.success = false;
        return callback(aj)
    }
}
/**
 * 通过审批人id查询
 * @param data
 * @param callback
 * @param data : date.page  页码
 * @param        data.pageSize  分页数
 * @param        data.id  申请人id
 * @returns {Promise.<*>}
 */
exports.getApprovalList = async(data, callback) => {
    const aj = new AjaxJson();
    try {
        data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        var where = {
            approverid: data.id
        };
        const approvalRes = await approvalModel.findAndCountAll({
            where: where,
            include: [{
                model: applyRecordModel,
                attributes: ['review_name','form_json']
            }],
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
        });
        if (approvalRes) {
            aj.success = true;
            aj.msg = '查询成功';
            aj.result = approvalRes;
            return callback(aj)
        }
    } catch (err) {
        aj.msg = `查询申请失败:${err}`;
        aj.success = false;
        return callback(aj)
    }
}

/**
 * 提交审批
 * @param data
 * @param callback
 */
exports.changeApplyByAppr = async function (data, callback) {
    var data = {
        id: uuid.v1(),
        apply_code: '201707271680100084108',
        is_agree: 1,
        approverid: 'fddb22b0-7270-11e7-bc83-bd056ac9696b',
        remark: '拒绝'
    };
    data.create_date = new Date();
    var aj = new AjaxJson();
    var updateData = {};
    var approverList = [];
    try {
        var d = await approvalModel.create(data);
        if (!d) {
            aj.success = false;
            aj.msg = '审批结果上传错误';
            callback(aj);
        }

        var notAgress = await approvalModel.count({
            where: {
                apply_code: data.apply_code,
                is_agree: 0
            }
        });
        if (notAgress > 0) {
            updateData = {
                status: 2
            };
            // var updateStatus = await applyRecordModel.update({status:2},{where:{review_code:data.apply_code}});
            //更新申请记录，推送给申请人已被拒绝2表示拒绝，1审核中，3同意
        } else {

            var d1 = await applyRecordModel.findOne({
                where: {
                    review_code: data.apply_code
                },
                attributes: ['approverids', 'level']
            });
            if (!d1) {
                aj.success = false;
                aj.msg = '申请记录不存在或被删除';
                callback(aj);
            }
            var approverids = JSON.parse(d1.approverids);
            var count = await approvalModel.count({
                where: {
                    approverid: JSON.parse(d1.approverids),
                    apply_code: data.apply_code
                }
            });
            if (count == approverids.length) {
                var apprIds = await approveModel.findOne({
                    where: {
                        appr_level: {
                            $gt: d1.level
                        }
                    }
                });
                if (apprIds) {
                    var apprWhere = {};
                    if (apprIds.approverid == "1") {
                        var orgid = await personModel.findOne({
                            where: {
                                id: data.approverid
                            },
                            attributes: ['pl_orgid'],
                            include: [{
                                model: orgModel,
                                attributes: ['parentid']
                            }]
                        });
                        if (!orgid) {
                            aj.success = false;
                            aj.msg = '找不到上级部门';
                            callback(aj);
                        }
                        apprWhere = {
                            where: {
                                pl_orgid: orgid.pl_org.parentid,
                                is_charge: 1
                            }
                        };
                    } else {
                        apprWhere = {
                            where: {
                                id: apprIds.approverid
                            }
                        };
                    }
                    var apprList = await getApprList(apprWhere);
                    if (apprList != undefined) { //向下一级审判人员推送
                        updateData = {
                            approverids: JSON.stringify(apprList.ids),
                            level: apprIds.appr_level
                        };
                        approverList = apprList.approverList;
                        // var updateAppr = await applyRecordModel.update({approverids:JSON.stringify(apprList.ids),level:apprIds.appr_level},{where:{review_code:data.apply_code}});
                        // if(!updateAppr){
                        //     aj.success = false;
                        //     aj.msg = '更新当前审批人失败';
                        //     callback(aj);
                        // }
                    }
                } else {
                    updateData = {
                        status: 3,
                        is_done: 1
                    };
                    // var overStatus = await applyRecordModel.update({status:3,is_done:1},{where:{review_code:data.apply_code}});//全部同意且为最后一级；
                    // if(!overStatus){
                    //     aj.success = false;
                    //     aj.msg = '当前审批状态更新失败';
                    //     callback(aj);
                    // }
                }

            } else {
                console.log(555);
                //当前级别还存在未审批的人；
            }
        }
        var updateAppr = await applyRecordModel.update(updateData, {
            where: {
                review_code: data.apply_code
            }
        });
        callback(aj);
    } catch (err) {
        console.log(`${err.name} : ${err.message}`);
        aj.msg = `${err.name}:数据库查询失败`;
        aj.success = false;
        callback(aj);
    }
}
async function getApprList(where) {
    var approverList = [];
    var ids = [];
    var person = await personModel.findAll(where); //审批人
    if (person.length > 0) {
        for (var j = 0; j < person.length; j++) {
            var annex = await annexModel.findOne({
                where: {
                    businesskey: person[j].id
                }
            });
            var param = {
                id: person[j].id,
                police_name: person[j].police_name,
                realpath: serverPath + '/upload/image/default.jpg'
            };
            if (annex != null) {
                param.realpath = serverPath + "/" + annex.realpath
            }
            approverList.push(param);
            ids.push(person[j].id);
        }
        return ({
            ids: ids,
            approverList: approverList
        });
    }


}