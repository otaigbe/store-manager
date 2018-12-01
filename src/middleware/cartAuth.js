/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No access token provided! Unaccessible resource' });
  } 
  if (token) {
    /* istanbul ignore next */
    try {
      const decoded = jwt.verify(token, process.env.JWTKEY);
      if (decoded.admin === false || decoded.admin === 'false') {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ message: 'Forbidden! You need to have  admin privileges' });
      }
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
};

export default auth;
