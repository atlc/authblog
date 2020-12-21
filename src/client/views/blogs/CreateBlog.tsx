import React, { useEffect, useState } from 'react';
import { json, User } from '../../utils/api-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import AuthorSelector from '../../components/selectors/AuthorSelector';
import TagSelector from '../../components/selectors/TagSelector';
import { useHistory } from 'react-router-dom';


const CreateBlog = () => {
    const [blogTitle, updateBlogTitle] = useState('');
    const [blogText, updateBlogText] = useState('');
    const [blogAuthor, updateBlogAuthor] = useState(null);
    const [blogTags, updateBlogTags] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (!User || User.userid === null || !User.roles.includes('user')) {
            history.replace('/login');
        }
    }, [])

    // Quick and easy way of grabbing the values from `tags` that I need, and creating an array of arrays for bulk-insertion so my POST only runs one statement
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((tag: any) => [`${blogID}`, tag.value])

    const createBlog = async () => {
        // Inserts the info into the blog itself
        const body: {} = JSON.stringify({
            // userid: blogAuthor.value,
            userid: 1,
            title: blogTitle,
            content: blogText
        });

        const newBlog = await json('/api/blogs', 'POST', body)
        const blogID = await newBlog.insertId;
        const blogPostStatus = newBlog.status;
        console.log(newBlog, newBlog.status);

        // Inserts the info into the blogtags table
        const blogTags: {} = JSON.stringify({ blogtags_array: createBulkFriendlyBlogTagsSQL(blogID) });

        const newTags = await json('/api/blogtags', 'POST', blogTags)
        const blogTagsPostStatus = newTags.status;

        console.log(newTags, newTags.status)
        // If both the POST requests return a status of 200, return a successful toast
        // Otherwise pop up an error toast
        notify(blogPostStatus, blogTagsPostStatus);
    }

    const notify = (resStatus: number, resStatus2: number) => {
        const toastOptions = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };

        if (resStatus === 200 && resStatus2 === 200) {
            toast.success('😎 Blog post was created!', { ...toastOptions, progress: undefined });
        } else {
            toast.error('😞 Could not create blog, please check server logs for further details.', { ...toastOptions, progress: undefined });
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
                        <h5>Select your author:  </h5>
                    </div>
                    <div className="row">
                        <AuthorSelector onSelectChange={(authorFromChild: any) => updateBlogAuthor(authorFromChild)} />
                    </div>
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default CreateBlog;