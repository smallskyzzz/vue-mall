<template>
  <div>
    <mt-swipe :auto="4000" class="swipe">
      <mt-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src='item.src'>
      </mt-swipe-item>
    </mt-swipe>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/imageShare">
            <img src="../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {request} from '../util/util'
export default {
  data () {
    return {
      banner: []
    }
  },
  created: function () {
    request('/banner').then((res) => {
      this.banner = res.data.banner
    })
  }
}
</script>

<style lang="less" scoped>
  .swipe{
    height: 200px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mui-content{
    border: none;
    font-size: 13px;
    img{
      width: 60px;
      height: 60px;
    }
    .mui-media-body{
      font-size: 12px !important;
    }
  }
</style>
