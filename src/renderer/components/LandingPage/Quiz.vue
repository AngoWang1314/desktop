<template>
  <div class="c-quiz">
    <div class="tabs">
      <div v-for="(item, index) in tabs" :key="index" :class="{'tab': true, 'active': item.id === activeTabId}" @click="changeTab(item.id, item.url)">{{ item.name }}</div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-quiz {
    height: 100%;
    .tabs {
      margin: -1px 0 0 -1px;
      border-bottom: 1px solid #dcdcdc;
      .tab {
        position: relative;
        top: 1px;
        display: inline-block;
        width: 80px;
        text-align: center;
        height: 45px;
        line-height: 45px;
        cursor: pointer;
      }
      .active {
        color: #0078e7;
        border: 1px solid #dcdcdc;
        border-top: 0px solid #dcdcdc;
        border-bottom: 1px solid #ffffff;
      }
    }
    .content {
      height: calc(100% - 45px);
      overflow: auto;
    }
  }
</style>

<script>
  export default {
    name: 'quiz',
    data () {
      return {
        activeTabId: 1,
        tabs: [
          {
            id: 1,
            name: '试题篮子',
            url: '/quiz/quiz-question-basket'
          },
          {
            id: 2,
            name: '我的组卷',
            url: '/quiz/quiz-paper'
          },
          {
            id: 3,
            name: '测评记录',
            url: '/quiz/quiz-record'
          }
        ]
      }
    },
    methods: {
      changeTab (id, url) {
        const vm = this

        vm.activeTabId = id
        vm.$router.push(url)
      }
    }
  }
</script>
