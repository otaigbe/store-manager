import express from 'express';
import products from '../routes/products';
import sales from '../routes/sales';
import cart from '../routes/cart';

const router = express.Router();

router.use('/products', products);
router.use('/sales', sales);
router.use('/cart', cart);

export default router;
