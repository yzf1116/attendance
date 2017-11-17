/**
 * commonService 公共的service, 封装了常用的CRUD，传入实体model和参数
 */
var uuid = require('node-uuid');

/**
 * 保存
 * @param model
 * @param obj
 * @param callback
 */
exports.save = function (model, obj, callback) {
    var obj = obj;
    obj.id = uuid.v1();
    model.create(obj).then(function (ret) {
        if (ret) {
            callback({status: true, msg: '保存成功'});
        }
    }, function (err) {
        console.log('[insert Error] - ', err.message);
        callback({status: false, msg: '保存失败'});
    });
};
/**
 * 保存多条记录
 * @param model
 * @param array    备注：数组类型
 * @param callback
 */
exports.saveMany = function (model, array, callback) {
    if (array instanceof Array) {
        var dataAry = array;
        for (var key in dataAry) {
            var id = uuid.v1();
            dataAry[key].id = id;
        }
        model.bulkCreate(dataAry).then(function (ret) {
            if (ret) {
                callback({status: true, msg: '保存成功'});
            }
        }, function (err) {
            console.log('[insert Error] - ', err.message);
            callback({status: false, msg: '保存失败'});
        });
    }


};
/**
 * 更新
 * @param model
 * @param objData
 * @param callback
 */
exports.update = function (model, objData, callback) {
    model.update(objData, {where: {id: objData.id}}).then(function (ret) {
        console.log(JSON.stringify(ret), 123413);
        if (ret) {
            callback({status: true, msg: '数据更新成功'});
        }
    }, function (err) {
        console.log('[update Error] - ', err.message);
        callback({status: false, msg: err.message});
    });

};
/**
 * 查询所有数据
 * @param model
 * @param callback
 */
exports.findAll = function (model, callback) {
    model.findAll().then(function (ret) {
        if (ret) {
            callback({status: true, msg: '查询成功', data: ret});
        } else {
            callback({status: false, msg: '查询失败'})
        }
    }, function (err) {
        console.log('[select Error] - ', err.message);
        callback({status: false, msg: err.message});
    });
};
/**
 * 根据id查询单条记录
 * @param model
 * @param id
 * @param callback
 */
exports.findOne = function (model, id, callback) {
    model.findOne({where: {id: id}}).then(function (ret) {
        if (ret) {
            callback({status: true, msg: '查询成功', data: ret});
        } else {
            callback({status: false, msg: '查询失败'});
        }
    }, function (err) {
        console.log('[select Error] - ', err.message);
        callback({status: false, msg: err.message});
    });
};
/**
 * 自定义where查询
 * @param model
 * @param where   Object类型,如{key:value}
 * @param callback
 */
exports.queryWhere = function (model, where, callback) {
    model.findAll({where: where}).then(function (ret) {
        if (ret) {
            callback({status: true, msg: '查询成功', data: ret});
        } else {
            callback({status: false, msg: '查询失败'});
        }
    }, function (err) {
        console.log('[select Error] - ', err.message);
        callback({status: false, msg: err.message});
    });
};
/**
 * 根据id删除数据
 * @param model  实体model
 * @param id     主键
 * @param callback   回调函数
 */
exports.delete = function (model, id, callback) {
    model.destroy({where: {id: id}}).then(function (ret) {
        if (ret) {
            callback({status: true, msg: '删除成功'});
        } else {
            callback({status: false, msg: '删除失败'});
        }
    }, function (err) {
        console.log('[delete ERROR] - ', err.message);
        callback({status: false, msg: err.message});
    });
};
/**
 * 删除所有表数据 (慎用)
 * @param model
 * @param callback
 */
exports.deleteAll = function (model, callback) {
    model.destroy().then(function (ret) {
        if (ret === 0) {
            callback({status: false, msg: '数据全部删除失败'})
        } else if (ret === 1) {
            callback({status: true, msg: '数据全部删除成功'});
        }
    }, function (err) {
        console.log('[delete ERROR] - ', err.message);
        callback({status: false, msg: err.message});
    });
}
