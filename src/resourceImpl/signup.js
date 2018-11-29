import Joi from 'joi';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import schemas from '../utils/validationSchemas';
import errorHandler from '../utils/errorHandler';
import asyncMiddleware from '../middleware/async';


const signupImpl = {};

signupImpl.signup = asyncMiddleware(async (req, res) => {
  const result = Joi.validate(req.body, schemas.signupSchema);
  if (result.error === null) {
    const temp2 = [req.body.email];
    const resultset = await pool.query(queries.selectEmail, temp2);
    if (resultset.rowCount > 0) return res.status(409).json({ message: 'Email already exists, choose a unique email.' });
    /* istanbul ignore next */
    if (resultset.rowCount === 0) {
      const temp = [req.body.name, req.body.lastname, req.body.phoneNumber, req.body.email, req.body.password, req.body.admin];
      const dbresult = await pool.query(queries.InsertSignup, temp);
      return res.status(201).json({ message: 'Attendant created! Proceed to login' });
    }
  } else {
    errorHandler.validationError(res, result);
  }
});

export default signupImpl;
