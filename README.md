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

- App >>>>>>>>>>>DONE>>>>>>>>>>> - Create tests / actions / helpers for logs
    >>>>>>>>>>>DONE>>>>>>>>>>>- updating them w/ initial data
    >>>>>>>>>>>DONE>>>>>>>>>>>- updating with incremental data 

- App - refactor to be stateless

- Grid - Styling (ask tiffany)

- Grid - adjust scale manually mode
- Series display options
    - candlestick (minibatch)
    - exponential weighted
    - raw

- Series - click to see series numbers
         - see all values for a series

- Tests for visualization (make sure it works)
- tests for python api

# pastalog

_Dead-simple realtime logging and visualization for nn libraries (like Lasagne)_

[insert screenshots here]


## Getting started

Prerequisites: npm, node (https://docs.npmjs.com/getting-started/installing-node)

```bash
pip install pastalog
pastalog install
pastalog run 8120
```

Then, when training:

```python
import pastalog

logA = pastalog.Log('http://localhost:8120', 'modelA')

# start training

logA.post('train_loss', 2.7)
logA.post('train_loss', 2.5)
logA.post('train_loss', 2.2)
logA.post('valid_loss', 2.6)


# Train a different model

logB = pastalog.Log('http://localhost:8120', 'modelB')
# ...
logB.post('train_loss', 2.7)
logB.post('train_loss', 2.0)
logB.post('train_loss', 1.4)
logB.post('valid_loss', 2.6)

```

Go to localhost:8120 and view your logs updating in real time.

[animated gif]


## Notes
- Stores data in a file, so no server configuration required.
- You might want to back up that file occasionally, though.
- Python library is a thin wrapper which makes post requests to a node.js server instance, so the logging doesn't have to be on the same machine as the training.

## Contributing

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
# alternatively:
npm test:watch


```

