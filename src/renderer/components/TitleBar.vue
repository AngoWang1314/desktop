<template>
  <div class="c-title-bar" v-show="$route.name !== 'LoginPage' || !IS_WEB">
    <div :class="{'app-name': true, 'right-border': $route.name !== 'LoginPage'}">{{ appName }}</div>
    <div class="operation" @dblclick="toggleWindow">
      <div class="ib minimize" @click.stop="minWindow" v-show="!IS_WEB">
        <i class="iconfont icon-zuixiaohua"></i>
      </div><div class="ib maximize-restore" v-show="$route.name !== 'LoginPage' && !IS_WEB" @click.stop="toggleWindow">
        <i :class="{'iconfont': true, 'icon-zuidahua': !is_fullscreen, 'icon-zuidahua2': is_fullscreen}"></i>
      </div><div class="ib close" @click.stop="closeWindow" v-show="!IS_WEB">
        <i class="iconfont icon-close"></i>
      </div><div title="退出登录" class="ib logout" @click="doLogout" v-show="IS_WEB">
        <i class="iconfont icon-iconfontguanji"></i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-title-bar {
    width: 100%;
    height: 42px;
    line-height: 42px;
    color: #ffffff;
    background-color: #409eff;
    -webkit-app-region: drag;
    .app-name {
      float: left;
      width: 85px;
      text-align: center;
      -webkit-app-region: no-drag;
    }
    .right-border {
      border-right: 1px solid #3a98f9;
    }
    .operation {
      margin-left: 85px;
      text-align: right;
      .minimize, .maximize-restore, .close, .logout {
        position: relative;
        z-index: 1000;
        width: 42px;
        height: 42px;
        text-align: center;
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
      .minimize, .maximize-restore, .logout {
        &:hover {
          background-color: #6eb5ff;
        }
      }
      .close {
        &:hover {
          background-color: red;
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'TitleBar',
    data () {
      return {
        'appName': '学霸笔迹',
        'is_fullscreen': false,
        'listener': null,
        'IS_WEB': process.env.IS_WEB
      }
    },
    created () {
      var vm = this

      if (!process.env.IS_WEB) {
        vm.listener = require('electron').ipcRenderer.on('toggle-window', function () {
          vm.is_fullscreen = !vm.is_fullscreen
        })
      }
    },
    destroyed () {
      var vm = this

      if (!process.env.IS_WEB) {
        require('electron').ipcRenderer.removeListener(vm.listener)
      }
    },
    methods: {
      minWindow () {
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('min-window')
        }
      },
      toggleWindow () {
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('toggle-window')
        }
      },
      closeWindow () {
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('close-window')
        }
      },
      doLogout () {
        const vm = this

        localStorage.removeItem('token')
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('logout')
        }
        vm.$router.push('/')
      }
    }
  }
</script>
