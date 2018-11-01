import express from 'express';
import signup from '../routes/signup';
import login from '../routes/login';

const router = express.Router();

router.use('/signup', signup);
router.use('/login', login);

export default router;
