// Module for adding fake data

function doNegativeLog(step, bias) {
  const noise = Math.random() + bias;
  const fraction = (step + 1) / 15000;
  const val = -1 * Math.log(fraction);
  return val + (noise - 0.5) * 1;
}

function getAccuracy(step, bias) {
  const noise = Math.random() + bias;
  const fraction = (step + 1) / 15000;
  return fraction + (noise - 0.5) * 0.3;
}

function addNewData(dbfunc, modelName, rate, bias, step = 0, repeat = false) {
  dbfunc({
    modelName,
    pointType: 'trainLoss',
    pointValue: doNegativeLog(step, bias),
    globalStep: step,
  });

  if (step !== 0 && step % 20 === 0) {
    dbfunc({
      modelName,
      pointType: 'validLoss',
      pointValue: doNegativeLog(step, bias + 0.2),
      globalStep: step,
    });
    dbfunc({
      modelName,
      pointType: 'validAccuracy',
      pointValue: getAccuracy(step, bias),
      globalStep: step,
    });
  }

  if (repeat) {
    setTimeout(() => {
      addNewData(dbfunc, modelName, rate, bias, step + 1, true);
    }, rate);
  }
}


export default function fakeData({ addDataPoint }) {
  const nStartPoints = 200;

  for (let i = 0; i < nStartPoints; i++) {
    addNewData(addDataPoint, 'modelA', null, 0.25, i, false);
    addNewData(addDataPoint, 'modelB', null, 0.1, i, false);
    addNewData(addDataPoint, 'modelC', null, -0.05, i, false);
    addNewData(addDataPoint, 'modelD', null, 0, i, false);
  }

  // generate fake data
  addNewData(addDataPoint, 'modelA', 1500, 0.25, nStartPoints, true);
  addNewData(addDataPoint, 'modelB', 2000, 0.1, nStartPoints, true);
  addNewData(addDataPoint, 'modelC', 1800, -0.05, nStartPoints, true);
  addNewData(addDataPoint, 'modelD', 1900, -0.20, nStartPoints, true);
  // end generate fake data
}
