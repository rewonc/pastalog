import io from 'socket.io';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';

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

setTimeout(() => {
  console.log('call render');
  ReactDOM.render(<Container />, document.getElementById('container'));
}, 10000);
