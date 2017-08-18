// import Vue from 'vue'

const state = {
  title: 'Counting Room',
  currentModule: null
}

// getters
const getters = {
  title: state => state.title + (state.currentModule ? ' - ' + state.currentModule.title : '')
}

// mutations
const mutations = {
  updateCurrentModule (state, module) {
    state.currentModule = module
  },
  updateTitle (state, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
