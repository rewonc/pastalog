import { fromJS, List, Map } from 'immutable';

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

export function initializeLogs(state, logs) {
  return state.set('logs', logs);
}

export function updateList(list = Map(), index, value) {
  return list.
    update('indices', List(), arr => arr.push(index)).
    update('values', List(), arr => arr.push(value));
}

export default {
  disable, enable, toggleHover, updateObject, initializeLogs, updateList, INITIAL_STATE,
};
