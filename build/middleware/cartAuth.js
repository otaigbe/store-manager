"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-else-return */
var auth = function auth(req, res, next) {
  var token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      message: 'No access token provided! Unaccessible resource'
    });
  }

  if (token) {
    /* istanbul ignore next */
    try {
      var decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY);

      if (decoded.admin === false || decoded.admin === 'false') {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({
          message: 'Forbidden! You need to have  admin privileges'
        });
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
};

var _default = auth;
exports.default = _default;