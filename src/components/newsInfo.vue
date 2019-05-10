<template>
  <div class="news-info">
    <h4 class="title">{{ data.title }}</h4>
    <div class="about">
      <span>发表时间：{{ data.publishTime }}</span>
      <span>点击次数：{{ data.clickTime }}次</span>
    </div>
    <p class="content">{{ data.content }}</p>
  </div>
</template>

<script>
import {request} from '../util/util'

export default {
  data () {
    return {
      id: this.$route.params.id,
      data: {}
    }
  },
  created: function () {
    // 设置异步，等到clickTime增加玩的文件写入后再执行这个
    setTimeout(() => {
      request('/newslist/' + this.id).then((res) => {
        this.data = res.data
      })
    }, 0)
  }
}
</script>

<style lang="less" scoped>
.news-info{
  margin-top: 10px;
  .title{
    line-height: 30px;
    text-align: center;
  }
  .about{
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    color: #007aff;
  }
}
</style>
