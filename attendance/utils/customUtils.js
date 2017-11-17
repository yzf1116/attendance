/***********************************************************************
 *                           自定义扩展的工具类  方法自行扩展迭代                           *
 * ********************************************************************/
var customUtils = {
    /**
     *  检查object对象，如果有key有value,去除首尾空格返回。 如果为空或者有key无value，返回false,
     */
    checkObjParams: function (obj) {
        if (obj instanceof Object && !Array.isArray(obj)) {
            if (Object.keys(obj).length == 0) {
                return false;
            } else {
                try {
                    for (var key in obj) {
                        obj[key] = obj[key].trim();
                    }
                    return obj;

                } catch (e) {
                    console.error(e.name + ':' + e.message)
                }
            }

        } else {
            return false;
        }

    },
    /**
     * 递归查找所有子孙树。
     * @param arr 要查询的数组
     * @param id 要查条目的id
     * @returns {Array}
     */
    sonsTree: function (arr, id) {
        var temp = [], lev = 0;
        var forFn = function (arr, id, lev) {
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (item.parent_id == id) {
                    item.lev = lev;
                    temp.push(item);
                    forFn(arr, item.id, lev + 1);
                }
            }
        };
        forFn(arr, id, lev);
        return temp;
    }


};
module.exports = customUtils;
