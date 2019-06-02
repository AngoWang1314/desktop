import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
axios.defaults.baseURL = 'http://www.xuebabiji.club'
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* global's part */
window.e = new Vue()

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App />'
}).$mount('#app')
