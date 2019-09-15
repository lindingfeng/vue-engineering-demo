<template>
  <div class="index-page">
    666
  </div>
</template>

<script>
import {
  Button,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data () {
    return {
      activeCollapse: []
    }
  },
  computed: {
    isValidloginState () {
      return this.$store.state.isValidloginState
    },
    avatar () {
      return this.$store.state.avatar
    }
  }
}
</script>

<style lang="postcss" scoped>
.index-page {
  /* min-height: 100vh;
  background-color: #f3f3f3; */
  box-sizing: border-box;
}
</style>
