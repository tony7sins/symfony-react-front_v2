import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentListFetch, commentListUnload } from '../actions'
import Loader from './Loader'
import CommentList from './CommentList'
import Warning from './Warning'
import CommentForm from './CommentForm'

class CommentListContainer extends Component {
    static propTypes = {
        children: PropTypes.node,
        commentListFetch: PropTypes.func,
        commentListUnload: PropTypes.func,
        commentList: PropTypes.array,
        blogPostId: PropTypes.string,
        isAuthenticated: PropTypes.bool
    }
    static defaultProps = {
        children: null,
        commentListFetch: () => { },
        commentListUnload: () => { },
        commentList: [],
        blogPostId: '',
        isAuthenticated: false,
    }

    componentDidMount() {
        // this.props.commentListFetch(this.props.metch.params.id)
        this.props.commentListFetch(this.props.blogPostId)

    }

    componentWillUnmount() {
        this.props.commentListUnload()
    }

    render() {

        const { isFetching, commentList, isAuthenticated, blogPostId } = this.props
        return (
            <>
                {(0 === commentList.length && isFetching) && <Loader />}
                {(0 === commentList.length && !isFetching) && <Warning text='blog post' />}
                {(commentList !== []) ? <CommentList commentList={commentList} /> : <h3>No comments!</h3>}
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