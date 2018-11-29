"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

var _validationSchemas = _interopRequireDefault(require("../utils/validationSchemas"));

var _errorHandler = _interopRequireDefault(require("../utils/errorHandler"));

var _async = _interopRequireDefault(require("../middleware/async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signupImpl = {};
signupImpl.signup = (0, _async.default)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result, temp2, resultset, temp, dbresult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = _joi.default.validate(req.body, _validationSchemas.default.signupSchema);

            if (!(result.error === null)) {
              _context.next = 16;
              break;
            }

            temp2 = [req.body.email];
            _context.next = 5;
            return _dbConnection.default.query(_queries.default.selectEmail, temp2);

          case 5:
            resultset = _context.sent;

            if (!(resultset.rowCount > 0)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: 'Email already exists, choose a unique email.'
            }));

          case 8:
            if (!(resultset.rowCount === 0)) {
              _context.next = 14;
              break;
            }

            temp = [req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password, req.body.admin];
            _context.next = 12;
            return _dbConnection.default.query(_queries.default.InsertSignup, temp);

          case 12:
            dbresult = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              message: 'Attendant created! Proceed to login'
            }));

          case 14:
            _context.next = 17;
            break;

          case 16:
            _errorHandler.default.validationError(res, result);

          case 17:
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
var _default = signupImpl;
exports.default = _default;