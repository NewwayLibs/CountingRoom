import {
  NOTIFY
} from './mutation-types'

export const mutations = {
  [NOTIFY] (state, msg) {
    state.msg = msg
  }
}
