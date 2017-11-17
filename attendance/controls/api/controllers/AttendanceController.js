/**
 * Created by Jessi on 2017/7/6.
 */
var AttendanceService = require('../../../service/api/AttendanceService');
var customUtils = require('../../../utils/customUtils');
var AjaxJson = require('../../../utils/AjaxJson');
module.exports = {

    //查询用户地址信息
    post_queryaddress: function (req, res) {

    },
    //获取考勤规则信息
    // post_queryscheaddress: function (req, res) {
    get_queryscheaddress: function (req, res) {
        // var params = customUtils.checkObjParams(req.body);
        var params = customUtils.checkObjParams(req.query);
        if (params === false) {
            return res.send('参数不能为空!');
        }
        var json = new AjaxJson();
        new AttendanceService(params).queryScheAddress().then((result)=> {
            if (result.error) {
                console.error(result.error);
                json.success = false;
                json.msg = '数据查询失败';
                json.result = result.error;
                res.json(json);
            } else {
                json.result = result;
                res.json(json);
            }

        })
    },
    //上班打卡接口
    post_topunchcard: function (req, res) {

    },
    //测试上班打卡接口
    get_topunchcard: function (req, res) {

        var params = customUtils.checkObjParams(req.query);
        if (params === false) {
            return res.send('请求参数为空!');
        }
        var json = new AjaxJson();
        var attendanceService = new AttendanceService(params);
        attendanceService.punchCard(1).then(function (ret) {
            if (ret.error) {
                json.success = false;
                json.msg = '打卡失败';
                json.result = ret.error.name;
                res.send(json);
            } else {
                json.result = ret;
                res.send(json);
            }

        });

    },
    //下班打卡接口
    // post_ofpunchcard: function (req, res) {
    get_ofpunchcard: function (req, res) {
        // var params = customUtils.checkObjParams(req.body);
        var params = customUtils.checkObjParams(req.query);
        if (!params) {
            res.send('参数不能为空');
        } else {
            const attendanceService = new AttendanceService(params);
            attendanceService.punchCard(2);
        }

    },

};
