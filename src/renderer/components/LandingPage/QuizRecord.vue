<template>
  <div class="quiz-record">
    <div class="card" v-for="(item, index) in quiz_records" v-bind:key="item._id" @click="$router.push('/quiz/quiz-record-detail/' + item._id + '/' + item.name + '/' + item.subjectId + '/' + item.myQuizId + '/' + item.remainTime + '/' + item.stid.join(','))">
      <div class="picture">
        <i class="icon iconfont icon-paper"></i>
      </div>
      <div class="content">
        <div class="name">
          {{item.name}}
        </div>
      </div>
      <div class="year-semester-subject-area-examtype">
        <div class="year">时间:{{item.createdAt | formatDate}}</div>
        <div class="semester clr">状态:{{item.remainTime/60000 === 0 ? '已完成' : '未完成'}}</div>
        <div class="del" @click="delMyQuizRecord(item, index)" @click.stop>删除</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .quiz-record {
    padding: 10px;
    .card {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      padding: 9px 5px;
      text-align: left;
      font-size: 15px;
      cursor: pointer;
      border: 1px solid #d4d4d4;
      &:last-child {
        margin-bottom: 0px;
      }
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
        width: 500px;
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
        .del {
          display: inline-block;
          color:#007aff;
        }
        .clr {
          color:#007aff;
          font-weight: bold;
        }
      }
    }
  }
</style>

<script>
  import { Message, MessageBox } from 'element-ui'

  export default {
    name: 'QuizRecord',
    data () {
      return {
        quiz_records: []
      }
    },
    filters: {
      formatDate: function (val) {
        var value = new Date(val)
        var year = value.getFullYear()
        var month = value.getMonth() + 1
        var day = value.getDate()
        var hour = value.getHours()
        var minutes = value.getMinutes()
        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes)
      }
    },
    created () {
      this.getQuizRecord()
    },
    methods: {
      getQuizRecord () {
        const vm = this

        vm.$http.get('/api/common/getMyQuizRecord').then(function (ret) {
          if (ret.data.ok === 0) {
            vm.quiz_records = ret.data.data.items
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      delMyQuizRecord: function (item, index) {
        var vm = this

        MessageBox.confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post('/api/common/delMyQuizRecord', {
            _id: item._id
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.quiz_records.splice(index, 1)
            } else {
              Message({message: ret.data.msg, center: true})
            }
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
