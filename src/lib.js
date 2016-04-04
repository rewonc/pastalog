// Library for common server-client utilities
import _map from 'lodash/map';


export function round2(input) {
  return Math.round(input * 100) / 100;
}

export function rightPadDecimals2(input) {
  const number = round2(input);
  const str = number.toString();
  const splits = str.split('.');
  if (splits[1] === undefined) {
    return `${str}.00`;
  }
  if (splits[1].length === 1) {
    return `${str}0`;
  }
  return str;
}

export function convertScales(list, minIn, maxIn, minOut, maxOut, options = {}) {
  const deltaIn = maxIn - minIn;
  const deltaOut = maxOut - minOut;
  if (options.invert === true) {
    return _map(list, (val) => ((1 - (val - minIn) / deltaIn) * deltaOut + minOut));
  }
  return _map(list, (val) => ((val - minIn) / deltaIn * deltaOut + minOut));
}

export function getUUID(modelName, seriesName) {
  return `${modelName}/${seriesName}`;
}

/*
String to Color representation comes from:
http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
*/

function hashCode(str) {
  let i;
  let chr;
  let len;
  let hash = 0;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}

function intToHex(i) {
  let hex = ((i >> 24) & 0xFF).toString(16).slice(-2) +
              ((i >> 16) & 0xFF).toString(16).slice(-2) +
              ((i >> 8) & 0xFF).toString(16).slice(-2) +
              (i & 0xFF).toString(16).slice(-2);
  hex = hex.slice(-6);
  while (hex.length < 6) {
    hex = `0${hex}`;
  }
  return `#${hex}`;
}

export function stringToColor(str) {
  return intToHex(hashCode(str));
}

/*
End String to Color
*/

export default {
  stringToColor, getUUID, convertScales, rightPadDecimals2, round2,
};
