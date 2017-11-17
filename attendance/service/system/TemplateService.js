/**
 * Created by yangzhenfang on 2017/05/31.
 */
const uuid             =  require('node-uuid');
const fs               =  require('fs');
const path             =  require('path');
const async            =  require('async');
const date             =  require('../../utils/dateUtils');
const file             =  require('../../utils/fileUtils');
const AjaxJson         =  require('../../utils/AjaxJson');
const sysTemplateModel =  db['rev_template'];
//查询审批类型信息
exports.getSysTemplateList = async (data, callback) => {
    let aj = new AjaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    let where = {};
    if (data.template_name !== undefined) {
        where = {
            template_name: {
                $like: '%' + data.template_name + '%'
            }
        }
    }
    try {
        let templateInfo = await sysTemplateModel.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start)
        });
        if (!templateInfo) {
            aj.success = false;
            aj.msg = '查询失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询成功';
        aj.result = templateInfo;
        callback(aj)
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库操作错误`;
        callback(aj)
    }
};

//新增模版信息
exports.addSysTemplate = function (data, callback) {
    console.log(data);
    if (data.is_use === false) {
        data.is_use = 0
    } else {
        data.is_use = 1
    }
    if (data.userInfo.username) {
        data.create_user = data.userInfo.username
    }
    data.form_items = data.formData;
    if (data.id) {
        sysTemplateModel.update(data, {where: {id: data.id}})
            .then(function (res) {
                callback({flag: true})
            }).catch(function (err) {
            if (err) {
                callback({flag: false})
            }
        })

    } else {
        data.id = uuid.v1();
        console.log(data);
        sysTemplateModel.upsert(data)
            .then(function (res) {
                callback({flag: true})
            }).catch(function (err) {
            if (err) {
                console.log(err);
                callback({flag: false})
            }
        })
    }

};
//编辑模版启用状态
exports.editTemplate = async (data, callback) => {
    let aj = new AjaxJson();
    console.log(data);
    try {
        if (data.id) {
            let tempStatus = sysTemplateModel.update(data, {where: {id: data.id}});
            if (!tempStatus) {
                aj.success = false;
                aj.msg = '更新失败';
                callback(aj);
                return
            }
            aj.success = true;
            aj.msg = '更新成功';
            aj.result = tempStatus;
            callback(aj)
        }
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库连接失败`;
        callback(aj)
    }
};
//写入文件
exports.customTemplate = function (data, callback) {
    let url = './public/upload/customTemplate/';
    let time = new Date().Format('yyyy-MM-dd hh:mm:ss');

    let str = JSON.parse(data.formData);
    console.log(data);
    if (file.createManyDirSync(url)) {
        fs.writeFileSync(url + str.title + time + '.json', data.formData);//写入json文件
        callback({flag:true,msg:'写入成功'})
    }
};
// //读取文件
exports.appReadCustomTemplate = function (data, callback) {
    let url = './public/upload/customTemplate/';
    let a = fs.readdirSync(url);

    a.forEach(function (file) {
        if (data.title === file) {
            let result = JSON.parse(fs.readFileSync(url + file));
            callback(result);
        }
        console.log(file);
        fs.stat(url + file, function (err, stat) {
            if (err) {
                console.log(err);
                return;
            }
            if (stat.isDirectory()) {
                // 如果是文件夹遍历
                explorer(url + file);
            } else {
                // 读出所有的文件
                console.log('文件名:' + url + file);
            }
        });

    });
};
//删除单条或多条模版信息
exports.deleteSysTemplate = async (data, callback) => {
    let aj = new AjaxJson();
    let where = {};
    let arr = [];
    // let jsPath = [];
    if (data.params) {
        console.log('1',data.params);
        /*   let _list = data.params;
           for (let i in _list) {
               arr.push(_list[i].id);
               jsPath.push(`./public/upload/customTemplate/${_list[i].template_name}${_list[i].create_date}.json`)
           }*/
        where = {id: {$in: arr}};
        try {
            let delTempInfo = await sysTemplateModel.destroy({where: where});
            if (!delTempInfo) {
                aj.success = false;
                aj.msg = "删除自定义模版失败";
                callback(aj);
                return
            }
            /*   for (let i = 0; i < jsPath.length; i++) {
                   let fsInfo =await  fs.unlink(jsPath[i]);
                   if (fsInfo) {
                       aj.success = false;
                       aj.msg = '物理路径文件删除失败';
                       callback(aj);
                       return
                   }
               }*/
            aj.success = true;
            aj.msg = '删除成功';
            aj.result = delTempInfo;
            callback(aj)

        } catch (err) {
            aj.success = false;
            aj.msg = `${err.name}:数据库操作失败`;
            callback(aj)
        }
    } else {
        console.log('2',data);
        // let jsonPath = `./public/upload/customTemplate/${data.template_name}${data.create_date}.json`;
        where = {id: data.id};
        try {
            let delTempInfo = await sysTemplateModel.destroy({where: where});
            console.log(delTempInfo);
            if (!delTempInfo) {
                aj.success = false;
                aj.msg = "删除自定义模版失败";
                callback(aj);
                return
            }
            // console.log(jsonPath);
            // let fsInfo = await fs.unlink(jsonPath);
            // console.log(fsInfo);
            /*   if (fsInfo) {
                   aj.success = false;
                   aj.msg = '物理路径文件删除失败';
                   callback(aj);
                   return
               }*/
            aj.success = true;
            aj.msg = '删除成功';
            aj.result = delTempInfo;
            callback(aj)
        } catch (err) {
            aj.success = false;
            aj.msg = `${err.name}:数据库操作失败`;
            callback(aj)
        }
    }
};

//获取所有审批类型
exports.getAllTemplate = async (data,callback)=>{
    let aj = new AjaxJson();
    try {
        let allTemplate =await sysTemplateModel.findAll();
        if(!allTemplate){
            aj.success = false;
            aj.msg = '查询审批类型失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询审批类型成功';
        aj.result = allTemplate;
        callback(aj)

    } catch(err){
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj);
    }


};