const uuid            =   require('node-uuid');
const crypto          =   require('crypto');
const async           =   require('async');
const path            =   require('path');
const fs              =   require('fs');
const formidable      =   require('formidable');
const cryptoUtils     =   require('../../utils/cryptoUtils');
const commonService   =   require('../common/commonService');
const AjaxJson        =   require('../../utils/AjaxJson');
const model           =   db['pl_person'];
const model_plOrg     =   db['pl_org'];
const model_atdGroup  =   db['atd_group'];
const model_sys_annex =   db['sys_annex'];
const modelRolePolice =   db['pl_role_police'];

model.hasOne(model_sys_annex, {foreignKey: 'businesskey'});

//查询警员信息
exports.policelistdata = async (data, callback) => {
    let aj = new AjaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize)
    let where = {};
    if (data.police_name !== undefined) {
        where = {
            police_name: {
                $like: '%' + data.police_name + '%'
            },
            del_flag:0
        }
    }
    if (data.pl_orgid !== undefined) {
        where.pl_orgid = {$in: data.pl_orgid}
        // where.pl_orgid={$in: data.pl_orgid}

    }
    try {
        let policeData = await model.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start),
            include: [{model: model_sys_annex, attributes: ['realpath']}]
        });

        if (!policeData) {
            aj.success = false;
            aj.msg = '未匹配到查询参数';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询成功';
        aj.result = policeData;
        callback(aj)
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`;
        callback(aj)
    }
};


//新增或编辑警员信息
exports.addoreditpolice = async (data, callback) => {
    console.log('要新增或编辑的数据',data);
    let aj = new AjaxJson();
    if (data.password) {
        data.password = cryptoUtils.irreversibleEncrypt(data.phone, data.password)//密码加密
    }
    if (data.id) {
        try {
            let codeInfo = await model.findOne({
                where: {code: data.code, id: {$notIn: [data.id]}},
                attributes: ['id']
            });
            if (codeInfo) {
                aj.success = false;
                aj.msg = '工号已存在，请确认后重新输入';
                callback(aj);
                return
            }
            let phoneInfo = await model.findOne({
                where: {phone: data.phone, id: {$notIn: [data.id]}},
                attributes: ['id']
            });
            if (phoneInfo) {
                aj.success = false;
                aj.msg = '手机号已存在,请确认后重新输入';
                callback(aj);
                return
            }
            let editPoliceInfo = await model.update(data, {where: {id: data.id}});
            if (!editPoliceInfo) {
                aj.success = false;
                aj.msg = '修改出错';
                callback(aj);
                return
            }
            aj.success = true;
            aj.msg = '修改成功';
            aj.result = editPoliceInfo;
            callback(aj)
        } catch (err) {
            aj.success = false;
            aj.msg = `${err.name}`;
            callback(aj)
        }
    } else {
        data.id = uuid.v1();
        data.create_date = new Date().toLocaleString();//获取格式化日期与时间 如2017-04-10 10:15:56
        try {
            let code = await model.count({where: {code: data.code}});
            if (code > 0) {
                aj.success = false;
                aj.msg = '工号已存在，请确认后重新输入';
                callback(aj);
                return
            }
            let phone = await model.count({where: {phone: data.phone}});
            if (phone > 0) {
                aj.success = false;
                aj.msg = '手机号已存在，请确认后重新输入';
                callback(aj);
                return
            }
            let addPoliceInfo = await model.upsert(data);
            if (!addPoliceInfo) {
                aj.success = false;
                aj.msg = '新增出错';
                callback(aj);
                return
            }
            aj.success = true;
            aj.msg = '新增成功';
            aj.result = addPoliceInfo;
            callback(aj)
        } catch (err) {
            aj.success = false;
            aj.msg = `${err.name}`;
            callback(aj)
        }
    }
};


//保存警员信息及图片
exports.saveInfoImage = function (data, callback) {
    try {
        let form = new formidable.IncomingForm();
        form.uploadDir = './public/upload/image/';

        form.parse(data, function (error, fields, files) {

            if (fields.password) {
                fields.password = cryptoUtils.irreversibleEncrypt(fields.phone, fields.password);//加密
            }

            let file = files.file;
            let uploadDir = reNameFile(file);
            let realPath = uploadDir.substr(7);
            console.log(file.path);
            console.log(uploadDir);
            if (fields.id) {
                model.findOne({
                    where: {code: fields.code, id: {$notIn: [fields.id]}},
                    attributes: ['id']
                }).then(function (res) {
                    if (res && res.id) {
                        return callback({flag: false, msg: '警员工号已存在，请确认后重新输入'})
                    } else {
                        model.findOne({
                            where: {phone: fields.phone, id: {$notIn: [fields.id]}},
                            attributes: ['id']
                        }).then(function (res) {
                            if (res && res.id) {
                                return callback({flag: false, msg: '手机号已存在，请确认后重新输入'})
                            } else {
                                if (fields.imgInfo) {
                                    fs.rename(file.path, uploadDir, function (err) {
                                        if (err) {
                                            throw new Error(err);
                                        } else {
                                            model.update(fields, {where: {id: fields.id}}).then(function (res) {
                                                if (res) {
                                                    model_sys_annex.update({realpath: realPath}, {where: {businesskey: fields.id}})
                                                        .then(function (res) {
                                                            if (res) {
                                                                let path = './public/'+fields.imgInfo;

                                                                console.log(path);
                                                                fs.unlink(path, function (err) {

                                                                    if (err) {
                                                                        return callback({flag: false, msg: '原图片删除失败，修改信息保存成功'})
                                                                    } else {
                                                                        return callback({flag: true, msg: '保存成功'})
                                                                    }
                                                                })

                                                            } else {
                                                                return callback({flag: false, msg: '图片信息保存失败'})
                                                            }
                                                        }).catch(function (err) {
                                                        return callback({flag: false, msg: '图片信息保存失败'})
                                                    })
                                                }
                                            }).catch(function (err) {
                                                return callback({flag: false, msg: '文件上传成功，信息保存失败'})
                                            })
                                        }
                                    })
                                } else {
                                    fields.photo = uuid.v1();
                                    let params = {
                                        id: fields.photo,
                                        businesskey: fields.id,
                                        realpath: realPath
                                    };
                                    fs.rename(file.path, uploadDir, function (err) {
                                        if (err) {
                                            throw new Error(err);
                                            return callback({flag: false, msg: err})
                                        } else {
                                            model.update(fields, {where: {id: fields.id}}).then(function (res) {
                                                if (res) {
                                                    model_sys_annex.create(params).then(function (res) {
                                                        return callback({flag: true, msg: '保存成功'})
                                                    }).catch(function (err) {
                                                        if (err) {
                                                            return callback({flag: false, msg: '修改失败'})
                                                        }
                                                    })
                                                }
                                            }).catch(function (err) {
                                                return callback({flag: false, msg: '修改错误'})
                                            })
                                        }

                                    })
                                }
                            }
                        })
                    }
                }).catch(function (err) {
                    if (err) {
                        return callback({flag: false, msg: '查询错误'})
                    }
                })
            } else {

                fields.id = uuid.v1();

                fields.create_date = new Date().toLocaleString();
                let params = {
                    id: uuid.v1(),
                    businesskey: fields.id,
                    realpath: realPath
                };
                model.count({where: {code: fields.code}}).then(function (res) {
                    if (res && res > 0) {
                        return callback({flag: false, msg: '警员工号已存在，请确认后重新输入'});
                    } else {
                        model.count({where: {phone: fields.phone}}).then(function (res) {
                            if (res && res > 0) {
                                return callback({flag: false, msg: '手机号已存在，请确认后重新输入'})
                            } else {
                                fs.rename(file.path, uploadDir, function (err) {
                                    if (err) {
                                        throw new Error(err);
                                    } else {
                                        model.create(fields).then(function (res) {
                                            if (res) {
                                                model_sys_annex.create(params).then(function (res) {
                                                    callback({flag: true, msg: '保存成功'});
                                                }).catch(function (err) {
                                                    return callback({flag: false, msg: err});
                                                })
                                            }
                                        }).catch(function (err) {
                                            return callback({flag: false, msg: err});
                                        })
                                    }
                                });
                            }
                        }).catch(function (err) {
                            if (err) {
                                return callback({flag: false, msg: '查询错误'})
                            }
                        })

                    }
                }).catch(function (err) {
                    if (err) {
                        return callback({flag: false, msg: '查询错误'})
                    }
                })
            }
        })
    } catch (err) {
        res.send({flag: false, msg: err})
    }
};


//保存人员信息删除图片
exports.saveInfoRemoveImg = async (data, callback) => {
    let aj = new AjaxJson();
    if (data.password) {
        data.password = cryptoUtils.irreversibleEncrypt(data.phone, data.password)
    }

    let imgpath = `./public${data.sys_annex.realpath}`;
    try {
        let codeInfo = await model.findOne({
            where: {code: data.code, id: {$notIn: [data.id]}},
            attributes: ['id']
        });
        if (codeInfo) {
            aj.success = false;
            aj.msg = '警员工号已存在，请确认后重新输入';
            callback(aj);
            return
        }
        let phoneInfo = await model.findOne({
            where: {phone: data.phone, id: {$notIn: [data.id]}},
            attributes: ['id']
        });
        if (phoneInfo) {
            aj.success = false;
            aj.msg = '手机号已存在，请确认后重新输入';
            callback(aj);
            return
        }
        let imgInfo = await model_sys_annex.destroy({where: {businesskey: data.id}});
        if (!imgInfo) {
            aj.success = false;
            aj.msg = '图片删除失败';
            callback(aj);
            return
        }
        let fsimg = await fs.unlinkSync(imgpath);
        if (fsimg) {
            aj.success = false;
            aj.msg = '物理路径图片删除失败';
            callback(aj);
            return
        }
        let updatePoliceInfo = await model.update(data, {where: {id: data.id}});
        if (!updatePoliceInfo) {
            aj.success = false;
            aj.msg = '修改信息出错';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '修改成功';
        aj.result = updatePoliceInfo;
        callback(aj)

    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}`;
        callback(aj)
    }
};

//逻辑删除警员信息，更改删除标记状态
exports.changeDelFlag = async (data,callback) =>{
    let aj = new AjaxJson();
    try{
        let changedelflag = await model.update({del_flag:1},{where:{id:data.id}});
        if(!changedelflag){
            aj.success = false;
            aj.msg = '更改删除标记失败';
            callback(aj);
            return;
        }
        aj.success = true;
        aj.msg = '更改删除标记成功';
        aj.result = changedelflag;
        callback(aj);
    }catch (err){
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj)
    }

};
//删除警员信息
// exports.deletepolice = async (data, callback) => {
//     let aj = new AjaxJson();
//     console.log(data.imgPath);
//     if(data.imgPath !== null){
//         let imgPath = `./public/${data.imgPath}`;
//
//         try {
//             let policeInfo = await model.destroy({where: {id: data.id}});
//             console.log(!policeInfo);
//             if (!policeInfo) {
//                 aj.success = false;
//                 aj.msg = '删除警员信息失败';
//                 callback(aj);
//                 return
//             }
//
//             let imgInfo = await model_sys_annex.destroy({where: {businesskey: data.id}});
//             console.log(imgInfo);
//             if (!imgInfo) {
//                 aj.success = false;
//                 aj.msg = '删除图片失败';
//                 callback(aj);
//                 return
//             }
//             let fsInfo = await fs.unlinkSync(imgPath);
//             console.log(fsInfo);
//             if (fsInfo) {
//                 aj.success = false;
//                 aj.msg = '物理路径图片删除失败';
//                 callback(aj);
//                 return
//             }
//             let rolePoliceId = await modelRolePolice.update({policeid: null}, {where: {policeid: data.id}});
//             console.log(rolePoliceId);
//             if (!rolePoliceId) {
//                 aj.success = false;
//                 aj.msg = '删除id失败';
//                 callback(aj);
//                 return
//             }
//             aj.success = true;
//             aj.msg = '删除成功';
//             aj.result = rolePoliceId;
//             callback(aj)
//         } catch (err) {
//             aj.success = false;
//             aj.msg = err.name;
//             callback(aj)
//         }
//
//     }else {
//         try {
//             let policeInfo = await model.destroy({where: {id: data.id}});
//             console.log(!policeInfo);
//             if (!policeInfo) {
//                 aj.success = false;
//                 aj.msg = '删除警员信息失败';
//                 callback(aj);
//                 return
//             }
//             let rolePoliceId = await modelRolePolice.update({policeid: null}, {where: {policeid: data.id}});
//             console.log(rolePoliceId);
//             if (!rolePoliceId) {
//                 aj.success = false;
//                 aj.msg = '删除id失败';
//                 callback(aj);
//                 return
//             }
//             aj.success = true;
//             aj.msg = '删除成功';
//             aj.result = rolePoliceId;
//             callback(aj)
//         } catch (err) {
//             aj.success = false;
//             aj.msg = err.name;
//             callback(aj)
//         }
//
//     }
// };


//查询全部机构
exports.findAllPlOrg = function (data, callback) {
    model_plOrg.findAll().then(function (res) {
        callback({flag: true, data: res})
    }).catch(function (err) {
        callback({flag: false, msg: '查询错误'})
    })
};


//通过组织机构id查询警员信息
exports.findPoliceData = function (data, callback) {
    let where = {};

    if(data.id){
        where = {
            pl_orgid: {$in: data.id}
        }
    }
    if(data.police_name) {
        where = {
            police_name: {
                $like: '%' + data.police_name + '%'
            }
        }
    }
    model.findAll({where:where, attributes: ['id', ['police_name','name']]}).then(function (res) {
        callback({flag:true, data:res})
    }).catch(function (err){
        callback({flag:false,msg:'查询错误'})
    })
};

exports.findPoliceData = function (data, callback) {
    let where={};
    if(data.id){
        where={
            pl_orgid:data.id
        }
    }
    if(data.police_name) {
        where = {
            police_name: {
                $like: '%' + data.police_name + '%'
            }
        }
    }
    model.findAll({where:where, attributes: ['id', ['police_name','name']]}).then(function (res) {
        callback({flag:true, data:res})
    }).catch(function (err){
        callback({flag:false,msg:'查询错误'})
    })
};


//查询全部所属组
exports.findAllAtdGroup = function (data, callback) {
    model_atdGroup.findAll().then(function (res) {
        callback({flag: true, data: res})
    }).catch(function (err) {
        callback({flag: false, msg: '查询错误'})
    })
};


//重命名保存文件
function reNameFile(file) {
    let d = new Date();
    let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let fName = d.getFullYear() + '' + month[d.getMonth()] + d.getDate() +
        d.getHours() + d.getMinutes() + d.getSeconds() + parseInt(Math.random() * 1000);

    switch (file.type) {
        case "image/jpeg":
            fName = fName + '.jpg';
            break;
        case "image/png":
            fName = fName + '.png';
            break;
        default:
            fName = fName + '.png';
            break
    }

    let uploadDir = 'public/upload/image/' + fName;

    return uploadDir
}


//保存修改图片
function editChangeImg(data, fields, file, uploadDir, realPath, callback) {

}