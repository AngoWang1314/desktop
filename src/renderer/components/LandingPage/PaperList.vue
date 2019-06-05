<template>
  <div class="paper-list">
    <div class="card" v-for="item in list" v-bind:key="item._id" @click="$router.push('/paper/paper-list-detail/paper-detail/' + item._id + '/' + item.name + '/' + item.subjectId + '/' + item.stid.join(',') + '/' + page)">
      <div class="picture">
        <i class="icon iconfont icon-paper"></i>
      </div>
      <div class="content">
        <div class="name">
          {{ item.name }}
        </div>
      </div>
      <div class="year-semester-subject-area-examtype">
        <div class="year">{{ item.yearName }}年</div>
        <div class="semester">{{ item.semesterName }}</div>
        <div class="subject">{{ item.subjectName }}</div>
        <div class="area">{{ item.areaName }}</div>
        <div class="examtype">{{ item.examtypeName }}</div>
      </div>
    </div>
    <div class="tc pagination" v-show="total > 0">
      <span :class="{'disabled': page < 2}" @click="prev">上一页</span>
      {{ page }}/{{ Math.ceil(total / perpage) }}
      <span :class="{'disabled': total / perpage <= page}" @click="next">下一页</span>
    </div>
  </div>
</template>

<style scoped lang="less">
  .paper-list {
    .card {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      padding: 9px 5px;
      text-align: left;
      font-size: 15px;
      cursor: pointer;
      border: 1px solid #d4d4d4;
      .picture {
        width: 60px;
        height: 60px;
        i {
          display: inline-block;
          vertical-align: middle;
          font-size: 60px;
          color: #007aff;
        }
      }
      .content {
        display: flex;
        flex-direction: row;
        flex: 1;
        .name {
          padding: 8px 0 5px 0;
          color: #000;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .year-semester-subject-area-examtype {
        width: 300px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 14px;
        color: #949494;
        div {
          flex: 1;
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
    name: 'PaperList',
    data () {
      const vm = this

      return {
        page: vm.$route.params.page,
        perpage: 10,
        list: [],
        total: 0,
        timerId: null
      }
    },
    computed: {
      ...mapState('Paper', [
        'params'
      ])
    },
    created () {
      const vm = this

      vm.doSearch()

      vm.$watch('params', function (newVal, oldVal) {
        if (vm.timerId) {
          clearTimeout(vm.timerId)
        }
        vm.timerId = setTimeout(function () {
          vm.page = 1
          vm.doSearch()
        }, 50)
      })
    },
    methods: {
      doSearch () {
        const vm = this

        vm.$store.commit('Paper/updateParamsType', {'type': 'paper'})

        vm.$http.get('/api/common/getPaper', {
          params: {
            page: vm.page,
            perpage: vm.perpage,
            keyword: vm.params.keyword,
            version_id: vm.params.versionId,
            semester_id: vm.params.semesterId,
            subject_id: vm.params.subjectId,
            examtype_id: vm.params.examtypeId,
            area_id: vm.params.areaId,
            year_id: vm.params.yearId
          }
        }).then(function (ret) {
          if (ret.data.ok === 0) {
            vm.list = ret.data.data.items
            vm.total = ret.data.data.papers_total
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
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
