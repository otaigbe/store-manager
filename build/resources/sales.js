'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _salesAuth = require('../middleware/sales-auth');

var _salesAuth2 = _interopRequireDefault(_salesAuth);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _sales = require('../resourceImpl/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _salesAuth2.default, _sales2.default.createSalesRecord);
router.get('/', _auth2.default, _sales2.default.getAllSalesRecords);
router.get('/:id', _auth2.default, _sales2.default.getSalesRecordById);

exports.default = router;