import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ size = 1.5 }) => {
    return (
        <div className="text-center loader" style={{ fontSize: `${size}em` }}>
            <i className="fas fa-spinner fa-spin" />
        </div>
    )
}

Loader.propTypes = {
    children: PropTypes.node,
    size: PropTypes.number,
}
Loader.defaultToProps = {
    children: null,
    size: 1.5,
}

export default Loader
