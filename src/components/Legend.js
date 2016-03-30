import React, { PropTypes } from 'react';
import { seriesMap, getUUID, stringToColor } from 'lib';

function Legend(props) {
  const legendItems = seriesMap(props.logs, (list, modelName, seriesName) => {
    const uuid = getUUID(modelName, seriesName);
    const color = stringToColor(uuid);
    const deactive = (
      (props.uniqueBlacklist[uuid] === true) ||
      (props.modelBlacklist[modelName] === true) ||
      (props.seriesBlacklist[seriesName] === true));
    function toggle() {
      console.log('toggled', !deactive);
      return props.updateUniqueBlacklist(uuid, !deactive);
    }
    return (
    <li key={uuid} onClick={toggle} className={deactive ? 'deactivated' : 'activated'}>
      <span style={{ color, fontSize: 32, lineHeight: 0.5 }}> &bull; </span>
      <span className="h6">{modelName} - {seriesName}</span>
    </li>);
  });

  return (
    <ul className="Legend absolute top-0 right-0 m2 list-reset z3">
      {legendItems}
    </ul>
  );
}

Legend.propTypes = {
  logs: PropTypes.object,
  modelBlacklist: PropTypes.object,
  seriesBlacklist: PropTypes.object,
  uniqueBlacklist: PropTypes.object,
  updateModelBlacklist: PropTypes.func,
  updateSeriesBlacklist: PropTypes.func,
  updateUniqueBlacklist: PropTypes.func,
};

export default Legend;
