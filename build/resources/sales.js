"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _salesAuth = _interopRequireDefault(require("../middleware/sales-auth"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _sales = _interopRequireDefault(require("../resourceImpl/sales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/', _salesAuth.default, _sales.default.createSalesRecord);
router.get('/', _auth.default, _sales.default.getAllSalesRecords);
router.get('/:id', _auth.default, _sales.default.getSalesRecordById);
var _default = router;
exports.default = _default;