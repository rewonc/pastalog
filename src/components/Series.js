import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { stringToColor, convertScales, getUUID } from 'lib';
import _zip from 'lodash/zip';
import _filter from 'lodash/filter';

const MAX_POINTS_IN_SERIES = 1000;
const WIDTH_FRACTION_CANDLES = 200;

function normalSeries(pairs, color, uuid) {
  return (<svg className="series max absolute top-0 left-0">
    {
    pairs.map((pair) => (
      <circle r="1" fill={color} stroke="0" cx={pair[0]}
        cy={pair[1]} key={uuid + pair[0]} className="no-pointer"
      />))
    }
    <polyline style={{ strokeWidth: 1, stroke: color, fill: 'none' }}
      points={pairs.map((v) => v.join(',')).join(' ')} className="no-pointer"
    />
  </svg>);
}

function candleStick(pairs, color, uuid, width) {
  const step = width / WIDTH_FRACTION_CANDLES; // 3
  const candles = [];
  const size = pairs.length;
  let index = 0;
  for (let x1 = step; x1 <= width && index < size; x1 += step) {
    const values = [];
    while (size > index && pairs[index][0] < x1) {
      values.push(pairs[index][1]);
      index += 1;
    }
    const len = values.length;
    if (len > 0) {
      values.sort((a, b) => a - b);
      candles.push({
        len,
        min: values[0],
        max: values[len - 1],
        median: values[Math.floor(len / 2)],
        first: values[Math.floor(len / 4)],
        third: values[Math.floor(len / 4 * 3)],
        left: x1 - step,
        width: step,
        midX: x1 - step / 2,
      });
    }
  }
  return (<svg
    className="series max absolute top-0 left-0 candlesticks"
  >
    {candles.map((candle, idx) => ([
      <line key={`${uuid}-${idx}-0`} y1={candle.min} y2={candle.first}
        x1={candle.midX} x2={candle.midX}
        style={{
          strokeWidth: 1,
          stroke: color,
        }}
        className="no-pointer"
      />,
      <line key={`${uuid}-${idx}-1`} y1={candle.third} y2={candle.max}
        x1={candle.midX} x2={candle.midX}
        style={{
          strokeWidth: 1,
          stroke: color,
        }}
        className="no-pointer"
      />,
      <rect key={`${uuid}-${idx}-2`} width={candle.width} height={candle.third - candle.first}
        x={candle.left} y={candle.first}
        style={{
          strokeWidth: 1,
          stroke: color,
          fill: 'none',
        }}
        className="no-pointer"
      >
      </rect>,
      <rect key={`${uuid}-${idx}-3`} width={candle.width} height="3"
        x={candle.left} y={candle.median - 1.5}
        style={{
          fill: color,
        }}
        className="no-pointer"
      >
      </rect>,
    ]
    ))}
  </svg>);
}

class Series extends React.Component {
  /* This class displays a line corresponding to a series.*/

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    return ((nextProps.indices !== props.indices) ||
            (nextProps.values !== props.values) ||
            (nextProps.scale !== props.scale) ||
            (nextProps.width !== props.width) ||
            (nextProps.height !== props.height));
  }

  render() {
    const props = this.props;
    const uuid = getUUID(props.modelName, props.seriesName);
    const color = stringToColor(uuid);
    const scale = props.scale;
    const maxX = scale.get('maxX');
    const minX = scale.get('minX');
    const maxY = scale.get('maxY');
    const minY = scale.get('minY');
    const width = props.width;
    const height = props.height;

    const indices = convertScales(props.indices.toJS(),
      minX, maxX, 0, width);
    const values = convertScales(props.values.toJS(),
      minY, maxY, 0, height, { invert: true });
    const pairs = _filter(_zip(indices, values), (pair) =>
      (pair[0] > 0) && (pair[0] < width)
    );
    if (pairs.length > MAX_POINTS_IN_SERIES) {
      return candleStick(pairs, color, uuid, width);
    }
    return normalSeries(pairs, color, uuid);
  }
}

Series.propTypes = {
  indices: PropTypes.instanceOf(List),
  values: PropTypes.instanceOf(List),
  seriesName: PropTypes.string,
  modelName: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  scale: PropTypes.object,
};


export default Series;
