import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import shop from './module/shop'
import order from './module/order'
import mallApi from '@@/apis/mallApi'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    isValidloginState: false,
    avatar: Cookies.get('avatar')
  },

  mutations: {
    setLoginState (state, data) {
      state.isValidloginState = data
    },
    setAvatar (state, data) {
      state.avatar = data
    }
  },

  actions: {
    /*
     * @desc: 检查登录态
    */
    async checkLoginState ({ commit }) {
      const token = Cookies.get('token')
      if (!token) return
      try {
        let ret = await mallApi.checkLoginState()
        if (+ret.data._errCode === 0) {
          if (+ret.data._data.status === 1) {
            commit('setLoginState', true)
          } else if (+ret.data._data.status === 2) {
            commit('setLoginState', false)
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @desc: 获取微信jssdk签名信息
    */
    async getWxJsSignInfo ({ dispatch }, { wxConfig, url = '' }) {
      try {
        let ret = await mallApi.getWxSignInfo({ url: url || window.location.href })
        if (+ret.data._errCode === 0) {
          const signInfo = ret.data._data.signInfo || {}
          dispatch('initWxJsSDK', { wxConfig, signInfo })
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @desc: 初始化jssdk信息
    */
    async initWxJsSDK ({ commit }, { wxConfig, signInfo }) {
      window.wx && window.wx.ready(function () {
        window.wx.onMenuShareTimeline(wxConfig);
        window.wx.onMenuShareAppMessage(wxConfig);
        window.wx.onMenuShareQQ(wxConfig);
      });

      window.wx && window.wx.error(function (res) {
        console.log('error: ', res);
      });
      const { appId, timestamp, nonceStr, signature } = signInfo
      const setting = {
        debug: false,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ'
        ]
      };
      window.wx && window.wx.config(setting);
    }
  },

  modules: {
    shop,
    order
  }

})

export default store
