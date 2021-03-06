import * as express from 'express';
import * as passport from 'passport';
import blogsRouter from './blogs/blogs';
import blogtagRouter from './blogs/blogtags';
import tagsRouter from './blogs/tags';
import usersRouter from './users/users';
import mailRouter from './mail';

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if (user) req.user = user;
        return next();
    })(req, res, next);
});


router.use('/blogs', blogsRouter);
router.use('/blogtags', blogtagRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/mail', mailRouter);

router.get('*', (req, res, next) => {
    res.status(404).json('That is not a valid API endpoint');
});



export default router;