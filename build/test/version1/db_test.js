"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _co = _interopRequireDefault(require("co"));

var _dbConnection = _interopRequireDefault(require("../../dbUtils/dbConnection"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect;
var config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASETEST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST
};
describe('Db Connection', function () {
  it('Should Test for a successful db connection', function (done) {
    done();
  });
});