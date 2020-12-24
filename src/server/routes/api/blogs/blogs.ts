import * as express from 'express';
import db from '../../../db';

const router = express.Router();


// Checks to see if the user has the 'user' permission at a bare minimum; 
// If not, they just have 'guest' permissions and may only view a preview of the all blogs
const isUser: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('user')) {
        res.status(401).send('Unauthorized. You must be logged in to access this resource.');
    } else {
        return next();
    }
}

// Checks to see if the user has the 'admin' permission at a bare minimum
const isAdmin: express.RequestHandler = (req: any, res, next) => {
    if (!req.user || !req.user.roles.includes('admin')) {
        res.status(401).send('Unauthorized. You must be an administrator to access this resource.');
    } else {
        return next();
    }
}


// Allow guests (anyone currently not logged in) to see all blogs as a preview
router.get('/', async (req, res) => {
    try {
        let blogs = await db.Blogs.get.with_authors();
        blogs = blogs[0]; // Parsing out stored procedure response
        // Sending blog objects to the frontend with the previews already spliced
        const previews = Object.keys(blogs).map(blog => {
            const { id, title, content,  AuthorName, AuthorEmail, userid, created_at, updated_at} = blogs[blog];
            return { id, title, content: content.slice(0, 150), AuthorName, AuthorEmail, userid, created_at, updated_at };
        });
        res.status(200).send(previews);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


router.get('/:id', isUser, async (req, res) => {
    try {
        const id_dto = req.params.id;
        const blog = await db.Blogs.get.with_my_author(id_dto);
        res.status(200).send(blog[0][0]); // Parsing out just the blog from the stored procedure response
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

// Allows authenticated admins to see all blogs by a user at /api/blogs/user/:userid
router.get('/user/:userid', isAdmin, async (req, res) => {
    try { 
        const userid_dto = req.params.userid;
        const userblogs = await db.Blogs.get.blogs_by_user(userid_dto);
        res.status(200).send(userblogs);
    } catch (e) {
        console.log(e); 
        res.status(500).send(e);
    }
});

router.get('/:id?/edit', isAdmin, async (req, res, next) => {
    try {
        const dto = req;
        const id = dto.params.id;
        const blog_with_author = await db.Blogs.get.with_my_author(id);
        res.status(200).json(blog_with_author);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.post('/', isUser, async (req, res, next) => {
    try {
        const blog = req.body;
        const { userid, title, content } = blog;
        const newBlog = await db.Blogs.do.create_new(title, content, userid);
        res.status(201).json({'blog': newBlog})
    } catch (e) {
        console.log(e);
    }
});

router.put('/', isAdmin, async (req, res, next) => {
    try {
        const blog = req.body;
        const { id, content } = blog;
        const blogUpdate = await db.Blogs.do.update(id, content);
        res.status(200).json(blogUpdate);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBlog = await db.Blogs.do.destroy(id);
        res.status(200).json(deletedBlog);
    } catch (e) {
        console.log(e);
        res.status(500).send(`A server error has occurred. Please check the server logs for more info. ${e}`);
    }
});



export default router;