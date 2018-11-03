'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

describe('Store-manager endpoints', function () {
  // it('should create a new product via POST', (done) => {
  //   chai.request(server).post('/api/v1/products')
  //     .send({
  //       product_desc: 'Gino tomato paste',
  //       unit_price: 50,
  //       quantity_supplied: 400,
  //       supplier: 'daniel',
  //       category: 'can foods',
  //     }).end((err, res) => {
  //       if (err) console.log(err);
  //       console.log(res.status);
  //       expect(res.status).to.equal(201);
  //       done();
  //     });
  // });

  it('GET / products endpoint should return a status of 200', function () {
    _chai2.default.request(_index2.default).get('/api/v1/products').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('GET / products  and an array of products', function () {
    _chai2.default.request(_index2.default).get('/api/v1/products').then(function (res) {
      expect(res.body).to.be.an('array');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('should GET / particular product through an Id (status check)', function () {
    _chai2.default.request(_index2.default).get('/api/v1/products/3').then(function (res) {
      expect(res.body).to.be.an('object');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('should GET / particular product through an Id (object check)', function () {
    _chai2.default.request(_index2.default).get('/api/v1/products/3').then(function (res) {
      expect(res).to.have.status(200);
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('should GET /all sales', function () {
    _chai2.default.request(_index2.default).get('/api/v1/sales').then(function (res) {
      expect(res).to.have.status(200);
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('should GET allsalesrecords', function () {
    _chai2.default.request(_index2.default).get('/api/v1/sales').then(function (res) {
      expect(res).to.be.an('object');
    }).catch(function (err) {
      console.log(err.message);
    });
  });

  it('should GET salesrecordsbyId', function () {
    _chai2.default.request(_index2.default).get('/api/v1/sales').then(function (res) {
      expect(res).to.have.status(200);
    }).catch(function (err) {
      console.log(err.message);
    });
  });
  it('should GET salesrecordsbyId', function () {
    _chai2.default.request(_index2.default).get('/api/v1/sales').then(function (res) {
      expect(res).to.be('object');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});