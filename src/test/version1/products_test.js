/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import chaiUrl from 'chai-url';
import co from 'co';
import app from '../../index';
import 'babel-polyfill';

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJson);
chai.use(chaiUrl);
describe('Testing out Products endpoints', () => {
  afterEach(() => {
    app.close();
  });
  describe('Testing products GET', () => {
    it('GET / products endpoint; should check if url has a parameter of id', (done) => {
      chai.request(app).get('/api/v1/products/')
        .query({ pageNumber: 1 })
        .end((err, res) => {
          expect(res).to.be.json;
          done();
        });
    });
    it('GET / products endpoint; should check the url', (done) => {
      chai.request(app).get('/api/v1/products/?pageNumber=1').end((err, res) => {
        chai.expect('/api/v1/products/?pageNumber=1').to.have.path('/api/v1/products/?pageNumber=1');
        done();
      });
    });
  });

  // end of products GET
  describe('Testing the Posts Method', () => {
    // it('POST / products endpoint should return a 401 error', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/products')
    //     .type('form')
    //     .send({
    //       product_desc: 'short bread butter biscuit',
    //       unit_price: 650,
    //       quantity_supplied: 40,
    //       supplier_name: 'Okonkwo',
    //       category: 'biscuits',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(401);
    //       expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
    //       done();
    //     });
    // });
    it('POST / products endpoint; should create a new Product in the database', (done) => {
      chai.request(app)
        .post('/api/v1/products')
        // .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_desc: 'short bread butter biscuit',
          unit_price: 650,
          quantity_supplied: 40,
          supplier_name: 'Okonkwo',
          category: 'biscuits',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.a.jsonObj();
          expect(res).to.have.status(201);
          done();
        });
    });
    // it('POST / products endpoint; should update an already existing product in the database', co.wrap(() => {
    //   chai.request(app)
    //     .post('/api/v1/products')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       product_desc: 'bucket',
    //       unit_price: 350,
    //       quantity_supplied: 10,
    //       supplier_name: 'Okonkwo',
    //       category: 'hardware',
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res.body).to.be.a.jsonObj();
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.eql({ message: 'Updated an already existent product.' });
    //     });
    // }));
    // it('POST / products endpoint; should report a validation error', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/products')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       product_desc: 'bucket',
    //       unit_price: 350,
    //       quantity_in_stock: 10,
    //       supplier_name: 'Okonkwo',
    //       category: 'biscuits',
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res.body).to.be.a.jsonObj();
    //       expect(res).to.have.status(422);
    //       done();
    //     });
    // });
    // it('POST / products endpoint; should return a no access message', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/products')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw')
    //     .type('form')
    //     .send({
    //       product_desc: 'bucket',
    //       unit_price: 350,
    //       quantity_in_stock: 10,
    //       supplier_name: 'Okonkwo',
    //       category: 'biscuits',
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res.body).to.be.a.jsonObj();
    //       expect(res).to.have.status(403);
    //       expect(res.body).to.eql({ message: 'Forbidden! You need to have  admin privileges' });
    //       done();
    //     });
    // });
  });

  // end of POST
  // Beginning of PUT
  describe('Testing the PUT method', () => {
    it('PUT / should return no access token error', (done) => {
      chai.request(app)
        .put('/api/v1/products/id')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'soap',
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
          done();
        });
    });
    // it('PUT / should Modify the product in the database', co.wrap(() => {
    //   chai.request(app)
    //     .put('/api/v1/products/6')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_supplied: 150,
    //       supplier_name: 'Okonkwo',
    //       category: 'soap',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.eql({ message: 'Product Modified' });
    //     });
    // }));
    // it('PUT / should return a forbidden access error', (done) => {
    //   chai.request(app)
    //     .put('/api/v1/products/6')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw')
    //     .type('form')
    //     .send({
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_supplied: 150,
    //       supplier_name: 'Okonkwo',
    //       category: 'soap',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(403);
    //       expect(res.body).to.eql({ message: 'Forbidden! You need to have  admin privileges' });
    //       done();
    //     });
    // });
    // it('PUT / should return a validation error', (done) => {
    //   chai.request(app)
    //     .put('/api/v1/products/6')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_in_stock: 150,
    //       supplier_name: 'Okonkwo',
    //       category: 'soap',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       done();
    //     });
    // });
    // it('PUT / should return a non existent product error message', co.wrap(() => {
    //   chai.request(app)
    //     .put('/api/v1/products/125')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
    //     .type('form')
    //     .send({
    //       product_id: 125,
    //       product_desc: 'sans cream soda',
    //       unit_price: 400,
    //       quantity_supplied: 150,
    //       supplier_name: 'Okonkwo',
    //       category: 'soap',
    //     })
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.body).to.eql({ message: 'Product doesn\'t exist! Create the Product' });
    //     });
    // }));
  });
  // end of PUT
  // Beginning of DELETE
  // describe('Testing the PUT method', () => {
  //   it('Delete / should return status of 200', (done) => {

  //   });
  // });
});
