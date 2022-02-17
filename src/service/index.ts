import axios from 'axios'

const service = axios.create({
    baseURL: process.env.API_HOST,
})
service.interceptors.request.use(
    (config) => {
        config.data.login_token = 'INTERVIEW_SIMPLY2021' // inject token
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use((response) => {
    // TODO do something
    return response
})
export default service
