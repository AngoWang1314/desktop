const state = {
  params: {
    semesterId: '',
    subjectId: '',
    versionId: '',
    examtypeId: '',
    creditLineId: '',
    typeId: '',
    areaId: '',
    yearId: '',
    keyword: ''
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
