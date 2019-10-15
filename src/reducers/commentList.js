import {
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_RECIEVED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_UNLOAD,
    COMMENT_ADDED
} from "../actions/types";
import { hydraPageCount } from "../api/apiUtils";

export default (
    state = {
        commentList: [],
        isFetching: false,
        currentPage: 1,
        pageCount: 0,
    }, action
) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case COMMENT_LIST_RECIEVED:
            console.log(0 === state.commentList.length)
            console.log(state.commentList.concat(action.payload['hydra:member']))
            return {
                ...state,
                isFetching: false,
                commentList: 0 === state.commentList.length ? action.payload['hydra:member'] : state.commentList.concat(action.payload['hydra:member']),
                currentPage: state.currentPage + 1,
                pageCount: hydraPageCount(action.payload)
            }
        case COMMENT_ADDED:
            // console.log(action.payload)
            return {
                ...state,
                isFetching: false,
                commentList: [action.payload, ...state.commentList]
            }
        case COMMENT_LIST_ERROR:
        case COMMENT_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                commentList: [],
                currentPage: 1,
                pageCount: 0,
            }
        default:
            return state
    }
}