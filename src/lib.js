// Library for common server-client utilities

export function updateLog(database, point) {
  // Update a database with a new data point
  // This assumes that db has a key 'log' and mutates
  // that object in place.
  const db = database;
  const name = point.modelName;
  const type = point.pointType;
  const step = point.globalStep;
  const value = point.pointValue;
  if (db.logs[name] === undefined) {
    db.logs[name] = {};
  }
  if (db.logs[name][type] === undefined) {
    db.logs[name][type] = {
      values: [],
      indices: [],
    };
  }
  db.logs[name][type].values.push(value);
  db.logs[name][type].indices.push(step);
  return true;
}

export default {
  updateLog,
}
