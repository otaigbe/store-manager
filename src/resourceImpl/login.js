import jwt from 'jsonwebtoken';
import Joi from 'joi';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';

const loginImpl = {};
const schema = Joi.object({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
});

loginImpl.login = (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const temp = [req.body.email, req.body.password];
    pool.connect(async (err, client) => {
      if (err) {
        /* ignore istanbul next */
        res.status(501).json({
          message: 'Internal Server Error',
          Error: err,
        });
      } else {
        try {
          const db = await client.query(queries.selectLoginQuery, temp);
          if (db.rowCount > 0) {
            const signObj = {};
            signObj.email = db.rows[0].attendant_email;
            signObj.admin = db.rows[0].attendant_admin;
            signObj.attendant_id = db.rows[0].attendant_id;
            signObj.name = db.rows[0].attendant_name;
            const token = jwt.sign(signObj, process.env.JWTKEY);
            if (signObj.admin === true) {
              res.cookie('x-auth-token', token);
              res.redirect('/admin_control_page.html');
            }
            if (signObj.admin === false) {
              res.cookie('x-auth-token', token);
              res.redirect('/cart.html');
            }
          } else {
            res.status(404).json({
              message: 'User doesn"t exist! Enter valid email and password',
            });
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  } else {
    return res.status(422).json({
      message: 'Validation error! Please check your input',
      ErrorMessage: result.error,
    });
  }
};

export default loginImpl;
