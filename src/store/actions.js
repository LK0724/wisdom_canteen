// 处理异步的方法
import * as types from './mutation-types'

export const setToken = function ({commit}, token) {
  commit(types.SET_TOKEN, token)
}
export const clearToken = function ({commit}) {
  commit(types.CLEAR_TOKEN)
}
export const setCartList = function ({commit}, carList) {
  commit(types.SET_CART_LIST, carList)
}
export const clearCartList = function ({commit}) {
  commit(types.CLEAR_CART_LIST)
}
export const setLocation = function ({commit}, location) {
  commit(types.SET_LOCATION, location)
}
