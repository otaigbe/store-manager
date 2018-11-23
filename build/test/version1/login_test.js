"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _chaiExpectedCookie = _interopRequireDefault(require("chai-expected-cookie"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiJson.default);

_chai.default.use(_chaiUrl.default);

_chai.default.use(_chaiExpectedCookie.default);

describe('StoreManager endpoints tests', function () {
  afterEach(function () {
    _index.default.close();
  });
  describe('Testing the login endpoint', function () {
    describe('Testing the POST method', function () {
      describe('Testing when correct information is provided', function () {
        it('POST / login endpoint should successfully sign in',
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
                    email: 'otaigbe@gmail.com',
                    password: 'password'
                  });

                case 2:
                  res = _context.sent;
                  expect(res).to.redirectTo('http://127.0.0.1:4555/admin_control_page.html');

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        })));
        it('POST / login endpoint should successfully sign in(not as admin)',
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
                    email: 'angela@gmail.com',
                    password: 'password'
                  });

                case 2:
                  res = _context2.sent;

                  _chai.default.expect('http://127.0.0.1:4555/cart.html').to.have.path('/cart.html');

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        })));
      });
      describe('Testing when wrong information is inputted', function () {
        it('POST / login endpoint should return a 404(not found) error',
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3() {
          var res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
                    email: 'otaigbe@gmail.com',
                    password: 'okokobioko'
                  });

                case 2:
                  res = _context3.sent;
                  expect(res).to.have.status(404);
                  expect(res.body).to.eql({
                    message: 'User doesn"t exist! Enter valid email and password'
                  });
                  expect(res.body).to.have.property('message');
                  expect(res.body.message).to.equal('User doesn"t exist! Enter valid email and password');

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        })));
        it('POST / login endpoint should return a 422(unprocessable entity) error',
        /*#__PURE__*/
        _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4() {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
                    email: 'otaigbe',
                    password: 'okokobioko'
                  });

                case 2:
                  res = _context4.sent;
                  expect(res).to.have.status(422);
                  expect(res.body).to.have.property('message');
                  expect(res.body).to.have.property('ErrorMessage');
                  expect(res.body.message).to.equal('Validation error! Please check your input');

                case 7:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        })));
      });
    });
  });
});