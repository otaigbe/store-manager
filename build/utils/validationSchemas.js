"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schemas = {};
schemas.loginSchema = _joi.default.object({
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }),
  password: _joi.default.string().required()
});
schemas.signupSchema = _joi.default.object({
  name: _joi.default.string().min(3).required(),
  lastname: _joi.default.string().min(3).required(),
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }),
  password: _joi.default.string().required(),
  phoneNumber: _joi.default.number().required(),
  admin: _joi.default.boolean().required()
});
schemas.createProductSchema = _joi.default.object({
  product_desc: _joi.default.string().min(3).required(),
  unit_price: _joi.default.number().required(),
  quantity_in_stock: _joi.default.number().required(),
  quantity_supplied: _joi.default.number().required(),
  supplier_name: _joi.default.string().required(),
  category: _joi.default.string().required()
});
schemas.ModifyProductSchema = _joi.default.object({
  product_id: _joi.default.number().required(),
  product_desc: _joi.default.string().min(3).required(),
  unit_price: _joi.default.number().required(),
  quantity_in_stock: _joi.default.number().required(),
  quantity_supplied: _joi.default.number().required(),
  supplier_name: _joi.default.string().required(),
  category: _joi.default.string().required()
});
var _default = schemas;
exports.default = _default;