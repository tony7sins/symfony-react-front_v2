import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import blogPostListReducer from './blogPostList'

export default combineReducers({
    blogPostList: blogPostListReducer,
})