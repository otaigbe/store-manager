import express from 'express';
import controller from '../controllers/signup';

const router = express.Router();

router.post('/', controller.checkAuth);


export default router;
