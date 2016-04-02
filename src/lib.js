// Library for common server-client utilities
import { List } from 'immutable';
import _mapValues from 'lodash/mapValues';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';


export function round2(input) {
  return Math.round(input * 100) / 100;
}

export function rightPadDecimals2(input) {
  const number = round2(input);
  const str = number.toString();
  const splits = str.split('.');
  if (splits[1] === undefined) {
    return `${str}.00`;
  }
  if (splits[1].length === 1) {
    return `${str}0`;
  }
  return str;
}

export function updateLog(database, point) {
  /* Update a database with a new data point
  ** This assumes that db has a key 'log' and mutates
  ** that object in place. */

  const db = database;
  const name = point.modelName;
  const type = point.pointType;
  const step = point.globalStep;
  const value = point.pointValue;
  if (db.logs[name] === undefined) {
    db.logs[name] = {};
  }
  if (db.logs[name][type] === undefined) {
    db.logs[name][type] = {
      values: List(),
      indices: List(),
    };
  }
  const series = db.logs[name][type];
  series.values = series.values.push(value);
  series.indices = series.indices.push(step);
  return true;
}


export function logsToJS(logs) {
  return _mapValues(logs, (model) => (
    _mapValues(model, (series) => (
      _mapValues(series, (list) => (list.toJS()))
    ))
  ));
}


export function logsFromJS(logs) {
  return _mapValues(logs, (model) => (
    _mapValues(model, (series) => (
      _mapValues(series, (arr) => (List(arr)))
    ))
  ));
}

export function convertScales(list, minIn, maxIn, minOut, maxOut, options = {}) {
  const deltaIn = maxIn - minIn;
  const deltaOut = maxOut - minOut;
  if (options.invert === true) {
    return _map(list, (val) => ((1 - (val - minIn) / deltaIn) * deltaOut + minOut));
  }
  return _map(list, (val) => ((val - minIn) / deltaIn * deltaOut + minOut));
}

export function getUUID(modelName, seriesName) {
  return `${modelName}/${seriesName}`;
}

export function seriesMap(logs, cb) {
  const results = [];
  _forEach(logs, (series, modelName) => {
    _forEach(series, (list, seriesName) => {
      results.push(cb(list, modelName, seriesName));
    });
  });
  return results;
}

/*
String to Color representation comes from:
http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
*/

function hashCode(str) {
  let i;
  let chr;
  let len;
  let hash = 0;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

function intToHex(i) {
  let hex = ((i >> 24) & 0xFF).toString(16).slice(-2) +
              ((i >> 16) & 0xFF).toString(16).slice(-2) +
              ((i >> 8) & 0xFF).toString(16).slice(-2) +
              (i & 0xFF).toString(16).slice(-2);
  hex = hex.slice(-6);
  while (hex.length < 6) {
    hex = `0${hex}`;
  }
  return `#${hex}`;
}

export function stringToColor(str) {
  return intToHex(hashCode(str));
}

/*
End String to Color
*/

export default {
  updateLog, logsToJS, logsFromJS, stringToColor, getUUID
};
