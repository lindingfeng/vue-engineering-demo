<template>
  <div class="cart-page" :class="cartList.length ? 'account-show' : ''">
    <div class="cart-content">
      <div class="cart-title">
        <span>共10件商品</span>
        <span class="edit" @click="editChange">{{isEdit ? '完成' : '编辑商品'}}</span>
      </div>
      <div class="cart-item-content" v-for="(item, index) in cartList" :key="index">
        <div class="cart-item-title">
          <van-checkbox v-model="item.select" icon-size="20" checked-color="#eb3c3c" @click="storeSelectClick(item)" />
          <div class="store-content">
            <span>{{item.shop_store}}</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
        <div class="cart-item-info" v-for="(child, idx) in item.shop_list" :key="idx">
          <div class="check-box-content">
            <van-checkbox v-model="child.select" icon-size="20" checked-color="#eb3c3c" @change="shopSelectChange(item, child, $event)" />
          </div>
          <div class="image-content">
            <img :src="child.shop_image" alt="">
          </div>
          <div class="shop-info-content">
            <div class="title">{{child.shop_name}}</div>
            <div class="price-number">
              <div class="price-txt"><span>¥</span>{{child.shop_price / 100}}</div>
              <van-stepper
                :value="child.number"
                integer
                @change="valueChange(child, $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部结算/删除 -->
    <div v-if="cartList.length" class="account-detel-content">
      <div class="left-all-checkbox">
        <van-checkbox v-model="allSelect" icon-size="20" checked-color="#eb3c3c" @click="allSelectClick">全选</van-checkbox>
      </div>
      <div class="right-account-detel">
        <div class="account-content">
          <span class="span1">总计: </span>
          <span class="span3"><span class="span2">¥</span>{{account / 100}}</span>
        </div>
        <!-- <div class="account-btn"></div> -->
        <van-button type="danger">结算(3)</van-button>
      </div>
    </div>
    <tab-bar :activeTab="activeTab" @tabBarChange="tabBarChange" />
  </div>
</template>

<script>
import tabBar from '@@/components/tabBar'
import {
  Checkbox,
  Stepper,
  Button
} from 'vant'

export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
    [Button.name]: Button,
    tabBar
  },
  data () {
    return {
      activeTab: 2,
      tabBarList: [ 'index', 'category', 'cart', 'account' ],
      cartList: [
        {
          shop_store: '自营',
          select: false,
          shop_list: [
            {
              shop_name: '飞利浦1K/2K IPS电脑显示器 电竞75HZ 绘图三边微边框直面液晶显示屏 HDMI/DP可壁挂 271E1S/1K/75HZ',
              shop_image: 'https://img.alicdn.com/imgextra/i4/2024058652/O1CN01EmRWOc2DmfK0dlwWD_!!2024058652.jpg_200x200.jpg',
              shop_price: '150000',
              select: false,
              number: 1
            },
            {
              shop_name: '飞利浦1K/2K IPS电脑显示器 电竞75HZ 绘图三边微边框直面液晶显示屏 HDMI/DP可壁挂 271E1S/1K/75HZ',
              shop_image: 'https://img.alicdn.com/imgextra/i4/2024058652/O1CN01EmRWOc2DmfK0dlwWD_!!2024058652.jpg_200x200.jpg',
              shop_price: '320000',
              select: false,
              number: 2
            }
          ]
        },
        {
          shop_store: '自营2',
          select: false,
          shop_list: [
            {
              shop_name: '飞利浦1K/2K IPS电脑显示器 电竞75HZ 绘图三边微边框直面液晶显示屏 HDMI/DP可壁挂 271E1S/1K/75HZ',
              shop_image: 'https://img.alicdn.com/imgextra/i4/2024058652/O1CN01EmRWOc2DmfK0dlwWD_!!2024058652.jpg_200x200.jpg',
              shop_price: '320000',
              select: false,
              number: 2
            }
          ]
        }
      ],
      isEdit: false,
      allSelect: false,
      account: 0
    }
  },
  methods: {
    tabBarChange (ev) {
      const index = ev.index || 0
      if (index !== this.activeTab) {
        this.$router.push(this.tabBarList[index])
      }
    },
    // 店铺选中按钮click事件
    storeSelectClick (item) {
      item.shop_list.forEach(ele => {
        ele.select = !item.select
      })
    },
    // 店铺选中按钮change事件
    shopSelectChange (item, child, value) {
      if (value) {
        let storeAllSelect = true
        item.shop_list.forEach(ele => {
          if (!ele.select) {
            storeAllSelect = false
          }
        })
        if (storeAllSelect) {
          item.select = true
          let allSelect = true
          this.cartList.forEach(element => {
            if (!element.select) {
              allSelect = false
            }
          })
          if (allSelect) {
            this.allSelect = true
          }
        }
        this.account += Number(child.shop_price) * Number(child.number)
      } else {
        if (item.select) {
          item.select = false
        }
        if (this.allSelect) {
          this.allSelect = false
        }
        this.account -= Number(child.shop_price) * Number(child.number)
      }
    },
    // 全选按钮click事件
    allSelectClick () {
      this.cartList.forEach(element => {
        element.shop_list.forEach(ele => {
          ele.select = !this.allSelect
        })
      })
    },
    // 编辑商品
    editChange () {
      this.isEdit = !this.isEdit
    },
    async valueChange (child, value) {
      child.number = value
      if (child.select) {
        let accounts = 0
        this.cartList.forEach(element => {
          element.shop_list.forEach(ele => {
            if (ele.select) {
              accounts += Number(ele.shop_price) * Number(ele.number)
            }
          })
        })
        this.account = accounts
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="postcss" scoped>
.cart-page {
  padding-bottom: 50px;
}
.cart-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 12px;
  margin-bottom: 0.5px;
  background-color: #fff;
  span {
    font-size: 14px;
    color: #999999;
  }
  .edit {
    color: #333333;
  }
}
.cart-item-content {
  background-color: #fff;
  .cart-item-title {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 12px;
  }
  .store-content {
    display: flex;
    align-items: center;
    margin-left: 12px;
    span {
      font-size: 15px;
      font-weight: bold;
      color: rgb(51, 51, 51);
    }
    i {
      margin-left: 3px;
      font-size: 16px;
    }
  }
}
.cart-item-info {
  position: relative;
  display: flex;
  padding: 0 12px 12px;
  margin-bottom: 12px;
  &::after {
    position: absolute;
    content: '';
    left: 12px;
    right: 0;
    bottom: 0;
    height: 0.5px;
    background-color: #f3f3f3;
  }
  .check-box-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-right: 12px;
  }
  .image-content {
    margin-right: 12px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
.shop-info-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price-number {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .price-txt {
    font-size: 17px;
    font-weight: bold;
    color: rgb(255, 80, 0);
    span {
      font-size: 13px;
    }
  }
}
.account-detel-content {
  position: fixed;
  left: 0;
  bottom: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 12px;
  height: 50px;
  padding-bottom: 0;
  background-color: #fff;
}
.right-account-detel {
  display: flex;
  align-items: center;
  /deep/ .van-button {
    width: 90px;
    height: 50px;
    font-size: 16px;
    border-radius: 0;
  }
  .account-content {
    display: flex;
    align-items: flex-end;
    margin-right: 12px;
    .span1 {
      margin-right: 5px;
      font-size: 16px;
    }
    .span2 {
      font-size: 13px;
      font-weight: bold;
      color: rgb(255, 80, 0);
    }
    .span3 {
      font-size: 17px;
      font-weight: bold;
      color: rgb(255, 80, 0);
    }
  }
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .cart-page {
    padding-bottom: calc(50px + env(safe-area-inset-bottom));
  }
  .cart-page.account-show {
    padding-bottom: calc(100px + env(safe-area-inset-bottom));
  }
  .account-detel-content {
    bottom: calc(45px + env(safe-area-inset-bottom));
  }
}
</style>
