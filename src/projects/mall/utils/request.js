import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  // transformRequest: [function (data) {
  //   console.log(data)
  // }],
  // transformRequest: [function (data) {
  //   let ret = ''
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   return ret
  // }],
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(config.data)
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (config.method === 'post') {
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded'
      const q = {
        pid: 1004,
        platform: 'h5',
        version: '1.0.0',
        timestamp: 546448468,
        sign: '1e71438b396cd0793c180cb0522fd2aed5493d19'
      }
      
      config.data = q
    }
    // config.data.token = Cookies.get('token')
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    // 登录态失效
    if (+response.data._errCode === 1010) {
      store.push(`/login?back=${true}`)
    }
    return response;
  },
  error => {
    console.log(error.message)
  }
)

export default service

