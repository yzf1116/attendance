/**
 * loginService
 */
var cryptoUtils = require('../../utils/cryptoUtils');

/**
 * 登录验证
 * @param model
 * @param obj
 * @param callback
 */

//系统用户
var sysUserModel = db['sys_user'];
//var sysDepartModel = db['sys_depart'];
var roleUserModel = db['sys_role_user'];
/**
 * 建立表关系
 */
// sysUserModel.belongsTo(sysDepartModel,{foreignKey:'departid'});
sysUserModel.hasMany(roleUserModel,{foreignKey:'userid',targetKey:'id'});

exports.IsUserLogin= function (req,callback) {
    var data = req.body;
    var userData = {};
    var userPwd = cryptoUtils.irreversibleEncrypt(data.username,data.password);//加密
    sysUserModel.findOne({
        where: {username: data.username, password: userPwd}
    }).then(function (res) {
        if(res){
            if(res.status){
                var d = res.dataValues;
                var userRoleArr = [];
                var param = {userid:d.id};
                userData = {userid: d.id, username: data.username, departid: ''};
                roleUserModel.findAll({
                    where:param,
                    attributes:['roleid']
                }).then(function (ret) {
                    for(var i=0;i<ret.length;i++){
                        userRoleArr.push(ret[i].roleid);
                    }
                    if (d.departid) {//有部门id
                        userData.departid = d.departid;
                    }
                    userData.roleList = userRoleArr;
                    var date = new Date();
                    sysUserModel.update({last_login_time:date},{where:{id:d.id}}).then(function (res) {
                        if(res){
                            return callback({flag: true, userData: userData});
                        }
                    }).catch(function (err) {
                        if(err){
                            return callback({flag:false,msg:'用户最近登录时间更新失败'});
                        }
                    })
                }).catch(function (err) {
                    if(err){
                        return callback({flag:false,msg:'获取用户角色列表失败'});
                    }
                })

            }else{
                callback({flag:false,data:"该账号已被锁定，请联系管理员"});
            }
        }else{
            callback({flag:false,msg:'用户名或密码输入错误！'})
        }

    }).catch(function (err) {
        if(err){
            callback({flag:false,data:'网络不稳定，请重试'});
        }
    })
};