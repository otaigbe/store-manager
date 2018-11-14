/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
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
  // afterEach(() => {
  //   app.close();
  // });
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

    it('should successfully create a sales record', co.wrap(() => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_bought: 5,
          amount: 2000,
          attendant_id: 1,
          attendant_name: 'otaigbe',
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.eql({ message: 'Records saved' });
        });
    }));

    it('should deny access and request for admin token', co.wrap(() => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_bought: 5,
          amount: 2000,
          attendant_id: 1,
          attendant_name: 'otaigbe',
        })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.eql({ message: 'Forbidden! You need to have appropraite privileges' });
        });
    }));

    it('should deny access and return an invalid token message', co.wrap(() => {
      chai.request(app)
        .post('/api/v1/sales')
        .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
        .type('form')
        .send({
          product_id: 6,
          product_desc: 'Biscuits',
          unit_price: 400,
          quantity_bought: 5,
          amount: 2000,
          attendant_id: 1,
          attendant_name: 'otaigbe',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          // expect(res.body).to.be.a('string');
        });
    }));
  });
  describe('Testing the GET methods', () => {
    describe('Testing the getsalesrecordsbyid endpoint', () => {
      it('should return a salesrecord with id == to parameter in url', co.wrap(() => {
        chai.request(app)
          .get('/api/v1/sales/1')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a.jsonObj();
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('record');
            expect(res.body.message).to.equal('Sales Record Found!');
          });
      }));
      it('should  check if the creator of the sales record is the one accessing the record or if an admin is accessing', co.wrap(() => {
        chai.request(app)
          .get('/api/v1/sales/1')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a.jsonObj();
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('Forbidden! You need to have appropraite privileges');
          });
      }));

      it('should return an invalid token error', (done) => {
        chai.request(app)
          .get('/api/v1/sales/1')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(400);
            // expect(res.body).to.equal('Invalid Token');
            done();
          });
      });

      it('should return record doesnt exist message', co.wrap(() => {
        chai.request(app)
          .get('/api/v1/sales/700')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a.jsonObj();
            expect(res.body).to.eql({ message: 'Record doesn\'t exist!' });
          });
      }));
    });

    describe('Testing the getAllSalesRecord endpoint', () => {
      it('should return all salesrecords (with pagination)', co.wrap(() => {
        chai.request(app)
          .get('/api/v1/sales/')
          .query({ pageNumber: 1 })
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a.jsonObj();
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('salesRecords');
          });
      }));
      it('should return all salesrecords (without pagination)', co.wrap(() => {
        chai.request(app)
          .get('/api/v1/sales/')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a.jsonObj();
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('salesRecords');
          });
      }));

      it('should return an invalid token error', (done) => {
        chai.request(app)
          .get('/api/v1/sales/')
          .set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAZ21haWwuYdsfgdhdgf29tIiwiYWRtaW4iOnRydWUsImF0dGVuZGFudF9pZCI6MSwibmFtZSI6Im90YWlnYmUiLCJpYXQiOjE1NDE2Nzg3MTN9.fYiBIQAVnd6dxPjJJ6o6xNKZZSbU0FLk4xikzlj7370')
          .end((err, res) => {
            expect(res).to.have.status(500);         
            done();
          });
      });
      it('should return a no access token provided', (done) => {
        chai.request(app)
          .get('/api/v1/sales/')
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.eql({ message: 'No access token provided! Unaccessible resource' });
            done();
          });
      });
      // describe('Testing the additional endpoint(getsalesRecordsPerCreator', () => {

      // });
    });
  });
});
