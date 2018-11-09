'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

require('babel-polyfill');

var _queries = require('../dbUtils/queries/queries');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var loginImpl = {};
var schema = _joi2.default.object({
  email: _joi2.default.string().email({ minDomainAtoms: 2 }),
  password: _joi2.default.string().required()
});

loginImpl.login = function (req, res) {
  var result = _joi2.default.validate(req.body, schema);
  if (result.error === null) {
    var temp = [req.body.email, req.body.password];
    _queries.pool.connect(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
        var db, signObj, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 4;
                  break;
                }

                res.status(501).json({
                  message: 'Internal Server Error'
                });
                _context.next = 14;
                break;

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return client.query(_queries.queries.selectLoginQuery, temp);

              case 7:
                db = _context.sent;

                if (db.rowCount > 0) {
                  signObj = {};

                  signObj.email = db.rows[0].email;
                  signObj.admin = db.rows[0].admin;
                  signObj.attendant_id = db.rows[0].attendant_id;
                  signObj.name = db.rows[0].name;
                  token = _jsonwebtoken2.default.sign(signObj, process.env.JWTKEY);

                  res.header('x-auth-token', token).status(200).json({
                    message: 'You"re logged in'
                  });
                } else {
                  res.status(404).json({
                    message: 'User doesn"t exist! Enter valid email and password'
                  });
                }
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](4);

                console.log(_context.t0.message);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[4, 11]]);
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

exports.default = loginImpl;