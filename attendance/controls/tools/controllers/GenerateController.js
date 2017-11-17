var captcha = require('../../../utils/captcha');

module.exports = {
    // 生成验证码
    get_captcha: function (req, res) {
        var img = captcha.makeCapcha(110, 40);
        req.session.captcha = img.str;
        res.send(img.getFileData());
    }
};