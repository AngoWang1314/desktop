<template>
  <div class="c-landing-page">
    <div class="sidebar">
      <div :class="{'item': true, 'active': selectedIndex == 0}" @click="activeItem(0, '/vdo')">推荐视频</div>
      <div :class="{'item': true, 'active': selectedIndex == 1}" @click="activeItem(1, '/paper')">试卷试题</div>
      <div :class="{'item': true, 'active': selectedIndex == 2}" @click="activeItem(2, '/ask')">提问解答</div>
      <div :class="{'item': true, 'active': selectedIndex == 3}" @click="activeItem(3, '/my')">个人信息</div>
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
        selectedIndex: 0
      }
    },
    methods: {
      activeItem (index, path) {
        this.selectedIndex = index
        this.$router.push(path)
      }
    }
  }
</script>
