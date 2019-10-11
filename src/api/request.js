import axios from 'axios'
import { baseURL } from './constants'

const api = axios.create({
    baseURL
})

// let token = localStorage.getItem('jwtToken')
let token = null

const setTokenToHeader = (secured) => {
    api.interceptors.request.use(
        (config) => {

            token = localStorage.getItem('jwtToken')

            if (token && secured) {
                config.headers['Authorization'] = `Bearer ${token}`
            } else {
                delete config.headers.common['Authorization']
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const request = {
    get: (url, secured = false) => {
        setTokenToHeader(secured)
        return api.get(url)
    },
    post: (url, body = null, secured = true) => {
        setTokenToHeader(secured)
        return api.post(url, body)
    },
    setToken: (jwtToken) => token = jwtToken
    // return console.log(token)

}

export default request

