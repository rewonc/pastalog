import React, { PropTypes } from 'react';


function ScaleMenu(props) {
  const state = props.state;
  const isMenuShown = state.get('scaleMenu') === true;
  const toggle = () => {
    props.store.dispatch({
      type: 'TOGGLE_SCALE_MENU',
    });
  };
  return (<div className="ScaleMenu">
    <h3 className="headlines h3 buttonLink" onClick={toggle}>
      {(isMenuShown) ? (
        <span className="h6 alert">
          &#9660;
        </span>) : (<span className="h6 alert">
          &#9654;
        </span>)}
        &nbsp; Scale
    </h3>
    {isMenuShown ? (<ul>
      <li>minX:</li>
      <li>maxX:</li>
      <li>minY:</li>
      <li>maxY:</li>
    </ul>) : null}
  </div>);
}

ScaleMenu.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default ScaleMenu;
