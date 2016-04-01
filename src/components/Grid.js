import React, { PropTypes } from 'react';
import Series from './Series';
import ReactDOM from 'react-dom';
import Gridlines from './Gridlines';
import { mapEnabledSeries } from './../state/helpers.js';
import { getUUID } from 'lib';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.dispatchResize = this.dispatchResize.bind(this);
  }

  componentDidMount() {
    this.dispatchResize();
    window.addEventListener('resize', this.dispatchResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.dispatchResize);
  }

  onMouseEnter() {
    this.props.store.dispatch({
      type: 'TOGGLE_HOVER',
      value: true,
    });
  }

  onMouseLeave() {
    this.props.store.dispatch({
      type: 'TOGGLE_HOVER',
      value: false,
    });
  }

  onMouseMove(e) {
    const obj = e.target.getBoundingClientRect();
    this.props.store.dispatch({
      type: 'MOVE_HOVER',
      coords: {
        hoverX: e.clientX - obj.left,
        hoverY: e.clientY - obj.top,
      },
    });
  }

  dispatchResize() {
    const height = Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0);
    const width = ReactDOM.findDOMNode(this).getBoundingClientRect().width;
    console.log(height, width);
    this.props.store.dispatch({
      type: 'RESIZE',
      size: { width: width - 70, height: height - 70 },
    });
  }

  render() {
    const state = this.props.state;
    const logs = state.get('logs');
    const disabled = state.get('disabled');
    const width = state.getIn(['size', 'width']);
    const height = state.getIn(['size', 'height']);
    const scale = state.get('scale');

    return (
    <div className="Grid md-col md-col-10">
      <div className="relative Grid-well clearfix mt1 mr0 ml4 mb4"
        style={{ width, height }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
      >
        <Gridlines {...this.props} />
        {logs ? (
          mapEnabledSeries(logs, disabled, (modelName, seriesName, lists) => (
            <div key={getUUID(modelName, seriesName)} className="absolute top-0 left-0 max z2">
              <Series key={getUUID(modelName, seriesName)}
                seriesName={seriesName} modelName={modelName}
                indices={lists.get('indices')}
                values={lists.get('values')}
                scale={scale} width={width} height={height}
              />
            </div>)
          )
        ) : (<div className="no-series col col-4 border mt-3 mx-auto">No logs Yet</div>)}
      </div>
    </div>
    );
  }
}

Grid.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default Grid;
