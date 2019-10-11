import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from './Loader'

class Header extends Component {

    renderUser(userData) {
        // console.log(_.isEmpty(userData, true))
        // console.log(userData !== undefined && _.isEmpty(userData, true))

        if (userData !== undefined && _.isEmpty(userData, true)) return <Loader />
        else return userData.name
    }

    render() {
        const { isAuthenticated, userData } = this.props
        return (
            <nav className="navbar navbar=extend-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand">React Blog</Link>
                <span className='text-light'>
                    {/* {console.log(userData)} */}
                    {isAuthenticated ? this.renderUser(userData) : <Link to={'/login'}>Sign-in</Link>}
                </span>
            </nav>
        )
    }
}

Header.propTypes = {
    children: PropTypes.node,
    isAuthenticated: PropTypes.bool,
    userData: PropTypes.object
}
Header.defaultProps = {
    children: null,
    isAuthenticated: false,
    userData: {},
}

export default Header
