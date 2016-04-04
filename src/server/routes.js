import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import Container from './../components/Container';
import App from './../components/App';
import { INITIAL_STATE } from './../state/actions';

export default function makeRoutes({ app, store, io, db, addDataPoint, deleteSeries }) {
  app.use(bodyParser.json());
  app.use(express.static('build/assets'));

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
    socket.emit('refreshed data', db.logs);
    socket.on('delete series', ({ modelName, seriesName }) => {
      deleteSeries(modelName, seriesName, socket);
    });
  });
}
