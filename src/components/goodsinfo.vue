<template>
  <div class="goods-info">
    <div class="mui-card banner">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000" class="swipe">
            <mt-swipe-item v-for="(item,index) in goods.image" :key="index">
              <img :src='item'>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card title">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h3 class="name">{{ goods.name }}</h3>
          <hr>
          <p>销售价：￥{{ goods.newPrice }}</p>
          <div>购买数量：
            <number-box></number-box>
          </div>
          <div class="shop">
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card info">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h3 class="name">商品参数</h3>
          <hr>
          <p>商品货号：dsavd12334112</p>
          <p>库存情况：{{ goods.Quantity }}件</p>
          <p>上架时间：2018-02-16 00:00:00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '../util/util'
import numberBox from './numberBox'

export default {
  data () {
    return {
      goods: {}
    }
  },
  created: function () {
    // 次数需要再次请求该商品数据（重复请求）
    // 优化可以将之前的商品数据存入vuex中则不需要再次请求
    request('/goodslist/' + this.$route.params.id).then((res) => {
      this.goods = res.data
    })
  },
  components: {
    numberBox
  }
}
</script>

<style lang="less" scoped>
.goods-info{
  .banner{
    .swipe{
      height: 300px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .title{
    hr{
      margin-left: -15px;
      margin-right: -15px;
      border-bottom: 1px solid #ccc;
    }
    .shop{
      margin-top: 10px;
    }
  }
}
</style>
