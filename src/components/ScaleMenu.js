import React, { PropTypes } from 'react';
import { round2 } from 'lib';

function ScaleMenu(props) {
  const state = props.state;
  const isMenuShown = state.get('scaleMenu') === true;
  const noAutoUpdate = state.get('noAutoUpdate') === true;
  const toggle = () => {
    props.store.dispatch({
      type: 'TOGGLE_SCALE_MENU',
    });
  };
  const toggleUpdate = () => {
    props.store.dispatch({
      type: 'TOGGLE_AUTO_UPDATE',
    });
  };
  const minX = round2(state.getIn(['scale', 'minX']));
  const minY = round2(state.getIn(['scale', 'minY']));
  const maxX = round2(state.getIn(['scale', 'maxX']));
  const maxY = round2(state.getIn(['scale', 'maxY']));

  const stepX = (maxX - minX) / 10;
  const stepY = (maxY - minY) / 10;
  const change = (str) => (ev) => {
    props.store.dispatch({
      type: 'RESCALE',
      scale: {
        [str]: ev.target.value,
      },
    });
  };

  const stepUp = (name, amount) => (e) => {
    e.preventDefault();
    const qty = state.getIn(['scale', name]);
    props.store.dispatch({
      type: 'RESCALE',
      scale: {
        [name]: qty + amount,
      },
    });
  };

  const stepDown = (name, amount) => (e) => {
    e.preventDefault();
    const qty = state.getIn(['scale', name]);
    props.store.dispatch({
      type: 'RESCALE',
      scale: {
        [name]: qty - amount,
      },
    });
  };

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
        <span className="adjust" onClick={stepDown('minX', stepX)}>[-]</span>
        <input type="number" className="center"
          value={minX} onChange={change('minX')}
          step={stepX}
        />
        <span className="adjust" onClick={stepUp('minX', stepX)}>[+]</span>
      </li>
      <li>maxX: &nbsp;
        <span className="adjust" onClick={stepDown('maxX', stepX)}>[-]</span>
        <input type="number" className="center"
          value={maxX} onChange={change('maxX')}
          step={stepX}
        />
        <span className="adjust" onClick={stepUp('maxX', stepX)}>[+]</span>
      </li>
      <li>minY: &nbsp;
        <span className="adjust" onClick={stepDown('minY', stepY)}>[-]</span>
        <input type="number" className="center"
          value={minY} onChange={change('minY')}
          step={stepY}
        />
        <span className="adjust" onClick={stepUp('minY', stepY)}>[+]</span>
      </li>
      <li>maxY: &nbsp;
        <span className="adjust" onClick={stepDown('maxY', stepY)}>[-]</span>
        <input type="number" className="center"
          value={maxY} onChange={change('maxY')}
          step={stepY}
        />
        <span className="adjust" onClick={stepUp('maxY', stepY)}>[+]</span>
      </li>
      <li className="mt2"> auto adjust: &nbsp;
        { (noAutoUpdate) ?
          <span className="buttonLink underline" onClick={toggleUpdate}>off</span> :
          <span className="adjust buttonLink underline" onClick={toggleUpdate}>on</span>
        }
      </li>
    </ul>) : null}
  </div>);
}

ScaleMenu.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default ScaleMenu;
