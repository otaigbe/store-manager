import express from 'express';
import controller from '../controllers/loginController';

const router = express.Router();

router.post('/', controller.auth);


export default router;
