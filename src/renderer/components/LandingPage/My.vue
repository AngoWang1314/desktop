<template>
  <div class="c-my">
    <div class="result-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-my {
    position: relative;
    height: 100%;
    .result-container {
      height: 100%;
      margin: 0 auto;
      overflow: auto;
    }
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'My',
    data () {
      return {
      }
    },
    created () {
      const vm = this

      vm.$http.get('/api/common/getUserInfo').then(function (ret) {
        if (ret.data.ok === 0) {
          vm.$store.commit('Login/updateUserInfo', {'userInfo': ret.data.data})
        } else {
          Message({message: ret.data.msg, center: true})
        }
      }, function (ret) {
        Message({message: ret.data.msg, center: true})
      })
    }
  }
</script>
