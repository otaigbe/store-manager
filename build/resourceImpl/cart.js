"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _functions = _interopRequireDefault(require("../utils/functions"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _async = _interopRequireDefault(require("../middleware/async"));

var _ImplFunctions = _interopRequireDefault(require("./ImplFunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cartImpl = {};
cartImpl.getAllProducts = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var urlQuery, args, page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            urlQuery = req.query;

            if (!_functions.default.isEmpty(urlQuery)) {
              args = [];
              page = urlQuery.pageNumber;

              _ImplFunctions.default.fetchAllStuffWithPagination(res, page, _queries.default.countAllProducts, _queries.default.getProductsWithPagination, args);
            } else {
              _ImplFunctions.default.fetchAllStuffWithoutPagination(res, _queries.default.selectProductsWithoutPagination);
            }

          case 2:
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
var _default = cartImpl;
exports.default = _default;