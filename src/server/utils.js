import { savePoint } from './db';

export function PastaServer(app, store, io, db) {
  function addDataPoint(point) {
    io.emit('data point', point);
    savePoint(point, db);
  }

  return {
    app, store, io, db, addDataPoint,
  };
}
