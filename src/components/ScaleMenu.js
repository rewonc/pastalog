import React, { PropTypes } from 'react';
import { rightPadDecimals2 } from 'lib';

function ScaleMenu(props) {
  const state = props.state;
  const isMenuShown = state.get('scaleMenu') === true;
  const toggle = () => {
    props.store.dispatch({
      type: 'TOGGLE_SCALE_MENU',
    });
  };
  const minX = rightPadDecimals2(state.getIn(['scale', 'minX']));
  const minY = rightPadDecimals2(state.getIn(['scale', 'minY']));
  const maxX = rightPadDecimals2(state.getIn(['scale', 'maxX']));
  const maxY = rightPadDecimals2(state.getIn(['scale', 'maxY']));

  return (<div className="ScaleMenu">
    <h3 className="headlines h3 buttonLink mb0" onClick={toggle}>
      {(isMenuShown) ? (
        <span className="h6 alert">
          &#9660;
        </span>) : (<span className="h6 alert">
          &#9654;
        </span>)}
        &nbsp; Scale
    </h3>
    {isMenuShown ? (<ul className="list-reset m0">
      <li>minX:
        <input value={minX} />
      </li>
      <li>maxX:
        <input value={maxX} />
      </li>
      <li>minY:
        <input value={minY} />
      </li>
      <li>maxY:
        <input value={maxY} />
      </li>
    </ul>) : null}
  </div>);
}

ScaleMenu.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default ScaleMenu;
