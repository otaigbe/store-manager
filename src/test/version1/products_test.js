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
  describe('Testing products GET', () => {
    it('GET / products endpoint; should return all products with pagination', async () => {
      const res = await chai.request(app).get('/api/v1/products/')
        .query({ pageNumber: 1 });
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('Products');
    });
    // it('GET / products endpoint; should check the url', (done) => {
    //   chai.request(app).get('/api/v1/products/?pageNumber=1').end((err, res) => {
    //     chai.expect('/api/v1/products/?pageNumber=1').to.have.path('/api/v1/products/?pageNumber=1');
    //     done();
    //   });
    // });
    it('GET / products endpoint; should return all products without pagination', async () => {
      const res = await chai.request(app).get('/api/v1/products/');
      expect(res).to.have.status(200);
      expect(res).to.be.json;
    });

    it('GET / products endpoint; should return single product', async () => {
      const res = await chai.request(app).get('/api/v1/products/5');
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Product Found!');
      expect(res.body).to.have.property('Product');
    });

    it('GET / products endpoint; should return product not found', async () => {
      const res = await chai.request(app).get('/api/v1/products/50000');
      expect(res).to.have.status(404);
      expect(res).to.be.json;
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Product doesn\'t exist!');
    });
  });

  // end of products GET
  describe('Testing the Posts Method', () => {
    it('POST / products endpoint should return a 401 error. No access token provided!', async () => {
      const res = await chai.request(app).post('/api/v1/products').type('form')
        .send({
          product_desc: 'short bread butter biscuit',
          unit_price: 650,
          quantity_supplied: 40,
          supplier_name: 'Okonkwo',
          category: 'biscuits',
        });
      expect(res).to.have.status(401);
      expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
    });
    it('POST / products endpoint; should create a new Product in the database', async () => {
      const res = await chai.request(app).post('/api/v1/products').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_desc: 'short bread butter biscuit',
          unit_price: 650,
          quantity_supplied: 40,
          supplier_name: 'Okonkwo',
          category: 'biscuits',
        });
      expect(res.body).to.be.a.jsonObj();
      expect(res.body).to.have.property('message');
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('Created a new product.');
    });
    it('POST / products endpoint; should update an already existing product in the database', async () => {
      const res = await chai.request(app)
        .post('/api/v1/products')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_desc: 'bucket',
          unit_price: 150,
          quantity_supplied: 10,
          supplier_name: 'Okonkwo',
          category: 'hardware',
        });
      expect(res.body).to.be.a.jsonObj();
      expect(res).to.have.status(200);
      expect(res.body).to.eql({ message: 'Updated an already existent product.' });
    });
    it('POST / products endpoint; should report a validation error', async () => {
      const res = await chai.request(app).post('/api/v1/products')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_desc: 'bucket',
          unit_price: 350,
          quantity_in_stock: 10,
          supplier_name: 'Okonkwo',
          category: 'biscuits',
        });
      expect(res.body).to.be.a.jsonObj();
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('Error');
      expect(res.body.message).to.equal('Something wrong with input!');
    });

    it('POST / products endpoint; should return a no access message', async () => {
      const res = await chai.request(app).post('/api/v1/products')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw')
        .type('form')
        .send({
          product_desc: 'bucket',
          unit_price: 350,
          quantity_in_stock: 10,
          supplier_name: 'Okonkwo',
          category: 'biscuits',
        });
      expect(res.body).to.be.a.jsonObj();
      expect(res).to.have.status(403);
      expect(res.body).to.eql({ message: 'Forbidden! You need to have  admin privileges' });
    });
  });

  // end of POST
  // Beginning of PUT
  describe('Testing the PUT method', () => {
    it('PUT / should return no access token error', async () => {
      const res = await chai.request(app)
        .put('/api/v1/products/id')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'soap',
        });
      expect(res).to.have.status(401);
      expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
    });
    it('PUT / should return a product doesnt exists error message', async () => {
      const res = await chai.request(app)
        .put('/api/v1/products/6')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Detergent',
          unit_price: 400,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'soap',
        });
      expect(res).to.have.status(404);
      expect(res.body).to.eql({ message: 'Product doesn\'t exist! Create the Product' });
    });
    it('PUT / should return a forbidden access error', async () => {
      const res = await chai.request(app)
        .put('/api/v1/products/6')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'soap',
        });
      expect(res).to.have.status(403);
      expect(res.body).to.eql({ message: 'Forbidden! You need to have  admin privileges' });
    });
    it('PUT / should return a validation error! Unprocessable entity', async () => {
      const res = await chai.request(app).put('/api/v1/products/6')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_in_stock: 150,
          supplier_name: 'Okonkwo',
          category: 'soap',
        });
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Validation error! Please check your input');
    });
    it('PUT / should modify a product in the database', async () => {
      const res = await chai.request(app).put('/api/v1/products/7')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: 7,
          product_desc: 'Ariel',
          unit_price: 400,
          quantity_supplied: 150,
          supplier_name: 'Okonkwo',
          category: 'Detergent',
        });
      expect(res).to.have.status(200);
      expect(res.body).to.eql({ message: 'Product Modified' });
    });
  });
  // end of PUT
  // Beginning of DELETE
  describe('Testing the Delete method', () => {
    it('Delete / should return no access token error', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/products/id')
        .type('form')
        .send({
          product_id: 6,
        });
      expect(res).to.have.status(401);
      expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
    });
    it('Delete / should return a validation error', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/products/id')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: 'product3',
        });
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Validation error! Please check your input');
    });
    it('Delete / should return cannot delete a non existent product message', co.wrap(() => {
      chai.request(app).delete('/api/v1/products/id')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: 500,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Product doesn\'t exist! Nothing to Delete');
        });

      // expect(res.body).to.have.property('message');
      // expect(res.body.message).to.equal('Validation error! Please check your input');
    }));

    it('Delete / should delete a product from the database', co.wrap(() => {
      chai.request(app)
        .delete('/api/v1/products/id')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ4NjQ2MH0.F-7ZK_IyOxO5VVKlotO7ySh5QF4Bz2T3qNEg0CxDNSI')
        .type('form')
        .send({
          product_id: '8',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Product Deleted');
        });
    }));
  });
});
