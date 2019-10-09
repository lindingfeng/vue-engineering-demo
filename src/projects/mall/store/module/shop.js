
import mallApi from '@@/apis/mallApi'

export default {
  namespaced: true,
  state: {
    shopList: [],
    categoryList: []
  },
  mutations: {
    setShopList (state, data) {
      state.shopList = data
    },
    setCategoryList (state, data) {
      state.categoryList = data
    }
  },
  actions: {
    /*
     * @desc: 商品列表
    */
    async getShopList ({ commit }, { pageIndex = 1, pageSize = 15, success, fail }) {
      try {
        let ret = await mallApi.getShopList({ pageIndex, pageSize })
        if (+ret.data._errCode === 0) {
          commit('setShopList', ret.data._data.shop_list || [])
          success && success(ret.data)
        }
      } catch (err) {
        fail && fail(err)
      }
    },
    /*
     * @desc: 商品分类列表
    */
    async getCategoryList ({ commit }, { success, fail }) {
      try {
        let ret = await mallApi.getCategoryList()
        if (+ret.data._errCode === 0) {
          commit('setCategoryList', ret.data._data.category_list || [])
          success && success(ret.data)
        }
      } catch (err) {
        fail && fail(err)
      }
    }
  }
}
