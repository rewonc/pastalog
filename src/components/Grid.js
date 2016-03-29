import React, { PropTypes } from 'react';
import Series from './Series';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';

// Constants to set grid sizing relative to minimum and maximum points in the data
const MULTIPLIER = 2.0;
const BUFFER = 0.9;
const CONSTANT = 0.1;
const DEFAULT_WIDTH = 900;
const DEFAULT_HEIGHT = 500;

class Grid extends React.Component {
  /* This class instantiates series if data exists, or renders a blank grid if not.
  ** It also sets scale parameters. */
  constructor(props) {
    super(props);
    const { width, height } = this.getGridDims();
    this.state = {
      width,
      height,
      minX: -0.1,
      maxX: 2,
      minY: -0.1,
      maxY: 0.1,
    };
  }


  componentWillReceiveProps(nextProps) {
    const thisState = this.state;
    const newState = {};
    const props = this.props;
    _forEach(nextProps.logs, (series, modelName) => {
      _forEach(series, (list, seriesName) => {
        if (props.log !== undefined) {
          const model = props.log[modelName];
          if (model && model[seriesName] &&
              (model[seriesName].indices === list.indices)) {
            return;
          }
        }
        const xs = list.indices;
        const ys = list.values;
        const minX = xs.min();
        const maxX = xs.max();
        const minY = ys.min();
        const maxY = ys.max();
        if (minX < thisState.minX * BUFFER) {
          newState.minX = minX * MULTIPLIER - CONSTANT;
        }
        if (minY < thisState.minY * BUFFER) {
          newState.minY = minY * MULTIPLIER - CONSTANT;
        }
        if (maxX > thisState.maxX * BUFFER) {
          newState.maxX = maxX * MULTIPLIER + CONSTANT;
        }
        if (maxY > thisState.maxY * BUFFER) {
          newState.maxY = maxY * MULTIPLIER + CONSTANT;
        }
      });
    });
    this.setState(newState);
    console.log(JSON.stringify(newState));
  }

  getGridDims() {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  render() {
    return (
      <div className="grid relative clearfix border"
        style={{ width: this.state.width, height: this.state.height }}
      >
        <ul className="absolute top-0 right-0 m2">
          Legend goes here.
        </ul>
        {this.props.logs ? (
            _map(this.props.logs, (series, modelName) => (
              <div key={modelName} className="absolute top-0 left-0 max">
                {_map(series, (vals, seriesName) => (
                  <Series key={seriesName}
                    seriesName={seriesName} modelName={modelName} indices={vals.indices}
                    values={vals.values} {...this.state}
                  />))}
              </div>))
        ) : (<div className="no-series col col-4 border mt-3 mx-auto">No logs Yet</div>)}
      </div>
    );
  }
}

Grid.propTypes = {
  logs: PropTypes.object,
};

export default Grid;
