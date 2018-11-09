import express from 'express';
import version1 from '../../routes/version1/router';

const router = express.Router();

router.use('/api/v1', version1);

export default router;
