
// import { SubmissionError } from 'redux-form/immutable'
// import { userLogout } from '../actions'

export const parseApiErrors = (error) => {
    return error.response.data.violations.reduce((parsedErrors, violation) => {
        parsedErrors[violation['propertyPath']] = violation['message']
        return parsedErrors
    }, {})
}

export const hydraPageCount = (collection) => {
    // console.log(collection['hydra:view']['hydra:first'].match(/page=(\d+)/))
    if (!collection['hydra:view']) {
        return 1
    }
    return Number(collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1])
}