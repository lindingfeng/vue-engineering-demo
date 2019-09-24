<template>
  <div class="account-page">
    <!-- 用户信息 -->
    <div class="account-info-content">
      <div class="account-info-item">
        <img src="https://s1.huishoubao.com/img/phone/54789_20180922111355_945.png" alt="">
        <p class="user-nick">18084621629</p>
        <!-- <p class="user-nick">点击登录/注册</p> -->
      </div>
    </div>
    <!-- 主体信息 -->
    <div class="account-main-content">
      <!-- 订单信息 -->
      <div class="order-info-content">
        <div class="order-info-top">
          <p class="title">我的订单</p>
          <div class="look-all-order">
            <p>查看全部订单</p>
            <i class="fa fa-angle-right" />
          </div>
        </div>
        <div class="order-info-bottom">
          <div
            v-for="(item, index) in orderStatus"
            :key="index"
            class="order-status wait-pay"
          >
            <div class="icon-content">
              <i :class="item.icon"></i>
              <div class="number">20</div>
            </div>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <!-- 优惠券、收藏 -->
      <div class="coupons-collection-content">
        <div class="coupons-collection-item">
          <span>17</span>
          <p>优惠券</p>
        </div>
        <div class="coupons-collection-item">
          <span>17</span>
          <p>商品收藏</p>
        </div>
        <div class="coupons-collection-item">
          <span>17</span>
          <p>足迹</p>
        </div>
      </div>
    </div>
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
      activeTab: 3,
      tabBarList: [ 'index', 'category', 'cart', 'account' ],
      orderStatus: [
        { title: '待付款', icon: 'fa fa-paypal' },
        { title: '待发货', icon: 'fa fa-rocket' },
        { title: '待收货', icon: 'fa fa-truck' },
        { title: '待评价', icon: 'fa fa-commenting' },
        { title: '退款/售后', icon: 'fa fa-github-alt' },
      ]
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
.account-page {
  background-image: linear-gradient(to right, #eb3c3c, #ff7459);
}
.account-info-content {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 110px;
  .account-info-item {
    width: 100%;
    display: flex;
    align-items: center;
    img {
      flex-shrink: 0;
      width: 50px;
      margin-right: 10px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
    }
    p {
      width: calc(100% - 60px);
      font-size: 16px;
      color: #fff;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.account-main-content {
  height: 500px;
  padding: 12px 12px 50px;
  background-color: #f3f3f3;
}
.order-info-content,
.coupons-collection-content {
  margin-bottom: 12px;
  background: #fff;
  border-radius: 12px;
}
.order-info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  padding: 0 12px;
  border-bottom: 0.5px solid #EEEEE7;
  .title {
    font-size: 14px;
    font-weight: bold;
  }
  .look-all-order {
    display: flex;
    align-items: center;
    p {
      margin-right: 2px;
      font-size: 12px;
      color: rgb(153, 153, 153);
    }
    .fa {
      font-size: 16px;
      color: rgb(153, 153, 153);
    }
  }
}
.order-info-bottom {
  display: flex;
  height: 76px;
  padding: 0 8px;
}
.order-status {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-content {
    position: relative;
  }
  .fa {
    font-size: 32px;
    color: #ff7459;
  }
  p {
    margin-top: 4px;
    font-size: 12px;
    color: #666666;
  }
  .number {
    position: absolute;
    left: 20px;
    top: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 18px;
    padding: 0 4px;
    height: 18px;
    font-size: 12px;
    font-weight: bold;
    color: #ff5500;
    background-color: #fff;
    border: 1px solid #ff5500;
    border-radius: 18px;
  }
}
.coupons-collection-content {
  height: 70px;
  display: flex;
}
.coupons-collection-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  p {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
}
</style>
