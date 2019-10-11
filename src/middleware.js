import { USER_LOGIN_SUCCESS, USER_ERISE } from './actions/types'
// import request from './api/request'

const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            window.localStorage.setItem('jwtToken', action.payload.token)
            window.localStorage.setItem('userId', action.payload.userId)
            // request.setToken(action.payload.token)
            break
        case USER_ERISE:
            window.localStorage.removeItem('jwtToken')
            window.localStorage.removeItem('userId')
            break
        default:
            break
    }
    next(action)
}

export default tokenMiddleware