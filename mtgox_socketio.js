var io = require('socket.io-client');
var util = require('util');
var log4js = require('log4js');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('data/ticker.log'), 'ticker');
var ticker_logger = log4js.getLogger('ticker');

var socket = io.connect('http://socketio.mtgox.com/mtgox?Currency=USD');
socket.on('connect', function (data) {
  console.log('Connected');
  var request = {
    op: 'mtgox.subscribe',
    type: 'ticker'
  }
  socket.send(request);
  console.log("Sent Request:");
  console.log(request);
  //socket.emit('my other event', { my: 'data' });
});

socket.on('disconnect', function (data) {
  console.log('Disconnected');
  console.log(data);
});

socket.on('error', function (data) {
  console.log('In error');
  console.log(data);
});

socket.on('message', function (data) {
  console.log('In message');
  console.log(util.inspect(data));
  ticker_logger.info(util.inspect(data));
});
