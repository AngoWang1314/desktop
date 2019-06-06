import Vue from 'vue'
import Router from 'vue-router'
// import { ipcRenderer } from 'electron'
import axios from 'axios'

Vue.use(Router)

// 挂载到vue和配置基础路径
Vue.http = Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://www.xuebabiji.club'

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
    var token = localStorage.getItem('token') || ''
    if (token) {
      config.url += '?token=' + token
    }
    return config
  },
  err => {
    // 返回请求的错误信息
    return Promise.reject(err)
  }
)
// http response 拦截器 ,拦截token过期状态，重新登录
axios.interceptors.response.use(
  response => {
    switch (response.data.ok) {
      case -3:
        // 返回 -3 清除token信息并跳转到登录页面
        localStorage.removeItem('token')

        if (!process.env.IS_WEB) {
          require('electron').ipcRenderer.send('logout')
        }

        Router.replace({
          path: '/',
          query: {redirect: Router.currentRoute.fullPath}
        })
    }
    return response
  },
  error => {
    // 返回接口的错误信息
    return Promise.reject(error)
  }
)

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
              path: 'paper-list-detail',
              name: 'PaperListDetail',
              component: require('@/components/LandingPage/PaperListDetail').default,
              children: [
                {
                  path: 'paper-list/:page',
                  name: 'PaperList',
                  component: require('@/components/LandingPage/PaperList').default
                },
                {
                  path: 'paper-detail/:_id/:name/:subject_id/:question_ids/:page',
                  name: 'PaperDetail',
                  component: require('@/components/LandingPage/PaperDetail').default
                }
              ]
            },
            {
              path: 'question',
              name: 'PaperQuestion',
              component: require('@/components/LandingPage/PaperQuestion').default
            }
          ]
        },
        {
          path: '/quiz',
          name: 'quiz',
          component: require('@/components/LandingPage/Quiz').default,
          children: [
            {
              path: 'quiz-question-basket',
              name: 'QuizQuestionBasket',
              component: require('@/components/LandingPage/QuizQuestionBasket').default
            },
            {
              path: 'quiz-question-basket-detail/:subject_id',
              name: 'QuizQuestionBasketDetail',
              component: require('@/components/LandingPage/QuizQuestionBasketDetail').default
            },
            {
              path: 'quiz-paper',
              name: 'QuizPaper',
              component: require('@/components/LandingPage/QuizPaper').default
            },
            {
              path: 'quiz-paper-detail/:_id/:name/:subject_id/:my_quiz_id/:remain_time/:question_ids',
              name: 'QuizPaperDetail',
              component: require('@/components/LandingPage/QuizPaperDetail').default
            },
            {
              path: 'quiz-record',
              name: 'QuizRecord',
              component: require('@/components/LandingPage/QuizRecord').default
            },
            {
              path: 'quiz-record-detail/:_id/:name/:subject_id/:my_quiz_id/:remain_time/:question_ids',
              name: 'QuizRecordDetail',
              component: require('@/components/LandingPage/QuizRecordDetail').default
            }
          ]
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
