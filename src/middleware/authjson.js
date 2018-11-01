import jwt from 'jsonwebtoken';

const auth = {};
auth.authenticate = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, 'privateKey');
    req.body.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authenticatication failed',
    });
  }
};
export default auth;
