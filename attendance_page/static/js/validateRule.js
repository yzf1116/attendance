/**
 * 表单的验证规则
 * eg：realname: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
    }, ]
 * realname：                表单传递字段 如 prop="gender"
 * required：true            是否验证，本文档都为验证字段，故此字段不变
 * message: '请输入姓名'      验证错误时提示信息
 * trigger：'blur'           验证触发规则
 *
 *  验证规则一般有：'blur'      模糊验证  一般用于input类型
 *                 'change'    状态更改验证 一般用于select 、checkbox、radio 和时间选择等类型
 **/

import * as validateFun from './validateFun';
export const rules = {

    /***部门信息 start***/

    departname: [
        {required: true, message: '请输入机构名称', trigger: 'blur'}
    ],
    org_code: [
        {required: true, message: '请输入组织机构编码', trigger: 'blur'}
    ],
    /***系部门信息 end***/


    /*** 字典 start***/
    typegroupcode: [
        {required: true, message: '请输入字典编码', trigger: 'blur'}
    ],
    typegroupname: [
        {required: true, message: '请输入字典名称', trigger: 'blur'}
    ],
    typecode: [
        {required: true, message: '请输入类型code', trigger: 'blur'}
    ],
    typename: [
        {required: true, message: '请输入类型名称', trigger: 'blur'}
    ],
    /*** 字典 end***/

    /***角色管理***/
    rolename: [
        {required: true,message: '请输入角色名称', trigger: 'blur'}
    ],
    rolecode: [
        {required: true,message: '请输入角色编码', trigger: 'blur'}
    ],

    /***菜单信息 start***/
    menu_name:[
        {required: true, message: '请输入菜单名称', trigger: 'blur'}
    ],
    menu_level:[
        {required: true, message: '请选择菜单级别', trigger: 'change'}
    ],
    menu_type:[
        {required: true, message: '请选择功能类型', trigger: 'change'}
    ],
    menu_order:[
        // {required: true, type:'number',message: '请输入排序序号', trigger: 'blur'},
        {validator: validateFun.Number, trigger: 'blur'}
    ],
    menu_url:[
        {required: true, message: '请输菜单路径', trigger: 'blur'}
    ],
    /***菜单信息 end***/
    /***警员角色管理 start***/
    rolename: [
        {required: true,message: '请输入角色名称', trigger: 'blur'}
    ],
    rolecode: [
        {required: true,message: '请输入角色编码', trigger: 'blur'}
    ],

    /***警员角色管理 end***/
};
