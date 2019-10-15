import { USER_REGISTER_SUCCESS, USER_CONFIRMATION_SUCCESS, USER_REGISTER_COMPLETE } from "../actions/types";

export default (state = {
    registrationSuccess: false,
    confirmationSuccess: false,
}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                registrationSuccess: true
            }
        case USER_CONFIRMATION_SUCCESS:
            // console.log(action)
            return {
                ...state,
                confirmationSuccess: true
            }
        case USER_REGISTER_COMPLETE:
            return {
                ...state,
                registrationSuccess: false,
                confirmationSuccess: false,
            }
        default:
            return state
    }
}