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
	/* harmony export */ exports["f"] = enable;/* harmony export */ exports["e"] = disable;/* harmony export */ exports["c"] = resize;/* unused harmony export rescale *//* harmony export */ exports["d"] = moveHover;/* harmony export */ exports["b"] = updateObject;/* harmony export */ exports["g"] = toggleHover;'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



	var INITIAL_STATE = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({
	  scale: {
	    minX: -0.05,
	    maxX: 20,
	    minY: -0.001,
	    maxY: 0.5
	  },
	  size: {
	    width: 1000,
	    height: 600
	  },
	  logs: {},
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

	function moveHover(old, current) {
	  return mergeElements(old, current);
	}

	function rescale(old, current) {
	  return mergeElements(old, current);
	}

	function resize(old, current) {
	  return mergeElements(old, current);
	}

	function disable(state, category, id) {
	  return state.updateIn(['disabled', category, id], function () {
	    return true;
	  });
	}

	function enable(state, category, id) {
	  return state.deleteIn(['disabled', category, id]);
	}

	/* unused harmony default export */ var _unused_webpack_default_export = {
	  rescale: rescale, resize: resize, disable: disable, enable: enable, toggleHover: toggleHover, moveHover: moveHover, INITIAL_STATE: INITIAL_STATE
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(1);
	/* harmony export */ exports["a"] = reducer;'use strict';



	/*
	reference state tree

	export const INITIAL_STATE = fromJS(
	  {
	    scale: {
	      minX: -0.05,
	      maxX: 20,
	      minY: -0.001,
	      maxY: 0.5,
	    },
	    size: {
	      width: 1000,
	      height: 600,
	    },
	    logs: {},
	    hovering: false,
	    hoverPosition: {
	      hoverX: 0,
	      hoverY: 0,
	    },
	    disabled: {
	      models: {},
	      series: {},
	      uniques: {},
	    },
	  }
	);
	*/

	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["a"] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'RESCALE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["b"].bind()(state, 'scale', action.scale);
	    case 'RESIZE':
	      return state.update('size', function (size) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["c"].bind()(size, action.size);
	      });
	    case 'MOVE_HOVER':
	      return state.update('hoverPosition', function (coords) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["d"].bind()(coords, action.coords);
	      });
	    case 'DISABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["e"].bind()(state, action.category, action.id);
	    case 'ENABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["f"].bind()(state, action.category, action.id);
	    case 'TOGGLE_HOVER':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["g"].bind()(state, action.value);
	    default:
	      return state;
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.e = require("chai");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mocha__ = __webpack_require__(10);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mocha___default = __WEBPACK_IMPORTED_MODULE_1_mocha__ && __WEBPACK_IMPORTED_MODULE_1_mocha__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_mocha__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_mocha__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_mocha___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_mocha___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chai___default = __WEBPACK_IMPORTED_MODULE_2_chai__ && __WEBPACK_IMPORTED_MODULE_2_chai__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_chai__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_chai__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_chai___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_chai___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state_reducer__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_state_actions__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_state_helpers__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_state_store__ = __webpack_require__(7);
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

	/* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('reducer actions', function () {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["describe"].bind()('rescale', function () {
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
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'models', 'modelA')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should disable a series type', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'series',
	        id: 'train_loss'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'series', 'train_loss')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should disable a unique model/series', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({});
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'uniques',
	        id: 'modelA/train_loss'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'uniques', 'modelA/train_loss')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should enable disabled elements', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: { modelA: true } } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'ENABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'model', 'modelA')).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should do nothing when enabled elements are enabled again', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: {} } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'ENABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'model', 'modelA')).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1_mocha__["it"].bind()('should do nothing when disabled elements are disabled again', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["fromJS"].bind()({ disabled: { models: { modelA: true } } });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_reducer__["a"].bind()(initialState, {
	        type: 'DISABLE',
	        category: 'models',
	        id: 'modelA'
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_2_chai__["expect"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_5__src_state_helpers__["a"].bind()(newState, 'models', 'modelA')).to.equal(true);
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
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var chai = __webpack_require__(3);
	var chaiImmutable = __webpack_require__(9);

	chai.use(chaiImmutable);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* harmony export */ exports["a"] = isDisabled;'use strict';



	function isDisabled(state, category, id) {

	  return state.get('disabled', /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()).get(category, /* harmony import */__WEBPACK_IMPORTED_MODULE_0_immutable__["Map"].bind()()).get(id, false) === true;
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducer__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(11);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __WEBPACK_IMPORTED_MODULE_0_redux__ && __WEBPACK_IMPORTED_MODULE_0_redux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_redux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_redux__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_redux___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_redux___default });
	/* harmony export */ exports["a"] = makeStore;'use strict';




	function makeStore() {
	  return /* harmony import */__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"].bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__reducer__["a"]);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test___default = __WEBPACK_IMPORTED_MODULE_1__state_test__ && __WEBPACK_IMPORTED_MODULE_1__state_test__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__state_test___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__state_test___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper___default = __WEBPACK_IMPORTED_MODULE_0__test_helper__ && __WEBPACK_IMPORTED_MODULE_0__test_helper__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__test_helper___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__test_helper___default });
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

/***/ }
/******/ ]);