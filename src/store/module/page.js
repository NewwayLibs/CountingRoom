import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  page: null
}

// getters
const getters = {
  page: state => state.page
}

// actions
const actions = {
  loadPage ({ commit, state }, slug) {
    return new Promise((resolve, reject) => {
      axios.get(`/pages?slug=` + slug)
        .then(response => {
          console.log('ON actions', response.data[0])
          commit(types.PAGE_LOADED, {page: response.data[0]})
          resolve()
        })
    })
  }
}

// mutations
const mutations = {
  [types.PAGE_LOADED] (state, { page }) {
    console.log('ON mutations', page)
    state.page = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
