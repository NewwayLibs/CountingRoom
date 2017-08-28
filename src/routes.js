import Home from '@/modules/home/index.vue'
import Contacts from '@/modules/contacts/index.vue'
import Page from '@/modules/pages/index.vue'
import Login from '@/modules/auth/login/index.vue'
import Room from '@/modules/room/index.vue'
import Summary from '@/modules/room/summary/index.vue'
import Transactions from '@/modules/room/transactions/index.vue'
import Categories from '@/modules/room/categories/index.vue'

export default {
  mode: 'history',
  routes: [
    {path: '/:lang?/', name: 'home', component: Home},
    {path: '/:lang?/contacts', name: 'contacts', component: Contacts},
    {path: '/:lang?/pages/:page', name: 'pages', component: Page, meta: {auth: true}},
    {path: '/:lang?/login', name: 'login', component: Login, meta: {auth: null}},
    {
      path: '/room',
      name: 'room',
      component: Room,
      meta: {auth: true},
      children: [
        {path: 'summary', name: 'summary', component: Summary, meta: {auth: true}},
        {path: 'transactions/:accountId', name: 'transactions', component: Transactions, meta: {auth: true}},
        {path: 'categories', name: 'categories', component: Categories, meta: {auth: true}}
      ]
    }
  ]
}
