/***********************************************************************
 *                           自定义扩展的工具类  方法自行扩展迭代                           *
 * ********************************************************************/
var numberUtils = {
    /**
     * 函数说明：给数字加千分位显示
     * 参数说明：num   需要加千分位的数字
     * @param num
     * @returns {string|*}
     */
    numToThousandsSeparator: function (num) {
        //如果传进来的值不是数字，则原值返回
        if (!Number(num) || num < 1000) {
            return num;
        }
        num = num + "";
        var re = /(-?\d+)(\d{3})/;
        //正则判断
        while (re.test(num)) {
            //符合条件则进行替换
            num = num.replace(re, "$1,$2");
        }
        return num;
    }
}
module.exports = numberUtils;
