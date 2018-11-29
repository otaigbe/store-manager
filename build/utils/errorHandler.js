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

errorHandler.validationError = function (res, result) {
  /* istanbul ignore next */
  return res.status(422).json({
    message: 'Something wrong with input!',
    Error: result.error
  });
};

errorHandler.notFoundError = function (res) {
  return res.status(404).json({
    message: 'User doesn"t exist! Enter valid email and password'
  });
};

var _default = errorHandler;
exports.default = _default;