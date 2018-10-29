'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _salesrecords = require('../dataholder/salesrecords');

var _salesrecords2 = _interopRequireDefault(_salesrecords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllerObj = {};
controllerObj.getSalesRecordById = function (req, res) {
  for (var i = 0; i < _salesrecords2.default.length; i += 1) {
    if (Number(_salesrecords2.default[i].salesRecordId) === Number(req.params.id)) {
      res.status(200).json(_salesrecords2.default[i]);
    }
  }
};

controllerObj.createSalesRecord = function (req, res) {
  var resource = req.body;
  // console.log(req.body);
  // console.log(salesrecords);
  _salesrecords2.default.push(req.body);
  return res.status(201).json({
    message: 'Successfully added product',
    'resource-created': resource
  });
};

controllerObj.getAllSalesRecord = function (req, res) {
  res.status(200).json(_salesrecords2.default);
};

exports.default = controllerObj;