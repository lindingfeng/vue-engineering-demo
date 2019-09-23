<template>
  <div class="index-page">
    <div class="move-ele" :style="moveStyle" @touchstart="touchstartHandle" @touchmove="touchmoveHandle"></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      startPlaceX: 0,
      startPlaceY: 0,
      moveStyle: ''
    }
  },
  methods: {
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
  }
}
</script>

<style lang="postcss" scoped>
.move-ele {
  position: fixed;
  left: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background-color: #f00;
}
</style>
