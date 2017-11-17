/**
 * 系统管理控制器
 */
module.exports = {
    get_index: function (req, res) {
        res.send({
            name: 'system控制区'
        });
    },

};