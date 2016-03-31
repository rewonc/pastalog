import { rescale, resize, disable, enable, updateObject,
  toggleHover, moveHover, INITIAL_STATE } from './actions';

/*
reference state tree

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
*/

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'RESCALE':
      return updateObject(state, 'scale', action.scale);
    case 'RESIZE':
      return state.update('size',
        size => resize(size, action.size));
    case 'MOVE_HOVER':
      return state.update('hoverPosition',
        coords => moveHover(coords, action.coords));
    case 'DISABLE':
      return disable(state, action.category, action.id);
    case 'ENABLE':
      return enable(state, action.category, action.id);
    case 'TOGGLE_HOVER':
      return toggleHover(state, action.value);
    default:
      return state;
  }
}
