<template>
  <div class="system-information">
    electron: {{ electron }}<br />
    name: {{ name }}<br />
    node: {{ node }}<br />
    path: {{ path }}<br />
    platform: {{ platform }}<br />
    vue: {{ vue }}<br />
  </div>
</template>

<style scoped>
  .system-information {
    color: red;
  }
</style>

<script>
  export default {
    name: 'system-information',
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>
