<template>
  <div class="news-info">
    <h4 class="title">{{ data.title }}</h4>
    <div class="about">
      <span>发表时间：{{ data.publishTime }}</span>
      <span>点击次数：{{ data.clickTime }}次</span>
    </div>
    <p class="content">{{ data.content }}</p>
    <!--评论模块-->
    <comment :comment="this.comment" @getMoreComment="getMoreComment"></comment>
  </div>
</template>

<script>
import {request} from '../util/util'
import comment from './comment'

export default {
  data () {
    return {
      id: this.$route.params.id,
      // 当前页面
      pageIndex: 1,
      // 评论
      comment: [],
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
    this.getComment()
  },
  methods: {
    getComment: function () {
      request(`/newsComment/${this.id}/${this.pageIndex}`).then((res) => {
        if (res.data.comment) {
          // 数组合并
          this.comment = this.comment.concat(res.data.comment)
        }
      })
    },
    getMoreComment: function () {
      this.pageIndex++
      this.getComment()
    }
  },
  components: {
    'comment': comment
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
