"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _co = _interopRequireDefault(require("co"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiJson.default);

_chai.default.use(_chaiUrl.default);

describe('Testing the SIGNUP endpoint', function () {
  describe('Testing the POST method', function () {
    it('should check if token exists',
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
              return _chai.default.request(_index.default).post('/api/v1/auth/signup').type('form').send({
                name: 'Ehimare',
                email: 'Ehimare@gmail.com',
                password: 'password',
                admin: true
              });

            case 2:
              res = _context.sent;
              expect(res).to.have.status(401);
              expect(res.body).to.eql({
                message: 'No access token provided! Unaccessible resource'
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should check if request successful after token is set and already existent email is passed',
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
              return _chai.default.request(_index.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').type('form').send({
                name: 'otaigbe',
                lastname: 'otaigbe',
                phoneNumber: 2348088888888,
                email: 'otaigbe@gmail.com',
                password: 'password',
                admin: true
              });

            case 2:
              res = _context2.sent;
              expect(res).to.have.status(409);
              expect(res.body).to.eql({
                message: 'Email already exists, choose a unique email.'
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should check if request successful after token is set and unique email is passed',
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
              return _chai.default.request(_index.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
                name: 'tunde',
                lastname: 'tunde',
                phoneNumber: 234088543888,
                email: 'tunde@gmail.com',
                password: 'password',
                admin: true
              });

            case 2:
              res = _context3.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.eql({
                message: 'Attendant created! Proceed to login'
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should check if a user is admin', function (done) {
      _chai.default.request(_index.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
        name: 'olu',
        email: 'olu@gmail.com',
        password: 'password',
        admin: true
      }).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.eql({
          message: 'Forbidden! You need to have  admin privileges'
        });
        done();
      });
    });
    it('should check if input is valid', function (done) {
      _chai.default.request(_index.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        name: 'olu',
        email: 'sfasfgfh',
        password: 'password',
        admin: true
      }).end(function (err, res) {
        expect(res).to.have.status(422);
        done();
      });
    });
  });
});