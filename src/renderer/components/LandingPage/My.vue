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
  export default {
    name: 'My',
    data () {
      return {
      }
    }
  }
</script>
