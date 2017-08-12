import Home from '@/modules/home/index.vue'
import Contacts from '@/modules/contacts/index.vue'
import Page from '@/modules/pages/index.vue'
import Login from '@/modules/auth/login/index.vue'

export default {
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/contacts', name: 'contacts', component: Contacts},
    {path: '/pages/:page', name: 'pages', component: Page, meta: {auth: true}},
    {path: '/login', name: 'login', component: Login, meta: {auth: null}}
  ]
}
