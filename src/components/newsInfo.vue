<template>
  <div class="news-info">
    <h4 class="title">{{ data.title }}</h4>
    <div class="about">
      <span>发表时间：{{ data.publishTime }}</span>
      <span>点击次数：{{ data.clickTime }}次</span>
    </div>
    <p class="content">{{ data.content }}</p>
    <!--评论模块-->
    <comment :comment="this.comment" @getMoreComment="getMoreComment" @addComment="addComment" ref="comment"></comment>
  </div>
</template>

<script>
import {request, postRequest} from '../util/util'
import comment from './comment'
import {Toast} from 'mint-ui'

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
    },
    addComment: function (commentValue) {
      postRequest('/addNewsComment', {
        id: this.id,
        name: this.name || '匿名用户',
        time: new Date(),
        data: commentValue
      }).then((res) => {
        if (res.data.state) {
          Toast('评论成功')
          // 此处当评论成功后有两种方式
          // 第一种直接回到评论第一页，看最新的5条评论
          // 第二种保留当前的评论数组，将最新的评论unshift到原来的数组上，模拟请求
          // 方便起见选择第一种
          this.$refs.comment.commentValue = ''
          this.comment = []
          this.pageIndex = 1
          this.getComment()
        }
      })
    }
  },
  components: {
    comment
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
