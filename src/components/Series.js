import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor } from 'lib';

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
    return (<div className="series">
      <h3 style={{ color: this.color }}>{this.props.seriesName}</h3>
      <br />
      {JSON.stringify(this.props.values)}
      <br />
      {JSON.stringify(this.props.indices)}
    </div>);
  }
}

Series.propTypes = {
  indices: PropTypes.instanceOf(List),
  values: PropTypes.instanceOf(List),
  seriesName: PropTypes.string,
  modelName: PropTypes.string,
  xMin: PropTypes.number,
  xMax: PropTypes.number,
  yMin: PropTypes.number,
  yMax: PropTypes.number,
};


export default Series;
