const state = {
  indexes: {},
  grade: [
    {gradeId: '0', gradeName: '高三'},
    {gradeId: '1', gradeName: '高二'},
    {gradeId: '2', gradeName: '高一'},
    {gradeId: '3', gradeName: '初三'},
    {gradeId: '4', gradeName: '初二'},
    {gradeId: '5', gradeName: '初一'},
    {gradeId: '6', gradeName: '六年级'},
    {gradeId: '7', gradeName: '五年级'},
    {gradeId: '8', gradeName: '四年级'},
    {gradeId: '9', gradeName: '三年级'},
    {gradeId: '10', gradeName: '二年级'},
    {gradeId: '11', gradeName: '一年级'}
  ]
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
