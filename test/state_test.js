import { fromJS } from 'immutable';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import reducer from '../src/state/reducer';
import { INITIAL_STATE } from '../src/state/actions';
import { isDisabled } from '../src/state/helpers';
import makeStore from '../src/state/store';


describe('Redux store', () => {
  it('is initialized with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);

    store.dispatch({
      type: 'RESCALE',
      scale: { minX: 10 },
    });
    expect(store.getState()).to.equal(
      INITIAL_STATE.updateIn(['scale', 'minX'], () => 10)
    );
  });
});

describe('Log', () => {
  describe('initialization', () => {
    it('should add initial values for log', () => {
      const initialState = fromJS({});
      const logs = fromJS({
        modelA: {
          trainLoss: {
            values: [12, 13, 14, 15],
            indices: [0, 1, 2, 3],
          },
        },
      });
      const newState = reducer(initialState, {
        type: 'INITIALIZE_LOGS',
        logs,
      });
      expect(newState.get('logs')).to.equal(logs);
    });

    it('should change the scaling on initialization', () => {
      const initialState = INITIAL_STATE;
      const logs = fromJS({
        modelA: {
          trainLoss: {
            values: [12, 13, 14, 15],
            indices: [0, 1, 2, 3],
          },
        },
      });
      const newState = reducer(initialState, {
        type: 'INITIALIZE_LOGS',
        logs,
      });
      expect(initialState.get('scale')).to.equal(INITIAL_STATE.get('scale'));
      expect(newState.get('scale')).to.not.equal(INITIAL_STATE.get('scale'));
    });
  });

  describe('updates', () => {
    it('should update values for log', () => {
      const initialState = fromJS({
        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } },
      });
      const newState = reducer(initialState, {
        type: 'UPDATE_MODEL',
        modelName: 'modelA',
        seriesName: 'trainLoss',
        index: 4,
        value: 16,
      });
      expect(newState).to.equal(initialState.
        updateIn(['logs', 'modelA', 'trainLoss', 'values'], arr => arr.push(16)).
        updateIn(['logs', 'modelA', 'trainLoss', 'indices'], arr => arr.push(4))
      );
    });

    it('should update scales for log', () => {
      const initialState = fromJS({
        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } },
      });
      const newState = reducer(initialState, {
        type: 'UPDATE_MODEL',
        modelName: 'modelA',
        seriesName: 'trainLoss',
        index: 1000,
        value: 10000,
      });
      expect(newState.getIn(['scale', 'maxX'], 0)).to.be.above(1000);
      expect(newState.getIn(['scale', 'maxY'], 0)).to.be.above(10000);
    });

    it('should update values for models that dont exist', () => {
      const initialState = fromJS({
        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } },
      });
      const newState = reducer(initialState, {
        type: 'UPDATE_MODEL',
        modelName: 'modelB',
        seriesName: 'validLoss',
        index: 4,
        value: 16,
      });
      expect(newState).to.equal(initialState.
        updateIn(['logs', 'modelB', 'validLoss', 'values'], fromJS([]), arr => arr.push(16)).
        updateIn(['logs', 'modelB', 'validLoss', 'indices'], fromJS([]), arr => arr.push(4))
      );
    });
  });
});

describe('App state actions', () => {
  describe('rescale', () => {
    it('should work for state variables with no scale property', () => {
      const initialState = fromJS({});
      const newScale = { xMin: 10 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      expect(newState.get('scale')).to.equal(fromJS(newScale));
    });

    it('should work for state variables that are null', () => {
      const initialState = null;
      const newScale = { xMin: 10 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      expect(newState.get('scale')).to.equal(fromJS(newScale));
    });

    it('should apply defaults when state variable is undefined', () => {
      const initialState = undefined;
      const newScale = { xMin: 10 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      const updatedDefaults = INITIAL_STATE.get('scale').update('xMin', () => 10);
      expect(newState.get('scale')).to.equal(updatedDefaults);
    });

    it('should update multiple values for scale at once', () => {
      const initialState = fromJS({ scale: {} });
      const newScale = { xMin: 10, yMin: 20, xMax: 30, yMax: 40 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      expect(newState.get('scale')).to.equal(fromJS(newScale));
    });

    it('should work when update only includes some keys', () => {
      const initialState = fromJS({ scale: { xMin: 10, xMax: 30 } });
      const newScale = { xMax: 30, yMax: 40 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      expect(newState.get('scale')).to.equal(fromJS({
        xMin: 10, xMax: 30, yMax: 40,
      }));
    });
  });

  describe('resize', () => {
    it('should update multiple values for size at once', () => {
      const initialState = fromJS({ size: { width: 100, height: 200 } });
      const newSize = { height: 1000, width: 1000 };
      const newState = reducer(initialState, {
        type: 'RESIZE',
        size: newSize,
      });
      expect(newState.get('size')).to.equal(fromJS(newSize));
    });
  });

  describe('moveHover', () => {
    it('should update multiple values for coordinates at once', () => {
      const initialState = fromJS({ hoverPosition: { hoverX: 100, hoverY: 200 } });
      const newCoords = { hoverX: 1000, hoverY: 1000 };
      const newState = reducer(initialState, {
        type: 'MOVE_HOVER',
        coords: newCoords,
      });
      expect(newState.get('hoverPosition')).to.equal(fromJS(newCoords));
    });
  });

  describe('disable/enable', () => {
    it('should disable a model when no keys exist', () => {
      const initialState = fromJS({});
      const newState = reducer(initialState, {
        type: 'DISABLE',
        category: 'models',
        id: 'modelA',
      });
      expect(isDisabled(newState, 'models', 'modelA')).to.equal(true);
    });

    it('should disable a series type', () => {
      const initialState = fromJS({});
      const newState = reducer(initialState, {
        type: 'DISABLE',
        category: 'series',
        id: 'train_loss',
      });
      expect(isDisabled(newState, 'series', 'train_loss')).to.equal(true);
    });

    it('should disable a unique model/series', () => {
      const initialState = fromJS({});
      const newState = reducer(initialState, {
        type: 'DISABLE',
        category: 'uniques',
        id: 'modelA/train_loss',
      });
      expect(isDisabled(newState, 'uniques', 'modelA/train_loss')).to.equal(true);
    });

    it('should enable disabled elements', () => {
      const initialState = fromJS({ disabled: { models: { modelA: true } } });
      const newState = reducer(initialState, {
        type: 'ENABLE',
        category: 'models',
        id: 'modelA',
      });
      expect(isDisabled(newState, 'model', 'modelA')).to.equal(false);
    });

    it('should do nothing when enabled elements are enabled again', () => {
      const initialState = fromJS({ disabled: { models: {} } });
      const newState = reducer(initialState, {
        type: 'ENABLE',
        category: 'models',
        id: 'modelA',
      });
      expect(isDisabled(newState, 'model', 'modelA')).to.equal(false);
    });

    it('should do nothing when disabled elements are disabled again', () => {
      const initialState = fromJS({ disabled: { models: { modelA: true } } });
      const newState = reducer(initialState, {
        type: 'DISABLE',
        category: 'models',
        id: 'modelA',
      });
      expect(isDisabled(newState, 'models', 'modelA')).to.equal(true);
    });
  });

  describe('toggle hover', () => {
    it('should set hover to true', () => {
      const initialState = fromJS({ hovering: false });
      const newState = reducer(initialState, {
        type: 'TOGGLE_HOVER',
        value: true,
      });
      expect(newState.get('hovering')).to.equal(true);
      const newState2 = reducer(initialState, {
        type: 'TOGGLE_HOVER',
        value: true,
      });
      expect(newState2.get('hovering')).to.equal(true);
    });

    it('should set hover to false', () => {
      const initialState = fromJS({ hovering: true });
      const newState = reducer(initialState, {
        type: 'TOGGLE_HOVER',
        value: false,
      });
      expect(newState.get('hovering')).to.equal(false);
    });
  });
});
