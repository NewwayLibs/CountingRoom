import appFooter from '@/components/appFooter.vue'
import { mapGetters } from 'vuex'
import store from '@/store'
import Notify from '@/mixins/notify'

export default {
  name: 'pages',
  mixins: [Notify],
  components: {
    appFooter
  },
  computed: {
    ...mapGetters(['page'])
  },
  beforeRouteEnter (to, from, next) {
    console.log(to.params, to)
    store.dispatch('loadPage', to.params.page)
      .then(response => {
        console.log('ON beforeRouteEnter', response)
        next()
      })
      .catch(e => {
        console.error('ON beforeRouteEnter', e)
        // this.error(e.getMessage())
      })
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('loadPage', to.params.page)
      .then(response => {
        console.log('ON beforeRouteUpdate', response)
        next()
      })
      .catch(e => {
        console.error('ON beforeRouteUpdate', e)
        this.error(e.getMessage())
      })
  }
}
