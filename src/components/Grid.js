import React, { PropTypes } from 'react';
import Series from './Series';
import Legend from './Legend';
import Gridlines from './Gridlines';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';
import _forEach from 'lodash/forEach';
import _merge from 'lodash/merge';
import _pickBy from 'lodash/pickBy';

// Constants to set grid sizing relative to minimum and maximum points in the data
const BUFFER = 0.01;
const PADDING = 0.1;
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
      minX: -0.05,
      maxX: 20,
      minY: -0.001,
      maxY: 0.5,
      modelBlacklist: { 'modelB': true },
      seriesBlacklist: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const thisState = this.state;
    const newState = {};
    const props = this.props;
    const newLogs = this.filterLogs(nextProps.logs);
    _forEach(newLogs, (series, modelName) => {
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
        const xRange = maxX - minX;
        const yRange = maxY - minY;
        if (minX < thisState.minX + BUFFER * xRange) {
          newState.minX = minX - PADDING * xRange;
        }
        if (minY < thisState.minY + BUFFER * yRange) {
          newState.minY = minY - PADDING * yRange;
        }
        if (maxX > thisState.maxX - BUFFER * xRange) {
          newState.maxX = maxX + PADDING * xRange;
        }
        if (maxY > thisState.maxY - BUFFER * yRange) {
          newState.maxY = maxY + PADDING * yRange;
        }
      });
    });
    this.setState(newState);
  }

  getGridDims() {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  filterLogs(logs) {
    if (!logs) return null;
    const modelBlacklist = this.state.modelBlacklist;
    const seriesBlacklist = this.state.seriesBlacklist;
    const models = _pickBy(logs, (series, modelName) =>
      modelBlacklist[modelName] !== true
    );
    const series = _mapValues(models, (seriesMap) =>
      _pickBy(seriesMap, (list, seriesName) =>
        seriesBlacklist[seriesName] !== true
      )
    );
    return series;
  }

  updateModelBlacklist(key, val) {
    this.setState({ modelBlacklist: _merge({ [key]: val }, this.state.modelBlacklist) });
  }

  updateSeriesBlacklist(key, val) {
    this.setState({ seriesBlacklist: _merge({ [key]: val }, this.state.seriesBlacklist) });
  }

  render() {
    const logs = this.props.logs;
    const modelBlacklist = this.state.modelBlacklist;
    const seriesBlacklist = this.state.seriesBlacklist;
    const filteredLogs = this.filterLogs(logs);
    console.log(filteredLogs);
    return (
      <div className="grid relative clearfix border m3"
        style={{ width: this.state.width, height: this.state.height }}
      >
        <Legend logs={logs} modelBlacklist={modelBlacklist}
          updateModelBlacklist={this.updateModelBlacklist}
          seriesBlacklist={seriesBlacklist}
          updateSeriesBlacklist={this.updateSeriesBlacklist}
        />
        <Gridlines {...this.state} />
        {filteredLogs ? (
            _map(filteredLogs, (series, modelName) => (
              <div key={modelName} className="absolute top-0 left-0 max z2">
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
