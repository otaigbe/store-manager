import express from 'express';
import controller from '../controllers/cartController';

const router = express.Router();
router.post('/', controller.addToCart);
/* router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.modifyProduct);
router.delete('/:id', controller.deleteProduct); */

export default router;