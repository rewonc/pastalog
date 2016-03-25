var PORT = 8120;
var DATABASE = 'database.json';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var _ = require('lodash');

var db = {};

app.use( bodyParser.json() );

db.logs = {};
db.logs.modelA = {};
// fill with fake data to find out how long it takes to request data that's in memory, 10k epochs
// result: fast!!! no problem.
db.logs.modelA.validLoss = Array(10000);
_.fill(db.logs.modelA.validLoss, 1.234567);

// How should we think about doing visualization?
// 1) Each client has a list of 'active' feeds
  // 1a) This is mirrored on the server
// 2) When this changes, it registers w/ server and server sends updated data
// 3) Client refreshes if sent new data, otherwise just listens for new events.
// 4) When events are emitted, the client filters based on its local copy of stuff.
// 5) When client disconnects, server destroys its record based on the socket id.
// 5) Settings are saved locally on the client using localstorage. If refreshed, it will re-register those 
// settings on its websocket before requesting all the data.

// http://stackoverflow.com/questions/10110411/node-js-socket-io-how-to-emit-to-a-particular-client
// see there maybe -- play with socket ids and keep a hashmap in memory.

// TODO:
// get this working above in plaintext
// then work with graphing / plotting
// then do simple activations, etc.
// 


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/data', function(req, res) {
  var modelName = req.body.modelName,
      pointType = req.body.pointType,
      pointValue = req.body.pointValue;

  io.emit('chat message', pointType + ' ~~~ ' + pointValue);

  // to post using curl:
  // curl -H "Content-Type: application/json" -X POST -d '{"modelName":"model1","pointType":"loss", "pointValue": 2.5}' http://localhost:8120/data

  // todo: do something for 
  res.sendStatus(200);

});

io.on('connection', function(socket){
  socket.emit('initial data', db);

  socket.on('chat message', function(msg){
    socket.emit('initial data', db);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, function(){
  console.log('listening on *:', PORT);
});
