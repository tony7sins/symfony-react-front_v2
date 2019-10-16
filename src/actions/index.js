import {
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECIEVED,
    BLOG_POST_REQUEST,
    BLOG_POST_ERROR,
    BLOG_POST_RECIEVED,
    BLOG_POST_UNLOAD,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_RECIEVED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_UNLOAD,
    USER_LOGIN_SUCCESS,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_ERROR,
    USER_PROFILE_REQUEST,
    USER_ERISE,
    USER_SET_ID,
    COMMENT_ADDED,
    BLOG_POST_LIST_SET_PAGE,
    USER_REGISTER_SUCCESS,
    USER_CONFIRMATION_SUCCESS,
    USER_REGISTER_COMPLETE,
    IMAGE_UPLOADED,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_ERROR,
    BLOG_POST_FORM_UPLOAD
} from "./types"

import { SubmissionError } from 'redux-form/immutable'

import history from '../history'

import request from '../api/request'
import { parseApiErrors } from "../api/apiUtils"

//!___BLOG_POST_LIST___
export const blogPostListRequest = () => ({
    type: BLOG_POST_LIST_REQUEST,
})

export const blogPostListError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    payload: error,
})

export const blogPostListRecieved = (data) => ({
    type: BLOG_POST_LIST_RECIEVED,
    payload: data,
})

export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    payload: page,
})

export const blogPostListFetch = (page = 1) => async (dispatch) => {
    dispatch(blogPostListRequest())
    return await request
        .get(`/api/blog_posts?_page=${page}`)
        .then(({ data }) => dispatch(blogPostListRecieved(data)))
        .catch(err => {
            dispatch(blogPostListError(err))
            if (err.response.data.code === 401 && err.response.data.message === "Expired JWT Token") {
                console.log('logout')
                dispatch(userLogout())
                // throw new SubmissionError({ _error: err.response.data.message })
            }
        })
}

// BlogPostForm
export const blogPostAdd = (title, content, images = []) => async dispatch => {
    return await request.post('api/blog_posts', {
        title,
        content,
        slug: title && title.replace(/ /g, '-').toLowerCase(),
        images: images.map(image => `api/images/${image.id}`)
    })
        .catch(err => {
            if (err.response.data.code === 401) {
                console.log('logout')
                dispatch(userLogout())
                // throw new SubmissionError({ _error: err.response.data.message })
            } else if (err.response.status === 403) {
                console.log('logout')
                // dispatch(userLogout())
                throw new SubmissionError({ _error: "don't have enouth rights" })
            }
            throw new SubmissionError(parseApiErrors(err))
        })
}

// BlogPostForm
export const blogPostFormUpload = () => ({
    type: BLOG_POST_FORM_UPLOAD
})


//!___BLOG_POST___
export const blogPostRequest = () => ({
    type: BLOG_POST_REQUEST
})

export const blogPostError = (error) => ({
    type: BLOG_POST_ERROR,
    payload: error
})

export const blogPostRecieved = (data) => ({
    type: BLOG_POST_RECIEVED,
    payload: data
})

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD
})

export const blogPostFetch = id => async dispatch => {
    dispatch(blogPostRequest())
    try {
        await request.get(`/api/blog_posts/${id}`)
            .then(({ data }) => dispatch(blogPostRecieved(data)))
    } catch (err) {
        dispatch(blogPostError(err))
    }
}

//!___COMMENT_LIST___
export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST
})

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    payload: error
})

export const commentListRecieved = (data) => ({
    type: COMMENT_LIST_RECIEVED,
    payload: data
})

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD
})

export const commentListFetch = (id, page = 1) => async dispatch => {
    dispatch(commentListRequest())
    try {
        await request.get(`/api/blog_posts/${id}/comments?_page=${page}`)
            .then(({ data }) => dispatch(commentListRecieved(data)))
    } catch (err) {
        dispatch(commentListError(err))
    }
}

//!___USER_COMMENT___
export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    payload: comment
})

export const commentAdd = (comment, blogPostId) => async dispatch => {
    return await request.post('/api/comments', {
        content: comment,
        blogPost: `/api/blog_posts/${blogPostId}`
    }, true)
        .then(res => dispatch(commentAdded(res.data)))
        .catch(err => {
            console.log(err.response)
            if (err.response.data.code === 401 && err.response.data.message === "Expired JWT Token") {
                console.log('logout')
                dispatch(userLogout())
                throw new SubmissionError({ _error: err.response.data.message })
            }

            // const { violations } = err.response.data
            // violations.map(() => {
            //     throw new SubmissionError(parseApiErrors(err))
            // })
            throw new SubmissionError(parseApiErrors(err))
        })
}

//!___USER_LOGIN___

export const userLoginSuccess = (token, userId) => ({
    type: USER_LOGIN_SUCCESS,
    payload: {
        token,
        userId
    }
})

export const userLoginAttapmt = (username, password) => async dispatch => {
    await dispatch(userErise())
    if (username === null) await dispatch(userLogout())
    return await request
        .post('/api/login_check', { username, password }, false)
        .then(res => dispatch(userLoginSuccess(res.data.token, res.data.id)))
        .then(() => history.push('/'))
        .catch(err => {
            // console.log(err.response.status)
            if (err.response.data.code === 401 && err.response.data.message === "Expired JWT Token") {
                // console.log('logout')
                dispatch(userLogout())
                throw new SubmissionError({ _error: err.response.data.message })
            }
            if (err.response.data.code === 401) {
                throw new SubmissionError({ _error: err.response.data.message })
            }
            if (err.response.status === 400) {
                throw new SubmissionError({ _error: 'что-то пошло не так!' })
            }
            return
        })
}

export const userRegisterSuccess = () => ({
    type: USER_REGISTER_SUCCESS
})

export const userRegister = (username, password, retypedPassword, email, name) => async dispatch => {
    // await dispatch(userErise())
    // if (username ===  null) await dispatch(userLogout())
    return await request
        .post('/api/users', { username, password, retypedPassword, email, name }, false)
        .then(() => dispatch(userRegisterSuccess()))
        .catch(err => {
            throw new SubmissionError(parseApiErrors(err))
        })
}

export const userConfirmSuccess = () => ({
    type: USER_CONFIRMATION_SUCCESS
})

export const userRegisterComplete = () => ({
    type: USER_REGISTER_COMPLETE
})

export const userConfirm = (confirmationToken) => async dispatch => {
    return await request
        .post('/api/users/confirm', { confirmationToken }, false)
        .then(() => dispatch(userConfirmSuccess()))
        .catch(err => {
            throw new SubmissionError({
                _error: 'Invalid TOKEN!'
            })
        })
}

export const userSetId = (userId) => ({
    type: USER_SET_ID,
    payload: userId
})

export const userLogout = () => async dispatch => {
    try {
        await request.get(`/logout`)
            .then(() => dispatch(userErise()))
            .then(() => {
                throw new SubmissionError({ _error: 'You are logged out' })
            })
    } catch (err) {
        console.log(err.response)
        // dispatch(commentListError(err))
    }
}

export const userErise = () => ({
    type: USER_ERISE
})

//!___USER_PROFILE___

export const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST
})

export const userProfileError = () => ({
    type: USER_PROFILE_ERROR
})

export const userProfileReceived = (userId, userData) => ({
    type: USER_PROFILE_RECEIVED,
    payload: {
        userId: userId,
        userData: userData
    }
})

export const userProfileFetch = (userId) => async dispatch => {
    dispatch(userProfileRequest())
    return await request
        .get(`/api/users/${userId}`, true)
        .then(res => {
            // console.log(res.data)
            return dispatch(userProfileReceived(userId, res.data))
        })
        .catch(err => {
            if (err.response.data.code === 401 && err.response.data.message === "Expired JWT Token") {
                console.log('logout')
                dispatch(userLogout())
                // throw new SubmissionError({ _error: err.response.data.message })
            }
            // if (err.response.data.code === 401) {
            //     throw new SubmissionError({ _error: err.response.data.message })
            // }
            return dispatch(userProfileError())
        })
    // .catch(err => console.log(err.response.data))
}

//!___IMAGE_UPLOAD___
export const imageUploaded = (data) => ({
    type: IMAGE_UPLOADED,
    payload: {
        image: data
    }
})

export const imageUploadRequest = () => ({
    type: IMAGE_UPLOAD_REQUEST
})

export const imageUploadError = () => ({
    type: IMAGE_UPLOAD_ERROR
})

export const imageUpload = (file) => async dispatch => {
    dispatch(imageUploadRequest())
    const data = new FormData()
    data.append('file', file, file.name)
    return await request.upload('/api/images', data)
        .then(res => dispatch(imageUploaded(res)))
        .catch(() => dispatch(imageUploadError()))
}


