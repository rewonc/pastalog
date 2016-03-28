import React, { PropTypes } from 'react';
import Series from './Series';
import _map from 'lodash/map';

const Grid = (props) => (
  /* This class instantiates series if data exists, or renders a blank grid if not.
  ** It also sets scale parameters. */
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

Grid.propTypes = {
  logs: PropTypes.object,
};

export default Grid;
