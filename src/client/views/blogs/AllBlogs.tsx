import React, { useEffect, useState } from 'react';
import { IBlogs } from '../../utils/types';
import { api } from '../../utils/api-service';
import BlogCard from '../../components/blogcards/BlogCard';
import { v4 as uuidv4 } from 'uuid';

const AllBlogs = () => {
    const [blogs, updateBlogs] = useState<IBlogs[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const blogs = await api('/api/blogs');
                const blogRes = await blogs.json();
                // console.log(blogRes);
                updateBlogs(blogRes);
            } catch (e) {
                console.log(e);
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