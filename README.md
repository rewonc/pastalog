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
- App >>>>>>>>>>>DONE>>>>>>>>>>>- refactor to be stateless
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- Basic styling / colors
- Grid >>>>>>>>>>>DONE>>>>>>>>>>>- resize on viewport change
- Legend >>>>>>>>>>>DONE>>>>>>>>>>>- styling and colors
- Legend >>>>>>>>>>>DONE>>>>>>>>>>>- enable/disable series, model
- Server >>>>>>>>>>>DONE>>>>>>>>>>>- Put in real test data
- Legend >>>>>>>>>>>DONE>>>>>>>>>>>- Fix scale (currently reversed w log loss)
- Legend >>>>>>>>>>>DONE>>>>>>>>>>>- On Hover --- slow cursors w/ lots of movement
- Gridlines >>>>>>>>>>>DONE>>>>>>>>>>>- make hover box look a little cooler
- Options menu  >>>>>>>>>>>DONE>>>>>>>>>>>?
    - Scale >>>>>>>>>>>DONE>>>>>>>>>>>:
        - Make the scale manually adjustable >>>>>>>>>>>DONE>>>>>>>>>>> (text input)
- Manual rescale >>>>>>>>>>>DONE>>>>>>>>>>>  -- makes a Nan?

- App >>>>>>>>>>>DONE>>>>>>>>>>>- Profile it, see if you can make speed adjustments. Where can you optimize shouldComponentUpdate?
    - >>>>>>>>>>>DONE>>>>>>>>>>>- Box and whisker plot? smoothing once n elements > some density?
    - >>>>>>>>>>>DONE>>>>>>>>>>>- auto candle plots?

- Implement zoom and pan

- Ability to delete old trials (or at least not request them, and not have the server load each time.)
- Maybe split up into separate files?
- Ability to save trials, and back them up.
- Python wrapper
- Lua wrapper?

If have time:

- Series: on add: highlight line in yellow or something
- Series: onHover: highlight on nearest index point, print out value
- Legend - enable/disable all
- Series color function
    - hash to hierarchical list of good colors
    - start with 20, move to 100, then pure hash.

- Grid - keep min and max, but draw points when it's round, or when modulo % 5 or 10 is 0?
- Grid - hover: edit y-scale button
- Grid - adjust scale manually mode
- Grid - adjust to logarithmic?


# pastalog

_Dead-simple realtime logging and visualization for nn libraries (like Lasagne)_

[insert screenshots here]

Why is this named "pastalog"? Well, I primarily use the library [lasagne](http://lasagne.readthedocs.org/en/latest/). You don't have to use lasagne, though. You can do whatever you want. There's an API for Python, Lua, and anything that can send a post request.


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

