/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import chaiUrl from 'chai-url';
import co from 'co';
import app from '../src/index';
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
      it('should check the response status', co.wrap(() => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .type('form')
          .send({
            email: 'otaigbe@gmail.com',
            password: 'password',
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
      }));
      it('POST / login endpoint should return no errors', co.wrap(() => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .type('form')
          .send({
            email: 'otaigbe@gmail.com',
            password: 'password',
          })
          .end((err, res) => {
            expect(err).to.be.null;
          });
      }));
      it('POST / login endpoint should successfully sign in', co.wrap(() => {
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
          });
      }));
    });
  });
});
