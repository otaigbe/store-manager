import express from 'express';
import productImpl from '../resourceImpl/product';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/?', productImpl.getAllProducts);

router.get('/:id', productImpl.getProductById);

router.post('/', auth, productImpl.addProduct);

router.put('/:id', auth, productImpl.modifyAProduct);

router.delete('/:id', auth, productImpl.deleteProduct);

export default router;
