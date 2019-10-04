import {
    BLOG_POST_LIST_REQUEST,
    BLOG_POST_LIST_ADD,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECIEVED
} from "./types"

import api from '../api/blogPosts'


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

export const blogPostListFetch = () => async (dispatch) => {
    dispatch(blogPostListRequest())
    try {
        await api.get('/blog_posts').then(({ data }) => dispatch(blogPostListRecieved(data)))
    } catch (err) {
        dispatch(blogPostListError(err))
    }
}

export const blogPostAdd = () => ({
    type: BLOG_POST_LIST_ADD,
    payload: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'A new post created!'
    }
})



