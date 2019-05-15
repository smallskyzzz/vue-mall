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
    car: []
  },
  mutations: {
    // 需要直接将state当做一个参数传进来
    addToShopCar: function (state, goodsInfo) {
      // 是否已经存在该商品
      let flag = false
      state.car.forEach((item) => {
        if (item.goods === goodsInfo.goods) {
          item.count += goodsInfo.count
          flag = true
        }
      })
      if (!flag) {
        state.car.push(goodsInfo)
      }
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
    }
  },
  plugins: debug ? [createLogger()] : []
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
