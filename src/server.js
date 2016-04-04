import express from 'express';
import { Server } from 'http';
import socketIO from 'socket.io';
import minimist from 'minimist';
import makeStore from './state/store';
import fakeData from '../test/fakeData';
import makeRoutes from './server/routes';
import { initializeDB } from './server/db';
import { PastaServer } from './server/utils';

const argv = minimist(process.argv.slice(2));
const PORT = argv.port || 8120;
const DB_PATH = argv.database || 'database.json';
const app = express();
const HTTP = new Server(app);
const io = socketIO(HTTP);
const store = makeStore();

initializeDB(DB_PATH, (db) => {
  const pastaServer = PastaServer(app, store, io, db);
  makeRoutes(pastaServer);
  if (argv.fakeData === true) {
    // generate fake data for testing
    fakeData(pastaServer);
  }
  HTTP.listen(PORT, () => {
    console.log('pastalog server listening on port: ', PORT);
  });
});
