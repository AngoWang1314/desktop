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
  },
  updateSubjectId (state, payload) {
    state.params.subjectId = payload.subject_id
    console.log(state.params.subjectId)
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
