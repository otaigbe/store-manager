'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../routes/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('../routes/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/signup', _signup2.default);
router.use('/login', _login2.default);

exports.default = router;