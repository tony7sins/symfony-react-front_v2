import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import blogPostListReducer from './blogPostList'
import blogPostReducer from './blogPost'

export default combineReducers({
    blogPostList: blogPostListReducer,
    blogPost: blogPostReducer,
})