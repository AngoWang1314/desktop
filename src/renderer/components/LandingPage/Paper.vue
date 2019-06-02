<template>
  <div class="c-paper">
    <div class="search-condition-container">
      <div class="row">
        <select v-model="type">
          <option value="paper">试卷</option>
          <option value="question">试题</option>
        </select>
        <select v-model="semesterId">
          <option value="">请选择学段</option>
          <option :value="item.semesterId" v-for="(item, index) in indexes.semester" :key="index">{{ item.semesterName }}</option>
        </select>
        <select v-model="subjectId">
          <option value="">请选择学科</option>
          <option :value="item.subjectId" v-for="(item, index) in indexes.subject" :key="index">{{ item.subjectName }}</option>
        </select>
        <select v-model="versionId">
          <option value="">请选择教材</option>
          <option :value="item.versionId" v-for="(item, index) in indexes.version" :key="index">{{ item.versionName }}</option>
        </select>
        <select v-model="examtypeId" v-show="type === 'paper'">
          <option value="">请选择类别</option>
          <option :value="item.examtypeId" v-for="(item, index) in indexes.examtype" :key="index">{{ item.examtypeName }}</option>
        </select>
        <select v-model="creditLineId" v-show="type === 'question'">
          <option value="">请选择类别</option>
          <option :value="item.creditLineId" v-for="(item, index) in indexes.creditLine" :key="index">{{ item.creditLineName }}</option>
        </select>
        <select v-model="typeId" v-show="type === 'question'">
          <option value="">请选择题型</option>
          <option :value="item.typeId" v-for="(item, index) in indexes.type" :key="index">{{ item.typeName }}</option>
        </select>
        <select v-model="areaId">
          <option value="">请选择地区</option>
          <option :value="item.areaId" v-for="(item, index) in indexes.area" :key="index">{{ item.areaName }}</option>
        </select>
        <select v-model="yearId">
          <option value="">请选择年份</option>
          <option :value="item.yearId" v-for="(item, index) in indexes.year" :key="index">{{ item.yearName }}</option>
        </select>
        <div class="list">
          <input type="text" placeholder="请输入关键词进行搜索" v-model="keyword" @keypress="myDoSearch"><button class="pure-button pure-button-primary" @click="doSearch">搜索</button>
        </div>
      </div>
    </div>
    <div class="result-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-paper {
    position: relative;
    height: 100%;
    .search-condition-container {
      .row {
        padding: 10px;
        border-bottom: 1px #e4ecf3 dashed;
      }
      label {
        display: inline-block;
        width: 60px;
        text-align: right;
      }
      select {
        width: 105px;
        height: 37px;
        line-height: 37px;
        vertical-align: middle;
      }
      .list {
        display: inline-block;
        .item {
          display: inline-block;
          width: 60px;
          color: #adadad;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
        .active {
          color: #409eff;
        }
        input {
          height: 37px;
          line-height: 37px;
          padding: 5px;
          font-size: 16px;
          vertical-align: middle;
          outline: none;
          border: 1px solid #409eff;
        }
        button {
          border-radius: 0px;
        }
      }
    }
    .result-container {
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      overflow: auto;
      @media screen and (max-width: 1390px) {
        max-height: 650px;
      }
      .item {
        display: inline-block;
        width: 100%;
        height: 270px;
        padding: 5px;
        cursor: pointer;
        @media screen and (max-width: 1390px) {
          height: 175px;
        }
        .img-container {
          width: 100%;
          height: 240px;
          background-size: cover;
          background-position: center;
          border: 1px solid #d8d8d8;
          @media screen and (max-width: 1390px) {
            height: 145px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .description {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0px 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          white-space: nowrap;
          border: 1px solid #d8d8d8;
          border-top: 0;
        }
      }
    }
    .pagination {
      margin: 30px 0px;
      span {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'paper',
    data () {
      return {
        type: 'paper',
        semesterId: '',
        subjectId: '0',
        versionId: '',
        examtypeId: '',
        creditLineId: '',
        typeId: '',
        areaId: '',
        yearId: '',
        keyword: ''
      }
    },
    computed: {
      ...mapState('App', [
        'indexes'
      ])
    },
    mounted () {
      this.doSearch()
    },
    methods: {
      myDoSearch (e) {
        if (e.keyCode === 13) {
          this.doSearch()
        }
      },
      doSearch () {
        const vm = this

        vm.$store.commit('Paper/updateParams', {
          'params': {
            semesterId: vm.semesterId,
            subjectId: vm.subjectId,
            versionId: vm.versionId,
            examtypeId: vm.examtypeId,
            creditLineId: vm.creditLineId,
            typeId: vm.typeId,
            areaId: vm.areaId,
            yearId: vm.yearId,
            keyword: vm.keyword
          }
        })

        if (vm.type === 'paper') {
          vm.$router.push('/paper')
          window.e.$emit('paper')
        } else {
          vm.$router.push('/question')
          window.e.$emit('question')
        }
      }
    }
  }
</script>
