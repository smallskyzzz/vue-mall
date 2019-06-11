<template>
  <div class="mui-input-group login">
    <div class="mui-input-row">
      <label>用户名：</label>
      <input v-model="name" type="text" class="mui-input-clear" placeholder="请输入用户名">
    </div>
    <div class="mui-input-row">
      <label>密码：</label>
      <input v-model="password" type="password" class="mui-input-clear mui-input-password" placeholder="请输入密码">
    </div>
    <div class="mui-input-row">
      <mt-button type="danger" class="login-bt" @click="login">登陆</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: ''
      // 是否登陆
      // checked: false
    }
  },
  created () {
    this.getCookie()
  },
  methods: {
    login: function () {
      this.clearCookie()
      if (this.name === '1' && this.password === '1') {
        this.$store.commit('check', true)
        this.$router.push('/home')
        this.setCookie(this.name, 0.1)
      }
    },
    setCookie: function (name, day) {
      var date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day)
      window.document.cookie = 'name' + '=' + name + ';path=/;expires=' + date.toDateString()
      // window.document.cookie = 'password' + '=' + password + ';path=/;expires=' + date.toDateString()
    },
    getCookie: function () {
      var cookie = window.document.cookie
      if (cookie.split('=')[1]) {
        this.$store.commit('check', true)
        this.$router.push('/home')
      }
    },
    clearCookie: function () {
      this.setCookie('', -1)
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    .login-bt{
      display: block;
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }
  .mint-button-text{
      width: 100% !important;
    }
</style>
