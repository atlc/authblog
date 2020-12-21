import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IBlogs } from '../../utils/types';
import { json, User } from '../../utils/api-service';
import EditableBlogCard from '../../components/blogcards/EditableBlogCard';
import { v4 as uuidv4 } from 'uuid';

const EditableBlog = (props: EditableBlogProps) => {
    const { id } = useParams<EditableBlogProps>();
    const history = useHistory();

    const [blog, updateBlog] = useState<IBlogs>();

    useEffect(() => {
        if (!User || User.userid === null || !User.roles.includes('admin')) {
            history.replace('/login');
        }
        (async () => {
            try {
                // This endpoint fetches blog + author info in stored procedure
                const blog = await json(`/api/blogs/${id}/edit`);
                updateBlog(blog[0][0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="row">
            {blog ? <EditableBlogCard key={uuidv4()} {...blog} /> : <h2>Loading EditableBlog...</h2>}
        </div>
    );
};

interface EditableBlogProps {
    id?: string;
};


export default EditableBlog;