<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goodsInfo(item)">
      <img :src="item.image[0]" alt="">
      <p class="name">{{ item.names }}</p>
      <div class="price">
        <span class="new-price">￥{{ item.newPrice }}</span>
        <span class="old-price">￥{{ item.oldPrice }}</span>
      </div>
      <div class="more">
        <span>{{ item.info }}</span>
        <span>剩余{{ item.Quantity }}件</span>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from '../util/util'

export default {
  data () {
    return {
      goodsList: []
    }
  },
  created: function () {
    request('/goodslist').then((res) => {
      this.goodsList = res.data.goods
    })
  },
  methods: {
    // 跳转到详情页
    goodsInfo: function (item) {
      this.$router.push('/home/goodsinfo/' + item.id)
      // this.$router.push({name: '/home/goodsinfo/' + item.id, params: {i: 123}})
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list{
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item{
    width: 49%;
    margin: 4px 0;
    border: 1px solid #ccc;
    box-shadow: 5px 5px 8px #ccc;
    img{
      width: 100%;
    }
    .name{
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
    }
    .price{
      .new-price{
        color: #cf2d28;
        font-size: 16px;
      }
      .old-price{
        margin-left: 20px;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
    .more{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #8f8f94;
    }
  }
}
</style>
