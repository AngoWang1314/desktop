<template>
  <div class="c-my-ask">
    <div class="back" @click="$router.back(-1)">返回列表</div>
    <div v-if="asks.length > 0">
      <div class="list-item" v-for="item in asks" v-bind:key="item._id" @click="$router.push('/ask/ask-detail/' + item._id)">
        <img :src="'http://www.xuebabiji.club' + item.pic" v-show="item.pic">
        <div class="content" v-show="item.content">{{item.content}}</div>
        <div class="other">
          <span>{{item.viewCount}}人看过</span>
          &nbsp;&nbsp;
          <span>{{item.answerCount}}人回答</span>
          &nbsp;&nbsp;
          <span class="publish-time">{{item.createdAt | formatDate}}发布</span>
        </div>
      </div>
      <div class="more" v-if="(this.asks_total / 20) > (this.asks.length / 20) && !show_loading" @click="more()">更多</div>
    </div>
    <div class="flot" @click="showAddPanel()" v-show="!adding">问</div>
    <div :class="{'bottom': true, 'show': adding, 'hide': !adding}">
      <div class="btn-container">
        <div class="add" v-show="!pic">
          <form @submit.prevent="upload" method="post" enctype="multipart/form-data">
            <input type="file" name="picture" @change="onChange($event)">
          </form>
          <div class="plus">+</div>
        </div>
        <div class="img-container" v-show="pic">
          <img :src="'http://www.xuebabiji.club' + pic">
          <span class="mui-icon mui-icon-close" @click="removePic()"></span>
        </div>
      </div>
      <textarea placeholder="请输入您的问题..." v-model="content"></textarea>
      <div class="operate-container">
        <button type="button" class="pure-button pure-button-primary" @click="askProblem()">提交</button>
        <button type="button" class="pure-button" @click="hideAddPanel()">收起</button>
      </div>
    </div>
    <div class="tip" v-if="asks.length === 0">
      问题列表空空如也，<span class="jump" @click="showAddPanel()">我来提个问题</span>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-my-ask {
    height: 100%;
    overflow: auto;
    background-color: #fff;
    .back {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 5px;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-left: 0;
      cursor: pointer;
      background-color: #fff;
    }
    .list-item {
      margin: 5px;
      padding: 5px;
      font-size: 15px;
      color: #000;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid #efefef;
      &:active {
        background-color: #efefef;
      }
      img {
        width: 100%;
        margin-bottom: 5px;
      }
      .content {
        text-align: justify;
        margin: 0 0 5px;
        color: #545454;
      }
      .other {
        text-align: left;
        font-size: 14px;
        color: #c5c5c5;
        .publish-time {
          float: right;
          margin-right: 5px;
        }
      }
    }
    .flot {
      position: fixed;
      right: 80px;
      bottom: 60px;
      width: 40px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #fff;
      border: 1px solid #007aff;
      border-radius: 21px;
      background-color: #007aff;
      cursor: pointer;
    }
    .bottom {
      position: fixed;
      right: 0px;
      bottom: 0px;
      left: 85px;
      max-height: 100%;
      border: 1px solid #e0e0e0;
      overflow: auto;
      background-color: #fff;
      transition: bottom 1s;
      -moz-transition: bottom 1s;
      -webkit-transition: bottom 1s;
      -o-transition: bottom 1s;
      textarea {
        width: 100%;
        text-align: justify;
        height: 110px;
        margin-bottom: 0;
        padding: 5px;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
      }
      .btn-container {
        text-align: center;
        .add {
          margin: 15px 0;
          font-size: 40px;
          form {
            position: relative;
            z-index: 10;
            opacity: 0;
          }
          .plus {
            position: absolute;
            top: 20px;
            z-index: 1;
            width: 100%;
            color: #ababab;
          }
        }
        .img-container {
          position: relative;
          img {
            width: 100%;
          }
          .mui-icon-close {
            position: absolute;
            top: 0;
            right: 0;
            color: red;
          }
        }
      }
      .operate-container {
        margin: 15px 0;
        text-align: center;
      }
    }
    .show {
      bottom: 0px;
    }
    .hide {
      bottom: -100%;
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
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'MyAsk',
    data () {
      return {
        asks: [],
        asks_total: 0,
        content: '',
        pic: '',
        adding: false
      }
    },
    filters: {
      formatDate: function (val) {
        var value = new Date(val)
        var year = value.getFullYear()
        var month = value.getMonth() + 1
        var day = value.getDate()
        var hour = value.getHours()
        var minutes = value.getMinutes()
        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
      }
    },
    created () {
      this.getAsks()
    },
    methods: {
      getAsks () {
        const vm = this

        vm.$http.get('/api/common/getMyProblem').then(function (ret) {
          if (ret.data.ok === 0) {
            vm.asks = ret.data.data.items
            vm.asks_total = ret.data.data.asks_total
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      removePic () {
        var vm = this

        vm.pic = ''
      },
      showAddPanel () {
        var vm = this

        if (!localStorage.getItem('token')) {
          if (!process.env.IS_WEB) {
            require('electron').ipcRenderer.send('logout')
          }
          this.$router.push('/')
          return
        }

        vm.adding = true
      },
      hideAddPanel () {
        var vm = this

        vm.adding = false
      },
      askProblem () {
        var vm = this

        if (!vm.content && !vm.pic) {
          return Message({message: '请输入问题内容！', center: true})
        }

        vm.$http.post('/api/common/askProblem', {
          content: vm.content,
          pic: vm.pic
        }).then(function (ret) {
          vm.adding = false

          vm.asks_total++

          if (vm.asks.length >= 20) {
            vm.asks.pop()
          }
          vm.asks.unshift({_id: ret.data.data._id, content: vm.content, pic: vm.pic, viewCount: 0, answerCount: 0, createdAt: (new Date()).getTime()})

          vm.content = ''
          vm.pic = ''
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      onChange (e) {
        var vm = this

        if (e.target.files && e.target.files[0]) {
          var formData = new FormData()
          formData.append('file', e.target.files[0])
          vm.$http.post('/api/common/uploadFile', formData).then(function (ret) {
            vm.pic = ret.data.data.url
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      }
    }
  }
</script>
