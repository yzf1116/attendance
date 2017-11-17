/**
 * Created by jessi on 2017/3/29.
 */
var connectionMysql = db.sequelize;
var typeGroupModel = db['sys_type_group'];
var typeModel = db['sys_type'];
var thenjs = require('thenjs');

exports.initDictionary = function (callback) {
    var obj = {
        typeGroupArr: [],
        typeArr: []
    };
    thenjs(function (cont) {
        typeGroupModel.findAll().then(function (ret) {
            var rets = [];
            if (ret) {
                for (var i = 0; i < ret.length; i++) {
                    rets[i] = ret[i].dataValues;
                }
                obj.typeGroupArr = rets;
            } else {
                obj.typeGroupArr = null;
            }
        });
        typeModel.findAll().then(function (ret) {
            var rets = [];
            if (ret) {
                for (var i = 0; i < ret.length; i++) {
                    rets[i] = ret[i].dataValues;
                }
                obj.typeArr = rets;
            } else {
                obj.typeArr = null;

            }
            cont(null, obj);

        });

    }).then(function (cont, obj) {
        try {
            var typeGroupArr = obj.typeGroupArr,
                typeArr = obj.typeArr;
            var dictionaryData = [];
            for (var i = 0; i < typeGroupArr.length; i++) {
                var model = {
                    typegroupname: '',
                    typegroupcode: '',
                    typeList: []
                };
                for (var j = 0; j < typeArr.length; j++) {
                    if (typeArr[j].typegroupid == typeGroupArr[i].id) {
                        model.typegroupname = typeGroupArr[i].typegroupname;
                        model.typegroupcode = typeGroupArr[i].typegroupcode;
                        var obj = {
                            typecode: typeArr[j].typecode,
                            typename: typeArr[j].typename
                        }

                        model.typeList.push(obj);
                    }
                }
                dictionaryData.push(model);

            }
            callback({status: true, ret: dictionaryData});
        } catch (e) {
            console.log(e.name + ':' + e.message);
        }

    });

};
/**
 *
 * @param data
 * @param callback
 */
exports.findDictionaryList = function (data, callback) {
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    var where = {};
    if (data.typegroupname != undefined) {
        where = {
            typegroupname: {
                $like: '%' + data.typegroupname + '%'
            }
        };
    }
    typeGroupModel.findAndCountAll({
        where: where,
        limit: parseInt(data.pageSize),
        offset: parseInt(data.start)
    }).then(function (res) {
        callback({status: true, data: res});
    }).catch(function (err) {
        if (err) {
            console.log(err);
            return callback({status: false, data: '查询错误'});
        }
    })
};
/**
 *
 * @param groupId
 * @param callback
 */
exports.findDicTypeList = function (groupId, callback) {
    typeModel.findAll({where: {typegroupid: groupId}}).then(function (ret) {
        if (ret) {
            callback({status: true, msg: '查询成功', data: ret});
        } else {
            callback({status: false, msg: '查询失败', data: ret});
        }
    }, function (err) {
        console.log('[select Error] - ', err.message);
        callback({status: false, msg: err.message});
    });
};

/**
 * 根据子表ForeignKey删除数据
 */
exports.deleteDicTypeForeign = function (childModel, foreignKey) {
    var sql = "DELETE from sys_type WHERE typegroupid = " + "'" + foreignKey + "'";
    connectionMysql.query(sql, function (err, ret) {
        if (ret) {
            console.log(ret);
        } else {
            console.log('字典类型表删除失败');
        }
    })

};


