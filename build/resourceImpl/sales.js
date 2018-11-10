"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _joi = _interopRequireDefault(require("joi"));

var _queries = require("../dbUtils/queries/queries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var salesImpl = {};

function typeOf(value) {
  var s = _typeof(value);

  if (s === 'object') {
    if (value) {
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }

  return s;
}

salesImpl.createSalesRecord = function (req, res) {
  console.log(req.body);
  var records = [];

  if (typeOf(req.body) === 'array') {
    for (var i = 0; i < req.body.length; i += 1) {
      var inner = [];
      inner.push(req.body[i].product_id, req.body[i].product_desc, req.body[i].unit_price, req.body[i].quantity_bought, req.body[i].amount, req.body[i].attendant_id, req.body[i].attendant_name);
      records.push(inner);
    }

    _queries.pool.connect(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(err, client) {
        var multiInsert, insertResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", res.status(501).send('Something is wrong! Unable to connect to the database'));

              case 2:
                multiInsert = (0, _pgFormat.default)('INSERT INTO salesRecords(product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', records);
                console.log(multiInsert);
                _context.prev = 4;
                _context.next = 7;
                return client.query(multiInsert);

              case 7:
                insertResult = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(501).send('Something is wrong! Unable to save sales records to the database'));

              case 13:
                return _context.abrupt("return", res.status(200).json({
                  message: 'Records saved'
                }));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 10]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  } else {
    _queries.pool.connect(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(err, client) {
        var singleInsert, insertResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", res.status(501).send('Something is wrong! Unable to connect to the database'));

              case 2:
                singleInsert = (0, _pgFormat.default)('INSERT INTO salesRecords(product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', req.body);
                console.log(singleInsert);
                _context2.prev = 4;
                _context2.next = 7;
                return client.query(singleInsert);

              case 7:
                insertResult = _context2.sent;
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", res.status(501).send('Something is wrong! Unable to save sales records to the database'));

              case 13:
                return _context2.abrupt("return", res.status(200).json({
                  message: 'Records saved'
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

salesImpl.getAllSalesRecords = function (req, res) {
  var urlQuery = req.query;
  console.log(urlQuery);
  var args = [];

  if (!isEmpty(urlQuery)) {
    var page = req.query.pageNumber;
    var itemsPerPage = 5;
    var pageOffset = (page - 1) * itemsPerPage;
    args.push(itemsPerPage);
    args.push(pageOffset);

    _queries.pool.connect(
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(err, client) {
        var count, selectResultSet;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!err) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", res.status(501).json({
                  message: 'Internal Database Error'
                }));

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return client.query(_queries.queries.getAllsalesRecordCount);

              case 5:
                count = _context3.sent;
                _context3.next = 8;
                return client.query(_queries.queries.selectAllSalesRecord, args);

              case 8:
                selectResultSet = _context3.sent;
                res.status(200).json({
                  message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
                  salesRecords: selectResultSet.rows
                });
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](2);
                res.status(501).json({
                  message: 'Query wasn\'t executed',
                  Error: _context3.t0.message
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 12]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()); // eslint-disable-next-line use-isnan

  } else if (isEmpty(urlQuery)) {
    _queries.pool.connect(
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(err, client) {
        var selectResultSet;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!err) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", res.status(501).json({
                  message: 'Internal Database Error'
                }));

              case 2:
                _context4.next = 4;
                return client.query(_queries.queries.getAllsalesRecordCount);

              case 4:
                selectResultSet = _context4.sent;
                res.status(200).json({
                  message: 'Showing pages All sales record',
                  salesRecords: selectResultSet.rows
                });

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
  }
};

salesImpl.getSalesRecordById = function (req, res) {
  // const result = Joi.validate(req.params.salesrecord_id, schema3);
  // if (result.error === null) {
  var args = [req.params.id];

  _queries.pool.connect(
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
              if (!err) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(501).json({
                message: 'Somethings up with the database!'
              }));

            case 2:
              _context5.prev = 2;
              _context5.next = 5;
              return client.query(_queries.queries.selectSalesRecordById, args);

            case 5:
              queryResult = _context5.sent;

              if (!(queryResult.rowCount === 1)) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(200).json({
                message: 'Sales Record Found!',
                record: queryResult.rows
              }));

            case 8:
              if (!(queryResult.rowCount === 0)) {
                _context5.next = 10;
                break;
              }

              return _context5.abrupt("return", res.status(404).json({
                message: 'Record doesn\'t exist!'
              }));

            case 10:
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(404).json({
                message: 'Something went wrong: Couldn\'t acess the Record',
                ErrorMessage: _context5.t0.message
              }));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 12]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};

var _default = salesImpl;
exports.default = _default;