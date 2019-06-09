<template>
  <div class="c-courseware-detail">
    <div class="back" @click="$router.back(-1)">返回列表</div>
    <iframe :src="src"></iframe>
  </div>
</template>

<style scoped lang="less">
  .c-courseware-detail {
    position: relative;
    height: 100%;
    overflow: hidden;
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
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
</style>

<script>
  export default {
    name: 'CoursewareDetail',
    data () {
      const vm = this

      return {
        src: 'https://www.xuebabiji.club/pdf/web/viewer.html?pdfUrl=' + decodeURIComponent(vm.$route.params.real_url)
      }
    }
  }
</script>
