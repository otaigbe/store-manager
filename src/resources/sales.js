import express from 'express';
import auth from '../middleware/sales-auth';
import adminAuth from '../middleware/auth';
import salesImpl from '../resourceImpl/sales';

const router = express.Router();

router.post('/', auth, salesImpl.createSalesRecord);
router.get('/', adminAuth, salesImpl.getAllSalesRecords);
router.get('/:id', adminAuth, salesImpl.getSalesRecordById);


export default router;
