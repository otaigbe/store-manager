"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

var _errorHandler = _interopRequireDefault(require("../utils/errorHandler"));

var _validationSchemas = _interopRequireDefault(require("../utils/validationSchemas"));

var _ImplFunctions = _interopRequireDefault(require("./ImplFunctions"));

var _async = _interopRequireDefault(require("../middleware/async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginImpl = {};
loginImpl.login = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result, temp, queryResult, signObj, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _joi.default.validate(req.body, _validationSchemas.default.loginSchema);

            if (!(result.error === null)) {
              _context.next = 9;
              break;
            }

            temp = [req.body.email, req.body.password];
            _context.next = 5;
            return _dbConnection.default.query(_queries.default.selectLoginQuery, temp);

          case 5:
            queryResult = _context.sent;

            if (queryResult.rowCount > 0) {
              signObj = {};
              signObj.email = queryResult.rows[0].attendant_email;
              signObj.admin = queryResult.rows[0].attendant_admin;
              signObj.attendant_id = queryResult.rows[0].attendant_id;
              signObj.name = queryResult.rows[0].attendant_name;
              token = _jsonwebtoken.default.sign(signObj, process.env.JWTKEY);

              if (signObj.admin === true) {
                _ImplFunctions.default.setCookieAndRedirect(res, token, '/admin_control_page.html');
              } else {
                _ImplFunctions.default.setCookieAndRedirect(res, token, '/cart.html');
              }
            } else {
              _errorHandler.default.notFoundError(res);
            }

            _context.next = 10;
            break;

          case 9:
            _errorHandler.default.validationError(res, result);

          case 10:
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
var _default = loginImpl;
exports.default = _default;