<!--评论模块-->
<template>
  <div class="comment">
    <h3>评论模块</h3>
    <hr>
    <textarea v-model="commentValue" placeholder="请输入评论（最多120字）" maxlength="120"></textarea>
    <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
    <div class="comment-list">
      <div class="list-item"  v-for="(item, index) in this.comment" :key="index">
        <div class="title">
          第{{index + 1}}楼&nbsp;&nbsp;用户:{{item.name}}&nbsp;&nbsp;发表时间：{{item.time}}
        </div>
        <div class="body">
          {{item.data}}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMoreComment">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
  props: [
    // 传入的评论信息
    'comment'
  ],
  data () {
    return {
      'commentValue': ''
    }
  },
  methods: {
    getMoreComment: function () {
      this.$emit('getMoreComment')
    },
    addComment: function () {
      if (!this.commentValue.trim()) {
        Toast('输入不能为空')
        this.commentValue = ''
        return
      }
      this.$emit('addComment', this.commentValue)
    }
  }
}
</script>

<style lang="less" scoped>
.comment{
  h3{
    font-size: 16px;
  }
  textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .comment-list{
    margin: 5px 0;
    .list-item{
      font-size: 13px;
      .title{
        line-height: 30px;
        background-color: #ccc;
      }
      .body{
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
