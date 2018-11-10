"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _products = _interopRequireDefault(require("../../resources/products"));

var _signup = _interopRequireDefault(require("../../resources/signup"));

var _login = _interopRequireDefault(require("../../resources/login"));

var _sales = _interopRequireDefault(require("../../resources/sales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use('/products', _products.default);
router.use('/auth/signup', _signup.default);
router.use('/auth/login', _login.default);
router.use('/sales', _sales.default);
var _default = router;
exports.default = _default;