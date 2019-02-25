<template>
  <div class="c-app">
    <TitleBar></TitleBar>
    <router-view></router-view>
  </div>
</template>

<style>
  @import '~purecss/build/pure.css';
  @import '~element-ui/lib/theme-chalk/index.css';
  @import 'https://at.alicdn.com/t/font_919985_4cs5v36rbm6.css';

  body {
    position: relative;
    font-family: 'Microsoft Yahei';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
  }

  #app {
    width: 100vw;
    height: 100vh;
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
</style>

<script>
  import TitleBar from '@/components/TitleBar'
  export default {
    name: 'app',
    components: {
      TitleBar
    }
  }
</script>
