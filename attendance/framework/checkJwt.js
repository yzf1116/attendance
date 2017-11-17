// var expressJwt = require("express-jwt");
const jwt = require('jwt-simple');
const AjaxJson = require('../utils/AjaxJson');
exports.checkJwt = function (app) {
    app.use(function (req, res, next) {
        var aj = new AjaxJson();
        if (req.url == "/system/dictionary/initdictionary") {//需要排除的接口
            return next();
        }
        //验证token
        var token = (req.body && req.body['access_token']) || (req.query && req.query['access_token']) || req.headers['access_token'];
        if (token) {
            try {
                var decoded = jwt.decode(token, app.get('jwtTokenSecret'));
                // console.log('decoded值=', decoded);
                // if (decoded.exp <= Date.now()) {//token过期逻辑
                //     aj.success = false;
                //     aj.msg = 'access_token超时'
                //     res.status(401).json(aj);
                //
                // }
                return next();

            } catch (err) {
                aj.success = false;
                aj.msg = 'token验证失败';
                res.status(401).json(aj);
            }
        } else {
            aj.success = false;
            aj.msg = '未授权,请登录获取签名授权';
            //401码 未授权：登录失败,此错误表明传输给服务器的证书与登录服务器所需的证书不匹配。
            res.status(401).json(aj);
        }

    });

    // app.use(expressJwt({secret: "secret"}).unless({path: ["/login"]}));
    // app.use(function (err, req, res, next) {
    //     if (err.name === "UnauthorizedError") {
    //         res.status(401).send("invalid token");
    //     }
    // });
}