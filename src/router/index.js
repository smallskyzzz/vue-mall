import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Member from '../components/member'
import Shopcar from '../components/shopcar'
import Search from '../components/search'
import newsList from '../components/newsList'
import newsInfo from '../components/newsInfo'
import goodsList from '../components/goodslist'
import goodsInfo from '../components/goodsinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/shopcar',
      component: Shopcar
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/newslist',
      component: newsList
    },
    {
      path: '/home/newsinfo/:id',
      component: newsInfo
    },
    {
      path: '/home/goodslist',
      component: goodsList
    },
    {
      path: '/home/goodsInfo/:id',
      component: goodsInfo
    }
  ],
  // 覆盖默认的路由高亮类
  linkActiveClass: 'mui-active'
})
