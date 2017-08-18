import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'room',
  components: {},
  data () {
    return {
      drawer: true,
      items: [
        {title: 'Home', icon: 'fa-home', name: 'summary'},
        {title: 'Categories', icon: 'fa-th-large', name: 'categories'}
      ],
      mini: false,
      right: null
    }
  },
  created () {
    this.updateTitle(this.$t('title.room'))
    this.$router.push({name: 'summary'})
  },
  computed: {
    username: function () {
      return this.$auth.user().fullname
    },
    avatar: function () {
      return this.$auth.user().avatar
    },
    ...mapGetters({
      title: 'room/title'
    })
  },
  methods: {
    ...mapMutations({
      updateTitle: 'room/updateTitle'
    })
  }
}
