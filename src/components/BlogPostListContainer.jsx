import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogPostAdd, blogPostListFetch } from '../actions'

import BlogPostList from './BlogPostList'

class BlogPostListContainer extends Component {
    static propTypes = {
        posts: PropTypes.array,
        blogPostListAdd: PropTypes.func,
        blogPostListFetch: PropTypes.func
    }
    static defaultProps = {
        posts: [],
        blogPostListAdd: () => { },
        blogPostListFetch: () => { }
    }

    componentDidMount() {
        this.props.blogPostListFetch()
    }

    render() {
        const { posts, isFetching } = this.props
        return (
            <Fragment>
                <div className="card mb-3 mt-3 shadow-sm">
                    <div className="card-body">
                        <BlogPostList
                            posts={posts}
                            isFetching={isFetching}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ blogPostList }) => ({
    ...blogPostList
})

const dispatchToProps = {
    blogPostAdd,
    blogPostListFetch
}

export default connect(mapStateToProps, dispatchToProps)(BlogPostListContainer)
