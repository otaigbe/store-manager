"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var errorHandler = {};

errorHandler.connectionError = function (err, res) {
  /* istanbul ignore next */
  res.status(501).json({
    message: err.message,
    ErrorMessage: err
  });
};

var _default = errorHandler;
exports.default = _default;