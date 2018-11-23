"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _functions = _interopRequireDefault(require("../utils/functions"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var salesImpl = {};

salesImpl.createSalesRecord =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var records, i, inner, multiInsert, insertResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            records = [];

            for (i = 0; i < req.body.salesRecords.length; i += 1) {
              inner = [];
              inner.push(req.body.salesRecords[i].product_id, req.body.salesRecords[i].product_desc, req.body.salesRecords[i].unit_price, req.body.salesRecords[i].quantity_bought, req.body.salesRecords[i].amount, req.body.attendant_name, req.body.receiptNumber);
              records.push(inner);
            }

            multiInsert = (0, _pgFormat.default)('INSERT INTO salesRecords (product_id, product_desc, unit_price, quantity_bought, amount, attendant_name, receipt_number) VALUES %L', records);
            _context.prev = 3;
            _context.next = 6;
            return _dbConnection.default.query(multiInsert);

          case 6:
            insertResult = _context.sent;
            return _context.abrupt("return", res.status(201).json({
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
}();

salesImpl.getAllSalesRecords =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var token, args, urlQuery, itemsPerPage, page, pageOffset, decoded, count, selectResultSet, array, array3, _count, _selectResultSet, args2, _selectResultSet2, _selectResultSet3;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.header('x-auth-token');

            if (!token) {
              _context2.next = 61;
              break;
            }

            args = [];
            urlQuery = req.query;
            itemsPerPage = 5;
            page = req.query.pageNumber;
            pageOffset = (Number(page) - 1) * itemsPerPage;
            args.push(itemsPerPage);
            args.push(pageOffset);
            decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY);

            if (_functions.default.isEmpty(urlQuery)) {
              _context2.next = 38;
              break;
            }

            console.log(args);

            if (!(decoded.admin === true)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 15;
            return _dbConnection.default.query(_queries.default.getAllsalesRecordCount);

          case 15:
            count = _context2.sent;
            _context2.next = 18;
            return _dbConnection.default.query(_queries.default.selectAllSalesRecordWithPagination, args);

          case 18:
            selectResultSet = _context2.sent;
            res.status(200).json({
              message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
              salesRecords: selectResultSet.rows
            });

          case 20:
            if (!(decoded.admin === false)) {
              _context2.next = 38;
              break;
            }

            // console.log(decoded.name);
            array = [decoded.name, itemsPerPage, pageOffset];
            array3 = [decoded.name];
            _context2.prev = 23;
            args.push(decoded.attendant_id);
            console.log(args);
            _context2.next = 28;
            return _dbConnection.default.query(_queries.default.selectAllSalesRecordFilterByCreator, array3);

          case 28:
            _count = _context2.sent;
            _context2.next = 31;
            return _dbConnection.default.query(_queries.default.selectAllSalesRecordFilterByCreatorWithPagination, array);

          case 31:
            _selectResultSet = _context2.sent;
            res.status(200).json({
              message: "Showing pages ".concat(page, " of ").concat(_count.rows.length),
              salesRecords: _selectResultSet.rows
            });
            _context2.next = 38;
            break;

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2["catch"](23);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context2.t0.message
            });

          case 38:
            if (!_functions.default.isEmpty(urlQuery)) {
              _context2.next = 59;
              break;
            }

            args2 = [];
            args2.push(decoded.name);

            if (!(decoded.admin === true)) {
              _context2.next = 52;
              break;
            }

            _context2.prev = 42;
            _context2.next = 45;
            return _dbConnection.default.query(_queries.default.getAllsalesRecordCount);

          case 45:
            _selectResultSet2 = _context2.sent;
            res.status(200).json({
              message: 'Showing All sales record',
              salesRecords: _selectResultSet2.rows
            });
            _context2.next = 52;
            break;

          case 49:
            _context2.prev = 49;
            _context2.t1 = _context2["catch"](42);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context2.t1.message
            });

          case 52:
            if (!(decoded.admin === false)) {
              _context2.next = 59;
              break;
            }

            _context2.next = 55;
            return _dbConnection.default.query(_queries.default.selectAllSalesRecordFilterByCreator, args2);

          case 55:
            _selectResultSet3 = _context2.sent;

            if (!(_selectResultSet3.rowCount === 0)) {
              _context2.next = 58;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'No sales Recrod for this user'
            }));

          case 58:
            res.status(200).json({
              message: 'Showing All sales record',
              salesRecords: _selectResultSet3.rows
            });

          case 59:
            _context2.next = 62;
            break;

          case 61:
            return _context2.abrupt("return", res.status(401).json({
              message: 'No access token provided! Unaccessible resource'
            }));

          case 62:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[23, 35], [42, 49]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

salesImpl.getSalesRecordById =
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
            return _dbConnection.default.query(_queries.default.selectSalesRecordById, args);

          case 3:
            queryResult = _context3.sent;
            _context3.prev = 4;

            if (queryResult.rowCount === 1) {
              res.status(200).json({
                message: 'Sales Record Found!',
                record: queryResult.rows
              });
            }

            if (!(queryResult.rowCount === 0)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: 'Record doesn\'t exist!'
            }));

          case 8:
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](4);
            return _context3.abrupt("return", res.status(404).json({
              message: 'Something went wrong: Couldn\'t acess the Record',
              ErrorMessage: _context3.t0.message
            }));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[4, 10]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = salesImpl;
exports.default = _default;