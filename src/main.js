// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import Toaster from 'v-toaster'
import App from './App'
import routes from './routes'
// import store from './store'
import VueAuth from '@websanova/vue-auth'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})

// router
Vue.use(Router)
const router = new Router(routes)
Vue.router = router

// vuetify
Vue.use(Vuetify)

// axios
Vue.axios = axios
Object.defineProperties(Vue.prototype, {
  axios: {
    get () {
      return axios
    }
  },
  $http: {
    get () {
      return axios
    }
  }
})

Vue.axios.defaults.baseURL = 'http://localhost:3000'

// auth
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

// ProgressBar
Vue.use(VueProgressBar, {
  color: 'green',
  failedColor: 'red',
  height: '2px'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  template: '<App/>',
  components: {App}
})
