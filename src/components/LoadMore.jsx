import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoadMore extends Component {
    static propTypes = {
        label: PropTypes.string,
    }
    static defaultProps = {
        label: '',
    }

    render() {
        const { label } = this.props
        return (
            <button className="btn btn-block btn-dark">
                {label}
            </button>
        )
    }
}

export default LoadMore
