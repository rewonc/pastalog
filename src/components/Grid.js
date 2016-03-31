import React, { PropTypes } from 'react';
import Series from './Series';
import Legend from './Legend';
import Gridlines from './Gridlines';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';
import _forEach from 'lodash/forEach';
import _assign from 'lodash/assign';
import _pickBy from 'lodash/pickBy';
import { getUUID } from 'lib';

// Constants to set grid sizing relative to minimum and maximum points in the data
const BUFFER = 0.001;
const PADDING = 0.05;
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
      modelBlacklist: { modelB: true },
      seriesBlacklist: {},
      uniqueBlacklist: {},
      currentlyHovering: false,
      hoverX: 0,
      hoverY: 0,
    };
    this.updateModelBlacklist = this.updateModelBlacklist.bind(this);
    this.updateSeriesBlacklist = this.updateSeriesBlacklist.bind(this);
    this.updateUniqueBlacklist = this.updateUniqueBlacklist.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
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
        // for now, skip resizing min X as it shouldn't be below 0.
        // if (minX < thisState.minX + BUFFER * xRange) {
        //   newState.minX = minX - PADDING * xRange;
        // }
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

  onMouseEnter() {
    this.setState({ currentlyHovering: true });
  }

  onMouseLeave() {
    this.setState({ currentlyHovering: false });
  }

  onMouseMove(e) {
    const obj = e.target.getBoundingClientRect();
    this.setState({
      hoverX: e.clientX - obj.left,
      hoverY: e.clientY - obj.top,
    });
  }

  getGridDims() {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  filterLogs(logs) {
    if (!logs) return null;
    const modelBlacklist = this.state.modelBlacklist;
    const seriesBlacklist = this.state.seriesBlacklist;
    const uniqueBlacklist = this.state.uniqueBlacklist;
    const models = _pickBy(logs, (series, modelName) =>
      modelBlacklist[modelName] !== true
    );
    const series = _mapValues(models, (seriesMap, modelName) =>
      _pickBy(seriesMap, (list, seriesName) => {
        const uuid = getUUID(modelName, seriesName);
        return (
          seriesBlacklist[seriesName] !== true &&
          uniqueBlacklist[uuid] !== true
        );
      })
    );
    return series;
  }

  updateModelBlacklist(key, val) {
    this.setState({ modelBlacklist: _assign({}, this.state.modelBlacklist, { [key]: val }) });
  }

  updateSeriesBlacklist(key, val) {
    this.setState({ seriesBlacklist: _assign({}, this.state.seriesBlacklist, { [key]: val }) });
  }

  updateUniqueBlacklist(key, val) {
    this.setState({ uniqueBlacklist: _assign({}, this.state.uniqueBlacklist, { [key]: val }) });
  }

  render() {
    const logs = this.props.logs;
    const modelBlacklist = this.state.modelBlacklist;
    const seriesBlacklist = this.state.seriesBlacklist;
    const uniqueBlacklist = this.state.uniqueBlacklist;
    const filteredLogs = this.filterLogs(logs);
    return (
      <div className="grid relative clearfix border m3"
        style={{ width: this.state.width, height: this.state.height }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
      >
        <Legend logs={logs}
          modelBlacklist={modelBlacklist}
          updateModelBlacklist={this.updateModelBlacklist}
          seriesBlacklist={seriesBlacklist}
          updateSeriesBlacklist={this.updateSeriesBlacklist}
          uniqueBlacklist={uniqueBlacklist}
          updateUniqueBlacklist={this.updateUniqueBlacklist}
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
