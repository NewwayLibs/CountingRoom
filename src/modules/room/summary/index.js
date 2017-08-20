import Menu from './components/Menu.vue'
import { mapMutations } from 'vuex'
import { ROOM_MODULE_LOADED } from '@/store/mutation-types'

export default {
  name: 'summary',
  components: {
    'summary-menu': Menu
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.updateModule({title: this.$t('title.summary')})
  },
  methods: {
    ...mapMutations('room/', {
      updateModule: ROOM_MODULE_LOADED
    })
  }
}
