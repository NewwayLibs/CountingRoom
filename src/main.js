// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
import App from './App'
import routes from './routes'
// import store from './store'
import VueAuth from '@websanova/vue-auth'
import '../node_modules/vuetify/dist/vuetify.min.css'

miniToastr.init({types: {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}})

// Here we setup messages output to `mini-toastr`
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}

// Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
// Required to pipe our output to UI library (mini-toastr in example here)
// All not-specified events (types) would be piped to output in console.
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

// Activate plugin
Vue.use(VueNotifications, options)// VueNotifications have auto install but if we want to specify options we've got to do it manually.

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
