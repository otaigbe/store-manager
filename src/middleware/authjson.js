import jwt from 'jsonwebtoken';

const auth = {};
auth.authenticate = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, 'secret');
    if (decoded.admin === true) {
      next();
    } else {
      return res.status(401).json({
        message: 'Authenticatication failed',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Authenticatication failed',
    });
  }
};
export default auth;
