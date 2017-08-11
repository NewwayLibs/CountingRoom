export default {
  name: 'pages',
  computed: {
    // геттер вычисляемого значения
    pageName: function () {
      return this.$route.params.page
    }
  }
}
