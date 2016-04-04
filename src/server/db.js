import jsonfile from 'jsonfile';

function hydrateDB(db) {

}

function dehydrateDB(db) {

}

function saveDB(path, db, cb) {
  console.log('should backup here');
  // jsonfile.write(path, db, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('successfully saved');
  //     cb();
  //   }
  // });
}

function saveToHardLog(path, modelName, seriesName, index, value) {
}

export function savePoint(point, database) {
  const modelName = point.modelName;
  const seriesName = point.pointType;
  const index = point.globalStep;
  const value = point.pointValue;
  const db = database;
  let shouldSave = false;
  // add to the log, and also append to the file for this model/series
  if (!db.logs) {
    db.logs = {};
    shouldSave = true;
  }
  if (db.logs[modelName] === undefined) {
    db.logs[modelName] = {};
    shouldSave = true;
  }
  const model = db.logs[modelName];
  if (model[seriesName] === undefined) {
    model[seriesName] = {
      indices: [],
      values: [],
    };
    shouldSave = true;
  }
  const series = model[seriesName];
  series.indices.push(index);
  series.values.push(value);
  saveToHardLog(db.path, modelName, seriesName, index, value);
  if (shouldSave) {
    saveDB(db);
  }
}

export function initializeDB(path, cb) {
  jsonfile.readFile(path, (err, data) => {
    let db;
    if (err) {
      db = { path, logs: {} };
    } else {
      db = data;
    }
    cb(db);
  });
}
