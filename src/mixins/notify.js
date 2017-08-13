export default {
  methods: {
    success: function (msg, options) {
      this.$toaster.success(msg, options)
    },
    info: function (msg, options) {
      this.$toaster.info(msg, options)
    },
    error: function (msg, options) {
      this.$toaster.error(msg, options)
    },
    warning: function (msg, options) {
      this.$toaster.warning(msg, options)
    }
  }
}
