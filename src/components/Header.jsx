import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from './Loader'

class Header extends Component {

    renderUser(userData) {
        if (userData !== undefined && _.isEmpty(userData, true)) return <Loader />
        else return (
            <span className='text-light'>
                {userData.name}
            </span>
        )
    }

    renderLogout() {
        return (
            <span>
                <button
                    onClick={this.props.logout}
                    className='btn btn-danger btn-big btn-block'
                >
                    LogOut!
                </button>
            </span>
        )
    }

    render() {
        const { isAuthenticated, userData } = this.props
        return (
            <nav className="navbar navbar=extend-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand">React Blog</Link>
                <div className='display-inline text-light'>
                    {isAuthenticated ?
                        <>
                            {this.renderUser(userData)}
                            {this.renderLogout()}
                        </> :
                        <button className='btn btn-success btn-big btn-block'>
                            <Link className='text-light' to={'/login'}>Sign-in</Link>
                        </button>
                    }
                </div>
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
