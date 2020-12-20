import React, { useEffect, useState } from 'react';
import { IBlogs } from '../../utils/types';
import BlogCard from '../../components/blogcards/BlogCard';
import { v4 as uuidv4 } from 'uuid';

const AllBlogs = () => {
    const [blogs, updateBlogs] = useState<IBlogs[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/blogs/');
                let blogs = await res.json();
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