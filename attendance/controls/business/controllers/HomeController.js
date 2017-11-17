module.exports = {
    get_index: function (req, res) {
        res.send('business测试成功');
    },
    get_test: function (req, res) {
        res.send({msg: 'test成功'})
    }

};