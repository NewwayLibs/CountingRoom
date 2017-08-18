import Menu from './components/Menu.vue'
import { mapMutations } from 'vuex'

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
    ...mapMutations({
      updateModule: 'room/updateCurrentModule'
    })
  }
}
