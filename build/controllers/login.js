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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var login = {};
var schema = _joi2.default.object().keys({
  email: _joi2.default.string().email({ minDomainAtoms: 2 }),
  password: _joi2.default.string().required()
});

login.auth = function (req, res) {
  var result = _joi2.default.validate(req.body, schema);
  if (result.error === null) {
    _db2.default.connect(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
        var email, sql, dbrows, validPassword, tokenObj, token, _token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 4;
                  break;
                }

                console.log(err.message);_context.next = 31;
                break;

              case 4:
                email = [];

                email.push(req.body.email);
                sql = 'SELECT email,admin  FROM attendants WHERE email = $1';
                _context.next = 9;
                return client.query(sql, email);

              case 9:
                dbrows = _context.sent;
                _context.prev = 10;
                _context.next = 13;
                return _bcrypt2.default.compare(req.body.password, dbrows.rows[0].password);

              case 13:
                validPassword = _context.sent;

                console.log(validPassword);

                if (validPassword) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt('return', res.json({
                  message: 'Invalid Username or Password'
                }));

              case 17:
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](10);

                console.log(_context.t0.message);

              case 22:
                tokenObj = {};

                tokenObj.email = dbrows.rows[0].email;
                tokenObj.admin = dbrows.rows[0].admin;

                if (!(tokenObj.admin === true)) {
                  _context.next = 28;
                  break;
                }

                token = _jsonwebtoken2.default.sign(tokenObj, process.env.SECRETKEY);
                return _context.abrupt('return', res.json({
                  message: 'Youre logged in as admin',
                  token: token
                }));

              case 28:
                if (!(tokenObj.admin === false)) {
                  _context.next = 31;
                  break;
                }

                _token = _jsonwebtoken2.default.sign(dbrows.rows[0], 'privateKey');
                return _context.abrupt('return', res.json({
                  message: 'Youre logged in as Attendant',
                  token: _token
                }));

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[10, 19]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  } else {
    console.log('wrong login');
  }
};
exports.default = login;