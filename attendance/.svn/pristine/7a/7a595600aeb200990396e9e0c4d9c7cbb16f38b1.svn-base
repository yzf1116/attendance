var multer = require('multer');
var fileUtils = require('./fileUtils');
var upload;
/**
 * 对multer模块的封装和扩展，封装了multer模块下的diskStorage引擎。可自定义上传路径,根据上传文件和时间戳+后缀命名。
 *
 * @param folder   默认上传路径为uploads，传入上传路径,默认以app.js的平级路径，如传入'tmp',或者多级目录'tmp1/tmp2'不需要写相对路径，以项目根路径开始
 * @returns {upload}   构造好的multer对象，直接使用。详细参考API。
 */
module.exports = function (folder) {
    if (!folder) {
        folder = 'public/upload/image'; //如果folder不存在，则设置默认路径
    }
    fileUtils.createManyDirSync(folder);//如果存在多级目录，递归创建多级目录
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.mimetype == 'application/octet-stream') {
                folder = 'public/upload/file';
            }
            cb(null, folder)
        },
        filename: function (req, file, cb) {
            var filename = '';
            if (file.mimetype == 'image/jpeg') {
                filename = file.fieldname + '-' + Date.now() + '.jpg';
            }
            else if (file.mimetype == 'image/png') {
                filename = file.fieldname + '-' + Date.now() + '.png';
            }
            else if (file.mimetype == 'text/plain') {
                filename = file.fieldname + '-' + Date.now() + '.txt';
            } else if (file.mimetype == 'application/octet-stream') {
                filename = file.fieldname + '-' + Date.now() + '.arm';
            }
            else {
                filename = file.fieldname + '-' + Date.now()
            }
            cb(null, filename);

        }
    });
    upload = multer({storage: storage});
    return upload;
};



