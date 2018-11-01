'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sales = require('../controllers/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _sales2.default.createSalesRecord);
router.get('/', _sales2.default.getAllSalesRecord);
router.get('/:id', _sales2.default.getSalesRecordById);

exports.default = router;