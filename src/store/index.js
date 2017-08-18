import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import page from './modules/page'
import createLogger from '@/utils/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  modules: {
    page
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
