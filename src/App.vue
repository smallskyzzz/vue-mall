<template>
  <div id="app">
    <!--顶部header-->
    <mt-header fixed="" title="vue-mall">
      <span slot="left" @click="goBack" v-show="flag && login">
        <mt-button icon="back">返回</mt-button>
      </span>
      <span slot="right" @click="out" v-show="login">
        <mt-button>退出</mt-button>
      </span>
    </mt-header>
    <!--router-view-->
    <transition>
      <router-view></router-view>
    </transition>
    <!--tab-->
    <nav class="mui-bar mui-bar-tab" v-show="login">
      <router-link to="/home" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/shopcar" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ this.$store.getters.getAllCount }}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="search" class="mui-tab-item-llb">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 是否显示返回按钮
      flag: true,
      // 是否登陆
      login: false
    }
  },
  created: function () {
    this.flag = this.$route.path !== '/home'
    // if (this.$route.path === '/home') {
    //   this.flag = false
    // } else {
    //   this.flag = true
    // }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    out: function () {
      window.document.cookie = 'name='
      this.$store.commit('check', false)
      this.$router.push('/')
    }
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    '$store.getters.getChecked': function (newVal) {
      this.login = newVal
    }
  }
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

  // 修改类名，解决点击tabbar无效问题
  .mui-bar-tab .mui-tab-item-llb.mui-active{
    color: #007aff;
  }

  .mui-bar-tab .mui-tab-item-llb{
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item-llb .mui-icon{
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label{
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
