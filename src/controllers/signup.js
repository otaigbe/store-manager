import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';
import 'babel-polyfill';

const signup = {};
const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
  admin: Joi.boolean().required(),
  token: Joi.string().required(),
});

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
    let decoded = null;
    try {
      decoded = await jwt.verify(req.body.token, 'secret');
      if (decoded.admin === true) {
        pool.connect(async (err, client) => {
          const email = [];
          email.push(req.body.email);
          const sql = 'SELECT email FROM attendants WHERE email = $1';
          const dbrows = await client.query(sql, email);
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
        }).catch((err) => {
          console.log(err.message);
          res.status(501).json({
            message: 'Something went wrong!',
          });
        });
      }
    } catch (error) {
      res.status(501).json({
        message: 'Something went wrong!',
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
