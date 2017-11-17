module.exports = {
    get_index: function (req, res) {
        res.render('postTest测试成功');
    },
    post_submit: function (req, res) {
        res.send({msg: 'submit测试成功'})
    },


};