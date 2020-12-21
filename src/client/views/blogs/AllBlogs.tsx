import React, { useEffect, useState } from 'react';
import { IBlogs } from '../../utils/types';
import { json } from '../../utils/api-service';
import BlogCard from '../../components/blogcards/BlogCard';
import { v4 as uuidv4 } from 'uuid';

const AllBlogs = () => {
    const [blogs, updateBlogs] = useState<IBlogs[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const blogs = await json('/api/blogs');
                updateBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <div className="row">
            {blogs?.map(blog => <BlogCard key={uuidv4()} {...blog} />)}
        </div>
    );
};

export default AllBlogs;