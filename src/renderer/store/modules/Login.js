const state = {
  account: '',
  password: ''
}

const getters = {
  /* tenNum: (state, getters) => {
    return 10 * state.num
  } */
}

const mutations = {
  /* INCREASE (state, payload) {
    console.log('yyy')
    state.num += payload.num
  } */
  updateAccount (state, payload) {
    state.account = payload.account
  },
  updatePassword (state, payload) {
    state.password = payload.password
  }
}

const actions = {
  /* increase (context, payload) {
    console.log('xxx')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('INCREASE', payload)
        if ((new Date()).getTime() % 2 === 1) {
          resolve('zzz')
        } else {
          reject(new Error('nnn'))
        }
      }, 0)
    })
  } */
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
