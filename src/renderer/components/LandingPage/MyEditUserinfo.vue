<template>
  <div class="userinfo">
    <div class="avatar-container" :style="{'background-image': 'url(' + (avatar ? domain + avatar : default_avatar) + ')'}">
      <form @submit.prevent="upload" method="post" enctype="multipart/form-data">
        <input type="file" name="picture" @change="onChange($event)">
      </form>
      <i class="icon iconfont icon-bianji edit"></i>
    </div>
    <div class="item">
      <label>昵称:</label>
      <input type="text" v-model="nickname">
    </div>
    <div class="item">
      <label>学段:</label>
      <select v-model="mySemesterId">
        <option value="2">小学</option>
        <option value="1">初中</option>
        <option value="0">高中</option>
      </select>
    </div>
    <div class="item">
      <label>年级:</label>
      <select v-model="gradeId">
        <option value="11" v-if="mySemesterId === '2'">一年级</option>
        <option value="10" v-if="mySemesterId === '2'">二年级</option>
        <option value="9" v-if="mySemesterId === '2'">三年级</option>
        <option value="8" v-if="mySemesterId === '2'">四年级</option>
        <option value="7" v-if="mySemesterId === '2'">五年级</option>
        <option value="6" v-if="mySemesterId === '2'">六年级</option>
        <option value="5" v-if="mySemesterId === '1'">初一</option>
        <option value="4" v-if="mySemesterId === '1'">初二</option>
        <option value="3" v-if="mySemesterId === '1'">初三</option>
        <option value="2" v-if="mySemesterId === '0'">高一</option>
        <option value="1" v-if="mySemesterId === '0'">高二</option>
        <option value="0" v-if="mySemesterId === '0'">高三</option>
      </select>
    </div>
    <div style="margin: 15px 0;text-align: center;">
      <button class="pure-button pure-button-primary" @click="setUserInfo()">保存</button>
      <button class="pure-button" @click="$router.back(-1)">返回</button>
    </div>
  </div>
</template>

<style scoped lang="less">
  .userinfo {
    background-color: #fff;
    .avatar-container {
      position: relative;
      width: 100%;
      height: 2500px;
      background-position: center;
      background-size: cover;
      overflow: hidden;
      form {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 3px;
        bottom: 3px;
        opacity: 0;
        z-index: 10;
      }
      .edit {
        position: absolute;
        z-index: 1;
        right: 3px;
        bottom: 3px;
        color: #007aff;
        font-size: 24px;
      }
    }
    .item {
      height: 50px;
      line-height: 50px;
      display: flex;
      border-bottom: 1px solid #efefef;
      label {
        display: inline-block;
        vertical-align: middle;
        width: 70px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }
      input, select {
        flex: 1;
        display: inline-block;
        vertical-align: middle;
        height: 48px;
        border: 0;
        padding: 0;
        margin: 0;
        font-size: 18px;
      }
    }
  }
</style>

<script>
  import { Message } from 'element-ui'

  export default {
    name: 'MyEditUserinfo',
    data () {
      var vm = this

      return {
        domain: 'http://www.xuebabiji.club',
        avatar: localStorage.getItem('avatar'),
        default_avatar: 'data:image/png;base64,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',
        nickname: (vm.$route.params.nickname === '-1' || vm.$route.params.nickname === 'undefined') ? '' : vm.$route.params.nickname,
        mySemesterId: (vm.$route.params.mySemesterId === '-1' || vm.$route.params.mySemesterId === 'undefined') ? '' : vm.$route.params.mySemesterId,
        gradeId: (vm.$route.params.gradeId === '-1' || vm.$route.params.gradeId === 'undefined') ? '' : vm.$route.params.gradeId
      }
    },
    methods: {
      setUserInfo: function () {
        var vm = this

        vm.$http.post('/api/common/setUserInfo', {
          avatar: vm.avatar,
          nickname: vm.nickname,
          mySemesterId: vm.mySemesterId,
          gradeId: vm.gradeId
        }).then(ret => {
          if (ret.data.ok === 0) {
            vm.$store.commit('Login/updateUserInfoParams', {
              'avatar': vm.avatar,
              'nickname': vm.nickname,
              'mySemesterId': vm.mySemesterId,
              'gradeId': vm.gradeId
            })

            vm.$router.back(-1)
          } else {
            Message({message: ret.data.msg, center: true})
          }
        }, ret => {
          Message({message: '设置失败！', center: true})
        })
      },
      onChange: function (e) {
        var vm = this

        if (e.target.files && e.target.files[0]) {
          var formData = new FormData()
          formData.append('file', e.target.files[0])
          vm.$http.post('/api/common/uploadFile', formData).then(function (ret) {
            vm.avatar = ret.data.data.url
          }, function (ret) {
            Message({message: ret.data.msg, center: true})
          })
        }
      }
    }
  }
</script>
