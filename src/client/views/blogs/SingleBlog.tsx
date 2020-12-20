import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleBlogCard from '../../components/blogcards/SingleBlogCard';
import { v4 as uuidv4 } from 'uuid';
import { createImportSpecifier } from 'typescript';

const SingleBlog = () => {
    const { id } = useParams<SingleBlogProps>();
    const [blog, updateBlog] = useState();
    const [unauthorized, updateUnauthorized] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                // This endpoint fetches blog + author info in stored procedure
                const res = await fetch(`/api/blogs/${id}`);
                if (res.status === 401) {
                    updateUnauthorized(true)
                } else {
                    let blogs = await res.json();
                    console.log(blogs)
                }
                // updateBlog(blogs[0][0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    if (unauthorized) return <h1>You must be logged in to access this resource.</h1>

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