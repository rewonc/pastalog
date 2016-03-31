import { fromJS, List } from 'immutable';
import { forEachEnabledSeries, isSeriesEnabled } from './helpers';

const BUFFER = 0.01;
const PADDING = 0.05;

export const INITIAL_STATE = fromJS(
  {
    scale: {
      minX: -0.05,
      maxX: 20,
      minY: -0.001,
      maxY: 0.5,
    },
    size: {
      width: 1000,
      height: 600,
    },
    logs: {},
    hovering: false,
    hoverPosition: {
      hoverX: 0,
      hoverY: 0,
    },
    disabled: {
      models: {},
      series: {},
      uniques: {},
    },
  }
);

function mergeElements(old, current) {
  return old.merge(current);
}

export function toggleHover(state, value) {
  return state.update(
    'hovering',
    () => value
  );
}

export function updateObject(state = INITIAL_STATE, key, current) {
  if (state === null) {
    return fromJS({ [key]: current });
  }
  return state.update(key, fromJS({}), val => mergeElements(val, current));
}


export function disable(state, category, id) {
  return state.updateIn(
    ['disabled', category, id], () => true
  );
}

export function enable(state, category, id) {
  return state.deleteIn(['disabled', category, id]);
}

function rescale(oldScale, minX, minY, maxX, maxY) {
  const newScale = {};
  const xRange = oldScale.maxX - oldScale.minX;
  const yRange = oldScale.maxY - oldScale.minY;
  // for now, skip resizing min X as it shouldn't be below 0.
  // if (minX < oldScale.minX + BUFFER * xRange) {
  //   newScale.minX = minX - PADDING * xRange;
  // }
  if (minY < oldScale.minY + BUFFER * yRange) {
    newScale.minY = minY - PADDING * yRange;
  }
  if (maxX > oldScale.maxX - BUFFER * xRange) {
    newScale.maxX = maxX + PADDING * xRange;
  }
  if (maxY > oldScale.maxY - BUFFER * yRange) {
    newScale.maxY = maxY + PADDING * yRange;
  }
  return mergeElements(oldScale, newScale);
}

function initializeScale(state, logs) {
  let scale = state.get('scale');
  forEachEnabledSeries(logs, state.get('disabled'),
    (modelName, seriesName, lists) => {
      const minX = lists.indices.min();
      const maxX = lists.indices.max();
      const minY = lists.values.min();
      const maxY = lists.values.max();
      scale = rescale(scale, minX, minY, maxX, maxY);
    }
  );
  return updateObject(state, 'scale', scale);
}


function updateScale(state, index, value) {
  return updateObject(state, 'scale', rescale(
      state.get('scale'), index, value, index, value
    ));
}

export function initializeLogs(state, logs) {
  return initializeScale(state, logs).set('logs', logs);
}

export function addLogPoint(state, modelName, seriesName, index, value) {
  let rescaledState = state;
  if (isSeriesEnabled(state.get('disabled'), modelName, seriesName)) {
    rescaledState = updateScale(state, index, value);
  }
  return rescaledState.updateIn(
    ['logs', modelName, seriesName], list => list.
      update('indices', List(), arr => arr.push(index)).
      update('values', List(), arr => arr.push(value))
    );
}

export default {
  disable, enable, toggleHover, updateObject, initializeLogs, addLogPoint, INITIAL_STATE,
};
