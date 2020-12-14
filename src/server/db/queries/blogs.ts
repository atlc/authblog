import { Query } from '../index'

const all = async () => Query('SELECT * FROM Blogs');
const blog_by_id = async (id: number) => Query('SELECT * FROM Blogs WHERE id = ?', [id]);
const blogs_by_user = async (userid: string) => Query('SELECT * FROM Blogs WHERE userid = ?', [userid]);


export default {
    get: {
        all,
        blog_by_id,
        blogs_by_user
    }
}