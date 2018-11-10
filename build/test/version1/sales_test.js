"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _co = _interopRequireDefault(require("co"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

var _salesAuth = _interopRequireDefault(require("../../middleware/sales-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
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
  describe('Testing the create sales record endpoint', function () {
    it('should return a no access token error', function (done) {
      _chai.default.request(_index.default).post('/api/v1/sales').type('form').send([{
        salesrecord_Id: 3,
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_bought: 5,
        amount: 2000,
        attendant_id: 2
      }]).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.eql({
          message: 'No access token provided! Unaccessible resource'
        });
        done();
      });
    }); // it('should successfully create a sales record', (done) => {
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
      _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I96FuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send(array).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('Testing the GET methods', function () {
    describe('Testing the getsalesrecordsbyid endpoint', function () {
      it('should return a salesrecord with id == to parameter in url', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      });
      it('should return an invalid token error', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFperyutjebCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
      });
      it('should return record doesnt exist message', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/700').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.eql({
            message: 'Record doesn\'t exist!'
          });
        });
      }));
    });
    describe('Testing the getAllSalesRecord endpoint', function () {
      it('should return all salesrecords (with pagination)', _co.default.wrap(function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/').query({
          pageNumber: 1
        }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      }));
      it('should return all salesrecords (without pagination)', _co.default.wrap(function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          done();
        });
      }));
      it('should return invalid token error', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/').query({
          pageNumber: 1
        }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xvxfbfbceyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
      });
      it('should check if the attendant that created the sales record is the one posting it', function (done) {
        _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE3ODUzMjF9.FSbfzqDTpXFYLmckkj9ZypJuwoMV3QNbqjfxQjQVzgg').type('form').send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_bought: 5,
          amount: 2000,
          attendant_id: 2,
          attendant_name: 'angela'
        }).end(function (err, res) {
          expect(res).to.have.status(403);
          done();
        });
      }); // it('should test custom functions', (done) => {
      //   chai.request(app)
      //     .post('/api/v1/sales')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE3ODUzMjF9.FSbfzqDTpXFYLmckkj9ZypJuwoMV3QNbqjfxQjQVzgg')
      //     .type('form')
      //     .send({
      //       product_id: 6,
      //       product_desc: 'Biscuits',
      //       unit_price: 400,
      //       quantity_bought: 5,
      //       amount: 2000,
      //       attendant_id: 2,
      //       attendant_name: 'angela',
      //     });
      //   expect(typeOf([{
      //     product_id: 6,
      //     product_desc: 'Biscuits',
      //     unit_price: 400,
      //     quantity_bought: 5,
      //     amount: 2000,
      //     attendant_id: 2,
      //     attendant_name: 'angela',
      //   }])).to.be.an('array');
      //   done();
      // });
    });
  });
});