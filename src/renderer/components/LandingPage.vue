<template>
  <div id="wrapper">
    <!--{{ msg }}<br />
    {{ num }}<br />
    {{ tenNum }}<br />
    <button @click="increase({'num': 1})">异步增加</button><br />-->
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
      ...mapState('Landing', [
        'num'
      ]),
      ...mapGetters('Landing', [
        'tenNum'
      ])
    },
    methods: {
      increase (payload) {
        this.$store.dispatch('Landing/increase', payload).then(function (data) {
          console.log(data)
        }, function (data) {
          console.log(data)
        })
      }
    }
  }
</script>
