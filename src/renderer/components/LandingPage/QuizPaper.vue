<template>
  <div class="quiz-paper">
    <div class="card" v-for="(item, index) in $store.state.Login.my_papers" v-bind:key="item._id" @click="$router.push('/quiz/quiz-paper-detail/' + item._id + '/' + item.name + '/' + item.subjectId + '/0/-1/' + item.stid.join(','))">
      <div class="picture">
        <i class="icon iconfont icon-paper"></i>
      </div>
      <div class="content">
        <div class="name">
          {{item.name}}
        </div>
      </div>
      <div class="year-semester-subject-area-examtype">
        <div class="year" v-show="item.yearName">{{item.yearName}}年</div>
        <div class="semester" v-show="item.semesterName">{{item.semesterName}}</div>
        <div class="subject" v-show="item.subjectName">{{item.subjectName}}</div>
        <div class="area" v-show="item.areaName">{{item.areaName}}</div>
        <div class="examtype" v-show="item.examtypeName">{{item.examtypeName}}</div>
        <div class="other" v-show="!item.yearName">自主组卷</div>
        <div class="del" @click="delMyPaper(item, index)" @click.stop>删除</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .quiz-paper {
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
        width: 400px;
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
  }
</style>

<script>
  import { Message, MessageBox } from 'element-ui'

  export default {
    name: 'QuizPaper',
    data () {
      return {
      }
    },
    created () {
      this.getMyPapers()
    },
    methods: {
      getMyPapers () {
        const vm = this

        vm.$http.get('/api/common/getMyPaper').then(function (ret) {
          if (ret.data.ok === 0) {
            var myPaperIds = []
            for (var i = 0, l = ret.data.data.items.length; i < l; i++) {
              myPaperIds.push(ret.data.data.items[i]._id)
            }
            vm.$store.commit('Login/updateMyPapers', {'my_papers': ret.data.data.items})
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, function (ret) {
          Message({message: ret.data.msg, center: true})
        })
      },
      delMyPaper (item, index) {
        var vm = this

        MessageBox.confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$http.post('/api/common/delMyPaper', {
            _id: item._id
          }).then(function (ret) {
            if (ret.data.ok === 0) {
              vm.$store.commit('Login/removeMyPaper', {'paper_id': item._id})
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
