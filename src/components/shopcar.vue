<template>
  <div class="shopcar">
    <!--购物车列表-->
    <div class="car-list">
      <div class="mui-card car-item" v-for="(item,index) in car" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch :value="item.selected" @change="changeSelected(item.goods.id)"></mt-switch>
            <img :src="item.goods.image[0]">
            <div class="info">
              <p class="name">{{ item.goods.name }}</p>
              <span class="price">￥{{ item.goods.newPrice }}</span>
              <number-box :num="item.count" @minus="minus(item.goods.id, item.count)" @plus="plus(item.goods.id)"></number-box>
              <span class="delete" @click="deleteCount(item.goods.id)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--结算区域-->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner clear">
          <div>
            <p>总计（不含运费）</p>
            <p>已勾选商品<span>{{ selectedCount }}</span>件，共计<span>{{ selectedPrice }}</span>元</p>
          </div>
          <mt-button type="danger">立即结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numberBox from './numberBox'
import {MessageBox} from 'mint-ui'

export default {
  data () {
    return {
      car: this.$store.getters.getCar
    }
  },
  created: function () {
  },
  methods: {
    minus: function (id, count) {
      // 此时数量为1点击后应判断数量为0的情况
      if (count === 1) {
        this.deleteCount(id)
        return
      }
      this.$store.commit('changeCount', {
        id: id,
        type: 'minus'
      })
    },
    plus: function (id) {
      this.$store.commit('changeCount', {
        id: id,
        type: 'plus'
      })
    },
    deleteCount: function (id) {
      MessageBox.confirm('确认删除吗?').then(action => {
        if (action === 'confirm') {
          this.$store.commit('deleteCount', id)
        }
      }).catch(err => {
        if (err === 'cancel') {
          return false
        }
      })
    },
    changeSelected: function (id) {
      this.$store.commit('changeSelected', id)
    }
  },
  computed: {
    selectedCount: function () {
      let ret = 0
      this.car.forEach((item) => {
        if (item.selected) {
          ret++
        }
      })
      return ret
    },
    selectedPrice: function () {
      let ret = 0
      this.car.forEach((item) => {
        if (item.selected) {
          ret += item.count * item.goods.newPrice
        }
      })
      return ret
    }
  },
  components: {
    numberBox
  }
}
</script>

<style lang="less" scoped>
.shopcar{
  .car-list{
    .car-item{
      .mui-card-content-inner{
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width: 60px;
          height: 60px;
        }
        .info{
          .name{
            margin: 0;
          }
          .price{
            color: #cf2d28;
          }
          .delete{
            color: #0062cc;
          }
        }
      }
    }
  }
  .clear{
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      color: #cf2d28;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
