import request from '@@/utils/request'

export default {
  // 登陆
  login (params = {}) {
    return request.post('/admin/mall/login', null, { params: { ...params } })
  },
  // 获取商品列表
  getShopList (params = {}) {
    return request.get('/admin/mall/getShopList', { params: { ...params } })
  },
  // 添加/编辑商品
  operationShop (data) {
    return request({
      url: '/api/operationShop',
      method: 'post',
      data: data
    })
  },
  // 删除商品
  deleteShop (data) {
    return request({
      url: '/api/deleteShop',
      method: 'post',
      data: data
    })
  },
  // 获取商品分类列表
  getCategory (params = {}) {
    return request.get('/admin/mall/getCategoryList', { params: { ...params } })
  },
  // 添加/编辑商品分类
  operationCategory (data) {
    return request({
      url: '/api/operationCategory',
      method: 'post',
      data: data
    })
  },
  // 删除商品分类
  deleteCategory (data) {
    return request({
      url: '/api/deleteCategory',
      method: 'post',
      data: data
    })
  },
  // 上/下架商品
  editShopStatus (data) {
    return request({
      url: '/api/editShopStatus',
      method: 'post',
      data: data
    })
  }
}