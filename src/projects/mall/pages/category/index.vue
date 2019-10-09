<template>
  <div class="category-page">
    <div class="scroll-left" ref="scrollLeft">
      <div class="scroll-left-content">
        <p
          class="category-item"
          :class="activeCategory === index ? 'active' : ''"
          v-for="(item, index) in categoryList"
          :key="index"
          @click="chooseCategory(item.category_id)"
        >{{item.category_name}}</p>
      </div>
    </div>
    <div class="scroll-right" ref="scrollRight">
      <div class="scroll-right-content">
        <!-- 广告位 -->
        <div class="ad-content">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img style="width: 100%;" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 商品列表 -->
        <div class="shop-content">
          <shop-item :list="shopList" @shopTap="shopTap" />
        </div>
      </div>
    </div>
    <tab-bar :activeTab="activeTab" @tabBarChange="tabBarChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import tabBar from '@@/components/tabBar'
import shopItem from '@@/components/shopItem'
import BScroll from '@better-scroll/core'
import {
  Swipe,
  SwipeItem
} from 'vant'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    tabBar,
    shopItem
  },
  computed: {
    ...mapState({
      categoryList: state => state.shop.categoryList
    })
  },
  data () {
    return {
      bsLeft: null,
      bsRight: null,
      activeTab: 1,
      activeCategory: 0,
      tabBarList: [ 'index', 'category', 'cart', 'account' ],
      // categoryList: [
      //   { category_name: '手机' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      //   { category_name: '电脑' },
      // ],
      images: [
        'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
        'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
      ],
      shopList: []
    }
  },
  methods: {
    async getShopList () {
      let ret = await this.$mallApi.getShopList()
      if (+ret.data._errCode === 0) {
        this.shopList = ret.data._data.shop_list
        if (!this.bsRight) {
          this.$nextTick(() => {
            this.initBS({
              ele: 'bsRight',
              selector: '.scroll-right',
              options: {
                scrollY: true,
                click: true
              }
            })
          })
        }
      }
    },
    initBS (option) {
      const { ele, selector, options } = option
      this[ele] = new BScroll(selector, options)
    },
    tabBarChange (ev) {
      const index = ev.index || 0
      if (index !== this.activeTab) {
        this.$router.push(this.tabBarList[index])
      }
    },
    chooseCategory (category_id, ev) {
      if (this.activeCategory !== index) {
        this.activeCategory = index
        this.$store.dispatch('shop/getShopList', {
          category_id,
          success () {
            _this.pageIndex += 1
          }
        })
      }
    },
    shopTap (e) {
      console.log(e)
    }
  },
  mounted () {
    this.getShopList()
    this.$store.dispatch('shop/getCategoryList', {})
    this.$nextTick(() => {
      this.initBS({
        ele: 'bsLeft',
        selector: '.scroll-left',
        options: {
          scrollY: true,
          click: true,
          bounce: {
            top: false,
            bottom: false,
          }
        }
      })
    })
  }
}
</script>

<style lang="postcss" scoped>
.category-page {

}
.scroll-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 45px;
  width: 90px;
  text-align: center;
  overflow: hidden;
}
.scroll-right {
  position: absolute;
  left: 90px;
  right: 0;
  top: 0;
  bottom: 45px;
  background-color: #fff;
  li {
    height: 50px;
  }
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .scroll-left {
    bottom: calc(45px + env(safe-area-inset-bottom));
  }
  .scroll-right {
    bottom: calc(45px + env(safe-area-inset-bottom));
  }
}
.category-item {
  position: relative;
  line-height: 40PX;
  &.active {
    background-color: #fff;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      top: 50%;
      width: 4px;
      height: 14px;
      margin-top: -7px;
      background-color: #eb3c3c;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
}
.shop-content,
.ad-content {
  padding: 0 6px;
}
.ad-content {
  margin-bottom: 6px;
}
</style>
