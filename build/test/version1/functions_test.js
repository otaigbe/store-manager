"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _functions = _interopRequireDefault(require("../../utils/functions"));

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-destructuring */
var expect = _chai.default.expect;
describe('Test for custom function used in sales', function () {
  it('should test the isEmpty function', function () {
    var obj = {};
    expect(_functions.default.isEmpty).to.be.a('function');
  });
  it('should test the isEmpty function', function () {
    expect(_functions.default.typeOf).to.be.a('function');
  });
});