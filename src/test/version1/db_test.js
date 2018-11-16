import chai from 'chai';
import co from 'co';
import db from '../../dbUtils/dbConnection';

import 'babel-polyfill';

const expect = chai.expect;
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASETEST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
};
describe('Db Connection', () => {
  it('Should Test for a successful db connection', (done) => {

    done();
  });
});
