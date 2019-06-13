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
export default {
}
</script>

<style scoped>

</style>
