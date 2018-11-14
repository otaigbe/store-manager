"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _functions = _interopRequireDefault(require("../utils/functions"));

var _queries = require("../dbUtils/queries/queries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var salesImpl = {};

salesImpl.createSalesRecord = function (req, res) {
  // console.log(req.body);
  var records = [];

  if (_functions.default.typeOf(req.body) === 'array') {
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
                multiInsert = (0, _pgFormat.default)('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_id, attendant_name) VALUES %L', records);
                _context.prev = 3;
                _context.next = 6;
                return client.query(multiInsert);

              case 6:
                insertResult = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  message: 'Records saved'
                }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", res.status(501).send('Something is wrong! Unable to save sales records to the database'));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 10]]);
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
                _context2.prev = 3;
                _context2.next = 6;
                return client.query(singleInsert);

              case 6:
                insertResult = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                return _context2.abrupt("return", res.status(501).send('Something is wrong! Unable to save sales records to the database'));

              case 12:
                return _context2.abrupt("return", res.status(200).json({
                  message: 'Records saved'
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
  }
};

salesImpl.getAllSalesRecords = function (req, res) {
  var urlQuery = req.query;
  var token = req.header('x-auth-token');
  var page = req.query.pageNumber;
  var itemsPerPage = 5;
  var pageOffset = (page - 1) * itemsPerPage;

  if (token) {
    var decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY); // console.log(decoded);
    // if (!customFunc.isEmpty(decoded)) {


    if (!_functions.default.isEmpty(urlQuery)) {
      var args = [];
      args.push(itemsPerPage);
      args.push(pageOffset);

      if (decoded.admin === true) {
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
        }());
      } else if (decoded.admin === false) {
        // console.log(decoded.name);
        args.push(decoded.name);

        _queries.pool.connect(
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4(err, client) {
            var count, selectResultSet;
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
                    _context4.prev = 2;
                    _context4.next = 5;
                    return client.query(_queries.queries.selectAllSalesRecordFilterByCreatorWithoutPagination);

                  case 5:
                    count = _context4.sent;
                    _context4.next = 8;
                    return client.query(_queries.queries.selectAllSalesRecordFilterByCreatorWithPagination, args);

                  case 8:
                    selectResultSet = _context4.sent;
                    res.status(200).json({
                      message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
                      salesRecords: selectResultSet.rows
                    });
                    _context4.next = 15;
                    break;

                  case 12:
                    _context4.prev = 12;
                    _context4.t0 = _context4["catch"](2);
                    res.status(501).json({
                      message: 'Query wasn\'t executed',
                      Error: _context4.t0.message
                    });

                  case 15:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[2, 12]]);
          }));

          return function (_x7, _x8) {
            return _ref4.apply(this, arguments);
          };
        }());
      } // eslint-disable-next-line use-isnan

    }

    if (_functions.default.isEmpty(urlQuery)) {
      var _args5 = [];

      _args5.push(decoded.name);

      if (decoded.admin === true) {
        _queries.pool.connect(
        /*#__PURE__*/
        function () {
          var _ref5 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5(err, client) {
            var selectResultSet;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 2;
                      break;
                    }

                    return _context5.abrupt("return", res.status(501).json({
                      message: 'Internal Database Error'
                    }));

                  case 2:
                    _context5.next = 4;
                    return client.query(_queries.queries.getAllsalesRecordCount);

                  case 4:
                    selectResultSet = _context5.sent;
                    res.status(200).json({
                      message: 'Showing pages All sales record',
                      salesRecords: selectResultSet.rows
                    });

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          return function (_x9, _x10) {
            return _ref5.apply(this, arguments);
          };
        }());
      }

      if (decoded.admin === false) {
        _queries.pool.connect(
        /*#__PURE__*/
        function () {
          var _ref6 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee6(err, client) {
            var selectResultSet;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!err) {
                      _context6.next = 2;
                      break;
                    }

                    return _context6.abrupt("return", res.status(501).json({
                      message: 'Internal Database Error'
                    }));

                  case 2:
                    _context6.next = 4;
                    return client.query(_queries.queries.selectAllSalesRecordFilterByCreatorWithoutPagination, _args5);

                  case 4:
                    selectResultSet = _context6.sent;

                    if (!(selectResultSet.rowCount === 0)) {
                      _context6.next = 7;
                      break;
                    }

                    return _context6.abrupt("return", res.status(404).json({
                      message: 'No sales Recrod for this user'
                    }));

                  case 7:
                    res.status(200).json({
                      message: 'Showing pages All sales record',
                      salesRecords: selectResultSet.rows
                    });

                  case 8:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          return function (_x11, _x12) {
            return _ref6.apply(this, arguments);
          };
        }());
      }
    } // } else {
    //   return res.status(400).json({ message: 'Invalid Token' });
    // }

  } else {
    return res.status(401).json({
      message: 'No access token provided! Unaccessible resource'
    });
  }
};

salesImpl.getSalesRecordById = function (req, res) {
  // const result = Joi.validate(req.params.salesrecord_id, schema3);
  // if (result.error === null) {
  var token = req.header('x-auth-token');
  var args = [req.params.id];

  _queries.pool.connect(
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(err, client) {
      var queryResult, decoded;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!err) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return", res.status(501).json({
                message: 'Somethings up with the database!'
              }));

            case 2:
              _context7.prev = 2;
              _context7.next = 5;
              return client.query(_queries.queries.selectSalesRecordById, args);

            case 5:
              queryResult = _context7.sent;
              decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY);

              if (!(queryResult.rowCount === 1)) {
                _context7.next = 14;
                break;
              }

              if (!(decoded.name === queryResult.rows[0].attendant_name || decoded.admin === true)) {
                _context7.next = 13;
                break;
              }

              res.status(200).json({
                message: 'Sales Record Found!',
                record: queryResult.rows
              });
              res.end();
              _context7.next = 14;
              break;

            case 13:
              return _context7.abrupt("return", res.status(403).json({
                message: 'Forbidden! You need to have appropraite privileges'
              }));

            case 14:
              if (!(queryResult.rowCount === 0)) {
                _context7.next = 16;
                break;
              }

              return _context7.abrupt("return", res.status(404).json({
                message: 'Record doesn\'t exist!'
              }));

            case 16:
              _context7.next = 21;
              break;

            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](2);
              return _context7.abrupt("return", res.status(404).json({
                message: 'Something went wrong: Couldn\'t acess the Record',
                ErrorMessage: _context7.t0.message
              }));

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[2, 18]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};

var _default = salesImpl;
exports.default = _default;