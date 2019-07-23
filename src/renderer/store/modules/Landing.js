const state = {
  count: 1
}

const getters = {
  tenTimesCount: (state, getters) => {
    return 10 * state.count
  }
}

const mutations = {
  INCREASE (state, payload) {
    state.count += payload.count
  }
}

const actions = {
  increase (context, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('INCREASE', payload)
      }, 0)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
