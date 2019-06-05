const state = {
  params: {
    type: 'paper',
    semesterId: '',
    subjectId: '0',
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
  updateParamsType (state, payload) {
    state.params.type = payload.type
    console.log(payload.type)
  },
  updateParamsTypeSubjectId (state, payload) {
    state.params.type = payload.type
    state.params.subjectId = payload.subject_id
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
