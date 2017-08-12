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
      this.alreadyLoggedIn()
      this.$router.push({ name: 'home'})
    }
  },
  methods: {
    submit () {
      const redirect = this.$auth.redirect()
      console.log('redirect', redirect)
      this.loading = true
      this.$auth.login({
        data: {email: this.email, password: this.password},
        fetchUser: false,
        redirect: {path: redirect ? redirect.from.fullPath : '/'},
        success: function () {
          this.loading = false
          this.loginSuccess()
        },
        error: function () {
          this.loading = false
          this.loginError()
        }
      })
    }
  },
  notifications: {
    loginError: {
      title: 'Login Failed',
      message: 'Failed to authenticate',
      type: 'error' // Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    loginSuccess: {
      title: 'Login successed',
      type: 'success' // Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    },
    alreadyLoggedIn: {
      title: 'You have already logged in',
      type: 'info' // Default: 'info', also you can use VueNotifications.type.error instead of 'error'
    }
  }
}
