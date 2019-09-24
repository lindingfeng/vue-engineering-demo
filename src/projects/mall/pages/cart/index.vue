<template>
  <div class="cart-page">
    <p>cart</p>
    <tab-bar :activeTab="activeTab" @tabBarChange="tabBarChange" />
  </div>
</template>

<script>
import tabBar from '@@/components/tabBar'

export default {
  components: {
    tabBar
  },
  data () {
    return {
      activeTab: 2,
      tabBarList: [ 'index', 'category', 'cart', 'account' ]
    }
  },
  methods: {
    async getShopList () {
      let ret = await this.$mallApi.getShopList()
      if (+ret.data._errCode === 0) {
        this.shopList = ret.data._data.shop_list
      }
    },
    tabBarChange (ev) {
      const index = (ev || {}).index || 0
      if (index !== this.activeTab) {
        this.$router.push(this.tabBarList[index])
      }
    }
  },
  mounted () {
    // this.getShopList()
  }
}
</script>

<style lang="postcss" scoped>
.cart-page {
  padding-bottom: 50px;
}
</style>
