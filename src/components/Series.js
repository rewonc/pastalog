import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor } from 'lib';
import _zip from 'lodash/zip';
import Point from './Point';

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/
  constructor(props) {
    super(props);
    this.uuid = `${this.props.modelName}/${this.props.seriesName}`;
    this.color = stringToColor(this.uuid);
  }

  shouldComponentUpdate(nextProps) {
    return ((nextProps.indices !== this.props.indices) ||
            (nextProps.values !== this.props.values));
  }

  render() {
    const intermediate = _zip(this.props.indices.toJS(), this.props.values.toJS());
    return (<svg className="series max absolute top-0 left-0">
      {intermediate.map((pair) => (
        <Point index={pair[0]} value={pair[1]} ratios={this.props.ratios}
          color={this.color} key={pair[0]}
        />
      ))}
    </svg>);
  }
}

Series.propTypes = {
  indices: PropTypes.instanceOf(List),
  values: PropTypes.instanceOf(List),
  seriesName: PropTypes.string,
  modelName: PropTypes.string,
  ratios: PropTypes.object,
};


export default Series;
