<template>
  <div
    :class="{'c-app': true, 'is-web': IS_WEB}"
    v-loading="load.loading_count > 0"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)">
    <TitleBar></TitleBar>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  @import '~purecss/build/pure.css';
  @import '~element-ui/lib/theme-chalk/index.css';
  @import 'https://at.alicdn.com/t/font_919985_yq7p63k0tcc.css';

  html {
    height: 100vh;
    overflow: hidden;
  }

  body {
    font-family: 'Microsoft Yahei';
    position: relative;
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }

  .ib {
    display: inline-block;
  }

  .vat {
    vertical-align: top;
  }

  .vam {
    vertical-align: middle;
  }

  .tl {
    text-align: left;
  }

  .tc {
    text-align: center;
  }

  .tr {
    text-align: right;
  }

  img {
    vertical-align: middle;
  }

  .icon-yuwen:before { content: "\e654"; }
  .icon-shuxue:before { content: "\e645"; }
  .icon-yingyu:before { content: "\e652"; }
  .icon-shengwu:before { content: "\e62f"; }
  .icon-physic:before { content: "\e63d"; }
  .icon-chemistry:before { content: "\e650"; }
  .icon-zhengzhi:before { content: "\e655"; }
  .icon-dili:before { content: "\e60a"; }
  .icon-lishi:before { content: "\e602"; }
  .icon-guankan:before { content: "\e68d"; }
  .icon-pinglun:before { content: "\E7F5"; }
  .icon-bianji:before { content: "\e695"; }

  .c-app {
    width: 100vw;
    height: 100vh;
    background-image: url(http://file05.16sucai.com/2015/0615/0f9320e353671b9b02049dec80a7fde3.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .el-icon-loading {
    font-size: 36px;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(157,172,187,0.6);
  }
  ::-webkit-scrollbar-track {
    background-color: #e2e2e2;
  }

  .is-web {
    .c-login-page {
      margin: -300px 0 0 -150px !important;
      box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .1);
      .avatar {
        border-top: 0 !important;
      }
    }
  }
</style>

<script>
  import Vue from 'vue'
  import TitleBar from '@/components/TitleBar'
  import { Message, Loading } from 'element-ui'

  Vue.use(Loading.directive)

  export default {
    name: 'App',
    components: {
      TitleBar
    },
    data () {
      if (!process.env.IS_WEB) {
        require('electron').webFrame.setZoomFactor(1.0)
        require('electron').webFrame.setZoomLevel(0)
      }
      return {
        IS_WEB: process.env.IS_WEB,
        load: window.e.load
      }
    },
    created () {
      const vm = this

      vm.$http.get('/api/common/getIndex').then(function (ret) {
        if (ret.data.ok === 0) {
          vm.$store.commit('App/updateIndexes', {'indexes': ret.data.data.indexes})
        } else {
          Message({message: ret.data.msg, center: true})
        }
      }, function (ret) {
        Message({message: ret.data.msg, center: true})
      })

      window.e.$off('did-login')
      window.e.$on('did-login', function () {
        vm.$http.get('/api/common/getUserInfo').then(function (ret) {
          if (ret.data.ok === 0) {
            vm.$store.commit('Login/updateUserInfo', {'userInfo': ret.data.data})
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })

        vm.$http.get('/api/common/getMyPaper').then(function (ret) {
          if (ret.data.ok === 0) {
            var myPaperIds = []
            for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
              myPaperIds.push(ret.data.data.items[i]._id)
            }
            vm.$store.commit('Login/updateMyPaperIds', {'my_paper_ids': myPaperIds})
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })

        vm.$http.get('/api/common/getMyQuestionBasketIds').then(function (ret) {
          if (ret.data.ok === 0) {
            vm.$store.commit('Login/updateMyQuestionIds', {'my_question_ids': ret.data.data.my_question_ids})
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      })
    },
    mounted () {
      function confirm (tip, callback) {
        var div = document.createElement('div')
        div.innerHTML = '<style type="text/css">' +
          '.nbaMask { position: fixed; z-index: 100000; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); }' +
          '.nbaMaskTransparent { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; }' +
          '.nbaDialog { position: fixed; z-index: 500000; width: 80%; max-width: 300px; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background-color: #fff; text-align: center; border-radius: 0px; overflow: hidden; opacity: 1; color: white; }' +
          '.nbaDialog .nbaDialogHd { padding: .2rem .27rem .08rem .27rem; }' +
          '.nbaDialog .nbaDialogHd .nbaDialogTitle { font-size: 17px; font-weight: 400; }' +
          '.nbaDialog .nbaDialogBd { padding: 1rem; font-size: 18px; line-height: 1.3; word-wrap: break-word; word-break: break-all; color: #000000; }' +
          '.nbaDialog .nbaDialogFt { position: relative; line-height: 48px; font-size: 17px; display: -webkit-box; display: -webkit-flex; display: flex; }' +
          '.nbaDialog .nbaDialogFt:after { content: " "; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); }' +
          '.nbaDialog .nbaDialogBtn { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #ccc; text-decoration: none; -webkit-tap-highlight-color: transparent; position: relative; margin-bottom: 0; }' +
          '.nbaDialog .nbaDialogBtn:after { content: " "; position: absolute; left: 0; top: 0; width: 1px; bottom: 0; border-left: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleX(0.5); transform: scaleX(0.5); }' +
          '.nbaDialog .nbaDialogBtnPrimary { color: #409eff; }' +
          '.nbaDialog a { text-decoration: none; -webkit-tap-highlight-color: transparent; }' +
          '</style>' +
          '<div id="dialog" style="display: none">' +
          '<div class="nbaMask"></div>' +
          '<div class="nbaDialog">' +
          '<div class="nbaDialogHd">' +
          '<strong class="nbaDialogTitle"></strong>' +
          '</div>' +
          '<div class="nbaDialogBd" id="msg">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>' +
          '<div class="nbaDialogHd">' +
          '<strong class="nbaDialogTitle"></strong>' +
          '</div>' +
          '<div class="nbaDialogFt">' +
          '<a href="javascript:;" class="nbaDialogBtn nbaDialogBtnPrimary" id="ok">更新</a>' +
          '<a href="javascript:;" class="nbaDialogBtn" id="cancel">下次</a>' +
          '</div></div></div>'
        document.body.appendChild(div)

        var dialog = document.getElementById('dialog')
        dialog.style.display = 'block'

        var msg = document.getElementById('msg')
        msg.innerHTML = tip

        var ok = document.getElementById('ok')
        ok.onclick = function () {
          dialog.style.display = 'none'
          callback()
        }

        var cancel = document.getElementById('cancel')
        cancel.onclick = function () {
          dialog.style.display = 'none'
        }
      }

      if (!process.env.IS_WEB) {
        require('electron').ipcRenderer.on('message', (event, {message, data}) => {
          alert(message + ':' + JSON.stringify(data))
          if (message === 'is-update-now') {
            confirm('发现新版本，立即更新？', function () {
              require('electron').ipcRenderer.send('update-now')
            })
          }
        })
      }
    }
  }
</script>
