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
        pageCount: PropTypes.number,
    }
    static defaultProps = {
        posts: [],
        blogPostListAdd: () => { },
        blogPostListFetch: () => { },
        blogPostListSetPage: () => { },
        pageCount: 1,
    }

    componentDidMount() {
        this.props.blogPostListFetch(this.getQueryParamPage())
    }

    componentDidUpdate(prevProps) {
        const { currentPage, blogPostListFetch, blogPostListSetPage } = this.props

        if (this.props.match.params.page !== this.getQueryParamPage()) {
            blogPostListSetPage(this.getQueryParamPage())
        }
        if (prevProps.currentPage !== currentPage) {
            blogPostListFetch(currentPage)
        }
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1
    }

    changePage = (page) => {
        const { history, blogPostListSetPage } = this.props
        blogPostListSetPage(page)
        history.push(`/${page}`)
    }

    onPrevPageClick = (e) => {
        const { currentPage } = this.props
        let newPage = Math.max(currentPage - 1, 1)
        this.changePage(newPage)
    }

    onNextPageClick = (e) => {
        const { currentPage, pageCount } = this.props
        let newPage = Math.min(currentPage + 1, pageCount)
        this.changePage(newPage)
    }

    render() {
        const { posts, isFetching, currentPage, pageCount } = this.props
        return (
            <Fragment>
                {console.log(pageCount)}
                <div className="mb-3 mt-3">
                    <div className="card-body">
                        <BlogPostList
                            posts={posts}
                            isFetching={isFetching}
                        />
                    </div>
                    <Paginator
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setPage={this.changePage}
                        nextPage={this.onNextPageClick}
                        prevPage={this.onPrevPageClick}
                    />
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
