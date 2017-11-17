
module.exports = {
    webConfig: {
        port:3008,
        count: 0,
        defaultArea: 'index',//默认控制区域
        defaultServerPath: 'http://172.16.187.83:3008',//默认服务器路径
        filePath: 'public/upload'//文件默认路径

    },
    webTokenTimeOut: {  //web端token过期配置
        dateType: 'day',   //年月日时分秒
        number: 1      //几年几月几时几分几秒
    },
    appTokenTimeOut: { //移动端token过期配置
        dateType: 'months',
        number: 1
    },
    taskConfig: {//定时任务常用配置
        minutes: '30 * * * * *',   //每分钟的第30秒触发
        hour: '30 1 * * * *',      //每小时的1分30秒触发
        day: '30 1 1 * * *',       //每天的凌晨1点1分30秒触发
        month: '30 1 1 1 * *',     //每月的1日1点1分30秒触发
        year: '30 1 1 1 2016 *',   //2016年的1月1日1点1分30秒触发
        week: '30 1 1 * * 1'       //每周1的1点1分30秒触发

    },
    dictionary: {//考勤状态
        kqzt: [
            {value: 1, name: '正常'},
            {value: 2, name: '迟到'},
            {value: 3, name: '缺卡'},
            {value: 4, name: '外勤'},
            {value: 5, name: '早退'},
            {value: 6, name: '休息'}

        ]
    },
   
};
