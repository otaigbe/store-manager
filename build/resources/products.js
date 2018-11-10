"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productImpl = _interopRequireDefault(require("../resourceImpl/productImpl"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/?', _productImpl.default.getAllProducts);
router.get('/:id', _productImpl.default.getProductById);
router.post('/', _auth.default, _productImpl.default.addProduct);
router.put('/:id', _auth.default, _productImpl.default.modifyAProduct);
router.delete('/:id', _auth.default, _productImpl.default.deleteProduct);
var _default = router;
exports.default = _default;