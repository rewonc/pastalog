import { describe, before, it } from 'mocha';
import { expect } from 'chai';
import reducer from '../src/state/reducer';
import INITIAL_STATE from '../src/state/actions';
import { fromJS } from 'immutable';

describe('reducer actions', () => {
  describe('rescale', () => {
    it('should update values for scale', () => {
      const initialState = fromJS({ scale: {} });
      const newScale = { xMin: 10, yMin: 20, xMax: 30, yMax: 40 };
      const newState = reducer(initialState, {
        type: 'RESCALE',
        scale: newScale,
      });
      expect(newState.get('scale')).to.equal(fromJS(newScale));
    });


  });
});
