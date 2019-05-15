<template>
  <div id="app">
    <!--顶部header-->
    <mt-header fixed="" title="vue-mall"></mt-header>
    <!--router-view-->
    <transition>
      <router-view></router-view>
    </transition>
    <!--tab-->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/shopcar" class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ this.$store.getters.getAllCount }}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="search" class="mui-tab-item">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
  *{
    touch-action: pan-y;
  }
  #app{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }

  .v-enter,.v-leave-to{
    transform: translateX(100%);
    opacity: 0;
  }
  .v-enter-active{
    transition: all .5s ease;
  }
  // 瞬间不见，否则动画效果会有错乱
  // 或者将leave-to拿出来加上absolute
  .v-leave-active{
    transition: all 0s ease;
  }
</style>
