import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginForm from './LoginForm'
import BlogPostListContainer from './BlogPostListContainer'
import BlogPostContainer from './BlogPostContainer'
import Header from './Header'

const App = () => {
    return (
        <Fragment>
            <Header />
            <Switch>
                <Route path="/login" exact component={LoginForm} />
                <Route path="/" exact component={BlogPostListContainer} />
                <Route path="/blog-post/:id" component={BlogPostContainer} />
            </Switch>
        </Fragment>
    )
}

export default App