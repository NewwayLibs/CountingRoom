import Vue from 'vue'
import axios from 'axios'
import { listToTree, deepCopy } from '@/utils/utils'
import {
  CATEGORY_INIT,
  CATEGORY_UPDATE
} from '../../mutation-types'

const state = {
  type: 'income',
  list: []
}

// getters
const getters = {
  income: state => listToTree(deepCopy(state.list.filter((row) => row.type === 'income'))),
  expense: state => listToTree(deepCopy(state.list.filter((row) => row.type === 'expense')))
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
  CATEGORY_UPDATE ({commit}, payload) {
    console.log('save category', payload)
    return new Promise((resolve, reject) => {
      axios.put('/categories/' + payload.id, payload)
        .then(response => {
          console.log('ON actions', response.data)
          commit('CATEGORY_UPDATE', payload)
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
