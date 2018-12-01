import express from 'express';
import cartImpl from '../resourceImpl/cart';
import auth from '../middleware/cartAuth';

const router = express.Router();

router.get('/', auth, cartImpl.getAllProducts);

export default router;
