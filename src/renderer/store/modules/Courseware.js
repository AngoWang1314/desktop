const state = {
  params: {
    semesterId: '',
    subjectId: '',
    gradeId: '',
    registerId: '',
    title: '',
    page: 1
  }
}

const getters = {
}

const mutations = {
  updateParams (state, payload) {
    state.params = payload.params
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
