import * as express from 'express';
import db from '../../../db';

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


// Allow guests (anyone currently not logged in) to see all blogs as a preview (to truncate each)
router.get('/', async (req, res) => {
    try {
        const blogs = await db.Blogs.get.all();
        console.log(blogs);
        res.status(200).send(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


router.get('/:id', hasAccess, async (req, res) => {
    try {
        const id_dto = Number(req.params?.id);
        const blogs = id_dto ? await db.Blogs.get.blog_by_id(id_dto) : await db.Blogs.get.all();
        res.status(200).send(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Allows authenticated users to see all blogs by a user at /api/blogs/user/:userid
router.get('/user/:userid', hasAccess, async (req, res) => {
    try { 
        const userid_dto = req.params?.userid;
        const userblogs = await db.Blogs.get.blogs_by_user(userid_dto);
        res.status(200).send(userblogs);
    } catch (e) {
        console.log(e); 
        res.status(500).send(e);
    }
})



export default router;