/**
 * Created by yangzhenfang on 2017/06/29.
 */
var uuid = require('node-uuid')
var punchRecordModel = db['atd_punch_record']
var plOrgModel = db['pl_org']
 punchRecordModel.hasOne(plOrgModel,{foreignKey:'id'})

//查询考勤记录
exports.getPunchRecord = function (data, callback) {
    console.log(data)
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize)
    var where = {}
    if (data.policeid != undefined) {
        where = {
            policeid: {
                $like: '%' + data.policeid + '%'
            }
        }
    }
    punchRecordModel.findAndCountAll({
        where: where,
        limit: parseInt(data.pageSize),
        offset: parseInt(data.start),
        include: [
            {model: plOrgModel, attributes: ['org_name']}
        ]
    }).then(function (res) {

        callback({flag: true, data: res})
    }).catch(function (err) {
        if (err) {
            console.log(err)
            callback({flag: false, data: '查询错误'})
        }
    })
}

