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
  computed: {
    username: function () {
      return this.$auth.user().fullname
    },
    avatar: function () {
      return this.$auth.user().avatar
    }
  },
  methods: {
    logout () {
      console.log('this.$auth', this.$auth, this.$auth.user().email)
      // this.$auth.logout()
    }
  }
}
