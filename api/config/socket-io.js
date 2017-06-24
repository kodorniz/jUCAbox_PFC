module.exports = function(app, server) {
	var socketIO = require('socket.io').listen(server);
	global.socketIO = socketIO;

	socketIO.set("transports", ['websocket', 'polling']);
	socketIO.sockets.on('connection', function (socket) {

	  socket.on('disconnect', function () {
	  });

	});

}
