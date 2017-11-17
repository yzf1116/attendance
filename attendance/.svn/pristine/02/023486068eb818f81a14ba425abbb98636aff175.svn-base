var userService = require('../../../service/system/LoginService.js');
var dateUtils = require('../../../utils/dateUtils')
var connect = require('../../../utils/pool')

module.exports = {
    get_index: function (req, res) {
        res.send('index')
    },
    get_about: function (req, res) {
        res.send("/index/about测试成功")
    },
    get_isuserlogin: function (req, res) {
        if (req.query && Object.keys(req.query).length != 0) {
            userService.IsUserLogin(req, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({flag: false, msg: '未接收登录用户信息'})
        }
    }
};