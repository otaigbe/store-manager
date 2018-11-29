import jwt from 'jsonwebtoken';
import Joi from 'joi';
import queries from '../dbUtils/queries/queries';
import pool from '../dbUtils/dbConnection';
import errorHandler from '../utils/errorHandler';
import schemas from '../utils/validationSchemas';
import usefulFunctions from './ImplFunctions';
import asyncMiddleware from '../middleware/async';

const loginImpl = {};
loginImpl.login = asyncMiddleware(async (req, res) => {
  const result = Joi.validate(req.body, schemas.loginSchema);
  if (result.error === null) {
    const temp = [req.body.email, req.body.password];
    const queryResult = await pool.query(queries.selectLoginQuery, temp);
    if (queryResult.rowCount > 0) {
      const signObj = {};
      signObj.email = queryResult.rows[0].attendant_email;
      signObj.admin = queryResult.rows[0].attendant_admin;
      signObj.attendant_id = queryResult.rows[0].attendant_id;
      signObj.name = queryResult.rows[0].attendant_name;
      const token = jwt.sign(signObj, process.env.JWTKEY);
      if (signObj.admin === true) {
        usefulFunctions.setCookieAndRedirect(res, token, '/admin_control_page.html');
      } else { 
        usefulFunctions.setCookieAndRedirect(res, token, '/cart.html');
      }
    } else {
      errorHandler.notFoundError(res);
    }
  } else {
    errorHandler.validationError(res, result);
  }
});

export default loginImpl;
