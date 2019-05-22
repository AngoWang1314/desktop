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

  html {
    height: 100vh;
    overflow: hidden;
  }

  body {
    font-family: 'Microsoft Yahei';
    position: relative;
    height: 100vh;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    -webkit-user-select: none;
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

  .c-app {
    width: 100vw;
    height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background: rgba(157,172,187,0.6);
  }
  ::-webkit-scrollbar-track {
    background-color: #e2e2e2;
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
