import express from 'express';
import adminAuth from '../middleware/auth';
import salesImpl from '../resourceImpl/sales';

const router = express.Router();

router.post('/', salesImpl.createSalesRecord);
router.get('/', salesImpl.getAllSalesRecords);
router.get('/:id', adminAuth, salesImpl.getSalesRecordById);


export default router;
