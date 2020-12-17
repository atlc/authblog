import * as express from 'express';
import db from '../../../db';

const router = express.Router();

const isSuperAdmin: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('superadmin')) {
        res.status(401).send('Unauthorized. You must be a superadmin to access this resource.');
    } else {
        return next();
    }
}

router.get('/:id?', isSuperAdmin, async (req, res) => {
    const id = req.params.id;
    const users = (id) ?  await db.Users.get.user_by_id(Number(id)) : await db.Users.get.all();
    res.status(200).json(users);
});


export default router;