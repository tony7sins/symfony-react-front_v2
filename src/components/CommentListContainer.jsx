import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentListFetch, commentListUnload } from '../actions'
import Loader from './Loader'
import CommentList from './CommentList'
import Warning from './Warning'
import CommentForm from './CommentForm'
import LoadMore from './LoadMore'


class CommentListContainer extends Component {
    static propTypes = {
        children: PropTypes.node,
        commentListFetch: PropTypes.func,
        commentListUnload: PropTypes.func,
        commentList: PropTypes.array,
        blogPostId: PropTypes.string,
        isAuthenticated: PropTypes.bool,
        currentPage: PropTypes.number,
        pageCount: PropTypes.number,
    }
    static defaultProps = {
        children: null,
        commentListFetch: () => { },
        commentListUnload: () => { },
        commentList: [],
        blogPostId: '',
        isAuthenticated: false,
        currentPage: 1,
        pageCount: 0,
    }

    componentDidMount() {
        // this.props.commentListFetch(this.props.metch.params.id)
        this.props.commentListFetch(this.props.blogPostId)

    }

    componentWillUnmount() {
        this.props.commentListUnload()
    }

    onLoadMoreOnClick = () => {
        const { blogPostId, currentPage, commentListFetch } = this.props
        commentListFetch(blogPostId, currentPage)
    }

    render() {

        const {
            isFetching,
            commentList,
            isAuthenticated,
            blogPostId,
            currentPage,
            pageCount
        } = this.props

        const showMoreComments = (pageCount > 1 && currentPage <= pageCount)
        return (
            <>
                {(0 === commentList.length && isFetching && currentPage === 1) && <Loader />}
                {(0 === commentList.length && !isFetching) && <Warning text='blog post' />}
                {(commentList !== []) ? <CommentList commentList={commentList} /> : <h3>No comments!</h3>}
                {showMoreComments &&
                    <LoadMore
                        label={'Load More!?'}
                        onClick={this.onLoadMoreOnClick}
                        disabled={isFetching} />}
                {isAuthenticated &&
                    <>
                        <CommentForm blogPostId={blogPostId} />
                    </>}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state.auth)
    return {
        ...state.commentList,
        isAuthenticated: state.auth.isAuthenticated
    }


}

const mapDispatchToProps = {
    commentListFetch,
    commentListUnload,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)