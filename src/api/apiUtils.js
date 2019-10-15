
import _ from 'lodash'
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

const canWriteBlogPostRoles = ["ROLE_WRITER", "ROLE_ADMIN", "ROLE_SUPERADMIN"]

export const canWriteBlogPosts = (userData) => {
    // console.log(userData.roles)
    // console.log(userData.roles === undefined)
    if (!_.isEmpty(userData) && userData.roles !== undefined) {
        // console.log('OK!')
        return userData.roles.some(userRoles => canWriteBlogPostRoles.includes(userRoles))
    }
}