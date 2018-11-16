"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _pgFormat = _interopRequireDefault(require("pg-format"));

var _functions = _interopRequireDefault(require("../../utils/functions"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */

/* eslint-disable prefer-destructuring */
var expect = _chai.default.expect;
describe('Test for custom function used in sales', function () {
  it('should test the isEmpty function', function () {
    var obj = {};
    expect(_functions.default.isEmpty).to.be.a('function');
    expect(_functions.default.isEmpty(obj)).to.be.true;
  });
  it('should test the isEmpty function', function () {
    expect(_functions.default.typeOf).to.be.a('function');
  });
  it('should test the isEmpty function', function () {
    expect(_pgFormat.default).to.be.a('function');
  });
  it('should test typeof function actually returns an array', function () {
    var array = [1, 2, 3, 4, 5];
    expect(_functions.default.typeOf(array)).to.equal('array');
  });
  it('should test typeof function actually returns an array', function () {
    var temp = null;
    expect(_functions.default.typeOf(temp)).to.equal('null');
  });
});