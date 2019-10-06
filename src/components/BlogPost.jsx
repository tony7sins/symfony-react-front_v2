import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'

export default class BlogPost extends Component {
    static propTypes = {
        post: PropTypes.object,
        children: PropTypes.node,
        title: PropTypes.string,
        published: PropTypes.string,
    }
    static defaultProps = {
        post: {},
        children: null,
        title: '',
        published: '',
    }

    render() {
        const { title, content, published = '', author = '' } = this.props.post
        // console.log(this.props.post)
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <h2>{title}</h2>
                    <p className="card-text">{content}</p>
                    <p className="card-text border-top">
                        <small className="text-muted">
                            <TimeAgo
                                datetime={published}
                                locale='ru'
                            /> by &nbsp;
                        {author.name}
                        </small>
                    </p>
                </div>
            </div>
        )
    }
}
