import React, { useEffect, useState } from 'react';
import { api, User } from '../../utils/api-service';
import TagSelector from '../../components/selectors/TagSelector';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


const CreateBlog = () => {
    const [blogTitle, updateBlogTitle] = useState('');
    const [blogText, updateBlogText] = useState('');
    const [blogAuthor, updateBlogAuthor] = useState(null);
    const [blogTags, updateBlogTags] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (!User || User.userid === null || !User.roles.includes('user')) {
            history.replace('/login');
        } else {
            updateBlogAuthor(User.userid)
        }
    }, [])

    // Quick and easy way of grabbing the values from `tags` that I need, and creating an array of arrays for bulk-insertion so my POST only runs one statement
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((tag: any) => [`${blogID}`, tag.value])

    const createBlog = async () => {
        // If user logs out, localstorage is cleared but until they refresh, this component still retains their info in state and will POST
        // Quick way to give them the boot again?
        if (!User || User.userid === null || !User.roles.includes('user')) {
            notify(401, 401);
            setTimeout(() => {history.replace('/login')}, 2000);
        }
        // Inserts the info into the blog itself
        const body: {} = {
            userid: blogAuthor,
            title: blogTitle,
            content: blogText
        };

        const newBlog = await api('/api/blogs', 'POST', body);
        const res = await newBlog.json();
        const blogID = await res.blog.insertId;
        const blogPostStatus = newBlog.status;

        // Inserts the info into the blogtags table
        const tags: {} = { blogtags_array: createBulkFriendlyBlogTagsSQL(blogID) };
        const newTags = await api('/api/blogtags', 'POST', tags)
        const blogTagsPostStatus = newTags.status;

        // If both the POST requests return a status of 201, return a successful Swal
        // Otherwise pop up an error Swal
        notify(blogPostStatus, blogTagsPostStatus);
    }

    const notify = (resStatus: number, resStatus2: number) => {
        if (resStatus === 201 && resStatus2 === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `😎 Blog post was created!!`,
                timer: 2000,
                onClose: () => history.replace('/blogs')
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: '😞 Could not create blog, please validate all fields or check server logs for further details.'
            });
        }
    }

    return (
        <>
            <div className="card text-black bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">
                    <input type="text" placeholder="Title of your blog" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBlogTitle(e.target.value)} />
                </div>
                <div className="card-body">
                    <textarea className="text-dark" value={blogText} rows={10} cols={80} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(e.target.value)}></textarea>
                </div>
                <div className="card-footer bg-primary">
                    <div className="row">
                        <h5>Tags: </h5>
                    </div>
                    <div className="row">
                        <TagSelector disabled={false} onSelectChange={(tagsFromChild: any) => updateBlogTags(tagsFromChild)} />
                    </div>
                    <div className="row">
                        <button className="btn btn-secondary m-2 shadow text-white" onClick={createBlog}>Create it!</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateBlog;