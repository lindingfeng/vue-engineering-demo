<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // this.$store.dispatch('checkLoginState')
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
