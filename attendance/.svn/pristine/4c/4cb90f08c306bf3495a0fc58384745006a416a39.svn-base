const jwt = require('jwt-simple');
const moment = require('moment');
const webTokenTimeOut = require('../config/baseConfig').webTokenTimeOut;
const appTokenTimeOut = require('../config/baseConfig').appTokenTimeOut;
const userService = require('../service/system/loginService');
const personService = require('../service/api/PersonService');
const AjaxJson = require('../utils/AjaxJson');
const customUtils = require('../utils/customUtils');
// app.use(expressJwt({secret: "secret"}).unless({path: ["/login", "/system/dictionary/initdictionary", "api/login"]}));//要排除验证的接口
//web端登录接口
exports.getLoginRight = function (app) {
    app.post('/login', function (req, res) {
        if (req.body && Object.keys(req.body).length != 0) {
            userService.IsUserLogin(req, function (ret) {
                if (ret.flag === true && ret.userData) {
                    var expires = moment().add(webTokenTimeOut.number, webTokenTimeOut.dateType).valueOf();
                    // var expires = moment().add(1, 'm').valueOf();
                    var token = jwt.encode({
                        iss: ret.userData.userid,
                        exp: expires
                    }, app.get('jwtTokenSecret'));
                    res.status(200).json({
                        flag: true,
                        token: token,
                        userData: ret.userData
                    });
                }

            })

        } else {
            res.send({flag: false, msg: '未接收登录用户信息'})
        }


    });
    //移动端接口
    app.post('/api/login', function (req, res) {
        var params = req.body;
        var checkAry = Object.keys(params);
        if (checkAry.length == 0) {
            return res.send('手机号或密码为空');
        }
        var checkParams = customUtils.checkObjParams(params);//参数首尾去空格
        var phone = checkParams.phone,
            psd = checkParams.password;
        personService.personLogin(phone, psd, function (ret) {
            if (ret.success === false) {
                res.json(ret);
            } else {
                //获取token授权
                var userInfo = ret.result;
                var expires = moment().add(appTokenTimeOut.number, appTokenTimeOut.dateType).valueOf();
                var token = jwt.encode({
                    iss: userInfo.policeid,
                    exp: expires
                }, app.get('jwtTokenSecret'));
                ret.attributes.token = token;
                res.json(ret);
            }
        })
    });
    //get移动端测试接口
    // app.get('/api/login', function (req, res) {
    //     var params = req.query;
    //     var checkAry = Object.keys(params);
    //     if (checkAry.length == 0) {
    //         return res.send('手机号或密码为空');
    //     }
    //     var checkParams = customUtils.checkObjParams(params);//参数首尾去空格
    //     var phone = checkParams.phone,
    //         psd = checkParams.password;
    //     personService.personLogin(phone, psd, function (ret) {
    //         if (ret.success === false) {
    //             res.json(ret);
    //         } else {
    //             //获取token授权
    //             var userInfo = ret.result;
    //             var expires = moment().add(appTokenTimeOut.number, appTokenTimeOut.dateType).valueOf();
    //             var token = jwt.encode({
    //                 iss: userInfo.policeid,
    //                 exp: expires
    //             }, app.get('jwtTokenSecret'));
    //             ret.attributes.token = token;
    //             res.json(ret);
    //         }
    //     })
    // });
};
