"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeOf = typeOf;
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function typeOf(value) {
  var s = _typeof(value);

  if (s === 'object') {
    if (value) {
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }

  return s;
}

var auth = function auth(req, res, next) {
  var token = req.header('x-auth-token');
  var name;

  if (typeOf(req.body) === 'array') {
    name = req.body[0].attendant_name;
  } else {
    name = req.body.attendant_name;
  }

  if (!token) {
    return res.status(401).json({
      message: 'No access token provided! Unaccessible resource'
    });
  } else if (token) {
    try {
      var decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY);

      if (decoded.name === name) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({
          message: 'Forbidden! You need to have  appropraite privileges'
        });
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
};

var _default = auth;
exports.default = _default;