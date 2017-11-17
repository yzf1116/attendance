/**
 * Created by DELL on 2017/6/29.
 */
var attendGroup = require('../../../service/attendance/attendanceGroupService.js')
const AjaxJson = require('../../../utils/AjaxJson');


const aj = new AjaxJson();

module.exports = {
    get_index: function (req, res) {
        res.send({msg: '考勤组请求'})
    },
    //保存考勤组
    post_savegroupinfo: function (req, res) {
        if (req.body) {
            attendGroup.saveGroupInfo(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }
    },
    //删除考勤组
    post_deletegroupinfo: function (req, res) {
        if (req.body) {
            attendGroup.deleteGroupInfo(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }
    },
    //查询考勤组
    get_getgrouplist: function (req, res) {
        if (req.query) {
            attendGroup.getGroupList(req.query, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }

    },
    //通过id查询考勤组
    get_getgroupbyid: function (req, res) {
        if (req.query) {
            attendGroup.getGroupById(req.query, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }

    }
}