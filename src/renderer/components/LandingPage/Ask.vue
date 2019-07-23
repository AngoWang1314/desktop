<template>
  <div class="c-ask">
    <div class="result-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-ask {
    position: relative;
    height: 100%;
    .result-container {
      height: 100%;
      margin: 0 auto;
      text-align: center;
      overflow: auto;
    }
  }
</style>

<script>
  export default {
    name: 'Ask',
    data () {
      return {
      }
    }
  }
</script>
