import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBlogs } from '../../utils/types';
import EditableBlogCard from '../../components/blogcards/EditableBlogCard';
import { v4 as uuidv4 } from 'uuid';

const EditableBlog = (props: EditableBlogProps) => {
    const { id } = useParams<EditableBlogProps>();
    const [blog, updateBlog] = useState<IBlogs>();

    useEffect(() => {
        (async () => {
            try {
                // This endpoint fetches blog + author info in stored procedure
                const res = await fetch(`/api/blogs/${id}/edit`);
                let blogs = await res.json();
                updateBlog(blogs[0][0]);
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