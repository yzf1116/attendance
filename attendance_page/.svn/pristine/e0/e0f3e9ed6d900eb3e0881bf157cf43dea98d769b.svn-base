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

import * as validateFun from "./validateFun";
export const rules = {
  /***警务人员 start****/
  police_name: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }],
  code: [{required: true, validator: validateFun.checkCode, trigger: 'blur'}],
  gender: [{
    required: true,
    message: '请选择性别',
    trigger: 'change'
  }],
  birth:[{required: true, validator: validateFun.checkBirth, trigger: 'blur'}],
  cardid: [{required: true, validator: validateFun.IdentityCodeValid, trigger: 'blur'}],
  password: [{required: true, validator: validateFun.checkPassword, trigger: 'blur'}],
  depart_id: [{
    required: true,
    message: '请选择所属班组',
    trigger: 'change'
  }],
  pl_orgid: [{
    required: true,
    message: '请选择归属机构',
    trigger: 'change'
  }],
  age: [
    {required: true, validator: validateFun.checkAge, trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
    {validator: validateFun.isMobilePhone, trigger: 'blur'}
  ], /***施工人员 end****/

  /**施工班组 start***/
  depart_name: [
    {required: true, message: '请输入班组名称', trigger: 'blur'}
  ],
  depart_code: [
    {required: true, message: '请输入班组编号', trigger: 'blur'},
    {validator: validateFun.checkNumber, trigger: 'blur'}
  ],
  /***施工班组 end***/

  /****设备管理 start***/
  device_name: [
    {required: true, message: '请输入设备名称', trigger: 'blur'}
  ],
  device_code: [
    {required: true, message: '请输入设备编号', trigger: 'blur'}
  ],
  x_point: [
    {required: true, validator: validateFun.checkFloat, trigger: 'blur'}
  ],
  y_point: [
    {required: true, validator: validateFun.checkFloat, trigger: 'blur'}
  ],
  tunnelid: [
    {required: true, message: '请选择所属隧道', trigger: 'change'}
  ],
  dev_type: [
    {required: true, message: '请选择设备类型', trigger: 'change'}
  ],
  /***设备管理 end**/

  /***报警配置 start***/
  alarm_title: [
    {required: true, message: '名称不能为空', trigger: 'blur'}
  ],
  start_time: [
    {type: 'date', required: true, message: '开始时间不能为空', trigger: 'change'}
  ],
  end_time: [
    {type: 'date', required: true, message: '结束时间不能为空', trigger: 'change'}
  ],
  alarm_gap: [
    {required: true, validator: validateFun.checkNumber, trigger: 'blur'}
  ],
  content: [
    {required: true, message: '名称不能为空', trigger: 'blur'}
  ],
  alarm_level: [
    {validator: validateFun.checkNumber, trigger: 'blur'}
  ],
  /***报警配置 end***/


  /***部门信息 start***/

  departname: [
    {required: true, message: '请输入机构名称', trigger: 'blur'}
  ],
  org_code: [
    {required: true, validator: validateFun.checkOrgCode, trigger: 'blur'}
  ],
  org_type: [
    {required: true, message: '请选择组织机构类型', trigger: 'change'}
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

  /***考勤统计查询条件 start***/
  teams: [
    {required: true, validator: validateFun.checkRequired, message: '请选择施工班组', trigger: 'blur'}
  ],
  worker: [
    {required: true, validator: validateFun.checkRequired, message: '请选择施工人员', trigger: 'blur'}
  ], /***考勤统计查询条件 end***/

  /***角色管理***/
  rolename: [
    {required: true, message: '请输入角色名称', trigger: 'blur'}
  ],
  rolecode: [
    {required: true, message: '请输入角色编码', trigger: 'blur'}
  ],

  /***菜单信息 start***/
  menu_name: [
    {required: true, message: '请输入菜单名称', trigger: 'blur'}
  ],
  menu_level: [
    {required: true, message: '请选择菜单级别', trigger: 'change'}
  ],
  menu_type: [
    {required: true, message: '请选择功能类型', trigger: 'change'}
  ],
  menu_order: [
    // {required: true, type:'number',message: '请输入排序序号', trigger: 'blur'},
    {validator: validateFun.Number, trigger: 'blur'}
  ],
  menu_url: [
    {required: true, message: '请输菜单路径', trigger: 'blur'}
  ],
  /***菜单信息 end***/

  /***班次信息****/
  atdSchedule_name: [
    {required: true, message: '请输入班次名称', trigger: 'blur'}
  ],

  atdSchedule_work_time: [
    {type: 'string', required: true, message: '上班时间不能为空', trigger: 'change'}
  ],
  atdSchedule_off_work_time: [
    {type: 'string', required: true, message: '下班时间不能为空', trigger: 'change'}
  ],
  data2: [
    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
  ],
  data1: [
    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
  ],
  atd_name:[
    {required: true, message: '请输入考勤组名称', trigger: 'blur'}
  ],
  org_name:[
    {required: true, message: '请输入组织机构名称', trigger: 'blur'}
  ]


};
