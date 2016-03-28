import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import _union from 'lodash/union';
import { updateLog, logsFromJS } from 'lib';
import './styles.scss';

const socket = io();
const db = { logs: null };

function renderData() {
  ReactDOM.render(<Container logs={db.logs} />, document.getElementById('container'));
}

socket.on('available models', (models) => {
  const clientModels = ['modelA', 'modelB'];
  const validModels = _union(clientModels, models);
  socket.emit('data request', validModels);
});

socket.on('refreshed data', (data) => {
  db.logs = logsFromJS(data);
  renderData();
});

socket.on('data point', (point) => {
  if (db.logs === null) {
    return;
  }
  updateLog(db, point);
  renderData();
});

ReactDOM.render(<Container />, document.getElementById('container'));
