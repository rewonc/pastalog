import jsonfile from 'jsonfile';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import _forOwn from 'lodash/forOwn';
import { getUUID } from 'lib';

function getTemplate(modelName, seriesName) {
  const uuid = getUUID(modelName, seriesName);
  return {
    indices: `database/${uuid}~INDICES.csv`,
    values: `database/${uuid}~VALUES.csv`,
  };
}

function loadData(filepath) {
  // do synchronously because this only happens on startup
  const data = fs.readFileSync(filepath, 'utf8');
  // remove trailing comma
  const str = data.substring(0, data.length - 1);
  return str.split(',');
}

function hydrateDB(data, cb) {
  _forOwn(data.logs, (series) => {
    _forOwn(series, (seriesData) => {
      const seriesObj = seriesData;
      seriesObj.indices = loadData(seriesObj.indices);
      seriesObj.values = loadData(seriesObj.values);
    });
  });
  cb(data);
}

function dehydrateDB(data) {
  const outDB = {};
  outDB.path = data.path;
  outDB.timeOfSerialization = Date.now();
  outDB.logs = {};
  _forOwn(data.logs, (series, modelName) => {
    outDB.logs[modelName] = {};
    _forOwn(series, (seriesData, seriesName) => {
      outDB.logs[modelName][seriesName] = getTemplate(modelName, seriesName);
    });
  });
  return outDB;
}

function saveDB(data) {
  const db = dehydrateDB(data);

  // Rename previous file to backup / avoid corruption
  const filepath = data.path;
  const backupPath = `${filepath}.~BACKUP`;
  const write = () => {
    jsonfile.writeFile(filepath, db, (writeError) => {
      if (writeError) {
        throw writeError;
      } else {
        // successfully saved
      }
    });
  };
  fs.rename(filepath, backupPath, (renameError) => {
    if (renameError) {
      if (renameError.errno === -2) {
        // do nothing -- original file doesn't exist
        // and will not be written.
      } else {
        throw renameError;
      }
    }
    write();
  });
}

function append(filepath, value) {
  const dirname = path.dirname(filepath);
  mkdirp(dirname, (err) => {
    if (err) {
      throw err;
    } else {
      fs.appendFile(filepath, `${value},`, { flag: 'a+' }, (appendErr) => {
        if (appendErr) {
          console.dir(appendErr);
          throw appendErr;
        }
      });
    }
  });
}

function saveToHardLog(modelName, seriesName, index, value) {
  const paths = getTemplate(modelName, seriesName);
  append(paths.indices, index);
  append(paths.values, value);
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
  saveToHardLog(modelName, seriesName, index, value);
  if (shouldSave) {
    saveDB(db);
  }
}

export function initializeDB(filepath, cb) {
  jsonfile.readFile(filepath, (err, data) => {
    if (err) {
      const db = { path: filepath, logs: {} };
      return cb(db);
    }
    return hydrateDB(data, cb);
  });
}
