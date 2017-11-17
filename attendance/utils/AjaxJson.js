/**
 *Ajax后需要返回给前端的数据格式
 *
 * @param success       是否成功   type:boolean
 * @param msg           提示信息   type:String
 * @param result         结果集    type:Array或Object
 * @param attributes   其他参数    type:Object
 * @constructor
 */
function AjaxJson(success, msg, result, attributes) {
    this.success = success || true;
    this.msg = msg || '操作成功';
    this.result = result || {};
    this.attributes = attributes || {};
}
module.exports = AjaxJson;