// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUi from 'mint-ui'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import 'mint-ui/lib/style.css'
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false
Vue.use(MintUi)
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
  state: {
    // 购物车中的商品数据
    // 这样写就不会出现observer对象
    car: JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('car')))) || [],
    // 是否登陆
    checked: false
  },
  mutations: {
    // 需要直接将state当做一个参数传进来
    addToShopCar: function (state, goodsInfo) {
      // 是否已经存在该商品
      let flag = false
      state.car.forEach((item) => {
        if (item.goods.id === goodsInfo.goods.id) {
          item.count += goodsInfo.count
          flag = true
        }
      })
      if (!flag) {
        state.car.push(goodsInfo)
      }
      // 更新car之后将其存入本地localstorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 增加减少购物车数量
    changeCount: function (state, data) {
      state.car.forEach((item) => {
        if (item.goods.id === data.id) {
          data.type === 'plus' ? item.count++ : item.count--
        }
      })
      // 更新car之后将其存入本地localstorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 删除某一项
    deleteCount: function (state, id) {
      state.car.forEach((item, index) => {
        if (item.goods.id === id) {
          state.car.splice(index, 1)
        }
      })
      // 更新car之后将其存入本地localstorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 改变是否选中状态
    changeSelected: function (state, id) {
      state.car.forEach((item) => {
        if (item.goods.id === id) {
          item.selected = !item.selected
        }
      })
    },
    // 登陆后
    check: function (state, flag) {
      state.checked = flag
    }
  },
  // 相当于计算属性，或者说filters
  getters: {
    getAllCount: function (state) {
      let count = 0
      state.car.forEach((item) => {
        count += item.count
      })
      return count
    },
    getCar: function (state) {
      return state.car
    },
    getChecked: function (state) {
      return state.checked
    }
  },
  plugins: debug ? [createLogger()] : []
})

router.beforeEach((to, from, next) => {
  console.log(to.path, JSON.parse(JSON.stringify(store.state)).checked)
  if (to.path !== '/' && to.path !== '/register') {
    // alert(vm)
    if (!JSON.parse(JSON.stringify(store.state)).checked) {
      // alert('请登录')
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
