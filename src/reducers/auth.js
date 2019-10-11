import _ from 'lodash'
import { USER_LOGIN_SUCCESS, USER_PROFILE_RECEIVED, USER_ERISE, USER_SET_ID, USER_PROFILE_ERROR } from "../actions/types";

export default (
    state = {
        token: '',
        userId: '',
        isAuthenticated: false,
        userData: {},
    },
    action
) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                isAuthenticated: true,
            }
        case USER_PROFILE_RECEIVED:
            // console.log(_.isEmpty(state.userData));
            return {
                ...state,
                userData: (
                    state.userId === action.payload.userId && _.isEmpty(state.userData))
                    ? action.payload.userData : state.userData,
                isAuthenticated: (
                    state.userId === action.payload.userId
                    // &&
                    // 0 === Object.keys(state.userData).length
                )
            }
        case USER_PROFILE_ERROR:
            return {
                ...state,
                userData: {},
                isAuthenticated: false,
            }
        case USER_SET_ID:
            return {
                ...state,
                userId: action.payload,
                isAuthenticated: true
            }
        case USER_ERISE:
            return {
                ...state,
                // token: '',
                // userId: '',
                isAuthenticated: false,
                userData: {},
            }
        default:
            return state
    }
}