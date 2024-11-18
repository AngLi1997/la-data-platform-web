import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.request.use(response => {
    return response.data
},
    (error) => {
        // 处理错误响应
        let errorMessage = '网络错误，请稍后再试'

        if (error.response) {
            // 请求已发出，服务器响应了状态码
            switch (error.response.status) {
                case 400:
                    errorMessage = '请求参数错误'
                    break
                case 401:
                    errorMessage = '未授权，登录信息过期'
                    // 可以在此处执行登出操作，清除 token 等
                    break
                case 404:
                    errorMessage = '请求的资源未找到'
                    break
                case 500:
                    errorMessage = '服务器内部错误'
                    break
                default:
                    errorMessage = '发生未知错误'
                    break
            }
        } else if (error.request) {
            // 请求已发出，但没有响应
            errorMessage = '服务器未响应'
        }
        alert(errorMessage)
        return Promise.reject(error)
    });
export default instance;