"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _functions = _interopRequireDefault(require("../utils/functions"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cartImpl = {};

cartImpl.getAllProducts =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var urlQuery, args, page, itemsPerPage, pageOffset, count, selectResultSet, _selectResultSet;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            urlQuery = req.query;
            args = [];

            if (_functions.default.isEmpty(urlQuery)) {
              _context.next = 23;
              break;
            }

            page = req.query.pageNumber;
            itemsPerPage = 5;
            pageOffset = (page - 1) * itemsPerPage;
            args.push(itemsPerPage);
            args.push(pageOffset);
            _context.prev = 8;
            _context.next = 11;
            return _dbConnection.default.query(_queries.default.countAllProducts);

          case 11:
            count = _context.sent;
            _context.next = 14;
            return _dbConnection.default.query(_queries.default.selectProductsWithPagination, args);

          case 14:
            selectResultSet = _context.sent;
            res.status(200).json({
              message: "Showing pages ".concat(page, " of ").concat(count.rows.length),
              Products: selectResultSet.rows
            });
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](8);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context.t0.message
            });

          case 21:
            _context.next = 33;
            break;

          case 23:
            _context.prev = 23;
            _context.next = 26;
            return _dbConnection.default.query(_queries.default.selectProductsWithoutPagination);

          case 26:
            _selectResultSet = _context.sent;
            res.status(200).json({
              message: 'Showing pages All Products',
              Products: _selectResultSet.rows
            });
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context["catch"](23);

            /* istanbul ignore next */
            res.status(501).json({
              message: 'Query wasn\'t executed',
              Error: _context.t1.message
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 18], [23, 30]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = cartImpl;
exports.default = _default;