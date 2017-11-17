/**
 * getters
 * 对于state中数据的过滤，属于一种加强属性
 * 是action和mutations的一个简化
 * 一些简单或通用的操作可以抽取到getters上来，方便在应用中引用。
 * * ****************************************************/

//获取数字
export const getCount = state => {
    return state.gcount
}

//获取字典
export const getDicList = state => {
    return state.gDictionaryList
}

//获取表单数据
export const getFormDataList = state => {
    return state.gFormDataList
}

/**
 * 获取侧边菜单状态
 * @param state
 * @returns {string}
 */
export const  getTheme=state=>{
  return state.gTheme
}

/**
 * 获取导航二左侧菜单List
 * @param state
 * @returns {Array}
 */
export const getnavList=state=>{
  return state.gSiderNav
}

/**
 * 获取导航类型
 * @param state
 * @returns {string}
 */
export const getNavType=state=>{
  return state.gNavType;
}

/**
 * 获取菜单是否显示
 * @param state
 * @returns {boolean}
 */
export const getNavShow=state=>{
  return state.gNavShow;
}

/**
 * 获取审批人员
 * @param state
 * @returns {Array}
 */
export const getApprove=state=>{
  return state.gApproveList;
}
