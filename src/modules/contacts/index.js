import SubComp from './components/SubComp.vue'
import Links from '@/components/Links.vue'

export default {
  name: 'contacts',
  components: {
    SubComp,
    Links
  },
  data () {
    return {
      msg: 'Contacts data'
    }
  }
}
