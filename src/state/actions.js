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

export function toggleHover(state, value) {
  return state.update(
    'hovering',
    () => value
  );
}

export function moveHover(coords, newCoords) {
  return coords.merge(newCoords);
}

export function rescale(scale, newScale) {
  return scale.merge(newScale);
}

export function resize(size, newSize) {
  return size.merge(newSize);
}

export function disable(state, category, id) {
  return state.updateIn(
    ['disabled', category, id],
    false,
    () => true
  );
}

export function enable(state, category, id) {
  return state.deleteIn(['disabled', category, id]);
}

export default {
  rescale, resize, disable, enable, toggleHover, moveHover, INITIAL_STATE,
};
