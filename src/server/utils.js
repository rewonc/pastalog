import { updateLog } from 'lib';

export function PastaServer(app, store, io, db) {
  function addDataPoint(point) {
    updateLog(db, point);
    io.emit('data point', point);
  }

  return {
    app, store, io, db, addDataPoint,
  };
}
