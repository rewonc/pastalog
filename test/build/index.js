/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.e = require("immutable");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(2);
	/* harmony export */ exports["f"] = toggleHover;/* harmony export */ exports["b"] = updateObject;/* harmony export */ exports["c"] = setObject;/* harmony export */ exports["d"] = disable;/* harmony export */ exports["e"] = enable;/* harmony export */ exports["g"] = initializeLogs;/* harmony export */ exports["h"] = addLogPoint;'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




	var BUFFER = 0.01;
	var PADDING = 0.05;

	var INITIAL_STATE = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	  scale: {
	    minX: -0.05,
	    maxX: 20,
	    minY: -0.001,
	    maxY: 0.5
	  },
	  scaleMenu: false,
	  dragging: false,
	  anchors: { x: null, y: null },
	  noAutoUpdate: false,
	  size: {
	    width: 1000,
	    height: 600
	  },
	  // logs: {},
	  hovering: false,
	  hoverPosition: {
	    hoverX: 0,
	    hoverY: 0
	  },
	  disabled: {
	    models: {},
	    series: {},
	    uniques: {}
	  }
	});/* harmony export */ Object.defineProperty(exports, "a", {configurable: false, enumerable: true, get: function() { return INITIAL_STATE; }});

	function mergeElements(old, current) {
	  return old.merge(current);
	}

	function toggleHover(state, value) {
	  return state.update('hovering', function () {
	    return value;
	  });
	}

	function updateObject() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : arguments[0];
	  var key = arguments[1];
	  var current = arguments[2];

	  if (state === null) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(_defineProperty({}, key, current));
	  }
	  return state.update(key, /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({}), function (val) {
	    return mergeElements(val, current);
	  });
	}

	function setObject() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : arguments[0];
	  var key = arguments[1];
	  var current = arguments[2];

	  return state.set(key, current);
	}

	function disable(state, category, id) {
	  return state.updateIn(['disabled', category, id], function () {
	    return true;
	  });
	}

	function enable(state, category, id) {
	  return state.deleteIn(['disabled', category, id]);
	}

	function rescale(oldScale, minX, minY, maxX, maxY) {
	  var newScale = {};
	  var xRange = oldScale.get('maxX') - oldScale.get('minX');
	  var yRange = oldScale.get('maxY') - oldScale.get('minY');
	  // for now, skip resizing min X as it shouldn't be below 0.
	  // if (minX < oldScale.get('minX') + BUFFER * xRange) {
	  //   newScale.minX = minX - PADDING * xRange;
	  // }
	  if (minY < oldScale.get('minY') + BUFFER * yRange) {
	    newScale.minY = minY - PADDING * yRange;
	  }
	  if (maxX > oldScale.get('maxX') - BUFFER * xRange) {
	    newScale.maxX = maxX + PADDING * xRange;
	  }
	  if (maxY > oldScale.get('maxY') - BUFFER * yRange) {
	    newScale.maxY = maxY + PADDING * yRange;
	  }
	  return mergeElements(oldScale, newScale);
	}

	function initializeScale() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()() : arguments[0];
	  var logs = arguments[1];

	  var scale = state.get('scale', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()());
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1__helpers__["a"].bind()(logs, state.get('disabled', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()), function (modelName, seriesName, lists) {
	    var minX = lists.get('indices').min();
	    var maxX = lists.get('indices').max();
	    var minY = lists.get('values').min();
	    var maxY = lists.get('values').max();
	    scale = rescale(scale, minX, minY, maxX, maxY);
	  });
	  return updateObject(state, 'scale', scale);
	}

	function updateScale() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()() : arguments[0];
	  var index = arguments[1];
	  var value = arguments[2];

	  return updateObject(state, 'scale', rescale(state.get('scale', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()), index, value, index, value));
	}

	function initializeLogs() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()() : arguments[0];
	  var logs = arguments[1];

	  return initializeScale(state, logs).set('logs', logs);
	}

	function addLogPoint() {
	  var _state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()() : arguments[0];

	  var modelName = arguments[1];
	  var seriesName = arguments[2];
	  var index = arguments[3];
	  var value = arguments[4];

	  var state = _state;
	  var shouldUpdateScale = state.get('noAutoUpdate', false) === false;
	  var isEnabled = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__helpers__["b"].bind()(state.get('disabled', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()), modelName, seriesName);
	  if (shouldUpdateScale && isEnabled) {
	    state = updateScale(state, index, value);
	  }
	  return state.updateIn(['logs', modelName, seriesName], /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()(), function (list) {
	    return list.update('indices', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["List"].bind()(), function (arr) {
	      return arr.push(index);
	    }).update('values', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["List"].bind()(), function (arr) {
	      return arr.push(value);
	    });
	  });
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {
	  disable: disable, enable: enable, toggleHover: toggleHover, updateObject: updateObject, initializeLogs: initializeLogs, addLogPoint: addLogPoint, INITIAL_STATE: INITIAL_STATE
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__(112);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* unused harmony export mapEnabledSeries *//* unused harmony export mapSeries *//* harmony export */ exports["a"] = forEachEnabledSeries;/* unused harmony export forEachSeries *//* harmony export */ exports["b"] = isSeriesEnabled;/* harmony export */ exports["c"] = isDisabled;'use strict';




	function isDisabled(state, category, id) {
	  return state.get('disabled', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()).get(category, /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()).get(id, false) === true;
	}

	function isSeriesEnabled() {
	  var disabled = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()() : arguments[0];
	  var modelName = arguments[1];
	  var seriesName = arguments[2];

	  var model = disabled.getIn(['models', modelName], false);
	  var series = disabled.getIn(['series', seriesName], false);
	  var unique = disabled.getIn(['uniques', /* harmony import */__WEBPACK_IMPORTED_MODULE_1__lib__["a"].bind()(modelName, seriesName)], false);
	  return !(model || series || unique);
	}

	function forEachSeries(logs, cb) {
	  logs.forEach(function (seriesMap, modelName) {
	    seriesMap.forEach(function (lists, seriesName) {
	      if (lists.get('indices') !== undefined && lists.get('values') !== undefined) {
	        cb(modelName, seriesName, lists);
	      }
	      return true;
	    });
	    return true;
	  });
	}

	function forEachEnabledSeries(logs, disabled, cb) {
	  forEachSeries(logs, function (modelName, seriesName, lists) {
	    if (isSeriesEnabled(disabled, modelName, seriesName)) {
	      cb(modelName, seriesName, lists);
	    }
	  });
	}

	function mapSeries(logs, cb) {
	  var res = [];
	  forEachSeries(logs, function (modelName, seriesName, lists) {
	    res.push(cb(modelName, seriesName, lists));
	  });
	  return res;
	}

	function mapEnabledSeries(logs, disabled, cb) {
	  var res = [];
	  forEachEnabledSeries(logs, disabled, function (modelName, seriesName, lists) {
	    res.push(cb(modelName, seriesName, lists));
	  });
	  return res;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(1);
	/* harmony export */ exports["a"] = reducer;'use strict';



	// reference state tree syntax

	// export const INITIAL_STATE = fromJS(
	//   {
	//     scale: {
	//       minX: -0.05,
	//       maxX: 20,
	//       minY: -0.001,
	//       maxY: 0.5,
	//     },
	//     scaleMenu: false,
	//     noAutoUpdate: false,
	//     scaling: false,
	//     anchors: {x: null, y: null},
	//     size: {
	//       width: 1000,
	//       height: 600,
	//     },
	//     logs: {
	//       // modelA: {
	//       //   validLoss: {
	//       //     indices: [],
	//       //     values: [],
	//       //   }
	//       // }
	//     },
	//     hovering: false,
	//     hoverPosition: {
	//       hoverX: 0,
	//       hoverY: 0,
	//     },
	//     disabled: {
	//       models: {},
	//       series: {},
	//       uniques: {},
	//     },
	//   }
	// );

	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["a"] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'RESCALE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["b"].bind()(state, 'scale', action.scale);
	    case 'TOGGLE_SCALE_MENU':
	      return state.update('scaleMenu', function (bool) {
	        return !bool;
	      });
	    case 'TOGGLE_AUTO_UPDATE':
	      return state.update('noAutoUpdate', function (bool) {
	        return !bool;
	      });
	    case 'SET_DRAG':
	      return state.update('dragging', function () {
	        return action.value;
	      });
	    case 'SET_ANCHORS':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["c"].bind()(state, 'anchors', action.anchors);
	    case 'RESIZE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["b"].bind()(state, 'size', action.size);
	    case 'MOVE_HOVER':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["b"].bind()(state, 'hoverPosition', action.coords);
	    case 'DISABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["d"].bind()(state, action.category, action.id);
	    case 'ENABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["e"].bind()(state, action.category, action.id);
	    case 'TOGGLE_HOVER':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["f"].bind()(state, action.value);
	    case 'INITIALIZE_LOGS':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["g"].bind()(state, action.logs);
	    case 'UPDATE_MODEL':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["h"].bind()(state, action.modelName, action.seriesName, action.index, action.value);
	    default:
	      return state;
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.e = require("chai");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_state_store__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_state_helpers__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_state_actions__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state_reducer__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai___default = __WEBPACK_IMPORTED_MODULE_2_chai__ && __WEBPACK_IMPORTED_MODULE_2_chai__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_chai__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_chai__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_chai___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_chai___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mocha__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mocha___default = __WEBPACK_IMPORTED_MODULE_1_mocha__ && __WEBPACK_IMPORTED_MODULE_1_mocha__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_mocha__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_mocha__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_mocha___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_mocha___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	'use strict';









	/* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('Redux store', function () {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('is initialized with the correct reducer', function () {
	    var store = /* harmony import */__WEBPACK_IMPORTED_MODULE_6__src_state_store__["a"].bind()();
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(store.getState()).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"]);

	    store.dispatch({
	      type: 'RESCALE',
	      scale: { minX: 10 }
	    });
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(store.getState()).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].updateIn(['scale', 'minX'], function () {
	      return 10;
	    }));
	  });
	});

	/* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('Log', function () {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('initialization', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should add initial values for log', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var logs = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        modelA: {
	          trainLoss: {
	            values: [12, 13, 14, 15],
	            indices: [0, 1, 2, 3]
	          }
	        }
	      });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'INITIALIZE_LOGS',
	        logs: logs
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('logs')).to.equal(logs);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should change the scaling on initialization', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"];
	      var logs = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        modelA: {
	          trainLoss: {
	            values: [12, 13, 14, 15],
	            indices: [0, 1, 2, 3, 4]
	          }
	        }
	      });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'INITIALIZE_LOGS',
	        logs: logs
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(initialState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].get('scale'));
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.not.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].get('scale'));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('updates', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update values for log', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } }
	      });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'UPDATE_MODEL',
	        modelName: 'modelA',
	        seriesName: 'trainLoss',
	        index: 4,
	        value: 16
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState).to.equal(initialState.updateIn(['logs', 'modelA', 'trainLoss', 'values'], function (arr) {
	        return arr.push(16);
	      }).updateIn(['logs', 'modelA', 'trainLoss', 'indices'], function (arr) {
	        return arr.push(4);
	      }));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update scales for log', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].merge(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } }
	      }));
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'UPDATE_MODEL',
	        modelName: 'modelA',
	        seriesName: 'trainLoss',
	        index: 1000,
	        value: 10000
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.getIn(['scale', 'maxX'], 0)).to.be.above(1000);
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.getIn(['scale', 'maxY'], 0)).to.be.above(10000);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should NOT update scales if noAutoUpdate is true', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].merge(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } }
	      })), {
	        type: 'TOGGLE_AUTO_UPDATE'
	      });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'UPDATE_MODEL',
	        modelName: 'modelA',
	        seriesName: 'trainLoss',
	        index: 1000,
	        value: 10000
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.getIn(['scale', 'maxX'], 0)).to.be.below(1000);
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.getIn(['scale', 'maxY'], 0)).to.be.below(10000);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update values for models that dont exist', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        logs: { modelA: { trainLoss: { values: [12, 13, 14, 15], indices: [0, 1, 2, 3] } } }
	      });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'UPDATE_MODEL',
	        modelName: 'modelB',
	        seriesName: 'validLoss',
	        index: 4,
	        value: 16
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState).to.equal(initialState.updateIn(['logs', 'modelB', 'validLoss', 'values'], /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()([]), function (arr) {
	        return arr.push(16);
	      }).updateIn(['logs', 'modelB', 'validLoss', 'indices'], /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()([]), function (arr) {
	        return arr.push(4);
	      }));
	    });
	  });
	});

	/* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('App state actions', function () {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('rescale', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should toggle the menu', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_SCALE_MENU'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scaleMenu')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should set if dragging is being done', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'SET_DRAG', value: true
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('dragging')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should set initial anchors for drags', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var anchors = { x: 50, y: 20 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'SET_ANCHORS', anchors: anchors
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('anchors')).to.equal(anchors);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should work for state variables with no scale property', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should work for state variables that are null', function () {
	      var initialState = null;
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should apply defaults when state variable is undefined', function () {
	      var initialState = undefined;
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      var updatedDefaults = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"].get('scale').update('xMin', function () {
	        return 10;
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.equal(updatedDefaults);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update multiple values for scale at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ scale: {} });
	      var newScale = { xMin: 10, yMin: 20, xMax: 30, yMax: 40 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should work when update only includes some keys', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ scale: { xMin: 10, xMax: 30 } });
	      var newScale = { xMax: 30, yMax: 40 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	        xMin: 10, xMax: 30, yMax: 40
	      }));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('resize', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update multiple values for size at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ size: { width: 100, height: 200 } });
	      var newSize = { height: 1000, width: 1000 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESIZE',
	        size: newSize
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('size')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(newSize));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('moveHover', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should update multiple values for coordinates at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ hoverPosition: { hoverX: 100, hoverY: 200 } });
	      var newCoords = { hoverX: 1000, hoverY: 1000 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'MOVE_HOVER',
	        coords: newCoords
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('hoverPosition')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()(newCoords));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('disable/enable', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should disable a model when no keys exist', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'models', 'modelA')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should disable a series type', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'series',
	        id: 'train_loss'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'series', 'train_loss')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should disable a unique model/series', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'uniques',
	        id: 'modelA/train_loss'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'uniques', 'modelA/train_loss')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should enable disabled elements', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: { modelA: true } } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'ENABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'model', 'modelA')).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should do nothing when enabled elements are enabled again', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: {} } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'ENABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'model', 'modelA')).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should do nothing when disabled elements are disabled again', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: { modelA: true } } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["c"].bind()(newState, 'models', 'modelA')).to.equal(true);
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('toggle hover', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should set hover to true', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ hovering: false });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: true
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('hovering')).to.equal(true);
	      var newState2 = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: true
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState2.get('hovering')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should set hover to false', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ hovering: true });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: false
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('hovering')).to.equal(false);
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('misc', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should toggle autoupdate', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__src_state_actions__["a"];
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_AUTO_UPDATE'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(newState.get('noAutoUpdate')).to.equal(true);
	    });
	  });
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var chai = __webpack_require__(4);
	var chaiImmutable = __webpack_require__(9);

	chai.use(chaiImmutable);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __WEBPACK_IMPORTED_MODULE_0_redux__ && __WEBPACK_IMPORTED_MODULE_0_redux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_redux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_redux__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_redux___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_redux___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(3);
	/* harmony export */ exports["a"] = makeStore;'use strict';




	function makeStore() {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__reducer__["a"]);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper___default = __WEBPACK_IMPORTED_MODULE_0__test_helper__ && __WEBPACK_IMPORTED_MODULE_0__test_helper__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__test_helper___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__test_helper___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test___default = __WEBPACK_IMPORTED_MODULE_1__state_test__ && __WEBPACK_IMPORTED_MODULE_1__state_test__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__state_test___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__state_test___default });
	'use strict';




/***/ },
/* 9 */
/***/ function(module, exports) {

	module.e = require("chai-immutable");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.e = require("mocha");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.e = require("redux");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.e = isArray;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.e = Map;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.e = isObjectLike;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var checkGlobal = __webpack_require__(69);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = objectTypes[ false ? 'undefined' : _typeof(exports)] && exports && !exports.nodeType ? exports : undefined;

	/** Detect free variable `module`. */
	var freeModule = objectTypes[ false ? 'undefined' : _typeof(module)] && module && !module.nodeType ? module : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self === 'undefined' ? 'undefined' : _typeof(self)] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[_typeof(this)] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function('return this')();

	module.e = root;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(111)(module)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eq = __webpack_require__(98);

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.e = assocIndexOf;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(102);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	module.e = getNative;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'number' || type == 'boolean' || type == 'string' && value != '__proto__' || value == null;
	}

	module.e = isKeyable;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(17);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.e = nativeCreate;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(74),
	    isFunction = __webpack_require__(47),
	    isLength = __webpack_require__(21);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.e = isArrayLike;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.e = isLength;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) && (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object));
	}

	module.e = isKey;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.e = isObject;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(36),
	    baseKeys = __webpack_require__(61),
	    indexKeys = __webpack_require__(81),
	    isArrayLike = __webpack_require__(20),
	    isIndex = __webpack_require__(43),
	    isPrototype = __webpack_require__(82);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.e = keys;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stackClear = __webpack_require__(92),
	    stackDelete = __webpack_require__(93),
	    stackGet = __webpack_require__(94),
	    stackHas = __webpack_require__(95),
	    stackSet = __webpack_require__(96);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.e = Stack;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.e = _Symbol;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.e = arrayMap;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(16);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.e = assocDelete;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(16);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.e = assocGet;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(16);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.e = assocHas;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocIndexOf = __webpack_require__(16);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.e = assocSet;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12),
	    stringToPath = __webpack_require__(97);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.e = baseCastPath;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(34),
	    createBaseEach = __webpack_require__(70);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.e = baseEach;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(57),
	    keys = __webpack_require__(24);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.e = baseForOwn;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCastPath = __webpack_require__(32),
	    isKey = __webpack_require__(22);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return index && index == length ? object : undefined;
	}

	module.e = baseGet;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) || (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && key in object && getPrototypeOf(object) === null;
	}

	module.e = baseHas;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(59),
	    isObject = __webpack_require__(23),
	    isObjectLike = __webpack_require__(14);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.e = baseIsEqual;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var baseMatches = __webpack_require__(63),
	    baseMatchesProperty = __webpack_require__(64),
	    identity = __webpack_require__(45),
	    isArray = __webpack_require__(12),
	    property = __webpack_require__(108);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
	  }
	  return property(value);
	}

	module.e = baseIteratee;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.e = baseProperty;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arraySome = __webpack_require__(55);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function (othValue) {
	        return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.e = equalArrays;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(19);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.e = hashHas;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.e = isHostObject;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.e = isIndex;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(35);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.e = get;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.e = identity;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLikeObject = __webpack_require__(101);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.e = isArguments;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(23);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.e = isFunction;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(12),
	    isObjectLike = __webpack_require__(14);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
	}

	module.e = isString;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(19);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.e = Hash;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mapClear = __webpack_require__(84),
	    mapDelete = __webpack_require__(85),
	    mapGet = __webpack_require__(86),
	    mapHas = __webpack_require__(87),
	    mapSet = __webpack_require__(88);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	    var index = -1,
	        length = values ? values.length : 0;

	    this.clear();
	    while (++index < length) {
	        var entry = values[index];
	        this.set(entry[0], entry[1]);
	    }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.e = MapCache;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.e = Set;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(15);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.e = Uint8Array;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getNative = __webpack_require__(17),
	    root = __webpack_require__(15);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.e = WeakMap;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.e = arrayEach;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.e = arraySome;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(45);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the array-like object.
	 */
	function baseCastFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.e = baseCastFunction;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(71);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.e = baseFor;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.e = baseHasIn;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(25),
	    equalArrays = __webpack_require__(40),
	    equalByTag = __webpack_require__(72),
	    equalObjects = __webpack_require__(73),
	    getTag = __webpack_require__(76),
	    isArray = __webpack_require__(12),
	    isHostObject = __webpack_require__(42),
	    isTypedArray = __webpack_require__(104);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      stack || (stack = new Stack());
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.e = baseIsEqualDeep;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stack = __webpack_require__(25),
	    baseIsEqual = __webpack_require__(37);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack(),
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.e = baseIsMatch;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.e = baseKeys;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseEach = __webpack_require__(33),
	    isArrayLike = __webpack_require__(20);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function (value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.e = baseMap;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(60),
	    getMatchData = __webpack_require__(75);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function (object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value && (value !== undefined || key in Object(object));
	    };
	  }
	  return function (object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.e = baseMatches;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(37),
	    get = __webpack_require__(44),
	    hasIn = __webpack_require__(100);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	    return function (object) {
	        var objValue = get(object, path);
	        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	    };
	}

	module.e = baseMatchesProperty;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(35);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function (object) {
	    return baseGet(object, path);
	  };
	}

	module.e = basePropertyDeep;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.e = baseSlice;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.e = baseTimes;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(27);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function (key) {
	    return [key, object[key]];
	  });
	}

	module.e = baseToPairs;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return value && value.Object === Object ? value : null;
	}

	module.e = checkGlobal;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(20);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.e = createBaseEach;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.e = createBaseFor;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(26),
	    Uint8Array = __webpack_require__(52),
	    equalArrays = __webpack_require__(40),
	    mapToArray = __webpack_require__(89),
	    setToArray = __webpack_require__(91);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.e = equalByTag;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHas = __webpack_require__(36),
	    keys = __webpack_require__(24);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.e = equalObjects;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(39);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.e = getLength;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isStrictComparable = __webpack_require__(83),
	    toPairs = __webpack_require__(109);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.e = getMatchData;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(13),
	    Set = __webpack_require__(51),
	    WeakMap = __webpack_require__(53);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if (Map && getTag(new Map()) != mapTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString:
	          return mapTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.e = getTag;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCastPath = __webpack_require__(32),
	    isArguments = __webpack_require__(46),
	    isArray = __webpack_require__(12),
	    isIndex = __webpack_require__(43),
	    isKey = __webpack_require__(22),
	    isLength = __webpack_require__(21),
	    isString = __webpack_require__(48),
	    last = __webpack_require__(105),
	    parent = __webpack_require__(90);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || !!length && isLength(length) && isIndex(path, length) && (isArray(object) || isString(object) || isArguments(object));
	}

	module.e = hasPath;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hashHas = __webpack_require__(41);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.e = hashDelete;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(19);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.e = hashGet;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var nativeCreate = __webpack_require__(19);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	}

	module.e = hashSet;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseTimes = __webpack_require__(67),
	    isArguments = __webpack_require__(46),
	    isArray = __webpack_require__(12),
	    isLength = __webpack_require__(21),
	    isString = __webpack_require__(48);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.e = indexKeys;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	module.e = isPrototype;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(23);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.e = isStrictComparable;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Hash = __webpack_require__(49),
	    Map = __webpack_require__(13);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': Map ? new Map() : [],
	    'string': new Hash()
	  };
	}

	module.e = mapClear;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(13),
	    assocDelete = __webpack_require__(28),
	    hashDelete = __webpack_require__(78),
	    isKeyable = __webpack_require__(18);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.e = mapDelete;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(13),
	    assocGet = __webpack_require__(29),
	    hashGet = __webpack_require__(79),
	    isKeyable = __webpack_require__(18);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.e = mapGet;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(13),
	    assocHas = __webpack_require__(30),
	    hashHas = __webpack_require__(41),
	    isKeyable = __webpack_require__(18);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.e = mapHas;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Map = __webpack_require__(13),
	    assocSet = __webpack_require__(31),
	    hashSet = __webpack_require__(80),
	    isKeyable = __webpack_require__(18);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.e = mapSet;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.e = mapToArray;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseSlice = __webpack_require__(66),
	    get = __webpack_require__(44);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	module.e = parent;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.e = setToArray;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.e = stackClear;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocDelete = __webpack_require__(28);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.e = stackDelete;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocGet = __webpack_require__(29);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.e = stackGet;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assocHas = __webpack_require__(30);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.e = stackHas;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapCache = __webpack_require__(50),
	    assocSet = __webpack_require__(31);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < LARGE_ARRAY_SIZE - 1) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.e = stackSet;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toString = __webpack_require__(110);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	module.e = stringToPath;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}

	module.e = eq;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(54),
	    baseCastFunction = __webpack_require__(56),
	    baseEach = __webpack_require__(33),
	    isArray = __webpack_require__(12);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	    return typeof iteratee == 'function' && isArray(collection) ? arrayEach(collection, iteratee) : baseEach(collection, baseCastFunction(iteratee));
	}

	module.e = forEach;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseHasIn = __webpack_require__(58),
	    hasPath = __webpack_require__(77);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	module.e = hasIn;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(20),
	    isObjectLike = __webpack_require__(14);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.e = isArrayLikeObject;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(47),
	    isHostObject = __webpack_require__(42),
	    isObjectLike = __webpack_require__(14);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.e = isNative;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObjectLike = __webpack_require__(14);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	module.e = isSymbol;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(21),
	    isObjectLike = __webpack_require__(14);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.e = isTypedArray;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.e = last;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(27),
	    baseIteratee = __webpack_require__(38),
	    baseMap = __webpack_require__(62),
	    isArray = __webpack_require__(12);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	 * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	 * and `words`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.e = map;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(34),
	    baseIteratee = __webpack_require__(38);

	/**
	 * Creates an object with the same keys as `object` and values generated by
	 * running each own enumerable property of `object` through `iteratee`. The
	 * iteratee is invoked with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);

	  baseForOwn(object, function (value, key, object) {
	    result[key] = iteratee(value, key, object);
	  });
	  return result;
	}

	module.e = mapValues;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(39),
	    basePropertyDeep = __webpack_require__(65),
	    isKey = __webpack_require__(22);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.e = property;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToPairs = __webpack_require__(68),
	    keys = __webpack_require__(24);

	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.e = toPairs;

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(26),
	    isSymbol = __webpack_require__(103);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.e = toString;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.e = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			Object.defineProperty(module, "exports", {
				enumerable: true,
				configurable: false,
				get: function get() {
					return module.e;
				},
				set: function set(v) {
					return module.e = v;
				}
			});
			Object.defineProperty(module, "loaded", {
				enumerable: true,
				configurable: false,
				get: function get() {
					return module.l;
				}
			});
			Object.defineProperty(module, "id", {
				enumerable: true,
				configurable: false,
				get: function get() {
					return module.i;
				}
			});
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues__ = __webpack_require__(107);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default = __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues__ && __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_map__ = __webpack_require__(106);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_map___default = __WEBPACK_IMPORTED_MODULE_2_lodash_map__ && __WEBPACK_IMPORTED_MODULE_2_lodash_map__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_map__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_map__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_map___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_map___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_forEach__ = __webpack_require__(99);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_forEach___default = __WEBPACK_IMPORTED_MODULE_3_lodash_forEach__ && __WEBPACK_IMPORTED_MODULE_3_lodash_forEach__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_lodash_forEach__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_lodash_forEach__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_3_lodash_forEach___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_3_lodash_forEach___default });
	/* unused harmony export round2 *//* unused harmony export rightPadDecimals2 *//* unused harmony export updateLog *//* unused harmony export logsToJS *//* unused harmony export logsFromJS *//* unused harmony export convertScales *//* harmony export */ exports["a"] = getUUID;/* unused harmony export seriesMap *//* unused harmony export stringToColor */'use strict';

	// Library for common server-client utilities





	function round2(input) {
	  return Math.round(input * 100) / 100;
	}

	function rightPadDecimals2(input) {
	  var number = round2(input);
	  var str = number.toString();
	  var splits = str.split('.');
	  if (splits[1] === undefined) {
	    return str + '.00';
	  }
	  if (splits[1].length === 1) {
	    return str + '0';
	  }
	  return str;
	}

	function updateLog(database, point) {
	  /* Update a database with a new data point
	  ** This assumes that db has a key 'log' and mutates
	  ** that object in place. */

	  var db = database;
	  var name = point.modelName;
	  var type = point.pointType;
	  var step = point.globalStep;
	  var value = point.pointValue;
	  if (db.logs[name] === undefined) {
	    db.logs[name] = {};
	  }
	  if (db.logs[name][type] === undefined) {
	    db.logs[name][type] = {
	      values: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["List"].bind()(),
	      indices: /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["List"].bind()()
	    };
	  }
	  var series = db.logs[name][type];
	  series.values = series.values.push(value);
	  series.indices = series.indices.push(step);
	  return true;
	}

	function logsToJS(logs) {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(logs, function (model) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(model, function (series) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(series, function (list) {
	        return list.toJS();
	      });
	    });
	  });
	}

	function logsFromJS(logs) {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(logs, function (model) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(model, function (series) {
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_mapValues___default.a.bind()(series, function (arr) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["List"].bind()(arr);
	      });
	    });
	  });
	}

	function convertScales(list, minIn, maxIn, minOut, maxOut) {
	  var options = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

	  var deltaIn = maxIn - minIn;
	  var deltaOut = maxOut - minOut;
	  if (options.invert === true) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_map___default.a.bind()(list, function (val) {
	      return (1 - (val - minIn) / deltaIn) * deltaOut + minOut;
	    });
	  }
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_map___default.a.bind()(list, function (val) {
	    return (val - minIn) / deltaIn * deltaOut + minOut;
	  });
	}

	function getUUID(modelName, seriesName) {
	  return modelName + '/' + seriesName;
	}

	function seriesMap(logs, cb) {
	  var results = [];
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_forEach___default.a.bind()(logs, function (series, modelName) {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_forEach___default.a.bind()(series, function (list, seriesName) {
	      results.push(cb(list, modelName, seriesName));
	    });
	  });
	  return results;
	}

	/*
	String to Color representation comes from:
	http://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
	*/

	function hashCode(str) {
	  var i = void 0;
	  var chr = void 0;
	  var len = void 0;
	  var hash = 0;
	  if (str.length === 0) return hash;
	  for (i = 0, len = str.length; i < len; i++) {
	    chr = str.charCodeAt(i);
	    hash = (hash << 5) - hash + chr;
	    hash |= 0;
	  }
	  return hash;
	}

	function intToHex(i) {
	  var hex = (i >> 24 & 0xFF).toString(16).slice(-2) + (i >> 16 & 0xFF).toString(16).slice(-2) + (i >> 8 & 0xFF).toString(16).slice(-2) + (i & 0xFF).toString(16).slice(-2);
	  hex = hex.slice(-6);
	  while (hex.length < 6) {
	    hex = '0' + hex;
	  }
	  return '#' + hex;
	}

	function stringToColor(str) {
	  return intToHex(hashCode(str));
	}

	/*
	End String to Color
	*/

	/* unused harmony default export */ var _unused_webpack_default_export = {
	  updateLog: updateLog, logsToJS: logsToJS, logsFromJS: logsFromJS, stringToColor: stringToColor, getUUID: getUUID
	};

/***/ }
/******/ ]);