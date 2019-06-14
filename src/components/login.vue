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
    <div class="mui-input-row btn-row">
      <mt-button type="danger" class="login-bt" @click="login">登陆</mt-button>
    </div>
    <div class="mui-input-row about">
      <input type="checkbox" v-model="ifRemember">
      <span>记住密码</span>
      <span class="register" @click="register">立即注册>></span>
    </div>
  </div>
</template>

<script>
import {postRequest, getValueByKey} from '../util/util'

export default {
  data () {
    return {
      name: '',
      password: '',
      // 是否记住密码
      ifRemember: false
      // 是否登陆
      // checked: false
    }
  },
  created () {
    this.getCookie()
  },
  methods: {
    login: function () {
      let _this = this
      postRequest('/login', {
        name: _this.name,
        password: _this.password
      }).then((res) => {
        // 成功登陆
        if (res.data.state) {
          if (this.ifRemember) {
            this.clearCookie()
            // if (this.name === '1' && this.password === '1') {
            this.$store.commit('check', true)
            this.$router.push('/home')
            this.setCookie(this.name, 0.1)
            // }
          } else {
            this.$store.commit('check', true)
            this.$router.push('/home')
          }
        } else {
          alert('用户名或密码错误')
        }
      })
    },
    register: function () {
      this.$router.push('/register')
    },
    setCookie: function (name, day) {
      var date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * day)
      window.document.cookie = 'name' + '=' + name + ';path=/;expires=' + date.toDateString()
      // window.document.cookie = 'password' + '=' + password + ';path=/;expires=' + date.toDateString()
    },
    getCookie: function () {
      var cookie = window.document.cookie
      var name = getValueByKey(cookie)
      if (name) {
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
    margin: 10px;
    .mui-input-row{
      margin-top: 5px;
    }
    .btn-row{
      .login-bt{
        display: block;
        margin: 0 auto;
        width: 100%;
        text-align: center;
      }
    }
    .about{
      line-height: 40px;
      span{
        font-size: 12px;
        color: #ccc;
      }
      .register{
        float: right;
      }
    }
  }
  .mint-button-text{
    width: 100% !important;
  }
</style>
