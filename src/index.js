import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import tokenMiddleware from './middleware'

import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import history from './history'
import App from './components/App'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            reduxThunk,
            tokenMiddleware
        )
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();