/* const chai = require('chai');
let expect = require('chai').expect;
chai.use(require('chai-http')); */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const expect = chai.expect;

describe('Store-manager endpoints', () => {
  // Tests for the products endpoints.
  chai.use(chaiHttp);
  chai.should();
  it('should create a new product via POST', () => {
    chai.request(app).post('/api/v1/products')
      .send({
        Id: 456,
        Name: 'Gino tomato paste',
        Brand: 'Gino',
        Price: 50,
        QuantitySupplied: '400',
        Supplier: 'daniel',
        Date: '2018-10-15',
        Category: 'can foods',
      })
      .then((res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.json({
          Id: 456,
          Name: 'Gino tomato paste',
          Brand: 'Gino',
          Price: 50,
          QuantitySupplied: '400',
          Supplier: 'daniel',
          Date: '2018-10-15',
          Category: 'can foods',
        });
      })
      .catch((err) => {
      // console.log(err);
      });
  });

  it('GET / products endpoint should return a status of 200 and an array of products', () => {
    chai.request(app).get('/api/v1/products').then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    })
      .catch((err) => {
      // console.log(err);
      });
  });

  it('should GET / particular product through an Id', () => {
    chai.request(app).get('/api/v1/products/3').then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    })
      .catch((err) => {
      //  console.log(err);
      });
  });
  // End of products endpoint tests


  // Testing the sales endpoints
  it('should create a new sales records via POST', () => {
    chai.request(app).post('/api/v1/sales')
      .send({
        salesRecordId: 8031,
        productId: '3',
        productName: 'Gino spaghetti',
        brand: 'Gino',
        price: '67',
        category: 'pasta',
        quantitySold: '11',
        quantityInStock: '',
        CurrentQuantityInStock: 390,
        Amount: '500',
        Attendant: 'otaigbe',
        receiptNumber: '8843981298',
        DateSold: '10/19/2018, 5: 23: 50 PM',
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be('sales record saved');
      })
      .catch((err) => {
       // console.log(err);
      });
  });


  it('should GET all sales records,return a status of 200 and an array of sales records', () => {
    chai.request(app).get('/api/v1/sales')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      })
      .catch((err) => {
      //  console.log(err);
      });
  });

  it('GET / particular sales records by Id', () => {
    chai.request(app).get('/api/v1/sales/2365').then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');   
    })
      .catch((err) => {

      });
  });
  // End of sales testing
});
