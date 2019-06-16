<template>
  <div class="c-vdo">
    <div class="search-condition-container">
      <div class="row">
        <select v-model="semesterId">
          <option value="">请选择学段</option>
          <option :value="item.semesterId" v-for="(item, index) in indexes.semester" :key="index">{{ item.semesterName }}</option>
        </select>
        <select v-model="gradeId">
          <option value="">请选择年级</option>
          <option :value="item.gradeId" v-for="(item, index) in indexes.grade" :key="index">{{ item.gradeName }}</option>
        </select>
        <select v-model="subjectId">
          <option value="">请选择学科</option>
          <option :value="item.subjectId" v-for="(item, index) in indexes.subject" :key="index">{{ item.subjectName }}</option>
        </select>
        <div class="list">
          <input type="text" placeholder="请输入视频名称搜索" v-model="title" @keypress="enterSearch"><button class="pure-button pure-button-primary" @click="clickSearch">搜索</button>
        </div>
      </div>
    </div>
    <div class="result-container">
      <div class="pure-g">
        <div class="pure-u-1-6" v-for="(item, index) in list" :key="index" :title="item.title"  @click="play(item)">
          <div class="item">
            <div class="img-container" :style="{'background-image': 'url(' + item.image_urls + ')'}"></div>
            <div class="description">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="tc pagination" v-show="total > 0">
        <span :class="{'disabled': page < 2}" @click="prev">上一页</span>
        {{ page }}/{{ Math.ceil(total / perpage) }}
        <span :class="{'disabled': total / perpage <= page}" @click="next">下一页</span>
      </div>
    </div>
    <div class="layer" v-if="is_playing">
    </div>
    <div class="iframe-container" v-if="is_playing">
      <iframe allowfullscreen="allowfullscreen" :src="iframe_src"></iframe>
      <img class="close" @click="stop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVUlEQVRYR+2WS0rEQBRFz12BK3AbLsCRI/HTYktriw2uyYEifvADfhEEh27INVx5UA0xdHdS6UE5SE0ySdU7ue/dWxGFlwrXpwfoFfjfCtheA1YlvXRxi+1d4EfS97z9CxWwvQM8AWNJdzkQtifAOTCQ9NYJIDbZHgOXwHFbCNsj4AY4kRTPuavVDFQghpKeFx1oewA8ApOm4nFOK4CKEhdJ0o9ZEKn4fWpZQDSu1gAJYghcA3uS/kDY3kzzEq1qVTxLgemn2A6IK2BL0lcC2wDegYNFAzdLjiwFKhDbQLgiXBIrbHqYW7yTAjWI2zAKEMP52djwGS90UiDJHipMLRY5MdfrS9uwfoDtegtegVEXiGwFig5hKl7GhikNywRR0Si2fQqcFbmMbO8DD8BR25uwkhPLX8e214GVLvZKWbHcD0mXZMvdk50DuQWa3u8BegWKK/ALI6ChIZ3ISgcAAAAASUVORK5CYII=">
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-vdo {
        position: relative;
    height: 100%;
    .search-condition-container {
      .row {
        padding: 10px;
        border-bottom: 1px #e4ecf3 dashed;
      }
      label {
        display: inline-block;
        width: 60px;
        text-align: right;
      }
      select {
        width: 105px;
        height: 37px;
        line-height: 37px;
        vertical-align: middle;
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
          height: 37px;
          line-height: 37px;
          padding: 5px;
          font-size: 16px;
          vertical-align: middle;
          outline: none;
          border: 1px solid #409eff;
        }
        button {
          border-radius: 0px;
        }
      }
    }
    .result-container {
      height: calc(100% - 58px);
      margin: 0 auto;
      padding: 5px;
      text-align: center;
      overflow: auto;
      .item {
        display: inline-block;
        width: 100%;
        padding: 5px;
        cursor: pointer;
        .img-container {
          width: 100%;
          height: 240px;
          background-size: cover;
          background-position: center;
          border: 1px solid #d8d8d8;
          .label {
            margin-top: 50px;
            color: #409eff;
            font-weight: bold;
          }
          .summary {
            margin-top: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          @media screen and (max-width: 1390px) {
            height: 145px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .description {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0px 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          white-space: nowrap;
          border: 1px solid #d8d8d8;
          border-top: 0;
        }
      }
    }
    .pagination {
      margin: 55px 0px;
      @media screen and (max-width: 1390px) {
        margin: 30px 0px;
      }
      span {
        margin: 0 10px;
        cursor: pointer;
      }
      .disabled {
        color: #ccc;
        cursor: default;
      }
    }
    .layer {
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      z-index: 100000;
      background: transparent;
    }
    .iframe-container {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 100001;
      width: 1120px;
      height: 480px;
      margin: -240px 0 0 -560px;
      border: 1px solid #ccc;
      iframe {
        width: 100%;
        height: 100%;
        border: 0px solid #ccc;
        overflow: hidden;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
</style>

<script>
  import { mapState } from 'vuex'
  import { Message } from 'element-ui'

  export default {
    name: 'Vdo',
    data () {
      return {
        semesterId: '',
        gradeId: '',
        subjectId: '',
        title: '',
        perpage: 18,
        page: 1,
        list: [],
        total: 0,
        our_base_url: 'http://www.xuebabiji.club/player/desktop.html',
        iframe_src: '',
        is_playing: false
      }
    },
    computed: {
      ...mapState('App', [
        'indexes',
        'grade'
      ])
    },
    created () {
      this.clickSearch()
    },
    methods: {
      enterSearch (e) {
        if (e.keyCode === 13) {
          this.clickSearch()
        }
      },
      clickSearch () {
        this.page = 1
        this.doSearch()
      },
      doSearch () {
        const vm = this

        vm.$http.get('/api/video/getVideoList', {
          params: {
            semesterId: vm.semesterId,
            gradeId: vm.gradeId,
            subjectId: vm.subjectId,
            title: vm.title,
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
      play (item) {
        const vm = this

        vm.iframe_src = vm.our_base_url + '?token=' + localStorage.getItem('token') + '&_id=' + item._id
        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('open-window', vm.iframe_src)
        } else {
          vm.is_playing = true
        }
      },
      stop () {
        this.is_playing = false
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
