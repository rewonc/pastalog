import { fromJS, List, Map } from 'immutable';
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
    scaleMenu: false,
    noAutoUpdate: false,
    size: {
      width: 1000,
      height: 600,
    },
    // logs: {},
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
  const xRange = oldScale.get('maxX') - oldScale.get('minX');
  const yRange = oldScale.get('maxY') - oldScale.get('minY');
  // for now, skip resizing min X as it shouldn't be below 0.
  // if (minX < oldScale.get('minX') + BUFFER * xRange) {
  //   newScale.minX = minX - PADDING * xRange;
  // }
  if (minY < oldScale.get('minY') + BUFFER * yRange) {
    newScale.minY = minY - PADDING * yRange;
  }
  if (maxX > oldScale.get('maxX') - BUFFER * xRange) {
    newScale.maxX = maxX + PADDING * xRange;
  }
  if (maxY > oldScale.get('maxY') - BUFFER * yRange) {
    newScale.maxY = maxY + PADDING * yRange;
  }
  return mergeElements(oldScale, newScale);
}

function initializeScale(state = Map(), logs) {
  let scale = state.get('scale', Map());
  forEachEnabledSeries(logs, state.get('disabled', Map()),
    (modelName, seriesName, lists) => {
      const minX = lists.get('indices').min();
      const maxX = lists.get('indices').max();
      const minY = lists.get('values').min();
      const maxY = lists.get('values').max();
      scale = rescale(scale, minX, minY, maxX, maxY);
    }
  );
  return updateObject(state, 'scale', scale);
}


function updateScale(state = Map(), index, value) {
  return updateObject(state, 'scale', rescale(
      state.get('scale', Map()), index, value, index, value
    ));
}

export function initializeLogs(state = Map(), logs) {
  return initializeScale(state, logs).set('logs', logs);
}

export function addLogPoint(_state = Map(), modelName, seriesName, index, value) {
  let state = _state;
  const shouldUpdateScale = state.get('noAutoUpdate', false) === false;
  const isEnabled = isSeriesEnabled(state.get('disabled', Map()), modelName, seriesName);
  if (shouldUpdateScale && isEnabled) {
    state = updateScale(state, index, value);
  }
  return state.updateIn(
    ['logs', modelName, seriesName], Map(), list => list.
      update('indices', List(), arr => arr.push(index)).
      update('values', List(), arr => arr.push(value))
    );
}

export default {
  disable, enable, toggleHover, updateObject, initializeLogs, addLogPoint, INITIAL_STATE,
};
