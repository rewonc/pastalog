import React, { PropTypes } from 'react';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';
import { getUUID, stringToColor } from 'lib';
import { isSeriesEnabled, forEachSeries, isDisabled } from './../state/helpers';
import ScaleMenu from './ScaleMenu';

function Legend(props) {
  const state = props.state;
  const disabled = state.get('disabled');
  const logs = state.get('logs');
  if (logs === undefined) {
    return (<div></div>);
  }
  const seriesElements = [];
  const models = [];
  const types = [];

  forEachSeries(state.get('logs'), (modelName, seriesName) => {
    const uuid = getUUID(modelName, seriesName);
    const color = stringToColor(uuid);
    const enabled = isSeriesEnabled(disabled, modelName, seriesName);
    const toggle = () => {
      const type = (enabled) ? 'DISABLE' : 'ENABLE';
      props.store.dispatch({
        type,
        category: 'uniques',
        id: uuid,
      });
    };
    const deleteSeries = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const conf = window.confirm('Are you sure you want to ' +
        'delete this series? It will no longer appear, and any new data ' +
        'sent will create a new series.');
      console.log(conf);
    };
    const el = (
      <li key={uuid} className='clearfix'>
        <span className="h4" onClick={toggle} className={
          enabled ? 'activated buttonLink' : 'deactivated buttonLink'}
        >
          {modelName} - {seriesName}
        </span>
        <span className="h3 bold p0 m0 deleteButton buttonLink" onClick={deleteSeries}>&#215;</span>
        <span className="bullet left"
          style={{ color }}
        > &bull; </span>
      </li>
    );
    seriesElements.push(el);
    models.push(modelName);
    types.push(seriesName);
  });

  const modelElements = _map(_uniq(models), (modelName) => {
    const notEnabled = isDisabled(state, 'models', modelName);
    const type = (notEnabled) ? 'ENABLE' : 'DISABLE';
    const toggle = () => {
      props.store.dispatch({
        type,
        category: 'models',
        id: modelName,
      });
    };
    return (
      <li key={modelName} onClick={toggle} className="sub">
        <span className={`${notEnabled ? 'deactivated' : 'activated'} h4 buttonLink`}>
          {modelName}
        </span>
        <span className="bullet left">
          { notEnabled ? <span>&times;</span> : <span>&bull;</span> }
        </span>
      </li>
    );
  });

  const typeElements = _map(_uniq(types), (typeName) => {
    const notEnabled = isDisabled(state, 'series', typeName);
    const type = (notEnabled) ? 'ENABLE' : 'DISABLE';
    const toggle = () => {
      props.store.dispatch({
        type,
        category: 'series',
        id: typeName,
      });
    };
    return (
      <li key={typeName} onClick={toggle} className="sub">
        <span className={`${notEnabled ? 'deactivated' : 'activated'} h4 buttonLink`}>
          {typeName}
        </span>
        <span className="bullet left">
          { notEnabled ? <span>&times;</span> : <span>&bull;</span> }
        </span>
      </li>
    );
  });

  return (
  <div className="Legend md-col md-col-2">
    <div className="legend-menu" style={
      { maxHeight: `${state.getIn(['size', 'height']) * 0.85}px` }}
    >
    <h3 className="headlines h3">Series </h3>
    <ul className="m1 list-reset">
      {seriesElements}
    </ul>
    <h3 className="headlines h3">Models </h3>
    <ul className="m1 list-reset">
      {modelElements}
    </ul>
    <h3 className="headlines h3">Types </h3>
    <ul className="m1 list-reset">
      {typeElements}
    </ul>
    </div>
    <ScaleMenu {...props} />
  </div>
  );
}

Legend.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default Legend;
