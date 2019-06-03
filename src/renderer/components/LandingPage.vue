<template>
  <div class="c-landing-page">
    <div class="sidebar">
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/vdo') === 0}" @click="activeItem('/vdo')">
        <i class="iconfont icon-ico-videolayer-qHJ"></i><span>视频</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/paper') === 0}" @click="activeItem('/paper')">
        <i class="iconfont icon-shijuan"></i><span>组卷</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/quiz') === 0}" @click="activeItem('/quiz')">
        <i class="iconfont icon-ceshi"></i><span>测评</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/courseware') === 0}" @click="activeItem('/courseware')">
        <i class="iconfont icon-kejian"></i><span>课件</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/ask') === 0}" @click="activeItem('/ask')">
        <i class="iconfont icon-askoutline01"></i><span>提问</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/my') === 0}" @click="activeItem('/my')">
        <i class="iconfont icon-wode"></i><span>我的</span>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-landing-page {
    height: calc(100vh - 42px);
    overflow: auto;
    display: flex;
    flex-direction: row;
    .sidebar {
      width: 85px;
      height: 100%;
      background-color: #409eff;
      display: flex;
      flex-direction: column;
      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: #ffffff;
        cursor: pointer;
        border-top: 1px solid #3a98f9;
        border-bottom: 1px solid #3a98f9;
        &:hover {
          border: 1px solid #097aef;
          background-color: #097aef;
        }
        i {
          font-size: 36px;
        }
      }
      .active {
        border: 1px solid #097aef;
        background-color: #097aef;
      }
    }
    .content {
      flex: 1;
      height: 100%;
      overflow: hidden;
      border-top: 1px solid #3a98f9;
    }
  }
</style>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
      }
    },
    methods: {
      activeItem (path) {
        this.$router.push(path)
      }
    }
  }
</script>
