var path = require('path');
var mysql = require("mysql");
var settings = require(path.join(__dirname, '..', 'config', 'db.json')).dbConfigs;
var pool = mysql.createPool({
    host: settings.host,
    user: settings.username,
    password: settings.password,
    database: settings.database,
    port: 3306
});

pool.query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};
pool.queryArgs = function (sql, args, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, args, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};
module.exports = pool;