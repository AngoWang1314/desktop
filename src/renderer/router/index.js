import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '/vdo',
          name: 'vdo',
          component: require('@/components/LandingPage/Vdo').default
        },
        {
          path: '/paper',
          name: 'paper',
          component: require('@/components/LandingPage/Paper').default
        },
        {
          path: '/ask',
          name: 'ask',
          component: require('@/components/LandingPage/Ask').default
        },
        {
          path: '/my',
          name: 'my',
          component: require('@/components/LandingPage/My').default
        }
      ]
    }
  ]
})
