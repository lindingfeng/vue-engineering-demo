<template>
  <div class="shop-item-component">
    <ul class="clearFix">
      <li v-for="(item, index) in list" :key="index" class="shop-item" @click="shopEvent(item)">
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
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    shopEvent (item) {
      this.$emit('shopTap', item)
    }
  }
}
</script>

<style lang="postcss" scoped>
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
</style>
