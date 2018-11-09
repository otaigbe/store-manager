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

var expect = _chai2.default.expect; /* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */

_chai2.default.use(_chaiHttp2.default);
_chai2.default.use(_chaiJson2.default);
_chai2.default.use(_chaiUrl2.default);
describe('Testing the SIGNUP endpoint', function () {
  describe('Testing the POST method', function () {
    it('should check if token exists', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').type('form').send({
        name: 'Ehimare',
        email: 'Ehimare@gmail.com',
        password: 'password',
        admin: true
      }).end(function (err, res) {
        expect(res).to.have.status(401);
        expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
        done();
      });
    });
    it('should check if request successful after token is set and already existent email is passed', _co2.default.wrap(function () {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I').type('form').send({
        name: 'otaigbe',
        email: 'otaigbe@gmail.com',
        password: 'password',
        admin: true
      }).end(function (err, res) {
        expect(res).to.have.status(409);
        expect(res.body).to.eql({ message: 'Email already exists, choose a unique email.' });
      });
    }));

    // it('should check if request successful after token is set and unique email is passed', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/signup')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       name: 'stanley',
    //       email: 'stanley@gmail.com',
    //       password: 'password',
    //       admin: true,
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(201);
    //       expect(res.body).to.eql({ message: 'Attendant created! Proceed to login' });
    //       done();
    //     });
    // }).timeout(20000);
    it('should check if a user is admin', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw').type('form').send({
        name: 'olu',
        email: 'olu@gmail.com',
        password: 'password',
        admin: true
      }).end(function (err, res) {
        expect(res).to.have.status(403);
        expect(res.body).to.eql({ message: 'Forbidden! You need to have  admin privileges' });
        done();
      });
    });

    it('POST / signup endpoint should return no errors', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').type('form').send({
        name: 'Otaigbe',
        email: 'otaigbe@gmail.com',
        admin: true
      }).end(function (err, res) {
        expect(err).to.be.null;
        done();
      });
    });
    it('(POST / signup endpoint) should check that the name,email,admin property of body is filled', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').type('form').send({
        name: 'Otaigbe',
        email: 'otaigbe@gmail.com',
        admin: true
      }).end(function (err, req) {
        expect(req.body.name).to.not.be.null;
        expect(req.body.email).to.not.be.null;
        expect(req.body.admin).to.not.be.null;
        done();
      });
    });
    it('(POST / products endpoint) should check that the request is json', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').type('form').send({
        name: 'Otaigbe',
        email: 'otaigbe@gmail.com',
        admin: true
      }).end(function (err, req) {
        expect(req.body).to.be.a.jsonObj();
        done();
      });
    });
    it('(POST / products endpoint) should check that the response is json', function (done) {
      _chai2.default.request(_index2.default).post('/api/v1/auth/signup').type('form').send({
        name: 'Otaigbe',
        email: 'otaigbe@gmail.com',
        admin: true
      }).end(function (err, res) {
        expect(res.body).to.be.a.jsonObj();
        done();
      });
    });
  });
});