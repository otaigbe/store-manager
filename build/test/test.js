'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

describe('Store-manager endpoints', function () {
  //   it('should create a new product via POST', (done) => {
  //     chai.request(server).post('/api/v1/products')
  //       .send({
  //         product_name: 'Gino tomato paste',
  //         unit_rice: 50,
  //         quantity_supplied: 400,
  //         supplier: 'daniel',
  //         Category: 'can foods',
  //       }).end((err, res) => {
  //         console.log(res.status);
  //         expect(res.status).to.equal(201);
  //         done();
  //       });
  //   });

  it('GET / products endpoint should return a status of 200 and an array of products', function () {
    _chai2.default.request(_index2.default).get('/api/v1/products').then(function (res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    }).catch(function (err) {
      console.log(err.message);
    });
  });

  //   it('should GET / particular product through an Id', () => {
  //     chai.request(server).get('/api/v1/products/3').then((res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.an('object');
  //     })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   });

  //   it('should create a new sales records via POST', () => {
  //     chai.request(server).post('/api/v1/sales')
  //       .send({
  //         salesRecordId: 8031,
  //         productId: '3',
  //         productName: 'Gino spaghetti',
  //         brand: 'Gino',
  //         price: '67',
  //         category: 'pasta',
  //         quantitySold: '11',
  //         quantityInStock: '',
  //         CurrentQuantityInStock: 390,
  //         Amount: '500',
  //         Attendant: 'otaigbe',
  //         receiptNumber: '8843981298',
  //         DateSold: '10/19/2018, 5: 23: 50 PM',
  //       })
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be('sales record saved');
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   });


  //   it('should GET all sales records,return a status of 200 and an array of sales records', () => {
  //     chai.request(server).get('/api/v1/sales')
  //       .then((res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.an('array');
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   });

  //   it('GET / particular sales records by Id', () => {
  //     chai.request(server).get('/api/v1/sales/2365').then((res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.an('object');
  //     })
  //       .catch((err) => {

  //       });
  //   });
});
'use strict';