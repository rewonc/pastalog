# pastalog

Simple, realtime visualization server for training neural networks. Use with Lasagne, Keras, Tensorflow, Torch, Theano, and basically everything else.

1. [Getting started](#getting-started)
2. [Python API](#python-api)
3. [POST endpoint](#post-endpoint)
4. [Usage notes](#usage-notes)
5. [Contributing](#contributing)
6. [Misc](#misc)

![alt text](https://raw.githubusercontent.com/rewonc/pastalog/master/screenshots/main-big.gif "Pastalog demo")


## Getting started

Prerequisites: npm, node (https://docs.npmjs.com/getting-started/installing-node)

First, download the package and start the server:

```bash
pip install pastalog
pastalog --install
pastalog --serve 8120
# - Open up http://localhost:8120/ to see the server in action.
```

Now, you can log stuff to the server. 

```python
from pastalog import Log

log_a = Log('http://localhost:8120', 'modelA')

# start training

log_a.post('trainLoss', value=2.7, step=1)
log_a.post('trainLoss', value=2.15, step=2)
log_a.post('trainLoss', value=1.32, step=3)
log_a.post('validLoss', value=1.56, step=3)
log_a.post('validAccuracy', value=0.15, step=3)

log_a.post('trainLoss', value=1.31, step=4)
log_a.post('trainLoss', value=1.28, step=5)
log_a.post('trainLoss', value=1.11, step=6)
log_a.post('validLoss', value=1.20, step=6)
log_a.post('validAccuracy', value=0.18, step=6)

```
Voila! You should see something like the below:

![alt text](https://raw.githubusercontent.com/rewonc/pastalog/master/screenshots/first_steps.jpg "Example 1")


Now, train some more models:

```python
log_b = Log('http://localhost:8120', 'modelB')
log_c = Log('http://localhost:8120', 'modelC')

# ...

log_b.post('trainLoss', value=2.7, step=1)
log_b.post('trainLoss', value=2.0, step=2)
log_b.post('trainLoss', value=1.4, step=3)
log_b.post('validLoss', value=2.6, step=3)
log_b.post('validAccuracy', value=0.14, step=3)

log_c.post('trainLoss', value=2.7, step=1)
log_c.post('trainLoss', value=2.0, step=2)
log_c.post('trainLoss', value=1.4, step=3)
log_c.post('validLoss', value=2.6, step=3)
log_c.post('validAccuracy', value=0.18, step=3)

```
Go to localhost:8120 and view your logs updating in real time.



## Python API

##### `pastalog.Log(server_path, model_name)`


- `server_path`: The host/port (e.g. `http://localhost:8120`) 
- `model_name`: The name of the model as you want it displayed (e.g. `resnet_48_A_V5`).

This returns a Log object with one method:

##### `Log.post(series_name, value, step)`

- `series_name`: typically the type of metric (e.g. `validLoss`, `trainLoss`, `validAccuracy`). 
- `value`: the value of the metric (e.g. `1.56`, `0.20`, etc.)
- `step`: whatever quantity you want to plot on the x axis. If you have batches of size 100, will run for 10 epochs, and want to plot losses for each batch as well as each epoch, `step` should represent how many batches have been seen already (0..1000).

## POST endpoint

If you want to use pastalog from a non-python setup (like Torch), you can just send POST requests to the Pastalog server and everything will work the same. The data should be json and encoded like so:

`{"modelName":"model1","pointType":"validLoss", "pointValue": 2.5, "globalStep": 1}`

`modelName`, `pointType`, `pointValue`, `globalStep` correspond with `model_name`, `series_name`, `value`, `step` above.

An example with `curl`:

```bash
curl -H "Content-Type: application/json" -X POST -d '{"modelName":"model1","pointType":"validLoss", "pointValue": 2.5, "globalStep": 1}' http://localhost:8120/data
```

I hear that the (async library)[https://github.com/clementfarabet/async] is a convenient way of using an http client in Torch.

## Usage notes

#### Automatic candlesticking

![alt text](https://raw.githubusercontent.com/rewonc/pastalog/master/screenshots/candlestick.jpg "Candlestick")

Once you start viewing a lot of points (typically several thousand), the app will automatically convert them into candlesticks for improved visibility and rendering performance. Each candlestick takes a "batch" of points on the x axis and shows aggregate statistics for the y points of that batch:

- Top of line: `min`
- Top of box: `first quartile`
- Solid square in middle: `median`
- Bottom of box: `third quartile`
- Bottom of line: `max`

This tends to be much more useful to visualize than a solid mass of dots. Computationally, it makes the app a lot faster than one which renders each point.


#### Panning and zooming

Drag your mouse to pan.  Either scroll up or down to zoom in or out. 

Note: you can also pinch in/out on your trackpad to zoom.

#### Toggling visibility of lines

Simply click the name of any model under 'series.'  To toggle everything from a certain model (e.g. `modelA`, or to toggle an entire type of points (e.g. `validLoss`), simply click those names in the legend to the right.

#### Deleting logs

Click the `x` next to the name of the series.  If you confirm deletion, this will remove it on the server and remove it from your view. 

Note: if you delete a series, then add more points under the same, it will act as if it is a new series.

#### Backups

You should backup your logs on your own and should not trust this library to store important data. Pastalog does keep track of what it sees, though, inside a file called `database.json` and a directory called `database/`, inside the root directory of the package, in case you need to access it.


## Contributing

Any contributors are welcome.

```bash
# to install
git clone https://github.com/rewonc/pastalog
cd pastalog
npm install

# build + watch
npm run build

# dev server + watch
npm run dev

# tests
npm test

# To prep the python module
npm run build
./package_python.sh

```

## Misc

#### License

MIT License (MIT)

Copyright (c) 2016 Rewon Child

#### Thanks

This is named named `pastalog` because I like to use [lasagne](http://lasagne.readthedocs.org/en/latest/). Props to those guys for a great library!