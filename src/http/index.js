import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    config.headers['Access-Control-Allow-Origin'] = 'https://social-kreep.herokuapp.com'
    config.headers['Access-Control-Allow-Methods'] = "OPTIONS,PATCH,GET,PUT,POST,DELETE"
    config.headers['Access-Control-Allow-Headers'] = "Origin, X-Requested-With, Content-Type, Accept"
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
