import React, { PropTypes } from 'react';
import Series from './Series';
import ReactDOM from 'react-dom';
import Gridlines from './Gridlines';
import { mapEnabledSeries } from './../state/helpers.js';
import { getUUID } from 'lib';
import _throttle from 'lodash/throttle';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.scale = _throttle(this.scale.bind(this), 200, { leading: true, trailing: false });
    this.onWheel = this.onWheel.bind(this);
    this.dispatchResize = this.dispatchResize.bind(this);
  }

  componentDidMount() {
    this.dispatchResize();
    window.addEventListener('resize', this.dispatchResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.dispatchResize);
  }

  onMouseDown(e) {
    const store = this.props.store;
    store.dispatch({
      type: 'SET_DRAG',
      value: true,
    });
    store.dispatch({
      type: 'SET_ANCHORS',
      anchors: {
        x: e.clientX,
        y: e.clientY,
        scales: this.props.state.get('scale'),
      },
    });
  }

  onMouseUp() {
    this.props.store.dispatch({
      type: 'SET_DRAG',
      value: false,
    });
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
    this.props.store.dispatch({
      type: 'SET_DRAG',
      value: false,
    });
  }

  onWheel(e) {
    const delta = e.deltaY;
    e.preventDefault();
    if (Math.abs(delta) > 2) {
      this.scale(e.deltaY);
    }
  }

  onMouseMove(e) {
    const store = this.props.store;
    const state = this.props.state;
    const obj = e.target.getBoundingClientRect();
    const dragging = state.get('dragging');
    if (dragging) {
      const anchors = state.get('anchors');
      const scales = anchors.scales;
      // dy is reversed because of top down
      // Divide by factors to make scrolling less quick
      // Y by more because it feels faster
      const dx = (anchors.x - e.clientX) / 10;
      const dy = (e.clientY - anchors.y) / 50;
      store.dispatch({
        type: 'RESCALE',
        scale: {
          minX: scales.get('minX') + dx,
          minY: scales.get('minY') + dy,
          maxX: scales.get('maxX') + dx,
          maxY: scales.get('maxY') + dy,
        },
      });
      return;
    }
    store.dispatch({
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
    this.props.store.dispatch({
      type: 'RESIZE',
      size: { width: width - 70, height: height - 80 },
    });
  }

  scale(delta) {
    const scale = this.props.state.get('scale');
    const minX = scale.get('minX');
    const minY = scale.get('minY');
    const maxX = scale.get('maxX');
    const maxY = scale.get('maxY');
    const dx = (maxX - minX) / 20;
    const dy = (maxY - minY) / 20;
    if (delta < 0) {
      // zoom in
      this.props.store.dispatch({
        type: 'RESCALE',
        scale: {
          minX: minX + dx,
          minY: minY + dy,
          maxX: maxX - dx,
          maxY: maxY - dy,
        },
      });
    } else {
      this.props.store.dispatch({
        type: 'RESCALE',
        scale: {
          minX: minX - dx,
          minY: minY - dy,
          maxX: maxX + dx,
          maxY: maxY + dy,
        },
      });
      // zoom out
    }
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
      <div className="relative Grid-well clearfix mt1 mr0 ml4 mb2"
        style={{ width, height }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onWheel={this.onWheel}
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
        ) : (<div className="no-series max clearfix">
               <h3 className="center pt4 pb4 m4 border message">Waiting for data ...</h3>
             </div>)}
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
