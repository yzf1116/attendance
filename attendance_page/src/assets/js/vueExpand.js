/**
 * Vue扩展类，
 * 所有的原型链扩展都写在该文件。
 */
import axios from 'axios';
import router from '../../router'
import * as validateRule from './validateRule.js';
import * as commonManage from './commonManage.js';
import {
  Message
} from 'element-ui'
export const vueExpand = (Vue) => {
  Vue.prototype.$http = axios;
  Vue.prototype.$validateRule = validateRule.rules; //表单验证规则表
  Vue.prototype.$getList = commonManage.getList;
  Vue.prototype.$submitForm = commonManage.submitForm;
  Vue.prototype.$deleteOne = commonManage.deleteOne;
  Vue.prototype.$deleteBatch = commonManage.deletebatch;
  Vue.prototype.$updateForm = commonManage.updateForm;
  Vue.prototype.$setStore = commonManage.setStore; //获取localStorage
  Vue.prototype.$getStore = commonManage.getStore; //获取localStorage
  Vue.prototype.$removeStore = commonManage.removeStore; //删除localStorage

  Vue.directive('clickoutside', {
    bind(el, binding, vnode) {
      function documentHandler(e) {
        if (el.contains(e.target)) {
          return false;
        }
        if (binding.expression) {
          binding.value(e);
        }
      }
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    }
  });

  /**
   * axios请求拦截
   * 可以配置axios请求
   */

  axios.interceptors.request.use(function (config) {
    // 处理请求之前的配置
    config.url = 'api' + config.url //用于真实环境部署，更改代理问题
    let dict = config.url.includes('initdictionary');
    let login = config.url.includes('isuserlogin');
    config.headers.access_token = window.localStorage.getItem('TOKEN');
    if (dict || login) {
      delete config.headers.access_token
    }
    return config;
  }, function (error) {
    // 请求失败的处理
    return Promise.reject(error);
  });

  // 响应拦截
  axios.interceptors.response.use(function (response) {
    if (response.status == 401 || (!response.data.success && response.data.msg == 'access_token超时')) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = "islogin=true; expires=" + date.toGMTString();
      //                    localStorage.removeItem('ms_username')
      window.localStorage.clear();
      router.push('Login');
      Message({
        showClose: true,
        message: '登录验证超时，请重新登录',
        type: 'warning'
      })
    } else {
      // 处理响应数据
      return response
      // window.setTimeout(function () {
      //   resPonse(response)
      // }, 1000);
      // setTimeout(function(){
      //    return response;
      // }, 3000 )
    }

  }, function (error) {
    // 处理响应失败
    return Promise.reject(error);
  });
};


export const resPonse = (obj) => {
  return obj
}
