<template>
  <div class="question">
    <div class="list-item" v-for="item in list" v-bind:key="item._id">
      <div class="content" v-html="item.content"></div>
      <div class="options">
        <div class="option" v-if="item.option1" v-html="item.option1"></div>
        <div class="option" v-if="item.option2" v-html="item.option2"></div>
        <div class="option" v-if="item.option3" v-html="item.option3"></div>
        <div class="option" v-if="item.option4" v-html="item.option4"></div>
        <div class="option" v-if="item.option5" v-html="item.option5"></div>
        <div class="option" v-if="item.option6" v-html="item.option6"></div>
      </div>
      <div class="operation">
        <span class="btn" @click="toggleAnswerAnalyse(item)">{{item.showAnswerResolveContent ? '收起答案与解析' : '查看答案与解析'}}</span>
        <span class="btn" @click="addQuestionToMyQuestionBasket(item._id, item.typeId)" v-if="$store.state.Login.my_question_ids.indexOf(item._id) ===-1">加入测评</span>
        <span class="added" v-if="$store.state.Login.my_question_ids.indexOf(item._id) > -1">已经加入</span>
      </div>
      <div class="answer-resolve-content" v-if="item.showAnswerResolveContent">
        <div class="answer" v-html="item.answer"></div>
        <div class="resolve-content" v-html="item.resolveContent.replace('解析试题分析', '解析')"></div>
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
  .question {
    .list-item {
      margin-bottom: 10px;
      padding: 5px;
      font-size: 15px;
      color: #000;
      overflow: hidden;
      border: 1px solid #d4d4d4;
      .content {
        margin-bottom: 8px;
        text-align: justify;
        overflow: hidden;
      }
      .options {
        overflow: hidden;
        .option {
          text-align: left;
          line-height: 18px;
          margin-top: 8px;
        }
      }
      .operation {
        text-align: right;
        line-height: 36px;
        .btn {
          margin-right: 10px;
          color: #007aff;
          cursor: pointer;
        }
        .added {
          margin-left: 10px;
          color: #ccc;
        }
      }
      .answer {
        text-align: left;
        line-height: 36px;
      }
      .resolve-content {
        text-align: left;
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
  // import { ipcRenderer } from 'electron'
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'

  export default {
    name: 'Question',
    data () {
      return {
        page: 1,
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

        vm.$http.get('/api/common/getQuestion', {
          params: {
            page: vm.page,
            perpage: vm.perpage,
            collections: vm.getSubjectCollections(vm.params.subjectId),
            keyword: vm.params.keyword,
            versionId: vm.params.versionId,
            semesterId: vm.params.semesterId,
            creditLineId: vm.params.creditLineId,
            typeId: vm.params.typeId
          }
        }).then(function (ret) {
          for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
            ret.data.data.items[i].showAnswerResolveContent = false
          }

          if (ret.data.ok === 0) {
            vm.list = ret.data.data.items
            vm.total = ret.data.data.questions_total
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
      },
      toggleAnswerAnalyse (item) {
        item.showAnswerResolveContent = !item.showAnswerResolveContent
      },
      getSubjectCollections (subjectId) {
        var collectionsNames = {
          '0': 'Mathematics',
          '1': 'English',
          '2': 'Physics',
          '3': 'Chemistry',
          '4': 'Chinese',
          '5': 'Biology',
          '6': 'History',
          '7': 'Geography',
          '8': 'Politics',
          '9': 'ScienceSynthesis',
          '10': 'LiberalArtsSynthesis',
          '11': 'General',
          '12': 'Other'
        }

        return collectionsNames[subjectId]
      },
      addQuestionToMyQuestionBasket (questionId, typeId) {
        var vm = this

        if (!localStorage.getItem('token')) {
          if (!process.env.IS_WEB) {
            require('electron').ipcRenderer.send('logout')
          }
          this.$router.push('/')
          return
        }

        vm.$http.post('/api/common/addQuestionToMyQuestionBasket', {
          question_id: questionId,
          collections: vm.getSubjectCollections(vm.params.subjectId),
          type_id: typeId
        }).then(function (ret) {
          Message({message: ret.data.msg, center: true})

          vm.$store.commit('Login/addMyQuestionIds', {'question_id': questionId})
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      }
    }
  }
</script>
