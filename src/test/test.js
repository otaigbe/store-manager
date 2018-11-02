import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Store-manager endpoints', () => {
  it('should create a new product via POST', (done) => {
    chai.request(server).post('/api/v1/products')
      .send({
        product_desc: 'Gino tomato paste',
        unit_price: 50,
        quantity_in_stock: 400,
        supplier: 'daniel',
        category: 'can foods',
      }).end((err, res) => {
        if (err) console.log(err);
        console.log(res.status);
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('GET / products endpoint should return a status of 200', () => {
    chai.request(server).get('/api/v1/products').then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('GET / products  and an array of products', () => {
    chai.request(server).get('/api/v1/products').then((res) => {
      expect(res.body).to.be.an('array');
    })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should GET / particular product through an Id (status check)', () => {
    chai.request(server).get('/api/v1/products/3').then((res) => {
      expect(res.body).to.be.an('object');
    })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should GET / particular product through an Id (object check)', () => {
    chai.request(server).get('/api/v1/products/3').then((res) => {
      expect(res).to.have.status(200);
    })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should GET /all sales', () => {
    chai.request(server).get('/api/v1/sales').then((res) => {
      expect(res).to.have.status(200);
    })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should GET allsalesrecords', () => {
    chai.request(server).get('/api/v1/sales').then((res) => {
      expect(res).to.be.an('object');
    })
      .catch((err) => {
        console.log(err.message);
      });
  });

  it('should GET salesrecordsbyId', () => {
    chai.request(server).get('/api/v1/sales').then((res) => {
      expect(res).to.have.status(200);
    }).catch((err) => {
        console.log(err.message);
      });
  });
  it('should GET salesrecordsbyId', () => {
    chai.request(server).get('/api/v1/sales').then((res) => {
      expect(res).to.be('object');
    })
      .catch((err) => {
        console.log(err.message);
      });
  });

 
});
'use strict';
