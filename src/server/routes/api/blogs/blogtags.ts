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

const isAdmin: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('admin')) {
        res.status(401).send('Unauthorized. You must be an administrator to access this resource.');
    } else {
        return next();
    }
}

router.get('/:id?', isUser, async (req, res, next) => {
    try {
        const id = req.params?.id;
        const blogtags = (!!id) ? await db.BlogTags.get.from_blog(id) : await db.BlogTags.get.all();
        res.status(200).send(blogtags);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.post('/', isUser, async (req, res, next) => {
    try {
        const blogtags_array = req.body.blogtags_array;
        const blogtags = await db.BlogTags.do.create_new(blogtags_array);
        res.status(201).send(blogtags);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});


// Creating what should be a PUT as a POST so I can do all updates in a single insertion (after deleting first)
router.post('/update/:id?', isUser, async (req, res, next) => {
    try {
        const id = req.params?.id;
        const del_blogtags_at = await db.BlogTags.do.destroy(id);
        const blogtags_array = req.body.blogtags_array;
        if (await del_blogtags_at) {
            const blogtags = await db.BlogTags.do.create_new(blogtags_array);
            res.status(200).send(blogtags);
        } else {
            res.status(500).send(`A server error has occurred. Please check the server logs for more info.`);
        }
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        const del_blogtags_at = await db.BlogTags.do.destroy(id);
        res.status(200).send(del_blogtags_at);
    } catch (e) {
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});


export default router;