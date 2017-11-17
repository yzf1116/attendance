var uuid = require('node-uuid');
var async = require('async');
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var model = db['pl_person'];
var model_sys_annex = db['sys_annex'];
var rolePoliceModel = db['pl_role_police'];

var AjaxJson = require('../../utils/AjaxJson');


//新增警员信息无图片

exports.addoreditpolice = async (data, callback) => {
    var aj = new AjaxJson();
    if (data.password) {
        data.password = cryptoUtils.irreversibleEncrypt(data.phone, data.password);//密码加密
    }
   
    data.id = uuid.v1();
    data.create_date = new Date().toLocaleString();//获取格式化日期与时间 如2017-04-10 10:15:56
    try {
        var code = await model.count({where: {code: data.code}});
        if (code > 0) {
            aj.success = false;
            aj.msg = '工号已存在，请确认后重新输入';
            return callback(aj);
        }
        var phone = await model.count({where: {phone: data.phone}});
        if (phone > 0) {
            aj.success = false;
            aj.msg = '手机号已存在，请确认后重新输入';
            return callback(aj);
        }
        var addPoliceInfo = await model.upsert(data);
        if (!addPoliceInfo) {
            aj.success = false;
            aj.msg = '新增出错';
            return callback(aj);
            
        }
        aj.result = addPoliceInfo;
        callback(aj);
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}`;
        callback(aj);
    }
}


//保存警员信息及图片
exports.saveInfoImage = function (data, callback) {
    var aj = new AjaxJson();
    try {
        var form = new formidable.IncomingForm();
        form.uploadDir = './public/upload/image/';
        form.parse(data, function (error, fields, files) {

            var file = files.file;
            var uploadDir = reNameFile(file);
         
            fields.id = uuid.v1();
            fields.photo = uuid.v1();
            fields.create_date = new Date().toLocaleString();
            var params = {
                id: fields.photo,
                businesskey: fields.id,
                realpath: uploadDir.substr(7)
            };
            var params2 = {
                id:uuid.v1(),
                roleid:fields.roleid,
                policeid:fields.id
            };
            model.count({where: {cardid: data.cardid}}).then(function (res) {
                if (res && res > 0) {
                    aj.success = false;
                    aj.msg = '警员工号已存在，请确认后重新输入';
                    return callback(aj);
                } else {
                    fs.rename(file.path, uploadDir, function (err) {
                        if (err) {
                            aj.success = false;
                            aj.msg = '图片保存失败';
                            return callback(aj);
                        } else {
                            model.create(fields).then(function (res) {
                                if (res) {
                                    model_sys_annex.create(params).then(function (res) {
                                        if(res){
                                            rolePoliceModel.upsert(params2).then(res =>{
                                                aj.success = res;
                                                callback(aj)
                                            }).catch(err =>{
                                                aj.success = false;
                                                aj.msg = "插入失败";
                                                callback(aj);
                                            })
                                        }
                                    }).catch(function (err) {
                                        if(err){
                                            aj.success = false;
                                            aj.msg = err;
                                            return callback(aj)
                                        }
                                    })
                                }
                            }).catch(function (err) {
                               if(err){
                                   aj.success = false;
                                   aj.msg = err;
                                   return callback(aj)
                               }
                            })
                        }
                    });
                }
            }).catch(function (err) {
                if (err) {
                    aj.success = false;
                    aj.msg = '查询错误';
                    return callback(aj)
                }
            })
            
        })
    } catch (err) {
        if(err){
            aj.success = false;
            aj.msg = err;
            return callback(aj)
        }
    }
}

//解绑警员角色关联
exports.unbundlingRole = function (data, callback) {
    rolePoliceModel.destroy({where:data}).then(res =>{
        aj.success = res;
        callback(aj);
    }).catch(err =>{
        if(err){
            aj.success = false;
            aj.msg = '解绑操作出错'
            callback(aj);
        }
    })

}

//重命名保存文件
function reNameFile(file) {
    var d = new Date()
    var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var fName = d.getFullYear() + '' + month[d.getMonth()] + d.getDate() +
        d.getHours() + d.getMinutes() + d.getSeconds() + parseInt(Math.random() * 1000)

    switch (file.type) {
        case "image/jpeg":
            fName = fName + '.jpg'
            break
        case "image/png":
            fName = fName + '.png'
            break
        default:
            fName = fName + '.png'
            break
    }

    var uploadDir = 'public/upload/image/' + fName

    return uploadDir
}
