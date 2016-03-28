import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor, convertScales } from 'lib';
import _zip from 'lodash/zip';

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/
  constructor(props) {
    super(props);
    this.uuid = `${this.props.modelName}/${this.props.seriesName}`;
    this.color = stringToColor(this.uuid);
    console.log(this.color);
  }

  shouldComponentUpdate(nextProps) {
    return ((nextProps.indices !== this.props.indices) ||
            (nextProps.values !== this.props.values));
  }

  render() {
    const ratios = this.props.ratios;
    const indices = convertScales(this.props.indices.toJS(), ratios.minX,
        ratios.maxX, 0, this.props.width);
    const values = convertScales(this.props.values.toJS(), ratios.minY,
        ratios.maxY, 0, this.props.height);
    const pairs = _zip(indices, values);
    return (<svg className="series max absolute top-0 left-0">
      {pairs.map((pair) => (
        <circle r="3" fill={this.color} stroke="0" cx={pair[0]}
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
  ratios: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};


export default Series;
