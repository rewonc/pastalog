import React, { PropTypes } from 'react';
import Series from './Series';
import _map from 'lodash/map';

const Container = (props) => (
  props.logs ? (<div>
      {_map(props.logs, (series, modelName) => (
        <div key={modelName}>
          <h3>{modelName}</h3>
          {_map(series, (vals, seriesName) => (
            <Series key={seriesName} indices={vals.indices} values={vals.values} />)
          )}</div>)
      )}
    </div>) : (<div>No logs Yet</div>)
);

Container.propTypes = {
  logs: PropTypes.object,
};

export default Container;
