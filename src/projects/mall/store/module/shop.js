
import mallApi from '@@/apis/mallApi'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state: {
    shopList: []
  },
  mutations: {
    setShopList (state, data) {
      state.shopList = data
    }
  },
  actions: {
    async getShopList ({ commit }, { pageIndex = 1, pageSize = 15, success, fail }) {
      try {
        let ret = await mallApi.getShopList({ pageIndex, pageSize })
        if (+ret.data._errCode === 0) {
          commit('setShopList', ret.data._data.shop_list)
          success && success(ret.data)
        } else {
          Toast(ret.data._errStr)
        }
      } catch (err) {
        fail && fail(err)
      }
    }
  }
}
