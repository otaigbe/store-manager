'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../resourceImpl/signup');

var _signup2 = _interopRequireDefault(_signup);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); /* eslint-disable prefer-destructuring */


router.post('/', _auth2.default, _signup2.default.signup);

exports.default = router;