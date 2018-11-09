/* eslint-disable prefer-destructuring */
import express from 'express';
import signupImpl from '../resourceImpl/signup';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', auth, signupImpl.signup);

export default router;
