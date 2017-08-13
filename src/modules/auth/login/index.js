import Notify from '@/mixins/notify'

export default {
  name: 'auth-login',
  mixins: [Notify],
  data () {
    return {
      loading: false,
      password_visible: false,
      email: 'bilyk.a@novadumka.com',
      password: 'bilyk.a'
    }
  },
  created () {
    if (this.$auth.check()) {
      this.warning('You have already logged in')
      this.$router.push({name: 'home'})
    }
  },
  methods: {
    submit () {
      const redirect = this.$auth.redirect()
      this.loading = true

      this.$auth.login({
        data: {email: this.email, password: this.password},
        fetchUser: false,
        redirect: {path: redirect ? redirect.from.fullPath : '/'},
        success: function () {
          this.loading = false
          this.success('Login success')
        },
        error: function () {
          this.loading = false
          this.error('Login Failed')
        }
      })
    }
  }
}
