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
      .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MzY3MTM1OX0.8h2vnVxIz2UFCcQoTN8XTUBA1SIAhDNnlL9oVtPnKQo')
      .query({ pageNumber: 1 });
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('Resources');
  });
  it('GET / products for cart endpoint; should return all products without pagination', async () => {
    const res = await chai.request(app).get('/api/v1/cart/')
      .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImF0dGVuZGFudF9pZCI6MiwibmFtZSI6ImFuZ2VsYSIsImlhdCI6MTU0MzY3MTM1OX0.8h2vnVxIz2UFCcQoTN8XTUBA1SIAhDNnlL9oVtPnKQo');
    expect(res).to.have.status(200);
    expect(res).to.be.json;
  });
});
