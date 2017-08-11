import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/modules/home/index.vue'
import Contacts from '@/modules/contacts/index.vue'
import Page from '@/modules/pages/index.vue'
import Login from '@/modules/auth/login/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/contacts', name: 'contacts', component: Contacts},
    {path: '/pages/:page', name: 'pages', component: Page},
    {path: '/login', name: 'auth-login', component: Login}
  ]
})
