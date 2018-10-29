'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/', _productController2.default.createProduct);
router.get('/', _productController2.default.getAllProducts);
router.get('/:id', _productController2.default.getProductById);
exports.default = router;