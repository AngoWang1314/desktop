<template>
  <div class="c-landing-page">
    <div class="sidebar">
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/vdo') === 0}" @click="activeItem('/vdo')">
        <i class="iconfont icon-ico-videolayer-qHJ"></i><span>视频</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/paper') === 0}" @click="activeItem('/paper/paper-list-detail/paper-list/1')">
        <i class="iconfont icon-shijuan"></i><span>组卷</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/quiz') === 0}" @click="activeItem('/quiz/quiz-question-basket')">
        <i class="iconfont icon-ceshi"></i><span>测评</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/courseware') === 0}" @click="activeItem('/courseware/courseware-list')">
        <i class="iconfont icon-kejian"></i><span>课件</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/ask') === 0}" @click="activeItem('/ask/ask-list')">
        <i class="iconfont icon-askoutline01"></i><span>提问</span>
      </div>
      <div :class="{'item': true, 'active': $router.history.current.fullPath.indexOf('/my') === 0}" @click="activeItem('/my/my-list')">
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
    min-width: 1135px;
    height: calc(100% - 42px);
    min-height: 702px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    background-color: #fff;
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
        border-bottom: 1px solid #3a98f9;
        &:last-child {
          border-bottom: 0px;
        }
        &:hover {
          border-color: #097aef;
          background-color: #097aef;
        }
        i {
          font-size: 36px;
        }
      }
      .active {
        border-color: #097aef;
        background-color: #097aef;
      }
    }
    .content {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
  }
</style>

<script>
  export default {
    name: 'LandingPage',
    data () {
      return {
      }
    },
    methods: {
      activeItem (path) {
        const vm = this

        var nowStartWith = vm.$router.history.current.fullPath.split('/')[1]
        var toStartWith = path.split('/')[1]

        if (nowStartWith === toStartWith) {
          return
        }

        if (toStartWith === 'paper' && vm.$store.state.Paper.params.type !== 'paper') {
          vm.$router.push('/paper/question')
          return
        }

        vm.$router.push(path)
      }
    }
  }
</script>
