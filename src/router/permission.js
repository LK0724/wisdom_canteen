import router from '../router'
import store from '../store'
import {getToken} from '../utils/auth'

router.beforeEach((to, from, next) => {
  if (getToken() !== undefined) {
    store.dispatch('setToken', JSON.parse(getToken()))
  }
  if (to.meta.rule.isLogin === true) {
    if (store.state.token.token) {
      next()
    } else {
      next({path: '/login'})
    }
  }
  next()
})
