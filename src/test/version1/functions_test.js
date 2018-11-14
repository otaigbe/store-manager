/* eslint-disable prefer-destructuring */
import chai from 'chai';
import customFunc from '../../utils/functions';
import 'babel-polyfill';

const expect = chai.expect;

describe('Test for custom function used in sales', () => {
  it('should test the isEmpty function', () => {
    const obj = {};
    expect(customFunc.isEmpty).to.be.a('function');
  });

  it('should test the isEmpty function', () => {
    expect(customFunc.typeOf).to.be.a('function');
  });
});
