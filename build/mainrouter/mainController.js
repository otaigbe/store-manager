'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('../routes/products');

var _products2 = _interopRequireDefault(_products);

var _sales = require('../routes/sales');

var _sales2 = _interopRequireDefault(_sales);

var _cart = require('../routes/cart');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/products', _products2.default);
router.use('/sales', _sales2.default);
router.use('/cart', _cart2.default);

exports.default = router;