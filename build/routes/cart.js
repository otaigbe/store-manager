'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cartController = require('../controllers/cartController');

var _cartController2 = _interopRequireDefault(_cartController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.post('/', _cartController2.default.addToCart);
/* router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.modifyProduct);
router.delete('/:id', controller.deleteProduct); */

exports.default = router;