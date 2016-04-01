import { Map } from 'immutable';
import { getUUID } from './../lib';

export function isDisabled(state, category, id) {
  return (state.get('disabled', Map()).
    get(category, Map()).
    get(id, false) === true);
}

export function isSeriesEnabled(disabled = Map(), modelName, seriesName) {
  const model = disabled.getIn(['models', modelName], false);
  const series = disabled.getIn(['series', seriesName], false);
  const unique = disabled.getIn(['uniques',
    getUUID(modelName, seriesName)], false);
  return !(model || series || unique);
}

export function forEachSeries(logs, cb) {
  logs.forEach((seriesMap, modelName) => {
    seriesMap.forEach((lists, seriesName) => {
      if ((lists.get('indices') !== undefined) &&
          (lists.get('values') !== undefined)) {
        cb(modelName, seriesName, lists);
      }
      return true;
    });
    return true;
  });
}

export function forEachEnabledSeries(logs, disabled, cb) {
  forEachSeries(logs, (modelName, seriesName, lists) => {
    if (isSeriesEnabled(disabled, modelName, seriesName)) {
      cb(modelName, seriesName, lists);
    }
  });
}

export function mapSeries(logs, cb) {
  const res = [];
  forEachSeries(logs, (modelName, seriesName, lists) => {
    res.push(cb(modelName, seriesName, lists));
  });
  return res;
}

export function mapEnabledSeries(logs, disabled, cb) {
  const res = [];
  forEachEnabledSeries(logs, disabled, (modelName, seriesName, lists) => {
    res.push(cb(modelName, seriesName, lists));
  });
  return res;
}
