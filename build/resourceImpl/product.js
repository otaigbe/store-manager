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

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productImpl = {};

var schema = _joi.default.object({
  product_desc: _joi.default.string().min(3).required(),
  unit_price: _joi.default.number().required(),
  quantity_in_stock: _joi.default.number().required(),
  quantity_supplied: _joi.default.number().required(),
  supplier_name: _joi.default.string().required(),
  category: _joi.default.string().required()
});

var schema2 = _joi.default.object({
  product_id: _joi.default.number().required(),
  product_desc: _joi.default.string().min(3).required(),
  unit_price: _joi.default.number().required(),
  quantity_in_stock: _joi.default.number().required(),
  quantity_supplied: _joi.default.number().required(),
  supplier_name: _joi.default.string().required(),
  category: _joi.default.string().required()
});

var schema3 = _joi.default.object({
  product_id: _joi.default.number().required()
});

productImpl.addProduct =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result, productDesc, unitPrice, quantityInStock, quantitySupplied, supplierName, category, temp3, temp, resultSet, insertResultSet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _joi.default.validate(req.body, schema);

            if (!(result.error === null)) {
              _context.next = 28;
              break;
            }

            productDesc = req.body.product_desc;
            unitPrice = req.body.unit_price;
            quantityInStock = req.body.quantity_in_stock;
            quantitySupplied = req.body.quantity_supplied;
            supplierName = req.body.supplier_name;
            category = req.body.category;
            temp3 = [productDesc, unitPrice, quantityInStock, quantitySupplied, supplierName, category];
            temp = [productDesc];
            _context.prev = 10;
            _context.next = 13;
            return _dbConnection.default.query(_queries.default.selectProductIfExist, temp);

          case 13:
            resultSet = _context.sent;

            if (!(resultSet.rowCount === 1)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(200).json({
              message: 'Product already exists Modify instead.'
            }));

          case 16:
            if (!(resultSet.rowCount === 0)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return _dbConnection.default.query(_queries.default.insertProduct, temp3);

          case 19:
            insertResultSet = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              message: 'Created a new product.',
              Resource: req.body
            }));

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](10);

            /* istanbul ignore next */
            res.status(501).json({
              message: _context.t0.message
            });

          case 26:
            _context.next = 29;
            break;

          case 28:
            return _context.abrupt("return", res.status(422).json({
              message: 'Something wrong with input!',
              Error: result.error
            }));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

productImpl.getAllProducts =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var urlQuery, args, page, itemsPerPage, pageOffset, count, selectResultSet, _selectResultSet;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            urlQuery = req.query;
            args = [];

            if (_functions.default.isEmpty(urlQuery)) {
              _context2.next = 23;
              break;
            }

            page = req.query.pageNumber;
            itemsPerPage = 5;
            pageOffset = (page - 1) * itemsPerPage;
            args.push(itemsPerPage);
            args.push(pageOffset);
            _context2.prev = 8;
            _context2.next = 11;
            return _dbConnection.default.query(_queries.default.countAllProducts);

          case 11:
            count = _context2.sent;
            _context2.next = 14;
            return _dbConnection.default.query(_queries.default.getProductsWithPagination, args);

          case 14:
            selectResultSet = _context2.sent;
            res.status(200).json({
              message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
              Products: selectResultSet.rows
            });
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](8);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context2.t0.message
            });

          case 21:
            _context2.next = 33;
            break;

          case 23:
            _context2.prev = 23;
            _context2.next = 26;
            return _dbConnection.default.query(_queries.default.getProductsWithoutPagination);

          case 26:
            _selectResultSet = _context2.sent;
            res.status(200).json({
              message: 'Showing pages All Products',
              Products: _selectResultSet.rows
            });
            _context2.next = 33;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2["catch"](23);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context2.t1.message
            });

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[8, 18], [23, 30]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

productImpl.modifyAProduct =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var result, args, temp, queryResult, updateResult;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = _joi.default.validate(req.body, schema2);

            if (!(result.error === null)) {
              _context3.next = 22;
              break;
            }

            args = [req.body.product_id, req.body.product_desc, req.body.unit_price, req.body.quantity_in_stock, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
            temp = [req.params.id, req.body.product_desc];
            _context3.prev = 4;
            _context3.next = 7;
            return _dbConnection.default.query(_queries.default.checkIfAProductExist, temp);

          case 7:
            queryResult = _context3.sent;

            if (!(queryResult.rowCount === 1)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 11;
            return _dbConnection.default.query(_queries.default.updateProduct, args);

          case 11:
            updateResult = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              message: 'Product Modified'
            }));

          case 13:
            if (!(queryResult.rowCount === 0)) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Create the Product'
            }));

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](4);
            return _context3.abrupt("return", res.status(501).json({
              message: 'Something went wrong: Couldn\'t modify the product',
              ErrorMessage: _context3.t0.message
            }));

          case 20:
            _context3.next = 23;
            break;

          case 22:
            return _context3.abrupt("return", res.status(422).json({
              message: 'Validation error! Please check your input',
              ErrorMessage: result.error
            }));

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 17]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

productImpl.deleteProduct =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var args, queryResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            args = [req.params.id];
            _context4.prev = 1;
            _context4.next = 4;
            return _dbConnection.default.query(_queries.default.selectProductById, args);

          case 4:
            queryResult = _context4.sent;

            if (!(queryResult.rowCount === 1)) {
              _context4.next = 9;
              break;
            }

            _context4.next = 8;
            return _dbConnection.default.query(_queries.default.deleteProduct, args);

          case 8:
            return _context4.abrupt("return", res.status(200).json({
              message: 'Product Deleted'
            }));

          case 9:
            if (!(queryResult.rowCount === 0)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Nothing to Delete'
            }));

          case 11:
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(501).json({
              message: 'Something went wrong: Couldn\'t delete the product',
              ErrorMessage: _context4.t0.message
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

productImpl.getProductById = function (req, res) {
  var args = [req.params.id];

  _dbConnection.default.connect(
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(err, client) {
      var queryResult;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              /* istanbul ignore next */
              if (err) _errorHandler.default.connectionError(err, res);
              _context5.prev = 1;
              _context5.next = 4;
              return client.query(_queries.default.selectProductById, args);

            case 4:
              queryResult = _context5.sent;

              if (!(queryResult.rowCount === 1)) {
                _context5.next = 7;
                break;
              }

              return _context5.abrupt("return", res.status(200).json({
                message: 'Product Found!',
                Product: queryResult.rows
              }));

            case 7:
              if (!(queryResult.rowCount === 0)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Product doesn\'t exist!'
              }));

            case 9:
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(404).json({
                message: 'Something went wrong: Couldn\'t acess the product',
                ErrorMessage: _context5.t0.message
              }));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

productImpl.modifyProductQuantityAfterSale =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var args, sql, updateResult;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            args = req.body;
            _context6.prev = 1;
            sql = (0, _pgFormat.default)('update products as p set quantity_in_stock = quantity_in_stock - CAST(q.qty_bought AS INTEGER) from (values %L) as q(qty_bought, product_id) where CAST(q.product_id AS INTEGER) = p.product_id;', args);
            console.log(sql);
            _context6.next = 6;
            return _dbConnection.default.query(sql);

          case 6:
            updateResult = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              message: 'Product Modified'
            }));

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](1);
            return _context6.abrupt("return", res.status(501).json({
              message: 'Something went wrong: Couldn\'t modify the product',
              ErrorMessage: _context6.t0.message
            }));

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[1, 10]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var _default = productImpl;
exports.default = _default;