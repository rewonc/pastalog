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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutable___default = __WEBPACK_IMPORTED_MODULE_0_immutable__ && __WEBPACK_IMPORTED_MODULE_0_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_immutable___default });
	/* harmony export */ exports["f"] = toggleHover;/* harmony export */ exports["g"] = moveHover;/* harmony export */ exports["b"] = rescale;/* harmony export */ exports["c"] = resize;/* harmony export */ exports["d"] = disable;/* harmony export */ exports["e"] = enable;'use strict';



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

	function toggleHover(state, value) {
	  return state.update('hovering', function () {
	    return value;
	  });
	}

	function moveHover(coords, newCoords) {
	  return coords.merge(newCoords);
	}

	function rescale(scale, newScale) {
	  return scale.merge(newScale);
	}

	function resize(size, newSize) {
	  return size.merge(newSize);
	}

	function disable(state, category, id) {
	  return state.updateIn(['disabled', category, id], false, function () {
	    return true;
	  });
	}

	function enable(state, category, id) {
	  return state.deleteIn(['disabled', category, id]);
	}

	/* harmony default export */ exports["h"] = {
	  rescale: rescale, resize: resize, disable: disable, enable: enable, toggleHover: toggleHover, moveHover: moveHover, INITIAL_STATE: INITIAL_STATE
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.e = require("chai");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.e = require("immutable");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mocha__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mocha___default = __WEBPACK_IMPORTED_MODULE_0_mocha__ && __WEBPACK_IMPORTED_MODULE_0_mocha__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_mocha__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_mocha__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_mocha___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_mocha___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai__ = __webpack_require__(1);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chai___default = __WEBPACK_IMPORTED_MODULE_1_chai__ && __WEBPACK_IMPORTED_MODULE_1_chai__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_chai__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_chai__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_chai___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_chai___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_state_reducer__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_state_actions__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_immutable___default = __WEBPACK_IMPORTED_MODULE_4_immutable__ && __WEBPACK_IMPORTED_MODULE_4_immutable__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4_immutable__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4_immutable__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_4_immutable___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_4_immutable___default });
	'use strict';







	/* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('reducer actions', function () {
	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('rescale', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should work for state variables with no scale property', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({});
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should work for state variables that are null', function () {
	      var initialState = null;
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should apply defaults when state variable is undefined', function () {
	      var initialState = undefined;
	      var newScale = { xMin: 10 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_3__src_state_actions__["h"].get('scale').update('xMin', 10));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should update multiple values for scale at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ scale: {} });
	      var newScale = { xMin: 10, yMin: 20, xMax: 30, yMax: 40 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()(newScale));
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should work when update only includes some keys', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ scale: { xMin: 10, xMax: 30 } });
	      var newScale = { xMax: 30, yMax: 40 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESCALE',
	        scale: newScale
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('scale')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({
	        xMin: 10, xMax: 30, yMax: 40
	      }));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('resize', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should update multiple values for size at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ size: { width: 100, height: 200 } });
	      var newSize = { height: 1000, width: 1000 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'RESIZE',
	        size: newSize
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('size')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()(newSize));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('moveHover', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should update multiple values for coordinates at once', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ hoverPosition: { hoverX: 100, hoverY: 200 } });
	      var newCoords = { hoverX: 1000, hoverY: 1000 };
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'MOVE_HOVER',
	        coords: newCoords
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('hoverPosition')).to.equal(/* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()(newCoords));
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('disable and enable', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should disable a model', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should disable a series type', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should disable a unique model/series', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should enable disabled elements', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should do nothing when enabled elements are enabled again', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should do nothing when disabled elements are disabled again', function () {
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(true).to.equal(false);
	    });
	  });

	  /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["describe"].bind()('toggle hover', function () {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should set hover to true', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ hovering: false });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: true
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('hovering')).to.equal(true);
	      var newState2 = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: true
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState2.get('hovering')).to.equal(true);
	    });

	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0_mocha__["it"].bind()('should set hover to false', function () {
	      var initialState = /* harmony import */__WEBPACK_IMPORTED_MODULE_4_immutable__["fromJS"].bind()({ hovering: true });
	      var newState = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__src_state_reducer__["a"].bind()(initialState, {
	        type: 'TOGGLE_HOVER',
	        value: false
	      });
	      /* harmony import */__WEBPACK_IMPORTED_MODULE_1_chai__["expect"].bind()(newState.get('hovering')).to.equal(false);
	    });
	  });
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var chai = __webpack_require__(1);
	var chaiImmutable = __webpack_require__(7);

	chai.use(chaiImmutable);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(0);
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
	      return state.update('scale', function (scale) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["b"].bind()(scale, action.scale);
	      });
	    case 'RESIZE':
	      return state.update('size', function (size) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["c"].bind()(size, action.size);
	      });
	    case 'DISABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["d"].bind()(state, action.category, action.id);
	    case 'ENABLE':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["e"].bind()(state, action.category, action.id);
	    case 'TOGGLE_HOVER':
	      return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["f"].bind()(state, action.value);
	    case 'MOVE_HOVER':
	      return state.update('hoverPosition', function (coords) {
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__actions__["g"].bind()(coords, action.coords);
	      });
	    default:
	      return state;
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__test_helper___default = __WEBPACK_IMPORTED_MODULE_0__test_helper__ && __WEBPACK_IMPORTED_MODULE_0__test_helper__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__test_helper__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0__test_helper___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0__test_helper___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state_test___default = __WEBPACK_IMPORTED_MODULE_1__state_test__ && __WEBPACK_IMPORTED_MODULE_1__state_test__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__state_test__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__state_test___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__state_test___default });
	'use strict';




/***/ },
/* 7 */
/***/ function(module, exports) {

	module.e = require("chai-immutable");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.e = require("mocha");

/***/ }
/******/ ]);