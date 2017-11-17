var plRole = require('../../../service/police/RoleService.js');
var rolePolice = require('../../../service/police/RolePoliceService')

module.exports={
    get_index: function (req, res) {
        res.send({msg: '警务角色管理模块测试成功'})
    },
    //保存(警员)角色
    post_saveplrole:function (req,res) {
        if(req.body&&Object.keys(req.body).length!=0){
            plRole.savePlRole(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //删除(警员)角色
    post_deleteplroleinfo:function (req,res) {
        if(req.body&&(req.body.id||req.body.params)){
            plRole.delPlRoleInfo(req.body,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有接收到相关参数'})
        }
    },
    //分页查询(警员)角色
    get_getplrolelist:function (req,res) {
        if(req.query&&Object.keys(req.query).length>0){
            plRole.getPlRoleList(req.query,function (ret) {
                res.send(ret);
            })
        }else{
            res.send({flag:false,msg:'没有分页参数'})
        }
       
    },
    //获取(警员)角色列表
    get_getallplroles:function (req,res) {
        plRole.getAllPlRoles(req.query,function (ret) {
            res.send(ret);
        })
    },
    /*******警员角色管理 警员操作 start*************/

    //根据警员角色获取警员列表
    get_getplistbyrole:function (req,res) {
        if(req.query&&req.query.roleid){
            plRole.getPListByRole(req.query,function (ret) {
                res.send(ret);
            })
        }else{
           res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
        }
       
    },

    //警员获取警员角色列表
    get_getpolicerolelist:function (req,res) {
        if(req.query){
            plRole.getPoliceRoleListRole(req.query,function (ret) {
                res.send(ret);
            })
        }else{
           res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
        }
    },
    //根据警员获取已绑定警员角色
    get_getrolebypolice:function (req,res) {
        if(req.query&&req.query.policeid){
            plRole.getRoleByPolice(req.query,function (ret) {
                res.send(ret);
            })
        }else{
           res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
        }
    },
    //根据角色保存警员角色关联
    post_saverolepolice:function(req,res){
        if(req.body&&req.body.roleid){
            if(req.body.policeList&&req.body.policeList.length>0){
                plRole.saveRolePolice(req.body,function(ret){
                    res.send(ret);
                })
            }else{
               res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
 
            }
          
        }else{
           res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
        }
    },
    //根据角色获取未绑定该角色的警员
    get_getpolicenotbindrole:function(req,res){
        if(req.query&&req.query.roleid){
            plRole.getPoliceNotBindRole(req.query,function(ret){
                res.send(ret);
            })
        }else{
           res.send({success:false,msg:'没有接收到相关参数',result:null,attributes:null}); 
        }
    },
    //新增警员带图片并保存警员角色关联
    post_savepoliceimginfoandpr:function(req,res){
        rolePolice.saveInfoImage(req,function(ret){
            res.send(ret)
        })   
    },
    //新增警员不带图片并保存警员角色关联
    post_savepoliceinfoandpr:function(req,res){
        if(req.body&&Object.keys(req.body).length>0){
            rolePolice.addoreditpolice(req.body, function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'未接收相关参数',result:null,attributes:null});
        }
    },
    //解除警员角色绑定
    post_unbundlingrole:function(req,res){
        if(req.body&&req.body.roleid&&req.body.policeid){
            rolePolice.unbundlingRole(req.body, function (ret) {
                res.send(ret);
            })
        }else{
            res.send({success:false,msg:'未接收相关参数',result:null,attributes:null});
        }
    }
}