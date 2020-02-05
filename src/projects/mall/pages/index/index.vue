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
      <shop-item :list="shopList" @shopTap="shopTap" />
    </div>
    <van-uploader multiple :after-read="afterRead" />
    <tab-bar :activeTab="activeTab" @tabBarChange="tabBarChange" />
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
  Uploader
} from 'vant'
import { mapState } from 'vuex'
import tabBar from '@@/components/tabBar'
import shopItem from '@@/components/shopItem'

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    tabBar,
    shopItem
  },
  data () {
    return {
      activeCollapse: [],
      images: [
        'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
        'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
      ],
      activeTab: 0,
      tabBarList: [ 'index', 'category', 'cart', 'account' ],
      pageIndex: 1
    }
  },
  computed: {
    ...mapState({
      isValidloginState: state => state.isValidloginState,
      avatar: state => state.avatar,
      shopList: state => state.shop.shopList
    })
  },
  methods: {
    shopTap (e) {
      const { shop_id } = e || {}
      this.$router.push({ path: `/shopDetail/${shop_id}` })
    },
    async uploadfile (formdata) {
      try {
        let ret = await this.$mallApi.uploadfile(formdata)
        if (+ret.data._errCode === 0) {
          console.log(ret.data)
        } else {
          console.log(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    },
    afterRead(file) {
      let formdata = new FormData()
      if (Array.isArray(file)) {
        file.forEach(ele => {
          formdata.append('lindf', ele.file)
        })
      } else {
        formdata.append('lindf', file.file)
      }
      this.uploadfile(formdata)
    },
    tabBarChange (ev) {
      const index = ev.index || 0
      if (index !== this.activeTab) {
        this.$router.push(this.tabBarList[index])
      }
    }
  },
  mounted () {
    console.log(this.$route.query, navigator.userAgent)
    const _this = this
    this.$store.dispatch('shop/getShopList', {
      success () {
        _this.pageIndex += 1
      }
    })
  }
}
</script>

<style lang="postcss" scoped>
.index-page {
  padding-bottom: 50px;
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
  padding: 6px;
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
