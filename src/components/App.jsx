import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginForm from './LoginForm'
import BlogPostListContainer from './BlogPostListContainer'
import Header from './Header'

const App = () => {
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/" exact component={BlogPostListContainer} />
            </Switch>
        </Fragment>
    )
}

export default App