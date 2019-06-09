<template>
  <div class="c-my-collect-video">
    <div class="result-container">
      <div class="back" @click="$router.back(-1)">返回列表</div>
      <div class="pure-g">
        <div class="pure-u-1-6" v-for="(item, index) in list" :key="index" :title="item.title"  @click="play(item)">
          <div class="item">
            <div class="img-container" :style="{'background-image': 'url(' + item.image_urls + ')'}"></div>
            <div class="description">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-my-collect-video {
    height: 100%;
    .result-container {
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      overflow: auto;
      .back {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-bottom: 0;
        border-left: 0;
        cursor: pointer;
        background-color: #fff;
      }
      .item {
        display: inline-block;
        width: 100%;
        height: 270px;
        padding: 5px;
        cursor: pointer;
        @media screen and (max-width: 1390px) {
          height: 175px;
        }
        .img-container {
          width: 100%;
          height: 240px;
          background-size: cover;
          background-position: center;
          border: 1px solid #d8d8d8;
          @media screen and (max-width: 1390px) {
            height: 145px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .description {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0px 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          white-space: nowrap;
          border: 1px solid #d8d8d8;
          border-top: 0;
        }
      }
    }
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'MyCollectVideo',
    data () {
      return {
        list: [],
        our_base_url: 'http://www.xuebabiji.club/player/desktop.html',
        iframe_src: ''
      }
    },
    created () {
      this.clickSearch()
    },
    methods: {
      enterSearch (e) {
        if (e.keyCode === 13) {
          this.clickSearch()
        }
      },
      clickSearch () {
        this.page = 1
        this.doSearch()
      },
      doSearch () {
        const vm = this

        vm.$http.get('/api/common/getMyCollectVideo').then(function (ret) {
          if (ret.data.ok === 0) {
            vm.list = ret.data.data.items
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      play (item) {
        const vm = this
        vm.iframe_src = vm.our_base_url + '?token=' + localStorage.getItem('token') + '&_id=' + item._id
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('open-window', vm.iframe_src)
        }
      },
      prev () {
        if (this.page >= 2) {
          this.page--
          this.doSearch()
        }
      },
      next () {
        if (Math.ceil(this.total / this.perpage) > this.page) {
          this.page++
          this.doSearch()
        }
      }
    }
  }
</script>
