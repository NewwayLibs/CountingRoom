import Links from '@/components/Links.vue'
import axios from 'axios'

export default {
  name: 'pages',
  components: {
    Links
  },
  data () {
    return {
      page: null
    }
  },
  computed: {
    // геттер вычисляемого значения
    pageName: function () {
      return this.$route.params.page
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to.params, to)
    axios.get(`/pages?slug=` + to.params.page)
      .then(response => {
        console.log('ON beforeRouteEnter', response)
        next(vm => vm.setData(response.data[0]))
      })
      .catch(e => {
        console.error('ON beforeRouteEnter', e)
      })
  },
  methods: {
    setData (data) {
      this.page = data
    }
  }
}
