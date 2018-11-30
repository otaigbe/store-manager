"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _functions = _interopRequireDefault(require("../utils/functions"));

var _errorHandler = _interopRequireDefault(require("../utils/errorHandler"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

var _async = _interopRequireDefault(require("../middleware/async"));

var _ImplFunctions = _interopRequireDefault(require("./ImplFunctions"));

var _validationSchemas = _interopRequireDefault(require("../utils/validationSchemas"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productImpl = {};
productImpl.addProduct = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result, temp3, temp, resultSet, insertResultSet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _joi.default.validate(req.body, _validationSchemas.default.createProductSchema);

            if (!(result.error === null)) {
              _context.next = 16;
              break;
            }

            temp3 = [req.body.product_desc, req.body.unit_price, req.body.quantity_in_stock, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
            temp = [req.body.product_desc];
            _context.next = 6;
            return _dbConnection.default.query(_queries.default.selectProductIfExist, temp);

          case 6:
            resultSet = _context.sent;

            if (!(resultSet.rowCount === 1)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              message: 'Product already exists Modify instead.'
            }));

          case 9:
            if (!(resultSet.rowCount === 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return _dbConnection.default.query(_queries.default.insertProduct, temp3);

          case 12:
            insertResultSet = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              message: 'Created a new product.',
              Resource: req.body
            }));

          case 14:
            _context.next = 17;
            break;

          case 16:
            _errorHandler.default.validationError(res, result);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
productImpl.getAllProducts = (0, _async.default)(function (req, res) {
  var urlQuery = req.query;

  if (!_functions.default.isEmpty(urlQuery)) {
    var args = [];
    var page = urlQuery.pageNumber;

    _ImplFunctions.default.fetchAllStuffWithPagination(res, page, _queries.default.countAllProducts, _queries.default.selectProductsWithPagination, args);
  } else {
    _ImplFunctions.default.fetchAllStuffWithoutPagination(res, _queries.default.getProductsWithoutPagination);
  }
});
productImpl.modifyAProduct = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var result, args, temp, queryResult, updateResult;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = _joi.default.validate(req.body, _validationSchemas.default.ModifyProductSchema);

            if (!(result.error === null)) {
              _context2.next = 16;
              break;
            }

            args = [req.body.product_id, req.body.product_desc, req.body.unit_price, req.body.quantity_in_stock, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
            temp = [req.params.id, req.body.product_desc];
            _context2.next = 6;
            return _dbConnection.default.query(_queries.default.checkIfAProductExist, temp);

          case 6:
            queryResult = _context2.sent;

            if (!(queryResult.rowCount === 1)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return _dbConnection.default.query(_queries.default.updateProduct, args);

          case 10:
            updateResult = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              message: 'Product Modified'
            }));

          case 12:
            if (!(queryResult.rowCount === 0)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Create the Product'
            }));

          case 14:
            _context2.next = 17;
            break;

          case 16:
            _errorHandler.default.validationError(res, result);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
productImpl.deleteProduct = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var args, queryResult;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args = [req.params.id];
            _context3.next = 3;
            return _dbConnection.default.query(_queries.default.selectProductById, args);

          case 3:
            queryResult = _context3.sent;

            if (!(queryResult.rowCount === 1)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 7;
            return _dbConnection.default.query(_queries.default.deleteProduct, args);

          case 7:
            return _context3.abrupt("return", res.status(200).json({
              message: 'Product Deleted'
            }));

          case 8:
            if (!(queryResult.rowCount === 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Nothing to Delete'
            }));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
productImpl.getProductById = (0, _async.default)(function (req, res) {
  var args = [req.params.id];

  _ImplFunctions.default.getResourceById(res, _queries.default.selectProductById, args);
});
/* istanbul ignore next */

productImpl.modifyProductQuantityAfterSale = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var args, sql, updateResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            args = req.body;
            sql = (0, _pgFormat.default)('update products as p set quantity_in_stock = quantity_in_stock - CAST(q.qty_bought AS INTEGER) from (values %L) as q(qty_bought, product_id) where CAST(q.product_id AS INTEGER) = p.product_id;', args); // console.log(sql);

            _context4.next = 4;
            return _dbConnection.default.query(sql);

          case 4:
            updateResult = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: 'Product Modified'
            }));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = productImpl;
exports.default = _default;