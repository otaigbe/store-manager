import express from 'express';
import products from '../../resources/products';
import signup from '../../resources/signup';
import login from '../../resources/login';
import sales from '../../resources/sales';
import cart from '../../resources/cart';

const router = express.Router();

router.use('/products', products);
router.use('/auth/signup', signup);
router.use('/auth/login', login);
router.use('/sales', sales);
router.use('/cart', cart);

export default router;
