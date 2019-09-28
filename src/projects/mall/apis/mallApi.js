import request from '@@/utils/request'

export default {
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
  checkLoginState () {
    return request.get('/common/checkLoginState')
  },
  getShopList (params = {}) {
    return request.get('/client/mall/getShopList', { params: { ...params } })
  },
  login (params = {}) {
    return request.post('/client/mall/login', null, { params: { ...params } })
  }, 
  registered (params = {}) {
    return request.post('/client/mall/registered', null, { params: { ...params } })
  },
  uploadfile (data) {
    return request.post('/common/uploader', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getAddressList (params = {}) {
    return request.get('/client/mall/getAddressList', { params: { ...params } })
  },
  getAllCity () {
    return request.get('/public/json/area.json')
  },
  addAddress (params = {}) {
    return request.post('/client/mall/addAddress', params)
  },
  getAddressInfo (params = {}) {
    return request.get('/client/mall/getAddressInfo', { params: { ...params } })
  }
}