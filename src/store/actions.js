import * as types from './mutation-types'

export const notify = ({commit}, message) => {
  commit('NOTIFY', {
    message: message
  })
}

export const addToCart = ({commit}, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
