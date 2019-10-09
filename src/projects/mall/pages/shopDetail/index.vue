<template>
  <div class="shop-list-page">
    <!-- banner -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img style="width: 100%;" :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {
  // Button,
  Swipe,
  SwipeItem,
  // ActionSheet,
  // Toast
} from 'vant';

export default {
  components: {
    // [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    // [ActionSheet.name]: ActionSheet,
    // [Toast.name]: Toast,
  },
  data () {
    return {
      images: [
        'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg',
        'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'
      ],
    }
  },
  methods: {
    // async uploadfile (formdata) {
    //   try {

    //     let ret = await this.$koa2Api.uploadfile(formdata)
    //     if (+ret.data._errCode === 0) {
    //       this.shopBanner.push(ret.data._data.src)
    //     } else {
    //       Toast.fail(ret.data._errStr)
    //     }

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  mounted () {
    const route = this.$route
    console.log(route)
  }
}
</script>

<style lang="postcss" scoped>
.shop-list-page {
  
}
</style>
