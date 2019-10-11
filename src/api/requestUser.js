import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
})

export const request = {
    get: (url) => api.get().interceptors.request.use(tokenPlagin)
}

// api.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
let token = null
const setToken = (jwtToken) => token = jwtToken

export const tokenPlagin = (secured = false) => {
    if (token && secured) {
        return (request) => {
            api.set('Authrization', `Bearer ${token}`)
        }
    }
    return
}

api.interceptors.request.use(tokenPlagin);

export default api