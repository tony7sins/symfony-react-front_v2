import { BLOG_POST_REQUEST, BLOG_POST_RECIEVED, BLOG_POST_ERROR, BLOG_POST_UNLOAD } from "../actions/types";

export default (state = {
    post: {},
    isFetching: false,
}, action) => {
    switch (action.type) {
        case BLOG_POST_REQUEST:
            // console.log(1)
            return {
                ...state,
                isFetching: true
            }
        case BLOG_POST_RECIEVED:
            // console.log(2)
            return {
                ...state,
                isFetching: false,
                post: action.payload
            }
        case BLOG_POST_ERROR:
            return {
                ...state,
                isFetching: false
            }
        case BLOG_POST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                post: {}
            }
        default:
            return state
    }
}