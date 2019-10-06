import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'
import BlogPostListItem from './BlogPostListItem'
import Warning from './Warning'

class BlogPostList extends Component {
    static propTypes = {
        posts: PropTypes.array,
        isFetching: PropTypes.bool,
    }
    static defaultProps = {
        posts: [],
        isFetching: true,

    }

    render() {
        const { posts, isFetching } = this.props

        return (
            <Fragment>
                {(isFetching && 0 === posts.length) && <Loader />}
                {(0 === posts.length && !isFetching) && <Warning text='blogposts' />}
                {(0 < posts.length) && posts.map(post => <BlogPostListItem key={post.id} post={post} />)}
            </Fragment>
        )
    }
}

export default BlogPostList
