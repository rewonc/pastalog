var PORT = 8120;
var DATABASE = 'database.json';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var _ = require('lodash');
app.use(bodyParser.json());

var db = {};
db.logs = {};

// generate fake data
addNewData('modelA', 3000);
addNewData('modelB', 3200);
addNewData('modelC', 2800);
function addNewData(modelName, rate, step) {
  if (step === undefined) {
    step = 0;
  }
  addDataPoint({
    modelName: modelName,
    pointType: 'trainLoss',
    pointValue: Math.random(),
    globalStep: step
  });

  if (step !== 0 && step % 20 === 0) {
    addDataPoint({
      modelName: modelName,
      pointType: 'validLoss',
      pointValue: Math.random(),
      globalStep: step
    });
  }

  setTimeout(function () {
    addNewData(modelName, rate, step + 1);
  }, rate);
}
// end generate fake data


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/data', function(req, res) {
  // to post using curl:
  // curl -H "Content-Type: application/json" -X POST -d '{"modelName":"model1","pointType":"validLoss", "pointValue": 2.5, "globalStep": 1}' http://localhost:8120/data
  if (req.body.modelName === undefined ||
      req.body.pointType === undefined ||
      req.body.pointValue === undefined ) {
    res.sendStatus(400);
  } else {
    addDataPoint(req.body);
    res.sendStatus(200);
  }
});

io.on('connection', function(socket){
  socket.emit('available models', _.keys(db.logs));
  socket.on('data request', function(models) {
    socket.emit('refreshed data', _.pick(db.logs, models));
  });
});

http.listen(PORT, function(){
  console.log('listening on *:', PORT);
});

function addDataPoint(point) {
  var name = point.modelName;
  var type = point.pointType;
  var step = point.globalStep;
  var value = point.pointValue;
  if (db.logs[name] === undefined) {
    db.logs[name] = {};
  }
  if (db.logs[name][type] === undefined) {
    db.logs[name][type] = {};
  }
  db.logs[name][type][step] = value;
  io.emit('data point', point);
}



