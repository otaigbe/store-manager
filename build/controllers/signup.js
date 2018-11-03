'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var signup = {};
var schema = _joi2.default.object().keys({
  name: _joi2.default.string().min(3).max(30).required(),
  email: _joi2.default.string().email({ minDomainAtoms: 2 }),
  password: _joi2.default.string().required(),
  admin: _joi2.default.boolean().required(),
  token: _joi2.default.string().required()
});

signup.checkAuth = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result, hashedPass, salt, decoded;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = _joi2.default.validate(req.body, schema);

            if (!(result.error === null)) {
              _context2.next = 23;
              break;
            }

            hashedPass = null;
            salt = null;
            _context2.prev = 4;
            _context2.next = 7;
            return _bcrypt2.default.genSalt(10);

          case 7:
            salt = _context2.sent;
            _context2.next = 10;
            return _bcrypt2.default.hash(req.body.password, salt);

          case 10:
            hashedPass = _context2.sent;
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](4);

            console.log(_context2.t0.message);

          case 16:
            decoded = null;
            _context2.next = 19;
            return _jsonwebtoken2.default.verify(req.body.token, 'secret');

          case 19:
            decoded = _context2.sent;

            if (decoded.admin === true) {
              _db2.default.connect(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
                  var email, sql, dbrows, query, params1, params2, fb;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          email = [];

                          email.push(req.body.email);
                          sql = 'SELECT email FROM attendants WHERE email = $1';
                          _context.next = 5;
                          return client.query(sql, email);

                        case 5:
                          dbrows = _context.sent;

                          if (!(dbrows.rowCount >= 1)) {
                            _context.next = 10;
                            break;
                          }

                          res.json({
                            message: 'User with email ' + req.body.email + ' already exists. Choose Unique email to signup'
                          });
                          _context.next = 24;
                          break;

                        case 10:
                          query = '';
                          params1 = [];
                          params2 = [];

                          params1.push(req.body.name, req.body.email, hashedPass, req.body.admin);
                          params2.push(req.body.firstname, req.body.lastname, req.body.email, hashedPass, req.body.admin);
                          query = 'INSERT INTO attendants (name,email, password, admin) VALUES ($1, $2, $3, $4)';

                          if (!err) {
                            _context.next = 20;
                            break;
                          }

                          console.log(err.message);_context.next = 23;
                          break;

                        case 20:
                          _context.next = 22;
                          return client.query(query, params1);

                        case 22:
                          fb = _context.sent;

                        case 23:
                          res.status(201).json({
                            message: 'Attendant created'
                          });

                        case 24:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }
            _context2.next = 24;
            break;

          case 23:
            res.status(400).json({
              message: 'resource could not be created!',
              Error: result.error
            });

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[4, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.default = signup;