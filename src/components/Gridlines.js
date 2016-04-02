import React, { PropTypes } from 'react';
import _range from 'lodash/range';
import _zip from 'lodash/zip';
import _map from 'lodash/map';
import { convertScales } from 'lib';


function rightPadDecimals2(number) {
  const str = number.toString();
  const splits = str.split('.');
  if (splits[1] === undefined) {
    return str + '.00';
  }
  if (splits[1].length === 1) {
    return str + '0';
  }
  return str;
}


function getMarkings({ min, max, width, height, horizontal, showLines, numMarkings }) {
  // hack: add epsilon to max range in order to be inclusive rather than exclusive
  const step = (max - min) / numMarkings;
  const values = _range(min, max + step / 2, step);
  let scale = height;
  if (horizontal) {
    scale = width;
  }
  const pixelLocation = convertScales(values, min, max, 0, scale, { invert: !horizontal });
  const pairs = _zip(values, pixelLocation);
  if (horizontal) {
    return _map(pairs, ([value, location], idx) => {
      const style = {
        position: 'absolute',
        top: `${height + 5}px`,
        left: `${location - 10}px`,
        height: '10px',
        width: '20px',
      };
      return (
      <div key={`${idx}-${horizontal}`} className="gridMark center" style={style}>
        {Math.round(value)}
      </div>);
    });
  }
  return _map(pairs, ([value, location], idx) => {
    const style = {
      position: 'absolute',
      top: `${location - 11}px`,
      left: '-40px',
      height: '10px',
      width: '20px',
      pointerEvents: 'none',
    };
    return (
    <div key={`${idx}-${horizontal}`} className="gridMark center" style={style}>
      {Math.round(value * 100) / 100}
    </div>);
  });
}

function getMark({ position, horizontal, min, max, height, width }) {
  let value = null;
  if (horizontal) {
    value = position / width;
  } else {
    value = 1 - (position / height);
  }
  value = value * (max - min) + min;
  if (horizontal) {
    return (
    <div key="activeMarkX" className="gridMark center current bold x"
      style={{
        position: 'absolute',
        top: `${height + 5}px`,
        left: `${position - 10}px`,
        height: '10px',
        width: '20px',
      }}
    >
      <span className="textElement">{Math.round(value)}</span>
    </div>);
  }
  return (
  <div key="activeMarkY" className="gridMark center current bold y"
    style={{
      position: 'absolute',
      top: `${position - 11}px`,
      left: '-40px',
      height: '10px',
      width: '20px',
    }}
  >
    <span className="textElement">{rightPadDecimals2(Math.round(value * 100) / 100)}</span>
  </div>);
}


const NUM_MARKINGS_X = 10;
const NUM_MARKINGS_Y = 6;
const SHOW_LINES_X = false;
const SHOW_LINES_Y = true;

const Gridlines = (props) => {
  const state = props.state;
  const currentlyHovering = state.get('hovering');
  const hoverPosition = state.get('hoverPosition');
  const scale = state.get('scale');
  const dims = state.get('size');
  const height = dims.get('height');
  const width = dims.get('width');
  const minX = scale.get('minX');
  const maxX = scale.get('maxX');
  const minY = scale.get('minY');
  const maxY = scale.get('maxY');
  const hoverX = hoverPosition.get('hoverX');
  const hoverY = hoverPosition.get('hoverY');
  return (
    <div className="absolute top-0 left-0 max z1">
      {getMarkings({
        width, height,
        min: minX,
        max: maxX,
        horizontal: true,
        showLines: SHOW_LINES_X,
        numMarkings: NUM_MARKINGS_X,
      })}
      {getMarkings({
        width, height,
        min: minY,
        max: maxY,
        horizontal: false,
        showLines: SHOW_LINES_Y,
        numMarkings: NUM_MARKINGS_Y,
      })}
      {currentlyHovering ? (getMark({
        width, height,
        position: hoverX,
        horizontal: true,
        min: minX,
        max: maxX,
      })) : <div></div>}
      {currentlyHovering ? (getMark({
        width, height,
        position: hoverY,
        horizontal: false,
        min: minY,
        max: maxY,
      })) : <div></div>}
    </div>
  );
};

Gridlines.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default Gridlines;
