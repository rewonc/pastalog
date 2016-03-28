import React, { PropTypes } from 'react';


const Point = (props) => {
  const ratios = props.ratios;
  const minX = ratios.minX;
  const minY = ratios.minY;
  const deltaX = ratios.maxX - minX;
  const deltaY = ratios.maxY - minY;
  let x = props.index;
  let y = props.value;
  x = (x - minX) / deltaX * 100;
  y = (y - minY) / deltaY * 100;
  return (<circle r="1" stroke={props.color}
    cx={`${x}%`}
    cy={`${y}%`}
  />);
};

Point.propTypes = {
  index: PropTypes.number,
  value: PropTypes.number,
  ratios: PropTypes.object, // contains minX, minY, maxX, maxY values
  color: PropTypes.string,
};

export default Point;
