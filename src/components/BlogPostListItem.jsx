import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import TimeAgo from 'timeago-react'



const BlogPostListItem = (props) => {

    const { id, title, published = '' } = props.post

    return (
        <>
            <Link to={`/blog-post/${id}`}>{title}</Link>
            <p className="card-text border-top">
                <small className="text-muted">
                    <TimeAgo
                        datetime={published}
                        locale='ru'
                    />
                </small>
            </p>
        </>
    )
}

BlogPostListItem.propTypes = {
    children: PropTypes.node,
    id: PropTypes.number,
    published: PropTypes.string,
}

BlogPostListItem.defaultProps = {
    children: null,
    id: 0,
    published: '',
}

export default BlogPostListItem
