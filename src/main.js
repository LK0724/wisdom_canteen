import Vue from 'vue'
import App from './App'
import router from './router'
import Vant, {Lazyload} from 'vant'
import store from './store'
import 'vant/lib/index.css'
import '@/mock/index.js'
import './router/permission'

// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(Vant)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
