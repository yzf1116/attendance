/**
 * Mutations
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * mutation中写有修改数据的逻辑。
 * PS:(mutation里只能执行同步操作)
 */


/**
 * 加数据
 * @param {Object} state
 * @param {Object} data
 */
export const ADDNUM = (state, data) => {
  return state.getCount++
}


/**
 * 加数据
 * @param {Object} state
 * @param {Object} data
 */
export const REDUCENUM = (state, data) => {
  return state.getCount--
}

/**
 * 全局添加字典
 * @param {Object} state
 * @param {Object} data  字典
 */
export const ADDLIST = (state, data) => {
  return state.gDictionaryList = data
}


/**
 * 全局添加表单数据
 * @param {*} state
 * @param {*} data 表单数据
 */
export const ADDFORMLIST = (state, data) => {
  return state.gFormDataList = data
}


/**
 * 全局修侧边栏样式
 * @param state  state表
 * @param data   数据源
 * @returns {*}
 * @constructor
 */
export const CHANGETHEME = (state, data) => {
  return state.gTheme = data
}


/**
 * 设置做左边导航List
 * @param state
 * @param data
 * @returns {Array}
 * @constructor
 */
export const CHANGENAV = (state, data) => {
  const list = JSON.parse(window.localStorage.getItem('gMenuList')).public;
  let resData = [];
  list.forEach((item, index) => {
    if (item.menu_url == data) {
      resData = item.children
    }
  });
  console.log(resData)
  return state.gSiderNav = resData;
}

/**
 * 设置导航类型
 * @param state
 * @param data
 * @returns {*}
 * @constructor
 */
export  const  SETNAVTYPE=(state,data)=>{
  return state.gNavType=data;
}

/**
 * 设置菜单是否显示
 * @param state
 * @param data
 * @returns {*}
 * @constructor
 */
export const SETNAVSHOW=(state,data)=>{
  return state.gNavShow=data;
}

/**
 * 设置审批人员
 * @param state
 * @param data
 * @returns {*}
 * @constructor
 */
export const SETAPPROVE=(state,data)=>{
  return state.gApproveList=data;
}
