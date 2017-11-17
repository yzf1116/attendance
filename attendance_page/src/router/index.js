import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },

  {
    path: '/Login',
    name: '登录',
    component: resolve => require(['components/Login.vue'], resolve),
  },
  {
    path: '/Layout',
    component: resolve => require(['components/Layout.vue'], resolve),
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true
    },
    children: [
      {
        path: '/',
        component: resolve => require(['view/home/home.vue'], resolve),
        name: '主页'
      },
      {
        path: '/sysMenu',
        component: resolve => require(['view/sysMenu/sysMenuManage.vue'], resolve),
        name: '菜单管理',
      },
      {
        path: '/sysRoles', //角色管理
        component: resolve => require(['view/sysRoles/sysRolesManage.vue'], resolve),
        name: '角色管理'
      },
      {
        path: '/sysUser', //用户管理
        component: resolve => require(['view/sysUser/sysUserManage.vue'], resolve),
        name: '用户管理'
      },
      {
        path: '/sysDepart', //系统部门
        component: resolve => require(['view/sysDepart/sysDepartManage.vue'], resolve),
        name: '系统部门'
      },
      {
        path: '/dictionary', //字典管理
        component: resolve => require(['view/dictionary/dictionary.vue'], resolve),
        name: '字典管理'
      },
      {
        path: '/template', //模板管理
        component: resolve => require(['view/approve/approveManage.vue'], resolve),
        name: '模板管理'
      },
       {
        path: '/policeRole', //警员角色管理
        component: resolve => require(['view/policerole/plRoleManage.vue'], resolve),
        name: '警员角色管理'
      },
      {
        path: '/police', //警员角色管理
        component: resolve => require(['view/policeManage/policeManage.vue'], resolve),
        name: '警员管理'
      },
      {
        path: '/treechoose', //树
        component: resolve => require(['common/TreeChoose.vue'], resolve),
        name: '树'
      },
      {
        path: '/plOrg', //警务组织机构
        component: resolve => require(['view/plOrg/plOrgManage.vue'], resolve),
        name: '警务组织机构'
      },
      {
        path: '/atdSchedule', //警务组织机构
        component: resolve => require(['view/atdSchedule/atdScheduleManage.vue'], resolve),
        name: '班次管理'
      },
      {
        path: '/atdGroups', //考勤组
        component: resolve => require(['view/atdGroups/atdGroupsManage.vue'], resolve),
        name: '考勤组管理'
      },
      {
        path: '/newAtdGroups', //考勤组
        component: resolve => require(['view/atdGroups/newAtdGroupsManage.vue'], resolve),
        name: '考勤组新增'
      },
      {
        path: '/selectDepart', //选择
        component: resolve => require(['common/selectDepart.vue'], resolve),
        name: '选择'
      },
      {
        path: '/attendDay',
        component: resolve => require(['view/atdStatistics/dayReport.vue'],resolve),
        name: '考勤日报表'
      },
      {
        path: '/attendmonth',
        component: resolve => require(['view/atdStatistics/monthReport.vue'],resolve),
        name: '考勤月报表'
      },
      {
        path: '/approveList',
        component: resolve => require(['view/approve/approveList.vue'],resolve),
        name: '审批列表'
      },
      {
        path: '/approveSetting',
        component: resolve => require(['view/approve/approveSetting.vue'],resolve),
        name: '审批设置'
      },
        {
        path: '/dailySummary',
        component: resolve => require(['view/attendSummary/dailySummary.vue'],resolve),
        name: '每日统计'
      },
       {
        path: '/monthSummary',
        component: resolve => require(['view/attendSummary/monthSummary.vue'],resolve),
        name: '月度汇总'
      },
       {
        path: '/punchRecording',
        component: resolve => require(['view/attendSummary/punchRecording.vue'],resolve),
        name: '打卡记录'
      },
       {
        path: '/map',
        component: resolve => require(['common/map.vue'],resolve),
        name: '百度测试'
      },
      {
        path: '/baiduMap',
        component: resolve => require(['common/baiduMap.vue'],resolve),
        name: '百度地图'
      },
      {
        path: '/excel',
        component: resolve => require(['common/excel.vue'],resolve),
        name: '通讯录导入导出'
      },
      {
        path: '/apptest',
        component: resolve => require(['../components/view/apptest.vue'],resolve),
        name: '测试'
      },
       {
        path: '/setExcel', //设置excel
        component: resolve => require(['view/excel/excel.vue'], resolve),
        name: '通讯录设置'
      },



    ]
  },
  {
    path: '*',
    hidden: true,
    component: resolve => require(['../components/404.vue'], resolve),
  },
  {
    path: '/404',
    component: resolve => require(['../components/404.vue'], resolve),
    name: '',
    hidden: true
  },
  // {  path: '/lixi',
  //   component: resolve => require(['../components/lixiTest.vue'], resolve),
  //   name: 'lixi',}
];

const router = new Router({
  mode: 'history',
  routes:routes
});
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    // console.log(to)
    if (to.matched[0].meta.requireAuth) {
        const strCookie = document.cookie;
        //将多cookie切割为多个名/值对
        const arrCookie = strCookie.split("; ");
        let islogin;
        //遍历cookie数组，处理每个cookie对
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            //找到名称为userId的cookie，并返回它的值
            if ("islogin" == arr[0]) {
                islogin = arr[1];
                break;
            }
        }

        if (islogin != null) {

              // if (to.path != '/Layout') {
              //     var nowpath=to.path.substr(1);
              //     var pathlist = JSON.parse(window.localStorage.getItem('gMenuList')).path;
              //     // console.log('pathlist:',pathlist)
              //     var nextpath=$.inArray(nowpath, pathlist);
              //
              //     if(nextpath ==-1){           //url中手动输入权限以外的url,截断请求
              //         // console.log('islogon', nextpath)
              //         // console.log('abc', from.path)
              //         next({
              //             // path: from.path,
              //             path: '/404',
              //             query: {} // 将跳转的路由path作为参数，登录成功后跳转到该路由
              //         })
              //     }else{
              //         next();
              //     }
              // }else{
              //     next();
              // }
          next();
        } else {
            next({
                path: '/login',
                query: {} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

export default router;
