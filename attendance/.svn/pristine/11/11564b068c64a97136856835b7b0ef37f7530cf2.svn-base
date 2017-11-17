/**
 * Created by yangzhenfang on 2017/07/12.
 */
const async               = require('async');
const uuid                = require('node-uuid');
const AjaxJson            = require('../../utils/AjaxJson');
// const modelReviewTravel   = db['rev_travel_rec'];
const modelTemplate       = db['rev_template'];
// const modelReviewOverTime = db['rev_overtime_rec'];
// const modelReviewLeave    = db['rev_leave_rec'];
// const modelReviewFillCard = db['rev_fill_card_rec'];
const modelReviewCustom   = db['rev_custom'];
const modelReviewApprove  = db['rev_approver_temp'];
const modelPerson         = db['pl_person'];
const modelSendTemp       = db['rev_send_temp'];
const modelApply          = db['rev_apply'];


//获取审批记录
/**
 * 审批记录：是根据审批类型建立了不同的表，要获取所有的审批记录就是多张表的集合。
 * @param data
 * @param callback
 * @returns {Promise.<void>}
 */
//获取rev_apply_rec表中的数据
exports.getApply = async (data, callback) => {
    let aj = new AjaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    let where = {};
    if (data.review_name !== undefined) {
        where = {
            review_name: {
                $like: '%' + data.review_name + '%'
            }
        }
    }
    try {
        let applyRec = await modelApply.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start)
        });
        if (!applyRec) {
            aj.success = false;
            aj.msg = '查询错误';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询成功';
        aj.result = applyRec;
        callback(aj)
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj)
    }
};
//这里是查询自定义的表单数据
exports.approveRecord = async (data, callback) => {
    let aj = new AjaxJson();
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    let where = {};
    if (data.remark !== undefined) {
        where = {
            remark: {
                $like: '%' + data.remark + '%'
            }
        }
    }
    try {
        let reviewRecord = await modelReviewCustom.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start)
        });
        if (!reviewRecord) {
            aj.success = false;
            aj.msg = '查询错误';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询成功';
        aj.result = reviewRecord;
        callback(aj)

    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库查询失败`
    }
};
//获取出差审批列表
// exports.getTravelList = async (data, callback) => {
//     let aj = new AjaxJson();
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     let where = {};
//     if (data.remark !== undefined) {
//         where = {
//             remark: {
//                 $like: '%' + data.remark + '%'
//             }
//         }
//     }
//     try {
//         let travelData = await modelReviewTravel.findAndCountAll({
//             where: where,
//             limit: parseInt(data.pageSize),
//             offset: parseInt(data.start)
//         });
//         if (!travelData) {
//             aj.success = false;
//             aj.msg = '查询错误';
//             callback(aj);
//             return
//         }
//         aj.success = true;
//         aj.msg = '查询成功';
//         aj.result = travelData;
//
//         callback(aj)
//
//     } catch (err) {
//         aj.success = false;
//         aj.msg = `${err.name}:数据库查询失败`
//     }
// };
//获取加班审批列表
// exports.getOverTimeList = async (data,callback)=>{
//     let aj = new AjaxJson();
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     let where = {};
//     if (data.remark !== undefined) {
//         where = {
//             remark: {
//                 $like: '%' + data.remark + '%'
//             }
//         }
//     }
//     try {
//         let overtimeData = await modelReviewOverTime.findAndCountAll({
//             where: where,
//             limit: parseInt(data.pageSize),
//             offset: parseInt(data.start)
//         });
//         if (!overtimeData) {
//             aj.success = false;
//             aj.msg = '查询错误';
//             callback(aj);
//             return
//         }
//         aj.success = true;
//         aj.msg = '查询成功';
//         aj.result = overtimeData;
//
//         callback(aj)
//
//     } catch (err) {
//         aj.success = false;
//         aj.msg = `${err.name}:数据库查询失败`
//     }
// };
//获取请假审批列表
// exports.getLeaveList = async (data,callback)=>{
//
//     let aj = new AjaxJson();
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     let where = {};
//     if (data.remark !== undefined) {
//         where = {
//             remark: {
//                 $like: '%' + data.remark + '%'
//             }
//         }
//     }
//
//     try {
//         let leaveData = await modelReviewLeave.findAndCountAll({
//             where: where,
//             limit: parseInt(data.pageSize),
//             offset: parseInt(data.start)
//         });
//
//         if (!leaveData) {
//             aj.success = false;
//             aj.msg = '查询错误';
//             callback(aj);
//             return
//         }
//
//         aj.success = true;
//         aj.msg = '查询成功';
//         aj.result = leaveData;
//         callback(aj)
//
//     } catch (err) {
//         aj.success = false;
//         aj.msg = `${err.name}:数据库查询失败`
//     }
// };
//获取补卡审批列表
// exports.getFillCardList = async(data,callback)=>{
//     let aj = new AjaxJson();
//     data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
//     let where = {};
//     if (data.remark !== undefined) {
//         where = {
//             remark: {
//                 $like: '%' + data.remark + '%'
//             }
//         }
//     }
//     try {
//         let fillCardData = await modelReviewFillCard.findAndCountAll({
//             where: where,
//             limit: parseInt(data.pageSize),
//             offset: parseInt(data.start)
//         });
//         if (!fillCardData) {
//             aj.success = false;
//             aj.msg = '查询错误';
//             callback(aj);
//             return
//         }
//         aj.success = true;
//         aj.msg = '查询成功';
//         aj.result = fillCardData;
//
//         callback(aj)
//
//     } catch (err) {
//         aj.success = false;
//         aj.msg = `${err.name}:数据库查询失败`
//     }
// };
//删除审批记录信息
/**
 * 首先需要判断什么类型的审批信息，确定了类型才知道是哪个数据库表，然后从该数据库表中删除；
 *     要先知道怎么从多个表中查询出来；
 * @param data
 * @param callback
 * @returns {Promise.<void>}
 */
exports.delApproveRecord = async (data, callback) => {
    let where = {};
    let arr = [];
    if (data.params) {
        let _list = data.params;
        for (let i  of _list) {
            arr.push(i.id);
        }
        where = {id: {$in: arr}};
    } else {
        where = {id: data.id};
    }
    let aj = new AjaxJson();
    try {
        let delRecordInfo = await modelApply.destroy({where: where});
        if (!delRecordInfo) {
            aj.success = false;
            aj.msg = '查询参数不对';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '删除成功';
        aj.result = delRecordInfo;
        callback(aj)

    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库数据删除失败`;
        callback(aj)
    }
};
//设置审批列表审批人，抄送人
exports.setApprovePolice = async (data, callback) => {
     let aj = new AjaxJson();
    try {
         let setApproveInfo = await modelTemplate.update(data,{where:{id:data.id}});
        if(!setApproveInfo){
             aj.success = false;
             aj.msg = '更新信息失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '设置成功';
        aj.result = setApproveInfo;
        callback(aj)
    } catch(err){
       aj.success = false;
        aj.msg = `${err.name}:数据库更新失败`
    }
};
//获取审批人
exports.getApprove = async (data,callback)=>{
    let aj = new AjaxJson();
    try {
        let approveInfo = await modelReviewApprove.findAll();
        if(!approveInfo){
            aj.success = false;
            aj.msg = '查询审批人失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询审批人成功';
        aj.result = approveInfo;
        callback(aj)
    }catch (err){
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj)
    }
};
//保存审批人
exports.saveApproves = async (data,callback)=>{
   let aj = new AjaxJson();
   try {
       let count = await modelReviewApprove.count({where:{templateid:data[0].templateid}});
       console.log('存在',count);
       if(count !==0){
           console.log('修改');
           let del = await modelReviewApprove.destroy({where:{templateid:data[0].templateid}});
           console.log('删除',del);
           if(del){
               for (let i = 0;i<data.length;i++){
                   data[i].id = uuid.v1();
                   let updateapproveInfo = await modelReviewApprove.upsert(data[i]);
                   console.log(updateapproveInfo);
                   if(!updateapproveInfo){
                       aj.success = false;
                       aj.msg = '更新失败';
                       callback(aj);
                       return
                   }
                   aj.success = true;
                   aj.msg = '更新成功';
                   aj.result = updateapproveInfo;

               }
               callback(aj)
           }

       } else {
           console.log(data);
           for (let i = 0;i<data.length;i++){
               data[i].id = uuid.v1();
               let saveapproveInfo = await modelReviewApprove.upsert(data[i]);
               console.log(saveapproveInfo);
               if(!saveapproveInfo){
                   aj.success = false;
                   aj.msg = '保存失败';
                   callback(aj);
                   return
               }
               aj.success = true;
               aj.msg = '保存成功';
               aj.result = saveapproveInfo;

           }
           callback(aj)
       }
   }catch (err){
       aj.success = false;
       aj.msg = `${err.name}:数据库操作失败`;
       callback(aj)
   }
};
//获取抄送人
exports.getSendPerson = async(data,callback)=>{
    let aj = new AjaxJson();
    try {
        let sendInfo = await modelSendTemp.findAll();
        if(!sendInfo){
            aj.success = false;
            aj.msg = '查询抄送人失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询抄送人成功';
        aj.result = sendInfo;
        callback(aj)
    }catch (err){
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj)
    }
};
//保存抄送人
exports.saveSendPerson = async (data, callback)=>{
    let aj = new AjaxJson();
    try {
        let count = await modelSendTemp.count({where:{templateid:data[0].templateid}});
        if(count !==0){
            console.log('修改');
            let del = await modelSendTemp.destroy({where:{templateid:data[0].templateid}});
            console.log(del);
            if(del){
                for (let i = 0;i<data.length;i++){
                    data[i].id = uuid.v1();
                    let updateSendInfo = await modelSendTemp.upsert(data[i]);
                    if(!updateSendInfo){
                        aj.success = false;
                        aj.msg = '更新失败';
                        callback(aj);
                        return
                    }
                    aj.success = true;
                    aj.msg = '更新成功';
                    aj.result = updateSendInfo;

                }
                callback(aj)
            }

        } else {
            for (let i = 0;i<data.length;i++){
                data[i].id = uuid.v1();
                let savesendInfo = await modelSendTemp.upsert(data[i]);
                if(!savesendInfo){
                    aj.success = false;
                    aj.msg = '保存失败';
                    callback(aj);
                    return
                }
                aj.success = true;
                aj.msg = '保存成功';
                aj.result = savesendInfo;

            }
            callback(aj)
        }
    }catch (err){

    }
};
//获取所有警员
exports.getAllPolice = async (data,callback) =>{
     let aj = new AjaxJson();
     try {
         let allPolice =await modelPerson.findAll();
         if(!allPolice){
             aj.success = false;
             aj.msg = '获取警员失败';
             callback(aj);
             return
         }
         aj.success = true;
         aj.msg = '获取警员成功';
         aj.result = allPolice;

         callback(aj)

     } catch (err){
         aj.success = false;
         aj.msg = `${err.name}:数据库操作失败`;
         callback(aj);
     }
};
//获取所有审批
exports.getAllApprove = async (data, callback) => {
    let aj = new AjaxJson();
    console.log(1);
    data.start = (parseInt(data.page) - 1) * parseInt(data.pageSize);
    let where = {};
    if(data.personid !== undefined){
        where = {
            personid:{
                $like: '%' + data.personid + '%'
            }
        }
    }
    try {
        let approveRecord = await modelApply.findAndCountAll({
            where: where,
            limit: parseInt(data.pageSize),
            offset: parseInt(data.start)
        });
        console.log(approveRecord);
        if (!approveRecord) {
            aj.success = false;
            aj.msg = '查询审批列表失败';
            callback(aj);
            return
        }
        aj.success = true;
        aj.msg = '查询审批列表成功';
        aj.result = approveRecord;
        callback(aj)
    } catch (err) {
        aj.success = false;
        aj.msg = `${err.name}:数据库操作失败`;
        callback(aj)
    }
};

