import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import blogPostListReducer from './blogPostList'
import blogPostReducer from './blogPost'
import commentListReducer from './commentList'
import authReduscer from './auth'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    blogPostList: blogPostListReducer,
    blogPost: blogPostReducer,
    commentList: commentListReducer,
    auth: authReduscer,
    form: formReducer,
})