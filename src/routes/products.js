import express from 'express';
import controller from '../controllers/productController';

const router = express.Router();
router.post('/', controller.createProduct);
router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.put('/:id', controller.modifyProduct);
router.delete('/:id', controller.deleteProduct);

export default router;
