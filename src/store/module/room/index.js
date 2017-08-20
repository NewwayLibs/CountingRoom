import categories from './categories'
import {ROOM_MODULE_LOADED, ROOM_UPDATE_TITLE} from '../../mutation-types'

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
  [ROOM_MODULE_LOADED] (state, module) {
    state.currentModule = module
  },
  [ROOM_UPDATE_TITLE] (state, title) {
    state.title = title
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  modules: {
    categories
  }
}
