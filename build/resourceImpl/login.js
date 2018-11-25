"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _queries = _interopRequireDefault(require("../dbUtils/queries/queries"));

var _dbConnection = _interopRequireDefault(require("../dbUtils/dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loginImpl = {};

var schema = _joi.default.object({
  email: _joi.default.string().email({
    minDomainAtoms: 2
  }),
  password: _joi.default.string().required()
});

loginImpl.login = function (req, res) {
  var result = _joi.default.validate(req.body, schema);

  if (result.error === null) {
    var temp = [req.body.email, req.body.password];

    _dbConnection.default.connect(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(err, client) {
        var db, signObj, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 4;
                  break;
                }

                /* ignore istanbul next */
                res.status(501).json({
                  message: 'Internal Server Error',
                  Error: err
                });
                _context.next = 14;
                break;

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return client.query(_queries.default.selectLoginQuery, temp);

              case 7:
                db = _context.sent;

                if (db.rowCount > 0) {
                  signObj = {};
                  signObj.email = db.rows[0].attendant_email;
                  signObj.admin = db.rows[0].attendant_admin;
                  signObj.attendant_id = db.rows[0].attendant_id;
                  signObj.name = db.rows[0].attendant_name;
                  token = _jsonwebtoken.default.sign(signObj, process.env.JWTKEY);

                  if (signObj.admin === true) {
                    res.cookie('x-auth-token', token);
                    res.redirect('/admin_control_page.html');
                  }

                  if (signObj.admin === false) {
                    res.cookie('x-auth-token', token);
                    res.redirect('/cart.html');
                  }
                } else {
                  res.status(404).json({
                    message: 'User doesn"t exist! Enter valid email and password'
                  });
                }

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0.message);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 11]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error
    });
  }
};

var _default = loginImpl;
exports.default = _default;