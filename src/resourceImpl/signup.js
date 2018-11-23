import Joi from 'joi';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import 'babel-polyfill';

const signupImpl = {};
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  admin: Joi.boolean().required(),
});
signupImpl.signup = async (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    pool.connect(async (err, client) => {
      /* istanbul ignore next */
      if (err) console.log(err.message);
      const temp2 = [req.body.email];
      const resultset = await client.query(queries.selectEmail, temp2);
      if (resultset.rowCount > 0) return res.status(409).json({ message: 'Email already exists, choose a unique email.' });
      /* istanbul ignore next */
      if (resultset.rowCount === 0) {
        const temp = [req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password, req.body.admin];
        try {
          const dbresult = await client.query(queries.InsertSignup, temp);
          return res.status(201).json({ message: 'Attendant created! Proceed to login' });
        } catch (error) {
          /* istanbul ignore next */
          res.status(501).json({
            message: 'Internal Server error! Couldn"t create an Attendant',
            ErrorMessage: error.message,
          });
        }
      }
    });
  } else {
    return res.status(422).json({
      message: 'Something wrong with input!',
      Error: result.error,
    });
  }
};

export default signupImpl;
