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

var _async = _interopRequireDefault(require("../middleware/async"));

var _ImplFunctions = _interopRequireDefault(require("./ImplFunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var salesImpl = {};
salesImpl.createSalesRecord = (0, _async.default)(
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
            _context.next = 5;
            return _dbConnection.default.query(multiInsert);

          case 5:
            insertResult = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              message: 'Records saved'
            }));

          case 7:
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
salesImpl.getAllSalesRecords = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var token, decoded, args, _args2, _args3;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = req.header('x-auth-token');

            if (!token) {
              _context2.next = 7;
              break;
            }

            decoded = _jsonwebtoken.default.verify(token, process.env.JWTKEY);

            if (!_functions.default.isEmpty(req.query)) {
              if (decoded.admin === true) {
                args = [];

                _ImplFunctions.default.fetchAllStuffWithPagination(res, req.query.pageNumber, _queries.default.getAllsalesRecordCount, _queries.default.selectAllSalesRecordWithPagination, args);
              }

              if (decoded.admin === false) {
                _args2 = [decoded.name];

                _ImplFunctions.default.fetchAllStuffWithPagination(res, req.query.pageNumber, _queries.default.getAllsalesRecordCount, _queries.default.selectAllSalesRecordFilterByCreatorWithPagination, _args2);
              }
            }

            if (_functions.default.isEmpty(req.query)) {
              if (decoded.admin === true) {
                _ImplFunctions.default.fetchAllStuffWithoutPagination(res, _queries.default.getAllsalesRecordCount);
              }

              if (decoded.admin === false) {
                _args3 = [decoded.name];

                _ImplFunctions.default.fetchAllStuffWithoutPaginationFilterWithCreator(res, _queries.default.selectAllSalesRecordFilterByCreator, _args3);
              }
            }

            _context2.next = 8;
            break;

          case 7:
            return _context2.abrupt("return", res.status(401).json({
              message: 'No access token provided! Unaccessible resource'
            }));

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
salesImpl.getSalesRecordById = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var args;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            args = [req.params.id];

            _ImplFunctions.default.getResourceById(res, _queries.default.selectSalesRecordById, args);

          case 2:
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
var _default = salesImpl;
exports.default = _default;