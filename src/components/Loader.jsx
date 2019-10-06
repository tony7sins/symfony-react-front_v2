import React from 'react'
import PropTypes from 'prop-types'

const Loader = props => {
    return (
        <div className="loader fa-3x">
            <i className="fas fa-spinner fa-spin" />
        </div>
    )
}

Loader.propTypes = {
    children: PropTypes.node,
}
Loader.defaultToProps = {
    children: null,
}

export default Loader
