<template>
  <div class="c-my-collect-video">
    <div class="result-container">
      <div class="back" @click="$router.back(-1)">返回列表</div>
      <div class="pure-g">
        <div class="pure-u-1-6" v-for="(item, index) in list" :key="index" :title="item.title"  @click="play(item)">
          <div class="item">
            <img class="delete" @click.stop="del(item, index)" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVUlEQVRYR+2WS0rEQBRFz12BK3AbLsCRI/HTYktriw2uyYEifvADfhEEh27INVx5UA0xdHdS6UE5SE0ySdU7ue/dWxGFlwrXpwfoFfjfCtheA1YlvXRxi+1d4EfS97z9CxWwvQM8AWNJdzkQtifAOTCQ9NYJIDbZHgOXwHFbCNsj4AY4kRTPuavVDFQghpKeFx1oewA8ApOm4nFOK4CKEhdJ0o9ZEKn4fWpZQDSu1gAJYghcA3uS/kDY3kzzEq1qVTxLgemn2A6IK2BL0lcC2wDegYNFAzdLjiwFKhDbQLgiXBIrbHqYW7yTAjWI2zAKEMP52djwGS90UiDJHipMLRY5MdfrS9uwfoDtegtegVEXiGwFig5hKl7GhikNywRR0Si2fQqcFbmMbO8DD8BR25uwkhPLX8e214GVLvZKWbHcD0mXZMvdk50DuQWa3u8BegWKK/ALI6ChIZ3ISgcAAAAASUVORK5CYII=">
            <div class="img-container" :style="{'background-image': 'url(' + item.image_urls + ')'}"></div>
            <div class="description">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip" v-if="list.length === 0">
      您该还没有收藏的视频哦！<span class="jump" @click="$router.push('/vdo')">立即观看</span>
    </div>
    <div class="layer" v-if="is_playing">
    </div>
    <div class="iframe-container" v-if="is_playing">
      <iframe allowfullscreen="allowfullscreen" :src="iframe_src"></iframe>
      <img class="close" @click="stop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVUlEQVRYR+2WS0rEQBRFz12BK3AbLsCRI/HTYktriw2uyYEifvADfhEEh27INVx5UA0xdHdS6UE5SE0ySdU7ue/dWxGFlwrXpwfoFfjfCtheA1YlvXRxi+1d4EfS97z9CxWwvQM8AWNJdzkQtifAOTCQ9NYJIDbZHgOXwHFbCNsj4AY4kRTPuavVDFQghpKeFx1oewA8ApOm4nFOK4CKEhdJ0o9ZEKn4fWpZQDSu1gAJYghcA3uS/kDY3kzzEq1qVTxLgemn2A6IK2BL0lcC2wDegYNFAzdLjiwFKhDbQLgiXBIrbHqYW7yTAjWI2zAKEMP52djwGS90UiDJHipMLRY5MdfrS9uwfoDtegtegVEXiGwFig5hKl7GhikNywRR0Si2fQqcFbmMbO8DD8BR25uwkhPLX8e214GVLvZKWbHcD0mXZMvdk50DuQWa3u8BegWKK/ALI6ChIZ3ISgcAAAAASUVORK5CYII=">
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
        position: relative;
        display: inline-block;
        width: 100%;
        padding: 5px;
        cursor: pointer;
        .delete {
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
          background-color: red;
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
    .tip {
      text-align: center;
      margin-top: 200px;
      font-size: 18px;
      .jump {
        color:#007aff;
        cursor: pointer;
      }
    }
    .layer {
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: 100000;
      background: transparent;
    }
    .iframe-container {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 100001;
      width: 1120px;
      height: 480px;
      margin: -240px 0 0 -560px;
      border: 1px solid #ccc;
      iframe {
        width: 100%;
        height: 100%;
        border: 0px solid #ccc;
        overflow: hidden;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
</style>

<script>
  import { Message, MessageBox } from 'element-ui'

  export default {
    name: 'MyCollectVideo',
    data () {
      return {
        list: [],
        our_base_url: process.env.IS_WEB ? location.protocol + '//www.xuebabiji.club/player/desktop.html' : 'http://www.xuebabiji.club/player/desktop.html',
        iframe_src: '',
        is_playing: false
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
        } else {
          vm.is_playing = true
        }
      },
      stop () {
        this.is_playing = false
      },
      del (item, index) {
        var vm = this

        MessageBox.confirm('确定移除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post('/api/common/delMyCollectVideo', {
            _id: item._id
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.list.splice(index, 1)
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
