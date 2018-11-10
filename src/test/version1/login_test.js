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
const pgConfig = {
  user: 'postgres',
  password: '',
  port: 5432,
  host: 'localhost',
  database: 'test_db',
};
describe('StoreManager endpoints tests', () => {
  afterEach(() => {
    app.close();
  });
  describe('Testing the login endpoint', () => {
    describe('Testing the POST method', () => {
      it('should check the response status', (done) => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .type('form')
          .send({
            email: 'otaigbe@gmail.com',
            password: 'password',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('POST / login endpoint should return no errors', (done) => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .type('form')
          .send({
            email: 'otaigbe@gmail.com',
            password: 'password',
          })
          .end((err, res) => {
            expect(err).to.be.null;
            done();
          });
      });
      it('POST / login endpoint should successfully sign in', (done) => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .type('form')
          .send({
            email: 'otaigbe@gmail.com',
            password: 'password',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql({
              message: 'You"re logged in',
            });
            done();
          });
      });
    });
  });
});
