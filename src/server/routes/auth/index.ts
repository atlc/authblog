import * as express from 'express';
import loginRouter from './login';
import logoutRouter from './logout';
import registerRouter from './register';


const router = express.Router();

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/register', registerRouter);

export default router;