'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = {};
auth.authenticate = function (req, res, next) {
  try {
    var decoded = _jsonwebtoken2.default.verify(req.body.token, process.env.SECRETKEY);
    if (decoded.admin === true) {
      next();
    } else {
      return res.status(401).json({
        message: 'Authenticatication failed'
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Authenticatication failed'
    });
  }
};
exports.default = auth;