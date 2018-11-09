import express from 'express';
import loginImpl from '../resourceImpl/login';

const router = express.Router();

router.post('/', loginImpl.login);

export default router;
