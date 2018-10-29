'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _salesrecords = require('../dataholder/salesrecords');

var _salesrecords2 = _interopRequireDefault(_salesrecords);

var _salesController = require('../controllers/salesController');

var _salesController2 = _interopRequireDefault(_salesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _salesController2.default.createSalesRecord);

router.get('/', _salesController2.default.getAllSalesRecord);

router.get('/:id', _salesController2.default.getSalesRecordById);

exports.default = router;