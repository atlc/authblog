import { Query } from '../index'

const all = async () => Query('SELECT * FROM Blogs');
const blog_by_id = async (id: number) => Query('SELECT * FROM Blogs WHERE id = ?', [id]);
const blogs_by_user = async (userid: string) => Query('SELECT * FROM Blogs WHERE userid = ?', [userid]);
const with_my_author = async (id: string) => Query('Call spBlogAuthors(?)', [id]);
const with_authors = async () => Query('Call spBlogAuthors(null)');
const create_new = async (title: string, content: string, userid: string) => Query('INSERT into Blogs SET ?', { title, content, userid });
const destroy = async (id: string) => Query('DELETE from Blogs where id = ?', [id]);
const update = async (id: string, content: string) => Query('UPDATE Blogs SET ? where ?', [{content}, {id}]);

export default {
    get: {
        all,
        blog_by_id,
        blogs_by_user,
        with_my_author,
        with_authors
    }, 
    do: {
        create_new,
        destroy,
        update
    }
}