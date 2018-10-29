'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _productStore = require('../dataholder/productStore');

var _productStore2 = _interopRequireDefault(_productStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var productControlObj = {};

productControlObj.createProduct = function (req, res) {
  var resource = req.body;
  // console.log(req.body);
  _productStore2.default.push(req.body);
  return res.status(201).json({
    message: 'Successfully added product',
    'resource-created': resource
  });
};

productControlObj.getAllProducts = function (req, res) {
  return res.status(302).json(_productStore2.default);
};

productControlObj.getProductById = function (req, res) {
  _productStore2.default.find(function (element) {
    if (Number(element.Id) === Number(req.params.id)) {
      return res.status(302).json({
        message: 'resource found',
        resource: element
      });
    }
  });
};

exports.default = productControlObj;