var socket = io();
models = null;

$('form').submit(function(){
  socket.emit('data request', models);
  return false;
});

socket.on('available models', function(data) {
  console.log('models:');
  console.log(data);
  models = data;
});

socket.on('refreshed data', function(data){
  console.log(data);
});

socket.on('data point', function(point) {
  console.log(point);
});