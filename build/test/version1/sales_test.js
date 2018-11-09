'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chaiJson = require('chai-json');

var _chaiJson2 = _interopRequireDefault(_chaiJson);

var _chaiUrl = require('chai-url');

var _chaiUrl2 = _interopRequireDefault(_chaiUrl);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /* eslint-disable prefer-destructuring */

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_chaiJson2.default);
_chai2.default.use(_chaiUrl2.default);

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
  describe('Testing the create sales record endpoint', function () {
    it('should return a no access token error', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/sales').type('form').send([{
        salesrecord_Id: 3,
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_bought: 5,
        amount: 2000,
        attendant_id: 2
      }]).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
        done();
      });
    });

    // it('should successfully create a sales record', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
    //     .type('form')
    //     .send([{
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_bought: 5,
    //       amount: 2000,
    //       attendant_id: 1,
    //       attendant_name: 'otaigbe',
    //     }])
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       done();
    //     });
    // });

    it('should return an invalid token error', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I96FuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send(array).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('Testing the GET methods', function () {
    describe('Testing the getsalesrecordsbyid endpoint', function () {
      it('should return a salesrecord with id == to parameter in url', function (done) {
        _chai2.default.request(_index2.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      });
      it('should return an invalid token error', function (done) {
        _chai2.default.request(_index2.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFperyutjebCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
      });

      it('should return record doesnt exist message', _co2.default.wrap(function () {
        _chai2.default.request(_index2.default).get('/api/v1/sales/700').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.eql({ message: 'Record doesn\'t exist!' });
        });
      }));
    });

    describe('Testing the getAllSalesRecord endpoint', function () {
      it('should return all salesrecords (with pagination)', _co2.default.wrap(function (done) {
        _chai2.default.request(_index2.default).get('/api/v1/sales/').query({ pageNumber: 1 }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      }));
      it('should return all salesrecords (without pagination)', _co2.default.wrap(function (done) {
        _chai2.default.request(_index2.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      }));
      it('should return invalid token error', function (done) {
        _chai2.default.request(_index2.default).get('/api/v1/sales/').query({ pageNumber: 1 }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xvxfbfbceyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });
});