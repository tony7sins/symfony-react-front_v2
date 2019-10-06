import {
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_RECIEVED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_UNLOAD
} from "../actions/types";

export default (
    state = {
        commentList: [],
        isFetching: false,
    }, action
) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case COMMENT_LIST_RECIEVED:
            return {
                ...state,
                isFetching: false,
                commentList: action.payload['hydra:member']
            }
        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                commentList: []
            }
        default:
            return state
    }
}