import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db';
import con from './dbconString';

const login = {};
const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
});


login.auth = (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    pool.connect(async (err, client) => {
      if (err) { console.log(err.message); } else {
        const email = [];
        email.push(req.body.email);
        const sql = 'SELECT email,admin  FROM attendants WHERE email = $1';
        const dbrows = await client.query(sql, email);
        try {
          const validPassword = await bcrypt.compare(req.body.password, dbrows.rows[0].password);
          console.log(validPassword);
          if (!validPassword) {
            return res.json({
              message: 'Invalid Username or Password',
            });
          }
        // eslint-disable-next-line no-empty
        } catch (error) {
          console.log(error.message);
        }
        const tokenObj = {};
        tokenObj.email = dbrows.rows[0].email;
        tokenObj.admin = dbrows.rows[0].admin;
        if (tokenObj.admin === true) {
          const token = jwt.sign(tokenObj, process.env.SECRETKEY);
          return res.json({
            message: 'Youre logged in as admin',
            token,
          });
        } if (tokenObj.admin === false) {
          const token = jwt.sign(dbrows.rows[0], 'privateKey');
          return res.json({
            message: 'Youre logged in as Attendant',
            token,
          });
        }
      }
    });
  } else {
    console.log('wrong login');
  }
};
export default login;
