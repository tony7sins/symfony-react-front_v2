import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from './Loader'

class Header extends Component {

    renderUser(userData) {
        if (userData !== undefined && _.isEmpty(userData, true)) {
            return <div style={{ width: '100px' }} > <Loader /></div>
        }
        else return (
            <span className='text-light mr-3 align-self-center'>
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
                    <div className="d-flex">
                        {isAuthenticated ?
                            <>
                                {this.renderUser(userData)}
                                {this.renderLogout()}
                            </> :
                            <>
                                <button className='btn btn-light text-dark btn-big ml-1'>
                                    <Link className='text-dark text-decoration-none' to={'/register'}>Register</Link>
                                </button>
                                <button className='btn btn-success btn-big ml-1'>
                                    <Link className='text-light text-decoration-none' to={'/login'}>Sign-in</Link>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </nav >
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
