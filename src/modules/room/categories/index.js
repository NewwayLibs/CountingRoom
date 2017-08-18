import { mapMutations } from 'vuex'

export default {
  name: 'categories',
  components: {},
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.updateModule({title: this.$t('title.categories')})
  },
  methods: {
    ...mapMutations({
      updateModule: 'room/updateCurrentModule'
    })
  }
}
