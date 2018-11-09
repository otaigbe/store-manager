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
var pgConfig = {
  user: 'postgres',
  password: 'mar889003',
  port: 5432,
  host: 'localhost',
  database: 'test-db'
};
describe('StoreManager endpoints tests', function () {
  afterEach(function () {
    _index2.default.close();
  });
  describe('Testing the login endpoint', function () {
    describe('Testing the POST method', function () {
      it('should check the response status', function (done) {
        _chai2.default.request(_index2.default).post('/api/v1/auth/login').type('form').send({
          email: 'otaigbe@gmail.com',
          password: 'password'
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('POST / login endpoint should return no errors', function (done) {
        _chai2.default.request(_index2.default).post('/api/v1/auth/login').type('form').send({
          email: 'otaigbe@gmail.com',
          password: 'password'
        }).end(function (err, res) {
          expect(err).to.be.null;
          done();
        });
      });
      it('POST / login endpoint should successfully sign in', function (done) {
        _chai2.default.request(_index2.default).post('/api/v1/auth/login').type('form').send({
          email: 'otaigbe@gmail.com',
          password: 'password'
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.eql({
            message: 'You"re logged in'
          });
          done();
        });
      });
    });
  });
});