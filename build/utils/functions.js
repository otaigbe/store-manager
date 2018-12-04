"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var customFunctions = {};

customFunctions.isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

customFunctions.typeOf = function (value) {
  var s = _typeof(value);
  /* istanbul ignore next */


  if (s === 'object') {
    if (value) {
      /* istanbul ignore next */
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }

  return s;
};
/* istanbul ignore next */


customFunctions.checkAndSwitchEnvironment = function () {
  var port = null;

  switch (process.env.NODE_ENV) {
    case 'test':
      port = process.env.TESTPORT || 5500;
      break;

    case 'development':
      port = process.env.DEVELOPMENTPORT || 7500;
      break;

    default:
      port = process.env.PORT || 6600;
  }

  return port;
};

var _default = customFunctions;
exports.default = _default;