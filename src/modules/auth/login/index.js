import Notify from '@/mixins/notify'

export default {
  name: 'auth-login',
  mixins: [Notify],
  data () {
    return {
      loading: false,
      model: {
        email: 'bilyk.a@novadumka.com',
        password: 'bilyk.a'
      },
      fields: {
        email: { label: 'email', validation: 'required|email' },
        password: { label: 'password', type: 'password', validation: 'required' }
      },
      password_visible: false,
      show: true
    }
  },
  created () {
    if (this.$auth.check()) {
      this.show = false
      this.warning('You have already logged in')
      this.$router.push({name: 'home'})
    }
  },
  methods: {

    submit (data) {
      console.log('data', data)
      const redirect = this.$auth.redirect()
      this.loading = true

      this.$auth.login({
        data: data,
        fetchUser: true,
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
