<template>
  <div class="paper-detail">
    <div class="name">
      <div class="btn"></div>
      <div class="content">{{this.$route.params.name}}</div>
      <div class="btn" v-on:tap="addPaperToMyPaper()" v-if="$store.state.my_paper_ids.indexOf($route.params._id) === -1">加入测评</div>
      <div class="added" v-if="$store.state.my_paper_ids.indexOf($route.params._id) > -1">已经加入</div>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="item in $store.state.paper_questions" v-bind:key="item._id">
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
          <span class="btn" v-on:tap="toggleAnswerAnalyse(item)">{{item.showAnswerResolveContent ? '隐藏答案解析' : '显示答案解析'}}</span>
          <span class="btn" v-on:tap="addQuestionToMyQuestionBasket(item._id, item.typeId)" v-if="$store.state.my_question_ids.indexOf(item._id) ===-1">加入测评</span>
          <span class="added" v-if="$store.state.my_question_ids.indexOf(item._id) > -1">已经加入</span>
        </div>
        <div class="answer-resolve-content" v-if="item.showAnswerResolveContent">
          <div class="answer" v-html="item.answer"></div>
          <div class="resolve-content" v-html="item.resolveContent.replace('解析试题分析', '解析')"></div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-if="show_loading">
      <img src="../../assets/loading.gif">
    </div>
  </div>
</template>

<style scoped lang="less">
.paper-detail {
  .name {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 0.8rem;
    margin: 0 auto;
    padding: 0.05rem;
    text-align: center;
    font-size: 0.18rem;
    color: #000;
    font-weight: bold;
    border-bottom: 0.01rem solid #efefef;
    background-color: #ffffff;
    .content {
      flex: 2;
      width: 55%;
      margin: 0 auto;
    }
    .btn, .added {
      flex: 1;
      width: 0.8rem;
      height: 0.18rem;
      text-align: right;
      font-size: 0.18rem;
      font-weight: bold;
      margin-top: -0.02rem;
    }
    .btn {
      color: #007aff;
    }
    .added {
      color: #ccc;
    }
  }
  .list-container {
    padding-top: 0.8rem;
    .list-item {
      margin: 0.05rem;
      padding: 0.05rem;
      font-size: 0.15rem;
      color: #000;
      overflow: hidden;
      border: 0.01rem solid #efefef;
      .content {
        text-align: justify;
        margin-bottom: 0.08rem;
        overflow: hidden;
      }
      .options {
        overflow: hidden;
        .option {
          margin-top: 0.08rem;
          line-height: 0.18rem;
        }
      }
      .operation {
        text-align: right;
        line-height: 0.36rem;
        .btn {
          margin-left: 0.1rem;
          color: #007aff;
        }
        .added {
          margin-left: 0.1rem;
          color: #ccc;
        }
      }
      .answer {
        line-height: 0.36rem;
      }
      .resolve-content {
      }
    }
  }
}
</style>

<script>
export default {
  name: 'PaperDetail',
  data () {
    var vm = this

    vm.$http.get('/api/common/getPaperDetail', {
      params: {
        collections: vm.getSubjectCollections(vm.$store.state.subjectId),
        question_ids: vm.$route.params.question_ids
      }
    }).then(function (response) {
      var body = response.body

      for (var i = 0, l = body.data.items.length; i < l; i++) {
        body.data.items[i].showAnswerResolveContent = false
      }

      if (body.ok === 0) {
        vm.$store.state.paper_questions = body.data.items
        vm.show_loading = false
      } else {
        window.mui.alert(body.msg, ' ')
      }
    }, function (response) {
      var body = response.body

      window.mui.alert(body.msg, ' ')
    })

    return {
      show_loading: true
    }
  },
  computed: {
    paper_questions: {
      get: function (state) {
        return state.paper_questions
      },
      set: function (val) {
        this.$store.state.paper_questions = val
      }
    }
  },
  methods: {
    toggleAnswerAnalyse: function (item) {
      item.showAnswerResolveContent = !item.showAnswerResolveContent
    },
    getSubjectCollections: function (subjectId) {
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
    addPaperToMyPaper: function () {
      var vm = this

      if (!vm.$store.state.token) {
        vm.$router.push('/login')
        return
      }

      vm.$http.post('/api/common/addPaperToMyPaper?token=' + vm.$store.state.token, {
        paper_id: vm.$route.params._id
      }).then(function (response) {
        var body = response.body

        window.mui.alert(body.msg, ' ')

        vm.$store.state.my_paper_ids.push(vm.$route.params._id)
      }, function (response) {
        var body = response.body

        window.mui.alert(body.msg, ' ')
      })
    },
    addQuestionToMyQuestionBasket: function (questionId, typeId) {
      var vm = this

      if (!vm.$store.state.token) {
        vm.$router.push('/login')
        return
      }

      vm.$http.post('/api/common/addQuestionToMyQuestionBasket?token=' + vm.$store.state.token, {
        question_id: questionId,
        collections: vm.getSubjectCollections(vm.$route.params.subject_id),
        type_id: typeId
      }).then(function (response) {
        var body = response.body

        window.mui.alert(body.msg, ' ')

        vm.$store.state.my_question_ids.push(questionId)
      }, function (response) {
        var body = response.body

        window.mui.alert(body.msg, ' ')
      })
    }
  }
}
</script>
