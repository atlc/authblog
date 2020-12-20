import React, { useState } from 'react';
import { IBlogs } from '../../utils/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import TagSelector from '../selectors/TagSelector';

const EditableBlogCard = (props: IBlogs) => {
    const { title, content, id } = props;
    const [blogText, updateBlogText] = useState(content);
    const [blogTags, updateBlogTags] = useState(null);

    const handleBlogtextUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(e.target.value);
    const handleSelectedTagsUpdate = (tagsFromChild: any) => updateBlogTags(tagsFromChild); // Grabs the state from the child TagSelector component
    // EZ-PZ way of grabbing the tag values that I want, and creating an array of arrays for bulk-insertion in my SQL statement
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((t: any) => t.value).map((tagid: string) => [`${blogID}`, tagid]);

    const updateBlog = async () => {
        const blogsOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                content: blogText
            })
        };

        fetch('/api/blogs', blogsOptions)
            .then(res => res.status)
            .then(put_results => {
                notify(put_results, "Blog was", "updated");
            })


        // Running what should be a PUT as a POST - Instead of having to run multiple PUT queries when multiple tags are selected,
        // when a POST is received at this endpoint it will delete all the BlogTags at that blogid, then run a POST where all the
        // values are bulk-inserted in a single query.
        const blogTagsOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogtags_array: createBulkFriendlyBlogTagsSQL(id)
            })
        };
        const bt = await fetch(`/api/blogtags/update/${id}`, blogTagsOptions);
        const btjson = await bt.json();
        // console.log(btjson);
    }

    const deleteBlog = () => {
        const reqOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        // Synchronous-async code to deal with synchronous database deletions. Ugh 
        fetch(`/api/blogtags/${id}`, reqOptions)
            .then(() => {
                fetch(`/api/blogs/${id}`, reqOptions)
                    .then(blogRes => {
                        notify(blogRes.status, "Blog was", "deleted");
                    })
            })
    }

    const notify = (stat: number, item: string, requestVerb: string) => {
        const toastOptions = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };

        if (stat === 200) {
            toast.success(`😎 ${item} ${requestVerb}!`, { ...toastOptions, progress: undefined });
        } else {
            toast.error(`😞 ${item} not ${requestVerb}, please check server logs for further details.`, { ...toastOptions, progress: undefined });
        }
    }

    if (!id) {
        return (
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">Loading SingleCard...</div>
            </div>
        );
    }

    return (
        <>
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">{title}</div>
                <div className="card-body">
                    <textarea className="text-dark" value={blogText} rows={10} cols={80} onChange={handleBlogtextUpdate}></textarea>
                </div>
                <div className="card-footer bg-primary" >
                    <div className="row text-dark">
                        <TagSelector disabled={false} id={id} onSelectChange={handleSelectedTagsUpdate} />
                    </div>
                    <button className="btn btn-secondary m-2 shadow" onClick={updateBlog}>Save Changes!</button>
                    <button className="btn btn-warning m-2 shadow" onClick={deleteBlog}>Delete Blog?</button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
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


export default EditableBlogCard;