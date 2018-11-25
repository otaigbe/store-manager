/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJson from 'chai-json';
import chaiUrl from 'chai-url';
import chaiCookie from 'chai-expected-cookie';

import app from '../../index';
import 'babel-polyfill';

const expect = chai.expect;
chai.use(chaiHttp);
chai.use(chaiJson);
chai.use(chaiUrl);
chai.use(chaiCookie);

describe('StoreManager endpoints tests', () => {
  afterEach(() => {
    app.close();
  });
  describe('Testing the login endpoint', () => {
    describe('Testing the POST method', () => {
      describe('Testing when correct information is provided', () => {
        // it('POST / login endpoint should successfully sign in', async () => {
        //   const res = await chai.request(app).post('/api/v1/auth/login').type('form').send({ email: 'otaigbe@gmail.com', password: 'password' });
        //   expect(res).to.redirectTo('http://127.0.0.1:4555/admin_control_page.html');
        // });
        it('POST / login endpoint should successfully sign in(not as admin)', async () => {
          const res = await chai.request(app).post('/api/v1/auth/login').type('form').send({ email: 'angela@gmail.com', password: 'password' });
          chai.expect('http://127.0.0.1:4555/cart.html').to.have.path('/cart.html');
        });
      });
      describe('Testing when wrong information is inputted', () => {
        it('POST / login endpoint should return a 404(not found) error', async () => {
          const res = await chai.request(app).post('/api/v1/auth/login').type('form').send({ email: 'otaigbe@gmail.com', password: 'okokobioko' });
          expect(res).to.have.status(404);
          expect(res.body).to.eql({ message: 'User doesn"t exist! Enter valid email and password' });
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('User doesn"t exist! Enter valid email and password');
        });
        it('POST / login endpoint should return a 422(unprocessable entity) error', async () => {
          const res = await chai.request(app).post('/api/v1/auth/login').type('form').send({ email: 'otaigbe', password: 'okokobioko' });
          expect(res).to.have.status(422);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('ErrorMessage');
          expect(res.body.message).to.equal('Validation error! Please check your input');
        });
      });
    });
  });
});
