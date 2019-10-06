import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogPostFetch, blogPostClear } from '../actions'
import Loader from './Loader'
import BlogPost from './BlogPost'

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
        this.props.blogPostClear()
    }

    render() {
        const { isFetching, post } = this.props
        console.log(isFetching)
        return (
            <div>
                {(0 === Object.keys(post).length) && <Loader />}
                <BlogPost post={post} />
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
    blogPostClear,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer)
