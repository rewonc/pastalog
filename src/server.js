import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import bodyParser from 'body-parser';
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
import Container from './components/Container';
import App from './components/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { updateLog, logsToJS } from 'lib';

const app = express();
const HTTP = new Server(app);
const io = socketIO(HTTP);
const PORT = 8120;
const DATABASE = 'database.json';
const db = {
  logs: {},
  path: DATABASE,
};


function addDataPoint(point) {
  updateLog(db, point);
  io.emit('data point', point);
}

function addNewData(modelName, rate, step = 0) {
  addDataPoint({
    modelName,
    pointType: 'trainLoss',
    pointValue: Math.random(),
    globalStep: step,
  });

  if (step !== 0 && step % 20 === 0) {
    addDataPoint({
      modelName,
      pointType: 'validLoss',
      pointValue: Math.random(),
      globalStep: step,
    });
  }

  setTimeout(() => {
    addNewData(modelName, rate, step + 1);
  }, rate);
}

// generate fake data
addNewData('modelA', 3000);
addNewData('modelB', 3200);
addNewData('modelC', 2800);
// end generate fake data


// ROUTES

app.use(bodyParser.json());
app.use(express.static('dist/assets'));

app.get('/', (req, res) => {
  const innerElement = ReactDOMServer.renderToString(<Container />);
  const html = App(innerElement);
  res.send(html);
});

app.post('/data', (req, res) => {
  // to post using curl:
  // curl -H "Content-Type: application/json" -X POST -d '{"modelName":"model1","pointType":"validLoss", "pointValue": 2.5, "globalStep": 1}' http://localhost:8120/data
  if (req.body.modelName === undefined ||
      req.body.pointType === undefined ||
      req.body.pointValue === undefined) {
    res.sendStatus(400);
  } else {
    addDataPoint(req.body);
    res.sendStatus(200);
  }
});

io.on('connection', (socket) => {
  socket.emit('available models', _keys(db.logs));
  socket.on('data request', (models) => {
    socket.emit('refreshed data', logsToJS(_pick(db.logs, models)));
  });
});

HTTP.listen(PORT, () => {
  console.log('Node server listening on localhost:', PORT);
});
