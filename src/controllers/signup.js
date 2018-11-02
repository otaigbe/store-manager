import Joi from 'joi';
import extensions from 'joi-date-extensions';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';
import 'babel-polyfill';

const JoiExtended = Joi.extend(extensions);

const signup = {};
const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
  admin: Joi.boolean().required(),
  token: Joi.string().required(),
});

function isadmin(bool) {
  if (bool === true || bool === 'true') {
    return true;
  }
  return false;
}

signup.checkAuth = async (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    let hashedPass = null;
    let salt = null;
    try {
      salt = await bcrypt.genSalt(10);
      hashedPass = await bcrypt.hash(req.body.password, salt);
    } catch (e) {
      console.log(e.message);
    }
    const decoded = jwt.verify(req.body.token, 'secret');
    if (decoded.admin === true) {
    // const bool = isadmin(req.body.admin);
      pool.connect(async (err, client) => {
        const email = [];
        email.push(req.body.email);
        const sql = 'SELECT email FROM attendants WHERE email = $1';
        const dbrows = await client.query(sql, email);
        // console.log(dbrows);
        if (dbrows.rowCount >= 1) {
          res.json({
            message: `User with email ${req.body.email} already exists. Choose Unique email to signup`,
          });
        } else {
          let query = '';
          const params1 = [];
          const params2 = [];
          params1.push(req.body.name, req.body.email, hashedPass, req.body.admin);
          params2.push(req.body.firstname, req.body.lastname, req.body.email, hashedPass, req.body.admin);
          query = 'INSERT INTO attendants (name,email, password, admin) VALUES ($1, $2, $3, $4)';
          if (err) { console.log(err.message); } else {
            const fb = await client.query(query, params1);
          }

          res.status(201).json({
            message: 'Attendant created',
          });
        }
      }).catch((error) => {
        console.log(error.message);
      });
    }
  } else {
    res.status(400).json({
      message: 'resource could not be created!',
      Error: result.error,
    });
  }
};
export default signup;
