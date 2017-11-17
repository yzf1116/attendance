/**
 * 文件操作扩展类
 */
var fs = require("fs");
var path = require("path");

/**
 *递归创建多级目录 (异步)
 * @param folder 如:'./tem1/tem2/tem3'
 * @param callback()
 */
function createManyDir(folder, callback) {
    fs.exists(folder, function (exists) {
        if (exists) {
            callback();
        } else {
            createManyDir(path.dirname(folder), function () {
                fs.mkdir(folder, callback);
            });
        }
    });
}
/**
 * 递归创建多级目录 (同步)
 * @param folder  如:'./tem1/tem2/tem3'
 * @returns {boolean} true 创建成功  false失败
 */
function createManyDirSync(folder) {
    if (fs.existsSync(folder)) {
        return true;
    } else {
        if (createManyDirSync(path.dirname(folder))) {
            fs.mkdirSync(folder);
            return true;
        }
    }
}

module.exports.createManyDir = createManyDir;

module.exports.createManyDirSync = createManyDirSync;

//调用方式
// createManyDirSync("./aa/bb/cc");
// createManyDir("./dd/ee/ff", function (e) {
//    console.log(e)
// });