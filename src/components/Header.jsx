import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    static propTypes = {
        children: PropTypes.node,
    }
    static defaultProps = {
        children: null,
    }

    render() {
        return (
            <nav className="navbar navbar=extend-lg navbar-dark bg-dark">
                <Link to='/' className="navbar-brand">React Blog</Link>
                <span>
                    <Link to={'/login'}>Sign-in</Link>
                </span>
            </nav>
        )
    }
}
