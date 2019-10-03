import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import App from './components/App';
import LoginForm from './components/LoginForm'
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    state => state,
    composeEnhancers(
        applyMiddleware(reduxThunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Fragment>
                <h1>Header</h1>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/login" exact component={LoginForm} />
                </Switch>
            </Fragment>


        </Router>
    </Provider>
    ,
    document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();