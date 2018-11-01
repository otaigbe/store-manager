import express from 'express';

import controller from '../controllers/salesController';

const router = express.Router();

router.post('/', controller.createSalesRecord);
router.get('/', controller.getAllSalesRecord);
router.get('/:id', controller.getSalesRecordById);

export default router;
