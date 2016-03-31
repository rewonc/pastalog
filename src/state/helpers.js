import { Map } from 'immutable';

export function isDisabled(state, category, id) {
  return (state.get('disabled', Map()).
    get(category, Map()).
    get(id, false) === true);
}
