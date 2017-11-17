/**
 * 生成model
 */
var path = require("path");
var env = process.env.NODE_ENV || "dbConfigs";
var config = require(path.join(__dirname, '../', 'config', 'db.json'))[env];

var SequelizeAuto = require('sequelize-auto');
var auto = new SequelizeAuto(config.database, config.username, config.password, config);

//通过服务端调用模式
// module.exports = function (cb) {
//     auto.run(function (err) {
//         if (err) throw err;
//         if (typeof cb == 'function') {
//             cb(auto.tables, auto.foreignKeys);
//         }
//     });
// }

//单例运行模式
auto.run(function (err) {
    if (err) throw err;
    if (typeof cb == 'function') {
        cb(auto.tables, auto.foreignKeys);
    }
});