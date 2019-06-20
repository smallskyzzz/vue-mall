<template>
  <div class="imageShare">
    <div class="mui-content">
      <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a v-for="(item, i) in list" :key="i" class="mui-control-item" :class="i === 0 ? 'mui-active' : ''" @click="changeNow(item)">
              {{ item }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <ul class="images">
      <li v-for="(item, i) in images" :key="i" class="image">
        <router-link :to="'/home/imageShare/' + item.item + '/' +item.id">
          <img :src="item.img" class="img" />
          <p class="text" :title="item.desc">{{ item.desc }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from '../lib/mui/js/mui.js'
import {request} from '../util/util'

export default {
  data () {
    return {
      list: ['全部', '热点', '娱乐', '合肥', 'nba', '综艺'],
      // 当前处于哪个分类
      now: '全部',
      // 当前分类的图片
      images: []
    }
  },
  mounted: function () {
    // 这里必须等dom加载完毕才初始化滚动组件
    mui('.mui-scroll-wrapper').scroll({
      scrollX: true,
      deceleration: 0.0005
    })
    this.changeNow('全部')
  },
  methods: {
    changeNow: function (now) {
      this.now = now
      request('/imagelist/' + this.now).then((res) => {
        // console.log(res, res.data)
        this.images = res.data.images
        // console.log(this.images)
      })
    }
  }
  // watch: {
  //   now: function (newVal) {
  //     alert(newVal)
  //   }
  // }
}
</script>

<style lang="less" scoped>
.imageShare{
  .images{
    margin: 10px;
    padding: 0;
    list-style: none;
    .image{
      position: relative;
      margin-top: 5px;
      .img{
        width: 100%;
        height: 300px;
        border-radius: 20px;
        /*opacity: .5;*/
      }
      .text{
        position: absolute;
        display: inline-block;
        width: 100%;
        bottom: 10px;
        margin: 0;
        padding: 0 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: white;
        background-color: #222;
      }
    }
  }
}
</style>
