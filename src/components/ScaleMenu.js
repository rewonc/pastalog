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
      <li>minX: &nbsp;
        <span className="adjust">[-]</span>
        <input className="center" value={minX} />
        <span className="adjust">[+]</span>
      </li>
      <li>maxX: &nbsp;
        <span className="adjust">[-]</span>
        <input className="center" value={maxX} />
        <span className="adjust">[+]</span>
      </li>
      <li>minY: &nbsp;
        <span className="adjust">[-]</span>
        <input className="center" value={minY} />
        <span className="adjust">[+]</span>
      </li>
      <li>maxY: &nbsp;
        <span className="adjust">[-]</span>
        <input className="center" value={maxY} />
        <span className="adjust">[+]</span>
      </li>
      <li className="mt2"> auto adjust: &nbsp;
        <span className="adjust buttonLink underline">on</span>
      </li>
    </ul>) : null}
  </div>);
}

ScaleMenu.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default ScaleMenu;
