/**
 * Created by Jessi on 2017/7/7.
 */
const uuid = require('node-uuid');
// const smo = require('../../framework/core/FrameORM/SequelizeModelOption')
class CommonServiceTest {
    constructor(model, params) {
        this.model = model;
        this.params = params;
    }

    async save() {
        try {
            if (this.params instanceof Object && !Array.isArray(this.params)) {
                this.params.id = uuid.v1();
                var ret = await this.model.create(this.params);
                return ret
            }
        } catch (err) {
            console.error(err.name + ':' + err.message);
            return {error: err}
        }


    }

    async update() {
        try {
            if (this.params instanceof Object && !Array.isArray(this.params)) {
                var ret = await this.model.update(this.params, {where: {id: this.params.id}});
                return ret
            }
        } catch (err) {
            console.log(err.name + ':' + err.message);
            return {error: err};
        }
    }

    async findOne(model, id,) {
        try {
            var ret = await model.findOne({where: {id: id}});
            if (!ret) {
                return null
            } else {
                return ret
            }
        } catch (err) {
            return {error: err}
        }
    }

    async manyToOne(childModel, parentModel, where, cb) {

    }


//     exports.findOne = function (model, id, callback) {
//     model.findOne({where: {id: id}}).then(function (ret) {
//         if (ret) {
//             callback({status: true, msg: '查询成功', data: ret});
//         } else {
//             callback({status: false, msg: '查询失败'});
//         }
//     }, function (err) {
//         console.log('[select Error] - ', err.message)
//         callback({status: false, msg: err.message});
//     });
// };
//     exports.update = function (model, objData, callback) {
//     model.update(objData, {where: {id: objData.id}}).then(function (ret) {
//         console.log(JSON.stringify(ret), 123413);
//         if (ret) {
//             callback({status: true, msg: '数据更新成功'});
//         }
//     }, function (err) {
//         console.log('[update Error] - ', err.message);
//         callback({status: false, msg: err.message});
//     });
//
// };
}
module.exports = CommonServiceTest;