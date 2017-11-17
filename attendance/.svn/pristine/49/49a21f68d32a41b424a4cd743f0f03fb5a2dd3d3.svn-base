/**
 * Created by jessi on 2017/7/3.
 * 加密工具类
 */

var crypto = require('crypto');
const cryptoUtils = {
    //加密,可逆
    cipher: function (str) {
        var encrypted = "";
        var algorithm = "aes-256-cbc";
        var key = "sadgasd*das";//加密的秘钥
        var cip = crypto.createCipher(algorithm, key);
        encrypted += cip.update(str, 'binary', 'hex');
        encrypted += cip.final('hex');
        return encrypted
    },
    //解密,可逆
    decipherPsd: function (encrypted) {
        var decrypted = "";
        var algorithm = "aes-256-cbc";
        var key = "sadgasd*das";//解密的秘钥
        var decipher = crypto.createDecipher(algorithm, key);
        decrypted += decipher.update(encrypted, 'hex', 'binary');
        decrypted += decipher.final('binary');
        return decrypted;
    },
    /**
     * 用户名+密码加盐算法，哈希加密，采用sha1不可逆加密方式
     * @param username
     * @param password
     * @returns {*}
     */
    irreversibleEncrypt: function (username, password) {
        var key = 'KMLC';
        var encryptCode = crypto.createHash('sha1').update(password + '{' + username + '}' + key).digest('hex');
        return encryptCode;
    }
};
module.exports = cryptoUtils;

    



