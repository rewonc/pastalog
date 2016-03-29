import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor, convertScales, getUUID } from 'lib';
import _zip from 'lodash/zip';

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/
  constructor(props) {
    super(props);
    this.uuid = getUUID(props.modelName, props.seriesName);
    this.color = stringToColor(this.uuid);
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    return ((nextProps.minX !== props.minX) ||
            (nextProps.minY !== props.minY) ||
            (nextProps.maxX !== props.maxX) ||
            (nextProps.maxY !== props.maxY) ||
            (nextProps.width !== props.width) ||
            (nextProps.height !== props.height) ||
            (nextProps.indices !== props.indices) ||
            (nextProps.values !== props.values));
  }

  render() {
    const props = this.props;
    const indices = convertScales(props.indices.toJS(), props.minX,
        props.maxX, 0, props.width);
    // pass invert: true for Y values because pixel values go top down
    const values = convertScales(props.values.toJS(), props.minY,
        props.maxY, 0, props.height, { invert: true });
    const pairs = _zip(indices, values);
    return (<svg className="series max absolute top-0 left-0">
      {pairs.map((pair) => (
        <circle r="2" fill={this.color} stroke="0" cx={pair[0]}
          cy={pair[1]} key={pair[0]}
        />
      ))}
      <polyline style={{ strokeWidth: 1, stroke: this.color, fill: 'none' }}
        points={pairs.map((v) => v.join(',')).join(' ')}
      />
    </svg>);
  }
}

Series.propTypes = {
  indices: PropTypes.instanceOf(List),
  values: PropTypes.instanceOf(List),
  seriesName: PropTypes.string,
  modelName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  minX: PropTypes.number,
  minY: PropTypes.number,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
};


export default Series;
