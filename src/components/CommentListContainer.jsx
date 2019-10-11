import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentListFetch, commentListUnload } from '../actions'
import Loader from './Loader'
import CommentList from './CommentList'
import Warning from './Warning'

class CommentListContainer extends Component {
    static propTypes = {
        children: PropTypes.node,
        commentListFetch: PropTypes.func,
        commentListUnload: PropTypes.func,
        commentList: PropTypes.array,
        blogPostId: PropTypes.string,
    }

    componentDidMount() {
        // this.props.commentListFetch(this.props.metch.params.id)
        this.props.commentListFetch(this.props.blogPostId)

    }

    componentWillUnmount() {
        this.props.commentListUnload()
    }

    render() {

        const { isFetching, commentList } = this.props
        return (
            <>
                {(0 === commentList.length && isFetching) && <Loader />}
                {(0 === commentList.length && !isFetching) && <Warning text='blog post' />}
                {(commentList !== []) && <CommentList commentList={commentList} />}
            </>
        )
    }
}
const mapStateToProps = ({ commentList }) => ({
    ...commentList
})

const mapDispatchToProps = {
    commentListFetch,
    commentListUnload,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)