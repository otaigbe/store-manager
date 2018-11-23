"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _product = _interopRequireDefault(require("../resourceImpl/product"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/?', _product.default.getAllProducts);
router.get('/:id', _product.default.getProductById);
router.post('/', _auth.default, _product.default.addProduct);
router.put('/:id', _auth.default, _product.default.modifyAProduct);
router.put('/', _product.default.modifyProductQuantityAfterSale);
router.delete('/:id', _auth.default, _product.default.deleteProduct);
var _default = router;
exports.default = _default;