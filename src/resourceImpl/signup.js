import Joi from 'joi';
import { queries, pool } from '../dbUtils/queries/queries';
import 'babel-polyfill';

const signupImpl = {};
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().required(),
  admin: Joi.boolean().required(),
});
signupImpl.signup = async (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    pool.connect(async (err, client) => {
      if (err) console.log(err.message);
      const temp2 = [req.body.email];
      const resultset = await client.query(queries.selectEmail, temp2);
      if (resultset.rowCount > 0) return res.status(409).json({ message: 'Email already exists, choose a unique email.' });
      if (resultset.rowCount === 0) {
        try {
          const temp = [req.body.name, req.body.email, req.body.password, req.body.admin];
          const dbresult = await client.query(queries.InsertSignup, temp);
          return res.status(201).json({ message: 'Attendant created! Proceed to login' });
        } catch (error) {
          res.status(501).json({
            message: 'Internal Server error! Couldn"t create an Attendant',
            ErrorMessage: error.message,
          });
        }
      }
    });
  }
};

export default signupImpl;
