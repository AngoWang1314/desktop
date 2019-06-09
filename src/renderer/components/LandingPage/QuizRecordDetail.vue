<template>
  <div class="quiz-record-detail">
    <div class="name">
      <div class="remain-time" v-show="remainTime > 0">{{remainTime / 60000}}分钟</div>
      <div class="content">{{this.$route.params.name}}</div>
      <div class="btn" @click="startMyQuiz" v-show="remainTime > 0">{{my_quiz_id === '0' ? '开始测评' : '提交试卷'}}</div>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="item in paper_questions" v-bind:key="item._id">
        <div class="btn" @click="addToMyWrongQuestion(item)" v-show="remainTime === 0">添加到错题本</div>
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
          <div class="input-upload-container-container">
            <input type="text" placeholder="请输入答案" v-model="item.text" :disabled="remainTime === 0">
            <div class="upload-container">
              <form @submit.prevent="upload" method="post" enctype="multipart/form-data" v-show="remainTime !== 0">
                <input type="file" name="picture" class="btn" @change="onChange($event, item)">
              </form>
              <label class="btn" :style="{'color': remainTime === 0 ? '#ccc' : ''}">上传答案</label>
            </div>
          </div>
          <div class="img-container" v-show="item.pic">
            <img :src="'http://www.xuebabiji.club' + item.pic">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .quiz-record-detail {
    padding: 10px;
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
        cursor: pointer;
      }
    }
    .list-container {
      .list-item {
        position: relative;
        margin-top: 10px;
        padding: 5px;
        border: 1px solid #d4d4d4;
        font-size: 15px;
        color: #000;
        overflow: hidden;
        .btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 110px;
          text-align: center;
          height: 40px;
          line-height: 40px;
          color: #007aff;
          cursor: pointer;
          border: 1px solid #ccc;
          border-top: 0;
          border-right: 0;
          background-color: #fff;
        }
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
          position: relative;
          color: #007aff;
          text-align: right;
          .label {
            text-align: left;
            margin: 15px 0;
            color: #000;
          }
          .input-upload-container-container {
            display: flex;
            width: 100%;
            input {
              flex: 1;
              height: 40px;
              line-height: 40px;
              margin-bottom: 0;
              padding-left: 5px;
            }
            .upload-container {
              position: relative;
              display: inline-block;
              width: 84px;
              text-align: center;
              height: 40px;
              line-height: 40px;
              form {
                position: absolute;
                opacity: 0;
                z-index: 10;
                width: 100%;
                height: 100%;
                input {
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                }
              }
              .btn {
                position: absolute;
                z-index: 1;
                right: 0px;
                width: 100%;
                height: 100%;
                font-size: 16px;
                color: #007aff;
                cursor: pointer;
              }
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
    name: 'QuizRecordDetail',
    data () {
      return {
        paper_questions: [],
        my_quiz_id: this.$route.params.my_quiz_id,
        remainTime: +this.$route.params.remain_time,
        timerId: null
      }
    },
    created () {
      var vm = this

      vm.getPaperDetail()
      vm.initListener()
    },
    destroyed () {
      var vm = this

      clearInterval(vm.timerId)

      if (vm.remainTime === 0 || vm.my_quiz_id === '0') {
        return
      }

      var answers = []
      for (var i = 0; i < vm.paper_questions.length; i++) {
        answers.push({text: vm.paper_questions[i].text, pic: vm.paper_questions[i].pic})
      }
      vm.$http.post('/api/common/setMyAnswer', {
        my_quiz_id: vm.my_quiz_id,
        answers: answers,
        finish: 0
      }).then(function (ret) {
        if (ret.data.ok === 0) {
          clearInterval(vm.timerId)
        } else {
          Message({message: ret.data.msg, center: true})
        }
      }, function (ret) {
        Message({message: ret.data.msg, center: true})
      })
    },
    methods: {
      getPaperDetail () {
        const vm = this

        vm.$http.get('/api/common/getPaperDetail', {
          params: {
            collections: vm.getSubjectCollections(vm.$route.params.subject_id),
            question_ids: vm.$route.params.question_ids
          }
        }).then(function (ret) {
          for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
            ret.data.data.items[i].text = ''
            ret.data.data.items[i].pic = ''
          }

          if (ret.data.ok === 0) {
            vm.paper_questions = ret.data.data.items
            vm.show_loading = false

            if (vm.my_quiz_id !== '0') {
              vm.$http.get('/api/common/getMyAnswer', {
                params: {
                  my_quiz_id: vm.my_quiz_id
                }
              }).then(function (ret) {
                if (ret.data.ok === 0) {
                  var answers = ret.data.data.answers
                  for (var i = 0; i < answers.length; i++) {
                    vm.paper_questions[i].text = answers[i].text
                    vm.paper_questions[i].pic = answers[i].pic
                  }
                } else {
                  Message({message: ret.data.msg, center: true})
                }
              }, function (ret) {
                Message({message: ret.data.msg, center: true})
              })
            }
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      initListener () {
        const vm = this

        if (vm.my_quiz_id !== '0') {
          if (vm.remainTime !== 0) {
            vm.timerId = setInterval(function () {
              vm.$http.post('/api/common/decreaseQuizTime', {
                my_quiz_id: vm.my_quiz_id
              }).then(function (ret) {
                if (ret.data.ok === 0) {
                  vm.remainTime = ret.data.data.remainTime
                  clearInterval(vm.timerId)
                } else {
                  Message({message: ret.data.msg, center: true})
                }
              }, function (ret) {
                Message({message: ret.data.msg, center: true})
              })
            }, 60000)
          }
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
      startMyQuiz () {
        var vm = this

        var length = vm.$route.params.question_ids.split(',').length
        if (vm.my_quiz_id === '0') {
          vm.$http.post('/api/common/startMyQuiz', {
            paper_id: vm.$route.params._id,
            name: vm.$route.params.name,
            subject_id: vm.$route.params.subject_id,
            stid: vm.$route.params.question_ids,
            length: length,
            answers: []
          }).then(function (ret) {
            vm.my_quiz_id = ret.data.data.my_quiz_id

            vm.remainTime = length * 5 * 60 * 1000

            if (ret.data.ok === 0) {
              vm.timerId = setInterval(function () {
                vm.$http.post('/api/common/decreaseQuizTime', {
                  my_quiz_id: vm.my_quiz_id
                }).then(function (ret) {
                  if (ret.data.ok === 0) {
                    vm.remainTime = ret.data.data.remainTime
                    if (vm.remainTime === 5 * 60 * 1000) {
                      Message({message: '还剩5分钟就到交卷时间，请输入或上传答案！', center: true})
                    }
                    if (vm.remainTime === 0) {
                      clearInterval(vm.timerId)
                      Message({message: '时间已到，系统自动交卷！', center: true})
                      vm.$router.replace('/quiz/quiz-paper-detail/' + vm.$route.params._id + '/' + vm.$route.params.name + '/' + vm.$route.params.subject_id + '/' + vm.my_quiz_id + '/0/' + vm.$route.params.question_ids)
                    }
                  } else {
                    Message({message: ret.data.msg, center: true})
                  }
                }, function (ret) {
                  Message({message: ret.data.msg, center: true})
                })
              }, 60000)
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        } else {
          var answers = []
          for (var i = 0; i < length; i++) {
            answers.push({text: vm.paper_questions[i].text, pic: vm.paper_questions[i].pic})
          }
          vm.$http.post('/api/common/setMyAnswer', {
            my_quiz_id: vm.my_quiz_id,
            answers: answers,
            finish: 1
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.remainTime = 0
              clearInterval(vm.timerId)

              vm.$router.replace('/quiz/quiz-record-detail/' + vm.$route.params._id + '/' + vm.$route.params.name + '/' + vm.$route.params.subject_id + '/' + vm.my_quiz_id + '/0/' + vm.$route.params.question_ids)
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      },
      onChange (e, item) {
        var vm = this

        if (vm.remainTime === 0) {
          return
        }

        if (e.target.files && e.target.files[0]) {
          var formData = new FormData()
          formData.append('file', e.target.files[0])
          vm.$http.post('/api/common/uploadFile', formData).then(function (ret) {
            item.pic = ret.data.data.url
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      },
      addToMyWrongQuestion (item) {
        const vm = this

        vm.$http.post('/api/common/addToMyWrongQuestion', {
          subject_id: vm.$route.params.subject_id,
          question_id: item._id
        }).then(function (ret) {
          if (ret.data.ok === 0) {
            Message({message: '添加成功！', center: true})
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      }
    }
  }
</script>
