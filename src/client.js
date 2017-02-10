import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import _difference from 'lodash/difference';
import makeStore from './state/store';
import { INITIAL_STATE } from './state/actions';
import './styles.scss';
import { fromJS } from 'immutable';

const socket = io();
const store = makeStore();
const serverActions = {
  delete: (modelName, seriesName) => {
    socket.emit('delete series', {
      modelName, seriesName,
    });
    console.log('deleting:', modelName, seriesName);
  },

  deleteModel: (modelName) => {
	  socket.emit('delete model', {
		  modelName,
    });
    console.log('deleting:', modelName);
  },
};

function render(state) {
  ReactDOM.render(<Container state={state} store={store} actions={serverActions} />,
    document.getElementById('container'));
}

store.subscribe(() => {
  const state = store.getState();
  render(state);
});

socket.on('refreshed data', (rawJSLogs) => {
  const logs = fromJS(rawJSLogs);
  store.dispatch({
    logs,
    type: 'INITIALIZE_LOGS',
  });
});

socket.on('data point', (point) => {
  store.dispatch({
    type: 'UPDATE_MODEL',
    modelName: point.modelName,
    seriesName: point.pointType,
    index: point.globalStep,
    value: point.pointValue,
  });
});

render(INITIAL_STATE);
