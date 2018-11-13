/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import chaiUrl from 'chai-url';
import co from 'co';
import app from '../../index';
import 'babel-polyfill';
import typeOf from '../../middleware/sales-auth';

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJson);
chai.use(chaiUrl);

const array = [{
  product_id: 6,
  product_desc: 'Biscuits',
  unit_price: 400,
  quantity_bought: 5,
  amount: 2000,
  attendant_id: 1,
  attendant_name: 'otaigbe',
}];
describe('Test cases for the sales endpoint', () => {
  afterEach(() => {
    app.close();
  });
  describe('Testing the create sales record endpoint', () => {
    it('POST / should return a no access token error', (done) => {
      chai.request(app)
        .post('/api/v1/sales')
        .type('form')
        .send([{
          salesrecord_Id: 3,
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_bought: 5,
          amount: 2000,
          attendant_id: 2,
        }])
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
          done();
        });
    });

    // it('should successfully create a sales record', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
    //     .type('form')
    //     .send([{
    //       product_id: 6,
    //       product_desc: 'Biscuits',
    //       unit_price: 400,
    //       quantity_bought: 5,
    //       amount: 2000,
    //       attendant_id: 1,
    //       attendant_name: 'otaigbe',
    //     }])
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       done();
    //     });
    // });

    // it('should return an invalid token error', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/sales')
    //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I96FuZ2VsYUBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MTQ4OTE5NH0.aEbvCde9ALV1B0VksKGuu39PIdbWUiGYc5eoigtEAgw')
    //     .type('form')
    //     .send(array)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       done();
    //     });
    // });
  });
  describe('Testing the GET methods', () => {
    describe('Testing the getsalesrecordsbyid endpoint', () => {
      // it('should return a salesrecord with id == to parameter in url', (done) => {
      //   chai.request(app)
      //     .get('/api/v1/sales/1')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(200);
      //       expect(res.body).to.be.a.jsonObj();
      //       done();
      //     });
      // });
      // it('should return an invalid token error', (done) => {
      //   chai.request(app)
      //     .get('/api/v1/sales/1')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFperyutjebCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(400);
      //       done();
      //     });
      // });

      // it('should return record doesnt exist message', co.wrap(() => {
      //   chai.request(app)
      //     .get('/api/v1/sales/700')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(404);
      //       expect(res.body).to.be.a.jsonObj();
      //       expect(res.body).to.eql({ message: 'Record doesn\'t exist!' });
      //     });
      // }));
    });

    describe('Testing the getAllSalesRecord endpoint', () => {
      // it('should return all salesrecords (with pagination)', co.wrap((done) => {
      //   chai.request(app)
      //     .get('/api/v1/sales/')
      //     .query({ pageNumber: 1 })
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(200);
      //       expect(res.body).to.be.a.jsonObj();
      //       done();
      //     });
      // }));
      // it('should return all salesrecords (without pagination)', co.wrap((done) => {
      //   chai.request(app)
      //     .get('/api/v1/sales/')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(200);
      //       expect(res.body).to.be.a.jsonObj();
      //       done();
      //     });
      // }));
      // it('should return invalid token error', (done) => {
      //   chai.request(app)
      //     .get('/api/v1/sales/')
      //     .query({ pageNumber: 1 })
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xvxfbfbceyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTU0MTQ0NTgxNn0.riIuOpKwOhPq3HVwxLQikmwJ2ZCf3gQue2Pb_xQTV3I')
      //     .end((err, res) => {
      //       expect(res).to.have.status(400);
      //       done();
      //     });
      // });

      // it('should check if the attendant that created the sales record is the one posting it', (done) => {
      //   chai.request(app)
      //     .post('/api/v1/sales')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE3ODUzMjF9.FSbfzqDTpXFYLmckkj9ZypJuwoMV3QNbqjfxQjQVzgg')
      //     .type('form')
      //     .send({
      //       product_id: 6,
      //       product_desc: 'Biscuits',
      //       unit_price: 400,
      //       quantity_bought: 5,
      //       amount: 2000,
      //       attendant_id: 2,
      //       attendant_name: 'angela',
      //     })
      //     .end((err, res) => {
      //       expect(res).to.have.status(403);
      //       done();
      //     });
      // });

      // it('should test custom functions', (done) => {
      //   chai.request(app)
      //     .post('/api/v1/sales')
      //     .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE3ODUzMjF9.FSbfzqDTpXFYLmckkj9ZypJuwoMV3QNbqjfxQjQVzgg')
      //     .type('form')
      //     .send({
      //       product_id: 6,
      //       product_desc: 'Biscuits',
      //       unit_price: 400,
      //       quantity_bought: 5,
      //       amount: 2000,
      //       attendant_id: 2,
      //       attendant_name: 'angela',
      //     });
      //   expect(typeOf([{
      //     product_id: 6,
      //     product_desc: 'Biscuits',
      //     unit_price: 400,
      //     quantity_bought: 5,
      //     amount: 2000,
      //     attendant_id: 2,
      //     attendant_name: 'angela',
      //   }])).to.be.an('array');
      //   done();
      // });
    });
  });
});
