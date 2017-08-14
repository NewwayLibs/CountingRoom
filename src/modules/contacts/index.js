import SubComp from './components/SubComp.vue'
import appFooter from '@/components/appFooter.vue'

export default {
  name: 'contacts',
  components: {
    SubComp,
    appFooter
  },
  data () {
    return {
      msg: 'Contacts data'
    }
  }
}
