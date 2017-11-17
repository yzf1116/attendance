const redis = require('redis');
const RDS_PORT = 6379,        //Redis服务器端口
    RDS_HOST = '127.0.0.1', //服务器ip  172.16.187.83
    RDS_OPTS = {};          //配置项


const redisCli = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

redisCli.on('error', (err)=> {
    console.log('Error ' + err);
});

redisCli.on('connect', ()=> {
    console.log('Redis is ready');
});

exports.redis = redis;
exports.redisCli = redisCli;