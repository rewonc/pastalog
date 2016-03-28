import React, { PropTypes } from 'react';
import { List } from 'immutable';

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/

  shouldComponentUpdate(nextProps) {
    return ((nextProps.indices !== this.props.indices) ||
            (nextProps.values !== this.props.values));
  }

  render() {
    return (<div>
      {this.props.key}
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
  key: PropTypes.string,
};


export default Series;
