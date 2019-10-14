import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoadMore extends Component {
    static propTypes = {
        label: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    }
    static defaultProps = {
        label: '',
        onClick: () => { },
        disabled: false,
    }

    render() {
        const { label, onClick, disabled } = this.props
        return (
            <button className="btn btn-block btn-dark" disabled={disabled} onClick={onClick}>
                {label}
            </button>
        )
    }
}

export default LoadMore
