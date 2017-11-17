const atdStatistics = require('../../../service/attendance/AtdStatisticsService.js');
const AjaxJson = require('../../../utils/AjaxJson');

module.exports = {
    get_index: function (req, res) {
        res.send({msg: '考勤统计'})
    },
    get_getatdlist: function (req, res) {//每日统计
        const aj = new AjaxJson();
        if (req.query && Object.keys(req.query).length > 0) {
            if (req.query.policeArr) {
                atdStatistics.getAtdList(req.query, ret=> {
                    res.send(ret);
                })
            } else {
                aj.msg = '没有查询范围参数';
                aj.success = false;
                res.send(aj);
            }
        } else {
            res.send({flag: false, msg: '未接收到相关参数'});
        }
    },
    //打卡记录
    get_getatdlistbydate: function (req, res) {
        const aj = new AjaxJson();
        if (req.query && Object.keys(req.query).length > 0) {
            if (req.query.policeArr) {
                atdStatistics.getListByDate(req.query, function (ret) {
                    res.send(ret);
                })
            } else {
                aj.msg = '参数不完整';
                aj.success = false;
                res.send(aj);
            }
        } else {
            aj.msg = '未接收到相关参数';
            aj.success = false;
            res.send(aj);
        }
    },
    get_getatdsummarybymonth: function (req, res) {//月度汇总
        var aj = new AjaxJson();
        if (req.query && Object.keys(req.query).length > 0) {
            if (req.query.policeArr && req.query.options) {
                atdStatistics.getAtdSummaryByMonth(req.query, function (ret) {
                    res.send(ret);
                })
            }
        } else {
            aj.success = false;
            aj.msg = '未接收到相关参数';
            res.send(aj);
        }
    },
    // get_excelsummary:function (req,res) {
    //     atdStatistics.excelSummary(req,function(ret){
    //         res.send(ret);
    //     })
    // }
}