"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var usefulFunctions = {};

usefulFunctions.fetchAllStuffWithPagination =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(res, page, query1, query2, args) {
    var itemsPerPage, pageOffset, count, selectResultSet;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            itemsPerPage = 5;
            pageOffset = (page - 1) * itemsPerPage;
            args.push(itemsPerPage);
            args.push(pageOffset);
            _context.next = 6;
            return _dbConnection.default.query(query1);

          case 6:
            count = _context.sent;
            _context.next = 9;
            return _dbConnection.default.query(query2, args);

          case 9:
            selectResultSet = _context.sent;
            res.status(200).json({
              message: "Showing pages ".concat(page, " of ").concat(count.rows.length / page),
              Resources: selectResultSet.rows
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

usefulFunctions.fetchAllStuffWithoutPagination =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(res, query) {
    var selectResultSet;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _dbConnection.default.query(query);

          case 2:
            selectResultSet = _context2.sent;
            res.status(200).json({
              message: 'Showing pages All Products',
              Resources: selectResultSet.rows
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

usefulFunctions.fetchAllStuffWithoutPaginationFilterWithCreator =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(res, query, args) {
    var selectResultSet;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _dbConnection.default.query(query, args);

          case 2:
            selectResultSet = _context3.sent;
            res.status(200).json({
              message: 'Showing pages All Products',
              Resources: selectResultSet.rows
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

usefulFunctions.getResourceById =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(res, query, args) {
    var queryResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _dbConnection.default.query(query, args);

          case 2:
            queryResult = _context4.sent;

            if (!(queryResult.rowCount === 1)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(200).json({
              message: 'Resource Found!',
              Resource: queryResult.rows
            }));

          case 5:
            if (!(queryResult.rowCount === 0)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Resource doesn\'t exist!'
            }));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x11, _x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

usefulFunctions.setCookieAndRedirect = function (res, token, url) {
  res.cookie('x-auth-token', token);
  res.redirect(url);
};

var _default = usefulFunctions;
exports.default = _default;