<template>
  <div class="tabBar-content">
    <div
      class="tabBar-item"
      :class="index == activeTab ? 'active' : ''"
      v-for="(item, index) in tabList"
      :key="index"
      @click="tabBarEvent(index)"
    >
      <i :class="item.icon" />
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import {
  Icon
} from 'vant'

export default {
  components: {
    [Icon.name]: Icon
  },
  props: {
    activeTab: {
      default: 0
    }
  },
  data () {
    return {
      tabList: [
        { title: '首页', icon: 'fa fa-home' },
        { title: '分类', icon: 'fa fa-reorder' },
        { title: '购物车', icon: 'fa fa-shopping-cart' },
        { title: '我的', icon: 'fa fa-user' }
      ]
    }
  },
  methods: {
    tabBarEvent (index) {
      this.$emit('tabBarChange', {
        index: index
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.tabBar-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 0;
  border-top: 1px solid #e7e7e7;
  background-color: #fff;
}
.tabBar-item {
  flex: 1;
  text-align: center;
  &.active {
    p, .fa {
      color: #eb3c3c;
    }
  }
  p {
    font-size: 12px;
    color: #5d656b;
  }
}
.fa {
  font-size: 22px;
  color: #5d656b;
}
</style>
