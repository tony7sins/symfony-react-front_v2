import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import LoginForm from './LoginForm'
import BlogPostListContainer from './BlogPostListContainer'
import BlogPostContainer from './BlogPostContainer'
import Header from './Header'

import { connect } from 'react-redux'
import {
    userLoginSuccess,
    userProfileFetch,
    userSetId,
    userLogout,
} from '../actions'

class App extends Component {
    state = {
        token: window.localStorage.getItem('jwtToken'),
        userId: window.localStorage.getItem('userId'),
    }

    componentDidMount() {
        let { token, userId } = this.state
        const { userLoginSuccess, } = this.props
        // const { userProfileFetch, userLoginSuccess, } = this.props
        if (userId !== 'null' && userId !== null && userId !== 'undefined') {
            userSetId(userId)
            userLoginSuccess(token, userId)
        }
    }

    componentDidUpdate(prevProps) {
        const { userId, userData } = this.props.auth
        const { userProfileFetch } = this.props

        if (
            (userId !== prevProps.auth.userId) &&
            (userId !== 'null') &&
            ([] !== Object.keys(userData))
        ) {
            userProfileFetch(userId)
            userSetId(userId)
            userLoginSuccess(this.state.token, userId)
        }
    }

    render() {
        const { auth: { isAuthenticated, userData }, userLogout } = this.props
        return (
            <Fragment>
                {/* {console.log(this.props.auth.isAuthenticated)} */}
                <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} />
                <Switch>
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/" exact component={BlogPostListContainer} />
                    <Route path="/blog-post/:id" component={BlogPostContainer} />
                </Switch>
            </Fragment>
        )
    }
}

App.propTypes = {
    authuserData: PropTypes.object,
    userLoginSuccess: PropTypes.func,
    userLogout: PropTypes.func,
}
App.defaultProps = {
    auth: {},
    userLoginSuccess: () => { },
    userLogout: () => { }
}

const mapStateTopProps = (state, props) => {
    // console.log(state.auth.isAuthenticated, props)
    // console.log(state === props)
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = {
    userLoginSuccess,
    userProfileFetch,
    userSetId,
    userLogout
}

export default connect(mapStateTopProps, mapDispatchToProps)(App)