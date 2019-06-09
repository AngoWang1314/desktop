import Vue from 'vue'
import Router from 'vue-router'
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
      if (config.url.indexOf('?') > -1) {
        config.url += '&token=' + token
      } else {
        config.url += '?token=' + token
      }
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
      name: 'LoginPage',
      component: require('@/components/LoginPage').default
    },
    {
      path: '/landing-page',
      name: 'LandingPage',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '/vdo',
          name: 'Vdo',
          component: require('@/components/LandingPage/Vdo').default
        },
        {
          path: '/paper',
          name: 'Paper',
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
          name: 'Quiz',
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
          name: 'Courseware',
          component: require('@/components/LandingPage/Courseware').default,
          children: [
            {
              path: 'courseware-list',
              name: 'CoursewareList',
              component: require('@/components/LandingPage/CoursewareList').default
            },
            {
              path: 'courseware-detail/:real_url',
              name: 'CoursewareDetail',
              component: require('@/components/LandingPage/CoursewareDetail').default
            }
          ]
        },
        {
          path: '/ask',
          name: 'Ask',
          component: require('@/components/LandingPage/Ask').default,
          children: [
            {
              path: 'ask-list',
              name: 'AskList',
              component: require('@/components/LandingPage/AskList').default
            },
            {
              path: 'ask-detail/:_id',
              name: 'AskDetail',
              component: require('@/components/LandingPage/AskDetail').default
            }
          ]
        },
        {
          path: '/my',
          name: 'My',
          component: require('@/components/LandingPage/My').default,
          children: [
            {
              path: 'my-list',
              name: 'MyList',
              component: require('@/components/LandingPage/MyList').default
            },
            {
              path: 'my-edit-userinfo/:avatar/:nickname/:mySemesterId/:gradeId',
              name: 'MyEditUserinfo',
              component: require('@/components/LandingPage/MyEditUserinfo').default
            },
            {
              path: 'my-collect-video',
              name: 'MyCollectVideo',
              component: require('@/components/LandingPage/MyCollectVideo').default
            },
            {
              path: 'my-wrong-question',
              name: 'MyWrongQuestion',
              component: require('@/components/LandingPage/MyWrongQuestion').default
            },
            {
              path: 'my-ask',
              name: 'MyAsk',
              component: require('@/components/LandingPage/MyAsk').default
            },
            {
              path: 'my-about-software',
              name: 'MyAboutSoftware',
              component: require('@/components/LandingPage/MyAboutSoftware').default
            }
          ]
        }
      ]
    }
  ]
})
