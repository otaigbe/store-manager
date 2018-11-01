'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _product = require('../controllers/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/', _product2.default.createProduct);
router.get('/', _product2.default.getAllProducts);
router.get('/:id', _product2.default.getProductById);
router.put('/:id', _product2.default.modifyProduct);
router.delete('/:id', _product2.default.deleteProduct);

exports.default = router;