import axios from 'axios'
import Cookies from 'js-cookie'
import sha1 from 'sha1'
import router from '../router'
import { Toast } from 'vant'
import { commonParams } from '../config'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.lindf.com',
  // baseURL: 'http://132.232.35.229',
  // baseURL: 'http://127.0.0.1:7001',
  timeout: 30000
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
      router.push(`/login`)
    } else {
      if (+response.data._errCode !== 0) {
        console.log(response)
        const apiUrl = response.config.url
        const filterApi = ['area.json']
        const noAlert = filterApi.some(item => apiUrl.indexOf(item) !== -1)
        if (!noAlert) {
          Toast(response.data._errStr || '未知错误')
        }
      }
    }
    return response
  },
  error => {
    if ((error || {}).message.indexOf('timeout') !== -1) {
      Toast('请求超时!')
    }
    return Promise.reject(error)
  }
)

export default service

