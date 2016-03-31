import { fromJS } from 'immutable';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import reducer from '../src/state/reducer';
import { INITIAL_STATE } from '../src/state/actions';
import { isDisabled } from '../src/state/helpers';

describe('reducer actions', () => {
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
