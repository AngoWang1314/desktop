<template>
  <div class="c-courseware-list">
    <div class="search-condition-container">
      <div class="row">
        <select v-model="semesterId">
          <option value="">请选择学段</option>
          <option :value="item.semesterId" v-for="(item, index) in indexes.semester" :key="index">{{ item.semesterName }}</option>
        </select>
        <select v-model="gradeId">
          <option value="">请选择年级</option>
          <option :value="item.gradeId" v-for="(item, index) in grade" :key="index">{{ item.gradeName }}</option>
        </select>
        <select v-model="subjectId">
          <option value="">请选择学科</option>
          <option :value="item.subjectId" v-for="(item, index) in indexes.subject" :key="index">{{ item.subjectName }}</option>
        </select>
        <select v-model="registerId">
          <option value="">请选择册次</option>
          <option :value="item.registerId" v-for="(item, index) in indexes.register" :key="index">{{ item.registerName }}</option>
        </select>
        <div class="list">
          <input type="text" placeholder="请输入课件名称搜索" v-model="title" @keypress="enterSearch"><button class="pure-button pure-button-primary" @click="clickSearch">搜索</button>
        </div>
      </div>
    </div>
    <div class="result-container">
      <div class="pure-g">
        <div class="pure-u-1-6" v-for="(item, index) in list" :key="index" :title="item.title"  @click="goToDetail(item)">
          <div class="item">
            <div class="img-container">
              <div class="label">{{ item.semesterName + '/' + item.gradeName + '/' + item.subjectName + '/' + item.registerName }}</div>
              <div class="summary">{{ item.summary }}</div>
            </div>
            <div class="description">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="tc pagination" v-show="total > 0">
        <span :class="{'disabled': page < 2}" @click="prev">上一页</span>
        {{ page }}/{{ Math.ceil(total / perpage) }}
        <span :class="{'disabled': total / perpage <= page}" @click="next">下一页</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-courseware-list {
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
          .label {
            margin-top: 50px;
            color: #409eff;
            font-weight: bold;
          }
          .summary {
            margin-top: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
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
      .disabled {
        color: #ccc;
        cursor: default;
      }
    }
  }
</style>

<script>
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'

  export default {
    name: 'CoursewareList',
    data () {
      const vm = this

      return {
        semesterId: vm.$store.state.Courseware.params.semesterId,
        gradeId: vm.$store.state.Courseware.params.gradeId,
        subjectId: vm.$store.state.Courseware.params.subjectId,
        registerId: vm.$store.state.Courseware.params.registerId,
        title: vm.$store.state.Courseware.params.title,
        perpage: 18,
        page: vm.$store.state.Courseware.params.page,
        list: [],
        total: 0
      }
    },
    computed: {
      ...mapState('App', [
        'indexes',
        'grade'
      ])
    },
    created () {
      this.doSearch()
    },
    methods: {
      enterSearch (e) {
        if (e.keyCode === 13) {
          this.clickSearch()
        }
      },
      clickSearch () {
        this.page = 1
        this.doSearch()
      },
      doSearch () {
        const vm = this

        vm.$store.commit('Courseware/updateParams', {
          'params': {
            semesterId: vm.semesterId,
            gradeId: vm.gradeId,
            subjectId: vm.subjectId,
            registerId: vm.registerId,
            title: vm.title,
            page: vm.page
          }
        })

        vm.$http.get('/api/common/getCoursewareList', {
          params: {
            semesterId: vm.semesterId,
            gradeId: vm.gradeId,
            subjectId: vm.subjectId,
            registerId: vm.registerId,
            title: vm.title,
            perpage: vm.perpage,
            page: vm.page
          }
        }).then(function (ret) {
          if (ret.data.ok === 0) {
            vm.list = ret.data.data.items
            vm.total = ret.data.data.total
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      goToDetail (item) {
        this.$router.push('/courseware/courseware-detail/' + encodeURIComponent(item.real_url))
      },
      prev () {
        if (this.page >= 2) {
          this.page--
          this.doSearch()
        }
      },
      next () {
        if (Math.ceil(this.total / this.perpage) > this.page) {
          this.page++
          this.doSearch()
        }
      }
    }
  }
</script>
