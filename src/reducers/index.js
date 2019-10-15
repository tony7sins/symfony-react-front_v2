import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import blogPostListReducer from './blogPostList'
import blogPostReducer from './blogPost'
import commentListReducer from './commentList'
import authReduscer from './auth'
import { reducer as formReducer } from 'redux-form'
import registrationReducer from './registration'
import blogPostFormReducer from './blogPostForm'

export default combineReducers({
    blogPostList: blogPostListReducer,
    blogPost: blogPostReducer,
    commentList: commentListReducer,
    registration: registrationReducer,
    auth: authReduscer,
    blogPostForm: blogPostFormReducer,
    form: formReducer,
})