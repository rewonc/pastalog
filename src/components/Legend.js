import React, { PropTypes } from 'react';
import { getUUID, stringToColor } from 'lib';
import { isSeriesEnabled, forEachSeries, isDisabled } from './../state/helpers';
import _uniq from 'lodash/uniq';
import _map from 'lodash/map';

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
    const el = (
      <li key={uuid} onClick={toggle}
        className={enabled ? 'activated clearfix' : 'deactivated clearfix'}
      >
        <span className="h4">{modelName} - {seriesName}</span>
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
      <li key={modelName}
        onClick={toggle} className={notEnabled ? 'deactivated sub' : 'activated sub'}
      >
        <span className="h4">{modelName}</span>
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
      <li key={typeName} onClick={toggle}
        className={notEnabled ? 'deactivated sub' : 'activated sub'}
      >
        <span className="h4">{typeName}</span>
        <span className="bullet left">
          { notEnabled ? <span>&times;</span> : <span>&bull;</span> }
        </span>
      </li>
    );
  });

  return (
  <div className="Legend md-col md-col-2">
    <h3 className="headlines h3">Series <small className="h6">
      <span className="buttonLink">show all</span> / <span className="buttonLink">hide all</span>
    </small></h3>
    <ul className="m1 list-reset">
      {seriesElements}
    </ul>
    <h3 className="headlines h3">Models <small className="h6">show all / hide all</small></h3>
    <ul className="m1 list-reset">
      {modelElements}
    </ul>
    <h3 className="headlines h3">Types <small className="h6">show all / hide all</small></h3>
    <ul className="m1 list-reset">
      {typeElements}
    </ul>
  </div>
  );
}

Legend.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default Legend;
