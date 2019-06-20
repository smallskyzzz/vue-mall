<template>
  <div class="imageShareItem">
    <!--<img class="preview-img" v-for="(item, i) in list" :src="item.src" height="100px" @click="$preview.open(index, i)" :key="i">-->
    <vue-preview class="images" :slides="JSON.parse(JSON.stringify(this.list))" @close="handleClose"></vue-preview>
  </div>
</template>

<script>
import {request} from '../util/util'

export default {
  data () {
    return {
      id: this.$route.params.id,
      // 对应的信息
      info: {},
      list: []
    }
  },
  created () {
    request('/imagelist/' + this.id).then((res) => {
      this.info = res.data.images
      // console.log(this.info)
    }).then(() => {
      this.info.imgs.forEach((item) => {
        this.list.push({
          src: item,
          msrc: item,
          w: 600,
          h: 400
        })
      })
      this.list = JSON.parse(JSON.stringify(this.list))
      console.log(JSON.parse(JSON.stringify(this.list)))
    })
  },
  methods: {
    handleClose: function () {
      console.log('close')
    }
  }
}
</script>

<style lang="less" scoped>
.imageShareItem{
    /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
