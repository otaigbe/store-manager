/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import format from 'pg-format';
import customFunc from '../../utils/functions';
import 'babel-polyfill';

const expect = chai.expect;

describe('Test for custom function used in sales', () => {
  it('should test the isEmpty function', () => {
    const obj = {};
    expect(customFunc.isEmpty).to.be.a('function');
    expect(customFunc.isEmpty(obj)).to.be.true;
  });

  it('should test the isEmpty function', () => {
    expect(customFunc.typeOf).to.be.a('function');
  });

  it('should test the isEmpty function', () => {
    expect(format).to.be.a('function');
  });
  
  it('should test typeof function actually returns an array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(customFunc.typeOf(array)).to.equal('array');
  });

  it('should test typeof function actually returns an array', () => {
    const temp = null;
    expect(customFunc.typeOf(temp)).to.equal('null');
  });
});
