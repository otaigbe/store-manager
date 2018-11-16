"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

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
  quantity_supplied: _joi.default.number().required(),
  supplier_name: _joi.default.string().required(),
  category: _joi.default.string().required()
});

var schema2 = _joi.default.object({
  product_id: _joi.default.number().required(),
  product_desc: _joi.default.string().min(3).required(),
  unit_price: _joi.default.number().required(),
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
    var result, productDesc, unitPrice, quantitySupplied, supplierName, category, temp3, temp, resultSet, currentQuantityInStock, temp2, updateResult, insertResultSet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _joi.default.validate(req.body, schema);

            if (!(result.error === null)) {
              _context.next = 33;
              break;
            }

            productDesc = req.body.product_desc;
            unitPrice = req.body.unit_price;
            quantitySupplied = req.body.quantity_supplied;
            supplierName = req.body.supplier_name;
            category = req.body.category;
            temp3 = [productDesc, unitPrice, quantitySupplied, supplierName, category];
            temp = [productDesc];
            _context.prev = 9;
            _context.next = 12;
            return _dbConnection.default.query(_queries.default.selectProductIfExist, temp);

          case 12:
            resultSet = _context.sent;

            if (!(resultSet.rowCount === 1)) {
              _context.next = 21;
              break;
            }

            currentQuantityInStock = resultSet.rows[0].quantity_in_stock;
            console.log(currentQuantityInStock);
            temp2 = [Number(quantitySupplied) + Number(currentQuantityInStock), productDesc, unitPrice];
            _context.next = 19;
            return _dbConnection.default.query(_queries.default.updateProductDuringCreation, temp2);

          case 19:
            updateResult = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: 'Updated an already existent product.'
            }));

          case 21:
            if (!(resultSet.rowCount === 0)) {
              _context.next = 26;
              break;
            }

            _context.next = 24;
            return _dbConnection.default.query(_queries.default.insertProduct, temp3);

          case 24:
            insertResultSet = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              message: 'Created a new product.',
              Resource: req.body
            }));

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](9);

            /* istanbul ignore next */
            res.status(501).json({
              message: _context.t0.message
            });

          case 31:
            _context.next = 34;
            break;

          case 33:
            return _context.abrupt("return", res.status(422).json({
              message: 'Something wrong with input!',
              Error: result.error
            }));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 28]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

productImpl.getAllProducts = function (req, res) {
  try {
    var urlQuery = req.query;
    var args = [];

    if (!_functions.default.isEmpty(urlQuery)) {
      var page = req.query.pageNumber;
      var itemsPerPage = 5;
      var pageOffset = (page - 1) * itemsPerPage;
      args.push(itemsPerPage);
      args.push(pageOffset);

      _dbConnection.default.connect(
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(err, client) {
          var count, selectResultSet;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  /* istanbul ignore next */
                  if (err) _errorHandler.default.connectionError(err, res);
                  _context2.next = 3;
                  return client.query(_queries.default.countAllProducts);

                case 3:
                  count = _context2.sent;
                  _context2.next = 6;
                  return client.query(_queries.default.selectProductsWithPagination, args);

                case 6:
                  selectResultSet = _context2.sent;
                  res.status(200).json({
                    message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
                    Products: selectResultSet.rows
                  });

                case 8:
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
    } else {
      _dbConnection.default.connect(
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(error, client) {
          var selectResultSet;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  /* istanbul ignore next */
                  if (error) _errorHandler.default.connectionError(error, res);
                  _context3.next = 3;
                  return client.query(_queries.default.selectProductsWithoutPagination);

                case 3:
                  selectResultSet = _context3.sent;
                  res.status(200).json({
                    message: 'Showing pages All Products',
                    Products: selectResultSet.rows
                  });

                case 5:
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
    }
  } catch (e) {
    /* istanbul ignore next */
    res.status(501).json({
      message: 'Query wasn\'t executed',
      Error: e.message
    });
  }
};

productImpl.modifyAProduct =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var result, args, temp, queryResult, updateResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            result = _joi.default.validate(req.body, schema2);

            if (!(result.error === null)) {
              _context4.next = 22;
              break;
            }

            args = [req.body.product_id, req.body.product_desc, req.body.unit_price, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
            temp = [req.params.id, req.body.product_desc];
            _context4.prev = 4;
            _context4.next = 7;
            return _dbConnection.default.query(_queries.default.checkIfAProductExist, temp);

          case 7:
            queryResult = _context4.sent;

            if (!(queryResult.rowCount === 1)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 11;
            return _dbConnection.default.query(_queries.default.updateProduct, args);

          case 11:
            updateResult = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: 'Product Modified'
            }));

          case 13:
            if (!(queryResult.rowCount === 0)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Create the Product'
            }));

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](4);
            return _context4.abrupt("return", res.status(501).json({
              message: 'Something went wrong: Couldn\'t modify the product',
              ErrorMessage: _context4.t0.message
            }));

          case 20:
            _context4.next = 23;
            break;

          case 22:
            return _context4.abrupt("return", res.status(422).json({
              message: 'Validation error! Please check your input',
              ErrorMessage: result.error
            }));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[4, 17]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

productImpl.deleteProduct =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var args, queryResult;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            args = [req.params.id];
            _context5.prev = 1;
            _context5.next = 4;
            return _dbConnection.default.query(_queries.default.selectProductById, args);

          case 4:
            queryResult = _context5.sent;

            if (!(queryResult.rowCount === 1)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 8;
            return _dbConnection.default.query(_queries.default.deleteProduct, args);

          case 8:
            return _context5.abrupt("return", res.status(200).json({
              message: 'Product Deleted'
            }));

          case 9:
            if (!(queryResult.rowCount === 0)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: 'Product doesn\'t exist! Nothing to Delete'
            }));

          case 11:
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", res.status(501).json({
              message: 'Something went wrong: Couldn\'t delete the product',
              ErrorMessage: _context5.t0.message
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[1, 13]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

productImpl.getProductById = function (req, res) {
  var args = [req.params.id];

  _dbConnection.default.connect(
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(err, client) {
      var queryResult;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              /* istanbul ignore next */
              if (err) _errorHandler.default.connectionError(err, res);
              _context6.prev = 1;
              _context6.next = 4;
              return client.query(_queries.default.selectProductById, args);

            case 4:
              queryResult = _context6.sent;

              if (!(queryResult.rowCount === 1)) {
                _context6.next = 7;
                break;
              }

              return _context6.abrupt("return", res.status(200).json({
                message: 'Product Found!',
                Product: queryResult.rows
              }));

            case 7:
              if (!(queryResult.rowCount === 0)) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", res.status(404).json({
                message: 'Product doesn\'t exist!'
              }));

            case 9:
              _context6.next = 14;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(404).json({
                message: 'Something went wrong: Couldn\'t acess the product',
                ErrorMessage: _context6.t0.message
              }));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 11]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};

var _default = productImpl;
exports.default = _default;