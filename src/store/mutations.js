import * as types from './mutation-types'

const mutaions = {
  [types.SET_TOKEN] (state, info) {
    state.token = info
  },
  [types.CLEAR_TOKEN] (state) {
    state.token = {}
  },
  [types.SET_CART_LIST] (state, info) {
    if (state.cartList.length > 0) {
      for (let i = 0; i < state.cartList.length; i++) {
        let item = state.cartList[i]
        if (item.productId === info.productId) {
          if (info.num === 0) {
            return state.cartList.splice(i, 1)
          } else {
            item.num = info.num
            return
          }
        } else if (i === state.cartList.length - 1) {
          return state.cartList.unshift(info)
        }
      }
    } else {
      return state.cartList.unshift(info)
    }
  },
  [types.CLEAR_CART_LIST] (state) {
    state.cartList = []
  },
  [types.SET_LOCATION] (state, info) {
    state.location = info
  }
}

export default mutaions
