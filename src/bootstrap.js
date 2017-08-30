// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueAuth from '@websanova/vue-auth'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueProgressBar from 'vue-progressbar'
import Toaster from 'v-toaster'
import VueI18nManager from 'vue-i18n-manager'
import VeeValidate from 'vee-validate'
import VueI18nUtils from 'vue-i18n-utils'

import App from './App'
import routes from './routes'
import store from './store'
import proxy from './locales'
import { default as ea } from './utils/event-aggregator'
import VForm from './components/Form.vue'
import VGrid from './components/Grid.vue'
import VField from './components/Field.vue'

import '../node_modules/vuetify/dist/vuetify.min.css'
import 'v-toaster/dist/v-toaster.css'
import './assets/style.sass'

Vue.component('v-form', VForm)
Vue.component('v-grid', VGrid)
Vue.component('v-field', VField)

Vue.use(Toaster, {timeout: 5000})
Vue.use(ea)
Vue.use(Vuetify)
Vue.use(VeeValidate, {
  errorBagName: 'vErrors',
  fieldsBagName: 'vFields'
})

// router
Vue.use(Router)
const router = new Router(routes)
Vue.router = router

Vue.use(VueI18nManager, {
  store,
  router,
  proxy,
  config: {
    defaultCode: 'ru-RU',
    languages: [
      {
        name: 'Russian',
        code: 'ru-RU',
        urlPrefix: null,
        translationKey: 'ru'
      },
      {
        name: 'Ukrainian',
        code: 'ua-UA',
        urlPrefix: 'ua',
        translationKey: 'ua'
      },
      {
        name: 'English',
        code: 'en-US',
        urlPrefix: 'en',
        translationKey: 'en'
      }
    ]
  }
})

Vue.use(VueI18nUtils)

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
const app = new Vue({
  store,
  router,
  template: '<App/>',
  components: {App}
})

// Vue.initI18nManager()

Vue.initI18nManager().then(() => {
  app.$mount('#app')
})
