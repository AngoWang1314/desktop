const state = {
  account: '',
  password: ''
}

const getters = {
}

const mutations = {
  updateAccount (state, payload) {
    state.account = payload.account
  },
  updatePassword (state, payload) {
    state.password = payload.password
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
