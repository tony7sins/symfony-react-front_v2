import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogPostFetch, blogPostUnload } from '../actions'
import Loader from './Loader'
import BlogPost from './BlogPost'
import Warning from './Warning'
import CommentListContainer from './CommentListContainer'

class BlogPostContainer extends Component {
    static propTypes = {
        blogPostFetch: PropTypes.func,
        post: PropTypes.object,
    }
    static defaultProps = {
        blogPostFetch: () => { },
        post: {}
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.blogPostFetch(id)
    }

    componentWillUnmount() {
        this.props.blogPostUnload()
    }

    render() {
        const { isFetching, post } = this.props
        // console.log(isFetching)
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    {(0 === Object.keys(post).length && isFetching) && <Loader />}
                    {(0 === Object.keys(post).length && !isFetching) && <Warning text='blog post' />}
                    {(0 !== Object.keys(post).length) && <BlogPost post={post} />}
                    <CommentListContainer blogPostId={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ blogPost }) => {
    // console.log(blogPost)
    return {
        ...blogPost
    }
}

const mapDispatchToProps = {
    blogPostFetch,
    blogPostUnload,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer)
