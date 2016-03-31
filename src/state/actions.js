import { fromJS } from 'immutable';

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

export function moveHover(old, current) {
  return mergeElements(old, current);
}

export function rescale(old, current) {
  return mergeElements(old, current);
}

export function resize(old, current) {
  return mergeElements(old, current);
}

export function disable(state, category, id) {
  return state.updateIn(
    ['disabled', category, id], () => true
  );
}

export function enable(state, category, id) {
  return state.deleteIn(['disabled', category, id]);
}

export default {
  rescale, resize, disable, enable, toggleHover, moveHover, INITIAL_STATE,
};
