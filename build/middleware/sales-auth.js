'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  var token = req.header('x-auth-token');
  var name = req.body[0].attendant_name;
  if (!token) {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  } else if (token) {
    try {
      var decoded = _jsonwebtoken2.default.verify(token, process.env.JWTKEY);
      if (decoded.name === name) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ message: 'Forbidden! You need to have  appropraite privileges' });
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
}; /* eslint-disable no-else-return */
exports.default = auth;