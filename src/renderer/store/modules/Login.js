const state = {
  account: '',
  password: '',
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
  updateUserInfo (state, payload) {
    state.userInfo = payload.userInfo
  },
  updateMyPaperIds (state, payload) {
    state.my_paper_ids.push(payload.paper_id)
  },
  updateMyPapers (state, payload) {
    state.my_papers = payload.my_papers
  },
  updateMyQuestionIds (state, payload) {
    state.my_question_ids.push(payload.question_id)
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
