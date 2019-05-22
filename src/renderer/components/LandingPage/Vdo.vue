<template>
  <div class="c-vdo">
    <div class="search-condition-container">
      <div class="row">
        <label>学段：</label>
        <div class="list">
          <span :class="{'item': true, 'active': semester_id == ''}" @click="changeItem('semester_id', '')">全部</span>
          <span :class="{'item': true, 'active': semester_id == '2'}" @click="changeItem('semester_id', '2')">小学</span>
          <span :class="{'item': true, 'active': semester_id == '1'}" @click="changeItem('semester_id', '1')">初中</span>
          <span :class="{'item': true, 'active': semester_id == '0'}" @click="changeItem('semester_id', '0')">高中</span>
        </div>
      </div>
      <div class="row">
        <label>年级：</label>
        <div class="list">
          <span :class="{'item': true, 'active': grade_id == ''}" @click="changeItem('grade_id', '')">全部</span>
          <span :class="{'item': true, 'active': grade_id == '11'}" @click="changeItem('grade_id', '11')">一年级</span>
          <span :class="{'item': true, 'active': grade_id == '10'}" @click="changeItem('grade_id', '10')">二年级</span>
          <span :class="{'item': true, 'active': grade_id == '9'}" @click="changeItem('grade_id', '9')">三年级</span>
          <span :class="{'item': true, 'active': grade_id == '8'}" @click="changeItem('grade_id', '8')">四年级</span>
          <span :class="{'item': true, 'active': grade_id == '7'}" @click="changeItem('grade_id', '7')">五年级</span>
          <span :class="{'item': true, 'active': grade_id == '6'}" @click="changeItem('grade_id', '6')">六年级</span>

          <span :class="{'item': true, 'active': grade_id == '5'}" @click="changeItem('grade_id', '5')">初一</span>
          <span :class="{'item': true, 'active': grade_id == '4'}" @click="changeItem('grade_id', '4')">初二</span>
          <span :class="{'item': true, 'active': grade_id == '3'}" @click="changeItem('grade_id', '3')">初三</span>

          <span :class="{'item': true, 'active': grade_id == '2'}" @click="changeItem('grade_id', '2')">高一</span>
          <span :class="{'item': true, 'active': grade_id == '1'}" @click="changeItem('grade_id', '1')">高二</span>
          <span :class="{'item': true, 'active': grade_id == '0'}" @click="changeItem('grade_id', '0')">高三</span>
        </div>
      </div>

      <div class="row">
        <label>学科：</label>
        <div class="list">
          <span :class="{'item': true, 'active': subject_id == ''}" @click="changeItem('subject_id', '')">全部</span>
          <span :class="{'item': true, 'active': subject_id == '4'}" @click="changeItem('subject_id', '4')">语文</span>
          <span :class="{'item': true, 'active': subject_id == '0'}" @click="changeItem('subject_id', '0')">数学</span>
          <span :class="{'item': true, 'active': subject_id == '1'}" @click="changeItem('subject_id', '1')">英语</span>
          <span :class="{'item': true, 'active': subject_id == '5'}" @click="changeItem('subject_id', '5')">生物</span>
          <span :class="{'item': true, 'active': subject_id == '2'}" @click="changeItem('subject_id', '2')">物理</span>
          <span :class="{'item': true, 'active': subject_id == '3'}" @click="changeItem('subject_id', '3')">化学</span>
          <span :class="{'item': true, 'active': subject_id == '8'}" @click="changeItem('subject_id', '8')">政治</span>
          <span :class="{'item': true, 'active': subject_id == '7'}" @click="changeItem('subject_id', '7')">地理</span>
          <span :class="{'item': true, 'active': subject_id == '6'}" @click="changeItem('subject_id', '6')">历史</span>
        </div>
      </div>
      <div class="row">
        <label>搜索：</label>
        <div class="list">
          <input type="text" placeholder="请输入视频名称搜索" v-model="keyword"><button class="pure-button pure-button-primary" @click="doSearch">搜索</button>
        </div>
      </div>
    </div>
    <div class=" list-container">
      <div class="pure-g">
        <div class="pure-u-1-6" v-for="(item, index) in list" :key="index" :title="item.title"  @click="play(item)">
          <div class="item">
            <div class="img-container" :style="{'background-image': 'url(' + item.image_urls + ')'}"></div>
            <div class="description">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="tc pagination" v-show="total > 0">
        <span @click="prev">上一页</span>
        &nbsp;&nbsp;{{ page }}/{{ Math.ceil(total / perpage) }}&nbsp;&nbsp;
        <span @click="next">下一页</span>
      </div>
    </div>
    <div class="layer" v-if="is_playing">
    </div>
    <div class="iframe-container" v-if="is_playing">
      <iframe allowfullscreen="allowfullscreen" :src="iframe_src"></iframe>
      <img class="close" @click="stop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEl0lEQVRYR7VXXWgcVRT+zsxuxA22DXEzc+8QNWoU/Esp1AgtgoVqSiUvWoWm+GCFVn0QfzBY9Ukt/lUEayuign9otX0R2yKKvthCpVRj0BqoNRrmzsxuY0JqqCYzc+SGmbBuN7sTkwzMy9xzzvfN+bvnEDI+IyMjF5qmuYGZ7wbQSUStzGwBiAGMAjhDRCcBHBBCHCSiv7OYpkZCnucVmXkngM3MPGgYxrsAjjNzSQgR+L5/EYBr9BvH8Woi0iSXE9GHRLRDCFGuhzEnAWbOKaUeBdBPRJ/kcrmX29raTjUirM99378+iqKniGgjMz8jpXyFiKZr6dYkMD4+3jI5Ofk5EQ3n8/nHisWilwW4WsZ13TVE9JYOT6FQ6F2xYsVYtcx5BIIguDwMw8MAdjuO89r/Aa7U8X2/OY7j9wCsNE3zVsuyfq08/w8BpdTFAI4x8zbHcb5aKHilvlLqWQB9AFZLKc+kZ7MEkiz/FsD7UspXFxM8teW67sdEdEUURTe3t7ef099nCXie9zwzd0op71gKcG2TmS9QSn1HRIeklE/MEvB9vy2KoqGmpqZri8WiWioC2q5SahUzH8nlcpdZlhXMeEAptRfAn1LKJ5cSvCIU+4hoTEq5nZi5yfO8sXw+31nv70dHR5eFYdhhWdZAPZJBEHQx8ynbtifnktMyURQdFUIsI6XUbcz8ouM4XfUMK6UuATBIRFuFEPtryXqed2ccx28ahrFKCDHcwN5vALaT67q7iWhCSrmjkft93++O4/gLIrqvmoQGZ2bddNZJKU80suW67ksACtoD3xDRHiHEp42UkjarSXzJzFscx/lMf3Ndt5eIPjAMY71t28ey2PE87y5mvl8TOGma5lbLso5mUUySdi0A3S03JTqa/AYppe4jmZ60TWsC40S0slHMqq36vr8ujmN9X8RE1Gvb9teZkBMh3/c74jj+XhM4axjGDbZt66TI/KQEknmgZz5/r0H0nRNF0YBOwiEA9zqOcyQrulKqOgT7AGycDwkdAgDvpEn4+lylVcP1i5WEm5j5Ae2BPQD+chzn8UYeyFCGbwO4JUsZJnfPcu2BHgB7pZQd9QgkSfNDvUaklOpjZt1XuqSUf9Sz57ruABH1z7RiXQmmaXbbtj04l5IeLIjoykatuFQq6cHjdGtr68RctpK543chREt6Gb0BoFVKmdZ1o2gs6Dxxf4uUctsMgSAIrDAMh4loTZb4LQS9XC7Lqampn0zTvNq27dLsQKKU2snMupRuJKJ/FgJST1cpdQDAUHr31BrJ9OHmpSCglHoYwJYoitaeN5IlPV4PpceTufDpxSThuu56ItK51l1zKE3BknLTff2EYRj31BssshL0PO/BOI4fyuVyPZZlna7Uq7uYANAemVebrjReLpfF9PT0Lma+tLm5+fZMi0lqQK9mnuf1A9DT6yHTNJ9r1ANS3VKp1BmG4SN6kSWiXUKIF4gorOWxzMspM/cR0VlmPmgYhs6TnwuFwo8TExPnTNNsA6CX2Jt0khHRdQA+WtByWs02WVx6kvX8Kr2eJyHS8366nv8CYH+ynmcq5X8BhQlZ/CI+V64AAAAASUVORK5CYII=">
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-vdo {
    position: relative;
    height: 100%;
    .search-condition-container {
      .row {
        padding: 10px 0;
        border-bottom: 1px #e4ecf3 dashed;
      }
      label {
        display: inline-block;
        width: 60px;
        text-align: right;
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
          border: 1px solid #ccc;
          height: 37px;
          line-height: 37px;
          padding: 5px;
          vertical-align: middle;
          outline: none;
        }
        button {
          border-radius: 0px;
        }
      }
    }
    .list-container {
      padding: 5px;
      overflow: auto;
      text-align: center;
      margin: 0 auto;
      @media screen and (max-width: 1390px) {
        max-height: 530px;
      }
      .item {
        display: inline-block;
        width: 100%;
        height: 240px;
        cursor: pointer;
        padding: 5px;
        @media screen and (max-width: 1390px) {
          height: 160px;
        }
        .img-container {
          width: 100%;
          height: 210px;
          background-size: cover;
          background-position: center;
          border: 1px solid #d8d8d8;
          @media screen and (max-width: 1390px) {
            height: 130px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .description {
          width: 100%;
          white-space: nowrap;
          height: 30px;
          line-height: 30px;
          padding: 0px 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          border: 1px solid #d8d8d8;
          border-top: 0;
        }
      }
    }
    .pagination {
      margin: 30px 0px;
      span {
        cursor: pointer;
      }
    }
    .layer {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      background-color: #000000;
      opacity: 0.6;
    }
    .iframe-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1120px;
      height: 480px;
      margin: -240px 0 0 -610px;
      iframe {
        width: 100%;
        height: 100%;
        border: 0px solid #ccc;
        overflow: hidden;
      }
      .close {
        position: absolute;
        top: -28px;
        right: -28px;
        cursor: pointer;
      }
    }
  }
</style>

<script>
  import { ipcRenderer } from 'electron'
  import { Message } from 'element-ui'

  export default {
    name: 'vdo',
    data () {
      return {
        semester_id: '',
        grade_id: '',
        subject_id: '',
        keyword: '',
        perpage: 28,
        page: 1,
        list: [],
        total: 0,
        our_base_url: 'http://www.xuebabiji.club/player/index.html?item=',
        is_playing: false,
        iframe_src: ''
      }
    },
    created () {
      this.doSearch()
    },
    methods: {
      changeItem (key, value) {
        this[key] = value
        this.doSearch()
      },
      doSearch () {
        const vm = this

        vm.$http.get('/api/video/getVideoList', {
          params: {
            token: localStorage.getItem('token'),
            semesterId: vm.semester_id,
            gradeId: vm.grade_id,
            subjectId: vm.subject_id,
            title: vm.keyword,
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
      play (item) {
        const vm = this
        vm.iframe_src = vm.our_base_url + JSON.stringify(item)
        // vm.is_playing = true
        ipcRenderer.send('open-window', vm.iframe_src)
      },
      stop () {
        this.is_playing = false
      }
    }
  }
</script>
