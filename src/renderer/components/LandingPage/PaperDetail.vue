<template>
  <div class="paper-detail">
    <div class="name">
      <div class="btn" style="text-align: left;" @click="goBack">返回列表</div>
      <div class="content">{{ $route.params.name }}</div>
      <div class="btn" @click="addPaperToMyPaper" v-if="$store.state.Login.my_paper_ids.indexOf($route.params._id) === -1">加入测评</div>
      <div class="added" v-if="$store.state.Login.my_paper_ids.indexOf($route.params._id) > -1">已经加入</div>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="item in paper_questions" v-bind:key="item._id">
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
          <span class="btn" @click="toggleAnswerAnalyse(item)">{{item.showAnswerResolveContent ? '隐藏答案解析' : '显示答案解析'}}</span>
          <span class="btn" @click="addQuestionToMyQuestionBasket(item._id, item.typeId)" v-if="$store.state.Login.my_question_ids.indexOf(item._id) ===-1">加入测评</span>
          <span class="added" v-if="$store.state.Login.my_question_ids.indexOf(item._id) > -1">已经加入</span>
        </div>
        <div class="answer-resolve-content" v-if="item.showAnswerResolveContent">
          <div class="answer" v-html="item.answer"></div>
          <div class="resolve-content" v-html="item.resolveContent.replace('解析试题分析', '解析')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .paper-detail {
    .name {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;;
      z-index: 100;
      height: 80px;
      margin: 0 auto 10px;
      padding: 0 10px;
      text-align: center;
      font-size: 18px;
      color: #000;
      font-weight: bold;
      background-color: #ffffff;
      .content {
        flex: 2;
        width: 55%;
        margin: 0 auto;
      }
      .btn, .added {
        flex: 1;
        width: 80px;
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
      }
      .btn {
        color: #007aff;
      }
      .added {
        color: #ccc;
      }
    }
    .list-container {
      .list-item {
        margin-bottom: 10px;
        padding: 5px;
        font-size: 15px;
        color: #000;
        overflow: hidden;
        border: 1px solid #d4d4d4;
        .content {
          text-align: justify;
          margin-bottom: 8px;
          overflow: hidden;
        }
        .options {
          overflow: hidden;
          .option {
            text-align: left;
            margin-top: 8px;
            line-height: 18px;
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
            margin-right: 5px;
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
    }
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'PaperDetail',
    data () {
      return {
        paper_questions: []
      }
    },
    created () {
      const vm = this

      vm.getPaperDetail()
    },
    methods: {
      getPaperDetail () {
        var vm = this

        vm.$http.get('/api/common/getPaperDetail', {
          params: {
            collections: vm.getSubjectCollections(vm.$route.params.subject_id),
            question_ids: vm.$route.params.question_ids
          }
        }).then(function (ret) {
          for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
            ret.data.data.items[i].showAnswerResolveContent = false
          }

          if (ret.data.ok === 0) {
            vm.paper_questions = ret.data.data.items
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
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
      goBack () {
        this.$router.push('/paper/paper-list-detail/paper-list/' + this.$route.params.page)
      },
      addPaperToMyPaper () {
        var vm = this

        if (!localStorage.getItem('token')) {
          if (!process.env.IS_WEB) {
            require('electron').ipcRenderer.send('logout')
          }
          this.$router.push('/')
          return
        }

        vm.$http.post('/api/common/addPaperToMyPaper', {
          paper_id: vm.$route.params._id
        }).then(function (ret) {
          Message({message: ret.data.msg, center: true})

          vm.$store.commit('Login/addMyPaperIds', {'paper_id': vm.$route.params._id})
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
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
          collections: vm.getSubjectCollections(vm.$route.params.subject_id),
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
