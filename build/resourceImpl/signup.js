"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signupImpl = {};

var schema = _joi.default.object({
  name: _joi.default.string().min(3).required(),
  lastname: _joi.default.string().min(3).required(),
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }),
  password: _joi.default.string().required(),
  phoneNumber: _joi.default.number().required(),
  admin: _joi.default.boolean().required()
});

signupImpl.signup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = _joi.default.validate(req.body, schema);

            if (!(result.error === null)) {
              _context2.next = 5;
              break;
            }

            _dbConnection.default.connect(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(err, client) {
                var temp2, resultset, temp, dbresult;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        /* istanbul ignore next */
                        if (err) console.log(err.message);
                        temp2 = [req.body.email];
                        _context.next = 4;
                        return client.query(_queries.default.selectEmail, temp2);

                      case 4:
                        resultset = _context.sent;

                        if (!(resultset.rowCount > 0)) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return", res.status(409).json({
                          message: 'Email already exists, choose a unique email.'
                        }));

                      case 7:
                        if (!(resultset.rowCount === 0)) {
                          _context.next = 19;
                          break;
                        }

                        temp = [req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password, req.body.admin];
                        _context.prev = 9;
                        _context.next = 12;
                        return client.query(_queries.default.InsertSignup, temp);

                      case 12:
                        dbresult = _context.sent;
                        return _context.abrupt("return", res.status(201).json({
                          message: 'Attendant created! Proceed to login'
                        }));

                      case 16:
                        _context.prev = 16;
                        _context.t0 = _context["catch"](9);

                        /* istanbul ignore next */
                        res.status(501).json({
                          message: 'Internal Server error! Couldn"t create an Attendant',
                          ErrorMessage: _context.t0.message
                        });

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[9, 16]]);
              }));

              return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }());

            _context2.next = 6;
            break;

          case 5:
            return _context2.abrupt("return", res.status(422).json({
              message: 'Something wrong with input!',
              Error: result.error
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signupImpl;
exports.default = _default;