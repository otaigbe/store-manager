"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiJson = _interopRequireDefault(require("chai-json"));

var _chaiUrl = _interopRequireDefault(require("chai-url"));

var _co = _interopRequireDefault(require("co"));

var _index = _interopRequireDefault(require("../../index"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */

/* eslint-disable no-unused-expressions */
var expect = _chai.default.expect;

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiJson.default);

_chai.default.use(_chaiUrl.default);

describe('Testing out Products endpoints', function () {
  describe('Testing products GET', function () {
    it('GET / products endpoint; should check if url has a parameter of id', function (done) {
      _chai.default.request(_index.default).get('/api/v1/products/').query({
        pageNumber: 1
      }).end(function (err, res) {
        expect(res).to.be.json;
        done();
      });
    });
    it('GET / products endpoint; should check the url', function (done) {
      _chai.default.request(_index.default).get('/api/v1/products/?pageNumber=1').end(function (err, res) {
        _chai.default.expect('/api/v1/products/?pageNumber=1').to.have.path('/api/v1/products/?pageNumber=1');

        done();
      });
    });
  }); // end of products GET

  describe('Testing the Posts Method', function () {
    it('POST / products endpoint should return a 401 error', function (done) {
      _chai.default.request(_index.default).post('/api/v1/products').type('form').send({
        product_desc: 'short bread butter biscuit',
        unit_price: 650,
        quantity_supplied: 40,
        supplier_name: 'Okonkwo',
        category: 'biscuits'
      }).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.eql({
          message: 'No access token provided! Unaccessible resource'
        });
        done();
      });
    });
    it('POST / products endpoint; should create a new Product in the database', function (done) {
      _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_desc: 'short bread butter biscuit',
        unit_price: 650,
        quantity_supplied: 40,
        supplier_name: 'Okonkwo',
        category: 'biscuits'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jsonObj();
        expect(res).to.have.status(201);
        done();
      });
    });
    it('POST / products endpoint; should update an already existing product in the database', _co.default.wrap(function () {
      _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_desc: 'bucket',
        unit_price: 350,
        quantity_supplied: 10,
        supplier_name: 'Okonkwo',
        category: 'hardware'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jsonObj();
        expect(res).to.have.status(200);
        expect(res.body).to.eql({
          message: 'Updated an already existent product.'
        });
      });
    }));
    it('POST / products endpoint; should report a validation error', function (done) {
      _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_desc: 'bucket',
        unit_price: 350,
        quantity_in_stock: 10,
        supplier_name: 'Okonkwo',
        category: 'biscuits'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jsonObj();
        expect(res).to.have.status(422);
        done();
      });
    });
    it('POST / products endpoint; should return a no access message', function (done) {
      _chai.default.request(_index.default).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
        product_desc: 'bucket',
        unit_price: 350,
        quantity_in_stock: 10,
        supplier_name: 'Okonkwo',
        category: 'biscuits'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res.body).to.be.a.jsonObj();
        expect(res).to.have.status(403);
        expect(res.body).to.eql({
          message: 'Forbidden! You need to have  admin privileges'
        });
        done();
      });
    });
  }); // end of POST
  // Beginning of PUT

  describe('Testing the PUT method', function () {
    it('PUT / should return no access token error', function (done) {
      _chai.default.request(_index.default).put('/api/v1/products/id').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_supplied: 150,
        supplier_name: 'Okonkwo',
        category: 'soap'
      }).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.eql({
          message: 'No access token provided! Unaccessible resource'
        });
        done();
      });
    });
    it('PUT / should Modify the product in the database', _co.default.wrap(function () {
      _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_supplied: 150,
        supplier_name: 'Okonkwo',
        category: 'soap'
      }).end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.eql({
          message: 'Product Modified'
        });
      });
    }));
    it('PUT / should return a forbidden access error', function (done) {
      _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_supplied: 150,
        supplier_name: 'Okonkwo',
        category: 'soap'
      }).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.eql({
          message: 'Forbidden! You need to have  admin privileges'
        });
        done();
      });
    });
    it('PUT / should return a validation error', function (done) {
      _chai.default.request(_index.default).put('/api/v1/products/6').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_id: 6,
        product_desc: 'Biscuits',
        unit_price: 400,
        quantity_in_stock: 150,
        supplier_name: 'Okonkwo',
        category: 'soap'
      }).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('PUT / should return a non existent product error message', _co.default.wrap(function () {
      _chai.default.request(_index.default).put('/api/v1/products/125').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI').type('form').send({
        product_id: 125,
        product_desc: 'sans cream soda',
        unit_price: 400,
        quantity_supplied: 150,
        supplier_name: 'Okonkwo',
        category: 'soap'
      }).end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body).to.eql({
          message: 'Product doesn\'t exist! Create the Product'
        });
      });
    }));
  }); // end of PUT
  // Beginning of DELETE
  // describe('Testing the PUT method', () => {
  //   it('Delete / should return status of 200', (done) => {
  //   });
  // });
});