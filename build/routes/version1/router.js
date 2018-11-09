'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('../../resources/products');

var _products2 = _interopRequireDefault(_products);

var _signup = require('../../resources/signup');

var _signup2 = _interopRequireDefault(_signup);

var _login = require('../../resources/login');

var _login2 = _interopRequireDefault(_login);

var _sales = require('../../resources/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/products', _products2.default);
router.use('/auth/signup', _signup2.default);
router.use('/auth/login', _login2.default);
router.use('/sales', _sales2.default);
exports.default = router;