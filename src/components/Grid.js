import React, { PropTypes } from 'react';
import Series from './Series';
import _map from 'lodash/map';

class Grid extends React.Component {
  /* This class instantiates series if data exists, or renders a blank grid if not.
  ** It also sets scale parameters. */
  constructor(props) {
    super(props);
    this.state = {
      yMin: 0,
      yMax: 1,
      xMin: 0,
      xMax: 80,
    };
  }

  render() {
    return (
      <div className="grid">
        {this.props.logs ? (
            _map(this.props.logs, (series, modelName) => (
              <div key={modelName}>
                <h3>{modelName}</h3>
                {_map(series, (vals, seriesName) => (
                  <Series key={seriesName}
                    seriesName={seriesName} modelName={modelName} indices={vals.indices}
                    values={vals.values} {...this.state}
                  />))}
              </div>))
        ) : (<div className="no-series">No logs Yet</div>)}
      </div>
    );
  }
}

Grid.propTypes = {
  logs: PropTypes.object,
};

export default Grid;
