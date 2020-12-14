import * as express from 'express';
import DB from '../../db';

const router = express.Router();


// Checks to see if the user has the 'user' permission at a bare minimum; 
// If not, they just have 'guest' permissions and may only view a preview of the all blogs
const hasAccess: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('user')) {
        res.status(401).send('Unauthorized. You must be logged in to access this resource.');
    } else {
        return next();
    }
}


router.get('/', async (req, res) => {
    try {
        const blogs = await DB.Blogs.get.all();
        res.status(200).send(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


router.get('/:id', hasAccess, async (req, res) => {
    try {
        const id_dto = Number(req.params?.id);
        const blogs = id_dto ? await DB.Blogs.get.blog_by_id(id_dto) : await DB.Blogs.get.all();
        res.status(200).send(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/user/:userid', hasAccess, async (req, res) => {
    try { 
        const userid_dto = req.params?.userid;
        const userblogs = await DB.Blogs.get.blogs_by_user(userid_dto);
        res.status(200).send(userblogs);
    } catch (e) {
        console.log(e); 
        res.status(500).send(e);
    }
})



export default router;