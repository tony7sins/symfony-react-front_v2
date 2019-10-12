import { SubmissionError } from 'redux-form/immutable'
import { userLogout } from '../actions'

export const parseApiErrors = (error) => {
    return error.response.data.violations.reduce((parsedErrors, violation) => {
        parsedErrors[violation['propertyPath']] = violation['message']
        return parsedErrors
    }, {})
}

export const errorJwtToken = (response) => (dispatch) => {
    if (response.data.code === 401 && response.data.message === "Expired JWT Token") {
        // console.log('logout')
        dispatch(userLogout())
        throw new SubmissionError({ _error: response.data.message })
    }
}