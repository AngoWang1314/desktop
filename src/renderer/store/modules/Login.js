const state = {
  account: '',
  password: '',
  verifycode: '',
  userInfo: {},
  my_papers: [],
  my_paper_ids: [],
  my_question_ids: []
}

const getters = {
}

const mutations = {
  updateAccount (state, payload) {
    state.account = payload.account
  },
  updatePassword (state, payload) {
    state.password = payload.password
  },
  updateVerifycode (state, payload) {
    state.verifycode = payload.verifycode
  },
  updateUserInfo (state, payload) {
    state.userInfo = payload.userInfo
    localStorage.setItem('avatar', payload.userInfo.avatar)
  },
  updateUserInfoParams (state, payload) {
    state.userInfo.avatar = payload.avatar
    state.userInfo.nickname = payload.nickname
    state.userInfo.mySemesterId = payload.mySemesterId
    state.userInfo.gradeId = payload.gradeId
    localStorage.setItem('avatar', payload.avatar)
  },
  updateMyPapers (state, payload) {
    state.my_papers = payload.my_papers
  },
  addMyPapers (state, payload) {
    state.my_papers.push(payload.my_paper)
  },
  updateMyPaperIds (state, payload) {
    state.my_paper_ids = payload.my_paper_ids
  },
  addMyPaperIds (state, payload) {
    state.my_paper_ids.push(payload.paper_id)
  },
  removeMyPaper (state, payload) {
    for (var i = 0, l = state.my_papers.length; i < l; i++) {
      if (state.my_papers[i]._id === payload.paper_id) {
        state.my_papers.splice(i, 1)
        var idx = state.my_paper_ids.indexOf(payload.paper_id)
        state.my_paper_ids.splice(idx, 1)
        return
      }
    }
  },
  updateMyQuestionIds (state, payload) {
    state.my_question_ids = payload.my_question_ids
  },
  addMyQuestionIds (state, payload) {
    state.my_question_ids.push(payload.question_id)
  },
  removeMyQuestionId (state, payload) {
    var idx = state.my_question_ids.indexOf(payload.question_id)
    state.my_question_ids.splice(idx, 1)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
