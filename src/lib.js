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


export default {
  updateLog, logsToJS, logsFromJS,
};
