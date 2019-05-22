<template>
  <div class="c-my">
    my
    <div class="tc bottom">
      <button class="pure-button pure-button-primary logout" @click="doLogout">退出登陆</button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-my {
    position: relative;
    height: 100%;
    .bottom {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
  }
</style>

<script>
  import { ipcRenderer } from 'electron'

  export default {
    name: 'my',
    data () {
      return {
      }
    },
    methods: {
      doLogout () {
        localStorage.setItem('token', '')
        ipcRenderer.send('logout')
        this.$router.push('/')
      }
    }
  }
</script>
