import React, { PropTypes } from 'react';
import _range from 'lodash/range';
import _zip from 'lodash/zip';
import _map from 'lodash/map';
import { convertScales } from 'lib';

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
        top: `${height + 10}px`,
        left: `${location - 10}px`,
        height: '10px',
        fontSize: '10px',
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
      top: `${location - 5}px`,
      left: '-30px',
      height: '10px',
      fontSize: '10px',
      width: '20px',
    };
    return (
    <div key={`${idx}-${horizontal}`} className="gridMark center" style={style}>
      {Math.round(value * 100) / 100}
    </div>);
  });
}

const NUM_MARKINGS_X = 10;
const NUM_MARKINGS_Y = 6;
const SHOW_LINES_X = false;
const SHOW_LINES_Y = true;

const Gridlines = (props) => (
  <div className="absolute top-0 left-0 max z1">
    {getMarkings({
      min: props.minX,
      max: props.maxX,
      height: props.height,
      width: props.width,
      horizontal: true,
      showLines: SHOW_LINES_X,
      numMarkings: NUM_MARKINGS_X,
    })}
    {getMarkings({
      min: props.minY,
      max: props.maxY,
      width: props.width,
      height: props.height,
      horizontal: false,
      showLines: SHOW_LINES_Y,
      numMarkings: NUM_MARKINGS_Y,
    })}
  </div>
);

Gridlines.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  minX: PropTypes.number,
  maxX: PropTypes.number,
  minY: PropTypes.number,
  maxY: PropTypes.number,
};

export default Gridlines;
