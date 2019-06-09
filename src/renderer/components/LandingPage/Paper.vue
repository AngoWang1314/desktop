<template>
  <div class="c-paper">
    <div class="search-condition-container">
      <div class="row">
        <select @change="changeType">
          <option :value="'paper'" :selected="type === 'paper'">试卷</option>
          <option :value="'question'" :selected="type === 'question'">试题</option>
        </select>
        <select v-model="semesterId" @change="updateParams">
          <option value="">请选择学段</option>
          <option :value="item.semesterId" v-for="(item, index) in indexes.semester" :key="index">{{ item.semesterName }}</option>
        </select>
        <select v-model="subjectId" @change="updateParams">
          <option value="">请选择学科</option>
          <option :value="item.subjectId" v-for="(item, index) in indexes.subject" :key="index">{{ item.subjectName }}</option>
        </select>
        <select v-model="versionId" @change="updateParams">
          <option value="">请选择教材</option>
          <option :value="item.versionId" v-for="(item, index) in indexes.version" :key="index">{{ item.versionName }}</option>
        </select>
        <select v-model="examtypeId" @change="updateParams" v-show="type === 'paper'">
          <option value="">请选择类别</option>
          <option :value="item.examtypeId" v-for="(item, index) in indexes.examtype" :key="index">{{ item.examtypeName }}</option>
        </select>
        <select v-model="creditLineId" @change="updateParams" v-show="type === 'question'">
          <option value="">请选择类别</option>
          <option :value="item.creditLineId" v-for="(item, index) in indexes.creditLine" :key="index">{{ item.creditLineName }}</option>
        </select>
        <select v-model="typeId" @change="updateParams" v-show="type === 'question'">
          <option value="">请选择题型</option>
          <option :value="item.typeId" v-for="(item, index) in indexes.type" :key="index">{{ item.typeName }}</option>
        </select>
        <select v-model="areaId" @change="updateParams">
          <option value="">请选择地区</option>
          <option :value="item.areaId" v-for="(item, index) in indexes.area" :key="index">{{ item.areaName }}</option>
        </select>
        <select v-model="yearId" @change="updateParams">
          <option value="">请选择年份</option>
          <option :value="item.yearId" v-for="(item, index) in [].concat(indexes.year).reverse()" :key="index">{{ item.yearName }}</option>
        </select>
        <div class="list">
          <input type="text" placeholder="请输入关键词进行搜索" v-model="keyword" @change="updateParams" @keypress="enterSearch"><button class="pure-button pure-button-primary" @click="clickSearch">搜索</button>
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
      height: calc(100% - 50px);
      margin: 0 auto;
      padding: 10px;
      text-align: center;
      overflow: auto;
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
    name: 'Paper',
    data () {
      const vm = this

      return {
        type: vm.$store.state.Paper.params.type,
        semesterId: vm.$store.state.Paper.params.semesterId,
        subjectId: vm.$store.state.Paper.params.subjectId,
        versionId: vm.$store.state.Paper.params.versionId,
        examtypeId: vm.$store.state.Paper.params.examtypeId,
        creditLineId: vm.$store.state.Paper.params.creditLineId,
        typeId: vm.$store.state.Paper.params.typeId,
        areaId: vm.$store.state.Paper.params.areaId,
        yearId: vm.$store.state.Paper.params.yearId,
        keyword: vm.$store.state.Paper.params.keyword,
        timerId: null
      }
    },
    computed: {
      ...mapState('App', [
        'indexes'
      ])
    },
    created () {
      const vm = this

      vm.doSearch()

      vm.$watch('type', function (newVal, oldVal) {
        if (vm.timerId) {
          clearTimeout(vm.timerId)
        }
        vm.timerId = setTimeout(function () {
          if (vm.type === 'paper') {
            vm.$router.push('/paper/paper-list-detail/paper-list/1')
          } else {
            vm.$router.push('/paper/question')
          }
        }, 50)
      })
    },
    methods: {
      changeType (e) {
        const vm = this

        vm.type = e.target.value
        vm.$store.commit('Paper/updateParamsType', {'type': vm.type})
      },
      enterSearch (e) {
        if (e.keyCode === 13) {
          this.doSearch()
        }
      },
      clickSearch () {
        this.doSearch()
      },
      updateParams () {
        const vm = this

        vm.$store.commit('Paper/updateParams', {
          'params': {
            type: vm.type,
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
      },
      doSearch () {
        const vm = this

        vm.$store.commit('Paper/updateParams', {
          'params': {
            type: vm.type,
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

        if (vm.timerId) {
          clearTimeout(vm.timerId)
        }
        vm.timerId = setTimeout(function () {
          if (vm.type === 'paper') {
            vm.$router.push('/paper/paper-list-detail/paper-list/1')
          } else {
            vm.$router.push('/paper/question')
          }
        }, 50)
      }
    }
  }
</script>
