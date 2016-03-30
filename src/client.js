import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import _difference from 'lodash/difference';
import { updateLog, logsFromJS } from 'lib';
import './styles.scss';

const socket = io();
const db = { logs: null };

function renderData() {
  ReactDOM.render(<Container logs={db.logs} />, document.getElementById('container'));
}

socket.on('available models', (models) => {
  // todo: add way to delete models, which means don't request them.
  const modelBlacklist = [];
  const validModels = _difference(models, modelBlacklist);
  socket.emit('data request', validModels);
});

socket.on('refreshed data', (data) => {
  console.log(data);
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
