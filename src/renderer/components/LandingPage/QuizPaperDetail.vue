<template>
  <div class="quiz-paper-detail">
    <div class="name">
      <div class="remain-time" v-show="remainTime > 0">{{remainTime / 60000}}分钟</div>
      <div class="content">{{this.$route.params.name}}</div>
      <div class="btn" v-on:tap="startMyQuiz()" v-show="remainTime > 0">{{my_quiz_id === '0' ? '开始测评' : '提交试卷'}}</div>
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
        <div class="answer-resolve-content" v-show="remainTime === 0">
          <div class="answer" v-html="item.answer"></div>
          <div class="resolve-content" v-html="item.resolveContent.replace('解析试题分析', '解析')"></div>
        </div>
        <div class="operation" v-show="my_quiz_id !== '0'">
          <div class="label">作答：</div>
          <input type="text" placeholder="请输入答案" v-model="item.text" :disabled="remainTime === 0">
          <div class="upload-container">
            <form @submit.prevent="upload" method="post" enctype="multipart/form-data" v-show="remainTime !== 0">
              <input type="file" name="picture" v-on:change="onChange($event, item)">
            </form>
            <span class="btn" :style="{'color': remainTime === 0 ? '#ccc' : ''}">上传答案</span>
          </div>
          <div class="img-container" v-show="item.pic">
            <img :src="item.pic">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .quiz-paper-detail {
    height: 100%;
    overflow: auto;
    .name {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      z-index: 100;
      width: 100%;
      height: 80px;
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      font-size: 18px;
      color: #000;
      font-weight: bold;
      border-bottom: 1px solid #efefef;
      background-color: #ffffff;
      .content {
        flex: 2;
        width: 55%;
        margin: 0 auto;
      }
      .remain-time {
        flex: 1;
        width: 80px;
        height: 18px;
        text-align: left;
        font-size: 18px;
        color: #007aff;
        font-weight: bold;
      }
      .btn {
        flex: 1;
        width: 80px;
        height: 18px;
        text-align: right;
        font-size: 18px;
        color: #007aff;
        font-weight: bold;
      }
    }
    .list-container {
      padding-top: 80px;
      .list-item {
        margin: 5px;
        padding: 5px;
        border: 1px solid #efefef;
        font-size: 15px;
        color: #000;
        overflow: hidden;
        .content {
          margin-bottom: 8px;
          text-align: justify;
          overflow: hidden;
        }
        .options {
          overflow: hidden;
          .option {
            line-height: 18px;
            margin-top: 8px;
          }
        }
        .operation {
          position: relative;
          color: #007aff;
          text-align: right;
          .label {
            text-align: left;
            margin: 15px 0;
            color: #000;
          }
          input {
            position: absolute;
            left: 0;
            width: 80%;
            margin-bottom: 0;
            padding-left: 5px;
          }
          .upload-container {
            position: relative;
            display: inline-block;
            width: 20%;
            height: 40px;
            line-height: 40px;
            form {
              position: absolute;
              opacity: 0;
              z-index: 10;
              width: 100%;
              height: 100%;
            }
            .btn {
              position: absolute;
              z-index: 1;
              right: 3px;
              width: 100%;
              height: 100%;
              font-size: 16px;
              color: #007aff;
            }
          }
          .img-container {
            text-align: center;
            img {
              width: 100%;
              margin-top: 8px;
              border: 1px solid #ccc;
            }
          }
        }
        .answer {
          line-height: 36px;
        }
        .resolve-content {
        }
      }
    }
  }
</style>

<script>
export default {
  name: 'QuizPaperDetail',
  data () {
    var vm = this

    vm.$http.get('/api/common/getPaperDetail', {
      params: {
        token: vm.$store.state.token,
        collections: vm.getSubjectCollections(vm.$route.params.subject_id),
        question_ids: vm.$route.params.question_ids
      }
    }).then(function (response) {
      var body = response.body

      for (var i = 0, l = body.data.items.length; i < l; i++) {
        body.data.items[i].text = ''
        body.data.items[i].pic = ''
      }

      if (body.ok === 0) {
        vm.$store.state.paper_questions = body.data.items
        vm.show_loading = false

        if (vm.my_quiz_id !== '0') {
          vm.$http.get('/api/common/getMyAnswer?token=' + vm.$store.state.token, {
            params: {
              my_quiz_id: vm.my_quiz_id
            }
          }).then(function (response) {
            var body = response.body

            if (body.ok === 0) {
              var answers = body.data.answers
              for (var i = 0; i < answers.length; i++) {
                vm.$store.state.paper_questions[i].text = answers[i].text
                vm.$store.state.paper_questions[i].pic = answers[i].pic
              }
            } else {
              window.mui.alert(body.msg, ' ')
            }
          }, function (response) {
            var body = response.body

            window.mui.alert(body.msg, ' ')
          })
        }
      } else {
        window.mui.alert(body.msg, ' ')
      }
    }, function (response) {
      var body = response.body

      window.mui.alert(body.msg, ' ')
    })

    return {
      show_loading: true,
      timerId: null,
      remainTime: vm.$route.params.remain_time === '-1' ? vm.$route.params.question_ids.split(',').length * 5 * 60 * 1000 : +vm.$route.params.remain_time,
      my_quiz_id: vm.$route.params.my_quiz_id
    }
  },
  created () {
    var vm = this

    if (vm.my_quiz_id !== '0') {
      if (vm.remainTime !== 0) {
        vm.timerId = setInterval(function () {
          vm.$http.post('/api/common/decreaseQuizTime?token=' + vm.$store.state.token, {
            my_quiz_id: vm.my_quiz_id
          }).then(function (response) {
            var body = response.body

            if (body.ok === 0) {
              vm.remainTime = body.data.remainTime
              clearInterval(vm.timerId)
            } else {
              window.mui.alert(body.msg, ' ')
            }
          }, function (response) {
            var body = response.body

            window.mui.alert(body.msg, ' ')
          })
        }, 60000)
      }
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
  destroyed () {
    var vm = this

    clearInterval(vm.timerId)

    if (vm.remainTime === 0 || vm.my_quiz_id === '0') {
      return
    }

    var answers = []
    for (var i = 0; i < vm.$store.state.paper_questions.length; i++) {
      answers.push({text: vm.$store.state.paper_questions[i].text, pic: vm.$store.state.paper_questions[i].pic})
    }
    vm.$http.post('/api/common/setMyAnswer?token=' + vm.$store.state.token, {
      my_quiz_id: vm.my_quiz_id,
      answers: answers,
      finish: 0
    }).then(function (response) {
      var body = response.body

      if (body.ok === 0) {
        clearInterval(vm.timerId)
      } else {
        window.mui.alert(body.msg, ' ')
      }
    }, function (response) {
      var body = response.body

      window.mui.alert(body.msg, ' ')
    })
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
    startMyQuiz: function () {
      var vm = this

      var length = vm.$route.params.question_ids.split(',').length
      if (vm.my_quiz_id === '0') {
        vm.$http.post('/api/common/startMyQuiz?token=' + vm.$store.state.token, {
          paper_id: vm.$route.params._id,
          name: vm.$route.params.name,
          subject_id: vm.$route.params.subject_id,
          stid: vm.$route.params.question_ids,
          length: length,
          answers: []
        }).then(function (response) {
          var body = response.body

          vm.my_quiz_id = body.data.my_quiz_id

          vm.remainTime = length * 5 * 60 * 1000

          if (body.ok === 0) {
            vm.timerId = setInterval(function () {
              vm.$http.post('/api/common/decreaseQuizTime?token=' + vm.$store.state.token, {
                my_quiz_id: vm.my_quiz_id
              }).then(function (response) {
                var body = response.body

                if (body.ok === 0) {
                  vm.remainTime = body.data.remainTime
                  if (vm.remainTime === 0) {
                    clearInterval(vm.timerId)
                  }
                } else {
                  window.mui.alert(body.msg, ' ')
                }
              }, function (response) {
                var body = response.body

                window.mui.alert(body.msg, ' ')
              })
            }, 60000)
          } else {
            window.mui.alert(body.msg, ' ')
          }
        }, function (response) {
          var body = response.body

          window.mui.alert(body.msg, ' ')
        })
      } else {
        var answers = []
        for (var i = 0; i < length; i++) {
          answers.push({text: vm.$store.state.paper_questions[i].text, pic: vm.$store.state.paper_questions[i].pic})
        }
        vm.$http.post('/api/common/setMyAnswer?token=' + vm.$store.state.token, {
          my_quiz_id: vm.my_quiz_id,
          answers: answers,
          finish: 1
        }).then(function (response) {
          var body = response.body

          if (body.ok === 0) {
            vm.remainTime = 0
            clearInterval(vm.timerId)

            console.log(vm.my_quiz_id)

            vm.$router.replace('/quiz/paper-detail/' + vm.$route.params._id + '/' + vm.$route.params.name + '/' + vm.$route.params.subject_id + '/' + vm.my_quiz_id + '/0/' + vm.$route.params.question_ids)
          } else {
            window.mui.alert(body.msg, ' ')
          }
        }, function (response) {
          var body = response.body

          window.mui.alert(body.msg, ' ')
        })
      }
    },
    onChange: function (e, item) {
      var vm = this

      if (vm.remainTime === 0) {
        return
      }

      if (e.target.files && e.target.files[0]) {
        var formData = new FormData()
        formData.append('file', e.target.files[0])
        vm.$http.post('/api/common/uploadFile?token=' + vm.$store.state.token, formData).then(function (response) {
          item.pic = response.body.data.url
        }, function (response) {
          var body = response.body

          window.mui.alert(body.msg, ' ')
        })
      }
    }
  }
}
</script>
