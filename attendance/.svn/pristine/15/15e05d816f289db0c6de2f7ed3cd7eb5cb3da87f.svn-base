var async = require('async');
var uuid = require('node-uuid');
var arrUtil=require('../../utils/arrUtils')
/**
 * 得到excel模板
 * @param table_name
 */
exports.getModel = function (table_name, callback1) {
    var obj={};
    var filed={};
    var table=[];
    obj.ass_data={};
    async.series([
        function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 1, is_export: 1}}).then(function (ret) {
                obj.tip = ret;
                callback(null, ret)
            })
        },
        function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 2, is_export: 1}}).then(function (ret) {
                obj.title = ret;
                callback(null, ret)
            })
        },function (callback) {
            db['sys_excel'].findAll({where: {table_name: table_name, td_type: 3, is_export: 1},order: [['order', 'DESC']]}).then(function (ret) {
                obj.header = ret;
                callback(null, ret)
            })
        },function(callback){
            db['sys_excel'].findAll({where:{table_name:table_name,association_type:{$ne:0}}}).then(function(ret){
                for(var i=0;i<ret.length;i++){
                    table.push(ret[i]);
                }

                callback(null,ret)
            })
        },function(callback){
            for (var i = 0; i < table.length; i++) {
                (function(index){
                    db[table[index].association_table].findAll().then(function(ret){
                        var item={};
                        for(var j=0;j<ret.length;j++){
                            item[ret[j][table[index].association_field]]=ret[j]
                        }
                        obj.ass_data[table[index].field]=item;
                        if(index==table.length-1){
                            callback(null);
                        }
                    })
                })(i)
            }
        }
    ], function (err, result) {
        callback1({err:err,result:obj})
    });
};
/**
 * 得到excel数据
 * @param table_name
 */
exports.getExcelData = function (table_name, callback1) {
    var obj={};
    var filed={};
    var table=[];
   obj.ass_data={};
    async.series([
        function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 1, is_export: 1}}).then(function (ret) {
                obj.tip = ret;
                callback(null, ret)
            })
        },
        function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 2, is_export: 1}}).then(function (ret) {
                obj.title = ret;
                callback(null, ret)
            })
        },function (callback) {
            db['sys_excel'].findAll({where: {table_name: table_name, td_type: 3, is_export: 1},order: [['order', 'DESC']]}).then(function (ret) {
                obj.header = ret;
                callback(null, ret)
            })
        },
        function( callback){
            db[table_name].findAll().then(function(ret){
                obj.body=ret;
                callback(null,ret)
            })
        },function(callback){
            db['sys_excel'].findAll({where:{table_name:table_name,association_type:{$ne:0}}}).then(function(ret){
                for(var i=0;i<ret.length;i++){
                    table.push(ret[i]);
                }

                callback(null,ret)
            })
        },function(callback){
            for (var i = 0; i < table.length; i++) {
                (function(index){
                    db[table[index].association_table].findAll().then(function(ret){
                        var item={};
                        for(var j=0;j<ret.length;j++){
                            item[ret[j].id]=ret[j]
                        }
                        obj.ass_data[table[index].field]=item;
                        if(index==table.length-1){
                            callback(null);
                        }
                    })
                })(i)
                }
        }
    ], function (err, result) {
        callback1({err:err,result:obj})
    });

};

/**
 * 上传excel数据
 * @param table_name
 */
exports.upsertExcelData = function (table_name,data,ass_table_obj, callback1) {
    var obj={}
    async.series([
        function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 3, association_type:1}}).then(function (ret) {
                obj = ret;
                callback(null, ret)
            })

        },
        function (callback) {
            async.eachSeries(ass_table_obj, function (itemObj, callback2) {
                if(itemObj.parent==null){
                    var item={
                        id:uuid.v1(),
                        [obj.association_field]:itemObj.name
                    }
                    db[obj.association_table].create(item).then(function(ret){
                        itemObj.id=ret.dataValues.id;
                        callback2(null);
                    })
                }else{
                    var item={
                        id:uuid.v1(),
                        [obj.association_field]:itemObj.name,
                        [obj.association_parent_field]:ass_table_obj[itemObj.parent].id
                    }
                    db[obj.association_table].create(item).then(function(ret){
                        itemObj.id=ret.dataValues.id;
                        callback2(null);
                    })


                }
            }, function (err) {
               callback(err)
            });

        },function (callback) {
            async.eachSeries(ass_table_obj, function (itemObj, callback2) {
                for(var i=0;i<itemObj.arr.length;i++){
                    data[itemObj.arr[i]][obj.map_field]=itemObj.id;
                }
                callback2(null)
            }, function (err) {
                callback(err)
            });
        },function(callback){
            for(var i=0;i<data.length;i++){
                (function(index){
                    if(!data[index].id){
                        data[index].id=uuid.v1();
                    }
                    db[table_name].upsert(data[index]).then(function (ret) {
                        if(index==data.length-1){
                            callback1({err:null,ret:'success'})
                        }

                    })
                })(i)
            }
        }
    ], function (err, result) {
        callback1({err:err,result:obj})
    });

}
/**
 * 导出excel表格列表
 *
 */
exports.exportTableList = function ( data,callback) {
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
        db['sys_excel'].findAndCountAll({
            where: { td_type: data.td_type},
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start)
        }).then(function (res) {
            callback({status: true, data: res});
        }).catch(function (err) {
            if (err) {
                return callback({status: false, data: '查询错误'});
            }
        })

}
/**
 * 查询导出excel表格列表
 *
 */
exports.findExportTableList = function ( data,callback) {
        db['sys_excel'].findAll({
            where: { td_type: data.td_type}
        }).then(function (res) {
            callback({status: true, data: res});
        }).catch(function (err) {
            if (err) {
                return callback({status: false, data: '查询错误'});
            }
        })

}


//查询excel树
exports.getExcelTreeList = function (data,callback1) {
    var obj={};
    var table_name=data.table_name;
    var arr=[];
    async.series([
  function (callback) {
            db['sys_excel'].findOne({where: {table_name: table_name, td_type: 3, association_type:1}}).then(function (ret) {
                obj = ret;
                callback(null)
            }).catch(function (err) {
                if(err){
                    callback(err,{flag:false,data:'查询失败'});
                }
            })
        },function (callback) {
            db[obj.table_name].findAll().then(function (ret) {
                for(var i=0;i<ret.length;i++){
                   var sub=ret[i].dataValues;
                    sub.tree_name=ret[i][obj.field];
                    arr[arr.length]=sub;
                }
                callback(null)
            })
        },
        function( callback){
            db[obj.association_table].findAll().then(function(ret){
                for(var i=0;i<ret.length;i++){
                    var sub=ret[i].dataValues;
                    sub.tree_name=ret[i][obj.association_field];
                     arr[arr.length]=sub;
                }
                callback(null)

            })
        },function(callback){
            arrUtil.transData(arr,'id',obj.map_field,'children',function(data){
                arrUtil.transData(data,'id',obj.association_parent_field,'children',function(ret){
                    callback(null,{flag:true,data:ret});
                });
            });



        }
    ], function (err, result) {
        if(!err){
            callback1({err:err,result:result[3]})
        }else{
            callback1({err:err,result:result})
        }

    });


}