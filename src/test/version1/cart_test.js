/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import app from '../../index';
import 'babel-polyfill';

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJson);

describe('Testing products GET', () => {
  it('GET / products for carts endpoint; should return all products with pagination', async () => {
    const res = await chai.request(app).get('/api/v1/cart/')
      .query({ pageNumber: 1 });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('Resources');
  });
  it('GET / products for cart endpoint; should return all products without pagination', async () => {
    const res = await chai.request(app).get('/api/v1/cart/');
    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
});
