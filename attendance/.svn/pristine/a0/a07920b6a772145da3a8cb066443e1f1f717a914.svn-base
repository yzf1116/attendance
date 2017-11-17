var io = require('socket.io')();

io.on('connection', function (socket) {
	console.log("有客户端接入~~");

	socket.on('send', function (data) {
		io.emit('receive', data);
	});

	// ...在这里自定义的监听和广播事件s 
});

exports.listen = function (server) {
	return io.listen(server);
};