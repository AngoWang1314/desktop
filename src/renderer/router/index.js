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
          component: require('@/components/LandingPage/Paper').default,
          children: [
            {
              path: '/',
              name: 'PaperListDetail',
              component: require('@/components/LandingPage/PaperListDetail').default,
              children: [
                {
                  path: '/',
                  name: 'PaperList',
                  component: require('@/components/LandingPage/PaperList').default
                },
                {
                  path: '/paper-detail/:_id/:name/:subject_id/:question_ids',
                  name: 'PaperDetail',
                  component: require('@/components/LandingPage/PaperDetail').default
                }
              ]
            },
            {
              path: '/question',
              name: 'Question',
              component: require('@/components/LandingPage/Question').default
            }
          ]
        },
        {
          path: '/quiz',
          name: 'quiz',
          component: require('@/components/LandingPage/Quiz').default
        },
        {
          path: '/courseware',
          name: 'courseware',
          component: require('@/components/LandingPage/Courseware').default
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
