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
    userSetId
} from '../actions'

class App extends Component {
    state = {
        token: window.localStorage.getItem('jwtToken'),
        userId: window.localStorage.getItem('userId'),
    }

    componentDidMount() {

        let { token, userId } = this.state
        const { userProfileFetch, userLoginSuccess, } = this.props

        // console.log(token === null, )
        if (userId !== 'null' && userId !== null && userId !== 'undefined') {
            // console.log('ok!')
            userSetId(userId)
            userLoginSuccess(token, userId)
            // userProfileFetch(userId)
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


    getAuthBool = () => {
        return this.props.auth.isAuthenticated
    }
    getUserData = () => {
        return this.props.auth.userData
    }

    render() {
        return (
            <Fragment>
                {/* {console.log(this.props.auth.isAuthenticated)} */}
                <Header isAuthenticated={this.getAuthBool()} userData={this.props.auth.userData} />
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
    auth: PropTypes.object,
    userLoginSuccess: PropTypes.func,
}
App.defaultProps = {
    auth: {},
    userLoginSuccess: () => { },
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
}

export default connect(mapStateTopProps, mapDispatchToProps)(App)