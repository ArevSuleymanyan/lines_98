import { Router } from 'express';
import apiRoute from './api/api.js';

const router = Router();

router.use('/api', apiRoute);

export default router;
