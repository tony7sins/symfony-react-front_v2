import { BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_ADD, BLOG_POST_LIST_RECIEVED, BLOG_POST_LIST_ERROR, BLOG_POST_LIST_SET_PAGE } from "../actions/types"

export default (
    state = {
        posts: [],
        isFetching: false,
        currentPage: 1,
        pageCount: 0,
    }, action
) => {
    switch (action.type) {
        case BLOG_POST_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case BLOG_POST_LIST_RECIEVED:
            return {
                ...state,
                isFetching: false,
                posts: action.payload['hydra:member']
            }
        case BLOG_POST_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                posts: []
            }
        case BLOG_POST_LIST_ADD:
            return {
                ...state,
                posts: state.posts ? state.posts.concat(action.payload) : state.posts
            }
        case BLOG_POST_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state
    }
}