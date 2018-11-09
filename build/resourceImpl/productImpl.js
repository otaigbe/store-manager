'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _queries = require('../dbUtils/queries/queries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable consistent-return */


var productImpl = {};
var schema = _joi2.default.object({
  product_desc: _joi2.default.string().min(3).required(),
  unit_price: _joi2.default.number().required(),
  quantity_supplied: _joi2.default.number().required(),
  supplier_name: _joi2.default.string().required(),
  category: _joi2.default.string().required()
});

var schema2 = _joi2.default.object({
  product_id: _joi2.default.number().required(),
  product_desc: _joi2.default.string().min(3).required(),
  unit_price: _joi2.default.number().required(),
  quantity_supplied: _joi2.default.number().required(),
  supplier_name: _joi2.default.string().required(),
  category: _joi2.default.string().required()
});

var schema3 = _joi2.default.object({
  product_id: _joi2.default.number().required()
});
productImpl.addProduct = function (req, res) {
  var result = _joi2.default.validate(req.body, schema);
  if (result.error === null) {
    var productDesc = req.body.product_desc;
    var unitPrice = req.body.unit_price;
    var quantitySupplied = req.body.quantity_supplied;
    var supplierName = req.body.supplier_name;
    var category = req.body.category;
    var temp3 = [productDesc, unitPrice, quantitySupplied, supplierName, category];
    var temp = [productDesc];
    _queries.pool.connect(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
        var resultSet, currentQuantityInStock, temp2, updateResult, insertResultSet;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', res.status(501).json({ message: err.message }));

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return client.query(_queries.queries.selectProductIfExist, temp);

              case 5:
                resultSet = _context.sent;

                if (!(resultSet.rowCount === 1)) {
                  _context.next = 14;
                  break;
                }

                currentQuantityInStock = resultSet.rows[0].quantity_in_stock;

                console.log(currentQuantityInStock);
                temp2 = [Number(quantitySupplied) + Number(currentQuantityInStock), productDesc, unitPrice];
                // console.log(temp2);

                _context.next = 12;
                return client.query(_queries.queries.updateProductDuringCreation, temp2);

              case 12:
                updateResult = _context.sent;
                return _context.abrupt('return', res.status(200).json({ message: 'Updated an already existent product.' }));

              case 14:
                if (!(resultSet.rowCount === 0)) {
                  _context.next = 19;
                  break;
                }

                _context.next = 17;
                return client.query(_queries.queries.insertProduct, temp3);

              case 17:
                insertResultSet = _context.sent;
                return _context.abrupt('return', res.status(201).json({
                  message: 'Created a new product.',
                  Resource: req.body
                }));

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context['catch'](2);
                return _context.abrupt('return', res.status(501).json({ message: _context.t0.message }));

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[2, 21]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  } else {
    return res.status(422).json({
      message: 'Something wrong with input!',
      Error: result.error
    });
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
productImpl.getAllProducts = function (req, res) {
  var urlQuery = req.query;
  var args = [];
  if (!isEmpty(urlQuery)) {
    var page = req.query.pageNumber;
    var itemsPerPage = 5;
    var pageOffset = (page - 1) * itemsPerPage;
    args.push(itemsPerPage);
    args.push(pageOffset);
    _queries.pool.connect(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, client) {
        var count, selectResultSet;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', res.status(501).json({
                  message: 'Internal Database Error',
                  Error: err.message
                }));

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return client.query(_queries.queries.countAllProducts);

              case 5:
                count = _context2.sent;
                _context2.next = 8;
                return client.query(_queries.queries.selectProductsWithPagination, args);

              case 8:
                selectResultSet = _context2.sent;

                res.status(200).json({
                  message: 'Showing pages ' + page + ' of ' + count.rows.length,
                  Products: selectResultSet.rows
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2['catch'](2);

                res.status(501).json({
                  message: 'Query wasn\'t executed',
                  Error: _context2.t0.message
                });

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[2, 12]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  } else {
    _queries.pool.connect(function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(error, client) {
        var selectResultSet;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!error) {
                  _context3.next = 3;
                  break;
                }

                console.log(error);
                return _context3.abrupt('return', res.status(501).json({
                  message: 'Internal Database Error',
                  Error: error
                }));

              case 3:
                _context3.next = 5;
                return client.query(_queries.queries.selectProductsWithoutPagination);

              case 5:
                selectResultSet = _context3.sent;

                res.status(200).json({
                  message: 'Showing pages All Products',
                  Products: selectResultSet.rows
                });

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }());
  }
};

productImpl.modifyAProduct = function (req, res) {
  var result = _joi2.default.validate(req.body, schema2);
  if (result.error === null) {
    var args = [req.params.id, req.body.product_desc, req.body.unit_price, req.body.quantity_supplied, req.body.supplier_name, req.body.category];
    var temp = [req.params.id, req.body.product_desc];
    _queries.pool.connect(function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, client) {
        var queryResult, updateResult;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!err) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', res.status(501).json({ message: 'Somethings up with the database!' }));

              case 2:
                _context4.prev = 2;
                _context4.next = 5;
                return client.query(_queries.queries.checkIfAProductExist, temp);

              case 5:
                queryResult = _context4.sent;

                if (!(queryResult.rowCount === 1)) {
                  _context4.next = 17;
                  break;
                }

                _context4.prev = 7;
                _context4.next = 10;
                return client.query(_queries.queries.updateProduct, args);

              case 10:
                updateResult = _context4.sent;

                res.status(200).json({ message: 'Product Modified' });
                _context4.next = 17;
                break;

              case 14:
                _context4.prev = 14;
                _context4.t0 = _context4['catch'](7);
                return _context4.abrupt('return', res.status(404).json({
                  message: 'Something went wrong: Couldn\'t modify the product',
                  ErrorMessage: _context4.t0.message
                }));

              case 17:
                if (!(queryResult.rowCount === 0)) {
                  _context4.next = 19;
                  break;
                }

                return _context4.abrupt('return', res.status(404).json({ message: 'Product doesn\'t exist! Create the Product' }));

              case 19:
                _context4.next = 24;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t1 = _context4['catch'](2);
                return _context4.abrupt('return', res.status(404).json({
                  message: 'Something went wrong: Couldn\'t modify the product',
                  ErrorMessage: _context4.t1.message
                }));

              case 24:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined, [[2, 21], [7, 14]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }());
  } else {
    return res.status(404).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error
    });
  }
};

productImpl.deleteProduct = function (req, res) {
  var result = _joi2.default.validate(req.body, schema3);
  if (result.error === null) {
    var args = [req.params.id];
    _queries.pool.connect(function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(err, client) {
        var queryResult, updateResult;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!err) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', res.status(501).json({ message: 'Somethings up with the database!' }));

              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return client.query(_queries.queries.selectProductById, args);

              case 5:
                queryResult = _context5.sent;

                if (!(queryResult.rowCount === 1)) {
                  _context5.next = 17;
                  break;
                }

                _context5.prev = 7;
                _context5.next = 10;
                return client.query(_queries.queries.deleteProduct, args);

              case 10:
                updateResult = _context5.sent;

                res.status(200).json({ message: 'Product Deleted' });
                _context5.next = 17;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5['catch'](7);
                return _context5.abrupt('return', res.status(404).json({
                  message: 'Something went wrong: Didn\'t delete the product',
                  ErrorMessage: _context5.t0.message
                }));

              case 17:
                if (!(queryResult.rowCount === 0)) {
                  _context5.next = 19;
                  break;
                }

                return _context5.abrupt('return', res.status(404).json({ message: 'Product doesn\'t exist! Nothing to Delete' }));

              case 19:
                _context5.next = 24;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t1 = _context5['catch'](2);
                return _context5.abrupt('return', res.status(404).json({
                  message: 'Something went wrong: Couldn\'t modify the product',
                  ErrorMessage: _context5.t1.message
                }));

              case 24:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, undefined, [[2, 21], [7, 14]]);
      }));

      return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }());
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error
    });
  }
};

productImpl.getProductById = function (req, res) {
  var result = _joi2.default.validate(req.params.product_id, schema3);
  if (result.error === null) {
    var args = [req.params.id];
    _queries.pool.connect(function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(err, client) {
        var queryResult;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!err) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return', res.status(501).json({ message: 'Somethings up with the database!' }));

              case 2:
                _context6.prev = 2;
                _context6.next = 5;
                return client.query(_queries.queries.selectProductById, args);

              case 5:
                queryResult = _context6.sent;

                if (!(queryResult.rowCount === 1)) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt('return', res.status(200).json({
                  message: 'Product Found!',
                  Product: queryResult.rows
                }));

              case 8:
                if (!(queryResult.rowCount === 0)) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt('return', res.status(404).json({ message: 'Product doesn\'t exist!' }));

              case 10:
                _context6.next = 15;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6['catch'](2);
                return _context6.abrupt('return', res.status(404).json({
                  message: 'Something went wrong: Couldn\'t acess the product',
                  ErrorMessage: _context6.t0.message
                }));

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[2, 12]]);
      }));

      return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }());
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error
    });
  }
};
exports.default = productImpl;