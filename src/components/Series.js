import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor, convertScales, getUUID } from 'lib';
import _zip from 'lodash/zip';

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    return ((nextProps.indices !== props.indices) ||
            (nextProps.values !== props.values) ||
            (nextProps.scale !== props.scale) ||
            (nextProps.width !== props.width) ||
            (nextProps.height !== props.height));
  }

  render() {
    const props = this.props;
    const uuid = getUUID(props.modelName, props.seriesName);
    const color = stringToColor(uuid);
    const scale = props.scale;
    const maxX = scale.get('maxX');
    const minX = scale.get('minX');
    const maxY = scale.get('maxY');
    const minY = scale.get('minY');
    const width = props.width;
    const height = props.height;

    const indices = convertScales(props.indices.toJS(),
      minX, maxX, 0, width);
    const values = convertScales(props.values.toJS(),
      minY, maxY, 0, height, { invert: true });
    const pairs = _zip(indices, values);
    return (<svg className="series max absolute top-0 left-0">
      {
      pairs.map((pair) => (
        <circle r="1" fill={color} stroke="0" cx={pair[0]}
          cy={pair[1]} key={uuid + pair[0]}
        />
      ))
      }
      <polyline style={{ strokeWidth: 1, stroke: color, fill: 'none' }}
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
  scale: PropTypes.object,
};


export default Series;
