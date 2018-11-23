import express from 'express';
import cartImpl from '../resourceImpl/cart';

const router = express.Router();

router.get('/', cartImpl.getAllProducts);

export default router;
