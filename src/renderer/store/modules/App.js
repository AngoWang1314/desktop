const state = {
  indexes: {}
}

const getters = {
}

const mutations = {
  updateIndexes (state, payload) {
    state.indexes = payload.indexes
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
