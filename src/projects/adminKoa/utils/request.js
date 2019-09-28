import axios from 'axios'
import Cookies from 'js-cookie'
import sha1 from 'sha1'
import router from '../router'
import { commonParams } from '../config'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  config => {
    let signString = ''
    const token = Cookies.get('token') || ''
    // 整合params
    config.params = {
      ...commonParams,
      ...config.params,
      token,
      timestamp: parseInt(new Date() / 1000)
    }
    const params = {
      ...config.params
    }
    const paramsKey = Object.keys(params).sort()
    for (let i=0;i<paramsKey.length;i++) {
      signString += `${paramsKey[i]}${params[paramsKey[i]]}`
    }
    signString += 'lindingfeng'
    signString = sha1(signString)
    config.params.sign = signString
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
    if (+response.data._errCode === 1001) {
      setTimeout(() => {
        Cookies.remove('token')
        Cookies.remove('role')
        router.push(`/login?back=${true}`)
      }, 1000)
    }
    return response;
  },
  error => {
    console.log(error.message)
  }
)

export default service

