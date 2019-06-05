<template>
  <div class="c-title-bar">
    <div class="app-name">{{ appName }}</div>
    <div class="operation">
      <div class="ib minimize" @click="minWindow()">
        <i class="iconfont icon-zuixiaohua"></i>
      </div><div class="ib maximize-restore" v-show="$route.name !== 'login-page'" @click="toggleWindow()">
        <i :class="{'iconfont': true, 'icon-zuidahua': !is_fullscreen, 'icon-zuidahua2': is_fullscreen}"></i>
      </div><div class="ib close" @click="closeWindow()">
        <i class="iconfont icon-close"></i>
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
      width: 75px;
      margin-left: 10px;
      border-right: 1px solid #3a98f9;
      -webkit-app-region: no-drag;
    }
    .operation {
      margin-left: 74px;
      text-align: right;
      .minimize, .maximize-restore, .close {
        position: relative;
        z-index: 1000;
        width: 42px;
        height: 43px;
        text-align: center;
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
      .minimize, .maximize-restore {
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
  import { ipcRenderer } from 'electron'

  export default {
    name: 'title-bar',
    data () {
      return {
        'appName': '学霸笔迹',
        'is_fullscreen': false,
        'listener': null
      }
    },
    created () {
      var vm = this
      vm.listener = ipcRenderer.on('toggle-window', function () {
        vm.is_fullscreen = !vm.is_fullscreen
      })
    },
    methods: {
      minWindow () {
        ipcRenderer.send('min-window')
      },
      toggleWindow () {
        ipcRenderer.send('toggle-window')
      },
      closeWindow () {
        ipcRenderer.send('close-window')
      }
    },
    destroyed () {
      var vm = this
      ipcRenderer.removeListener(vm.listener)
    }
  }
</script>
