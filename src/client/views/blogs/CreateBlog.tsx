import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import AuthorSelector from '../../components/selectors/AuthorSelector';
import TagSelector from '../../components/selectors/TagSelector';


const CreateBlog = () => {
    const [blogTitle, updateBlogTitle] = useState('');
    const [blogText, updateBlogText] = useState('');
    const [blogAuthor, updateBlogAuthor] = useState(null);
    const [blogTags, updateBlogTags] = useState(null);

    // onChange event in the textarea fires this, updating the state of blogText
    const handleBlogTextUpdate = (event: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(event.target.value);
    
    // onChange event in the input field fires this, updating the state of blogTitle
    const handleBlogTitleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => updateBlogTitle(event.target.value);
    
    // Whenever the AuthorSelector child component passes its state back up, triggers the update of blogAuthor
    const handleSelectedAuthorUpdate = (authorFromChild: any) => updateBlogAuthor(authorFromChild);
    
    // Whenever the TagSelector child component passes its state back up, this triggers the update of blogTags
    const handleSelectedTagsUpdate = (tagsFromChild: any) => updateBlogTags(tagsFromChild);

    // Quick and easy way of grabbing the values from `tags` that I need, and creating an array of arrays for bulk-insertion so my POST only runs one statement
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((tag: any) => [`${blogID}`, tag.value])

    const createBlog = async () => {
        // Inserts the info into the blog itself
        const blogsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authorid: blogAuthor.value,
                title: blogTitle,
                content: blogText
            })
        };
        const res = await fetch('/api/blogs', blogsOptions);
        const blogPost = await res.json()
        const blogID = await blogPost.insertId;
        const blogPostStatus = res.status;

        // Inserts the info into the blogtags table
        const blogTagsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogtags_array: createBulkFriendlyBlogTagsSQL(blogID)
            })
        };

        const bt = await fetch('/api/blogtags', blogTagsOptions);
        const blogTagsPostStatus = bt.status;

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
            toast.success('😎 Blog post was created!', {...toastOptions, progress: undefined});
        } else {
            toast.error('😞 Could not create blog, please check server logs for further details.', {...toastOptions, progress: undefined});
        }
    }

    return (
        <>
            <div className="card text-black bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">
                    <input type="text" placeholder="Title of your blog" onChange={handleBlogTitleUpdate}/>
                </div>
                <div className="card-body">
                    <textarea className="text-dark" value={blogText} rows={10} cols={80} onChange={handleBlogTextUpdate}></textarea>
                </div>
                <div className="card-footer bg-primary">
                    <div className="row">
                        <h5>Select your author:  </h5>
                    </div>
                    <div className="row">
                        <AuthorSelector onSelectChange={handleSelectedAuthorUpdate} />
                    </div>
                    <div className="row">
                        <h5>Tags: </h5>
                    </div>
                    <div className="row">
                        <TagSelector disabled={false} onSelectChange={handleSelectedTagsUpdate} />
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