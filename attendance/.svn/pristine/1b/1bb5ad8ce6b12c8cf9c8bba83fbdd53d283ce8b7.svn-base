/**
 * Created by yangzhenfang on 2017/06/29.
 */
var atdReport = require('../../../service/attendance/AtdReportService')
module.exports = {
    get_punchcardrecord: function (req, res) {
        atdReport.getPunchRecord(req.query,function(ret){
            res.send(ret)
        })

    }
}