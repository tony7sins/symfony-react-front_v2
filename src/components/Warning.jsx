import React from 'react'
import PropTypes from 'prop-types'

const Warning = ({ text }) => {
    return (
        <div className="text-warning">
            Yops! Smth wents wrong! There is no any {text}!
        </div>
    )
}

Warning.propTypes = {
    text: PropTypes.string,
}
Warning.defaultProps = {
    text: 'content',
}

export default Warning
