import * as express from 'express';
import apiRouter from './api';
import authRouter from './auth';
import stripeRouter from './stripe';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/stripe', stripeRouter);


export default router;