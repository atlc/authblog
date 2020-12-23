import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { api, User } from '../../utils/api-service';
import SingleBlogCard from '../../components/blogcards/SingleBlogCard';
import { v4 as uuidv4 } from 'uuid';

const SingleBlog = () => {
    const { id } = useParams<SingleBlogProps>();
    const history = useHistory();
    const [blog, updateBlog] = useState();

    useEffect(() => {
        if (!User || User.userid === null || !User.roles.includes('user')) {
            history.replace('/login');
        }
        (async () => {
            try {
                const blog = await api(`/api/blogs/${id}`);
                const blogRes = await blog.json();
                updateBlog(blogRes);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="row">
            {blog ? <SingleBlogCard key={uuidv4()} {...blog} /> : <h2>Loading SingleBlog...</h2>}
        </div>
    );
};

interface SingleBlogProps {
    id: string;
};


export default SingleBlog;