import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IBlogs, IBlogTags } from '../../utils/types';
import { api, User } from '../../utils/api-service';
import { Link } from 'react-router-dom';
import TagSelector from '../selectors/TagSelector';

const SingleBlogCard = (props: IBlogs) => {
    const { title, content, updated_at, id, AuthorName, AuthorEmail } = props;
    // console.log(props);
    const [blogtags, updateMyTags] = useState([]);

    // TagSelector component requires a change handler prop, but since these are read-only
    //  until they're on the edit route, then I don't need to bother with updating state
    const handleSelectedTagsUpdate: any = (tagsFromChild: any) => '';

    useEffect(() => {
        (async () => {
            try {
                const res = await api(`/api/blogtags/${id}`);
                console.log(res)
                let tags = res.json();
                // Returning just the data I want without the SQL response since this calls a stored procedure
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
                {/* Since I want this card to be readonly when it's not being edited, the event handler does nothing in this component*/}
                <TagSelector disabled={true} id={id} onSelectChange={handleSelectedTagsUpdate} />
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




