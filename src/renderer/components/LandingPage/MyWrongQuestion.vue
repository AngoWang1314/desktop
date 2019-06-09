<template>
  <div class="question">
    <div class="tabs">
      <div v-for="(item, index) in $store.state.App.indexes.subject" :key="index" :class="{'tab': true, 'active': item.subjectId === activeSubjectId}" @click="changeSubject(item.subjectId)">{{ item.subjectName }}</div>
    </div>
    <div class="wrong-question" v-if="my_wrong_questions.length > 0">
      <div class="name">
        <div class="btn" style="text-align: left;" @click="$router.back(-1)">返回列表</div>
        <div class="content">
          <input type="text" placeholder="请输入试卷名称" v-model="name">
        </div>
        <div class="btn" @click="makeQuestionBasketToMyPaper">生成试卷</div>
      </div>
      <div class="list-container">
        <div class="list-item" v-for="(item, index) in my_wrong_questions" v-bind:key="item._id">
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
            <span class="btn" @click="openRemoveDialog(item, index)">从错题本移除</span>
          </div>
          <div class="answer-resolve-content" v-if="item.showAnswerResolveContent">
            <div class="answer" v-html="item.answer"></div>
            <div class="resolve-content" v-html="item.resolveContent.replace('解析试题分析', '解析')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip" v-if="my_wrong_questions.length === 0">
      您该错题本空空如也，非常棒哦
    </div>
  </div>
</template>

<style scoped lang="less">
  .question {
    height: 100%;
    overflow: hidden;
    .tabs {
      margin: -1px 0 0 -1px;
      border-bottom: 1px solid #dcdcdc;
      .tab {
        position: relative;
        top: 1px;
        display: inline-block;
        padding: 0 15px;
        text-align: center;
        height: 45px;
        line-height: 45px;
        cursor: pointer;
      }
      .active {
        color: #0078e7;
        border: 1px solid #dcdcdc;
        border-top: 0px solid #dcdcdc;
        border-bottom: 1px solid #ffffff;
      }
    }
    .wrong-question {
      height: calc(100% - 45px);
      overflow: auto;
    }
    .name {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      z-index: 100;
      height: 80px;
      margin: 10px;
      text-align: center;
      font-size: 18px;
      color: #000;
      font-weight: bold;
      background-color: #ffffff;
      .content {
        flex: 1;
        input {
          flex: 1;
          text-align: center;
          margin: 0 auto;
          padding: 0 8px !important;
          border: 0 !important;
          outline: none;
          border-bottom: 1px solid #ccc !important;
        }
      }
      .btn {
        width: 100px;
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
        margin: 10px;
        padding: 5px;
        border: 1px solid #d4d4d4;
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
            text-align: left;
            line-height: 18px;
            margin-top: 8px;
          }
        }
        .operation {
          line-height: 36px;
          color: #007aff;
          text-align: right;
          .btn {
            margin-right: 10px;
            cursor: pointer;
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
    .tip {
      text-align: center;
      margin-top: 200px;
      font-size: 18px;
      .jump {
        color:#007aff;
        cursor: pointer;
      }
    }
  }
</style>

<script>
  import { Message, MessageBox } from 'element-ui'

  export default {
    name: 'MyWrongQuestion',
    data () {
      return {
        activeSubjectId: '0',
        name: '',
        my_wrong_questions: []
      }
    },
    created () {
      this.getMyWrongQuestions()
    },
    methods: {
      changeSubject (id) {
        const vm = this

        vm.activeSubjectId = id

        vm.getMyWrongQuestions()
      },
      getMyWrongQuestions () {
        var vm = this

        vm.$http.get('/api/common/getMyWrongQuestion', {
          params: {
            collections: vm.getSubjectCollections(vm.activeSubjectId)
          }
        }).then(function (ret) {
          for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
            ret.data.data.items[i].showAnswerResolveContent = false
          }

          if (ret.data.ok === 0) {
            vm.my_wrong_questions = ret.data.data.items
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      makeQuestionBasketToMyPaper: function () {
        var vm = this

        if (vm.name.trim()) {
          vm.$http.post('/api/common/makeMyWrongQuestionToMyPaper', {
            subject_id: vm.activeSubjectId,
            name: vm.name,
            collections: vm.getSubjectCollections(vm.activeSubjectId),
            stid: vm.getStid()
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              Message({message: '生成成功！', center: true})
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        } else {
          Message({message: '试卷名称必填！', center: true})
        }
      },
      toggleAnswerAnalyse: function (item) {
        item.showAnswerResolveContent = !item.showAnswerResolveContent
      },
      openRemoveDialog: function (item, index) {
        var vm = this

        MessageBox.confirm('确定移除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post('/api/common/removeFromMyWrongQuestion', {
            question_id: item._id
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.my_wrong_questions.splice(index, 1)
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }).catch(() => {
        })
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
      getStid: function () {
        var stid = []

        for (var i = 0; i < this.my_wrong_questions.length; i++) {
          stid.push(this.my_wrong_questions[i]._id)
        }

        return stid.join(',')
      }
    }
  }
</script>
