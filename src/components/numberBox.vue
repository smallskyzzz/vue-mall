<template>
  <div class="number-box">
    <mt-button class="mui-btn" @click="minus" ref="minus">-</mt-button>
    <input class="input" v-model="num"/>
    <mt-button class="mui-btn" @click="plus">+</mt-button>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      default: 0
    },
    num: {
      default: 0
    }
  },
  mounted: function () {
    if (this.num === (this.min || 0)) {
      this.setMinusDisabled()
    }
  },
  methods: {
    minus: function () {
      // if (this.num === (this.min)) {
      //   return
      // }
      // 子组件不能改变props的值，派发给父组件处理
      // this.num--
      this.$emit('minus')
    },
    plus: function () {
      this.$emit('plus')
    },
    setMinusDisabled: function () {
      // 增加一个类名
      this.$refs.minus.$el.classList.add('disabled')
    },
    getNum: function () {
      return this.num
    }
  },
  watch: {
    num (newVal) {
      if (newVal === (this.min || 0)) {
        this.setMinusDisabled()
      } else {
        this.$refs.minus.$el.classList.remove('disabled')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .number-box{
    display: inline-block;
    font-size: 0;
    .input{
      display: inline-block;
      width: 50px;
      height: 41px;
      padding: 10px 0;
      border: 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;
    }
    button.disabled{
      color: silver;
    }
  }
</style>
