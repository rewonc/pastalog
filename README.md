#### todo
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- adjust scale automatically mode 
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- Legend
- lib  >>>>>>>>>>>DONE>>>>>>>>>>>- extract a library function that iterates through each series and provides a cb
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- Gridlines
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- round numbers
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- display options (which models, which series), refresh
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- hover at step and display values
- App >>>>>>>>>>>DONE>>>>>>>>>>>- Create a redux state tree to hold all the application state.
- App >>>>>>>>>>>DONE>>>>>>>>>>>- Create unit tests for state tree

- App - Create tests / actions / helpers for logs
    - updating them w/ initial data
    - updating with incremental data 
    - iterating through them
- App - refactor to be stateless

- Grid - Styling (ask tiffany -- do in coinbase format)

- Grid - adjust scale manually mode
- Series display options
    - candlestick (minibatch)
    - exponential weighted
    - raw

- Series - click to see series numbers
         - see all values for a series

- Tests for visualization (make sure it works)
- tests for python api

state tree:

- gridScales - minX, minY, maxX, maxY
- containerSize - width, height
- logs
- hoverStates
- disabled
    - models
    - series
    - uniques


# pastalog

_Real-time logging and visualization library for Lasagne (and other python-based nn libraries)_

# Examples

# Getting started

Prerequisites: npm, node (https://docs.npmjs.com/getting-started/installing-node)

```bash
pip install pastalog
pastalog install
pastalog run 8120
```

Then, when training:

```python
import pastalog

log = pastalog.Log(8120, 'model_1')

# start training

log.write('train_loss', 2.7)
log.write('train_loss', 2.5)
log.write('train_loss', 2.2)
log.write('valid_loss', 2.6)


# Train a different model

log2 = pastalog.Log(8120, 'model_2')
# ...
log2.write('train_loss', 2.7)
log2.write('train_loss', 2.0)
log2.write('train_loss', 1.4)
log2.write('valid_loss', 2.6)

```

Go to localhost:8120 and view your logs updating in real time.

[animated gif]


# Fancy addons (lasagne only)

### Visualize activations and layerwise statistics
Pass in layer references as first argument, input as second argument.
It will compile a theano function
Returns a function that visualizes stuff aterward

### Visualize occlusion heatmap for classes
Returns a function that visualizes stuff afterward

### Visualize gradients for classes
Returns a function that visualizes stuff afterward

### Confusion matrix for class
For a given batch, find the most common mistaken examples



# Views
1) View all models, one statistic (valid loss)
2) Detail view
	- One model, all statistics
	- Image output
		- Latest image, all logs
		- One log, throughout time.

# Caveats
- Not optimized for mobile. But how many Titan X's does your phone have anyway?

# Architecture
node.js server with nginx
socket.io
server loads from json, uses an in-memory db, and saves to json. Initializes db file if not present.
Maybe should back up that file.

# Backing up your data
The server stores everything in a large json file. If you'd like to backup your data, you should backup the file:

pathToServer/database.json

You can copy this file into the directory of fresh install of pastalog and it should just work.