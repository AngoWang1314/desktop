<template>
  <div class="c-courseware">
    <div class="result-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-courseware {
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
    name: 'Courseware',
    data () {
      return {
      }
    }
  }
</script>
