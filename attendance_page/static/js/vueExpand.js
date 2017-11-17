/**
 * Vue扩展类，
 * 所有的原型链扩展都写在该文件。
 */
import axios from 'axios';
import * as validateRule from './validateRule.js';
import * as commonManage from './commonManage.js';
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
    /**
     * axios请求拦截
     * 可以配置axios请求
     */
    axios.interceptors.request.use(function (config) {
        // 处理请求之前的配置
        // config.url = config.url.substr(4);       //用于真实环境部署，更改代理问题
        // console.log(config)
        return config;
    }, function (error) {
        // 请求失败的处理
        return Promise.reject(error);
    });

    // 响应拦截
    axios.interceptors.response.use(function (response) {
        // 处理响应数据
        return response;
    }, function (error) {
        // 处理响应失败
        return Promise.reject(error);
    });
};
