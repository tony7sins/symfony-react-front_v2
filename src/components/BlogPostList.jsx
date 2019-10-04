import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import timeago from 'timeago.js'
import TimeAgo from 'timeago-react'

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
        // console.log(this.props.posts)
        const { posts, isFetching } = this.props

        if (isFetching) {
            return (
                <div className="fa-3x">
                    <i className="fas fa-spinner fa-spin" />
                </div>
            )
        }
        if (0 === posts.length) {
            return (
                <div>No blogposts!</div>
            )
        }
        return (
            <div>
                {posts && posts.map(({ id, title, published = '' }) => (
                    <div className="card mb-3 mt-3 shadow-sm" key={id}>
                        <div className="card-body">
                            <h3>{title}</h3>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                    <TimeAgo
                                        datetime={published}
                                        locale='ru'
                                    />
                                </small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        )
    }
}

export default BlogPostList
