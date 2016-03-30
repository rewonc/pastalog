import React, { PropTypes } from 'react';
import { seriesMap, getUUID, stringToColor } from 'lib';

function Legend(props) {
  const legendItems = seriesMap(props.logs, (list, modelName, seriesName) => {
    const uuid = getUUID(modelName, seriesName);
    const color = stringToColor(uuid);
    return (
    <li key={uuid}>
      <span style={{ color, fontSize: 32, lineHeight: 0.5 }}> &bull; </span>
      {modelName} - {seriesName}
    </li>);
  });

  return (
    <ul className="absolute top-0 right-0 m2 list-reset z3">
      {legendItems}
    </ul>
  );
}

Legend.propTypes = {
  logs: PropTypes.object,
};

export default Legend;
