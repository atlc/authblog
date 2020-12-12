import * as express from 'express';
import apiRouter from './api';
import authRouter from './auth';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/auth', authRouter);

router.get('*', (req, res, next) => {
    res.status(404).json('That is not a valid API endpoint');
});


export default router;