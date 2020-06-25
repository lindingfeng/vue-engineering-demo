<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { isWeChatEnv } from '@/utils/env'

const wxConfig = {
  title: '林定锋真帅~', // 分享标题6
  desc: '一顿操作猛如虎，一问工资1500~', // 分享描述
  link: 'https://mobile.lindf.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: 'https://s1.huishoubao.com/static/m/2017/img/two-logo.jpg', // 分享图标
}

export default {
  name: 'App',
  mounted () {
    if (isWeChatEnv) {
      this.$store.dispatch('getWxJsSignInfo', { wxConfig })
    }
  }
}
</script>

<!--
  内置4种css解析器，默认使用postcss。
  lang="postcss"、lang="scss"
  lang="less"、lang="stylus"
-->
<style lang="postcss">
@import '../../global/css/base.css';
.hidden {
  overflow: hidden !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
html {
  height: 100%;
  background-color: #f3f3f3;
}
body {
  font-family: -apple-system,Helvetica,sans-serif;
}
#app {
  /* background-color: #f3f3f3; */
}
.clearFix:after {
  content: '';
  display: block;
  clear: both;
}
.clearFix {
  zoom: 1;
}
</style>
