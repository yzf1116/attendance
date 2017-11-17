/**
 * 前缀get为get请求，post为post请求，函数名统一小写，如果大写将获取不到路由映射。
 *
 */

var dictionaryService = require('../../../service/system/DictionaryService');
var typeGroupModel = db['sys_type_group'];
var commonService = require('../../../service/common/CommonService');
var typeModel = db['sys_type'];


module.exports = {

    get_index: function (req, res) {
        res.send({msg: '字典管理控制器入口文件测试成功'})

    },
   /**
     * 查询所有字典表和子类型
     */
    get_initdictionary:function (req, res) {
        dictionaryService.initDictionary(function (ret) {
            res.send(ret);
        });

    },
    /**
     * 查询字典list(带分页)
     */
    get_finddictionarylist:function (req, res) {
        var pages = req.query;
        dictionaryService.findDictionaryList(pages, function (ret) {
            res.send(ret);
        });
    },
    /**
     * 新增或更新字典
     */
    post_addorupdatedictionary:function (req, res) {
        var obj = req.body;
        if ('id' in obj) {
            commonService.update(typeGroupModel, obj, function (ret) {
                res.send(ret);
            });
        } else {
            commonService.save(typeGroupModel, obj, function (ret) {
                res.send(ret);
            });
        }


    },
    /**
     * 单条删除和批量删除
     */
    post_deletedic:function (req, res) {
        var obj = req.body;
        if ('ids' in obj) {
            var ids = obj.ids;
            var msgStauts = [];
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                dictionaryService.deleteDicTypeForeign(typeModel, id);
                commonService.delete(typeGroupModel, id, function (ret) {
                    if (ret.status === false) {
                        msgStauts.push(i);
                    }
                });
            }
            if (msgStauts.length == 0) {
                res.send({status: true, msg: '删除成功'});
            } else {
                res.send({status: false, msg: '有' + msgStauts.length + '条数据删除失败'});
            }


        } else {
            var id = obj.id;
            dictionaryService.deleteDicTypeForeign(typeModel, id);
            commonService.delete(typeGroupModel, id, function (ret) {
                res.send(ret);
            });

        }


    },
    /**
     * 根据groupId查询字典类型
     */
    post_finddictypelist:function (req, res) {
        var groupId = req.body.groupId;
        dictionaryService.findDicTypeList(groupId, function (ret) {
            res.send(ret);
        });

    },
    /**
     * 新增或更新字典类型
     */
    post_addorupdatedictype:function (req, res) {
        var obj = req.body;
        if ('id' in obj) {
            commonService.update(typeModel, obj, function (ret) {
                res.send(ret);
            });
        } else {
            commonService.save(typeModel, obj, function (ret) {
                res.send(ret);
            });
        }
    },
    post_deletedictype:function (req, res) {
        var obj = req.body;
        if ('ids' in obj) {
            var ids = obj.ids;
            var msgStauts = [];
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                commonService.delete(typeModel, id, function (ret) {
                    if (ret.status === false) {
                        msgStauts.push(i);
                    }
                });
            }
            if (msgStauts.length == 0) {
                res.send({status: true, msg: '删除成功'});
            } else {
                res.send({status: false, msg: '有' + msgStauts.length + '条数据删除失败'});
            }
        } else {
            var id = obj.id;
            commonService.delete(typeModel, id, function (ret) {
                res.send(ret);
            });
        }
    }
}    


