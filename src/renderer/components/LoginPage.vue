<template>
  <div class="c-login-page">
    <div class="tc avatar">
      <img src="http://tb.himg.baidu.com/sys/portrait/item/644de89990e78886e5b1b1e4b880e7a59ee59f9fe78b975736" />
    </div>
    <div class="account-password">
      <div class="account">
        <label>账号：</label><input type="text" placeholder="请输入账号" autoFocus :value="account" @input="updateAccount" />
      </div>
      <div class="password">
        <label>密码：</label><input type="password" placeholder="请输入密码" :value="password" @input="updatePassword" @keypress="myDoLogin" />
      </div>
      <div class="tc btn-container">
        <button class="pure-button pure-button-primary" @click="doLogin">登陆</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .c-login-page {
    .avatar {
      padding: 30px 0;
      border-top: 1px solid #409eff;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .account-password {
      width: 235px;
      margin: 0 auto;
      label {
        font-weight: bold;
      }
      input {
        height: 34px;
        line-height: 34px;
        padding-left: 6px;
        outline: none;
        border: 1px solid #ccc;
        &:focus {
          outline-color: #0078e7;
          cursor: pointer;
        }
        &::placeholder {
          color: #9c9c9c;
        }
      }
      .password {
        margin-top: 20px;
      }
      .btn-container {
        margin-top: 30px;
        button {
          width: 90px;
          background-color: #409eff;
        }
      }
    }
  }
</style>

<script>
  import { ipcRenderer } from 'electron'
  import { mapState, mapGetters } from 'vuex'
  import { Message } from 'element-ui'

  export default {
    name: 'login-page',
    components: {},
    data () {
      return {
      }
    },
    computed: {
      ...mapState('Login', [
        'account',
        'password'
      ]),
      ...mapGetters('Login', [
      ])
    },
    methods: {
      updateAccount (e) {
        this.$store.commit('Login/updateAccount', {'account': e.target.value})
      },
      updatePassword (e) {
        this.$store.commit('Login/updatePassword', {'password': e.target.value})
      },
      myDoLogin (e) {
        if (e.keyCode === 13) {
          this.doLogin()
        }
      },
      doLogin () {
        const vm = this

        vm.$http.post('/api/common/doLogin', {
          username: vm.account,
          password: vm.password
        }).then(function (ret) {
          if (ret.data.ok === 0) {
            localStorage.setItem('token', ret.data.data.token)
            ipcRenderer.send('finish-login')
            window.e.$emit('did-login')
            vm.$router.push('/vdo')
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
