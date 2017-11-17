/**
 * Created by DELL on 2017/6/22.
 */
const plOrg = require('../../../service/police/policeOrgService.js');
const AjaxJson = require('../../../utils/AjaxJson');


const aj = new AjaxJson();
module.exports = {
    get_index: function (req, res) {
        res.send({
            msg: '警务组织机构请求'
        })
    },
    //保存组织机构
    post_saveplorginfo: function (req, res) {
        if (req.body) {
            plOrg.savePlOrgInfo(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }
    },
    //删除组织机构信息
    post_deleteplorginfo: function (req, res) {
        if (req.body) {
            plOrg.delPlOrgInfo(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }
    },
    //查询组织机构
    get_getplorglist: function (req, res) {
        if (req.body) {
            plOrg.getPlOrgList(req.query, function (ret) {
                res.send(ret);
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }
    },
    //通过id查询组织机构
    get_getplorgbytype: function (req, res) {
        if (req.query) {
            plOrg.getPlOrgName(req.query, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }

    },
    //查询关联警员组织机构
    get_getorgforpersonlist: function (req, res) {
        if (req.query) {
            plOrg.getorgForPersonList(req.query, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }

    },

    //获取所有组织机构信息
    get_getallplorglist: function (req, res) {
        if (req.query) {
            plOrg.getAllPlOrgList(req.query, function (ret) {
                res.send(ret)
            })
        } else {
            aj.success = false;
            aj.msg = '没有接收到相关参数';
            res.send(aj)
        }

    },
    //获取未绑定该组织机构的警员
    get_getpolicenotbindorg: function (req, res) {
        if (req.query) {
            plOrg.getPoliceNotBindOrg(req.query, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({
                success: false,
                msg: '没有接收到相关参数',
                result: null,
                attributes: null
            });
        }
    },

    //根据组织机构保存警员关联
    post_saveorgpolice: function (req, res) {
        if (req.body && req.body.pl_orgid) {
            if (req.body.policeList && req.body.policeList.length > 0) {
                plOrg.saveOrgPolice(req.body, function (ret) {
                    res.send(ret);
                })
            } else {
                res.send({
                    success: false,
                    msg: '没有接收到相关参数',
                    result: null,
                    attributes: null
                });

            }

        } else {
            res.send({
                success: false,
                msg: '没有接收到相关参数',
                result: null,
                attributes: null
            });
        }
    },
    //解除警员组织机构绑定
    post_unbundrg: function (req, res) {
        if (req.body && req.body.policeid) {
            plOrg.unbundOrg(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({
                success: false,
                msg: '未接收相关参数',
                result: null,
                attributes: null
            });
        }
    },
    //获取足迹机构及其警员信息(结构树)
    get_getallplorgandpolicelist: function (req, res) {
        if (req.query) {
            plOrg.getAllPlOrgAndPoliceList(req.query, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({
                success: false,
                msg: '没有接收到相关参数',
                result: null,
                attributes: null
            });
        }
    },
    //获取最高级组织机构
    get_gethighestorg: function (req, res) {
        plOrg.getHighestOrg(function (ret) {
            res.send(ret);
        })
    },
    //设置警员为主管
    post_setcharge: function (req, res) {
        if (req.body && req.body.policeList) {
            plOrg.setCharge(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({
                success: false,
                msg: '未接收相关参数',
                result: null,
                attributes: null
            });
        }
    },
        //取消警员为主管
    post_uncharge: function (req, res) {
        if (req.body && req.body.policeList) {
            plOrg.unCharge(req.body, function (ret) {
                res.send(ret);
            })
        } else {
            res.send({
                success: false,
                msg: '未接收相关参数',
                result: null,
                attributes: null
            });
        }
    },


}