const state = {
  num: 1
}

const getters = {
  tenNum: (state, getters) => {
    return 10 * state.num
  }
}

const mutations = {
  INCREASE (state, payload) {
    state.num += payload.num
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
