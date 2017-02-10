import { savePoint, saveDB, backupSeriesLogs } from './db';

export function PastaServer(app, store, io, db) {
  function addDataPoint(point) {
    io.emit('data point', point);
    savePoint(point, db);
  }

  function deleteSeries(modelName, seriesName) {
    const logs = db.logs;
    // trigger: rename old files to .~DELETED
    backupSeriesLogs(modelName, seriesName);
    // delete in current store and save DB
    delete logs[modelName][seriesName];
    saveDB(db);
    // emit new data
    io.emit('refreshed data', logs);
  }

  function deleteModel(modelName) {
    const logs = db.logs;
    // delete in current store and save DB
    delete logs[modelName];
    saveDB(db);
    // emit new data
    io.emit('refreshed data', logs);
  }

  return {
    app, store, io, db, addDataPoint, deleteSeries, deleteModel,
  };
}
