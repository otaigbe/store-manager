'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mainController = require('./mainrouter/mainController');

var _mainController2 = _interopRequireDefault(_mainController);

var _authController = require('./mainrouter/authController');

var _authController2 = _interopRequireDefault(_authController);

require('body-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.static('./UI'));
app.use(_express2.default.json());

app.use('/api/v1', _mainController2.default);
app.use('/auth', _authController2.default);

var port = process.env.PORT || 4400;
var server = app.listen(port, function () {
  console.log('app running on ' + port + '...');
});

exports.default = server;