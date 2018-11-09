'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productImpl = require('../resourceImpl/productImpl');

var _productImpl2 = _interopRequireDefault(_productImpl);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/?', _productImpl2.default.getAllProducts);

router.get('/:id', _productImpl2.default.getProductById);

router.post('/', _auth2.default, _productImpl2.default.addProduct);

router.put('/:id', _auth2.default, _productImpl2.default.modifyAProduct);

router.delete('/:id', _auth2.default, _productImpl2.default.deleteProduct);

exports.default = router;