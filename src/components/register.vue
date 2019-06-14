<template>
  <div class="mui-input-group register">
    <div class="mui-input-row">
      <label>用户名：</label>
      <input v-model="name" type="text" class="mui-input-clear" placeholder="请输入用户名">
    </div>
    <div class="mui-input-row">
      <label>密码：</label>
      <input v-model="password" type="password" class="mui-input-clear mui-input-password" placeholder="请输入密码">
    </div>
    <div class="mui-input-row btn-row">
      <button type="button" class="mui-btn mui-btn-danger" @click="register">注册</button>
    </div>
    <div class="mui-input-row">
      <span class="toLogin" @click="toLogin">去登陆>></span>
    </div>
  </div>
</template>

<script>
import {postRequest} from '../util/util'

export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    register: function () {
      let _this = this
      postRequest('/register', {
        name: _this.name,
        password: _this.password
      }).then((res) => {
        if (!res.data.state) {
          alert(res.data.str)
        } else {
          alert('注册成功')
        }
      })
    },
    toLogin: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.register{
  margin: 10px;
  .btn-row{
    .mui-btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .mui-input-row{
    margin-top: 5px;
    .toLogin{
      float: right;
      line-height: 40px;
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
