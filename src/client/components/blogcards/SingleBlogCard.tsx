import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IBlogs, IBlogTags } from '../../utils/types';
import { api, User } from '../../utils/api-service';
import { Link } from 'react-router-dom';
import TagSelector from '../selectors/TagSelector';

const SingleBlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id, AuthorName, AuthorEmail } = props;
    const [blogtags, updateMyTags] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await api(`/api/blogtags/${id}`);
                let tags = await res.json();
                // Parsing out just the data I want without the SQL responses since this calls a stored procedure
                tags = tags[0].map((tag: IBlogTags) => tag.name);
                updateMyTags(tags);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);


    if (!blogtags) {
        return (
            <div className="card text-white bg-light m-3 shadow-lg">
                <div className="card-header text-dark bg-warning">Loading blog post...</div>
            </div>
        );
    }

    return (
        <div className="card text-white bg-light m-3 shadow-lg">
            <div className="card-header text-center text-dark bg-warning">{title}</div>
            <div className="card-body">
                <p className="text-dark"><em>{content}</em></p>
            </div>
            <div className="card-footer bg-primary">
                {/* Tags to be readonly when it's not being edited, and not render if no tags are on the blog */}
                {blogtags.length ? <TagSelector disabled={true} id={id} /> : <></>}
                <div className="row ml-2">Written by {AuthorName}.</div>
                <div className="row ml-2"><em>Contact:  {AuthorEmail}</em></div>
                <div className="row ml-2">Last updated {moment(updated_at).startOf('minute').fromNow()}</div>
                {(User && User.userid !== null && User.roles.includes('admin')) ?
                    <div className="row ml-2">
                        <Link to={`/blogs/${id}/edit`} className="btn btn-secondary">Edit Me</Link>
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
}


export default SingleBlogCard;