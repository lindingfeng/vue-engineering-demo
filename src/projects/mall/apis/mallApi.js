import request from '@@/utils/request'

export default {
  login (data) {
    return request({
      url: '/api/login',
      method: 'post',
      data: data
    })
  },
  registered (data) {
    return request({
      url: '/api/registered',
      method: 'post',
      data: data
    })
  },
  changePwd (data) {
    return request({
      url: '/api/changePwd',
      method: 'post',
      data: data
    })
  },
  addCategory (data) {
    return request({
      url: '/api/addCategory',
      method: 'post',
      data: data
    })
  },
  getCategory () {
    return request({
      url: '/api/getCategory',
      method: 'post',
      data: {}
    })
  },
  addShop (data) {
    return request({
      url: '/api/addShop',
      method: 'post',
      data: data
    })
  },
  getAllAddress () {
    return request({
      url: '/json/area.json',
      method: 'get',
      data: {}
    })
  },
  addAddress (data) {
    return request({
      url: '/api/addAddress',
      method: 'post',
      data: data
    })
  },
  getAddress () {
    return request({
      url: '/api/getAddress',
      method: 'post',
      data: {}
    })
  },
  getAddressInfo (data) {
    return request({
      url: '/api/getAddressInfo',
      method: 'post',
      data: data
    })
  },
  checkLoginState () {
    return request.get('/common/checkLoginState')
  },
  getShopList (params = {}) {
    return request.get('/admin/mall/getShopList', { params: { ...params } })
  },
  loginByEgg (params = {}) {
    return request.post('/admin/mall/login', null, { params: { ...params } })
  },
  uploadfile (data) {
    return request.post('/common/uploader', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}