import io from 'socket.io';

const socket = io();

socket.on('available models', (models) => {
  // todo: check if locally stored models are different
  socket.emit('data request', models);
});

socket.on('refreshed data', (data) => {
  console.log(data);
});

socket.on('data point', (point) => {
  console.log(point);
});
