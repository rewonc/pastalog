// Library for common server-client utilities
import { List } from 'immutable';
import _mapValues from 'lodash/mapValues';


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
  const hex = ((i >> 24) & 0xFF).toString(16).slice(-2) +
              ((i >> 16) & 0xFF).toString(16).slice(-2) +
              ((i >> 8) & 0xFF).toString(16).slice(-2);
         // + (i&0xFF).toString(16).slice(-2); Leave out A for now.
  return `#${hex}`;
}

export function stringToColor(str) {
  return intToHex(hashCode(str));
}

/*
End String to Color
*/

export default {
  updateLog, logsToJS, logsFromJS, stringToColor,
};
