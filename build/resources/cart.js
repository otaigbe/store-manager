"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cart = _interopRequireDefault(require("../resourceImpl/cart"));

var _cartAuth = _interopRequireDefault(require("../middleware/cartAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.get('/', _cartAuth.default, _cart.default.getAllProducts);
var _default = router;
exports.default = _default;