import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BlogPost extends Component {
    static propTypes = {
        post: PropTypes.object
    }

    render() {
        const { title } = this.props.post
        // console.log(this.props.post)
        return (
            <div>
                {title}
            </div>
        )
    }
}
