import React, { useEffect, useState } from 'react';
import { IBlogs } from '../../utils/types';
import { api, User } from '../../utils/api-service';
import Swal from 'sweetalert2';
import TagSelector from '../selectors/TagSelector';
import { useHistory } from 'react-router-dom';

const EditableBlogCard = (props: IBlogs) => {
    const { title, content, id } = props;
    const [blogText, updateBlogText] = useState(content);
    const [blogTags, updateBlogTags] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (!User || User.userid === null || !User.roles.includes('admin')) {
            history.replace('/login');
        }
    }, [])


    const handleBlogtextUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => updateBlogText(e.target.value);
    const handleSelectedTagsUpdate = (tagsFromChild: any) => updateBlogTags(tagsFromChild); // Grabs the state from the child TagSelector component
    // EZ-PZ way of grabbing the tag values that I want, and creating an array of arrays for bulk-insertion in my SQL statement
    const createBulkFriendlyBlogTagsSQL = (blogID: string) => blogTags.map((t: any) => t.value).map((tagid: string) => [`${blogID}`, tagid]);

    const updateBlog = async () => {
        // If user logs out, localstorage is cleared but until they refresh, this component still retains their info in state and will POST
        // Quick way to give them the boot again?
        if (!User || User.userid === null || !User.roles.includes('admin')) {
            notify(401, "You are", "authorized");
            setTimeout(() => { history.replace('/login') }, 2000);
        }

        const body: {} = { id, content: blogText };

        const updatedBlogRes = await api('/api/blogs', 'PUT', body);
        notify(updatedBlogRes.status, "Blog content was", "updated");

        // Running what should be a PUT as a POST - Instead of having to run multiple PUT queries when multiple tags are selected,
        // when a POST is received at this endpoint it will delete all the BlogTags at that blogid, then run a POST where all the
        // values are bulk-inserted in a single query.
        const tags_array: {} = { blogtags_array: createBulkFriendlyBlogTagsSQL(id) };

        const blogTagsRes = await api(`/api/blogtags/update/${id}`, 'POST', tags_array);
        notify(blogTagsRes.status, "Blog Tags were", "updated");

        setTimeout(() => { history.replace('/blogs') }, 3000);
    }

    const deleteBlog = () => {
        // If user logs out, localstorage is cleared but until they refresh, this component still retains their info in state and will POST
        // Quick way to give them the boot again?
        if (!User || User.userid === null || !User.roles.includes('admin')) {
            notify(401, "You are", "authorized");
            setTimeout(() => { history.replace('/login') }, 2000);
        }
        
        // Synchronous-async code to deal with synchronous database deletions. Ugh 
        api(`/api/blogtags/${id}`, 'DELETE')
            .then(btres => {
                if (!btres.ok) notify(btres.status, "Blog was", "deleted");
            })
            .then(() => api(`/api/blogs/${id}`, 'DELETE')
                .then(delBlogRes => notify(delBlogRes.status, "Blog was", "deleted"))
                .then(() => setTimeout(() => {
                    history.replace('/blogs')
                }, 3000))
            )

    }

    const notify = (stat: number, item: string, requestVerb: string) => {
        if (stat === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `😎 ${item} ${requestVerb}!`
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error.',
                text: `😞 ${item} not ${requestVerb}, please check server logs for further details.`
            });
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
        </>
    );
}


export default EditableBlogCard;