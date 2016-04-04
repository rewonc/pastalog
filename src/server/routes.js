import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import _keys from 'lodash/keys';
import _pick from 'lodash/pick';
import Container from './../components/Container';
import App from './../components/App';
import { INITIAL_STATE } from './../state/actions';


export default function makeRoutes({ app, store, io, db, addDataPoint }) {
  app.use(bodyParser.json());
  app.use(express.static('dist/assets'));

  app.get('/', (req, res) => {
    const innerElement = ReactDOMServer.renderToString(
      <Container state={INITIAL_STATE} store={store} />);
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
      socket.emit('refreshed data', _pick(db.logs, models));
    });
  });
}
