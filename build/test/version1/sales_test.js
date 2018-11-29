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

var array = [{
  product_id: 6,
  product_desc: 'Biscuits',
  unit_price: 400,
  quantity_bought: 5,
  amount: 2000,
  attendant_id: 1,
  attendant_name: 'otaigbe'
}];
describe('Test cases for the sales endpoint', function () {
  // afterEach(() => {
  //   app.close();
  // });
  describe('Testing the create sales record endpoint', function () {
    // it('POST / should return a no access token error', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .type('form')
    //     .send([{
    //       salesrecord_Id: 3,
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_bought: 5,
    //       amount: 2000,
    //       attendant_id: 2,
    //     }])
    //     .end((err, res) => {
    //       expect(res).to.have.status(401);
    //       expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
    //       done();
    //     });
    // });
    it('should successfully create a sales record',
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
              return _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').type('form').send({
                salesRecords: [{
                  product_id: 6,
                  product_desc: 'Biscuits',
                  unit_price: 400,
                  quantity_bought: 5,
                  amount: 2000
                }],
                attendant_name: 'otaigbe',
                receiptNumber: 598796898709
              });

            case 2:
              res = _context.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.eql({
                message: 'Records saved'
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }))); // it('should deny access and request for admin token', co.wrap(() => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
    //     .type('form')
    //     .send({
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_bought: 5,
    //       amount: 2000,
    //       attendant_id: 1,
    //       attendant_name: 'otaigbe',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(403);
    //       expect(res.body).to.eql({ message: 'Forbidden! You need to have appropraite privileges' });
    //     });
    // }));
    // it('should deny access and return an invalid token message', co.wrap(() => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
    //     .type('form')
    //     .send({
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_bought: 5,
    //       amount: 2000,
    //       attendant_id: 1,
    //       attendant_name: 'otaigbe',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       // expect(res.body).to.be.a('string');
    //     });
    // }));
  });
  describe('Testing the GET methods', function () {
    describe('Testing the getsalesrecordsbyid endpoint', function () {
      it('should return a salesrecord with id == to parameter in url',
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
                return _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370');

              case 2:
                res = _context2.sent;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('Resource');
                expect(res.body.message).to.equal('Resource Found!');

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      })));
      it('should return an invalid token error',
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
                return _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370');

              case 2:
                res = _context3.sent;
                expect(res).to.have.status(400);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      })));
      it('should return record doesn\'t exist message',
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
                return _chai.default.request(_index.default).get('/api/v1/sales/700').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370');

              case 2:
                res = _context4.sent;
                expect(res).to.have.status(404);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.eql({
                  message: 'Resource doesn\'t exist!'
                });

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      })));
    });
    describe('Testing the getAllSalesRecord endpoint', function () {
      it('should return all salesrecords (with pagination)',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _chai.default.request(_index.default).get('/api/v1/sales/').query({
                  pageNumber: 1
                }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370');

              case 2:
                res = _context5.sent;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('Resources');

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      })));
      it('should return all salesrecords (without pagination) when admin is true',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _chai.default.request(_index.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370');

              case 2:
                res = _context6.sent;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('Resources');

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      })));
      it('should return all salesrecords (without pagination) when admin is false',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _chai.default.request(_index.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MjM1NjU0NX0.UgYjhqhPuBEzPx_o0315fi_woPZ6nBzi31Ie-JS47MI');

              case 2:
                res = _context7.sent;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('Resources');

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      })));
      it('should return all salesrecords by the creator(with pagination) when admin is false',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _chai.default.request(_index.default).get('/api/v1/sales/').query({
                  pageNumber: 1
                }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MjM1NjU0NX0.UgYjhqhPuBEzPx_o0315fi_woPZ6nBzi31Ie-JS47MI');

              case 2:
                res = _context8.sent;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a.jsonObj();
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('Resources');

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      })));
      it('should return a no access token provided', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/').end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.eql({
            message: 'No access token provided! Unaccessible resource'
          });
          done();
        });
      }); // describe('Testing the additional endpoint(getsalesRecordsPerCreator', () => {
      // });
    });
  });
});