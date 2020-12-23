import db from '../../../db';
import * as express from 'express';
const router = express.Router();

const isUser: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('user')) {
        res.status(401).send('Unauthorized. You must be logged in to access this resource.');
    } else {
        return next();
    }
}

router.get('/', isUser, async (req, res, next) => {
    try {
        let tags = await db.Tags.get.all();
        res.status(200).json(tags);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

export default router;