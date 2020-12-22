import React from 'react';
import moment from 'moment';
import { IBlogs } from '../../utils/types';
import { Link } from 'react-router-dom';

const BlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id, AuthorName } = props;

    return (
        <div className="card text-white bg-light m-3 shadow-lg" style={{ maxWidth: "18rem" }}>
            <div className="card-header text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark">{content}{content.length === 150 ? <strong> ...(See more)</strong> : <></>}</p>
            </div>
            <div className="card-footer bg-primary">
                <p>By {AuthorName}.</p>
                <p>Last updated {moment(updated_at).startOf('minute').fromNow()}</p>
                <Link to={`/blogs/${id}`} className="btn btn-secondary">See more</Link>
            </div>
        </div>
    );
}

export default BlogCard;