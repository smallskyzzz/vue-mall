<template>
  <div class="loading" v-show="showFlag">
    <div class="image">
      <img src="../images/loading.gif">
    </div>
    <p>正在加载中...</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: true
    }
  },
  methods: {
    show: function () {
      this.showFlag = true
    },
    hide: function () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="less" scoped>
  .loading{
    margin-top: 100px;
    text-align: center;
  }
</style>
