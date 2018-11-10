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

var pgConfig = {
  user: 'postgres',
  password: '',
  port: 5432,
  host: 'localhost',
  database: 'test_db'
};
describe('StoreManager endpoints tests', function () {
  afterEach(function () {
    _index.default.close();
  });
  describe('Testing the login endpoint', function () {
    describe('Testing the POST method', function () {
      it('should check the response status', function (done) {
        _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
          email: 'otaigbe@gmail.com',
          password: 'password'
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
      it('POST / login endpoint should return no errors', function (done) {
        _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
          email: 'otaigbe@gmail.com',
          password: 'password'
        }).end(function (err, res) {
          expect(err).to.be.null;
          done();
        });
      });
      it('POST / login endpoint should successfully sign in', function (done) {
        _chai.default.request(_index.default).post('/api/v1/auth/login').type('form').send({
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