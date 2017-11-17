const express = require('express');
// const debug = require('debug')('attendance-manage:server');
const http = require('http');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');// favicon.ico 支持
var ejs = require('ejs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');// cookie
const bodyParser = require('body-parser');// post参数解析
const config = require('./config/baseConfig');
var history = require('connect-history-api-fallback');
const app = express();
/**
 *开启HTML5 History 模式，去除vue-router 默认 hash 模式
 */
// app.use(history());
/**
 * 跨域支持
 */
const cors = require('cors');
app.use(cors());

// cookie处理
app.use(cookieParser());

/**
 * 载入log4js自定义模块
 */

var log4js = require(path.join(__dirname, 'framework', 'log4js'));
log4js.configure();
app.use(log4js.useLog());

/**
 * 封装sequelize 将db对象挂载到全局global对象
 */
global.db = require(path.join(__dirname, 'framework', 'db'));
require('./framework/bindTable');//表关系
/**
 * 启动载入字典表
 */
global.dictionary = config.dictionary.kqzt;

/**
 *定时任务
 */
// require('./test/testDB')
// require('./service/common/TimingTaskService').initAttendanceRecord();


/**
 *  视图模版引擎设置
 */
app.engine('html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');

/**
 *  设置静态资源目录
 */
app.use(express.static(path.join(__dirname, 'public')));
// 设置icon图标（如果没有favicon.icon）可以注释这一行代码
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
/**
 * 处理非get提交数据
 */
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

/**
 * 全局守护node进程，保证进程不挂掉
 */
// process.on('uncaughtException', function (err) {
//     console.log('进程守护成功,存在未捕获的异常,请检查: ' + err);
// });

/**
 * 加载token认证和登录授权机制
 */
app.set('jwtTokenSecret', 'JWT_SERVER_TOKEN');
require('./framework/getLoginRight').getLoginRight(app);
require('./framework/checkJwt').checkJwt(app);


/**
 *  创建express Router 实例，绑定路由到控制器
 */
//
var router = express.Router();
/**
 * 路由中间件,实现服务端渲染,动态根据请求地址设置view视图路径，一个controller对应一个视图文件夹views
 */
router.use(function (req, res, next) {
    var url = req.url;
    var pathArr = url.split(/\/|\?/);
    var viewPath = path.join(__dirname, 'controls', defaultArea, 'views');
    if (pathArr[1] != "" && pathArr[1] != "favicon.ico") {
        viewPath = path.join(__dirname, 'controls', pathArr[1], 'views');
    } else {
        viewPath = path.join(__dirname, 'controls', defaultArea, 'views');
    }
    app.set('views', viewPath);
    next();
});

// 载入路由中间件
app.use(router);


// 设置默认控制区域
var defaultArea = config.webConfig.defaultArea;
var expressControllers = require('./framework/core/mvc/expressController');// 载入MVC核心路由解析框架
expressControllers
    .setRouteDirectory({
        areaDirectory: __dirname + '/controls',
        controllerDirname: 'controllers',//控制器文件夹
        defaultArea: defaultArea,//默认起始控制区
        defautController: 'home',//控制器入口
        defautAction: 'index'
    })
    .bind(router);

// 错误处理
// 404处理
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误或者服务器500异常处理
app.use(function (err, req, res, next) {
    var error = (req.app.get('env') === 'development') ? err : {};
    //写错误日志
    var errorMes = '[' + Date() + ']' + req.url + '\n' + '[' + error.stack + ']' + '\n';
    errorLogStream.write(errorMes);
    var status = err.status || 500;
    res.status(status);
    res.send('<pre>' + status + ' ' + err.message + '\n' + errorMes + '</pre>');
});
/**
 * 日志输出配置模块
 */
const fileStreamRotator = require('file-stream-rotator');// 日志输出
// 日志输出到文件系统，每日一个日志文件
const logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogDirectory = __dirname + '/logs/access';
fs.existsSync(accessLogDirectory) || fs.mkdirSync(accessLogDirectory);
const errorLogDirectory = __dirname + '/logs/error';
fs.existsSync(errorLogDirectory) || fs.mkdirSync(errorLogDirectory);
// 保存访问日志
const accessLogStream = fileStreamRotator.getStream({
    filename: accessLogDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
});
app.use(logger('combined', {stream: accessLogStream}));
// 设置错误日志文件地址
const errorLogStream = fs.createWriteStream(errorLogDirectory + '/error.log', {'flags': 'a'});


/**
 * 从环境获取端口并存储在Express。
 */

const port = normalizePort(process.env.PORT || config.webConfig);
app.set('port', port);

/**
 * 创建HTTP服务器。
 */

const server = http.createServer(app);

/**
 * 在提供的端口上侦听所有网络接口。
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// 引入socket 服务。
require(path.join(__dirname, 'socket', 'socket')).listen(server);


/**
 * 将端口规范化为数字，字符串或false。
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * HTTP服务器事件侦听器“错误”事件。
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * HTTP服务器“监听”事件的事件侦听器。
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}


module.exports = app;
