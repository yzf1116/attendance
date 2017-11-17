/**
 * Created by Administrator on 2017/4/6.
 */

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * 例子：
 * dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * dateFormat(new Date(),"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * **/

export function dateFormat(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,                 //月份
        'd+': date.getDate(),                    //日
        'h+': date.getHours(),                   //小时
        'm+': date.getMinutes(),                 //分
        's+': date.getSeconds(),                 //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds()             //毫秒
    };

    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "" : "") : "")+week[date.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};



/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * pattern(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * pattern(new Date(),"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * pattern(new Date(),"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * pattern(new Date(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

export function patternFormat(date, fmt) {
    var o = {
        "M+" : date.getMonth()+1, //月份
        "d+" : date.getDate(), //日
        "h+" : date.getHours()%24 == 0 ? 24 : date.getHours()%24, //小时
        "H+" : date.getHours(), //小时
        "m+" : date.getMinutes(), //分
        "s+" : date.getSeconds(), //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "星期日",
        "1" : "星期一",
        "2" : "星期二",
        "3" : "星期三",
        "4" : "星期四",
        "5" : "星期五",
        "6" : "星期六"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "" : "") : "")+week[date.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

//获取当前月的第一天
export function getCurrentMonthFirst(){
 var date=new Date();
 date.setDate(1);
 return date;
}
// 获取当前月的最后一天
export function getCurrentMonthLast(){
 var date=new Date();
 var currentMonth=date.getMonth();
 var nextMonth=++currentMonth;
 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
 var oneDay=1000*60*60*24;
 return new Date(nextMonthFirstDay-oneDay);
}


/**
* 获取本周，上周日到本周六
*/
export function getweek(n){
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getYear(); //当前年 
    nowYear += (nowYear < 2000) ? 1900 : 0; //n=0,6当前周
    var weekStartDate = new Date(nowYear, nowMonth, nowDay +(n- nowDayOfWeek)); 
    return weekStartDate; 
}


//获取今天之前或之后天
export function setDays(n){
 var date=new Date();
 var oneDay=1000*60*60*24;
 return new Date(date-oneDay*n);
}