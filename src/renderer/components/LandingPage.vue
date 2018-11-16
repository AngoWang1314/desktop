<template>
  <div id="wrapper">
    {{ msg }}<br />
    {{ num }}<br />
    {{ tenNum }}<br />
    <button @click="increase({'num': 1})">异步增加</button><br />
    <SystemInformation></SystemInformation>
  </div>
</template>

<style scoped>
</style>

<script>
  import { mapState, mapGetters } from 'vuex'
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      return {
        msg: 'Hellow World!'
      }
    },
    computed: {
      ...mapState('Counter', [
        'num'
      ]),
      ...mapGetters('Counter', [
        'tenNum'
      ])
    },
    methods: {
      open () {
        this.$electron.shell.openExternal('https://www.baidu.com')
      },
      increase (payload) {
        console.log(this.$store)
        // this.$store.commit('Counter/INCREASE', payload)
        this.$store.dispatch('Counter/increase', payload).then(function (data) {
          console.log(data)
        }, function (data) {
          console.log(data)
        })
      }
    }
  }
</script>
