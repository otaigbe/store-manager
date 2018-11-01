import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';

const login = {};
const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
});


login.auth = (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    //    if (req.body.admin === true || req.body.admin === 'true') {
    pool.connect(async (err, client) => {
      if (err) { console.log(err.message); } else {
        const email = [];
        email.push(req.body.email);
        const sql = 'SELECT email,admin  FROM attendants WHERE email = $1';
        const dbrows = await client.query(sql, email);
        console.log(`From the admin ${dbrows.rows[0]}`);
        const validPassword = await bcrypt.compare(req.body.password, dbrows.rows[0].password);
        console.log(validPassword);
        if (!validPassword) {
          return res.json({
            message: 'Invalid Username or Password',

          });
        }
        const token = jwt.sign(dbrows.rows[0], 'privateKey');
        return res.json({
          message: 'Youre logged in as admin',
          token,
        });
      }
    });
    //  } else {
    pool.connect(async (err, client) => {
      if (err) { console.log(err.message); } else {
        const email = [];
        email.push(req.body.email);
        // email.push(req.body.password);
        // email.push(req.body.admin);
        const sql = 'SELECT email,password,admin FROM attendants WHERE email = $1';
        const dbrows = await client.query(sql, email);
        console.log(dbrows.rows[0]);
        const validPassword = await bcrypt.compare(req.body.password, dbrows.rows[0].password);
        if (!validPassword) {
          return res.json({
            message: 'Invalid Username or Password',

          });
        }
        const token = jwt.sign(dbrows.rows[0], 'privateKey');
        return res.json({
          message: 'Youre logged in as Attendant',
          token,
        });
      }
    });
  //  }
  } else {
    console.log('wrong login');
  }
};
export default login;
