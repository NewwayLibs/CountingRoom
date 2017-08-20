import Vue from 'vue'
import axios from 'axios'
import {
  CATEGORY_INIT,
  CATEGORY_UPDATE,
  CATEGORY_DELETE
} from '../../mutation-types'

const state = {
  type: 'income',
  list: []
}

// getters
const getters = {
  income: state => state.list.filter((row) => row.type === 'income'),
  expense: state => state.list.filter((row) => row.type === 'expense')
}

// mutations
const mutations = {
  [CATEGORY_INIT] (state, list) {
    Vue.set(state, 'list', list)
  },
  [CATEGORY_UPDATE] (state, category) {
    let idx = state.list.findIndex(item => category.id === item.id)
    if (idx >= 0) {
      Vue.set(state.list, idx, category)
    } else {
      Vue.set(state.list, state.list.length, category)
    }
  },
  [CATEGORY_DELETE] (state, categoryId) {
    let idx = state.list.findIndex(item => categoryId === item.id)
    if (idx >= 0) {
      Vue.delete(state.list, idx)
    }
  }
}

// actions
const actions = {
  CATEGORY_INIT ({commit}) {
    return new Promise((resolve, reject) => {
      axios.get('/categories')
        .then(response => {
          console.log('ON actions', response.data)
          commit('CATEGORY_INIT', response.data)
          resolve()
        })
    })
  },
  CATEGORY_ADD ({commit}, payload) {
    console.log('add category', payload)

    // @todo remove
    payload.profile_id = 2
    payload.usage = 2

    return new Promise((resolve, reject) => {
      axios.post('/categories', payload)
        .then(response => {
          console.log('CATEGORY_ADD actions', response.data)
          commit('CATEGORY_UPDATE', response.data)
          resolve()
        })
    })
  },
  CATEGORY_UPDATE ({commit}, payload) {
    console.log('save category', payload)
    return new Promise((resolve, reject) => {
      axios.put('/categories/' + payload.id, payload)
        .then(response => {
          console.log('ON actions', response.data)
          commit('CATEGORY_UPDATE', payload)
          resolve()
          // reject()
        })
    })
  },
  CATEGORY_DELETE ({commit}, payload) {
    console.log('save category', payload)
    return new Promise((resolve, reject) => {
      axios.delete('/categories/' + payload.id)
        .then(response => {
          commit('CATEGORY_DELETE', payload.id)
          resolve()
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
