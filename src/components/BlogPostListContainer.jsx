import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    blogPostAdd,
    blogPostListFetch,
    blogPostListSetPage
} from '../actions'

import BlogPostList from './BlogPostList'
import Paginator from './Paginator'

class BlogPostListContainer extends Component {
    static propTypes = {
        posts: PropTypes.array,
        blogPostListAdd: PropTypes.func,
        blogPostListFetch: PropTypes.func,
        blogPostListSetPage: PropTypes.func,
    }
    static defaultProps = {
        posts: [],
        blogPostListAdd: () => { },
        blogPostListFetch: () => { },
        blogPostListSetPage: () => { },
    }

    componentDidMount() {
        this.props.blogPostListFetch()
    }

    componentDidUpdate(prevProps) {
        const { currentPage, blogPostListFetch } = this.props
        console.log(prevProps.currentPage !== currentPage)
        if (prevProps.currentPage !== currentPage) {
            blogPostListFetch(currentPage)
        }
    }

    render() {
        const { posts, isFetching, blogPostListSetPage, currentPage } = this.props
        return (
            <Fragment>
                <div className="mb-3 mt-3">
                    <div className="card-body">
                        <BlogPostList
                            posts={posts}
                            isFetching={isFetching}
                        />
                    </div>
                    <Paginator pageCount={10} currentPage={currentPage} setPage={blogPostListSetPage} />
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
    blogPostListFetch,
    blogPostListSetPage
}

export default connect(mapStateToProps, dispatchToProps)(BlogPostListContainer)
