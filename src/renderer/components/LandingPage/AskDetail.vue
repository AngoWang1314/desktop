<template>
  <div class="ask-detail">
    <div class="back" @click="$router.back(-1)">返回列表</div>
    <div class="ask-container">
      <div class="content-container">
        <div class="img-container" v-show="pic">
          <img :src="'http://www.xuebabiji.club' + pic">
        </div>
        <div class="content" v-show="content">{{content}}</div>
      </div>
      <div class="content-bottom">
        <span class="viewed">{{viewCount}}<i class="icon iconfont icon-guankan"></i></span>
        <span class="answered">{{answerCount}}<i class="icon iconfont icon-pinglun"></i></span>
        <span class="answer" @click="showAnswerPanel()">回答</span>
      </div>
    </div>
    <div class="answers">
      <div class="item" v-for="item in answers" v-bind:key="item._id">
        <div class="left">
          <img :src="'http://www.xuebabiji.club' + item.avatar">
        </div>
        <div class="right">
          <img :src="'http://www.xuebabiji.club' + item.pic" v-show="item.pic"><br>
          <span>{{item.content}}</span>
        </div>
      </div>
      <div class="more" v-if="(answers_total / 20) > (answers.length / 20) && !show_loading" @click="more()">更多</div>
    </div>
    <div :class="{'bottom': true, 'show': answering, 'hide': !answering}">
      <div class="btn-container">
        <div class="add" v-show="!myPic">
          <form @submit.prevent="upload" method="post" enctype="multipart/form-data">
            <input type="file" name="picture" @change="onChange($event)">
          </form>
          <div class="plus">+</div>
        </div>
        <div class="img-container" v-show="myPic">
          <img :src="'http://www.xuebabiji.club' + myPic">
          <span class="mui-icon mui-icon-close" @click="removeMyPic()"></span>
        </div>
      </div>
      <textarea placeholder="请输入您的答案..." v-model="myContent"></textarea>
      <div class="operate-container">
        <button type="button" class="pure-button pure-button-primary" @click="answerProblem()">提交</button>
        <button type="button" class="pure-button" @click="hideAnswerPanel()">收起</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .ask-detail {
    height: 100%;
    padding: 10px;
    background-color: #fff;
    .back {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      padding: 5px;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-left: 0;
      cursor: pointer;
      background-color: #fff;
    }
    .ask-container {
      position: relative;
      border: 1px solid #ccc;
      .content-container {
        width: 100%;
        border: none;
        .img-container {
          overflow: auto;
        }
        .content {
          text-align: justify;
          margin: 5px;
          font-size: 16px;
          color: #545454;
        }
        img {
          width: 100%;
        }
      }
      .content-bottom {
        position: relative;
        text-align: left;
        height: 40px;
        line-height: 40px;
        color: #a5a5a5;
        border-top: 1px solid #f7f7f7;
        border-bottom: 1px solid #efefef;
        .iconfont {
          margin-left: 3px;
          vertical-align: middle;
        }
        .viewed {
          margin-left: 6px;
          font-size: 18px;
        }
        .answered {
          font-size: 18px;
        }
        .answer {
          position: absolute;
          right: 6px;
          font-size: 18px;
          color:#007aff;
          cursor: pointer;
        }
        i {
          margin-top: 10px;
          margin-right: 10px;
          font-size: 28px;
          vertical-align: middle;
        }
        .active {
          color: #007aff;
        }
      }
    }
    .answers {
      overflow: auto;
      .item {
        margin: 10px;
        .left {
          float: left;
          clear: both;
          width: 36px;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            overflow: hidden;
          }
        }
        .right {
          text-align: justify;
          min-height: 36px;
          line-height: 15px;
          margin-left: 41px;
          font-size: 14px;
          img {
            width: 100%;
            box-sizing: border-box;
            margin: 18px 0 5px 0;
            border-radius: 2px;
            border: 1px solid #f7f7f7;
          }
        }
      }
    }
    .comment-container {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: right;
      height: 45px;
      line-height: 36px;
      border-top: 1px solid #ebebeb;
      background-color: rgba(247, 247, 247, 0.95);
      input {
        position: absolute;
        top: 2px;
        right: 50px;
        bottom: 2px;
        left: 2px;
        width: 90%;
        padding-left: 10px;
      }
      .mui-icon-paperplane {
        position: absolute;
        top: 50%;
        right: 0;
        margin: -12px 8px 0 0;
        font-size: 24px;
      }
    }
    .bottom {
      position: fixed;
      right: 0px;
      bottom: 0px;
      left: 85px;
      z-index: 2;
      max-height: 100%;
      border: 1px solid #e0e0e0;
      overflow: auto;
      background-color: #fff;
      transition: bottom 1s;
      -moz-transition: bottom 1s;
      -webkit-transition: bottom 1s;
      -o-transition: bottom 1s;
      textarea {
        text-align: justify;
        width: 100%;
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
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'AskDetail',
    data () {
      var vm = this

      return {
        _id: vm.$route.params._id,
        answers: [],
        answers_total: 0,
        content: '',
        pic: '',
        viewCount: 0,
        answerCount: 0,
        answering: false,
        myContent: '',
        myPic: ''
      }
    },
    created () {
      this.getProblemDetail()
    },
    methods: {
      getProblemDetail () {
        const vm = this

        vm.$http.post('/api/common/addViewCount', {_id: vm.$route.params._id}).then(ret => {
          if (ret.data.ok === 0) {
            console.log('添加查看次数成功！')
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, response => {
          Message({message: '添加查看次数失败！', center: true})
        })

        vm.$http.get('/api/common/getProblemDetail', {
          params: {
            _id: vm.$route.params._id
          }
        }).then(ret => {
          if (ret.data.ok === 0) {
            vm.pic = ret.data.data.pic
            vm.content = ret.data.data.content
            vm.viewCount = ret.data.data.viewCount
            vm.answerCount = ret.data.data.answerCount
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, ret => {
          Message({message: '获取问题详情失败！', center: true})
        })

        vm.$http.get('/api/common/getAnswers?page=1&perpage=20&_id=' + vm.$route.params._id).then(ret => {
          if (ret.data.ok === 0) {
            vm.answers = ret.data.data.items
            vm.answers_total = ret.data.data.answers_total
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, response => {
          Message({message: '获取答案失败！', center: true})
        })
      },
      more: function () {
        var vm = this

        var totalpage = Math.ceil(vm.answers_total / 20)
        var page = vm.answers.length / 20

        if (page < totalpage) {
          vm.$http.get('/api/common/getAnswers?page=' + ++page + '&perpage=20&_id=' + vm.$route.params._id).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.answers = vm.answers.concat(ret.data.data.items)
              vm.answers_total = ret.data.data.answers_total
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      },
      answerProblem: function () {
        var vm = this

        if (!vm.myContent && !vm.myPic) {
          return Message({message: '请输入回答内容！', center: true})
        }

        vm.$http.post('/api/common/answerProblem', {
          type: 'answer',
          _id: vm.$route.params._id,
          content: vm.myContent,
          pic: vm.myPic
        }).then(ret => {
          if (ret.data.ok === 0) {
            vm.hideAnswerPanel()
            vm.myContent = ''
            vm.myPic = ''
            if (vm.answers.length >= 20) {
              vm.answers.pop()
            }
            vm.answers.unshift(ret.data.data.item)
            vm.answers_total++
            vm.answerCount++
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, ret => {
          Message({message: '评论失败！', center: true})
        })
      },
      removeMyPic: function () {
        var vm = this

        vm.myPic = ''
      },
      showAnswerPanel () {
        var vm = this

        if (!localStorage.getItem('token')) {
          if (!process.env.IS_WEB) {
            require('electron').ipcRenderer.send('logout')
          }
          this.$router.push('/')
          return
        }

        vm.answering = true
      },
      hideAnswerPanel () {
        var vm = this

        vm.answering = false
      },
      onChange: function (e) {
        var vm = this

        if (e.target.files && e.target.files[0]) {
          var formData = new FormData()
          formData.append('file', e.target.files[0])
          vm.$http.post('/api/common/uploadFile', formData).then(function (ret) {
            vm.myPic = ret.data.data.url
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      }
    }
  }
</script>
