"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(err, req, res, next) {
  res.status(501).json({
    message: 'Something went wrong!',
    Error: err.message
  });
}