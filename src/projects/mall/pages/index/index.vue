<template>
  <div class="index-page">
    <!-- banner -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width: 100%;" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <div class="category-content">
      <van-swipe :loop="false" indicator-color="black">
        <van-swipe-item>
          <div class="category-item">
            <ul class="clearFix">
              <li v-for="(image, index) in 6" :key="index">
                <img src="https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png.webp" alt="">
                <p>超市</p>
              </li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品列表 -->
    <div class="shop-content">
      <ul class="clearFix">
        <li v-for="(item, index) in shopList" :key="index" class="shop-item">
          <div class="shop-item-content">
            <img :src="item.shop_banner[0]" alt="">
            <p>{{item.shop_name}}</p>
            <div class="price-sales">
              <span class="price-txt"><span>¥</span>{{item.shop_price}}</span>
              <span class="sales-txt">{{item.shop_sales}}人付款</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- test move -->
    <div class="move-ele" :style="moveStyle" @touchstart="touchstartHandle" @touchmove="touchmoveHandle"></div>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Button,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
} from 'vant'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data () {
    return {
      activeCollapse: [],
      images: [
        'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
        'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
      ],
      shopList: [],
      startPlaceX: 0,
      startPlaceY: 0,
      moveStyle: ''
    }
  },
  computed: {
    isValidloginState () {
      return this.$store.state.isValidloginState
    },
    avatar () {
      return this.$store.state.avatar
    }
  },
  methods: {
    async getShopList () {
      let ret = await this.$mallApi.getShopList()
      if (+ret.data._errCode === 0) {
        this.shopList = ret.data._data.shop_list
      }
    },
    touchstartHandle (e) {
      const diff = e.targetTouches[0].clientX - e.targetTouches[0].target.offsetLeft
      this.startPlaceX = e.targetTouches[0].clientX
      this.startPlaceY = e.targetTouches[0].clientY
    },
    touchmoveHandle (e) {
      const clientX = e.targetTouches[0].clientX
      const clientY = e.targetTouches[0].clientY
      const offsetLeft = e.targetTouches[0].target.offsetLeft
      const offsetTop = e.targetTouches[0].target.offsetTop
      const diffX = clientX - this.startPlaceX
      const diffY = clientY - this.startPlaceY
      this.moveStyle = `left: ${offsetLeft + diffX}px;top: ${offsetTop + diffY}px;`
      this.startPlaceX = clientX
      this.startPlaceY = clientY
      e.cancelBubble = true
      e.preventDefault()
    }
  },
  mounted () {
    this.getShopList()
    const arr = ['afg', 'adc', 'hyf', 'lkj'].sort()
    console.log(arr)
  }
}
</script>

<style lang="postcss" scoped>
.index-page {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.category-content {
  width: 100%;
  /* height: 160px; */
  background-color: #fff;
  
}
.category-item {
  height: 145px;
  &.more {
    height: 160px;
  }
  li {
    float: left;
    width: 20%;
    text-align: center;
    img {
      margin-top: 10px;
      width: 40px;
      height: 40px;
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #666;
    }
  }
}
.shop-content {
  padding: 0 6px;
}
.shop-item {
  float: left;
  width: 50%;
  margin-bottom: 6px;
  &:nth-child(2n+1) {
    padding-right: 3px;
  }
  &:nth-child(2n+2) {
    padding-left: 3px;
  }
}
.shop-item-content {
  width: 100%;
  /* height: 100px; */
  background-color: #fff;
  img {
    width: 100%;
  }
  p {
    margin: 5px;
    height: 32px;
    line-height: 16px;
    font-size: 13px;
    color: #232326;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  
    -webkit-box-orient: vertical;
  }
}
.price-sales {
  padding: 0 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price-txt {
    font-size: 16px;
    color: rgb(255, 80, 0);
    span {
      font-size: 10px;
    }
  }
  .sales-txt {
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
}
.move-ele {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background-color: #f00;
}
</style>
