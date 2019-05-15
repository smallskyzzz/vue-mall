<template>
  <div class="news-list">
    <!--loading模块-->
    <loading ref="loading"></loading>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item, index) in newsList" :key="index" @click="addClickTime(item.id)">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.publishTime }}</span>
              <span>点击：{{ item.clickTime }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {request} from '../util/util'
import loading from './loading'

export default {
  data () {
    return {
      newsList: []
    }
  },
  created: function () {
    request('/newslist').then((res) => {
      this.newsList = res.data.newslist
      this.$refs.loading.hide()
    })
  },
  methods: {
    addClickTime: function (id) {
      request('/addClickTime/' + id)
    }
  },
  components: {
    loading
  }
}
</script>

<style lang="less" scoped>
.mui-table-view{
  padding-bottom: 50px;
  li{
    h1{
      font-size: 14px;
    }
    .mui-ellipsis{
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
