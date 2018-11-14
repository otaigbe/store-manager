/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import customFunc from '../utils/functions';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  let name;
  if (customFunc.typeOf(req.body) === 'array') {
    name = req.body[0].attendant_name;
  } else {
    name = req.body.attendant_name;
  }
  if (!token) {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  } else if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWTKEY);
      if (decoded.name === name) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ message: 'Forbidden! You need to have appropraite privileges' });
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
};

export default auth;
