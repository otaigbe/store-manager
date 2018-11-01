import express from 'express';
import controller from '../controllers/signupController';
import auth from '../middleware/authjson';

const router = express.Router();

router.post('/', controller.checkAuth);


export default router;
