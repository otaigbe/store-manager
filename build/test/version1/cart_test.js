"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiJson.default);

describe('Testing products GET', function () {
  it('GET / products for carts endpoint; should return all products with pagination',
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
            return _chai.default.request(_index.default).get('/api/v1/cart/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MzY3MTM1OX0.8h2vnVxIz2UFCcQoTN8XTUBA1SIAhDNnlL9oVtPnKQo').query({
              pageNumber: 1
            });

          case 2:
            res = _context.sent;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('Resources');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('GET / products for cart endpoint; should return all products without pagination',
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
            return _chai.default.request(_index.default).get('/api/v1/cart/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MzY3MTM1OX0.8h2vnVxIz2UFCcQoTN8XTUBA1SIAhDNnlL9oVtPnKQo');

          case 2:
            res = _context2.sent;
            expect(res).to.have.status(200);
            expect(res).to.be.json;

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
});