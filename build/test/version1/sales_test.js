"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _co = _interopRequireDefault(require("co"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

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
  // afterEach(() => {
  //   app.close();
  // });
  describe('Testing the create sales record endpoint', function () {
    it('POST / should return a no access token error', function (done) {
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
    });
    it('should successfully create a sales record', _co.default.wrap(function () {
      _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_bought: 5,
        amount: 2000,
        attendant_id: 1,
        attendant_name: 'otaigbe'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.eql({
          message: 'Records saved'
        });
      });
    }));
    it('should deny access and request for admin token', _co.default.wrap(function () {
      _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_bought: 5,
        amount: 2000,
        attendant_id: 1,
        attendant_name: 'otaigbe'
      }).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.eql({
          message: 'Forbidden! You need to have appropraite privileges'
        });
      });
    }));
    it('should deny access and return an invalid token message', _co.default.wrap(function () {
      _chai.default.request(_index.default).post('/api/v1/sales').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_bought: 5,
        amount: 2000,
        attendant_id: 1,
        attendant_name: 'otaigbe'
      }).end(function (err, res) {
        expect(res).to.have.status(400); // expect(res.body).to.be.a('string');
      });
    }));
  });
  describe('Testing the GET methods', function () {
    describe('Testing the getsalesrecordsbyid endpoint', function () {
      it('should return a salesrecord with id == to parameter in url', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('record');
          expect(res.body.message).to.equal('Sales Record Found!');
        });
      }));
      it('should  check if the creator of the sales record is the one accessing the record or if an admin is accessing', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(403);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Forbidden! You need to have appropraite privileges');
        });
      }));
      it('should return an invalid token error', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/1').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(400); // expect(res.body).to.equal('Invalid Token');

          done();
        });
      });
      it('should return record doesnt exist message', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/700').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.eql({
            message: 'Record doesn\'t exist!'
          });
        });
      }));
    });
    describe('Testing the getAllSalesRecord endpoint', function () {
      it('should return all salesrecords (with pagination)', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/').query({
          pageNumber: 1
        }).set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('salesRecords');
        });
      }));
      it('should return all salesrecords (without pagination)', _co.default.wrap(function () {
        _chai.default.request(_index.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a.jsonObj();
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('salesRecords');
        });
      }));
      it('should return an invalid token error', function (done) {
        _chai.default.request(_index.default).get('/api/v1/sales/').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370').end(function (err, res) {
          expect(res).to.have.status(500);
          done();
        });
      });
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